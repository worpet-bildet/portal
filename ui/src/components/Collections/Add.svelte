<script>
  import { createEventDispatcher } from 'svelte';
  import { state, keyStrToObj, keyStrFromObj } from '@root/state';
  import { api, me } from '@root/api';
  import { ItemVerticalListPreview, ShipForm } from '@components';
  import {
    Modal,
    StepForm,
    TextArea,
    PlusIcon,
    IconButton,
    CrossIcon,
    CheckIcon,
    OtherItemForm,
  } from '@fragments';
  import { toUrbitTime } from '@root/util';
  let dispatch = createEventDispatcher();

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

  let showModal = false;
  const addCollection = () => {
    showModal = true;
  };

  let name,
    description,
    groupKeys,
    appKeys,
    shipKeys,
    otherKeys,
    newShip,
    newOtherItem,
    showFormNav;

  const groupSelected = ({ detail: { key } }) => {
    let keyStr = keyStrFromObj(key);
    if (groupKeys.includes(keyStr)) {
      groupKeys = groupKeys
        .slice(0, groupKeys.indexOf(keyStr))
        .concat(groupKeys.slice(groupKeys.indexOf(keyStr) + 1));
    } else {
      groupKeys.push(keyStr);
    }
  };

  const appSelected = ({ detail: { key } }) => {
    let keyStr = keyStrFromObj(key);
    if (appKeys.includes(keyStr)) {
      appKeys = appKeys
        .slice(0, appKeys.indexOf(keyStr))
        .concat(appKeys.slice(appKeys.indexOf(keyStr) + 1));
    } else {
      appKeys.push(keyStr);
    }
  };

  let formstep = 'other';
  let formsteps = ['meta', 'groups', 'apps', 'ships', 'other'];
  // OTHER FORMSTEPS = ['addship', 'addother']

  const save = () => {
    api.portal.do.create({
      'append-to': [
        { ship: me, time: '~2000.1.1', struc: 'collection', cord: '' },
      ],
      bespoke: {
        collection: {
          title: name,
          blurb: description,
          image: '',
          'key-list': [
            ...groupKeys.map((i) => keyStrToObj(i)),
            ...appKeys.map((i) => keyStrToObj(i)),
            ...shipKeys,
            ...otherKeys,
          ],
        },
      },
    });
    showModal = false;
    // TODO: also navigate to the collections tab when we do this
    dispatch('add');
  };

  const saveOtherItem = () => {
    // here we should cretae create a key for the item, and then save it and add
    // the key to our list of other items so that it will show up in the list
    let time = toUrbitTime(Date.now());
    let key = { struc: 'other', ship: me, cord: '', time };
    api.portal.do.create({ time, bespoke: { other: newOtherItem } });
    otherKeys.push(key);
    newOtherItem = {};
  };

  const saveShip = async () => {
    let key = { struc: 'ship', ship: newShip, time: '', cord: '' };
    shipKeys.push(key);
    newShip = '';
  };

  const resetForm = () => {
    formstep = 'meta';
    name = '';
    description = '';
    groupKeys = [];
    appKeys = [];
    shipKeys = [];
    otherKeys = [];
    newShip = '';
    newOtherItem = {};
    showFormNav = true;
  };

  resetForm();
</script>

<IconButton
  icon={PlusIcon}
  on:click={addCollection}
  common
  darkMode={$state.darkmode}>New Collection</IconButton
>
<Modal bind:open={showModal}>
  <StepForm
    bind:formstep
    {formsteps}
    on:save={save}
    bind:navbuttons={showFormNav}
    darkMode={$state.darkmode}
  >
    <div class="flex flex-col gap-4">
      {#if formstep === 'meta'}
        <div class="text-2xl font-bold">Give your collection a name</div>
        <input
          type="text"
          class="p-2 border-b text-lg focus:outline-none placeholder-grey"
          bind:value={name}
          placeholder="A collection of useful items"
        />
        <div class="text-2xl font-bold pt-4">
          Briefly describe the collection (optional)
        </div>
        <TextArea
          bind:value={description}
          placeholder="Things to help you navigate Urbit for the first time"
        />
      {:else if formstep === 'groups'}
        {#if Object.entries(groups).length > 0}
          <div class="text-2xl font-bold">Add groups</div>
          {#each Object.entries(groups) as [path, { meta: { title, image } }]}
            {@const key = {
              struc: 'group',
              ship: path.split('/')[0],
              cord: path.split('/')[1],
              time: '',
            }}
            <div class="flex justify-between">
              <div class="w-full">
                <ItemVerticalListPreview
                  {key}
                  clickable={false}
                  selectable
                  on:selected={groupSelected}
                />
              </div>
            </div>
          {/each}
        {:else}
          <div>
            It looks like you are not a member of any groups yet, groups you
            join will appear here.
          </div>
        {/if}
      {:else if formstep === 'apps'}
        <div class="text-2xl font-bold">Add apps</div>
        {#each Object.entries(apps) as [path, { title, image, ship, info }]}
          {@const key = { struc: 'app', ship, cord: path, time: '' }}
          <div class="flex justify-between">
            <div class="w-full">
              <ItemVerticalListPreview
                {key}
                clickable={false}
                selectable
                on:selected={appSelected}
              />
            </div>
          </div>
        {/each}
      {:else if formstep === 'ships'}
        <div class="text-2xl font-bold">Add other users</div>
        <div class="flex flex-col items-center justify-center gap-4">
          <IconButton
            icon={PlusIcon}
            on:click={() => {
              formstep = 'addship';
              showFormNav = false;
            }}
            common
            darkMode={$state.darkmode}>Add</IconButton
          >
        </div>
        {#each shipKeys as key}
          <ItemVerticalListPreview {key} clickable={false} />
        {/each}
      {:else if formstep === 'addship'}
        <ShipForm bind:ship={newShip} />
        <div class="flex justify-between">
          <IconButton
            icon={CrossIcon}
            on:click={() => {
              formstep = 'ships';
              showFormNav = true;
            }}
            common
            darkMode={$state.darkmode}>Cancel</IconButton
          >
          <IconButton
            icon={CheckIcon}
            on:click={() => {
              saveShip();
              formstep = 'ships';
              showFormNav = true;
            }}
            common
            darkMode={$state.darkmode}>Save</IconButton
          >
        </div>
      {:else if formstep === 'other'}
        <div class="text-2xl font-bold">Add links, images, etc.</div>
        <div class="flex flex-col items-center justify-center gap-4">
          <IconButton
            icon={PlusIcon}
            on:click={() => {
              formstep = 'addother';
              showFormNav = false;
            }}
            common
            darkMode={$state.darkmode}>Add</IconButton
          >
        </div>
        {#each otherKeys as key}
          <ItemVerticalListPreview {key} clickable={false} />
        {/each}
      {:else if formstep === 'addother'}
        <OtherItemForm bind:item={newOtherItem} />
        <div class="flex justify-between">
          <IconButton
            icon={CrossIcon}
            on:click={() => {
              formstep = 'other';
              showFormNav = true;
            }}
            common
            darkMode={$state.darkmode}>Cancel</IconButton
          >
          <IconButton
            icon={CheckIcon}
            on:click={() => {
              saveOtherItem();
              formstep = 'other';
              showFormNav = true;
            }}
            common
            darkMode={$state.darkmode}>Save</IconButton
          >
        </div>
      {/if}
    </div>
  </StepForm>
</Modal>
