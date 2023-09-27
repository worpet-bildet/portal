<script lang="ts">
  import { link } from 'svelte-spa-router';

  import { me } from '@root/api';

  import { Sigil } from '@components';

  import logo from '@assets/logo.svg';
</script>

<div class="flex items-center justify-between">
  <a use:link href="#/" class="flex items-center gap-2">
    <img src={logo} class="w-12 h-12" alt="logo" />
    <div class="font-bold text-xl">Portal</div>
  </a>
  <a use:link href="#/{me}" class="w-12 h-12 overflow-hidden rounded-md">
    <Sigil patp={me} />
  </a>
</div>
