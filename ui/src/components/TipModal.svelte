<script lang="ts">
  import { onMount } from 'svelte';
  import { Confetti } from 'svelte-confetti';

  import { LoadingIcon, Modal } from '@fragments';
  import { api } from '@root/api';
  import config from '@root/config';
  import { resetTip, state } from '@root/state';
  import { ethToWei, sendTransaction } from '@root/util';

  let tipAmount = 0.001;
  let tx, patp, sending;
  export const handleTipRequest = (key) => {
    // pop a modal to allow the user to select how much they would like to tip
    patp = key.ship;
    api.portal.do.tipRequest(key);
    tipModalOpen = true;
  };
  const handleConfirmTip = async () => {
    sending = true;
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

  onMount(() => () => {
    resetTip();
    tx = null;
  });

  $: if (!tipModalOpen) {
    resetTip();
    tx = null;
  }

  export let tipModalOpen = false;
</script>

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
    {:else if sending}
      <div class="w-full flex justify-center">
        <div class="w-32 h-32">
          <LoadingIcon />
        </div>
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
