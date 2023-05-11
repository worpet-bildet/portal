<script>
  import {
    state,
    getItem,
    getCurator,
    getCollectionItems,
    keyStrToObj,
    keyStrFromObj,
  } from '@root/state';
  import { poke } from '@root/api';
  import { ItemVerticalListPreview, CollectionsAddItemForm } from '@components';
  import {
    TextArea,
    SortableList,
    RightSidebar,
    Modal,
    OtherItemForm,
  } from '@fragments';
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
    // We have to do this because the sortable list down there won't be able to
    // sort our things if we don't have a unique prop, and we can't rely on time
    items = getCollectionItems(collection.keyStr).map((i) => ({
      ...i,
      keyStr: keyStrFromObj(i),
    }));
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
              'key-list': items,
            },
          },
        },
      },
    });
  };

  let addModalOpen = false;
  const add = () => {
    addModalOpen = true;
  };

  const remove = (key) => {
    items = items.filter((i) => i.keyStr !== key);
    save();
  };

  let editModalOpen = false;
  let item;
  const edit = (key) => {
    item = items.find((i) => i.keyStr === key);
    editModalOpen = true;
  };

  const saveEdits = () => {
    poke({
      app: 'portal-manager',
      mark: 'portal-action',
      json: {
        edit: {
          key: item.keyObj,
          bespoke: {
            other: { ...item.bespoke },
          },
        },
      },
    });
    editModalOpen = false;
  };

  const addItem = (key) => {
    console.log(key);
    items.push(getItem(key));
    items = items;
    addModalOpen = false;
    save();
  };

  const onSaved = () => {
    addModalOpen = false;
  };
</script>

{#if collection}
  <div class="grid grid-cols-12">
    <div class="grid gap-4 col-span-9">
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
            key={item}
            clickable={false}
            removable={true}
            editable={item.struc === 'other'}
            on:remove={({ detail }) => remove(detail)}
            on:edit={({ detail }) => edit(detail)}
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
  <Modal bind:open={editModalOpen}>
    <div class="grid gap-4">
      <OtherItemForm bind:item={item.bespoke} />
      <button class="border" on:click={saveEdits}>Save</button>
    </div>
  </Modal>
{/if}
