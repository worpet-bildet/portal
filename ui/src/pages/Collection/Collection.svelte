<script>
  import { link, pop } from 'svelte-spa-router';
  import { me } from '@root/api';
  import { state, getItem, getCollectionItems } from '@root/state';
  import { getMeta } from '@root/util';
  import { ItemDetail, ItemVerticalListPreview } from '@components';
  import { EditIcon, RightSidebar, LeftArrowIcon } from '@fragments';
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
          <ItemVerticalListPreview {key} />
        {/each}
      </div>
    </ItemDetail>
    <RightSidebar>
      <div class="flex flex-col border rounded-lg p-4 gap-4">
        <button class="border px-2 py-1 flex gap-4" on:click={pop}>
          <span class="w-5"><LeftArrowIcon /></span>
          Back
        </button>
        {#if me === ship}
          <a
            use:link
            href={`/collection-edit/${wild}`}
            class="border px-2 py-1"
          >
            <div class="w-full flex gap-4 items-center">
              <span class="w-5">
                <EditIcon />
              </span>
              <span>Edit Collection</span>
            </div>
          </a>
        {/if}
      </div>
    </RightSidebar>
  </div>
{/if}
