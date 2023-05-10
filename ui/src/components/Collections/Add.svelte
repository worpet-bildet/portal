<script>
  import { state, keyStrToObj } from '@root/state';
  import { poke, me } from '@root/api';
  import { Modal, StepForm, TextArea, PlusIcon } from '@fragments';

  let groups = {};
  let apps;
  state.subscribe((s) => {
    // We filter the groups here based on which ones have a title or not - we
    // don't filter them on retrieval from the api like we do with apps because
    // an empty meta object for a group indicates that we're in the process of
    // joining it, which is good for keeping some state on the group page
    if (s.groups) {
      Object.entries(s.groups).forEach(([key, data]) => {
        if (!data?.meta?.title) return;
        groups[key] = data;
      });
    }
    apps = s.apps;
  });

  $: console.log({ groups, apps });

  let showModal = false;
  const addCollection = () => {
    showModal = true;
  };

  let name = '';
  let description = '';
  let groupKeys = [];
  let appKeys = [];

  $: console.log({ groupKeys, appKeys });

  let formstep = 'meta';
  let formsteps = ['meta', 'groups', 'apps'];

  const save = () => {
    poke({
      app: 'portal-manager',
      mark: 'portal-action',
      json: {
        create: {
          bespoke: {
            collection: {
              title: name,
              blurb: description,
              image: '',
              'key-list': [
                ...groupKeys.map((i) => keyStrToObj(i)),
                ...appKeys.map((i) => keyStrToObj(i)),
              ],
            },
          },
        },
      },
    });
    showModal = false;
  };
</script>

<button
  class="border px-2 py-1 flex items-center gap-4"
  on:click={addCollection}
>
  <span class="w-5"><PlusIcon /></span>
  <span>New Collection</span>
</button>
<Modal bind:open={showModal}>
  <StepForm bind:formstep {formsteps} on:save={save}>
    <div class="flex flex-col gap-4">
      {#if formstep === 'meta'}
        <div class="text-2xl font-bold">Give your collection a name</div>
        <input type="text" class="p-2" bind:value={name} />
        <div class="text-2xl font-bold">
          Briefly describe the collection (optional)
        </div>
        <TextArea minRows={3} bind:value={description} />
      {:else if formstep === 'groups'}
        <div>Add these groups?</div>
        {#each Object.entries(groups) as [path, { meta: { title, image } }]}
          <div class="flex justify-between">
            <div>{title}</div>
            <input
              type="checkbox"
              bind:group={groupKeys}
              value={`/group/${path}//`}
            />
          </div>
        {/each}
      {:else if formstep === 'apps'}
        <div>Add these apps?</div>
        {#each Object.entries(apps) as [path, { title, image, ship, info }]}
          <div class="flex justify-between">
            <div>{title}</div>
            <input
              type="checkbox"
              bind:group={appKeys}
              value={`/app/${ship}/${path}//`}
            />
          </div>
        {/each}
      {/if}
    </div>
  </StepForm>
</Modal>
