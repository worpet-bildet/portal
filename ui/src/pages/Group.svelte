<script>
  import { link } from 'svelte-spa-router';
  import { state, getGroup } from '@root/state';
  import { subscribeToGroup } from '@root/api';
  import { getMeta } from '@root/util';
  import { ItemDetail } from '@components';

  export let params;
  const { host, cord } = params;
  const groupkey = `${host}/${cord}`;

  let group;
  // let feed = [];

  let cover, image, description, title;
  state.subscribe(() => {
    group = getGroup(groupkey);
    ({ cover, image, description, title } = getMeta(group));

    console.log({ group });

    // TODO: Figure out how to get a group feed here
    // feed = (getCuratorFeed(patp) || []).sort((a, b) => {
    //   return fromUrbitTime(b.meta.createdAt) - fromUrbitTime(a.meta.createdAt);
    // });
  });

  const joinGroup = () => {
    // TODO: join group here
  };

  // $: if (!group) subscribeToGroup(groupkey);
</script>

{#if group}
  <div class="grid grid-cols-12 gap-4">
    <ItemDetail {cover} avatar={image} {title} {description} type="group">
      <div class="col-span-12 lg:col-span-9">
        <div>Some shit about the group probably goes here?</div>
      </div>
    </ItemDetail>
    <!-- <div class="hidden lg:flex lg:col-span-3 flex-col gap-8">
      {#if curator && curator.groups && curator.groups.length > 0}
        <div class="grid gap-y-4">
          <div class="text-xl">{patp} recommends</div>
          {#each curator.groups as key}
            <SidebarGroup {key} />
          {/each}
        </div>
      {/if}
      <div class="grid gap-y-4">
        <div class="text-xl">{patp}'s top 5</div>
        <SidebarPal />
        <SidebarPal />
        <SidebarPal />
        <SidebarPal />
        <SidebarPal />
      </div>
    </div> -->
  </div>
{:else}
  Loading...
{/if}
