<script>
  import { me } from '@root/api';
  import { state, getCurator } from '@root/state';
  import { Sigil } from '@components';

  let color;
  state.subscribe(() => {
    ({ color } = getCurator(me).bespoke || {});
  });
</script>

<Sigil patp={me} {color} />
