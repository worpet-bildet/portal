<script>
  import { subscribeToItem } from '@root/api';
  import { getItem } from '@root/state';
  import { ItemImage } from '@fragments';
  export let key;
  const group = getItem(`/group/${key}/`);
  if (!group) {
    subscribeToItem(key);
  }
  let image, title;
  if (group) ({ image, title } = group);
</script>

{#if group}
  <div class="flex gap-4 items-center">
    <div class="rounded-full h-16 w-16">
      <ItemImage {image} {title} color="" />
    </div>
    <div>
      <div>{title}</div>
    </div>
  </div>
{/if}
