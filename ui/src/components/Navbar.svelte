<script>
  import { push, link, location } from 'svelte-spa-router';
  import { format } from 'timeago.js';
  import {
    state,
    toggleDarkmode,
    getNotifications,
    getItem,
    updateNotificationsLastChecked,
    toggleMuteNotifications,
  } from '@root/state';
  import { me } from '@root/api';
  import { Sigil } from '@components';
  import {
    HamburgerIcon,
    CrossIcon,
    IconButton,
    SunIcon,
    MoonIcon,
    BellIcon,
    MutedIcon,
  } from '@fragments';
  import { getMeta, fromUrbitTime } from '@root/util';
  import logo from '@assets/logo.svg';

  let isMobileNavOpen = false;

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
  let hasNewNotifications;
  state.subscribe(() => {
    notifications = getNotifications(me);
    let notificationTimes = notifications.map(([firstSubObj, secondSubObj]) => firstSubObj.time);
    hasNewNotifications = notificationTimes.some(time => fromUrbitTime(time) > new Date($state.notificationsLastChecked).getTime());
  });

  const pagesWithoutCoverPhoto = ['/explore', '/edit', '-edit/', '/'];
  let highContrast = false;
  location.subscribe((l) => {
    highContrast = !pagesWithoutCoverPhoto.includes(l);
    for (let page of pagesWithoutCoverPhoto) {
      if (l.includes(page) && page !== '/') highContrast = false;
    }
  });

  const handleNotificationsOpen = () => {
    notificationsOpen = true;
    updateNotificationsLastChecked();
    hasNewNotifications = false;
    // document.body.addEventListener('click', handleNotificationsClose);
  };
  const handleNotificationsClose = () => {
    notificationsOpen = false;
    document.body.removeEventListener('click', handleNotificationsClose);
  };

  console.log(`state: ${$state.muteNotifications}`);
</script>

<div class="mb-10">
  <div
    class="relative flex justify-between items-center px-2 md:px-16 lg:px-32 2xl:px-56"
  >
    <a use:link href="/" class="flex items-center text-2xl font-bold gap-2">
      <img class="w-14 my-2" src={logo} alt="logo" />
      <div
        class="font-logo flex items-center px-2 rounded-xl dark:text-white"
        class:text-grey={!highContrast}
        class:text-white={highContrast}
      >
        PORTAL
      </div>
    </a>

    <div class="hidden flex-col md:flex gap-4 md:flex-row items-center">
      {#if $location === '/'}
        <div class="relative">
          <div class="rounded-full">
            <button
              on:click|stopPropagation={notificationsOpen ? handleNotificationsClose : handleNotificationsOpen}
              class="w-5 flex items-center">
              <BellIcon />
              {#if hasNewNotifications}
                <div class="relative inline-flex">
                  <span class="absolute top-0 right-0 inline-block w-2 h-2 bg-ai-purple rounded-full"></span>
                </div>
              {/if}
            </button>
          </div>
          {#if notificationsOpen}
            <div
              class="absolute top-10 w-max p-3 flex flex-col gap-4 bg-white dark:bg-black rounded-xl border border-grey overflow-hidden"
            >
              <div class="flex justify-between">
                <div class="text-xl">Notifications</div>
                <div class="relative flex items-center justify-end">
                  <div class="relative">
                    <input id="toggle" type="checkbox" class="cursor-pointer" bind:checked={$state.muteNotifications} on:change={() => toggleMuteNotifications()} />

                    <!-- <label for="toggle" class="dot absolute left-1 top-1 bg-black w-6 h-6 rounded-full transition"></label>
                    <label for="toggle" class="block border border-black w-14 h-8 rounded-full flex justify-between items-center">
                      <BellIcon
                        class={`p-[3px] transform translate-x-[3px] ${$state.muteNotifications ? 'text-white' : ''}`}
                      />
                      <MutedIcon
                        class={`p-[3px] transform -translate-x-[3px] ${!$state.muteNotifications ? 'text-white' : ''}`}
                      /> -->
                    <!-- </label> -->
                  </div>
                </div>
              </div>
              {#if notifications.length > 0}
                {#each notifications as [reply, op]}
                  <button
                    class="flex items-center justify-between gap-4 hover:bg-offwhite dark:hover:bg-darkgrey cursor-pointer p-2"
                    on:click={() => {
                      switch (reply.struc) {
                        case 'other':
                          window.location.href = `#${fromUrbitTime(op.time)}`;
                          break;
                        case 'review':
                          push(`/app/${op.ship}/${op.cord || op.time}`);
                          break;
                      }
                    }}
                  >
                    <div class="flex gap-2">
                      <div class="w-5"><Sigil patp={reply.ship} /></div>
                      {#if reply.struc === 'review'}
                        {@const { title } = getMeta(getItem(op))}
                        <div class="text-sm">{reply.ship} reviewed {title}</div>
                      {:else if reply.struc === 'other'}
                        <div class="text-sm">{reply.ship} replied to you</div>
                      {/if}
                    </div>
                    <div class="text-xs text-right">
                      {format(fromUrbitTime(reply.time))}
                    </div>
                  </button>
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
          class="hover:bg-transparent border-transparent dark:fill-white {highContrast
            ? 'fill-white'
            : ''}"
        />
      </div>
      {#each nav as n}
        <button
          on:click={() => (n.action ? n.action() : push(n.link))}
          class="rounded-xl flex font-bold items-center px-4 hover:duration-500 py-2 md:py-0"
          class:text-grey={$location === n.link && highContrast}
          class:text-white={highContrast}>{n.title}</button
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
        class="absolute top-0 right-0 flex font-bold flex-col items-end gap-4 bg-white pt-2 pb-5 px-5 rounded-md md:hidden"
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
