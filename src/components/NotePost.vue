<template>
  <div class="note-wrapper">
    <div class="note-content">
      <div>
        <h2 v-if="post.welcomeScreen">{{ post.title }}</h2>
        <h2 v-else>{{ post.noteTitle }}</h2>
        <p v-if="post.welcomeScreen">{{ post.notePost }}</p>
        <p class="content-preview" v-else v-html="post.noteHTML"></p>
        <router-link class="link link-light" v-if="post.welcomeScreen" to="#">
          Login / Register <Arrow class="arrow arrow-light" />
        </router-link>
        <router-link class="link" v-else to="#">
          View the Post <Arrow class="arrow" />
        </router-link>
      </div>
    </div>
    <div class="note-photo">
      <img v-if="post.welcomeScreen"  :src="require(`../assets/blogPhotos/${post.noteCoverPhoto}.jpg`)" />
      <img
        v-else :src="post.noteCoverPhoto"
      />
    </div>
  </div>
</template>

<script>
import Arrow from '../assets/Icons/arrow-right-light.svg'
export default {
  name: 'NotePost',
  components: {
    Arrow,
  },
  props: ['post'],
}
</script>

<style lang="scss" scoped>
.note-wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px #0000001a, 0 2px 4px -1px #0000000f;
  @media (min-width: 700px) {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }

  .note-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    flex: 4;
    order: 2;
    @media (min-width: 700px) {
      order: 1;
    }
    @media (min-width: 800px) {
      flex: 3;
    }
    div {
      max-width: 600px;
      padding: 72px 24px;
      @media (min-width: 700px) {
        padding: 0 48px;
      }

      h2 {
        font-size: 32px;
        font-weight: 300;
        text-transform: uppercase;
        margin-bottom: 24px;
        @media (min-width: 700px) {
          font-size: 40px;
        }
      }

      p {
        font-size: 15px;
        font-weight: 300;
        line-height: 1.7;
      }

      .content-preview {
        font-size: 17px;
        max-height: 24px;
        max-width: 250px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .link {
        display: inline-flex;
        align-items: center;
        margin-top: 32px;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;
        transition: 0.5s ease-in all;

        &:hover {
          border-bottom-color: #303030;
        }
      }

      .link-light {
        &:hover {
          border-bottom-color: #fff;
        }
      }
    }
  }
  .note-photo {
    order: 1;
    flex: 3;
    box-shadow: 0 4px 6px -1px #0000001a, 0 2px 4px -1px #0000000f;

    @media (min-width: 700px) {
      order: 2;
    }

    @media (min-width: 800px) {
      flex: 4;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &:nth-child(even) {
    .note-content {
      order: 2;
    }

    .note-photo {
      order: 1;
    }
  }
}

.no-user:first-child {
  .note-content {
    background-color: #303030;
    color: #fff;
  }
}
</style>
