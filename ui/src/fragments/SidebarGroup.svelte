<script lang="ts">
  import { fade } from 'svelte/transition';
</script>

<div
  class="flex flex-col gap-4 p-4 rounded-xl border dark:border-glass overflow-hidden"
  in:fade
>
  <slot />
</div>
