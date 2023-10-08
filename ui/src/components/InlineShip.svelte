<script lang="ts">
  import { Sigil } from '@components';
  import { getProfile, state } from '@root/state';
  import { formatPatp } from '@root/util';
  import { link } from 'svelte-spa-router';

  export let patp: string;
  export let isExpanded: boolean = false;
  export let noName: boolean = false;

  $: nickname = $state && getProfile(patp)?.nickname;
</script>

<a use:link href={`/${patp}`} class="flex items-center gap-2">
  <div class="w-10 h-10 overflow-hidden rounded-md mr-1"><Sigil {patp} /></div>
  {#if !noName}
    <div class="text-sm sm:text-base">
      {nickname ? nickname : formatPatp(patp)}
    </div>
    {#if isExpanded && nickname}
      <div class="text-tertiary text-sm sm:text-base">{formatPatp(patp)}</div>
    {/if}
  {/if}
</a>
