<script>
  export let src;
  export let alt;

  import Image from './Image.svelte';
  import IntersectionObserver from './IntersectionObserver.svelte';
</script>

<IntersectionObserver once={true} let:intersecting>
  {#if intersecting}
    <Image {alt} {src} {...$$props} />
  {/if}
</IntersectionObserver>
