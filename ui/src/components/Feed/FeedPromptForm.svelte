<script lang="ts">
  import { FeedItem } from '$types/portal/item';

  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';

  import { getItem, reScoreItems } from '@root/state';

  import {
    OpenAIIcon,
    VerticalExpandIcon,
    VerticalCollapseIcon,
  } from '@fragments';

  const dispatch = createEventDispatcher();

  export let loading: boolean = false;
  export let feed: FeedItem[] = [];
  export let promptedFeed: FeedItem[] = [];

  let positiveFeedPrompt: string = '';
  let negativeFeedPrompt: string = '';
  let positiveFeedPromptForm: HTMLInputElement;
  let showExpandedForm: boolean = false;
  let canResetFeed: boolean = false;

  function handleSearchKeydown(event: KeyboardEvent) {
    if ((event.target as HTMLElement).tagName === 'BODY' && event.key === '/') {
      event.preventDefault();
      positiveFeedPromptForm.focus();
    }
  }

  const handleAISearchKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      dispatch('prompt');
    }
  };

  const handlePromptFeed = async (): Promise<void> => {
    loading = true;
    await reScoreItems(positiveFeedPrompt, negativeFeedPrompt);
    promptedFeed = feed
      .filter((i) => !!getItem(i.key)?.score)
      .sort((a, b) => getItem(b.key)?.score - getItem(a.key)?.score);

    canResetFeed = true;
    loading = false;
  };

  const handleResetFeed = (): void => {
    promptedFeed = [] as FeedItem[];
    positiveFeedPrompt = '';
    negativeFeedPrompt = '';
    canResetFeed = false;
  };
</script>

<svelte:window on:keydown={handleSearchKeydown} />
<div
  class="flex gap-2 border p-4 flex-col rounded-2xl col-span-12 md:col-span-6"
>
  <div class="flex gap-2">
    <div
      class="border rounded-2xl bg-panels-hover flex w-full justify-between items-center"
    >
      <div class="flex items-center justify-center w-full">
        <div
          class="w-9 h-9 ml-3 p-1.5 rounded-xl bg-gradient-to-b from-ai-purple to-ai-blue"
        >
          <OpenAIIcon />
        </div>
        <input
          type="text"
          class="focus:outline-none p-3 placeholder-grey text-black text-lg dark:text-white flex-grow"
          placeholder="Search Portal"
          bind:value={positiveFeedPrompt}
          bind:this={positiveFeedPromptForm}
          on:keydown={handleAISearchKeydown}
        />
        <div class="flex justify-center">
          {#if canResetFeed}
            <button
              on:click={handleResetFeed}
              class="bg-panels-hover text-grey dark:border rounded-md px-2 mr-2 flex items-center justify-center"
              >x</button
            >
          {:else}
            <button
              class="bg-panels-hover dark:border text-grey rounded-md w-7 h-7 mr-2 flex items-center justify-center"
              >/</button
            >
          {/if}
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col overflow-x-scroll scrollbar-hide">
    <div class="flex gap-4">
      <button
        class="rounded-lg bg-panels-hover text-grey hover:bg-translucent-purple dark:border dark:hover:bg-transparent dark:hover:border-white p-2 px-4 whitespace-nowrap"
        on:click={() => {
          positiveFeedPrompt = 'from my pals';
          negativeFeedPrompt = '';
          handlePromptFeed();
        }}>Your Pals</button
      >
      <button
        class="rounded-lg bg-panels-hover text-grey hover:bg-translucent-purple dark:border dark:hover:bg-transparent dark:hover:border-white p-2 px-4"
        on:click={() => {
          positiveFeedPrompt = 'crypto';
          negativeFeedPrompt = '';
          handlePromptFeed();
        }}>Crypto</button
      >
      <button
        class="rounded-lg bg-panels-hover text-grey hover:bg-translucent-purple dark:border dark:hover:bg-transparent dark:hover:border-white p-2 px-4"
        on:click={() => {
          positiveFeedPrompt = 'high wordCount';
          negativeFeedPrompt = '';
          handlePromptFeed();
        }}>Longform</button
      >
      <button
        class="rounded-lg bg-panels-hover hover:bg-translucent-purple dark:border dark:hover:bg-transparent dark:hover:border-white text-grey p-2 px-4"
        on:click={() => {
          positiveFeedPrompt = 'retweet';
          negativeFeedPrompt = '';
          handlePromptFeed();
        }}>Recommendations</button
      >
      <button
        class="rounded-lg bg-panels-hover text-grey hover:bg-translucent-purple dark:border dark:hover:bg-transparent dark:hover:border-white p-2 px-4"
        on:click={() => {
          positiveFeedPrompt = 'productivity, work, learning';
          negativeFeedPrompt = '';
          handlePromptFeed();
        }}>Productivity</button
      >
      <button
        class="rounded-lg bg-panels-hover text-grey hover:bg-translucent-purple dark:border dark:hover:bg-transparent dark:hover:border-white p-2 px-4"
        on:click={() => {
          positiveFeedPrompt = 'https://';
          negativeFeedPrompt = '';
          handlePromptFeed();
        }}>Links</button
      >
      <button
        class="rounded-lg bg-panels-hover text-grey hover:bg-translucent-purple dark:border dark:hover:bg-transparent dark:hover:border-white p-2 px-4"
        on:click={() => {
          positiveFeedPrompt = 'tech, programming, hoon';
          negativeFeedPrompt = '';
          handlePromptFeed();
        }}>Tech</button
      >
      <button
        class="rounded-lg bg-panels-hover text-grey hover:bg-translucent-purple dark:border dark:hover:bg-transparent dark:hover:border-white p-2 px-4"
        on:click={() => {
          positiveFeedPrompt = 'politics';
          negativeFeedPrompt = '';
          handlePromptFeed();
        }}>Politics</button
      >
      <button
        class="rounded-lg bg-panels-hover text-grey hover:bg-translucent-purple dark:border dark:hover:bg-transparent dark:hover:border-white p-2 px-4"
        on:click={() => {
          positiveFeedPrompt = 'Jokes, funny, sarcasm';
          negativeFeedPrompt = 'seriousness, work, productivity';
          handlePromptFeed();
        }}>Shitposts</button
      >
    </div>
  </div>
  <div>
    {#if showExpandedForm}
      <div
        class="border rounded-2xl bg-panels-hover flex w-full justify-between items-center mt-4"
        transition:slide
      >
        <div class="flex items-center justify-center w-full">
          <div
            class="w-9 h-9 ml-3 p-1.5 rounded-xl bg-gradient-to-b from-ai-purple to-ai-blue"
          >
            <OpenAIIcon />
          </div>
          <input
            type="text"
            class="focus:outline-none p-3 placeholder-grey text-black text-lg dark:text-white flex-grow"
            placeholder="Show me less ..."
            bind:value={negativeFeedPrompt}
            on:keydown={handleAISearchKeydown}
          />
        </div>
      </div>
      <div class="flex flex-col mt-4" transition:slide>
        <div class="flex gap-4">
          <button
            class="rounded-lg bg-panels-hover text-grey hover:bg-translucent-purple dark:border dark:hover:bg-transparent dark:hover:border-white p-2 px-4"
            on:click={() => {
              positiveFeedPrompt = '';
              negativeFeedPrompt = 'abortion, racism, sexism, classism';
              handlePromptFeed();
            }}>Culture wars</button
          >
          <button
            class="rounded-lg bg-panels-hover text-grey hover:bg-translucent-purple dark:border dark:hover:bg-transparent dark:hover:border-white p-2 px-4"
            on:click={() => {
              positiveFeedPrompt = '';
              negativeFeedPrompt = 'Jokes, funny, sarcasm';
              handlePromptFeed();
            }}>Shitposts</button
          >
          <button
            class="rounded-lg bg-panels-hover text-grey hover:bg-translucent-purple dark:border dark:hover:bg-transparent dark:hover:border-white p-2 px-4"
            on:click={() => {
              positiveFeedPrompt = '';
              negativeFeedPrompt = 'politics';
              handlePromptFeed();
            }}>Politics</button
          >
          <button
            class="rounded-lg bg-panels-hover text-grey hover:bg-translucent-purple dark:border dark:hover:bg-transparent dark:hover:border-white p-2 px-4"
            on:click={() => {
              positiveFeedPrompt = '';
              negativeFeedPrompt = 'crypto';
              handlePromptFeed();
            }}>Crypto</button
          >
        </div>
      </div>
    {/if}
  </div>
  <div class="flex justify-center">
    <button
      class="bg-panels-solid dark:bg-darkgrey hover:border-darkgrey dark:hover:border-grey text-grey dark:text-grey rounded-md w-7 h-7 mr-2 border flex items-center justify-center mb-[-30px]"
      on:click={() => (showExpandedForm = !showExpandedForm)}
    >
      {#if showExpandedForm}
        <VerticalCollapseIcon />
      {:else}
        <VerticalExpandIcon />
      {/if}
    </button>
  </div>
</div>
