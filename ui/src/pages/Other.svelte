<script>
  import { state, getItem } from '@root/state';
  import { getMeta } from '@root/util';
  import { ItemDetail } from '@components';
  import { RightSidebar, UpRightArrowIcon } from '@fragments';
  export let params;
  let { wild } = params;

  let item, image, title, blurb, link;

  state.subscribe(() => {
    item = getItem(`/other/${wild}`);
    ({ image, title, blurb, link } = getMeta(item));
  });
</script>

<div class="grid grid-cols-12 gap-8">
  <ItemDetail avatar={image} {title} patp={item?.keyObj?.ship} type="other">
    <div class="text-xl">
      {blurb}
    </div>
  </ItemDetail>
  <RightSidebar>
    <a
      target="_blank"
      href={link}
      class="border cursor-pointer py-1 flex items-center justify-center gap-2"
    >
      Go
      <div class="w-6 h-6"><UpRightArrowIcon /></div>
    </a>
  </RightSidebar>
</div>
