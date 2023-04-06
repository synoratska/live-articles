<template>
  <div class="home">
    <NotePost v-if="!user" :post="welcomeScreen" />
    <NotePost :post="post" v-for="(post, ind) in notePostsFeed" :key="ind" />

    <div v-if="!user" class="updates">
      <div class="container">
        <h2>Never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" :to="{ name: 'Signup' }">
          Register for Ukrainian Portal <Arrow class="arrow arrow-light" />
        </router-link>
      </div>
    </div>
    <div class="note-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="note-cards">
          <NoteCard
            :post="post"
            v-for="(post, ind) in notePostsCards"
            :key="ind"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NotePost from '@/components/NotePost'
import NoteCard from '@/components/NoteCard'
import Arrow from '@/assets/Icons/arrow-right-light.svg'
export default {
  name: 'HomePage',
  components: {
    NotePost,
    NoteCard,
    Arrow,
  },
  data() {
    return {
      welcomeScreen: {
        title: 'Welcome to Ukraine!',
        notePost:
          "Ukrainian Portal is created for you to share your experience of traveling across Ukraine. Post your stories and upload your own photos about beautiful places you've seen here and inspire others to visit our picturesque country.",
        welcomeScreen: true,
        photo: '01',
      },
    }
  },
  computed: {
    notePostsFeed() {
      return this.$store.getters.notePostsFeed
    },
    notePostsCards() {
      return this.$store.getters.notePostsCards
    },
    user() {
      return this.$store.state.user
    },
  },
}
</script>

<style lang="scss" scoped>
.note-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
    color: #f0f0d5ea;
  }
}

.updates {
  background: url('@/assets/blogCards/008.jpg');
  background-size: cover;
  background-position: center bottom;
  margin: 30px;

  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 400;
      font-size: 32px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      color: #fff;

      @media (min-width: 800px) {
        max-width: 550px;
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
