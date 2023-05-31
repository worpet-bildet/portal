<script>
  import { push, pop } from 'svelte-spa-router';
  import { me } from '@root/api';
  import { state, getItem, getCollectionItems, getCurator } from '@root/state';
  import { getMeta } from '@root/util';
  import {
    ItemDetail,
    ItemVerticalListPreview,
    RecommendModal,
  } from '@components';
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

  state.subscribe(() => {
    collection = getItem(collectionKey);
    if (!collection) return;
    items = getCollectionItems(collection.keyStr);
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
      type="collection"
    >
      <div class="grid gap-y-4  bg-panels p-4 rounded-lg">
        {#each items as key}
          <ItemVerticalListPreview {key} />
        {/each}
      </div>
    </ItemDetail>
    <RightSidebar>
      <SidebarGroup>
        <IconButton icon={LeftArrowIcon} on:click={pop}>Back</IconButton>
        <IconButton
          icon={ShareIcon}
          on:click={() => (recommendModalOpen = true)}>Recommend</IconButton
        >
        {#if me === ship}
          <IconButton
            icon={EditIcon}
            on:click={() => push(`/collection-edit/${wild}`)}>Edit</IconButton
          >
        {/if}
      </SidebarGroup>
    </RightSidebar>
  </div>
  <RecommendModal bind:open={recommendModalOpen} key={collection.keyObj} />
{/if}
