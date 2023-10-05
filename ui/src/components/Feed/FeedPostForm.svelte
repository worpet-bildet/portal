<script lang="ts">
  import { DocketApp } from '$types/apps/app';
  import { ChatWrit } from '$types/landscape/chat';
  import { DiaryNote } from '$types/landscape/diary';
  import { Groups } from '$types/landscape/groups';
  import { HeapCurio } from '$types/landscape/heap';
  import { ItemKey } from '$types/portal/item';
  import { Create } from '$types/portal/poke';

  import { api, me } from '@root/api';
  import { itemInState, setIsComposing, state } from '@root/state';
  import {
    formatChatPath,
    formatCurioPath,
    formatNotePath,
    getAnyLink,
    getChatDetails,
    getCurioDetails,
    getNoteDetails,
    isChatPath,
    isCurioPath,
    isNotePath,
    isValidPatp,
    toUrbitTime,
  } from '@root/util';

  import {
    GroupsChatMessage,
    GroupsDiaryNote,
    GroupsHeapCurio,
    InlineShip,
    RichTextArea,
  } from '@components';
  import { UrbitIcon, CollectionIcon, LinkPreview, LoadingIcon, ArrowBackIcon } from '@fragments';
  import { Editor } from '@tiptap/core';

  export let replyTo: ItemKey | undefined = undefined;
  export let showRecommendButtons = true;
  export let showRatingStars = false;
  export let error: string | boolean = false;
  export let placeholder = '';
  export let buttonText = 'Post';
  export let replyingToNames: string[] = [];
  export let editor: Editor = undefined;

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
    // If we have some chat details here, we should generate the reference and
    // then send the reference back up with the post
    let ref: ItemKey;
    const time = toUrbitTime(Date.now());
    if (chatDetails) {
      const { host, channel, poster, id } = chatDetails;
      ref = { struc: 'groups-chat-msg', ship: me, cord: '', time };
      api.portal.do.createGroupsChatMsg(host, channel, poster, id, time);
    }
    if (curioDetails) {
      const { host, channel, id } = curioDetails;
      ref = { struc: 'groups-heap-curio', ship: me, cord: '', time };
      api.portal.do.createGroupsHeapCurio(host, channel, id, time);
    }
    if (noteDetails) {
      const { host, channel, id } = noteDetails;
      ref = { struc: 'groups-diary-note', ship: me, cord: '', time };
      api.portal.do.createGroupsDiaryNote(host, channel, id, time);
    }

    // TODO: Split this out into a function
    let post = { time, 'tags-to': [] } as Create;
    if (ref) {
      // Here we need to create the retweet post instead of the type "other"
      post = {
        ...post,
        bespoke: { retweet: { ref: ref, blurb: content || '' } },
      };
    } else {
      post = {
        ...post,
        bespoke: {
          other: {
            title: '',
            blurb: content || '',
            link: '',
            image: uploadedImageUrl || '',
          },
        },
      };
    }

    if (replyTo) {
      post = {
        ...post,
        'tags-to': [
          ...post['tags-to'],
          {
            key: replyTo,
            'tag-to': `/${me}/reply-to`,
            'tag-from': `/${replyTo.ship}/reply-from`,
          },
        ],
      };
    } else {
      post = {
        ...post,
        'prepend-to-feed': [
          { ship: me, struc: 'feed', time: '~2000.1.1', cord: '' },
        ],
      };
    }

    // check each word of the content for a mention, and if so, create a social
    // graph tag for the mention
    content
      .split(' ')
      .filter((word) => word.substring(0, 1) === '~' && isValidPatp(word))
      .forEach((word) => {
        post = {
          ...post,
          'tags-to': [
            ...post['tags-to'],
            {
              key: { struc: 'ship', ship: word, cord: '', time: '' },
              'tag-to': `/${me}/mention-to`,
              'tag-from': `/${word}/mention-from`,
            },
          ],
        };
      });

    api.portal.do.create(post);

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
      alert(
        'Posting might have failed. Please save your work, then refresh the page and try again.'
      );
      return;
    }

    editor.commands.clearContent();
    uploadedImageUrl = '';
    error = '';
    chatDetails = undefined;
    chatWrit = undefined;
    curioDetails = undefined;
    heapCurio = undefined;
    noteDetails = undefined;
    diaryNote = undefined;
    rating = undefined;
    setIsComposing(false);
  };

  let fileInput: HTMLInputElement;
  let uploadedImageUrl: string;

  let groups: Groups = {};
  let apps: { [key: string]: DocketApp } = {};
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

  const handleImageSelect = async (e: Event): Promise<void> => {
    uploadedImageUrl = await api.s3.do.uploadImage(
      (e.target as HTMLInputElement).files[0],
      $state.s3
    );
  };

  const handleRate = (event: InputEvent) => {
    rating = Number((event.target as HTMLInputElement).value);
  };

  const removeText = (str: string) => {
    let to = editor.state.doc.content.size;
    let from = to - str.length - 1;
    editor.commands.deleteRange({ from, to });
  };

  const getAnyChatMessage = (content: string): string =>
    content.split(/[\r\n|\s]+/).find((word) => isChatPath(word));
  const getAnyCurio = (content: string): string =>
    content.split(/[\r\n|\s]+/).find((word) => isCurioPath(word));
  const getAnyNote = (content: string): string =>
    content.split(/[\r\n|\s]+/).find((word) => isNotePath(word));

  $: linkToPreview = getAnyLink(content || '');

  let chatWrit: ChatWrit;
  let chatDetails;
  const getChatWrit = async (chatPath: string) => {
    chatWrit = await api.portal.get.chatWrit(formatChatPath(chatPath));
    chatDetails = getChatDetails(chatPath);
    removeText(chatPath);
  };

  let heapCurio: HeapCurio;
  let curioDetails;
  const getHeapCurio = async (curioPath: string) => {
    heapCurio = await api.portal.get.heapCurio(formatCurioPath(curioPath));
    curioDetails = getCurioDetails(curioPath);
    removeText(curioPath);
  };

  let diaryNote: DiaryNote;
  let noteDetails;
  const getDiaryNote = async (notePath: string) => {
    diaryNote = await api.portal.get.diaryNote(formatNotePath(notePath));
    noteDetails = getNoteDetails(notePath);
    removeText(notePath);
  };

  $: chatToPreview = getAnyChatMessage(content || '');
  $: if (chatToPreview) getChatWrit(chatToPreview);
  $: curioToPreview = getAnyCurio(content || '');
  $: if (curioToPreview) getHeapCurio(curioToPreview);
  $: noteToPreview = getAnyNote(content || '');
  $: if (noteToPreview) getDiaryNote(noteToPreview);
</script>

<div
  class="flex flex-col w-full h-full sm:h-auto border border-mute p-3 gap-4 rounded-xl"
  class:relative={submitting}
>
  {#if submitting}
    <div class="absolute top-0 left-0 w-full h-full bg-white/70 z-10">
      <div class="flex w-full h-full items-center justify-center opacity-100">
        <div class="w-10 h-10">
          <LoadingIcon />
        </div>
      </div>
    </div>
  {/if}
  <div class="flex justify-between items-center w-full"
    class:hidden={!$state.isComposing}>
    <button
      class="px-3 py-2 rounded-lg text-tertiary border border-mute flex items-center gap-2"
      on:click={() => setIsComposing(false)}>
      <div class="w-4 h-4">
        <ArrowBackIcon />
      </div>
      Back
    </button>
    <button class="py-2 px-3 ml-2 rounded-lg bg-black text-white font-bold"
      on:click={post}>
      {#if replyTo}Reply{:else}Post{/if}
    </button>
  </div>
  <div class="flex items-center gap-2">
    <InlineShip patp={me} isExpanded noSigil/>
    <div class="flex w-full justify-end overflow-hidden">
      <RichTextArea
        bind:editor
        bind:content
        {placeholder}
        on:keyboardSubmit={post}
        class="resize-y"
        style="min-height: 10px; max-height: 500px;"
      />
    </div>
  </div>
  {#if chatWrit}
    <GroupsChatMessage {...chatWrit.memo} />
  {/if}
  {#if heapCurio}
    <GroupsHeapCurio {...heapCurio} />
  {/if}
  {#if diaryNote}
    <GroupsDiaryNote {...diaryNote} />
  {/if}
  {#if linkToPreview}
    <LinkPreview url={linkToPreview} />
  {/if}
  {#if uploadedImageUrl}
    <div class="flex w-full items-center justify-center">
      <img
        src={uploadedImageUrl}
        alt="attachment"
        class="w-full h-full object-cover rounded-xl"
      />
    </div>
  {/if}
  <div class="flex justify-between items-center w-full">
    <div class="flex items-center ml-12">
      <button
        class="w-10 p-2 rounded-lg text-black"
        class:text-tertiary={!$state.s3}
        on:click={() => fileInput.click()}><CollectionIcon /></button
      >
      <button
        class="w-10 p-2.5 rounded-lg text-black"
        on:click={() => { editor.chain().insertContent('~').run(); }}><UrbitIcon /></button
      >
      <input
        type="file"
        class="hidden"
        accept="image/*"
        bind:this={fileInput}
        on:change={handleImageSelect}
      />
    </div>
    <button class="py-1 px-3 ml-2 rounded-lg bg-black text-white font-bold"
      class:hidden={$state.isComposing}
      on:click={post}>
      {#if replyTo}Reply{:else}Post{/if}
    </button>
  </div>
</div>
