<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let formstep;
  export let formsteps;
  export let navbuttons = true;

  let isLastStep, isFirstStep;

  $: isLastStep = formsteps.indexOf(formstep) === formsteps.length - 1;
  $: isFirstStep = formsteps.indexOf(formstep) === 0;

  const back = () => {
    formstep = formsteps[formsteps.indexOf(formstep) - 1];
  };
  const next = () => {
    formstep = formsteps[formsteps.indexOf(formstep) + 1];
  };
  const save = () => {
    dispatch('save');
  };
</script>

<div class="flex flex-col h-full justify-between gap-4">
  <slot />
  {#if navbuttons}
    <div class="flex justify-between w-full">
      {#if !isFirstStep}
        <button class="border px-2 py-1" on:click={back}>Back</button>
      {:else}
        <div />
      {/if}
      {#if !isLastStep}
        <button class="border px-2 py-1" on:click={next}>Next</button>
      {:else}
        <button class="border px-2 py-1" on:click={save}>Save</button>
      {/if}
    </div>
  {/if}
</div>
