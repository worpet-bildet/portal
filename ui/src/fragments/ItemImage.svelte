<script>
  import { isUrl, invertHex } from '@root/util';
  export let image, title, color;
</script>

{#if isUrl(image)}
  <img src={image} class="w-full h-full object-cover" alt={title} />
{:else}
  <div
    class="flex items-center justify-center text-2xl text-clip w-full h-full"
    style="background-color: #{color || '000000'}; color: #{invertHex(
      color || '000000'
    )};"
  >
    {title
      .toLowerCase()
      .split(' ')
      .map((n) => n.slice(0, 1))
      .filter((n) => /^[a-z0-9]+$/i.test(n))
      .join('')}
  </div>
{/if}
