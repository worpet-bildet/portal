<script>
  import { push, pop } from 'svelte-spa-router';
  import { me, poke } from '@root/api';
  import { state, getItem, getCollectionItems } from '@root/state';
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
    TrashIcon,
    ShareIcon,
    SidebarGroup,
    Modal,
  } from '@fragments';
  export let params;

  // wild here is the collectionkey
  let { wild } = params;
  let collectionKey = `/collection/${wild}`;

  let collection,
    ship,
    blurb,
    title,
    image,
    items,
    cover,
    recommendModalOpen,
    deleteModalOpen;
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

  // const deleteCollection = () => {
  //   poke({
  //     app: 'portal-manager',
  //     mark: 'portal-action',
  //     json: {
  //       delete: {
  //         key: collection.keyObj,
  //       },
  //     },
  //   });
  //   pop();
  // };
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
          <div class="border shadow rounded-lg">
            <ItemVerticalListPreview {key} />
          </div>
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
          <!-- <IconButton
            class="hover:bg-red-500"
            icon={TrashIcon}
            on:click={() => (deleteModalOpen = true)}>Delete</IconButton
          > -->
        {/if}
      </SidebarGroup>
    </RightSidebar>
  </div>
  <RecommendModal
    bind:open={recommendModalOpen}
    key={collection.keyObj}
    {title}
  />
  <!-- <Modal bind:open={deleteModalOpen}>
    <div class="flex flex-col justify-between h-full">
      <div class="text-2xl">Delete Collection</div>
      <div>
        Are you sure you want to delete {title}?
      </div>
      <div class="flex justify-between">
        <IconButton
          icon={LeftArrowIcon}
          on:click={() => (deleteModalOpen = false)}>Back</IconButton
        >
        <IconButton icon={TrashIcon} on:click={deleteCollection}
          >Delete</IconButton
        >
      </div>
    </div>
  </Modal> -->
{/if}
