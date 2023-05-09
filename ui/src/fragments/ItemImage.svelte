<script>
  // TODO: this should probably be dynamic and take the full item instead of
  // requiring the caller to already have an image - this would allow us to
  // display the image grid for a full collection as well
  import { isUrl, invertHex, formatColor } from '@root/util';
  import placeholder from '@assets/placeholder.png';
  export let image, title, color;
  let primaryColor, secondaryColor;
  $: {
    primaryColor = formatColor(color);
    secondaryColor = invertHex(primaryColor);
  }
  console.log({ image: isUrl(image) });
</script>

<div class="relative h-full">
  <img alt="n/a" src={placeholder} class="w-full h-full object-cover" on:load />
  {#if isUrl(image)}
    <img
      src={image}
      class="w-full h-full object-cover absolute top-0 left-0"
      alt={title}
    />
  {:else}
    <div
      class="absolute top-0 left-0 flex items-center justify-center text-2xl text-clip w-full h-full"
      style="background-color: #{primaryColor ||
        '000000'}; color: #{secondaryColor || '000000'};"
    >
      {title
        ? title
            .toLowerCase()
            .split('')
            .filter((n) => /^[a-z0-9]+$/i.test(n))
            .join('')
            .split(' ')
            .map((n) => n.slice(0, 1))
            .join('')
        : ''}
    </div>
  {/if}
</div>
