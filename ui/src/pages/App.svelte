<script>
  import { me, poke, subscribeToItem, uploadImage } from '@root/api';
  import {
    state,
    getItem,
    refreshApps,
    keyStrToObj,
    keyStrFromObj,
    getReviews,
    getReviewsByTo,
  } from '@root/state';
  import { getMeta, fromUrbitTime } from '@root/util';
  import {
    ItemDetail,
    RecommendModal,
    FeedPost,
    FeedPostForm,
  } from '@components';
  import {
    RightSidebar,
    IconButton,
    ShareIcon,
    CrossIcon,
    InstallIcon,
    GlobeIcon,
    ExternalDestinationIcon,
    SidebarGroup,
    ImageIcon,
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
    recommendModalOpen;

  export let params;
  $: loadApp($state);

  let subscribingTo = {};

  const loadApp = (s) => {
    let { wild } = params;
    [ship, cord, time] = wild.split('/');

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
        // TODO: Remove this because Jurij is also subscribing to the defitems
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

    // here we want to get the reviews for the app, which we should be able to
    // do in a similar way as getting comments
    // TODO: Review what ship and key should be here in the case that host is
    // not publisher
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

    isInstalled = !isInstalling && !!s.apps?.[cord || time];
    isReviewedByMe = reviews.find((r) => r.ship === me);
  };

  state.subscribe((s) => {
    if (!s.isLoaded) return;
    loadApp(s);
  });

  const uninstall = () => {
    poke({
      app: 'docket',
      mark: 'docket-uninstall',
      json: cord,
    }).then(refreshApps);
  };
  const install = async () => {
    isInstalling = true;
    let distDesk = item?.bespoke?.distDesk || `${ship}/${cord || time}`;
    await poke({
      app: 'docket',
      mark: 'docket-install',
      json: distDesk,
    });
    await poke({
      app: 'hood',
      mark: 'kiln-revive',
      json: distDesk.split('/')[1],
    });
    refreshApps();
  };

  const handlePostReview = async ({ detail: { content, rating } }) => {
    console.log({ me, ship, content, rating, cord });
    poke({
      app: 'portal-manager',
      mark: 'portal-action',
      json: {
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
      },
    });
  };

  let fileInput;
  const handleImageSelect = async (e) => {
    let newScreenshots = [
      ...screenshots,
      await uploadImage(e.target.files[0], $state.s3),
    ];
    // We want to poke to edit the item - i'm not sure how we do that but I am
    // going to try!
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

  let activeTab = 'Screenshots';
  let tabs = ['Screenshots', 'Reviews', 'Info'];
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
              There are no screenshots for {title} yet. If you know the developer,
              {ship}, prompt them to get in touch with ~dilryd-mopreg.
            </div>
          {/if}
          {#each screenshots as screenshot}
            <a href={screenshot} target="_blank" class="col-span-3">
              <div class=" border shadow rounded-lg overflow-hidden h-full">
                <img
                  src={screenshot}
                  class="h-full object-cover"
                  alt="Screenshot"
                />
              </div>
            </a>
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
          It is not yet possible to review {title}. If you know the developer, {ship},
          prompt them to get in touch with ~dilryd-mopreg.
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
          <IconButton icon={InstallIcon} on:click={() => window.open(`${window.location.origin}/apps/grid/search/${ship}/apps`)}
            >Install</IconButton
          >
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
    </RightSidebar>
  </div>
  <RecommendModal bind:open={recommendModalOpen} key={keyStrToObj(itemKey)} />
{/if}
