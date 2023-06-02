<script>
  /**
   * The url for which the preview is to be rendered.
   */
  export let url;

  /**
   * The width of the preview card.
   */
  export let width = null;

  /**
   * The height of the preview card.
   */
  export let height = null;

  /**
   * The class you want to apply to the preview card container.
   */
  export let className = '';

  /**
   * The image's height.
   */
  export let imageHeight = null;

  /**
   * The alignment of the text inside the card.
   */
  export let textAlign = null;

  /**
   * A custom fetcher function that fetches and provides the metadata for urls from a source of your choice.
   */
  export let fetcher;

  async function getMetadata(url) {
    const data = await fetch(`${proxyUrl}?url=${url}`)
      .then((res) => res.json())
      .then((r) => r.metadata);
    return data;
  }

  function clickHandler() {
    window.open(url, '_blank');
  }

  const proxyUrl = 'https://rlp-proxy.herokuapp.com/v2';
  const placeholderImg = 'https://i.imgur.com/UeDNBNQ.jpeg';

  $: metadata = fetcher ? fetcher(url) : getMetadata(url);
</script>

<div
  class={`Container ${className}`}
  on:click={clickHandler}
  style={`width:${width};height:${height};textAlign:${textAlign}`}
>
  {#await metadata then data}
    <div
      class="Image"
      style={`background-image:url(${
        data.image || placeholderImg
      });height:${imageHeight}`}
    />
    <!-- <img class="image" src={data.image} alt="Barca Universal" /> -->
    <div class="LowerContainer">
      <h3 class="Title">{data.title || ''}</h3>
      {#if data.description}
        <span class="Description Secondary">{data.description}</span>
      {/if}
      <div class="Secondary SiteDetails">
        {#if data.siteName}
          <span>{data.siteName} • </span>
        {/if}
        <span>{data.hostname || ''}</span>
      </div>
    </div>
  {/await}
</div>

<style>
  :root {
    --primary: black;
    --secondary: rgb(100, 100, 100);
  }

  /* common */
  .Container {
    text-align: left;
    background-color: white;
    display: flex;
    flex-direction: column;
    border-radius: 7px;
    border: 1px solid #ccc;
    color: var(--primary);
    transition: 0.3s all ease;
    height: fit-content;
  }

  .Container:hover {
    background-color: rgb(250, 250, 250) !important;
    cursor: pointer;
  }

  .Secondary {
    color: var(--secondary);
  }

  .LowerContainer {
    padding: 10px;
  }

  .Title {
    margin-top: 0;
    margin-bottom: 10px;
  }

  .Image {
    width: 100%;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 30vh;
  }

  .SiteDetails {
    margin-top: 10px;
  }

  /* sm */
  @media (max-width: 640px) {
    .Description {
      display: none;
    }
  }

  /* md */
  @media (min-width: 641px) and (max-width: 768px) {
    .Description {
      display: none;
    }
  }
</style>
