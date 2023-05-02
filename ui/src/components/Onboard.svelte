<script>
  import { state } from '@root/state';
  import { Modal, StepForm } from '@fragments';
  // Here we are going to display a modal which onboards the user

  let formstep = 'welcome';
  let formsteps = ['welcome', 'groups', 'apps', 'share'];

  let groups, apps;
  state.subscribe((s) => {
    ({ groups, apps } = s);
  });

  let collection = {
    groups: [],
    apps: [],
  };
</script>

<Modal open={true}>
  <StepForm bind:formstep {formsteps}>
    <div class="flex flex-col gap-4">
      {#if formstep === 'welcome'}
        <div class="text-2xl">Welcome to Portal</div>
        <p>
          Portal is the front page of Urbit, a social network to help you find
          the things most interesting to you.
        </p>
      {:else if formstep === 'groups'}
        <div class="text-2xl">Recommend your Favourite Groups</div>
        {#each groups as [path, { meta: { title, image } }]}
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
        <!-- {#each apps as [path, { meta: { title, image } }]}
          <div class="flex justify-between">
            <div>{title}</div>
            <input
              type="checkbox"
              bind:group={collection.groups}
              value={path}
            />
          </div>
        {/each} -->
      {:else if formstep === 'share'}
        <div class="text-2xl">Share with the World</div>
      {/if}
    </div>
  </StepForm>
</Modal>
