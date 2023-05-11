<script>
  import { poke } from '@root/api';
  import { state, getItem, refreshApps, keyStrToObj } from '@root/state';
  import { getMeta } from '@root/util';
  import { ItemDetail, RecommendModal } from '@components';
  import {
    RightSidebar,
    IconButton,
    ShareIcon,
    CrossIcon,
    InstallIcon,
    GlobeIcon,
    AppIcon,
  } from '@fragments';
  export let params;
  let { host, cord } = params;
  const itemKey = `/app/${host}/${cord}/`;

  let item,
    image,
    title,
    description,
    ship,
    website,
    color,
    version,
    hash,
    isInstalling,
    isInstalled,
    servedFrom;
  state.subscribe((s) => {
    item = getItem(itemKey);
    if (!item) return;
    ({
      image,
      title,
      description,
      ship,
      website,
      color,
      version,
      hash,
      servedFrom,
    } = getMeta(item));
    isInstalling = s.apps?.[cord]?.chad?.hasOwnProperty('install');
    isInstalled = !isInstalling && !!s.apps?.[cord];
  });

  $: console.log({ isInstalling });

  const open = () => {};
  const uninstall = () => {
    poke({
      app: 'docket',
      mark: 'docket-uninstall',
      json: cord,
    }).then(refreshApps);
  };
  const install = async () => {
    isInstalling = true;
    console.log({ ship, cord });
    await poke({
      app: 'docket',
      mark: 'docket-install',
      json: `${ship}/${cord}`,
    });
    await poke({
      app: 'hood',
      mark: 'kiln-revive',
      json: cord,
    });
    refreshApps();
  };

  let recommendModalOpen;
</script>

{#if item}
  <div class="grid grid-cols-12 gap-8">
    <ItemDetail
      {title}
      {description}
      patp={ship}
      {color}
      avatar={image}
      type="app"
    >
      <div class="grid gap-8">
        <div>
          <div class="text-2xl font-bold">
            Current {title} version
          </div>
          <div class="text-lg">
            {version}
          </div>
        </div>
        <div>
          <div class="text-2xl font-bold">
            Current {title} hash
          </div>
          <pre class="flex justify-start text-lg">
            {hash}
          </pre>
        </div>
      </div>
    </ItemDetail>
    <RightSidebar>
      <div class="grid gap-4">
        {#if isInstalled}
          <IconButton
            icon={AppIcon}
            on:click={() =>
              window.open(`${window.location.origin}/${servedFrom}/`)}
            >Open {title}</IconButton
          >
        {:else if isInstalling}
          <IconButton loading>Installing...</IconButton>
        {:else}
          <IconButton icon={InstallIcon} on:click={install} async
            >Install {title}</IconButton
          >
        {/if}
        {#if website}
          <IconButton icon={GlobeIcon} on:click={() => window.open(website)}
            >View Website</IconButton
          >
        {/if}
        <IconButton
          icon={ShareIcon}
          on:click={() => (recommendModalOpen = true)}
          >Recommend {title}</IconButton
        >
        {#if isInstalled}
          <IconButton icon={CrossIcon} on:click={uninstall} async
            >Uninstall {title}</IconButton
          >
        {/if}
      </div>
    </RightSidebar>
  </div>
  <RecommendModal
    bind:open={recommendModalOpen}
    key={keyStrToObj(itemKey)}
    {title}
  />
{/if}
