<script>
  import { state, getItem } from '@root/state';
  import { subscribeToGroup } from '@root/api';
  import { ItemImage } from '@fragments';
  import { link } from 'svelte-spa-router';
  export let key;
  let group = getItem(`/group/${key}/`);
  if (!group) {
    subscribeToGroup(key);
  }
  let image, title;
  state.subscribe(() => {
    group = getItem(`/group/${key}/`);
    if (group && group.bespoke) {
      ({ image, title } = group.bespoke);
    }
  });
</script>

{#if group}
  <a
    use:link
    href={`/group/${key}`}
    class="p-1 flex gap-4 items-center hover:bg-gray-500 cursor-pointer"
  >
    <div class="rounded-md overflow-hidden h-16 w-16">
      <ItemImage {image} {title} color="" />
    </div>
    <div>
      <div>{title}</div>
    </div>
  </a>
{/if}
