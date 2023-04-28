<script>
  // import { sigil, stringRenderer } from '@tlon/sigil-js';
  import { getImage, getTitle, getColor, getType } from '@root/util';
  export let item;

  let src;
  $: src = getImage(item);

  // $: patp = item?.keyObj?.ship || '';
  // $: patp.length > '14' ? (patp = '') : (patp = patp);

  const invertHex = (hex) => {
    return (Number(`0x1${hex}`) ^ 0xffffff).toString(16).slice(1).toUpperCase();
  };
</script>

{#if src}
  <img {src} class="w-full h-full object-cover" alt={getTitle(item)} />
{:else if getType(item) === 'ship'}
  <div class="w-full h-full">
    {getTitle(item)}
    <!-- {@html sigil({
      patp,
      renderer: stringRenderer,
    })} -->
  </div>
{:else}
  <div
    class="flex items-center justify-center text-2xl text-clip w-full h-full"
    style="background-color: #{getColor(item) || '000000'}; color: #{invertHex(
      getColor(item)
    )};"
  >
    {getTitle(item)
      .toLowerCase()
      .split(' ')
      .map((n) => n.slice(0, 1))
      .filter((n) => /^[a-z0-9]+$/i.test(n))
      .join('')}
  </div>
{/if}
