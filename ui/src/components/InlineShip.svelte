<script lang="ts">
  import { getProfile } from '@root/state';
  import { formatPatp } from '@root/util';
  import { Sigil } from '@components';

  export let patp: string;

  $: nickname = getProfile(patp)?.nickname;
</script>

<div class="flex items-center gap-2">
  <div class="w-7 h-7 overflow-hidden rounded-md"><Sigil {patp} /></div>
  <div class="text-sm">{nickname ? nickname : formatPatp(patp)}</div>
</div>
