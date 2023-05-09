<script>
  import { state, getItem } from '@root/state';
  import { ItemDetail } from '@components';
  export let params;
  let { wild } = params;

  let item;
  state.subscribe(() => {
    item = getItem(`/other/${wild}`);
  });

  export let cover, avatar, title, description, patp, color, type;
</script>

<ItemDetail>
  Some stuff about the item, probably the comment form etc.
  {item}
</ItemDetail>
