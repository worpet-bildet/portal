<script>
  import { link, location } from 'svelte-spa-router';
  import { me } from '@root/api';

  const nav = [
    {
      title: 'Feed',
      link: '/',
    },
    {
      title: 'My Collection',
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
        class="text-white px-2 py-1 backdrop-blur-lg rounded-md bg-white bg-opacity-30 hover:bg-opacity-0"
        class:underline={$location === n.link}>{n.title}</a
      >
    {/each}
  </div>
</div>
