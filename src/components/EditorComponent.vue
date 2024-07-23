<template>
  <editor ref="toastuiEditor" />
</template>
<script>
import '@toast-ui/editor/dist/toastui-editor.css';


export default {
  components: {
    editor: Editor
  },
  methods: {
    scroll() {
      this.$refs.toastuiEditor.invoke('setScrollTop', 10);
    },
    moveTop() {
      this.$refs.toastuiEditor.invoke('moveCursorToStart');
    },
    getHTML() {
      let html = this.$refs.toastuiEditor.invoke('getHTML');
    }
  }
};
</script>

<style scoped>

</style>
