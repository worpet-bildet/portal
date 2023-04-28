<script>
  import { state, getCurator } from '@root/state';
  import { Tabs } from '@fragments';

  export let params;

  let curator;
  state.subscribe(() => {
    curator = getCurator(params.patp);
    if (!curator) return;
    const {
      item: {
        data: {
          general,
          bespoke: { keyObj, payload },
        },
      },
    } = curator;
  });

  let activeTab = 'integrations';
  let tabs = ['home', 'integrations'];

  let publishBlog = true;
  let publishRadio = false;
  const togglePublishBlog = () => {
    publishBlog = !publishBlog;
  };
  const togglePublishRadio = () => {
    publishRadio = !publishRadio;
  };
</script>

<div class="grid gap-y-4">
  <div>Editing Curator</div>
  <Tabs {tabs} bind:activeTab />
  {#if activeTab === 'home'}
    <div>
      This would be a form to change the images, featured collection, etc
    </div>
  {:else if activeTab === 'integrations'}
    <div class="grid gap-y-4">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-2 text-6xl">📜</div>
        <div class="col-span-8 self-center">Post new %blogs automatically</div>
        <button
          class="col-span-2 self-center py-1"
          class:bg-green-500={publishBlog}
          class:bg-red-500={!publishBlog}
          on:click={() => togglePublishBlog()}
          >{publishBlog ? 'On' : 'Off'}</button
        >
      </div>
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-2 text-6xl">📻</div>
        <div class="col-span-8 self-center">Post when I !publish on %radio</div>
        <button
          class="col-span-2 self-center py-1"
          class:bg-green-500={publishRadio}
          class:bg-red-500={!publishRadio}
          on:click={() => togglePublishRadio()}
          >{publishRadio ? 'On' : 'Off'}</button
        >
      </div>
    </div>
  {/if}
</div>
