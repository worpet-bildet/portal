<script>
  import { api, mockData } from '@root/api';
  let scries = Object.entries(api.portal.get);
  let newPokes = Object.entries(api.portal.newDo);
</script>

<div class="flex flex-col gap-8">
  {#each newPokes.concat(scries) as [name, fn]}
    {@const data = mockData[name] || []}
    <div class="flex w-full justify-between">
      <div>{name}</div>
      {#await fn(...data)}
        <div>Calling...</div>
      {:then}
        <div>Done!</div>
      {:catch}
        <div class="text-red-500">Failed!</div>
      {/await}
    </div>
  {/each}
</div>
