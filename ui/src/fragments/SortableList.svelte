<script lang="ts">
  import { flip } from 'svelte/animate';

  export let list: any[];
  export let key: string;

  let hovering: false | number = false;

  const drop = (event, target) => {
    event.dataTransfer.dropEffect = 'move';
    const start = parseInt(event.dataTransfer.getData('text/plain'));
    const newList = list;

    if (start < target) {
      newList.splice(target + 1, 0, newList[start]);
      newList.splice(start, 1);
    } else {
      newList.splice(target, 0, newList[start]);
      newList.splice(start + 1, 1);
    }
    list = newList;
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
    on:dragover={(e) => e.preventDefault()}
    on:dragenter={() => (hovering = index)}
    class="hover:bg-panels-hover"
    class:bg-grey={hovering === index}
    class:text-white={hovering === index}
  >
    <slot {item} />
  </div>
{/each}
