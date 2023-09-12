<script lang="ts">
  import { formatPatp } from '@root/util';
  import { Sigil } from '@components';

  export let patp: string;
  export let nickname: string | undefined = undefined;
</script>

<div class="flex items-center gap-2">
  <div class="w-7 h-7 overflow-hidden rounded-md"><Sigil {patp} /></div>
  <div class="text-sm">{nickname ?? formatPatp(patp)}</div>
</div>
