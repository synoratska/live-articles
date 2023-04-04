<template>
  <div class="note-card">
    <div v-show="editPost" class="icons">
      <div class="icon">
        <Edit class="edit" />
      </div>

      <div class="icon">
        <Delete class="delete" />
      </div>
    </div>
    <img :src="post.noteCoverPhoto" />
    <div class="info">
      <h4>{{ post.noteTitle }}</h4>
      <h6>
        Posted on:
        {{
          new Date(post.noteDate).toLocaleString('en-us', { dateStyle: 'long' })
        }}
      </h6>
      <router-link class="link" to="#">
        View The Post <Arrow class="arrow" />
      </router-link>
    </div>
  </div>
</template>

<script>
import Arrow from '@/assets/Icons/arrow-right-light.svg'
import Edit from '@/assets/Icons/edit-regular.svg'
import Delete from '@/assets/Icons/trash-regular.svg'
export default {
  name: 'NoteCard',
  components: {
    Arrow,
    Edit,
    Delete,
  },
  props: ['post'],
  computed: {
    editPost() {
      return this.$store.state.editPost
    },
  },
}
</script>

<style lang="scss" scoped>
.note-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 10px 0;
  background-color: #fff;
  min-height: 420px;
  transition: 0.5s ease all;

  &:hover {
    transform: rotateZ(-1deg) scale(1.01);
    box-shadow: 0 4px 6px -1px #0000001a, 0 2px 4px -1px #0000000f;
  }

  .icons {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 99;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #fff;
      transition: 0.5s ease all;

      &:hover {
        background-color: #303030;

        .edit,
        .delete {
          path {
            fill: #fff;
          }
        }
      }

      &:nth-child {
        margin-right: 8px;
      }

      .edit,
      .delete {
        pointer-events: none;
        height: 15px;
        width: auto;
      }
    }
  }

  img {
    display: block;
    border-radius: 10px 0;
    width: 100%;
    max-height: 190px;
    object-fit: cover;
  }

  .info {
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 32px 16px;
    color: #000;

    h4 {
      padding-bottom: 8px;
      font-size: 20px;
      font-weight: 300;
    }

    h6 {
      font-weight: 400;
      font-size: 12px;
      padding-bottom: 16px;
    }

    .link {
      display: inline-flex;
      align-items: center;
      font-weight: 500;
      padding-top: 20px;
      font-size: 12px;
      padding-bottom: 4px;
      transition: 0.5s ease-in all;

      &:hover {
        color: #303030cc;
      }

      .arrow {
        width: 10px;
      }
    }
  }
}
</style>
