<template>
  <div class="note-view" v-if="currentNote">
    <div class="container quillWrapper">
      <h2>{{ this.currentNote[0].noteTitle }}</h2>
      <h4>
        Posted on:
        {{
          new Date(this.currentNote[0].noteDate).toLocaleString('en-us', {
            dateStyle: 'long'
          })
        }}
      </h4>
      <img :src="this.currentNote[0].noteCoverPhoto" />
      <div
        class="note-content ql-editor"
        v-html="this.currentNote[0].noteHTML"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewNote',
  data() {
    return {
      currentNote: null,
    }
  },
  async mounted() {
    this.currentNote = await this.$store.state.notePosts.filter((post) => {
      return post.noteID === this.$route.params.noteid
    })
  },
}
</script>

<style lang="scss">
.note-view {
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
}
</style>
