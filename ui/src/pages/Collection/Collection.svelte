<script lang="ts">
  import { Item } from '$types/portal/item';

  import {
    CollectionsSquarePreview,
    ItemPreview,
    MoreFrom,
    RecommendModal,
  } from '@components';
  import { IconButton, PostIcon, RepostIcon, Tabs } from '@fragments';
  import { me } from '@root/api';
  import {
    getCollectionItems,
    getItem,
    getMoreFromThisShip,
    state,
  } from '@root/state';
  import { getMeta } from '@root/util';
  import { push } from 'svelte-spa-router';

  export let params;

  // wild here is the collectionkey
  let { wild } = params;
  let collectionKey = `/collection/${wild}`;

  let collection: Item;
  let items;
  let recommendModalOpen;

  let sortedRecommendations = [];
  state.subscribe(() => {
    collection = getItem(collectionKey);
    if (!collection) return;
    items = getCollectionItems(collection.keyStr);
    sortedRecommendations = getMoreFromThisShip(collection.keyObj?.ship).slice(
      0,
      4
    );
  });
</script>

{#if collection}
  {@const { title, ship, blurb, image } = getMeta(collection)}
  <div class="grid grid-cols-12">
    <div class="col-span-12 flex justify-between">
      <div class="flex items-center gap-4">
        <div class="w-28">
          {#if image}
            <img src={image} alt="collection preview" />
          {:else}
            <CollectionsSquarePreview
              key={collection.keyObj}
              withTitle={false}
            />
          {/if}
        </div>
        <div class="flex flex-col">
          <div class="text-4xl">{title}</div>
          <div class="text-sm text-tertiary">{title}</div>
        </div>
      </div>
      <div class="flex items-start gap-4">
        <IconButton
          icon={RepostIcon}
          on:click={() => (recommendModalOpen = true)}
          class="bg-panels dark:bg-transparent hover:bg-panels-hover dark:hover:bg-transparent dark:hover:border-white dark:border"
          >Recommend</IconButton
        >
        {#if me === ship}
          <IconButton
            icon={PostIcon}
            on:click={() => push(`/collection-edit/${wild}`)}
            class="bg-panels dark:bg-transparent hover:bg-panels-hover dark:hover:bg-transparent dark:hover:border-white dark:border"
            >Edit</IconButton
          >
        {/if}
      </div>
    </div>
    <div class="col-span-12 pt-4">
      <Tabs activeTab={'Links'} tabs={[{ tab: 'Links' }]} />
    </div>
    <div class="col-span-8 pt-4 pr-4 border-r">
      <div class="grid gap-y-4 rounded-lg">
        {#each items as key}
          <ItemPreview {key} class="bg-panel dark:bg-transparent" />
        {/each}
      </div>
    </div>
    <div class="col-span-4 p-4">
      <MoreFrom patp={ship} />
    </div>
  </div>
  <RecommendModal bind:open={recommendModalOpen} key={collection.keyObj} />
{/if}
