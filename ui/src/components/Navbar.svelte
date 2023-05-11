<script>
  import { link, location } from 'svelte-spa-router';
  import { me } from '@root/api';
  import { Sigil } from '@fragments';
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
      title: 'Feedback', // we want this link to not use:link because it'g going out to groups
      link: `/${me}`,
    },
  ];
</script>

<div
  class="relative flex justify-between items-center border-b px-10 bg-black bg-opacity-30 backdrop-blur-sm"
>
  <a
    use:link
    href="/"
    class="flex items-center text-xl font-bold gap-2 text-white"
  >
    <img
      class="w-16"
      src="https://toptyr-bilder.nyc3.cdn.digitaloceanspaces.com/logo2.svg"
      alt="logo"
    />
    Portal
  </a>
  <div class="flex gap-4">
    {#each nav as n}
      <a
        use:link
        href={n.link}
        class="text-white backdrop-blur-lg rounded-lg bg-white bg-opacity-30 hover:bg-opacity-0 flex items-center font-bold px-4"
        class:active={$location === n.link}>{n.title}</a
      >
    {/each}
    <a use:link href={`/${me}`} class="w-10 h-10 rounded-md overflow-hidden">
      <MySigil />
    </a>
  </div>
</div>

<style>
  .active {
    color: black;
    background-color: white;
  }
</style>
