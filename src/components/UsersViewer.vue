<template>
  <div>
    <control-panel />
    <md-divider />
    <cards-grid />
  </div>
</template>

<script>
import ControlPanel from './ControlPanel.vue';
import CardsGrid from './CardsGrid.vue';
export default {
  components: {
    ControlPanel,
    CardsGrid
  }
};
</script>

<style></style>
