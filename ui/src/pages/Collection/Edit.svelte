<script>
  import {
    state,
    getItem,
    getCurator,
    getCollectionItems,
    keyStrToObj,
  } from '@root/state';
  import { poke } from '@root/api';
  import { ItemVerticalListPreview, CollectionsAddItemForm } from '@components';
  import { TextArea, SortableList, RightSidebar, Modal } from '@fragments';
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
              'key-list': items.map((i) => keyStrToObj(i.keyStr)),
            },
          },
        },
      },
    });
  };

  let addModalOpen = false;
  const add = () => {
    addModalOpen = true;
    console.log({ addModalOpen });
  };

  const remove = (key) => {
    items = items.filter((i) => i.keyStr !== key);
    save();
  };

  const addItem = (key) => {
    items.push(getItem(key));
    items = items;
    addModalOpen = false;
    save();
  };

  const onSaved = () => {
    console.log('SAVEDDDD');
    addModalOpen = false;
    console.log({ addModalOpen });
  };
</script>

{#if collection}
  <div class="grid gap-8 grid-cols-12">
    <div class="col-span-9">
      <div class="text-2xl font-bold">Editing {title}</div>
      <div>
        <div>Title</div>
        <input class="p-2" type="text" bind:value={title} />
      </div>
      <div>
        <div>Description</div>
        <TextArea bind:value={blurb} minRows={3} maxRows={10} />
      </div>
      <div>
        <div>Image</div>
        <input class="p-2" type="text" bind:value={image} />
      </div>
      <div>
        <div>Items (drag to reorder)</div>
        <SortableList bind:list={items} key="keyStr" let:item>
          <ItemVerticalListPreview
            {item}
            clickable={false}
            removable={true}
            on:remove={({ detail }) => remove(detail)}
          />
        </SortableList>
      </div>
    </div>
    <RightSidebar>
      <div class="grid gap-4">
        <button class="border px-2 py-1" on:click={add}>Add Item</button>
        <button class="border px-2 py-1" on:click={save}>Save</button>
      </div>
    </RightSidebar>
  </div>
  <Modal bind:open={addModalOpen}>
    <CollectionsAddItemForm
      {collection}
      on:add={({ detail }) => addItem(detail)}
      on:saved={onSaved}
    />
  </Modal>
{/if}
