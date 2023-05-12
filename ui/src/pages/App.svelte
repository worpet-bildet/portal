<script>
  import { poke, subscribeToItem } from '@root/api';
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
    SidebarGroup,
  } from '@fragments';

  let host,
    cord,
    itemKey,
    item,
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
    servedFrom,
    recommendModalOpen;

  export let params;
  $: {
    ({ host, cord } = params);
    itemKey = `/app/${host}/${cord}/`;
    loadApp($state);
  }
  const loadApp = (s) => {
    if (!itemKey) return;
    item = getItem(itemKey);
    if (!item) return subscribeToItem(keyStrToObj(itemKey));
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
    isInstalling =
      s.apps?.[cord]?.chad?.hasOwnProperty('install') || isInstalling;
    isInstalled = !isInstalling && !!s.apps?.[cord];
  };

  state.subscribe((s) => {
    if (!s.isLoaded) return;
    loadApp(s);
  });

  const uninstall = () => {
    poke({
      app: 'docket',
      mark: 'docket-uninstall',
      json: cord,
    }).then(refreshApps);
  };
  const install = async () => {
    isInstalling = true;
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
</script>

{#if item}
  <div class="grid grid-cols-12 gap-x-8">
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
      <SidebarGroup>
        {#if isInstalled}
          <IconButton
            icon={AppIcon}
            on:click={() =>
              window.open(`${window.location.origin}${servedFrom}`)}
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
      </SidebarGroup>
    </RightSidebar>
  </div>
  <RecommendModal
    bind:open={recommendModalOpen}
    key={keyStrToObj(itemKey)}
    {title}
  />
{/if}
