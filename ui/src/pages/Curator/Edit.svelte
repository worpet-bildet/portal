<script>
  import { pop } from 'svelte-spa-router';
  import { poke } from '@root/api';
  import {
    state,
    getCurator,
    getCuratorCollections,
    getItem,
    keyStrFromObj,
  } from '@root/state';
  import { CollectionsSquarePreview } from '@components';
  import {
    Tabs,
    TextArea,
    SortableList,
    RightSidebar,
    LeftArrowIcon,
    CheckIcon,
    IconButton,
    SidebarGroup,
  } from '@fragments';

  export let params;

  const { patp } = params;

  let curator;
  let nickname, cover, avatar, bio, collections;
  state.subscribe(() => {
    curator = getCurator(patp);
    ({ nickname, cover, avatar, bio } = curator.bespoke || {});
    // TODO: extremely dumb and convoluted
    collections = (getCuratorCollections(patp) || []).filter((c) => {
      let _col = getItem(keyStrFromObj(c));
      return _col?.bespoke?.title && _col?.bespoke?.['key-list']?.length > 0;
    });
  });

  let activeTab = 'Profile';
  let tabs = ['Profile', 'Collections'];

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
    poke({
      app: 'contacts',
      mark: 'contact-action',
      json: {
        edit: [
          { nickname: nickname ?? '' },
          { cover: cover ?? '' },
          { avatar: avatar ?? '' },
          { bio: bio ?? '' },
        ],
      },
    });
  };
  const saveCollections = () => {
    poke({
      app: 'portal-manager',
      mark: 'portal-action',
      json: {
        edit: {
          key: {
            struc: 'collection',
            ship: patp,
            cord: '',
            time: '~2000.1.1',
          },
          bespoke: {
            collection: {
              'key-list': collections,
            },
          },
        },
      },
    });
  };
</script>

<div class="grid grid-cols-12 gap-x-8">
  <div class="grid gap-y-4 col-span-9 bg-panels p-6 rounded-lg">
    <Tabs {tabs} bind:activeTab />
    {#if activeTab === 'Profile'}
      <div class="flex flex-col gap-2 pt-4">
        <div>Display Name</div>
        <input type="text" bind:value={nickname} class="p-2 border-b focus:outline-none" />
      </div>
      <div class="flex flex-col gap-2">
        <div>Bio</div>
        <TextArea bind:value={bio} />
      </div>
      <div class="flex flex-col gap-2">
        <div>Avatar</div>
        <input type="text" bind:value={avatar} class="p-2 border-b focus:outline-none" />
      </div>
      <div class="flex flex-col gap-2">
        <div>Cover Image</div>
        <input type="text" bind:value={cover} class="p-2 border-b focus:outline-none" />
      </div>
    {:else if activeTab === 'Collections'}
      <div class="grid gap-8 grid-cols-4 pb-4">
        <div class="text-lg font-bold col-span-4 pt-4">
          Drag to reorder
        </div>
        <SortableList bind:list={collections} key="time" let:item>
          <CollectionsSquarePreview key={item} />
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
        icon={CheckIcon}
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
      >
        Save</IconButton
      >
      <IconButton icon={LeftArrowIcon} on:click={pop}>Back</IconButton>
    </SidebarGroup>
  </RightSidebar>
</div>
