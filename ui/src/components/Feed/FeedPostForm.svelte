<script lang="ts">
  import { ItemKey } from '$types/portal/item';
  import { ChatMessage } from '$types/landscape/chat';
  import { DiaryNote } from '$types/landscape/diary';
  import { HeapCurio } from '$types/landscape/heap';

  import { createEventDispatcher } from 'svelte';
  import { api, me } from '@root/api';
  import {
    state,
    keyStrToObj,
    getGroup,
    getApp,
    itemInState,
  } from '@root/state';
  import {
    getAnyLink,
    isChatPath,
    isCurioPath,
    isNotePath,
    isShortcode,
    formatChatPath,
    formatCurioPath,
    formatNotePath,
    getChatDetails,
    getCurioDetails,
    getNoteDetails,
    toUrbitTime,
  } from '@root/util';
  import {
    RecommendModal,
    Sigil,
    ItemPreview,
    GroupsChatMessage,
    GroupsHeapCurio,
    GroupsDiaryNote,
  } from '@components';
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
    LoadingIcon,
  } from '@fragments';

  export let replyTo: ItemKey | boolean = false;
  export let showRecommendButtons = true;
  export let showRatingStars = false;
  export let error: string | boolean = false;
  export let placeholder = '';
  export let buttonText = 'Post';

  let dispatch = createEventDispatcher();
  let content: string;
  let rating: number;

  let submitting: boolean;
  const post = async () => {
    if (submitting) return;
    if (!content) {
      return (error = 'Please write something, anything.');
    }
    if ((showRatingStars && !rating) || Number(rating) === 0) {
      return (error = 'Please give a score.');
    }
    if (shortcodeItems && shortcodeItems.length > 1) {
      return (error = 'Please select one of the items to recommend.');
    }
    // If we have some chat details here, we should generate the reference and
    // then send the reference back up with the post
    let ref;
    if (chatDetails) {
      const { host, channel, poster, id } = chatDetails;
      const time = toUrbitTime(Date.now());
      ref = {
        struc: 'groups-chat-msg',
        ship: me,
        cord: '',
        time,
      };
      api.portal.do.createGroupsChatMsg(host, channel, poster, id, time);
    }
    if (curioDetails) {
      const { host, channel, id } = curioDetails;
      const time = toUrbitTime(Date.now());
      ref = {
        struc: 'groups-heap-curio',
        ship: me,
        cord: '',
        time,
      };
      api.portal.do.createGroupsHeapCurio(host, channel, id, time);
    }
    if (noteDetails) {
      const { host, channel, id } = noteDetails;
      const time = toUrbitTime(Date.now());
      ref = {
        struc: 'groups-diary-note',
        ship: me,
        cord: '',
        time,
      };
      api.portal.do.createGroupsDiaryNote(host, channel, id, time);
    }
    if (shortcodeItems && shortcodeItems.length === 1) {
      const { keyObj } = shortcodeItems[0];
      ref = { ...keyObj };
    }

    const time = toUrbitTime(Date.now());
    dispatch('post', {
      content,
      uploadedImageUrl,
      replyTo,
      rating,
      ref,
      time,
    });

    submitting = true;
    try {
      await itemInState({
        struc: ref ? 'retweet' : 'other',
        ship: me,
        cord: '',
        time,
      });
      submitting = false;
    } catch (e) {
      alert('Posting failed, please refresh the page and try again.');
    }

    content = '';
    uploadedImageUrl = '';
    error = '';
    chatDetails = undefined;
    chatData = undefined;
    curioDetails = undefined;
    curioData = undefined;
    noteDetails = undefined;
    noteData = undefined;
    shortcodeToPreview = undefined;
    shortcodeItems = undefined;
    rating = undefined;
  };

  // TODO: Factor out the selection of groups/apps into its own component
  let groupModalOpen: boolean;
  let appModalOpen: boolean;
  let recommendModalOpen: boolean;
  let selectedKey: ItemKey;
  let fileInput: HTMLInputElement;
  let uploadedImageUrl: string;

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

  const handleImageSelect = async (e): Promise<void> => {
    uploadedImageUrl = await api.s3.do.uploadImage(
      e.target.files[0],
      $state.s3
    );
  };

  const handleRate = (event: InputEvent) => {
    rating = Number((event.target as HTMLInputElement).value);
  };

  const getAnyChatMessage = (content: string): string =>
    content.split(/[\r\n|\s]+/).find((word) => isChatPath(word));
  const getAnyCurio = (content: string): string =>
    content.split(/[\r\n|\s]+/).find((word) => isCurioPath(word));
  const getAnyNote = (content: string): string =>
    content.split(/[\r\n|\s]+/).find((word) => isNotePath(word));
  const getAnyShortcode = (content: string): string =>
    content.split(/[\r\n|\s]+/).find((word) => isShortcode(word));

  $: linkToPreview = getAnyLink(content || '');

  let chatData: ChatMessage;
  let chatDetails;
  const getChatData = async (chatPath) => {
    chatData = await api.portal.get.chatMessage(formatChatPath(chatPath));
    chatDetails = getChatDetails(chatPath);
    content = content.replace(chatPath, '');
  };

  let curioData: HeapCurio;
  let curioDetails;
  const getCurioData = async (curioPath) => {
    curioData = await api.portal.get.heapCurio(formatCurioPath(curioPath));
    curioDetails = getCurioDetails(curioPath);
    content = content.replace(curioPath, '');
  };

  let noteData: DiaryNote;
  let noteDetails;
  const getNoteData = async (notePath) => {
    noteData = await api.portal.get.diaryNote(formatNotePath(notePath));
    noteDetails = getNoteDetails(notePath);
    content = content.replace(notePath, '');
  };

  let shortcodeToPreview, shortcodeItems;
  const getShortcodeItem = (shortcode) => {
    if (!getGroup(shortcode) && !getApp(shortcode)) {
      shortcodeItems = [];
      return;
    }
    shortcodeItems = [getGroup(shortcode), getApp(shortcode)].filter(
      (i) => !!i
    );
    content = content.replace(shortcode, '');
  };

  $: chatToPreview = getAnyChatMessage(content || '');
  $: if (chatToPreview) getChatData(chatToPreview);
  $: curioToPreview = getAnyCurio(content || '');
  $: if (curioToPreview) getCurioData(curioToPreview);
  $: noteToPreview = getAnyNote(content || '');
  $: if (noteToPreview) getNoteData(noteToPreview);
  $: shortcodeToPreview = getAnyShortcode(content || '');
  $: if (shortcodeToPreview) getShortcodeItem(shortcodeToPreview);
</script>

<div
  class="relative grid grid-cols-12 bg-panels dark:bg-darkgrey border-x border-b py-5 pl-5 pr-3 gap-2 lg:gap-4 {$$props.class}"
  class:border-error={error}
>
  {#if submitting}
    <div
      class="absolute top-0 left-0 w-full h-full bg-white/30 dark:opacity-40 z-10 backdrop-blur-3xl"
    >
      <div class="flex w-full h-full items-center justify-center opacity-100">
        <LoadingIcon />
      </div>
    </div>
  {/if}
  <div class="col-span-1">
    <div class="rounded-md overflow-hidden align-middle">
      <Sigil patp={me} />
    </div>
  </div>
  <div class="col-span-11 pb-2 flex flex-col gap-2">
    <TextArea {placeholder} bind:value={content} on:keyboardSubmit={post} />
    {#if shortcodeItems}
      {#if shortcodeItems.length > 1}
        <div class="font-bold">Please select one of the items</div>
      {/if}
      {#each shortcodeItems as item}
        <ItemPreview
          key={item.keyObj}
          clickable={false}
          on:click={() => {
            // remove the other item from the shortcodeitems list, because we
            // can only reference one at a time
            shortcodeItems = [item];
          }}
        />
      {/each}
    {/if}
    {#if uploadedImageUrl}
      <div class="flex">
        <img src={uploadedImageUrl} class="object-cover" alt="uploaded" />
      </div>
    {/if}
    {#if linkToPreview}
      <LinkPreview url={linkToPreview} />
    {/if}
    {#if chatData}
      <GroupsChatMessage {...chatData} />
    {/if}
    {#if curioData}
      <GroupsHeapCurio {...curioData} />
    {/if}
    {#if noteData}
      <GroupsDiaryNote {...noteData} />
    {/if}
  </div>
  <div class="col-span-12 col-start-2 flex justify-between">
    {#if showRecommendButtons}
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
            on:click={() => {
              if (!$state.s3 || !$state.s3.configuration?.currentBucket) {
                alert(
                  'For attachment support, configure S3 storage with ~dister-nocsyx-lassul/silo. Otherwise, paste a link to a hosted image.'
                );
              } else {
                fileInput.click();
              }
            }}
            class="stroke-grey fill-grey hover:fill-black dark:hover:fill-grey"
          />
        </div>
      </div>
    {:else if showRatingStars}
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
      class="bg-black dark:bg-white text-white dark:text-darkgrey hover:bg-grey dark:hover:bg-offwhite hover:duration-500 font-bold rounded-lg px-3 py-1 self-end"
      on:click={post}>{buttonText}</button
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
