<script lang="ts">
  import { getCurator, state } from '@root/state';
  import { formatColor, isLightColor, isUrl } from '@root/util';
  import { sigil, stringRenderer } from '@tlon/sigil-js';
  export let patp,
    size = 50;
  export let color = '0x0';

  let avatar;
  const loadSigil = (_p) => {
    ({ color, avatar } = getCurator(patp).bespoke || {});
  };

  $: $state && loadSigil(patp);
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
