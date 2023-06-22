<script>
  import { createEventDispatcher } from 'svelte';
  import {
    state,
  } from '@root/state';
  import {
    IconButton,
    LeftArrowIcon,
    RightArrowIcon,
    CheckIcon,
  } from '@fragments';
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
        <IconButton icon={LeftArrowIcon} on:click={back}>Back</IconButton>
      {:else}
        <div />
      {/if}
      {#if !isLastStep}
        <IconButton icon={RightArrowIcon} on:click={next}>Next</IconButton>
      {:else}
        <IconButton icon={CheckIcon} on:click={save}>Save</IconButton>
      {/if}
    </div>
  {/if}
</div>
