<script>
  export let url;

  async function getMetadata(url) {
    const data = await fetch(`${proxyUrl}?url=${url}`)
      .then((res) => res.json())
      .then((r) => r.metadata);
    return data;
  }

  function clickHandler() {
    window.open(url, '_blank');
  }

  const proxyUrl = 'https://preview.foddur-hodler.one/v2';
  const placeholderImg = 'https://i.imgur.com/UeDNBNQ.jpeg';

  $: metadata = getMetadata(url);
</script>

<div
  class={`flex flex-col rounded-md border text-left bg-panels cursor-pointer`}
  on:click={clickHandler}
>
  {#await metadata then data}
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
  {/await}
</div>
