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
    formatPatp,
  } from '@root/util';

  import {
    RecommendModal,
    Sigil,
    ItemPreview,
    GroupsChatMessage,
    GroupsHeapCurio,
    GroupsDiaryNote,
    InlineShip,
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

  // from this, we are going to construct a list of the patps that the user is
  // replying to
  export let replyingTo: ItemKey | boolean = false;
</script>

<div class="flex flex-col w-full border rounded-lg p-4 gap-4 relative">
  {#if submitting}
    <div
      class="absolute top-0 left-0 w-full h-full bg-white/30 dark:opacity-40 z-10 backdrop-blur-sm"
    >
      <div class="flex w-full h-full items-center justify-center opacity-100">
        <LoadingIcon />
      </div>
    </div>
  {/if}
  <div class="flex items-center gap-2">
    <InlineShip patp={me} />
  </div>
  <div class="flex w-full">
    <TextArea
      bind:value={content}
      placeholder="/ Share anything you like"
      on:keyboardSubmit={post}
    />
  </div>
  <div class="flex justify-end w-full">
    <button class="py-1 px-4 rounded-md bg-black text-white">Post</button>
  </div>
</div>
