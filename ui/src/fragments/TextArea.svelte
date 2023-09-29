<script lang="ts">
  export let content;
  export let placeholder: string = '';
</script>

<textarea
  bind:value={content}
  {placeholder}
  class="py-4 px-3 w-full text-lg placeholder-light resize-none leading-tight break-words focus:outline-none caret-black dark:caret-white bg-transparent rounded-lg"
/>
