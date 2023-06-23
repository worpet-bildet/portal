<script>
  import { ethers, parseEther } from 'ethers';
  import { Confetti } from 'svelte-confetti';
  import { me, poke, pmPoke, subscribeToItem, uploadImage } from '@root/api';
  import {
    state,
    getItem,
    refreshApps,
    keyStrToObj,
    keyStrFromObj,
    getReviews,
    getReviewsByTo,
    getMoreFromThisShip,
  } from '@root/state';
  import { getMeta, fromUrbitTime } from '@root/util';
  import {
    ItemDetail,
    RecommendModal,
    FeedPost,
    FeedPostForm,
    ItemVerticalListPreview,
  } from '@components';
  import {
    Modal,
    RightSidebar,
    IconButton,
    ShareIcon,
    CrossIcon,
    InstallIcon,
    GlobeIcon,
    ExternalDestinationIcon,
    SidebarGroup,
    ImageIcon,
    LoadingIcon,
    EthereumIcon,
    Tabs,
  } from '@fragments';

  let cord,
    ship,
    time,
    defKey,
    itemKey,
    isDefItem,
    item,
    lens,
    image,
    screenshots,
    title,
    description,
    website,
    color,
    version,
    hash,
    reviews,
    isReviewedByMe,
    isInstalling,
    isInstalled,
    servedFrom,
    subbingToSocialGraph,
    recommendModalOpen,
    paymentModalOpen;

  export let params;
  $: {
    let { wild } = params;
    [ship, cord, time] = wild.split('/');
    loadApp($state);
  }

  let subscribingTo = {};

  const loadApp = (s) => {
    // Here we should get the app devs from our state, and check whether we have
    // a mapping for it at the moment
    let actualDev;
    if ((actualDev = s?.appDevs?.[`${ship}/${cord}`])) {
      // This means we definitely have a def item, I think?
      // Is this wise?
      ship = actualDev;
    }

    if (cord || actualDev) defKey = `/app/${ship}//${cord}`;
    if (time) defKey = `/app/${ship}//${time}`;

    // don't ask
    if (cord) {
      itemKey = `/app/${ship}/${cord}/`;
    } else if (time) {
      isDefItem = true;
      itemKey = defKey;
    }

    if (!itemKey) return;

    // Try to load the defItem if we already have one in state
    if (!isDefItem) {
      item = getItem(defKey);
      if (!item && !subscribingTo[defKey]) {
        subscribingTo[defKey] = true;
        subscribeToItem(keyStrToObj(defKey));
      } else if (item) {
        itemKey = defKey;
      }
    }

    item = getItem(itemKey);

    if (s.isLoaded && !item) {
      return subscribeToItem(keyStrToObj(itemKey));
    }

    ({
      image,
      screenshots,
      title,
      description,
      website,
      color,
      version,
      hash,
      servedFrom,
      ship,
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
      console.log({
        app: 'portal-graph',
        mark: 'social-graph-track',
        json: {
          start: {
            source: ship,
            tag: `/${ship}`,
          },
        },
      });
      poke({
        app: 'portal-graph',
        mark: 'social-graph-track',
        json: {
          start: {
            source: ship,
            tag: `/${ship}`,
          },
        },
      });
    }

    isInstalling =
      s.apps?.[cord]?.chad?.hasOwnProperty('install') || isInstalling;

    isInstalled =
      (!isInstalling && !!s.apps?.[cord || time]) ||
      (s.apps?.[cord]?.chad?.hasOwnProperty('site') &&
        !!s.apps?.[cord || time]);

    if (isInstalled) isInstalling = false;

    isReviewedByMe = reviews.find((r) => r.ship === me);
  };

  let sortedRecommendations = [];
  state.subscribe((s) => {
    if (!s.isLoaded) return;
    loadApp(s);
    sortedRecommendations = getMoreFromThisShip(ship).slice(0, 4);
  });

  const uninstall = () => {
    poke({
      app: 'docket',
      mark: 'docket-uninstall',
      json: cord,
    }).then(refreshApps);
  };

  const install = async () => {
    paymentModalOpen = true;
    pmPoke({
      'payment-request': {
        seller: ship,
        desk: 'sell-me',
      },
    });

    // FIXME: stopgap
    // window.open(`${window.location.origin}/apps/grid/search/${ship}/apps`);

    // isInstalling = true;
    // let distDesk = item?.bespoke?.distDesk || `${ship}/${cord || time}`;
    // await poke({
    //   app: 'docket',
    //   mark: 'docket-install',
    //   json: distDesk,
    // });
    // await poke({
    //   app: 'hood',
    //   mark: 'kiln-revive',
    //   json: distDesk.split('/')[1],
    // });
    // refreshApps();
  };

  let tx, receipt;
  const pay = async () => {
    if (!$state.payment) return;
    let signer, provider;
    if (window.ethereum == null) {
      provider = ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
    }
    if (!signer) return;
    console.log($state.payment?.['receiving-address']);
    console.log($state.payment?.['eth-price'].replaceAll('.', ''));
    tx = await signer.sendTransaction({
      to: $state.payment?.['receiving-address'],
      value: $state.payment?.['eth-price'].replaceAll('.', ''),
      //   // value: parseEther('0.01'),
      data: $state.payment?.['hex'],
      chainId: 5,
    });
    console.log({ tx });
    pmPoke({
      'payment-tx-hash': { seller: ship, 'tx-hash': tx.hash },
    });
    receipt = await tx.wait();
  };

  const handlePostReview = async ({ detail: { content, rating } }) => {
    pmPoke({
      create: {
        bespoke: {
          review: {
            blurb: content,
            rating: Number(rating), // i hate js
          },
        },
        'tags-to': [
          {
            // this is the DEF item key
            key: {
              struc: 'app',
              ship: ship,
              time: cord || time,
              cord: '',
            },
            'tag-to': `/${me}/review-to`,
            'tag-from': `/${ship}/review-from`,
          },
        ],
      },
    });
  };

  let fileInput;
  const handleImageSelect = async (e) => {
    let newScreenshots = [
      ...screenshots,
      await uploadImage(e.target.files[0], $state.s3),
    ];
    poke({
      app: 'portal-manager',
      mark: 'portal-action',
      json: {
        edit: {
          key: keyStrToObj(defKey),
          bespoke: { app: { ...item?.bespoke, screenshots: newScreenshots } },
        },
      },
    });
  };

  const deleteScreenshot = (screenshot) => {
    screenshots = screenshots.filter((s) => s !== screenshot);
    pmPoke({
      edit: {
        key: keyStrToObj(defKey),
        bespoke: { app: { ...item?.bespoke, screenshots } },
      },
    });
  };

  let activeTab = 'Reviews';
  let tabs = ['Reviews', 'Screenshots', 'Info'];
</script>

{#if item}
  <div class="grid grid-cols-12 gap-x-8 mb-4">
    <ItemDetail
      {title}
      {description}
      patp={ship}
      {color}
      avatar={image}
      {reviews}
      type="app"
    >
      <Tabs bind:activeTab {tabs} />
      {#if activeTab === 'Screenshots'}
        <div class="grid grid-cols-9 gap-4">
          {#if screenshots.length === 0}
            <div class="col-span-9">
              {ship} needs to download %portal to publish screenshots of {title}.
              Please prompt them to follow
              <a
                href="https://twitter.com/worpet_bildet/status/1668643121813438466?s=20"
                >this guide</a
              >
            </div>
          {/if}
          {#each screenshots as screenshot}
            <div
              class="relative border shadow rounded-lg overflow-hidden h-full col-span-3"
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
          <div class="grid gap-8 bg-panels p-6 rounded-lg">
            <div class="flex gap-4">
              <input
                type="file"
                accept="image/*"
                class="hidden"
                bind:this={fileInput}
                on:change={handleImageSelect}
              />
              <IconButton
                icon={ImageIcon}
                disabled={!$state.s3 || !$state.s3.configuration.currentBucket}
                tooltip="Configure S3 storage for image support"
                on:click={() => {
                  if (!$state.s3 || !$state.s3.configuration.currentBucket)
                    return;
                  fileInput.click();
                }}
                transparent>Add Screenshots</IconButton
              >
            </div>
          </div>
        {/if}
      {:else if activeTab === 'Info'}
        <div class="grid gap-8 bg-panels p-6 rounded-lg">
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
            <div class="flex flex-col gap-2">
              <div class="text-xl font-bold">
                Review {title}
              </div>
              <FeedPostForm
                on:post={handlePostReview}
                recommendButtons={false}
                ratingStars={true}
              />
            </div>
          {/if}
          {#if reviews.length > 0}
            <div class="flex flex-col gap-4">
              {#each reviews as review (keyStrFromObj(review))}
                <div>
                  <FeedPost
                    key={review}
                    allowReplies={false}
                    showRating={true}
                  />
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
              >this guide</a
            >
          </div>
        {/if}
      {/if}
    </ItemDetail>
    <RightSidebar>
      <SidebarGroup>
        {#if isInstalled}
          <IconButton
            icon={ExternalDestinationIcon}
            on:click={() =>
              window.open(`${window.location.origin}${servedFrom}/`)}
            >Open</IconButton
          >
        {:else if isInstalling}
          <IconButton loading>Installing...</IconButton>
        {:else}
          <IconButton icon={InstallIcon} on:click={install}>Install</IconButton>
        {/if}
        {#if website}
          <IconButton icon={GlobeIcon} on:click={() => window.open(website)}
            >View Website</IconButton
          >
        {/if}
        <IconButton
          icon={ShareIcon}
          on:click={() => (recommendModalOpen = true)}>Recommend</IconButton
        >
        {#if isInstalled}
          <IconButton icon={CrossIcon} on:click={uninstall} async
            >Uninstall</IconButton
          >
        {/if}
      </SidebarGroup>
      {#if sortedRecommendations.length > 0}
        <SidebarGroup>
          <div class="text-lg mx-1">More from {ship}</div>
          {#each sortedRecommendations as [recommendation, count]}
            <ItemVerticalListPreview key={keyStrToObj(recommendation)} small />
          {/each}
        </SidebarGroup>
      {/if}
    </RightSidebar>
  </div>
  <RecommendModal bind:open={recommendModalOpen} key={keyStrToObj(itemKey)} />
  <Modal bind:open={paymentModalOpen}>
    <div class="flex flex-col justify-between gap-4">
      {#if !tx}
        <div class="text-2xl">Purchase {title}</div>
        <div>
          <div>You can purchase {title} for 0.01 ETH.</div>
          <div>
            Make sure you have metamask installed and unlocked, and then click
            pay.
          </div>
        </div>
        <div class="flex justify-end w-full">
          <IconButton
            icon={EthereumIcon}
            loading={!$state.payment}
            disabled={!$state.payment}
            async
            on:click={pay}>Pay with ETH</IconButton
          >
        </div>
      {/if}
      {#if tx && !receipt}
        <div class="text-2xl">Purchasing...</div>
        <div class="w-full flex justify-center">
          <div class="w-32 h-32">
            <LoadingIcon />
          </div>
        </div>
      {:else if receipt}
        <div class="text-2xl">Purchased!</div>
        <div class="flex flex-col gap-2">
          <div>
            {title} will be installed automatically.
          </div>
          <div>
            Receipt: <a href={`https://etherscan.io/tx/${receipt.hash}`}
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
            duration="5000"
            amount="200"
            fallDistance="100vh"
          />
        </div>
      {/if}
    </div>
  </Modal>
{/if}
