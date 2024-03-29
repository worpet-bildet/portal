<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { push } from 'svelte-spa-router';

  import { api } from '@root/api';
  import { refreshApps } from '@root/state';
  import { getMeta } from '@root/util';

  import { MoreFrom, RecommendModal } from '@components';
  import {
    AppsIcon,
    CancelIcon,
    DownloadIcon,
    ETHIcon,
    IconButton,
    ItemImage,
    LinkIcon,
    RepostIcon,
  } from '@fragments';

  export let app;
  export let isInstalled;
  export let isInstalling;
  export let purchased;

  const dispatch = createEventDispatcher();

  const install = (installShip, desk) => {
    // FIXME: stopgap
    isInstalling = true;
    window.open(
      `${window.location.origin}/apps/landscape/search/${installShip}/apps`
    );
    api.urbit.do.installApp(installShip, desk).then(refreshApps);
  };

  const uninstall = (desk) => {
    api.urbit.do.uninstallApp(desk).then(refreshApps);
  };

  let recommendModalOpen;
</script>

{#if app}
  {@const {
    title,
    nickname,
    ship,
    image,
    description,
    color,
    servedFrom,
    ethPrice,
    distShip,
    desk,
    link,
  } = getMeta(app)}

  <div class="col-span-12 md:col-span-5">
    <div
      class="flex flex-col gap-3 p-6 border dark:border-glass rounded-xl sticky top-4"
    >
      <div class="flex flex-col gap-2">
        <div class="w-24 overflow-hidden rounded-xl">
          <ItemImage {image} {color} {title} />
        </div>
        <div class="flex flex-col">
          <div class="font-bold text-xl">{nickname ? nickname : title}</div>
          <div class="text-sm text-grey flex items-center gap-1">
            <button on:click={() => push(`#/${ship}`)} class="hover:underline"
              >Hosted by {ship}</button
            >
          </div>
        </div>
        <div>
          {description}
        </div>
      </div>

      <div class="flex flex-wrap gap-4">
        {#if isInstalled}
          <IconButton
            icon={AppsIcon}
            on:click={() =>
              window.open(`${window.location.origin}${servedFrom}/`)}
            class="bg-black dark:bg-white text-white dark:text-black w-fit">Open</IconButton
          >
        {:else if isInstalling}
          <IconButton loading class="bg-black text-white w-fit dark:stroke-white"
            >Installing...</IconButton
          >
        {:else if ethPrice && !purchased}
          <IconButton
            icon={ETHIcon}
            on:click={() => dispatch('purchase')}
            class="bg-black dark:bg-white text-white dark:text-black w-fit">Purchase</IconButton
          >
        {:else}
          <IconButton
            icon={DownloadIcon}
            on:click={() => install(distShip, desk)}
            class="bg-black dark:bg-white text-white dark:text-black w-fit">Install</IconButton
          >
        {/if}
        {#if link}
          <IconButton
            icon={LinkIcon}
            on:click={() => window.open(link)}
            class="bg-panelhover text-secondary w-fit">View Website</IconButton
          >
        {/if}
        <IconButton
          icon={RepostIcon}
          on:click={() => (recommendModalOpen = true)}
          class="bg-panelhover text-secondary w-fit">Recommend</IconButton
        >
        {#if isInstalled}
          <IconButton
            icon={CancelIcon}
            on:click={() => uninstall(desk)}
            async
            class="text-tertiary bg-panel w-fit">Uninstall</IconButton
          >
        {/if}
      </div>

      <MoreFrom patp={ship} exclude={[app.keyStr]} />
    </div>
  </div>
  <RecommendModal bind:open={recommendModalOpen} key={app.keyObj} />
{/if}
