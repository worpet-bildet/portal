<script lang="ts">
  import { ArrowBackIcon, IconButton, PlusIcon } from '@fragments';
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
        <IconButton
          icon={ArrowBackIcon}
          on:click={back}
          class="hover:bg-panels-hover dark:border dark:hover:border-white dark:border-transparent"
          >Back</IconButton
        >
      {:else}
        <div />
      {/if}
      {#if !isLastStep}
        <button
          on:click={next}
          class="hover:bg-panels-hover dark:border dark:hover:border-white dark:border-transparent"
          >Next</button
        >
      {:else}
        <IconButton
          icon={PlusIcon}
          on:click={save}
          class="hover:bg-panels-hover dark:border dark:hover:border-white dark:border-transparent"
          >Save</IconButton
        >
      {/if}
    </div>
  {/if}
</div>
