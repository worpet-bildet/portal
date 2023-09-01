<script>
  import { sigil, stringRenderer } from '@tlon/sigil-js';
  import { state, getCurator } from '@root/state';
  import { formatColor, isLightColor, isUrl } from '@root/util';
  export let patp, size = 50;
  export let color = '0x0';

  let avatar;
  state.subscribe(() => {
    ({ color, avatar } = getCurator(patp).bespoke || {});
  });

  $: primaryColor = formatColor(color);
  $: secondaryColor = isLightColor(primaryColor) ? '000000' : 'ffffff';
  $: if (primaryColor.length < 6) {
    primaryColor = '000000';
    secondaryColor = 'ffffff';
  }

  let replacementPatp;
  $: if ((!patp || patp.length > 14) && !avatar) replacementPatp = '~zod';
</script>

{#if isUrl(avatar)}
  <img
    src={avatar}
    alt="avatar"
    class="aspect-square object-cover overflow-hidden"
  />
{:else}
  {@html sigil({
    patp: replacementPatp || patp,
    renderer: stringRenderer,
    size: size,
    colors: [`#${primaryColor}`, `#${secondaryColor}`],
  })}
{/if}
