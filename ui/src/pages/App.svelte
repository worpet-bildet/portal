<script lang="ts">
  import coverPhoto from '@assets/coverPhoto.jpg'; // todo: make this work
  import { AppCard, FeedPost, FeedPostForm } from '@components';
  import {
    DownloadIcon,
    ETHIcon,
    IconButton,
    LoadingIcon,
    Modal,
    PlusIcon,
    Tabs,
  } from '@fragments';
  import { api, me } from '@root/api';
  import config from '@root/config';
  import {
    getItem,
    getMoreFromThisShip,
    getReviews,
    getReviewsByTo,
    keyStrFromObj,
    keyStrToObj,
    state,
  } from '@root/state';
  import {
    checkIfInstalled,
    fromUrbitTime,
    getMeta,
    isImage,
    isValidTxHash,
    sendTransaction,
    weiToEth,
  } from '@root/util';
  import { Confetti } from 'svelte-confetti';

  // TODO: there must be a better way
  let cord;
  let ship;
  let time;
  let desk;
  let defKey;
  let itemKey;
  let item;
  let lens;
  let image;
  let screenshots;
  let title;
  let description;
  let link;
  let distShip;
  let ethPrice;
  let color;
  let version;
  let hash;
  let reviews;
  let isReviewedByMe;
  let isInstalling;
  let isInstalled;
  let servedFrom;
  let subbingToSocialGraph;
  let recommendModalOpen;
  let paymentModalOpen;
  let provePurchaseModalOpen;

  export let params;
  $: {
    let { wild } = params;
    [ship, cord, time] = wild.split('/');
    loadApp($state);
  }

  // It's valuable to know a few things before reading this function:
  // Portal has the concept of "temp" items and "def" items. A temp item is one
  // that is local to the ship using Portal. The item is created by the user's
  // Portal instance and usually mandates fetching some data from an external
  // source, such as an App's treaty data.
  // A "def" item on the other hand, is one that is hosted by the creator of the
  // item. We use this for apps such that the developer of the application can
  // add screenshots. It's also the item against which we tag all reviews.
  const loadApp = (s) => {
    if (!ship) return;
    // we re-assign `ship` here to the "actual dev"
    ship = s?.appDevs?.[`${ship}/${cord}`] || ship;
    if (cord) {
      itemKey = `/app/${ship}/${cord}/`;
      defKey = `/app/${ship}//${cord}`;
      desk = cord;
    }
    if (time) {
      defKey = `/app/${ship}//${time}`;
      itemKey = defKey;
      desk = time;
    }
    if (!itemKey) return;

    // Try to load the defItem regardless
    item = getItem(defKey);
    if (item) {
      // we know that this is a defitem now
      itemKey = defKey;
    } else {
      // subscribe to the def item, just in case
      api.portal.do.subscribe(keyStrToObj(defKey));
      item = getItem(itemKey);
    }

    // if we don't have a temp OR def item in state, just subscribe and wait
    if (s.isLoaded && !item) {
      return api.portal.do.subscribe(keyStrToObj(itemKey));
    }

    ({
      image,
      screenshots,
      title,
      description,
      link,
      ethPrice,
      color,
      version,
      hash,
      servedFrom,
      ship,
      distShip,
      lens,
    } = getMeta(item));

    reviews = [
      ...(getReviews(ship, keyStrToObj(defKey)) || []),
      ...(getReviewsByTo(me, keyStrToObj(defKey)) || []),
    ]
      .filter((a, i, arr) => {
        return (
          i === arr.findIndex((i) => keyStrFromObj(i) === keyStrFromObj(a))
        );
      })
      .sort((a, b) => fromUrbitTime(b.time) - fromUrbitTime(a.time));

    if (!s?.social?.[`/${ship}/review-from`] && !subbingToSocialGraph && ship) {
      subbingToSocialGraph = true;
      api.portal.do.trackSocialGraph({
        source: ship,
        tag: `/${ship}`,
      });
    }

    isInstalling =
      s.apps?.[cord]?.chad?.hasOwnProperty('install') ||
      s.apps?.[cord]?.chad?.hasOwnProperty('hung') ||
      isInstalling;

    isInstalled = checkIfInstalled(s, desk, cord, isInstalling);

    if (isInstalled) isInstalling = false;

    isReviewedByMe = reviews.find((r) => r.ship === me);
  };

  let sortedRecommendations = [];
  let purchased;
  state.subscribe((s) => {
    if (!s.isLoaded) return;
    loadApp(s);
    sortedRecommendations = getMoreFromThisShip(ship, cord).slice(0, 4);
    purchased = s?.['bought-apps']?.[`${ship ?? '~zod'}/${desk}`];
  });

  const purchase = () => {
    paymentModalOpen = true;
    api.portal.do.requestPayment(distShip, desk);
  };

  let proofOfPurchaseTxHash;
  const provePurchase = () => {
    paymentModalOpen = false;
    provePurchaseModalOpen = true;
  };

  let tx;
  $: if (isValidTxHash(proofOfPurchaseTxHash)) {
    api.portal.do.confirmPayment(distShip, proofOfPurchaseTxHash);
    isInstalling = true;
    provePurchaseModalOpen = false;
    paymentModalOpen = true;
    tx = { hash: proofOfPurchaseTxHash };
  }

  const pay = async () => {
    if (!$state.payment) return;
    try {
      tx = await sendTransaction(
        $state.payment?.['receiving-address'],
        $state.payment?.['eth-price'],
        $state.payment?.['hex'],
        config.chainId
      );
      api.portal.do.confirmPayment(distShip, tx.hash);
      isInstalling = true;
    } catch (e) {
      console.log(e);
    }
  };

  const handlePostReview = async ({ detail: { content, rating } }) => {
    api.portal.do.create({
      bespoke: { review: { blurb: content, rating: Number(rating) } },
      'tags-to': [
        {
          // this is the DEF item key
          key: { struc: 'app', ship, cord: '', time: desk },
          'tag-to': `/${me}/review-to`,
          'tag-from': `/${ship}/review-from`,
        },
      ],
    });
  };

  let fileInput;
  const handleImageSelect = (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    addScreenshot(files);
  };

  const addScreenshot = async (files: FileList) => {
    api.portal.do.edit({
      key: keyStrToObj(defKey),
      bespoke: {
        app: {
          ...item?.bespoke,
          screenshots: [
            ...screenshots,
            await api.s3.do.uploadImage(files[0], $state.s3),
          ],
        },
      },
    });
  };

  const deleteScreenshot = (screenshot) => {
    screenshots = screenshots.filter((s) => s !== screenshot);
    api.portal.do.edit({
      key: keyStrToObj(defKey),
      bespoke: { app: { ...item?.bespoke, screenshots } },
    });
  };

  let activeTab = 'Reviews';
  let tabs = [{ tab: 'Reviews' }, { tab: 'Screenshots' }, { tab: 'Info' }];
</script>

{#if item}
  {@const { cover } = getMeta(item)}

  <div class="grid grid-cols-12 gap-4 sm:gap-8">
    <div class="col-span-12 w-full sm:h-48">
      {#if isImage(cover)}
        <img
          src={cover}
          alt="profile banner"
          class="relative sm:absolute sm:top-0 left-0 w-full h-48 sm:h-72 object-cover"
        />
      {:else}
        <img
          src=https://nyc3.digitaloceanspaces.com/toptyr-bilder/746f3d88a414b8633cbb807a1b6dc4d8%20(1).jpg
          alt="default profile banner"
          class="relative sm:absolute sm:top-0 left-0 w-full h-48 sm:h-72 object-cover"
        />
      {/if}
      <div
        class="hidden sm:absolute sm:top-0 left-0 w-full h-48 sm:h-72 bg-gradient-to-t from-coverPhotoBottom to-coverPhotoTop"
      />
    </div>

    <AppCard
      app={item}
      {isInstalled}
      {isInstalling}
      {purchased}
      on:purchase={purchase}
    />

    <div class="col-span-12 md:col-span-7">
      <div class="pb-4">
        <Tabs bind:activeTab {tabs} />
      </div>
      {#if activeTab === 'Screenshots'}
        <div class="grid grid-cols-9 gap-4">
          {#if screenshots.length === 0}
            <div class="col-span-9">
              {ship} needs to download %portal to publish screenshots of {title}.
              Please prompt them to follow
              <a
                href="https://twitter.com/worpet_bildet/status/1668643121813438466?s=20"
                target="_blank">this guide</a
              >
            </div>
          {/if}
          {#each screenshots as screenshot}
            <div
              class="relative border rounded-lg overflow-hidden h-full col-span-3"
            >
              <a href={screenshot} target="_blank" class="">
                <img
                  src={screenshot}
                  class="h-full object-cover"
                  alt="Screenshot"
                />
              </a>
              {#if me === ship}
                <button
                  class="absolute top-0 right-0 px-3 py-2 border bg-dark rounded-md text-white"
                  on:click={() => deleteScreenshot(screenshot)}
                >
                  X
                </button>
              {/if}
            </div>
          {/each}
        </div>
        {#if me === ship}
          <div
            class="grid gap-8 bg-panels dark:bg-darkgrey border p-6 rounded-lg"
          >
            <div class="flex gap-4">
              <input
                type="file"
                accept="image/*"
                class="hidden"
                bind:this={fileInput}
                on:change={handleImageSelect}
              />
              <IconButton
                icon={PlusIcon}
                tooltip="Configure S3 storage for image support"
                on:click={() => {
                  if (!$state.s3 || !$state.s3.configuration?.currentBucket) {
                    alert(
                      'For attachment support, configure S3 storage with ~dister-nocsyx-lassul/silo.'
                    );
                  } else {
                    fileInput.click();
                  }
                }}>Add Screenshots</IconButton
              >
            </div>
          </div>
        {/if}
      {:else if activeTab === 'Info'}
        <div
          class="grid gap-8 bg-panels dark:bg-darkgrey border p-6 rounded-lg"
        >
          <div>
            <div class="text-2xl font-bold">
              Current {title} version
            </div>
            <div class="text-lg">
              {version}
            </div>
          </div>
          <div class="overflow-hidden">
            <div class="text-2xl font-bold">
              Current {title} hash
            </div>
            <pre class="flex justify-start text-lg">
              {hash}
            </pre>
          </div>
        </div>
      {:else if activeTab === 'Reviews'}
        {#if lens === 'def'}
          {#if reviews.length === 0}
            <div class="flex">
              There are no reviews of {title} yet. If you have used it recently,
              why not share your experience?
            </div>
          {/if}
          {#if !isReviewedByMe}
            <div class="flex flex-col gap-2 pb-8">
              <FeedPostForm
                on:post={handlePostReview}
                placeholder="What do you think of {title}?"
                showRecommendButtons={false}
                showRatingStars={true}
              />
            </div>
          {/if}
          {#if reviews.length > 0}
            <div class="flex flex-col gap-6">
              {#each reviews as review (keyStrFromObj(review))}
                <div>
                  <FeedPost key={review} showRating={true} />
                </div>
              {/each}
            </div>
          {/if}
        {:else}
          <div class="col-span-9">
            {ship} needs to download %portal to allow reviews of {title}. Please
            prompt them to follow
            <a
              href="https://twitter.com/worpet_bildet/status/1668643121813438466?s=20"
              target="_blank">this guide</a
            >
          </div>
        {/if}
      {/if}
    </div>
  </div>
  <Modal bind:open={provePurchaseModalOpen}>
    <div class="flex flex-col justify-between gap-4">
      {#if !tx}
        <div class="text-2xl">Prove previous purchase of {title}</div>
        <div>
          If you have already paid for {title}, you can enter the transaction
          hash here to download it.
        </div>
        <div>
          If you want to install {title} on multiple ships, you must make a payment
          from each ship.
        </div>
        <input
          type="text"
          bind:value={proofOfPurchaseTxHash}
          class="border p-2"
          placeholder="0x..."
        />
        <div class="p-5" />
      {/if}
    </div>
  </Modal>
  <Modal bind:open={paymentModalOpen}>
    <div class="flex flex-col justify-between gap-4">
      {#if !tx}
        <div class="text-2xl">Purchase {title}</div>
        <div>
          <div>
            You can purchase {title} for {weiToEth(Number(ethPrice))} ETH.
          </div>
          <div>Make sure you have metamask installed and unlocked.</div>
          <div>
            Disclaimer: Portal cannot guarantee this purchase. Transactions are
            peer-to-peer.
          </div>
        </div>
        <div class="flex justify-end w-full gap-8">
          <IconButton icon={DownloadIcon} on:click={provePurchase}
            >I already paid!</IconButton
          >
          <IconButton
            icon={ETHIcon}
            loading={!$state.payment}
            disabled={!$state.payment}
            async
            on:click={pay}>Pay with ETH</IconButton
          >
        </div>
      {/if}
      {#if tx}
        {#if !purchased}
          <div class="text-2xl">Purchasing...</div>
          <div class="w-full flex justify-center">
            <div class="w-32 h-32">
              <LoadingIcon />
            </div>
          </div>
        {:else}
          <div class="text-2xl">Purchased!</div>
          <div class="flex flex-col gap-2">
            <div>
              {title} will be installed automatically.
            </div>
            <div>
              Receipt: <a href={`https://etherscan.io/tx/${tx.hash}`}
                >Etherscan</a
              >
            </div>
          </div>
          <div
            class="fixed -top-8 left-0 h-screen w-screen flex justify-center overflow-hidden pointer-events-none"
          >
            <Confetti
              x={[-5, 5]}
              y={[0, 0.1]}
              delay={[500, 2000]}
              infinite
              duration={5000}
              amount={200}
              fallDistance="100vh"
            />
          </div>
        {/if}
      {/if}
    </div>
  </Modal>
{/if}
