<template>
  <div class="note-view">
    <div class="container quillWrapper">
      <h2>{{ this.noteTitle }}</h2>
      <img :src="noteCoverPhoto" />
      <div class="note-content ql-editor" v-html="noteHTML"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotePreview',
  computed: {
    noteTitle() {
      return this.$store.state.noteTitle
    },
    noteHTML() {
      return this.$store.state.noteHTML
    },

    noteCoverPhoto() {
      return this.$store.state.notePhotoFileURL
    },
  },
}
</script>

<style lang="scss">
.note-view {
  min-height: 100%;

  .container {
    max-width: 1000px;
    padding: 60px 25px;
  }

  .ql-editor {
    padding: 0;
  }

  h2 {
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
  }
  img {
    width: 100%;
    margin-bottom: 32px;
  }
}
</style>
