<script lang="ts">
  import { api } from '@root/api';

  export let url;

  const placeholderImg = 'https://i.imgur.com/UeDNBNQ.jpeg';

  $: metadata = api.link.get.metadata(url);
</script>

{#await metadata then data}
  {#if data}
    <a
      class={`flex flex-col rounded-md border text-left bg-panels dark:bg-darkgrey cursor-pointer`}
      href={url}
      target="_blank"
    >
      <div
        class="w-full h-64 bg-center bg-cover bg-no-repeat"
        style={`background-image:url(${data.image || placeholderImg});`}
      />
      <div class="p-4 flex flex-col gap-4">
        <div>{data.title || ''}</div>
        {#if data.description}
          <span class="hidden md:block whitespace-unset text-grey"
            >{data.description}</span
          >
        {/if}
        <div>
          {#if data.siteName}
            <span>{data.siteName} • </span>
          {/if}
          <span>{data.hostname || ''}</span>
        </div>
      </div>
    </a>
  {:else}
    <div />
  {/if}
{:catch}
  <div />
{/await}
