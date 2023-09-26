<script lang="ts">
  import { Other, ItemKey } from '$types/portal/item';
  import { Groups } from '$types/landscape/groups';
  import { DocketApps } from '$types/apps/app';

  import { createEventDispatcher } from 'svelte';
  import { state, keyStrToObj, keyStrFromObj } from '@root/state';
  import { api, me } from '@root/api';
  import { ItemPreview, ShipForm } from '@components';
  import {
    Modal,
    StepForm,
    TextArea,
    PlusIcon,
    IconButton,
    CancelIcon,
    PlusIcon,
    OtherItemForm,
  } from '@fragments';
  import { toUrbitTime } from '@root/util';
  let dispatch = createEventDispatcher();

  let groups: Groups = {};
  let apps: DocketApps;
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

  let name: string;
  let description: string;
  let groupKeys: string[];
  let appKeys: string[];
  let shipKeys: ItemKey[];
  let otherKeys: ItemKey[];
  let newShip: string;
  let newOtherItem: Other = { title: '', blurb: '', link: '', image: '' };
  let showFormNav: boolean;

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
    let key = { struc: 'other', ship: me, cord: '', time } as ItemKey;
    api.portal.do.create({ time, bespoke: { other: newOtherItem } });
    otherKeys.push(key);
    newOtherItem = { title: '', blurb: '', link: '', image: '' };
  };

  const saveShip = async () => {
    let key = { struc: 'ship', ship: newShip, time: '', cord: '' } as ItemKey;
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
    newOtherItem = { title: '', blurb: '', link: '', image: '' };
    showFormNav = true;
  };

  resetForm();
</script>

<IconButton
  icon={PlusIcon}
  on:click={addCollection}
  class="bg-panels hover:bg-panels-hover dark:fill-white dark:bg-transparent dark:border dark:hover:border-white"
  >New Collection</IconButton
>
<Modal bind:open={showModal}>
  <StepForm
    bind:formstep
    {formsteps}
    on:save={save}
    bind:navbuttons={showFormNav}
  >
    <div class="flex flex-col gap-4 p-4">
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
          {#each Object.entries(groups) as [path]}
            <div class="flex justify-between">
              <div class="w-full">
                <ItemPreview
                  key={{
                    struc: 'group',
                    ship: path.split('/')[0],
                    cord: path.split('/')[1],
                    time: '',
                  }}
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
        {#each Object.entries(apps) as [path, { ship }]}
          <div class="flex justify-between">
            <div class="w-full">
              <ItemPreview
                key={{ struc: 'app', ship, cord: path, time: '' }}
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
            class="hover:bg-panels-hover dark:border dark:hover:border-white dark:border-transparent"
            >Add</IconButton
          >
        </div>
        {#each shipKeys as key}
          <ItemPreview {key} clickable={false} />
        {/each}
      {:else if formstep === 'addship'}
        <ShipForm bind:ship={newShip} />
        <div class="flex justify-between">
          <IconButton
            icon={CancelIcon}
            on:click={() => {
              formstep = 'ships';
              showFormNav = true;
            }}
            class="hover:bg-panels-hover dark:border dark:hover:border-white dark:border-transparent"
            >Cancel</IconButton
          >
          <IconButton
            icon={PlusIcon}
            on:click={() => {
              saveShip();
              formstep = 'ships';
              showFormNav = true;
            }}
            class="hover:bg-panels-hover dark:border dark:hover:border-white dark:border-transparent"
            >Save</IconButton
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
            class="hover:bg-panels-hover dark:border dark:hover:border-white dark:border-transparent"
            >Add</IconButton
          >
        </div>
        {#each otherKeys as key}
          <ItemPreview {key} clickable={false} />
        {/each}
      {:else if formstep === 'addother'}
        <OtherItemForm bind:item={newOtherItem} />
        <div class="flex justify-between">
          <IconButton
            icon={CancelIcon}
            on:click={() => {
              formstep = 'other';
              showFormNav = true;
            }}
            class="hover:bg-panels-hover dark:border dark:hover:border-white dark:border-transparent"
            >Cancel</IconButton
          >
          <IconButton
            icon={PlusIcon}
            on:click={() => {
              saveOtherItem();
              formstep = 'other';
              showFormNav = true;
            }}
            class="hover:bg-panels-hover dark:border dark:hover:border-white dark:border-transparent"
            >Save</IconButton
          >
        </div>
      {/if}
    </div>
  </StepForm>
</Modal>
