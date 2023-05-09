<script>
  import { createEventDispatcher } from 'svelte';
  import { state, keyStrFromObj, getItem } from '@root/state';
  import { poke } from '@root/api';
  import { StepForm, OtherItemForm, ItemImage } from '@fragments';

  export let collection;

  let formstep = 'type';
  let formsteps = ['type', 'app', 'group', 'ship', 'other'];

  let groups = {};
  let apps = {};
  let newShip;
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
    // should we do the saving of the item here?? it's a bit messy because we
    // don't save the app / group up above we delegate back to the parent but i
    // think this is probably the "cleanest" way to do it, if not the prettiest
    poke({
      app: 'portal-manager',
      mark: 'portal-action',
      json: {
        create: {
          'append-to': [collection.keyObj],
          bespoke: {
            other: newOtherItem,
          },
        },
      },
    });
    dispatch('saved');
  };
  const saveShip = async () => {
    const key = {
      struc: 'ship',
      ship: newShip,
      time: '',
      cord: '',
    };
    // this is kinda tricky because we have to subscribe to the new ship and
    // then when the subscription is finished we have to add it to the
    // collection - this is not trivial because this component does not know
    // when the ship has been subscribed to - the poke being responded to does
    // not mean that the action has finished... or does it?
    if (!getItem(keyStrFromObj(key))) {
      await poke({
        app: 'portal-manager',
        mark: 'portal-action',
        json: {
          sub: {
            key: { ...key },
          },
        },
      });
    }
    console.log('WE DID IT');
    add(keyStrFromObj(key));
  };
</script>

<StepForm {formsteps} bind:formstep navbuttons={false}>
  <div class="grid gap-4">
    {#if formstep === 'type'}
      <div class="text-2xl">What kind of item?</div>
      <button
        on:click={() => (formstep = 'app')}
        class="border text-2xl font-bold py-3">App</button
      >
      <button
        on:click={() => (formstep = 'group')}
        class="border text-2xl font-bold py-3">Group</button
      >
      <button
        on:click={() => (formstep = 'ship')}
        class="border text-2xl font-bold py-3">Ship</button
      >
      <button
        on:click={() => (formstep = 'other')}
        class="border text-2xl font-bold py-3">Other (link etc.)</button
      >
    {:else if formstep === 'app'}
      {#if Object.keys(apps).length === 0}
        <div>You have already added all your apps to this collection</div>
        <button class="border" on:click={() => (formstep = 'type')}>Back</button
        >
      {/if}
      {#each Object.entries(apps) as [path, { title, image, ship, info }]}
        <button
          class="grid grid-cols-12 border items-center gap-4 p-1"
          on:click={() => add(`/app/${path}/`)}
        >
          <div class="col-span-1">
            <ItemImage {image} {title} />
          </div>
          <div class="col-span-11 justify-self-start font-bold">{title}</div>
        </button>
      {/each}
    {:else if formstep === 'group'}
      {#if Object.keys(groups).length === 0}
        <div>You have already added all your groups to this collection</div>
        <button class="border py-1" on:click={() => (formstep = 'type')}
          >Back</button
        >
      {/if}
      {#each Object.entries(groups) as [path, { meta: { title, image } }]}
        <button
          class="grid grid-cols-12 border items-center gap-4 p-1"
          on:click={() => add(`/group/${path}/`)}
        >
          <div class="col-span-1">
            <ItemImage {image} {title} />
          </div>
          <div class="col-span-11 justify-self-start font-bold">{title}</div>
        </button>
      {/each}
    {:else if formstep === 'ship'}
      <div>Ship</div>
      <input
        type="text"
        class="p-2"
        bind:value={newShip}
        placeholder="~worpet-bildet"
      />
      <button class="border py-1" on:click={saveShip}>Save</button>
    {:else if formstep === 'other'}
      <OtherItemForm bind:item={newOtherItem} />
      <button class="border py-1" on:click={() => saveOtherItem()}>Save</button>
    {/if}
  </div>
</StepForm>
