<script>
  import { link } from 'svelte-spa-router';
  import { me } from '@root/api';
  import { state, getItem, getCollectionItems, getCurator } from '@root/state';
  import { ItemDetail, ItemVerticalListPreview } from '@components';
  import { EditIcon, RightSidebar } from '@fragments';
  export let params;

  // wild here is the collectionkey
  let { wild } = params;
  let collectionKey = `/collection/${wild}`;

  let collection, ship, blurb, title, items, cover, avatar, curator;
  state.subscribe(() => {
    collection = getItem(collectionKey);
    if (!collection) return;
    ({
      bespoke: { title },
      keyObj: { ship },
    } = collection);

    curator = getCurator(ship);
    ({ cover, avatar } = curator);

    items = getCollectionItems(collection.keyStr);
  });
  $: console.log({ collection, items, collectionKey });
</script>

{#if collection}
  <div class="grid grid-cols-12 gap-8">
    <ItemDetail
      patp={ship}
      {cover}
      {title}
      description={blurb}
      {avatar}
      type="collection"
    >
      <div class="grid gap-y-4">
        {#each items as item}
          <ItemVerticalListPreview {item} />
        {/each}
      </div>
    </ItemDetail>
    <RightSidebar>
      {#if me === ship}
        <a use:link href={`/collection-edit/${wild}`} class="border px-2 py-1">
          <div class="w-full flex gap-4 items-center">
            <span class="w-5">
              <EditIcon />
            </span>
            <span>Edit Collection</span>
          </div>
        </a>
      {/if}
    </RightSidebar>
  </div>
{/if}
