<script>
  import { state } from '@root/state';
  import { Modal, StepForm } from '@fragments';

  let formstep = 'welcome';
  let formsteps = ['welcome', 'groups', 'apps', 'pals', 'share'];

  let groups, apps, pals;
  state.subscribe((s) => {
    ({ groups, apps, pals } = s);
  });

  let collection = {
    groups: [],
    apps: [],
    pals: [],
  };
</script>

<Modal open={false}>
  <StepForm bind:formstep {formsteps} darkMode={$state.darkmode}>
    <div class="flex flex-col gap-4">
      {#if formstep === 'welcome'}
        <div class="text-2xl">Welcome to Portal</div>
        <p>
          Portal is the front page of Urbit, a social network to help you find
          the things most interesting to you.
        </p>
      {:else if formstep === 'groups'}
        <div class="text-2xl">Recommend your Favourite Groups</div>
        {#each Object.entries(groups) as [path, { meta: { title, image } }]}
          <div class="flex justify-between">
            <div>{title}</div>
            <input
              type="checkbox"
              bind:group={collection.groups}
              value={path}
            />
          </div>
        {/each}
      {:else if formstep === 'apps'}
        <div class="text-2xl">Your Favourite Apps</div>
        {#each Object.entries(apps) as [path, { title, image }]}
          <div class="flex justify-between">
            <div>{title}</div>
            <input
              type="checkbox"
              bind:group={collection.groups}
              value={path}
            />
          </div>
        {/each}
      {:else if formstep === 'pals'}
        {#if !pals}
          <div>Portal is better with %pals!</div>
          <div>Install the app</div>
        {/if}
      {:else if formstep === 'share'}
        <div class="text-2xl">Share with the World</div>
      {/if}
    </div>
  </StepForm>
</Modal>
