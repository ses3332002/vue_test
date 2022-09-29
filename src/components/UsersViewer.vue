<template>
  <div class="viewer">
    <control-panel />
    <md-divider />
    <cards-grid />
  </div>
</template>

<script>
import ControlPanel from './ControlPanel.vue';
import CardsGrid from './CardsGrid.vue';

export default {
  name: 'UsersViewer',
  components: {
    ControlPanel,
    CardsGrid
  }
};
</script>

<style lang="scss" scoped>
.viewer {
  display: grid;
  grid-template-rows: auto 1px 1fr;
}
</style>
