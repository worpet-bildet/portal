<script>
  import { createEventDispatcher } from 'svelte';
  import { state, keyStrFromObj, getItem } from '@root/state';
  import { poke } from '@root/api';
  import {
    StepForm,
    OtherItemForm,
    ItemImage,
    IconButton,
    LeftArrowIcon,
    CheckIcon,
    Sigil,
  } from '@fragments';
  import { isValidPatp } from '@root/util';

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
    add(keyStrFromObj(key));
  };

  let lastValidShip = newShip;
  $: {
    // test the value of new ship to check whether it meets the requirements
    // of a patp
    if (isValidPatp(newShip)) {
      lastValidShip = newShip;
    }
  }
</script>

<StepForm {formsteps} bind:formstep navbuttons={false}>
  <div class="grid gap-4 grid-cols-12 h-full">
    <div class="flex flex-col col-span-12 gap-4 justify-between">
      {#if formstep === 'type'}
        <div class="flex flex-col gap-4">
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
        </div>
      {:else if formstep === 'app'}
        {#if Object.keys(apps).length === 0}
          <div>You have already added all your apps to this collection</div>
          <div class="flex justify-between">
            <IconButton
              icon={LeftArrowIcon}
              on:click={() => (formstep = 'type')}>Back</IconButton
            >
            <div />
          </div>
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
          <div class="flex justify-between">
            <IconButton
              icon={LeftArrowIcon}
              on:click={() => (formstep = 'type')}>Back</IconButton
            >
            <div />
          </div>
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
        <div class="flex flex-col gap-4">
          <div class="grid grid-cols-9">
            <div class="col-span-7 col-start-2 md:col-span-3 md:col-start-4">
              <Sigil patp={lastValidShip} />
            </div>
            <input
              type="text"
              class="p-2 col-span-7 col-start-2 md:col-span-3 md:col-start-4 border"
              class:border-rose-500={lastValidShip !== newShip}
              bind:value={newShip}
              placeholder="~worpet-bildet"
            />
            <!-- <Sigil patp={lastValidShip} /> -->
          </div>
        </div>
        <div class="col-span-12 flex justify-between">
          <IconButton icon={LeftArrowIcon} on:click={() => (formstep = 'type')}
            >Back</IconButton
          >
          <IconButton
            icon={CheckIcon}
            on:click={saveShip}
            disabled={lastValidShip !== newShip || !newShip}>Save</IconButton
          >
        </div>
      {:else if formstep === 'other'}
        <OtherItemForm bind:item={newOtherItem} />
        <div class="col-span-12 flex justify-between">
          <IconButton icon={LeftArrowIcon} on:click={() => (formstep = 'type')}
            >Back</IconButton
          >
          <IconButton icon={CheckIcon} on:click={() => saveOtherItem()}
            >Save</IconButton
          >
        </div>
      {/if}
    </div>
  </div>
</StepForm>
