<script lang="ts">
  import { isUrl, invertHex, formatColor } from '@root/util';

  import placeholder from '@assets/placeholder.svg';

  export let image = '';
  export let title = '';
  export let color = '#000000';

  let container;
  const squareImage = () => {
    container.style.height = `${container.clientWidth}px`;
  };

  let primaryColor, secondaryColor;
  $: {
    primaryColor = formatColor(color);
    secondaryColor = invertHex(primaryColor);
  }
</script>

<div class="relative h-full" bind:this={container}>
  <img alt="n/a" src={placeholder} class="w-full h-full object-cover" on:load />
  {#if isUrl(image)}
    <img
      src={image}
      class="w-full h-full object-cover absolute top-0 left-0"
      alt={title}
      on:load={squareImage}
    />
  {:else}
    <div
      class="absolute top-0 left-0 flex items-center justify-center text-xs text-clip w-full h-full"
      style="background-color: #{primaryColor ||
        '000000'}; color: #{secondaryColor || '000000'};"
    >
      {title
        ? title
            .toLowerCase()
            .split('')
            .filter((n) => /^[a-z0-9]+$/i.test(n))
            .join('')
            .slice(0, 1)
        : ''}
    </div>
  {/if}
</div>
