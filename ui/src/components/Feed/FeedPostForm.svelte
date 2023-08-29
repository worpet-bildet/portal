<script>
  import { createEventDispatcher } from 'svelte';
  import { api, me } from '@root/api';
  import { state, keyStrToObj } from '@root/state';
  import {
    getAnyLink,
    isChatPath,
    formatChatPath,
    getChatDetails,
    toUrbitTime,
  } from '@root/util';
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
    GroupsChatMessage,
  } from '@fragments';

  export let replyTo;
  export let recommendButtons = true;
  export let ratingStars = false;
  export let error;
  export let placeholder;
  export let buttonText = 'Post';

  let dispatch = createEventDispatcher();
  let content, rating;

  const getReference = (plaintextReference) => {
    if ($state[plaintextReference]) {
      return keyStrToObj($state[plaintextReference]);
    }
  }

  const post = () => {
    if (!content) {
      return (error = 'Please write something, anything.');
    }
    if ((ratingStars && !rating) || Number(rating) === 0) {
      return (error = 'Please give a score.');
    }
    // If we have some chat details here, we should generate the reference and
    // then send the reference back up with the post, so it can decide whether
    // to make a retweet or not
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
    if (plaintextReference) {
      ref = getReference(plaintextReference);
    }
    dispatch('post', { content, uploadedImageUrl, replyTo, rating, ref });
    content = '';
    uploadedImageUrl = '';
    rating = '';
    error = '';
    chatDetails = undefined;
    chatData = undefined;
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
  const getAnyChatMessage = (content) =>
    content.split(/[\r\n|\s]+/).find((line) => isChatPath(line));

  $: linkToPreview = getAnyLink(content || '');

  let chatData, chatDetails;
  const getChatData = async (chatPath) => {
    chatData = await api.portal.get.chatMessage(formatChatPath(chatPath));
    // If there is some chatData here we probably want to replace the chat link
    // in the proposed input with an empty character, but we still want to save
    // the chat link somewhere, presumably, so that we can eventually send it to
    // the backend
    chatDetails = getChatDetails(chatPath);
    content = content.replace(chatPath, '');
  };

  let plaintextReference;
  const pattern = /~\w+\/\w+/g;
  const match = content.match(pattern);
  if (match) {
    plaintextReference = match[0];
  }

  $: chatToPreview = getAnyChatMessage(content || '');
  $: if (chatToPreview) getChatData(chatToPreview);
</script>

<div
  class="grid grid-cols-12 bg-panels dark:bg-darkgrey border-x border-b py-5 pl-5 pr-3 gap-2 lg:gap-4 {$$props.class}"
  class:border-error={error}
>
  <div class="col-span-1">
    <div class="rounded-md overflow-hidden align-middle">
      <Sigil patp={me} />
    </div>
  </div>
  <div class="col-span-11 pb-2 flex flex-col gap-2">
    <TextArea placeholder={placeholder} bind:value={content} on:keydown={(e) => {
      if (e.key === 'Enter' && e.metaKey) {
        console.log('Meta + Enter detected');
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
    {#if chatData}
      {@const {
        memo: { content, author },
      } = chatData}
      <GroupsChatMessage {author} {content} />
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
            on:click={() => {
              if (!$state.s3 || !$state.s3.configuration?.currentBucket) {
                alert('For attachment support, configure S3 storage with ~dister-nocsyx-lassul/silo. Otherwise, paste a link to a hosted image.');
              } else {
                fileInput.click();
              }
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
