<script>
  import { createEventDispatcher } from 'svelte';
  import { state } from '@root/state';
  import { poke } from '@root/api';
  import { StepForm, OtherItemForm } from '@fragments';

  export let collection;

  let formstep = 'type';
  let formsteps = ['type', 'app', 'group', 'other'];

  let groups = {};
  let apps = {};
  let newOtherItem;

  const collectionContains = (key) => {
    const parts = key.split('/');
    return collection.bespoke['key-list'].find((i) => {
      return i.ship === parts[0] && i.cord === parts[1];
    });
  };

  state.subscribe((s) => {
    // filter out all the keys which exist within the collection already
    if (s.groups) {
      Object.entries(s.groups).forEach(([key, data]) => {
        if (!data?.meta?.title || collectionContains(key)) return;
        groups[key] = data;
      });
    }
    Object.entries(s.apps).forEach(([key, data]) => {
      const appkey = `${data.ship}/${key}`;
      if (collectionContains(appkey)) return;
      apps[appkey] = data;
    });
  });

  const dispatch = createEventDispatcher();
  const add = (path) => {
    dispatch('add', path);
  };
  const saveOtherItem = () => {
    console.log({ newOtherItem });
    // should we do the saving of the item here?? it's a bit messy because we
    // don't save the app / group up above we delegate back to the parent but i
    // think this is probably the "cleanest" way to do it, if not the prettiest
    console.log({
      app: 'portal-manager',
      mark: 'portal-action',
      json: {
        create: {
          'append-to': [collection.keyObj],
          bespoke: {
            other: { ...newOtherItem },
          },
        },
      },
    });
    poke({
      app: 'portal-manager',
      mark: 'portal-action',
      json: {
        create: {
          'append-to': [collection.keyObj],
          bespoke: {
            other: { ...newOtherItem },
          },
        },
      },
    });
    dispatch('saved');
  };
</script>

<StepForm {formsteps} bind:formstep navbuttons={false}>
  <div class="grid gap-4">
    {#if formstep === 'type'}
      <div>Item Type</div>
      <button on:click={() => (formstep = 'app')} class="border">App</button>
      <button on:click={() => (formstep = 'group')} class="border">Group</button
      >
      <button on:click={() => (formstep = 'other')} class="border"
        >Other (link etc.)</button
      >
    {:else if formstep === 'app'}
      {#if Object.keys(apps).length === 0}
        <div>You have already added all your apps to this collection</div>
        <button class="border" on:click={() => (formstep = 'type')}>Back</button
        >
      {/if}
      {#each Object.entries(apps) as [path, { title, image, ship, info }]}
        <div class="flex justify-between">
          <button class="border" on:click={() => add(`/app/${path}/`)}
            >{title}</button
          >
        </div>
      {/each}
    {:else if formstep === 'group'}
      {#if Object.keys(groups).length === 0}
        <div>You have already added all your groups to this collection</div>
        <button class="border" on:click={() => (formstep = 'type')}>Back</button
        >
      {/if}
      {#each Object.entries(groups) as [path, { meta: { title, image } }]}
        <button class="border" on:click={() => add(`/group/${path}/`)}
          >{title}</button
        >
      {/each}
    {:else if formstep === 'other'}
      <OtherItemForm bind:item={newOtherItem} />
      <button class="border" on:click={() => saveOtherItem()}>Save</button>
    {/if}
  </div>
</StepForm>
