<script>
  import { push, pop } from 'svelte-spa-router';
  import { me } from '@root/api';
  import { state, getItem, getCollectionItems } from '@root/state';
  import { getMeta } from '@root/util';
  import { ItemDetail, ItemVerticalListPreview } from '@components';
  import {
    EditIcon,
    RightSidebar,
    IconButton,
    LeftArrowIcon,
    SidebarGroup,
  } from '@fragments';
  export let params;

  // wild here is the collectionkey
  let { wild } = params;
  let collectionKey = `/collection/${wild}`;

  let collection, ship, blurb, title, image, items, cover;
  state.subscribe(() => {
    collection = getItem(collectionKey);
    if (!collection) return;
    ({ title, ship, blurb, image } = getMeta(collection));
    ({
      keyObj: { ship },
    } = collection);

    ({ cover } = getMeta(`/ship/${ship}//`));

    items = getCollectionItems(collection.keyStr);
  });
</script>

{#if collection}
  <div class="grid grid-cols-12 gap-x-8">
    <ItemDetail
      patp={ship}
      {cover}
      {title}
      description={blurb}
      avatar={image}
      type="collection"
    >
      <div class="grid gap-y-4">
        {#each items as key}
          <div class="border shadow">
            <ItemVerticalListPreview {key} />
          </div>
        {/each}
      </div>
    </ItemDetail>
    <RightSidebar>
      <SidebarGroup>
        <IconButton icon={LeftArrowIcon} on:click={pop}>Back</IconButton>
        {#if me === ship}
          <IconButton
            icon={EditIcon}
            on:click={() => push(`/collection-edit/${wild}`)}
            >Edit Collection</IconButton
          >
        {/if}
      </SidebarGroup>
    </RightSidebar>
  </div>
{/if}
