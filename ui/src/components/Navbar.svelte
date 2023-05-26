<script>
  import { push, link, location } from 'svelte-spa-router';
  import config from '@root/config';
  import logo from '@assets/logo.svg';
  import { me } from '@root/api';
  import { HamburgerIcon, CrossIcon } from '@fragments';
  import MySigil from './MySigil.svelte';

  let isMobileNavOpen = false;
  $: console.log({ isMobileNavOpen });

  const nav = [
    {
      title: 'Feed',
      link: '/',
    },
    {
      title: 'Explore',
      link: `/explore`,
    },
    {
      title: 'Feedback',
      action: () =>
        window.open(`${window.location.origin}/apps/talk/dm/~foddur-hodler`),
    },
  ];
</script>

<div
  class="relative flex justify-between items-center px-2 bg-nav backdrop-blur-lg md:px-16 lg:px-32 2xl:px-56 mb-10"
>
  <a use:link href="/" class="flex items-center text-2xl font-bold gap-2">
    <img class="w-14 my-2" src={logo} alt="logo" />
    <div class="font-logo flex items-center px-2 rounded-xl">PORTAL</div>
  </a>

  <div class="hidden flex-col md:flex md:flex-row">
    {#each nav as n}
      <button
        on:click={() => (n.action ? n.action() : push(n.link))}
        class:text-white={$location === n.link}
        class="rounded-xl flex font-sauce items-center px-4 text-offwhite hover:duration-500 hover:text-white py-2 md:py-0"
        >{n.title}</button
      >
    {/each}
    <a use:link href={`/${me}`} class="w-10 h-10 ml-2 rounded-md overflow-hidden">
      <MySigil />
    </a>
  </div>

  {#if isMobileNavOpen}
    <div
      class="absolute top-0 right-0 flex flex-col items-end gap-4 bg-nav pt-2 pb-5 px-5 md:hidden"
    >
      <button
        class="w-10 h-10"
        on:click={() => (isMobileNavOpen = !isMobileNavOpen)}
      >
        <CrossIcon />
      </button>
      {#each nav as n}
        <button
          on:click={() => {
            if (n.action) {
              n.action();
            }
            {
              push(n.link);
            }
            isMobileNavOpen = false;
          }}
          class:bg-nav={$location !== n.link}
          class:text-white={$location !== n.link}
          class:text-black={$location === n.link}
          class:bg-white={$location === n.link}
          class="flex items-center justify-center font-bold px-10 border w-full hover:text-black hover:bg-white py-2 md:py-0"
          >{n.title}</button
        >
      {/each}
      <a
        use:link
        href={`/${me}`}
        class="flex items-center gap-4 border w-full justify-end"
      >
        <div class="font-bold">Profile</div>
        <div class="w-10 h-10 rounded-md overflow-hidden">
          <MySigil />
        </div>
      </a>
    </div>
  {/if}

  <div class="md:hidden">
    <button
      class="w-10 h-10"
      on:click={() => (isMobileNavOpen = !isMobileNavOpen)}
    >
      <HamburgerIcon />
    </button>
  </div>
</div>
