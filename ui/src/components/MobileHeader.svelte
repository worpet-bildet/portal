<script lang="ts">
  import { link } from 'svelte-spa-router';
  import logo from '@assets/logo.svg';
</script>

<div class="flex items-center justify-between mb-3 pb-3 border-b dark:border-secondary">
  <a use:link href="#/" class="flex items-center gap-2">
    <img src={logo} class="w-12 h-12 p-1 ml-2" alt="logo" />
    <div class="text-2xl tracking-widest font-sans text-secondary dark:text-white">PORTAL</div>
  </a>
</div>
