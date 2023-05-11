<script>
  import { state, keyStrToObj, keyStrFromObj } from '@root/state';
  import { poke, me } from '@root/api';
  import { ItemVerticalListPreview } from '@components';
  import { Modal, StepForm, TextArea, PlusIcon, IconButton } from '@fragments';

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

  let name = '';
  let description = '';
  let groupKeys = [];
  let appKeys = [];

  const groupSelected = ({ detail: { key } }) => {
    let keyStr = keyStrFromObj(key);
    if (groupKeys.includes(keyStr)) {
      groupKeys = groupKeys
        .slice(0, groupKeys.indexOf(keyStr))
        .concat(groupKeys.slice(groupKeys.indexOf(keyStr)) + 1);
    } else {
      groupKeys.push(keyStr);
    }
  };

  const appSelected = ({ detail: { key } }) => {
    let keyStr = keyStrFromObj(key);
    if (appKeys.includes(keyStr)) {
      appKeys = appKeys
        .slice(0, appKeys.indexOf(keyStr))
        .concat(appKeys.slice(appKeys.indexOf(keyStr)) + 1);
    } else {
      appKeys.push(keyStr);
    }
  };

  let formstep = 'meta';
  let formsteps = ['meta', 'groups', 'apps'];

  const save = () => {
    poke({
      app: 'portal-manager',
      mark: 'portal-action',
      json: {
        create: {
          'append-to': [
            {
              ship: me,
              time: '~2000.1.1',
              struc: 'collection',
              cord: '',
            },
          ],
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

<IconButton icon={PlusIcon} on:click={addCollection}>New Collection</IconButton>
<Modal bind:open={showModal}>
  <StepForm bind:formstep {formsteps} on:save={save}>
    <div class="flex flex-col gap-4 pb-4">
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
          {@const key = {
            struc: 'group',
            ship: path.split('/')[0],
            cord: path.split('/')[1],
            time: '',
          }}
          <div class="flex justify-between">
            <ItemVerticalListPreview
              {key}
              clickable={false}
              selectable
              on:selected={groupSelected}
            />
          </div>
        {/each}
      {:else if formstep === 'apps'}
        <div>Add these apps?</div>
        {#each Object.entries(apps) as [path, { title, image, ship, info }]}
          {@const key = { struc: 'app', ship, cord: path, time: '' }}
          <div class="flex justify-between">
            <ItemVerticalListPreview
              {key}
              clickable={false}
              selectable
              on:selected={appSelected}
            />
          </div>
        {/each}
      {/if}
    </div>
  </StepForm>
</Modal>
