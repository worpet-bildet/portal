<script>
  import { link } from 'svelte-spa-router';
  import { Confetti } from 'svelte-confetti';

  import config from '@root/config';
  import { me, api } from '@root/api';
  import { getItem, keyStrFromObj, state } from '@root/state';
  import { isUrl, ethToWei, sendTransaction } from '@root/util';
  import { Sigil } from '@components';
  import {
    ItemImage,
    StarRating,
    IconButton,
    EthereumIcon,
    Modal,
  } from '@fragments';
  export let cover, avatar, title, description, patp, color, type, reviews, key;

  let tipModalOpen = false;
  let tipAmount = 0.001;
  let tx;
  const handleTipRequest = () => {
    // pop a modal to allow the user to select how much they would like to tip
    api.portal.do.tipRequest(key);
    tipModalOpen = true;
  };
  const handleConfirmTip = async () => {
    tx = await sendTransaction(
      tip['receiving-address'],
      ethToWei(tipAmount),
      tip['hex'],
      config.chainId
    );
    api.portal.do.tipTxHash(patp, tx.hash, '');
  };

  let tip;
  state.subscribe((s) => {
    ({ tip } = s);
  });

  let reviewCount, reviewAverageRating;
  $: {
    if (reviews && reviews.length > 0) {
      // if we have reviews, let's count them, and get the average score!
      reviewCount = reviews.length;
      reviewAverageRating = (
        reviews.reduce((rating = 0, r) => {
          rating += Number(getItem(keyStrFromObj(r))?.bespoke?.rating);
          return rating;
        }, 0) / reviewCount
      ).toFixed(1);
    }
  }

  let avatarPad, avatarContainer, innerWidth;
  $: if (avatarPad && avatarContainer) {
    redrawAvatar();
  }
  $: {
    if (innerWidth) {
      redrawAvatar();
    }
  }
  const redrawAvatar = () => {
    if (avatarPad && avatarContainer) {
      avatarPad.style.height = `${avatarContainer.clientHeight}px`;
    }
  };
  $: if (!cover || !isUrl(cover)) {
    cover = 'https://toptyr-bilder.nyc3.cdn.digitaloceanspaces.com/hills.jpg';
  }
</script>

<svelte:window bind:innerWidth />
<div class="col-span-12 w-full h-56">
  {#if isUrl(cover)}
    <img
      src={cover}
      class="absolute top-0 left-0 object-cover cover h-80 w-full z-0"
      alt="Profile banner"
    />
    <div
      class="absolute top-0 left-0 object-cover cover h-80 w-full z-0 bg-gradient-to-t from-coverPhotoBottom to-coverPhotoTop"
    />
  {:else}
    <div
      class="absolute cover top-0 left-0 h-80 w-full z-0 bg-grey flex items-center justify-center text-8xl font-bold overflow-hidden text-white"
    />
  {/if}
</div>
<div class="col-span-12 md:col-span-9 flex flex-col gap-4">
  <div class="grid grid-cols-12 gap-4 w-full">
    <div class="relative col-span-3 md:col-span-2">
      <div bind:this={avatarPad} />
      <div
        class="absolute -top-12 w-full rounded-md"
        bind:this={avatarContainer}
      >
        {#if avatar}
          <div class="rounded-md overflow-hidden w-full">
            <ItemImage {title} {color} image={avatar} on:load={redrawAvatar} />
          </div>
        {:else if type === 'app'}
          <div class="rounded-md overflow-hidden w-full">
            <ItemImage {title} {color} on:load={redrawAvatar} />
          </div>
        {:else}
          <div class="rounded-md overflow-hidden w-full">
            <Sigil {patp} />
          </div>
        {/if}
      </div>
    </div>
    <div
      class="flex flex-col justify-start gap-2 col-span-9 relative break-words"
    >
      <div class="text-lg md:text-2xl font-bold">
        {title || ''}
      </div>
      <div class="gap-4">
        <!-- TODO: get any links in here to print nicely -->
        {#if description}<div>{description}</div>{/if}
        {#if type === 'collection' || type === 'app' || type === 'group'}<a
            use:link
            class="text-sm hover:text-grey hover:duration-500"
            href={`/${patp}`}
          >
            by {patp}
          </a>{/if}
      </div>
      {#if window.ethereum && me !== patp}
        <div class="flex">
          <IconButton
            icon={EthereumIcon}
            class="border"
            on:click={handleTipRequest}>Tip</IconButton
          >
        </div>
      {/if}
    </div>
    {#if reviews && reviewAverageRating}
      <div class="col-span-12 flex justify-end gap-8">
        <div class="flex items-center gap-4">
          <span>
            <StarRating
              config={{
                readOnly: true,
                countStars: 1,
                range: {
                  min: 0,
                  max: 5,
                  step: 1,
                },
                score: 5,
              }}
            />
          </span>
          <span>
            {reviewAverageRating === 'NaN' ? 'Loading...' : reviewAverageRating}
          </span>
        </div>
        <div class="border border-spacer" />
        <div class="flex items-center gap-4">
          {reviewCount} reviews
        </div>
      </div>
    {/if}
  </div>
  <slot />
  <Modal bind:open={tipModalOpen}>
    <!-- Show the user an input for the tip amount, along with a confirm button -->
    <div class="flex flex-col gap-8">
      {#if tx}
        <div class="text-xl font-bold p-10">
          You tipped {patp}! Very gracious.
        </div>
        <div
          class="fixed -top-8 left-0 h-screen w-screen flex justify-center overflow-hidden pointer-events-none"
        >
          <Confetti
            x={[-5, 5]}
            y={[0, 0.1]}
            delay={[500, 2000]}
            infinite
            duration="5000"
            amount="200"
            fallDistance="100vh"
          />
        </div>
      {:else}
        <div class="text-2xl font-bold text-left">Tip</div>
        {#if !tip}
          Loading...
        {:else if !tip['receiving-address']}
          <div>
            It looks like {patp} hasn't set up an Ethereum address to receive tips
            yet. Maybe you could prompt them to do so.
          </div>
        {:else}
          <div>You can tip {patp} in ETH to thank them.</div>
          <div class="flex justify-center items-center gap-2">
            <div>Amount (ETH):</div>
            <input
              type="number"
              min="0.001"
              max="100"
              step="0.001"
              placeholder="0.001"
              bind:value={tipAmount}
              class="text-2xl"
            />
          </div>
          <div class="flex justify-end">
            <button on:click={handleConfirmTip}>Confirm</button>
          </div>
        {/if}
      {/if}
    </div>
  </Modal>
</div>
