<template>
  <md-dialog
    :md-active.sync="isVisible"
    :md-click-outside-to-close="false"
    :md-close-on-esc="false"
  >
    <md-dialog-title>{{ title }}</md-dialog-title>
    <md-content class="dialog_content">
      <slot name="actions">
        <md-button class="md-primary" @click="isVisible = false">
          Ok
        </md-button>
        <md-button class="md-primary" @click="isVisible = false">
          Close
        </md-button>
      </slot>
    </md-content>
  </md-dialog>
</template>

<script>
import TabHandler from '@/mixins/tabHandler';

export default {
  name: 'ConfirmPopup',
  data() {
    return {
      isVisible: true
    };
  },
  props: {
    title: {
      type: String,
      require: true
    }
  },
  mixins: [TabHandler]
};
</script>

<style scoped lang="scss">
.dialog_content {
  padding: 16px;
  text-align: center;
}

.md-title {
  text-align: center;
}
</style>
