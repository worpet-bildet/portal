<script lang="ts">
  import { me } from '@root/api';
  import { getGroupsFeed, state } from '@root/state';

  import { Feed } from '@components';
  import { fromUrbitTime } from '@root/util';

  $: feed = ($state ? getGroupsFeed(me) : []).sort(
    (a, b) => fromUrbitTime(b.time) - fromUrbitTime(a.time)
  ).slice(0, 60);
</script>

<div class="grid grid-cols-12">
  <div class="col-span-12 sm:col-span-7 flex flex-col">
    <div class="flex flex-col gap-2 pb-12 pt-4">
      <div class="text-xl">Group Activity</div>
      <div class="text-tertiary">
        Stay in the loop: here are the top posts from your groups.
      </div>
    </div>
    {#if feed && feed.length > 0}
      <Feed {feed} />
    {/if}
  </div>
</div>
