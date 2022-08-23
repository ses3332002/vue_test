<template>
  <div>
    {{ text }}
    <a-button type="link" size="small" @click="itemDeleteHandler">
      <a-icon type="close-circle" />
    </a-button>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },

  methods: {
    itemDeleteHandler() {
      this.$emit('delete-item');
    }
  }
};
</script>
