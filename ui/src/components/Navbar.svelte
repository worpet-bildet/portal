<script>
  import { push, link, location } from 'svelte-spa-router';
  import { format } from 'timeago.js';
  import { state, toggleDarkmode, getNotifications } from '@root/state';
  import { me } from '@root/api';
  import { Sigil } from '@components';
  import {
    HamburgerIcon,
    CrossIcon,
    IconButton,
    SunIcon,
    MoonIcon,
    BellIcon,
  } from '@fragments';
  import { fromUrbitTime } from '@root/util';
  import logo from '@assets/logo.svg';

  let isMobileNavOpen = false;

  const pagesWithoutCoverPhoto = ['/explore', '/edit', '-edit/'];

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

  let notifications = [];
  let notificationsOpen = false;
  state.subscribe(() => {
    notifications = getNotifications(me);
  });
</script>

<div class="mb-10">
  <div
    class="relative flex justify-between items-center px-2 md:px-16 lg:px-32 2xl:px-56"
  >
    <a use:link href="/" class="flex items-center text-2xl font-bold gap-2">
      <img class="w-14 my-2" src={logo} alt="logo" />
      <div
        class="font-logo flex items-center px-2 rounded-xl"
        class:text-grey={pagesWithoutCoverPhoto.some((v) =>
          $location.includes(v)
        ) || $location === '/'}
        class:text-white={$state.darkmode ||
          (!pagesWithoutCoverPhoto.some((v) => $location.includes(v)) &&
            $location !== '/')}
      >
        PORTAL
      </div>
    </a>

    <div class="hidden flex-col md:flex gap-4 md:flex-row items-center">
      {#if $location === '/'}
        <div class="relative">
          <div class="rounded-full overflow-hidden">
            <IconButton
              icon={BellIcon}
              on:click={() => (notificationsOpen = !notificationsOpen)}
            />
          </div>
          {#if notificationsOpen}
            <div
              class="absolute top-10 w-96 flex flex-col gap-4 bg-white dark:bg-black rounded-xl border border-white overflow-hidden"
            >
              {#if notifications.length > 0}
                {#each notifications as [reply, op]}
                  <a
                    class="flex items-center justify-between hover:bg-offwhite dark:hover:bg-darkgrey cursor-pointer p-2"
                    href={`#${fromUrbitTime(op.time)}`}
                  >
                    <div class="flex gap-2">
                      <div class="w-5"><Sigil patp={reply.ship} /></div>
                      <div class="text-sm">{reply.ship} replied to you</div>
                    </div>
                    <div class="text-xs text-right">
                      {format(fromUrbitTime(reply.time))}
                    </div>
                  </a>
                {/each}
              {:else}
                <div class="p-2">No notifications</div>
              {/if}
            </div>
          {/if}
        </div>
      {/if}
      <div class="rounded-full overflow-hidden">
        <IconButton
          icon={$state.darkmode ? SunIcon : MoonIcon}
          on:click={toggleDarkmode}
          class="hover:bg-transparent border-transparent
            {!pagesWithoutCoverPhoto.some((v) => $location.includes(v)) &&
          $location !== '/' &&
          !$state.darkmode
            ? 'fill-white'
            : 'fill-grey'}
            {$state.darkmode ? 'hover:fill-white' : ''}
            {!$state.darkmode &&
          !pagesWithoutCoverPhoto.some((v) => $location.includes(v)) &&
          $location !== '/'
            ? 'hover:fill-offwhite'
            : 'hover:fill-black'}"
        />
      </div>
      {#each nav as n}
        <button
          on:click={() => (n.action ? n.action() : push(n.link))}
          class="rounded-xl flex font-saucebold items-center px-4 hover:duration-500 py-2 md:py-0"
          class:text-black={$location === n.link}
          class:text-grey={$location !== n.link &&
            (pagesWithoutCoverPhoto.some((v) => $location.includes(v)) ||
              $location === '/')}
          class:hover:text-black={!$state.darkmode ||
            ($location !== n.link &&
              (pagesWithoutCoverPhoto.some((v) => $location.includes(v)) ||
                $location === '/'))}
          class:text-white={$state.darkmode ||
            ($location !== n.link &&
              !pagesWithoutCoverPhoto.some((v) => $location.includes(v)) &&
              $location !== '/')}
          class:hover:text-offwhite={$state.darkmode ||
            ($location !== n.link &&
              !pagesWithoutCoverPhoto.some((v) => $location.includes(v)) &&
              $location !== '/')}>{n.title}</button
        >
      {/each}
      <a
        use:link
        href={`/${me}`}
        class="w-10 h-10 ml-4 rounded-md overflow-hidden"
      >
        <Sigil patp={me} />
      </a>
    </div>

    {#if isMobileNavOpen}
      <div
        class="absolute top-0 right-0 flex font-saucebold flex-col items-end gap-4 bg-white pt-2 pb-5 px-5 rounded-md md:hidden"
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
            class:text-grey={$location !== n.link}
            class:text-black={$location === n.link}
            class="flex items-center justify-center font-bold px-10 w-full py-2 md:py-0"
            >{n.title}</button
          >
        {/each}
        <a
          use:link
          href={`/${me}`}
          class="flex items-center gap-4 w-full justify-end"
        >
          <div class="text-grey">Profile</div>
          <div class="w-10 h-10 rounded-md overflow-hidden">
            <Sigil patp={me} />
          </div>
        </a>
      </div>
    {/if}

    <div class="md:hidden">
      <button
        class="w-10 h-10 {isMobileNavOpen ? 'hidden' : ''}"
        on:click={() => (isMobileNavOpen = !isMobileNavOpen)}
      >
        <HamburgerIcon />
      </button>
    </div>
  </div>
</div>
