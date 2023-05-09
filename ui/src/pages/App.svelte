<script>
  import { poke } from '@root/api';
  import { state, getItem, refreshApps } from '@root/state';
  import { getMeta } from '@root/util';
  import { ItemDetail } from '@components';
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
    isInstalled = s.apps && !!s.apps[cord];
  });

  const open = () => {};
  const uninstall = () => {
    poke({
      app: 'docket',
      mark: 'docket-uninstall',
      json: cord,
    }).then(refreshApps);
  };
  const install = () => {
    poke({
      app: 'docket',
      mark: 'docket-install',
      json: `${ship}/${cord}`,
    }).then(() => {
      poke({
        app: 'hood',
        mark: 'kiln-revive',
        json: cord,
      }).then(refreshApps);
    });
  };
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
        {#if isInstalled}
          <AsyncButton on:click={uninstall}>Uninstall {title}</AsyncButton>
        {/if}
      </div>
    </RightSidebar>
  </div>
{/if}
