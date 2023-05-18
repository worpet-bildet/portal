<script>
  import { TextArea } from '@fragments';

  export let item = {
    title: '',
    blurb: '',
    image: '',
    link: '',
  };
</script>

<div class="grid grid-cols-12 gap-4">
  <div class="col-span-12 flex flex-col gap-2">
    <div>Title</div>
    <input type="text" bind:value={item.title} class="p-2 border-b" />
  </div>
  <div class="col-span-6 flex flex-col gap-2">
    <div>Description</div>
    <TextArea type="text" bind:value={item.blurb} />
  </div>
  <div class="col-span-12 flex flex-col gap-2">
    <div>Image URL</div>
    <input type="text" bind:value={item.image} class="p-2 border-b" />
  </div>
  <div class="col-span-12 flex flex-col gap-2">
    <div>Link URL</div>
    <input type="text" bind:value={item.link} class="p-2 border-b" />
  </div>
</div>
