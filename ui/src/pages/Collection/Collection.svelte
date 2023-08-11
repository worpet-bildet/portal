<script>
  import { push, pop } from 'svelte-spa-router';
  import { me } from '@root/api';
  import {
    state,
    getItem,
    getCollectionItems,
    getCurator,
    keyStrToObj,
    getMoreFromThisShip,
  } from '@root/state';
  import { getMeta } from '@root/util';
  import { ItemDetail, ItemPreview, RecommendModal } from '@components';
  import {
    EditIcon,
    RightSidebar,
    IconButton,
    LeftArrowIcon,
    ShareIcon,
    SidebarGroup,
  } from '@fragments';
  export let params;

  // wild here is the collectionkey
  let { wild } = params;
  let collectionKey = `/collection/${wild}`;

  let collection, items, recommendModalOpen;

  let sortedRecommendations = [];
  state.subscribe(() => {
    collection = getItem(collectionKey);
    if (!collection) return;
    items = getCollectionItems(collection.keyStr);
    sortedRecommendations = getMoreFromThisShip(ship).slice(0, 4);
  });
</script>

{#if collection}
  {@const { title, ship, blurb, image } = getMeta(collection)}
  {@const { cover } = getCurator(collection?.keyObj?.ship)}
  <div class="grid grid-cols-12 gap-x-8 mb-4">
    <ItemDetail
      patp={ship}
      {cover}
      {title}
      description={blurb}
      avatar={image}
      key={collection.keyObj}
      type="collection"
    >
      <div
        class="grid gap-y-4 bg-panels dark:bg-darkgrey border p-4 rounded-lg"
      >
        {#each items as key}
          <ItemPreview {key} />
        {/each}
      </div>
    </ItemDetail>
    <RightSidebar>
      <SidebarGroup>
        <IconButton
          icon={LeftArrowIcon}
          on:click={pop}
          class="bg-panels dark:bg-transparent hover:bg-panels-hover dark:hover:bg-transparent dark:hover:border-white dark:border"
          >Back</IconButton
        >
        <IconButton
          icon={ShareIcon}
          on:click={() => (recommendModalOpen = true)}
          class="bg-panels dark:bg-transparent hover:bg-panels-hover dark:hover:bg-transparent dark:hover:border-white dark:border"
          >Recommend</IconButton
        >
        {#if me === ship}
          <IconButton
            icon={EditIcon}
            on:click={() => push(`/collection-edit/${wild}`)}
            class="bg-panels dark:bg-transparent hover:bg-panels-hover dark:hover:bg-transparent dark:hover:border-white dark:border"
            >Edit</IconButton
          >
        {/if}
      </SidebarGroup>
      {#if sortedRecommendations.length > 0}
        <SidebarGroup>
          <div class="text-lg mx-1">More from {ship}</div>
          {#each sortedRecommendations as [recommendation, count]}
            <ItemPreview key={keyStrToObj(recommendation)} small />
          {/each}
        </SidebarGroup>
      {/if}
    </RightSidebar>
  </div>
  <RecommendModal bind:open={recommendModalOpen} key={collection.keyObj} />
{/if}
