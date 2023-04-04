<template>
  <div class="note-card-wrap">
    <div class="note-cards container">
      <div class="toggle-edit">
        <span>Toggle Editing Post</span>
        <input type="checkbox" v-model="editPost" />
      </div>
      <NoteCard
        :post="post"
        v-for="(post, ind) in notePosts"
        :key="ind"
      />
    </div>
  </div>
</template>

<script>
import NoteCard from '@/components/NoteCard'
export default {
  name: 'PlacesPage',
  components: {
    NoteCard,
  },
  computed: {
    notePosts() {
      return this.$store.state.notePosts
    },
    editPost: {
     get() {
      return this.$store.state.editPost
     },
     set(payload) {
      this.$store.commit('toggleEditPost', payload)
     }
    }
  },
  beforeDestroy(){
   this.$store.commit('toggleEditPost', false)
  }
}
</script>

<style lang="scss" scoped>
.note-cards {
  position: relative;

  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: -70px;
    right: 0;

    span {
     margin-right: 16px;
    }

    input[type='checkbox'] {
  position: relative;
  border: none;
  -webkit-appearance: none;
  background-color: #fff;
  outline: none;
  width: 70px;
  height: 30px;
  border-radius: 8px 0;
  box-shadow: 0 4px 6px -1px #0000001a, 0 2px 4px -1px #0000000f;
}

input[type='checkbox']:before {
  content: '';
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 10px 0;
  top: 0;
  left: 0;
  background: #303030;
  transform: scale(0.9.1);
  transition: 750ms ease all;
  box-shadow: 0 4px 6px -1px #0000001a, 0 2px 4px -1px #0000000f;
}

input:checked[type='checkbox']:before {
  background: #30303035;;
  left: 42px;
}
  }
}


</style>
