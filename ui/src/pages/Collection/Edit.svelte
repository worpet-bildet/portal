<script>
  import {
    state,
    getItem,
    getCurator,
    getCollectionItems,
    keyStrToObj,
  } from '@root/state';
  import { poke } from '@root/api';
  import { ItemVerticalListPreview } from '@components';
  import { TextArea, SortableList } from '@fragments';
  export let params;
  let { wild } = params;
  let collectionKey = `/collection/${wild}`;

  let collection, ship, title, blurb, image, curator, items;
  state.subscribe(() => {
    collection = getItem(collectionKey);
    if (!collection) return;
    ({
      bespoke: { ship, title, blurb, image },
      keyObj: { ship },
    } = collection);

    curator = getCurator(ship);
    items = getCollectionItems(collection.keyStr);
  });

  const save = () => {
    console.log({
      app: 'portal-manager',
      mark: 'portal-action',
      json: {
        edit: {
          key: keyStrToObj(collectionKey),
          bespoke: {
            collection: {
              title,
              blurb,
              image,
              'key-list': items,
            },
          },
        },
      },
    });
    poke({
      app: 'portal-manager',
      mark: 'portal-action',
      json: {
        edit: {
          key: keyStrToObj(collectionKey),
          bespoke: {
            collection: {
              title,
              blurb,
              image,
              'key-list': items,
            },
          },
        },
      },
    });
  };
</script>

{#if collection}
  <div class="grid gap-8">
    <div class="flex flex-col gap-4">
      <div>Collection title</div>
      <input type="text" bind:value={title} />
    </div>
    <div class="flex flex-col gap-4">
      <div>Collection description</div>
      <TextArea bind:value={blurb} minRows={3} maxRows={10} />
    </div>
    <div class="flex flex-col gap-4">
      <div>Collection image</div>
      <input type="text" bind:value={image} />
    </div>
    <SortableList bind:list={items} key="keyStr" let:item>
      <ItemVerticalListPreview {item} clickable={false} />
    </SortableList>
    <div>
      <button class="border px-2 py-1" on:click={save}>Save</button>
    </div>
  </div>
{/if}
