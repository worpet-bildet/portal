<script>
  import { sigil, stringRenderer } from '@tlon/sigil-js';
  import { state, getCurator } from '@root/state';
  import { formatColor, isLightColor } from '@root/util';
  export let patp, size;
  export let color = '0x0';

  state.subscribe(() => {
    ({ color } = getCurator(patp).bespoke || {});
  });

  $: primaryColor = formatColor(color);
  $: secondaryColor = isLightColor(primaryColor) ? '000000' : 'ffffff';
  $: {
    if (primaryColor.length < 6) {
      primaryColor = '000000';
      secondaryColor = 'ffffff';
    }
  }

  // TODO: change to ~zod
  $: if (!patp || patp.length > 14) patp = '~zod';
</script>

{@html sigil({
  patp,
  renderer: stringRenderer,
  size: size || 50,
  colors: [`#${primaryColor}`, `#${secondaryColor}`],
})}
