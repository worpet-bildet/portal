<script lang="ts">
  import { ItemImage } from '@fragments';
  import { getGroup } from '@root/state';
  import { formatPatp, getMeta, preSig } from '@root/util';
  import { createEventDispatcher } from 'svelte';
  import { link } from 'svelte-spa-router';
  const dispatch = createEventDispatcher();

  export let group: string = '';
  export let author: string = '';
  export let image: string = '';
  export let title: string = '';
  export let isExpanded: boolean = false;
  export let headless: boolean = false;

  console.log(getMeta(getGroup(group)));

  let contentContainer: HTMLDivElement;

  const handleClickExpand = () => dispatch('expand');

  $: isTruncated =
    !isExpanded &&
    contentContainer &&
    contentContainer.scrollHeight > contentContainer.clientHeight;
</script>

<div
  class="col-span-6 p-1 rounded-lg gap-2 break-words [word-break:break-word] flex h-full"
>
  <div class="h-full w-1 border-2 border-black" />
  <div class="flex flex-col w-full pr-2">
    {#if !headless}
      <div class="flex gap-1 text-grey">
        <a use:link href={`#/${preSig(author)}`} class="text-sm text-black"
          >{formatPatp(preSig(author))}</a
        >
        {#if group}
          {@const { title, image, color } = getMeta(getGroup(group))}
          {#if title}
            <span>in</span>
            <a use:link href={`/group/${group}/`} class="flex gap-1 text-black">
              <div class="w-5 h-5">
                <ItemImage {title} {image} {color} />
              </div>
              {title}
            </a>
          {/if}
        {/if}
      </div>
    {/if}
    {#if image}
      <img src={image} class="rounded-2xl overflow-hidden my-2" alt="cover" />
    {/if}
    {#if title}
      <div class="text-2xl font-bold py-2">{title}</div>
    {/if}
    <div
      class="text-base"
      class:line-clamp-6={!isExpanded}
      bind:this={contentContainer}
    >
      <slot />
    </div>
    {#if isTruncated}
      <div class="pt-4">
        <button
          class="font-bold text-black text-base hover:underline"
          on:click={handleClickExpand}
        >
          Continue reading ->
        </button>
      </div>
    {/if}
  </div>
</div>
