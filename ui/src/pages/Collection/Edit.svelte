<script lang="ts">
  import { CollectionsAddItemForm, ItemPreview } from '@components';
  import {
    ArrowBackIcon,
    IconButton,
    Modal,
    OtherItemForm,
    PlusIcon,
    RightSidebar,
    SidebarGroup,
    SortableList,
    TextArea,
  } from '@fragments';
  import { api } from '@root/api';
  import {
    getCollectionItems,
    getCurator,
    getItem,
    keyStrFromObj,
    keyStrToObj,
    state,
  } from '@root/state';
  import { pop } from 'svelte-spa-router';
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
    api.portal.do.edit({
      key: keyStrToObj(collectionKey),
      bespoke: { collection: { title, blurb, image, 'key-list': items } },
    });
  };

  let addModalOpen = false;
  const add = () => {
    addModalOpen = true;
  };

  const remove = (key) => {
    items = items.filter((i) => i.keyStr !== key);
  };

  let editModalOpen = false;
  let item;
  const edit = (key) => {
    item = getItem(items.find((i) => i.keyStr === key).keyStr);
    editModalOpen = true;
  };

  const saveEdits = () => {
    api.portal.do.edit({
      key: item.keyObj,
      bespoke: { other: { ...item.bespoke } },
    });
    editModalOpen = false;
  };

  const addItem = (key) => {
    items.push(keyStrToObj(key));
    items = items;
    addModalOpen = false;
    save();
    pop();
  };

  const onSaved = () => {
    addModalOpen = false;
  };
</script>

{#if collection}
  <div class="grid grid-cols-12 gap-x-8">
    <div
      class="grid gap-4 col-span-9 bg-panels dark:bg-darkgrey border p-4 rounded-lg"
    >
      <div class="text-2xl font-bold">Editing {title}</div>
      <div class="flex flex-col gap-2">
        <div>Title</div>
        <input
          class="p-2 border-b focus:outline-none"
          type="text"
          bind:value={title}
        />
      </div>
      <div class="flex flex-col gap-2">
        <div>Description</div>
        <TextArea bind:value={blurb} />
      </div>
      <div class="flex flex-col gap-2">
        <div>Image</div>
        <input
          class="p-2 border-b focus:outline-none"
          type="text"
          bind:value={image}
        />
      </div>
      <div class="flex flex-col gap-2">
        <div class="py-2">Items (drag to reorder)</div>
        <SortableList bind:list={items} key="keyStr" let:item>
          <ItemPreview
            key={item}
            clickable={false}
            removable={true}
            editable={false}
            on:remove={({ detail }) => remove(detail)}
            on:edit={({ detail }) => edit(detail)}
          />
        </SortableList>
      </div>
    </div>
    <RightSidebar>
      <SidebarGroup>
        <IconButton
          icon={PlusIcon}
          on:click={add}
          class="dark:hover:border-white dark:border hover:bg-panels-hover"
          >Add Item</IconButton
        >
        <IconButton
          icon={PlusIcon}
          on:click={save}
          class="dark:hover:border-white dark:border hover:bg-panels-hover"
          >Save</IconButton
        >
        <IconButton
          icon={ArrowBackIcon}
          on:click={pop}
          class="dark:hover:border-white dark:border hover:bg-panels-hover"
          >Back</IconButton
        >
      </SidebarGroup>
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
    <div class="flex flex-col h-full justify-between">
      <div>
        <OtherItemForm bind:item={item.bespoke} />
      </div>
      <div class="flex justify-between">
        <IconButton
          icon={ArrowBackIcon}
          on:click={() => (editModalOpen = false)}>Back</IconButton
        >
        <IconButton icon={PlusIcon} on:click={saveEdits}>Save</IconButton>
      </div>
    </div>
  </Modal>
{/if}
