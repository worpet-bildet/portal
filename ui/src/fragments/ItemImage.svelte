<script>
  // TODO: this should probably be dynamic and take the full item instead of
  // requiring the caller to already have an image - this would allow us to
  // display the image grid for a full collection as well
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
      ? title
          .toLowerCase()
          .split(' ')
          .map((n) => n.slice(0, 1))
          .filter((n) => /^[a-z0-9]+$/i.test(n))
          .join('')
      : ''}
  </div>
{/if}
