<script lang="ts">
  import { RadioStation } from '$types/apps/radio';
  import { Sigil } from '@components';
  import { ProfileIcon, SidebarGroup } from '@fragments';
  import { state } from '@root/state';
  import { formatPatp } from '@root/util';
  import { link } from 'svelte-spa-router';

  const sortRadioStations = (stations: RadioStation[]) => {
    return stations
      .sort((a, b) => b.time - a.time)
      .filter((s) => s.viewers > 0)
      .filter((s) => !!s.description);
  };

  const tuneRadio = (patp: string) => {
    window.open(
      `${window.location.origin}/apps/radio?station=${encodeURIComponent(patp)}`
    );
  };
</script>

{#if $state.radioStations}
  <SidebarGroup>
    <div class="flex flex-col gap-1 px-2">
      <div class="flex flex-col gap-1 px-2">
        <div class="flex items-start justify-between">
          <div>📻 %radio streams</div>
          <a
            href={'/apps/radio'}
            target="_blank"
            class="text-flavour text-xs hover:underline">See all</a
          >
        </div>
        <div class="text-flavour text-xs">
          Like Twitch, but without the children
        </div>
      </div>
      <div class="flex flex-col gap-4">
        {#each sortRadioStations($state.radioStations).slice(0, 3) as { description, viewers, location }}
          <div
            class="flex items-center justify-between rounded-md p-2 text-left"
          >
            <div class="flex items-center gap-2">
              <div class="rounded-md overflow-hidden w-8">
                <Sigil patp={location} />
              </div>
              <div class="flex flex-col w-fit">
                <div class="line-clamp-1">{description}</div>
                <div
                  class="flex items-center w-full justify-between gap-2 text-xs"
                >
                  <div>
                    by <a use:link href={`/${location}`} class="hover:underline"
                      >{formatPatp(location)}</a
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex items-center gap-2">
                <div class="w-4 dark:fill-white"><ProfileIcon /></div>
                <div>{viewers}</div>
              </div>
              <button
                class="text-white text-xs bg-black rounded-md px-2 py-1"
                on:click={() => tuneRadio(location)}>Watch</button
              >
            </div>
          </div>
        {/each}
      </div>
    </div></SidebarGroup
  >
{/if}
