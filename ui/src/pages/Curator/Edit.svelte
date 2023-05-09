<script>
  import { poke } from '@root/api';
  import {
    state,
    getCurator,
    getCuratorCollections,
    keyStrToObj,
  } from '@root/state';
  import { CollectionsSquarePreview } from '@components';
  import { Tabs, TextArea, SortableList, RightSidebar } from '@fragments';

  export let params;

  const { patp } = params;

  let curator;
  let nickname, cover, avatar, bio, collections;
  state.subscribe(() => {
    curator = getCurator(patp);
    ({ nickname, cover, avatar, bio } = curator.bespoke || {});
    collections = getCuratorCollections(patp);
  });

  let activeTab = 'collections';
  let tabs = ['profile', 'collections', 'integrations'];

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
              'key-list': collections.map((i) => keyStrToObj(i.keyStr)),
            },
          },
        },
      },
    });
  };
</script>

<div class="grid grid-cols-12">
  <div class="grid gap-y-4 col-span-9">
    <div>Editing Curator</div>
    <Tabs {tabs} bind:activeTab />
    {#if activeTab === 'profile'}
      <div>
        <div>Display Name</div>
        <input type="text" bind:value={nickname} class="p-2" />
      </div>
      <div>
        <div>Bio</div>
        <TextArea bind:value={bio} minRows={3} maxRows={5} />
      </div>
      <div>
        <div>Avatar</div>
        <input type="text" bind:value={avatar} class="p-2" />
      </div>
      <div>
        <div>Cover Image</div>
        <input type="text" bind:value={cover} class="p-2" />
      </div>
    {:else if activeTab === 'collections'}
      <div class="grid gap-8 grid-cols-4">
        <div class="text-2xl font-bold col-span-4">
          Collections (drag to reorder)
        </div>
        <SortableList bind:list={collections} key="keyStr" let:item>
          <CollectionsSquarePreview collection={item} />
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
    <button
      class="border px-2"
      on:click={() => {
        switch (activeTab) {
          case 'profile':
            saveProfile();
          case 'collections':
            saveCollections();
          default:
            return;
        }
      }}>Save</button
    >
  </RightSidebar>
</div>
