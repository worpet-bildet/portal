<script>
  import { state } from '@root/state';
  import { poke, me } from '@root/api';
  import { Modal, StepForm, TextArea } from '@fragments';

  let groups;
  state.subscribe((s) => (groups = s.groups));

  let showModal = false;
  const addCollection = () => {
    showModal = true;
  };

  let name = '';
  let description = '';
  let items = [];

  let formstep = 'meta';
  let formsteps = ['meta', 'items'];

  const save = () => {
    // so i think here we just make the poke, and it should create the
    // collection with the new items. i am not sure exactly how this should
    // be structured but it can't be too difficult to figure out
    console.log({ name, description, items });
    poke({
      app: 'portal-manager',
      mark: 'portal-action',
      json: {
        create: {
          'append-to': {
            ship: me,
            struc: '/collection',
            time: '~2000.1.1',
            cord: '',
          },
          bespoke: {
            '/collection': {
              title: name,
              blurb: description,
              image: '',
              'key-list': items,
            },
          },
        },
      },
    }).then((result) => console.log({ result }));
  };

  $: console.log({ items });
</script>

<button
  class="col-span-4 border flex items-center justify-center"
  on:click={addCollection}
>
  + New Collection
</button>
<Modal bind:open={showModal}>
  <StepForm bind:formstep {formsteps} on:save={save}>
    <div class="flex flex-col gap-4">
      {#if formstep === 'meta'}
        <div class="text-2xl font-bold">Give your collection a name</div>
        <input type="text" bind:value={name} />
        <div class="text-2xl font-bold">
          Briefly describe the collection (optional)
        </div>
        <TextArea minRows={3} bind:value={description} />
      {:else if formstep === 'items'}
        <div>Add these groups?</div>
        {#each groups as [path, { meta: { title, image } }]}
          <div class="flex justify-between">
            <div>{title}</div>
            <input type="checkbox" bind:group={items} value={path} />
          </div>
        {/each}
      {/if}
    </div>
  </StepForm>
</Modal>
