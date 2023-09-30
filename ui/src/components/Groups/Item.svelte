<script lang="ts">
  import ChatMessage from './ChatMessage.svelte';
  import DiaryNote from './DiaryNote.svelte';
  import HeapCurio from './HeapCurio.svelte';

  export let item;
  export let headless: boolean = false;
  export let isExpanded: boolean = false;
</script>

{#if item}
  {@const struc = item?.keyObj?.struc}
  {#if struc === 'groups-chat-msg'}
    {@const {
      bespoke: { content, id, group },
    } = item}
    {@const author = id.split('/')[0]}
    <ChatMessage {author} {group} {content} {headless} {isExpanded} on:expand />
  {:else if struc === 'groups-heap-curio'}
    {@const {
      bespoke: { heart, group },
    } = item}
    <HeapCurio {heart} {group} {headless} {isExpanded} on:expand />
  {:else if struc === 'groups-diary-note'}
    {@const {
      bespoke: { essay, group },
    } = item}
    <DiaryNote {essay} {group} {headless} {isExpanded} on:expand />
  {/if}
{/if}
