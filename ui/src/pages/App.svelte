<script>
  import { poke } from '@root/api';
  import { state, getItem, refreshApps, keyStrToObj } from '@root/state';
  import { getMeta } from '@root/util';
  import { ItemDetail, RecommendModal } from '@components';
  import { RightSidebar, AsyncButton } from '@fragments';
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
          <a
            target="_blank"
            href={`${window.location.origin}/${servedFrom}/`}
            class="py-1 border text-center"
            on:click={open}>Open {title}</a
          >
        {:else if isInstalling}
          <AsyncButton loading={true} class="py-1 border"
            >Installing...</AsyncButton
          >
        {:else}
          <AsyncButton class="py-1 border" on:click={install}
            >Install {title}</AsyncButton
          >
        {/if}
        {#if website}
          <a
            target="_blank"
            href={website}
            class="py-1 border text-center"
            on:click={open}>View website</a
          >
        {/if}
        <button
          class="border py-1 text-center"
          on:click={() => (recommendModalOpen = true)}>Recommend {title}</button
        >
        {#if isInstalled}
          <AsyncButton on:click={uninstall}>Uninstall {title}</AsyncButton>
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
