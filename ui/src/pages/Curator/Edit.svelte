<script lang="ts">
  import { ItemKey } from '$types/portal/item';

  import { CollectionsSquarePreview } from '@components';
  import {
    ArrowBackIcon,
    IconButton,
    PlusIcon,
    RightSidebar,
    SidebarGroup,
    SortableList,
    Tabs,
    TextArea,
  } from '@fragments';
  import { api } from '@root/api';
  import {
    getCurator,
    getCuratorCollections,
    getItem,
    keyStrFromObj,
    state,
  } from '@root/state';
  import { link, pop } from 'svelte-spa-router';

  export let params;

  const { patp } = params;

  let curator; // TODO: type
  let nickname: string;
  let cover: string;
  let avatar: string;
  let bio: string;
  let ethAddress: string;
  let collections: ItemKey[];
  state.subscribe(async () => {
    curator = getCurator(patp);
    ({ nickname, cover, avatar, bio } = curator.bespoke || {});
    ethAddress = await api.portal.get.receivingAddress();
    // TODO: extremely dumb and convoluted
    collections = (getCuratorCollections(patp) || []).filter((c) => {
      let _col = getItem(keyStrFromObj(c));
      return _col?.bespoke?.title && _col?.bespoke?.['key-list']?.length > 0;
    });
  });

  let activeTab = 'Profile';
  let tabs = [{ tab: 'Profile' }, { tab: 'Collections' }];

  let publishBlog = true;
  let publishRadio = false;
  const togglePublishBlog = () => {
    publishBlog = !publishBlog;
  };
  const togglePublishRadio = () => {
    publishRadio = !publishRadio;
  };

  // this info is saved in tlon's contact store, not portal
  const saveProfile = () => {
    api.urbit.do.editProfile([
      { nickname: nickname ?? '' },
      { cover: cover ?? '' },
      { avatar: avatar ?? '' },
      { bio: bio ?? '' },
    ]);
    api.portal.do.setReceivingAddress(ethAddress ?? '');
  };
  const saveCollections = () => {
    api.portal.do.edit({
      key: { struc: 'collection', ship: patp, cord: '', time: '~2000.1.1' },
      bespoke: { collection: { 'key-list': collections } },
    });
  };
</script>

<div class="grid grid-cols-12 gap-x-8">
  <div
    class="grid gap-y-4 col-span-9 bg-panels dark:bg-darkgrey border p-6 rounded-lg"
  >
    <Tabs {tabs} bind:activeTab />
    {#if activeTab === 'Profile'}
      <div class="flex flex-col gap-2">
        <div>Display Name</div>
        <input
          type="text"
          bind:value={nickname}
          class="p-2 border-b focus:outline-none"
        />
      </div>
      <div class="flex flex-col gap-2">
        <div>Bio</div>
        <div class="border-b">
          <TextArea bind:content={bio} />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <div>Avatar</div>
        <input
          type="text"
          bind:value={avatar}
          class="p-2 border-b focus:outline-none"
        />
      </div>
      <div class="flex flex-col gap-2">
        <div>Cover Image</div>
        <input
          type="text"
          bind:value={cover}
          class="p-2 border-b focus:outline-none"
        />
      </div>
      <div class="flex flex-col gap-2">
        <div>ETH Address (for receiving tips)</div>
        <input
          type="text"
          bind:value={ethAddress}
          class="p-2 border-b focus:outline-none"
        />
      </div>
    {:else if activeTab === 'Collections'}
      <div class="grid gap-8 grid-cols-4 pb-4">
        <div class="text-lg font-bold col-span-4 pt-4">
          Drag to reorder (click to edit)
        </div>
        <SortableList bind:list={collections} key="time" let:item>
          <a
            use:link
            href={keyStrFromObj(item).replace('collection', 'collection-edit')}
          >
            <CollectionsSquarePreview key={item} />
          </a>
        </SortableList>
      </div>
    {:else if activeTab === 'integrations'}
      <div class="grid gap-y-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-2 text-6xl">📜</div>
          <div class="col-span-8 self-center">
            Post new %blogs automatically
          </div>
          <button
            class="col-span-2 self-center py-1"
            class:bg-green-500={publishBlog}
            class:bg-red-500={!publishBlog}
            on:click={() => togglePublishBlog()}
            >{publishBlog ? 'On' : 'Off'}</button
          >
        </div>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-2 text-6xl">📻</div>
          <div class="col-span-8 self-center">
            Post when I !publish on %radio
          </div>
          <button
            class="col-span-2 self-center py-1"
            class:bg-green-500={publishRadio}
            class:bg-red-500={!publishRadio}
            on:click={() => togglePublishRadio()}
            >{publishRadio ? 'On' : 'Off'}</button
          >
        </div>
      </div>
    {/if}
  </div>
  <RightSidebar>
    <SidebarGroup>
      <IconButton
        icon={PlusIcon}
        on:click={() => {
          switch (activeTab) {
            case 'Profile':
              saveProfile();
              pop();
            case 'Collections':
              saveCollections();
              pop();
            default:
              return;
          }
        }}
        class="bg-panels dark:bg-transparent dark:hover:border-white dark:border hover:bg-panels-hover"
      >
        Save</IconButton
      >
      <IconButton
        icon={ArrowBackIcon}
        on:click={pop}
        class="bg-panels dark:bg-transparent dark:hover:border-white dark:border hover:bg-panels-hover"
        >Back</IconButton
      >
    </SidebarGroup>
  </RightSidebar>
</div>
