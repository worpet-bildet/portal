<script>
  import { api, mockData } from '@root/api';
  console.log(api.portal.get);
  console.log(api.portal.newDo);
  let scries = Object.entries(api.portal.get);
  let pokes = Object.entries(api.portal.newDo);
  let calls = [...pokes, ...scries];
  // let calls = [...scries];
</script>

<div class="flex flex-col gap-8">
  {#each calls as [name, fn]}
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
