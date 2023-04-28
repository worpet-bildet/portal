<script>
  import { createEventDispatcher } from 'svelte';
  import { unsanitiseRecursive } from '@root/util';

  export let action;
  export let poke;

  let {
    [action]: {
      general: { title, description, image, link },
    },
  } = unsanitiseRecursive(poke);

  const dispatch = createEventDispatcher();

  const setGeneralProp = (prop, value) => {
    poke[action]['general'][prop] = value;
  };
</script>

<div>
  <button on:click={() => dispatch('save')} />
  <input
    type="text"
    value={title}
    on:change={(e) => setGeneralProp('title', e.target.value)}
  />
  <textarea
    value={description}
    placeholder="A tool for decentralized curation and discovery on Urbit"
    on:change={(e) => setGeneralProp('description', e.target.value)}
  />
  <input
    type="text"
    value={image}
    placeholder="https://nyc3.digitaloceanspaces.com/image.svg"
    on:change={(e) => setGeneralProp('image', e.target.value)}
  />
  <input
    type="text"
    value={link}
    placeholder="https://some.url/"
    on:change={(e) => setGeneralProp('link', e.target.value)}
  />
</div>
