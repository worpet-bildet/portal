<script lang="ts">
  import { link } from 'svelte-spa-router';
  import { state, getProfile } from '@root/state';
  import { formatPatp } from '@root/util';
  import { Sigil } from '@components';

  export let patp: string;
  export let isExpanded: boolean = false;

  $: nickname = $state && getProfile(patp)?.nickname;
</script>

<a use:link href={`/${patp}`} class="flex items-center gap-2">
  <div class="w-7 h-7 overflow-hidden rounded-md"><Sigil {patp} /></div>
  <div class="text-sm sm:text-base">
    {nickname ? nickname : formatPatp(patp)}
  </div>
  {#if isExpanded && nickname}
    <div class="text-tertiary text-sm sm:text-base">{formatPatp(patp)}</div>
  {/if}
</a>
