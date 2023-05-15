<script>
  import { push, link, location } from 'svelte-spa-router';
  import logo from '@assets/logo.svg';
  import { me } from '@root/api';
  import MySigil from './MySigil.svelte';

  const nav = [
    {
      title: 'Post',
      link: '/',
    },
    {
      title: 'Explore',
      link: '/~worpet-bildet',
    },
    {
      title: 'Feedback',
      action: () =>
        window.open(`${window.location.origin}/apps/talk/dm/~foddur-hodler`),
    },
  ];
</script>

<div
  class="relative flex justify-between items-center border-b px-10 bg-nav bg-opacity-80 backdrop-blur-sm"
>
  <!-- <a
    use:link
    href="/"
    class="flex items-center text-xl font-bold gap-2 text-white"
  >
    <img
      class="w-16"
      src="https://toptyr-bilder.nyc3.cdn.digitaloceanspaces.com/logo2.svg"
      alt="logo"
    />
    <div class="font-logo text-black font-bold text-2xl">Portal</div> -->
  <a use:link href="/" class="flex items-center text-xl font-bold gap-2">
    <img class="w-16" src={logo} alt="logo" />
    PORTAL
  </a>
  <div class="flex gap-4">
    {#each nav as n}
      <button
        on:click={() => (n.action ? n.action() : push(n.link))}
        class="backdrop-blur-lg rounded-lg bg-transparent flex items-center font-bold px-4 hover:text-white hover:bg-black"
        class:text-black={$location !== n.link}
        class:text-white={$location === n.link}
        class:bg-black={$location === n.link}>{n.title}</button
      >
    {/each}
    <a use:link href={`/${me}`} class="w-10 h-10 rounded-md overflow-hidden">
      <MySigil />
    </a>
  </div>
</div>
