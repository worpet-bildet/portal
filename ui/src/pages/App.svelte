<script>
  import { me, poke, subscribeToItem } from '@root/api';
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
  } from '@fragments';

  let cord,
    ship,
    defKey,
    subscribingToDefItem,
    itemKey,
    isDefItem,
    item,
    image,
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
    recommendModalOpen;

  export let params;
  $: {
    let { wild } = params;
    let [ship, cord, time] = wild.split('/');

    if (cord) defKey = `/app/${ship}//${cord}`;
    if (time) defKey = `/app/${ship}//${time}`;

    // don't ask
    if (cord) {
      itemKey = `/app/${ship}/${cord}/`;
    } else if (time) {
      isDefItem = true;
      itemKey = `/app/${ship}//${time}`;
    }
    loadApp($state);
  }

  const loadApp = (s) => {
    if (!itemKey) return;

    // Try to load the defItem if we already have one in state
    // TODO: Ensure that we respect Jurij's upcoming map
    if (!isDefItem) {
      item = getItem(defKey);
      console.log({ defItem: item });
      if (!item && !subscribingToDefItem) {
        subscribingToDefItem = true;
        // TODO: Remove this because Jurij is also subscribing to the defitems
        subscribeToItem(keyStrToObj(defKey));
      }
    } else {
      item = getItem(itemKey);
    }

    if (s.isLoaded && !item) {
      return subscribeToItem(keyStrToObj(itemKey));
    }

    ({ image, title, description, website, color, version, hash, servedFrom } =
      getMeta(item));

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

    isInstalling =
      s.apps?.[cord]?.chad?.hasOwnProperty('install') || isInstalling;

    isInstalled = !isInstalling && !!s.apps?.[cord];
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
    await poke({
      app: 'docket',
      mark: 'docket-install',
      json: `${ship}/${cord}`,
    });
    await poke({
      app: 'hood',
      mark: 'kiln-revive',
      json: cord,
    });
    refreshApps();
  };

  const handlePostReview = async ({ detail: { content, rating } }) => {
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
                time: cord,
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
          <div class="text-2xl font-bold">Reviews</div>
          <div>
            {#each reviews as review (keyStrFromObj(review))}
              <FeedPost key={review} allowReplies={false} showRating={true} />
            {/each}
          </div>
        </div>
      {/if}
    </ItemDetail>
    <RightSidebar>
      <SidebarGroup>
        {#if isInstalled}
          <IconButton
            icon={ExternalDestinationIcon}
            on:click={() =>
              window.open(`${window.location.origin}${servedFrom}`)}
            >Open</IconButton
          >
        {:else if isInstalling}
          <IconButton loading>Installing...</IconButton>
        {:else}
          <IconButton icon={InstallIcon} on:click={install} async
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
