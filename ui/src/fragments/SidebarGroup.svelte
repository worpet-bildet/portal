<script>
  import { fade } from 'svelte/transition';
</script>

<div
  class="flex flex-col gap-4 p-4 rounded-lg border shadow overflow-hidden"
  in:fade
>
  <slot />
</div>
