<script>
  import { Sigil } from '@components';
  import { isValidPatp } from '@root/util';

  export let ship;

  let lastValidShip = ship;
  $: {
    if (isValidPatp(ship)) {
      lastValidShip = ship;
    }
  }
</script>

<div class="flex flex-col gap-4">
  <div class="grid grid-cols-9">
    <div class="col-span-7 col-start-2 md:col-span-3 md:col-start-4">
      <Sigil patp={lastValidShip} />
    </div>
    <input
      type="text"
      class="p-2 col-span-7 col-start-2 md:col-span-3 md:col-start-4 bg-panels dark:bg-darkgrey dark:border focus:outline-none placeholder-grey"
      class:border-rose-500={lastValidShip !== ship}
      bind:value={ship}
      placeholder="~worpet-bildet"
    />
  </div>
</div>
