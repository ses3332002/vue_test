export default {
  mounted() {
    document.addEventListener('keydown', this.tabHandler);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.tabHandler);
  },
  methods: {
    tabHandler(e) {
      const dialog = document.querySelector('.md-dialog');
      const activeElements = dialog.querySelectorAll('button, input');
      const firstElement = activeElements[0];
      const lastElement = activeElements[activeElements.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    }
  }
};
