<script>
  import { createEventDispatcher } from 'svelte';
  import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
  import { me, poke } from '@root/api';
  import { state, keyStrToObj } from '@root/state';
  import { toUrbitTime } from '@root/util';
  import { RecommendModal, Sigil } from '@components';
  import {
    TextArea,
    IconButton,
    AppIcon,
    GroupIcon,
    ImageIcon,
    Modal,
    ItemImage,
  } from '@fragments';

  export let replyTo;
  export let recommendButtons = true;

  let dispatch = createEventDispatcher();
  let content;

  const post = () => {
    let p = {
      app: 'portal-manager',
      mark: 'portal-action',
      json: {
        create: {
          bespoke: {
            other: {
              title: '',
              blurb: content,
              link: '',
              image: uploadedImageUrl,
            },
          },
        },
      },
    };
    if (!replyTo) {
      p.json.create['prepend-to-feed'] = [
        {
          ship: me,
          struc: 'feed',
          time: '~2000.1.1',
          cord: '',
        },
      ];
    } else {
      p.json.create['tags-to'] = [
        {
          key: replyTo,
          'tag-to': `/${me}/reply-to`,
          'tag-from': `/${replyTo.ship}/reply-from`,
        },
      ];
    }
    poke(p);
    content = '';
    uploadedImageUrl = '';
    dispatch('post');
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
    const file = e.target.files[0];
    const fileParts = file.name.split('.');
    const fileName = fileParts.slice(0, -1);
    const fileExtension = fileParts.pop();
    const timestamp = toUrbitTime(new Date()).slice(1);

    const params = {
      Bucket: $state.s3.configuration.currentBucket,
      Key: `${me}/${timestamp}-${fileName}.${fileExtension}`,
      Body: file,
      ACL: 'public-read',
      ContentType: file.type,
    };

    let s3 = new S3Client({
      credentials: $state.s3.credentials,
      endpoint: $state.s3.credentials.endpoint,
      region: $state.s3.configuration.region,
    });
    const command = new PutObjectCommand(params);
    await s3.send(command);

    uploadedImageUrl = `${$state.s3.credentials.endpoint}/${params.Bucket}/${params.Key}`;
  };
</script>

<div class="grid grid-cols-12 bg-panels py-3 pl-3 rounded-lg pr-3">
  <div class="col-span-1 pr-2">
    <div class="rounded-md overflow-hidden align-middle">
      <Sigil patp={me} />
    </div>
  </div>
  <div class="col-span-11">
    <TextArea placeholder="Share a limerick, maybe" bind:value={content} />
    {#if uploadedImageUrl}
      <div class="flex">
        <img src={uploadedImageUrl} class="object-cover" alt="your image" />
      </div>
    {/if}
  </div>
  <div class="col-span-12 col-start-2 flex justify-between">
    {#if recommendButtons}
      <div class="flex gap-1">
        <div class="rounded-full overflow-hidden">
          <IconButton
            icon={AppIcon}
            on:click={() => {
              appModalOpen = true;
            }}
            transparent
          />
        </div>
        <div class="rounded-full overflow-hidden">
          <IconButton
            icon={GroupIcon}
            on:click={() => {
              groupModalOpen = true;
            }}
            transparent
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
            disabled={!$state.s3 || !$state.s3.configuration.currentBucket}
            tooltip="Configure S3 storage for image support"
            on:click={() => {
              if (!$state.s3 || !$state.s3.configuration.currentBucket) return;
              fileInput.click();
              console.log('pop the image modal for uploading something to s3');
            }}
            transparent
          />
        </div>
      </div>
    {:else}
      <div />
    {/if}
    <button
      class="bg-hover text-grey hover:bg-mdark hover:duration-500 font-saucebold rounded-lg px-3 py-1 self-end"
      on:click={post}>Post</button
    >
  </div>
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
          class="grid grid-cols-12 hover:bg-panels rounded-lg items-center gap-4 p-1"
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
    <div class="flex flex-col gap-4 p4">
      <div class="text-2xl font-bold">Recommend a group</div>
      {#if Object.values(groups).length === 0}
        <div>
          You are not a member of any groups yet, join some in order to
          recommend them on Portal.
        </div>
      {/if}
      {#each Object.entries(groups) as [path, { meta: { title, image } }]}
        <button
          class="grid grid-cols-12 hover:bg-panels rounded-lg items-center gap-4 p-1"
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
