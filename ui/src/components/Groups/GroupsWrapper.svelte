<script lang="ts">
  import { link } from 'svelte-spa-router';
  import { getGroup } from '@root/state';
  import { getMeta, preSig, formatPatp } from '@root/util';
  import { ItemImage } from '@fragments';

  export let group: string = '';
  export let author: string = '';

  let contentContainer: HTMLDivElement;
</script>

<div class="col-span-6 p-1 rounded-lg gap-2 break-words flex h-full">
  <div class="h-full w-1 border-2 border-black" />
  <div class="flex flex-col w-full pr-2">
    <div class="flex gap-1 text-grey">
      <a use:link href={`#/${preSig(author)}`} class="text-sm text-black"
        >{formatPatp(preSig(author))}</a
      >
      {#if group}
        {@const { title, image, color } = getMeta(getGroup(group))}
        <span>in</span>
        <a use:link href={`/group/${group}/`} class="flex gap-1 text-black">
          <div class="w-5 h-5">
            <ItemImage {title} {image} {color} />
          </div>
          {title}
        </a>
      {/if}
    </div>
    <div class="text-base line-clamp-6" bind:this={contentContainer}>
      <slot />
    </div>
  </div>
</div>
