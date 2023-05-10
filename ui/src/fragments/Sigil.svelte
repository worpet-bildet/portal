<script>
  import { sigil, stringRenderer } from '@tlon/sigil-js';
  import { invertHex, formatColor } from '@root/util';
  export let patp, size, color;

  $: primaryColor = formatColor(color);
  $: secondaryColor = invertHex(formatColor(color));
  $: {
    if (primaryColor.length < 6) {
      primaryColor = '000000';
      secondaryColor = 'ffffff';
    }
  }

  $: if (!patp || patp.length > 14) patp = '~zod';
</script>

{@html sigil({
  patp,
  renderer: stringRenderer,
  size: size || 50,
  colors: [`#${primaryColor}`, `#${secondaryColor}`],
})}
