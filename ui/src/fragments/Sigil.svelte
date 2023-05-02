<script>
  import { sigil, stringRenderer } from '@tlon/sigil-js';
  import { invertHex } from '@root/util';
  export let patp, size, color;

  const formatColor = (c) => {
    if (!c || c === '0x0') return 'ffffff';
    return c.replace('.', '').replace('0x', '');
  };

  let primaryColor;
  $: primaryColor = formatColor(color);
  $: secondaryColor = invertHex(formatColor(color));

  if (patp.length > 14) patp = '~zod';
</script>

{@html sigil({
  patp,
  renderer: stringRenderer,
  size: size || 50,
  colors: [`#${primaryColor}`, `#${secondaryColor}`],
})}
