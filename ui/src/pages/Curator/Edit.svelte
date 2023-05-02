<script>
  import { poke } from '@root/api';
  import { state, getCurator } from '@root/state';
  import { Tabs, TextArea } from '@fragments';

  export let params;

  let curator;
  let nickname, cover, avatar, bio;
  state.subscribe(() => {
    curator = getCurator(params.patp);
    ({ nickname, cover, avatar, bio } = curator);
  });

  let activeTab = 'home';
  let tabs = ['home', 'integrations'];

  let publishBlog = true;
  let publishRadio = false;
  const togglePublishBlog = () => {
    publishBlog = !publishBlog;
  };
  const togglePublishRadio = () => {
    publishRadio = !publishRadio;
  };

  // this info is saved in tlon's contact store, not portal
  const save = () => {
    poke({
      app: 'contacts',
      mark: 'contact-action',
      json: { edit: [{ nickname }, { cover }, { avatar }, { bio }] },
    });
  };
</script>

<div class="grid gap-y-4">
  <div>Editing Curator</div>
  <Tabs {tabs} bind:activeTab />
  {#if activeTab === 'home'}
    <div>
      <div>Display Name</div>
      <input type="text" bind:value={nickname} class="p-2" />
    </div>
    <div>
      <div>Bio</div>
      <TextArea bind:value={bio} minRows={3} maxRows={5} />
    </div>
    <div>
      <div>Avatar</div>
      <input type="text" bind:value={avatar} class="p-2" />
    </div>
    <div>
      <div>Cover Image</div>
      <input type="text" bind:value={cover} class="p-2" />
    </div>
    <div>
      <button class="border px-2" on:click={save}>Save</button>
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
