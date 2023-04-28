<script>
  import { getItem } from '@root/state';
  import { getMeta } from '@root/util';
  import { ItemImage } from '@fragments';

  export let keyStr;
  let item = getItem(keyStr) || '';
  let { title, description } = getMeta(item);
</script>

<div class="flex flex-col w-44 mr-6">
  <ItemImage {item} />
  <strong>{title}</strong>
  <p class="text-xs line-clamp-3">{description}</p>
</div>
