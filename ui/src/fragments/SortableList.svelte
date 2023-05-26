<script>
  import { flip } from 'svelte/animate';

  export let list;
  export let key;

  let hovering = false;

  const drop = (event, target) => {
    event.dataTransfer.dropEffect = 'move';
    const start = parseInt(event.dataTransfer.getData('text/plain'));
    const newTracklist = list;

    if (start < target) {
      newTracklist.splice(target + 1, 0, newTracklist[start]);
      newTracklist.splice(start, 1);
    } else {
      newTracklist.splice(target, 0, newTracklist[start]);
      newTracklist.splice(start + 1, 1);
    }
    list = newTracklist;
    hovering = null;
  };

  const dragstart = (event, i) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
    const start = i;
    event.dataTransfer.setData('text/plain', start);
  };
</script>

{#each list as item, index (item[key])}
  <div
    animate:flip={{ duration: 400 }}
    draggable={true}
    on:dragstart={(event) => dragstart(event, index)}
    on:drop|preventDefault={(event) => drop(event, index)}
    ondragover="return false"
    on:dragenter={() => (hovering = index)}
    class:bg-white={hovering === index}
    class:text-black={hovering === index}
  >
    <slot {item} />
  </div>
{/each}
