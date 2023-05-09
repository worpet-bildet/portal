<script>
  import { TextArea } from '@fragments';

  export let item = {};
</script>

<div>
  <div>Title</div>
  <input type="text" bind:value={item.title} class="p-2" />
</div>
<div>
  <div>Description</div>
  <TextArea type="text" bind:value={item.blurb} minRows={2} maxRows={10} />
</div>
<div>
  <div>Image URL</div>
  <input type="text" bind:value={item.image} class="p-2" />
</div>
<div>
  <div>Link URL</div>
  <input type="text" bind:value={item.link} class="p-2" />
</div>
