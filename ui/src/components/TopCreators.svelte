<script lang="ts">
  // pull the creators with the most in their feed (as far as we can tell)
  import { ItemPreview } from '@components';
  import SidebarGroup from '@root/fragments/SidebarGroup.svelte';
  import { getMostActiveUsers, state } from '@root/state';

  let topCreators = [];
  const loadTopCreators = () => {
    topCreators = getMostActiveUsers().slice(0, 5);
  };

  $: $state && loadTopCreators();
</script>

{#if topCreators}
  <SidebarGroup>
    <div class="flex flex-col gap-1 px-2">
      <div class="flex flex-col gap-1 px-2">
        <div class="flex items-start justify-between">
          <div>Top Creators</div>
        </div>
        <div class="text-flavour text-xs">Portal appreciators</div>
      </div>
      <div class="flex flex-col gap-4">
        {#each topCreators as curator}
          <ItemPreview key={curator} />
        {/each}
      </div>
    </div>
  </SidebarGroup>
{/if}
