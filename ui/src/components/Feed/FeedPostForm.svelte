<script>
  import { createEventDispatcher } from 'svelte';
  import { api, me } from '@root/api';
  import { state, keyStrToObj } from '@root/state';
  import { getAnyLink } from '@root/util';
  import { RecommendModal, Sigil } from '@components';
  import {
    TextArea,
    IconButton,
    AppIcon,
    PeopleIcon,
    ImageIcon,
    Modal,
    ItemImage,
    StarRating,
    LinkPreview,
  } from '@fragments';

  export let replyTo;
  export let recommendButtons = true;
  export let ratingStars = false;
  export let error;

  let dispatch = createEventDispatcher();
  let content, rating;

  const post = () => {
    if (!content) {
      return (error = 'Please write something, anything.');
    }
    if ((ratingStars && !rating) || Number(rating) === 0) {
      return (error = 'Please give a score.');
    }
    dispatch('post', { content, uploadedImageUrl, replyTo, rating });
    content = '';
    uploadedImageUrl = '';
    rating = '';
    error = '';
    rating = undefined;
  };

  // TODO: Factor out the selection of groups/apps into its own component
  let groupModalOpen,
    appModalOpen,
    recommendModalOpen,
    selectedKey,
    fileInput,
    uploadedImageUrl;

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
  });

  const handleImageSelect = async (e) => {
    uploadedImageUrl = await api.s3.do.uploadImage(
      e.target.files[0],
      $state.s3
    );
  };

  const handleRate = ({ target: { value } }) => {
    rating = value;
  };
  $: linkToPreview = getAnyLink(content || '');
</script>

<div
  class="grid grid-cols-12 bg-panels dark:bg-darkgrey border py-5 pl-5 rounded-tl-lg rounded-tr-lg pr-3 gap-2"
  class:border-error={error}
>
  <div class="col-span-1">
    <div class="rounded-md overflow-hidden align-middle">
      <Sigil patp={me} />
    </div>
  </div>
  <div class="col-span-11 pb-2">
    <TextArea placeholder="Share a limerick, maybe" bind:value={content} on:keydown={(e) => {
      if (e.key === 'Enter' && e.metaKey) {
        post();
      }
    }}/>
    {#if uploadedImageUrl}
      <div class="flex">
        <img src={uploadedImageUrl} class="object-cover" alt="uploaded" />
      </div>
    {/if}
    {#if linkToPreview}
      <LinkPreview url={linkToPreview} />
    {/if}
  </div>
  <div class="col-span-12 col-start-2 flex justify-between">
    {#if recommendButtons}
      <div class="flex gap-1 items-center">
        <div class="rounded-full overflow-hidden">
          <IconButton
            icon={AppIcon}
            on:click={() => {
              appModalOpen = true;
            }}
            class="fill-black dark:fill-white hover:fill-grey dark:hover:fill-grey"
          />
        </div>
        <div class="rounded-full overflow-hidden">
          <IconButton
            icon={PeopleIcon}
            on:click={() => {
              groupModalOpen = true;
            }}
            class="fill-white dark:fill-grey hover:fill-grey dark:hover:fill-black"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          class="hidden"
          bind:this={fileInput}
          on:change={handleImageSelect}
        />
        <div class="rounded-full overflow-hidden">
          <IconButton
            icon={ImageIcon}
            disabled={!$state.s3 || !$state.s3.configuration?.currentBucket}
            tooltip="Configure S3 storage for image support"
            on:click={() => {
              if (!$state.s3 || !$state.s3.configuration?.currentBucket) return;
              fileInput.click();
            }}
            class="stroke-grey fill-grey hover:fill-black dark:hover:fill-grey"
          />
        </div>
      </div>
    {:else if ratingStars}
      <StarRating
        on:change={handleRate}
        config={{
          readOnly: false,
          countStars: 5,
          range: { min: 0, max: 5, step: 1 },
          score: rating,
        }}
      />
    {:else}
      <div />
    {/if}
    <button
      class="bg-black dark:bg-white text-white dark:text-darkgrey hover:bg-grey dark:hover:bg-offwhite hover:duration-500 font-saucebold rounded-lg px-3 py-1 self-end"
      on:click={post}>Post</button
    >
  </div>
  {#if error}
    <div class="col-span-11 col-start-2 text-error pt-2">{error}</div>
  {/if}
  <Modal bind:open={appModalOpen}>
    <div class="flex flex-col gap-4 p-4">
      <div class="text-2xl font-bold">Recommend an app</div>
      {#if Object.values(apps).length === 0}
        <div>
          You have not installed any apps yet. Install some to recommend them on
          Portal.
        </div>
      {/if}
      {#each Object.entries(apps) as [path, { title, image, color }]}
        <button
          class="grid grid-cols-12 dark:border dark:hover:border-white hover:duration-500 rounded-lg items-center gap-4 p-1 hover:bg-panels-hover dark:hover:bg-transparent"
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
    <div class="flex flex-col gap-4 p-4">
      <div class="text-2xl font-bold">Recommend a group</div>
      {#if Object.values(groups).length === 0}
        <div>
          You are not a member of any groups yet, join some in order to
          recommend them on Portal.
        </div>
      {/if}
      {#each Object.entries(groups) as [path, { meta: { title, image } }]}
        <button
          class="grid grid-cols-12 dark:border dark:hover:border-white hover:duration-500 hover:bg-panels-hover rounded-lg items-center gap-4 p-1 hover:bg-panels dark:hover:bg-transparent"
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
