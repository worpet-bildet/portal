<script>
  import { sigil, stringRenderer } from '@tlon/sigil-js';
  import { invertHex, formatColor } from '@root/util';
  export let patp, size, color;
  console.log({ patp });

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
