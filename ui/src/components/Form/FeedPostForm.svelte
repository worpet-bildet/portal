<script>
  import { createEventDispatcher } from 'svelte';
  import { me, poke } from '@root/api';
  import { state, keyStrToObj, getCurator } from '@root/state';
  import { RecommendModal, Sigil } from '@components';
  import {
    TextArea,
    IconButton,
    AppIcon,
    GroupIcon,
    Modal,
    ItemImage,
  } from '@fragments';
  let dispatch = createEventDispatcher();
  let content;

  const post = () => {
    poke({
      app: 'portal-manager',
      mark: 'portal-action',
      json: {
        create: {
          'prepend-to-feed': [
            {
              ship: me,
              struc: 'feed',
              time: '~2000.1.1',
              cord: '',
            },
          ],
          bespoke: {
            other: {
              title: '',
              blurb: content,
              link: '',
              image: '',
            },
          },
        },
      },
    });
    content = '';
    dispatch('post');
  };

  // TODO: Factor out the selection of groups/apps into its own component
  let groupModalOpen, appModalOpen, recommendModalOpen, selectedKey, color;
  let groups = {};
  let apps = {};
  state.subscribe((s) => {
    if (s.groups) {
      Object.entries(s.groups).forEach(([key, data]) => {
        if (!data?.meta?.title) return;
        groups[key] = data;
      });
    }
    if (s.apps) {
      Object.entries(s.apps).forEach(([key, data]) => {
        const appkey = `${data.ship}/${key}`;
        apps[appkey] = data;
      });
    }
    ({ color } = getCurator(me).bespoke || {});
  });
</script>

<div
  class="grid grid-cols-12 gap-2 lg:gap-4 p-3 rounded-lg shadow border border-black"
>
  <div class="col-span-1">
    <div class="rounded-md overflow-hidden">
      <Sigil patp={me} />
    </div>
  </div>
  <div class="col-span-11">
    <TextArea placeholder="Share a limerick, maybe" bind:value={content} />
  </div>
  <div class="col-span-12 col-start-2 flex justify-between">
    <div class="flex gap-4">
      <IconButton
        icon={AppIcon}
        on:click={() => {
          appModalOpen = true;
        }}
      />
      <IconButton
        icon={GroupIcon}
        on:click={() => {
          groupModalOpen = true;
        }}
      />
    </div>
    <button
      class="border bg-black text-white rounded-lg px-3 py-1 font-bold"
      on:click={post}>Post</button
    >
  </div>
  <Modal bind:open={appModalOpen}>
    <div class="flex flex-col gap-4">
      <div class="text-2xl font-bold">Recommend an app</div>
      {#if Object.values(apps).length === 0}
        <div>
          You have not installed any apps yet. Install some to recommend them on
          Portal.
        </div>
      {/if}
      {#each Object.entries(apps) as [path, { title, image, color }]}
        <button
          class="grid grid-cols-12 border shadow items-center gap-4 p-1"
          on:click={() => {
            appModalOpen = false;
            recommendModalOpen = true;
            selectedKey = keyStrToObj(`/app/${path}/`);
          }}
        >
          <div class="col-span-1">
            <ItemImage {image} title={title || path} {color} />
          </div>
          <div class="col-span-11 justify-self-start font-bold">
            {title || path}
          </div>
        </button>
      {/each}
    </div>
  </Modal>
  <Modal bind:open={groupModalOpen}>
    <div class="flex flex-col gap-4">
      <div class="text-2xl font-bold">Recommend a group</div>
      {#if Object.values(groups).length === 0}
        <div>
          You are not a member of any groups yet, join some in order to
          recommend them on Portal.
        </div>
      {/if}
      {#each Object.entries(groups) as [path, { meta: { title, image } }]}
        <button
          class="grid grid-cols-12 border items-center gap-4 p-1"
          on:click={() => {
            groupModalOpen = false;
            recommendModalOpen = true;
            selectedKey = keyStrToObj(`/group/${path}/`);
          }}
        >
          <div class="col-span-1">
            <ItemImage {image} {title} />
          </div>
          <div class="col-span-11 justify-self-start font-bold">{title}</div>
        </button>
      {/each}
    </div>
  </Modal>
  <RecommendModal bind:open={recommendModalOpen} key={selectedKey} />
</div>
