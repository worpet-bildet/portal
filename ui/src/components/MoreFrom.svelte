<script lang="ts">
  import {
    state,
    getMoreFromThisShip,
    keyStrToObj,
    getCurator,
    keyStrFromObj,
  } from '@root/state';
  import { getMeta } from '@root/util';

  import { AppPreview, GroupPreview, ItemPreview } from '@components';
  import { CollectionIcon } from '@root/fragments';

  export let patp;
  export let exclude = [];

  $: sortedRecommendations =
    ($state &&
      getMoreFromThisShip(patp)
        .filter((a) => !exclude.includes(a[0]))
        .slice(0, 4)) ||
    [];
  $: nickname = $state && getMeta(getCurator(patp))?.nickname;
</script>

{#if sortedRecommendations.length > 0}
  <div class="flex flex-col gap-3">
    <div class="text-lg flex items-center gap-2">
      <div class="w-5 h-5"><CollectionIcon /></div>
      <div>More from {nickname || patp}</div>
    </div>
    {#each sortedRecommendations as [recommendation]}
      {@const key = keyStrToObj(recommendation)}
      {#if key.struc === 'app'}
        <AppPreview {key} />
      {:else if key.struc === 'group'}
        <GroupPreview {key} />
      {:else}
        <ItemPreview {key} />
      {/if}
    {/each}
  </div>
{/if}
