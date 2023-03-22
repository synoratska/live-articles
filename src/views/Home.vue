<template>
  <div class="home">
    <BlogPost v-if="!user" :post="welcomeScreen" />
    <BlogPost :post="post" v-for="(post, ind) in sampleBlogPost" :key="ind" />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard
            :post="post"
            v-for="(post, ind) in sampleBlogCards"
            :key="ind"
          />
        </div>
      </div>
    </div>
    <div v-if="!user" class="updates">
      <div class="container">
        <h2>Never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" to="#">
          Register for Ukrainian Portal <Arrow class="arrow arrow-light" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from '@/components/BlogPost'
import BlogCard from '@/components/BlogCard'
import Arrow from '@/assets/Icons/arrow-right-light.svg'
export default {
  name: 'HomePage',
  components: {
    BlogPost,
    BlogCard,
    Arrow,
  },
  data() {
    return {
      welcomeScreen: {
        title: 'Welcome to Ukraine!',
        blogPost:
          "Ukrainian Portal is created for you to share your experience of traveling across Ukraine. Post your stories and upload your own photos about beautiful places you've seen here and inspire others to visit our picturesque country.",
        welcomeScreen: true,
        photo: '01',
      },
      sampleBlogPost: [
        {
          title: 'Ukraine is opened to the World!',
          blogHTML:
            "The largest country entirely within Europe has a coastline at the Black Sea and the Sea of Azov in the southeast. Ukraine borders Russia in the northeast and east, Belarus in the northwest, Poland, and Slovakia in the west, Hungary, Romania, and Moldova to the southwest. <br /> The country covers a territory with an area of 600,000 km²; it is about twice the size of Italy or slightly smaller than the US state of Texas. Ukraine's landscape consists mainly of plains and plateaus, only the Carpathian mountains in the west reach 2,061 m (6,760 ft.) at Mount Hoverla (Hora Hoverla), the highest peak in the country.The country has a population of 41.3 million people (in 2021), the capital and largest city is Kyiv (Kiev). Spoken languages are Ukrainian; Russian was widely spoken, especially in the eastern and southern parts of the country until russian invasion on 24 February, 2022.",
          blogCoverPhoto: '02',
        },
        {
          title: 'Lviv',
          blogHTML:
            'Known as “Paris of Ukraine”, Lviv is a unique confluence of artistic traditions of Ukraine and architecture of central Europe. The old town is a UNESCO World Heritage. You will find cobbled streets, magnificent churches, fascinating museums and charming little cafes. You can also visit Gasova Lampa, a restaurant which boasts of the first gas lamp created in the world.',
          blogCoverPhoto: '03',
        },
      ],
     
    }
  },
  computed: {
    sampleBlogCards() {
      return this.$store.state.sampleBlogCards
    },
    user() {
      return this.$store.state.user
    },
  }
}
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
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
      font-weight: 300;
      font-size: 32px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
  
      @media (min-width: 800px) {
        max-width: 550px;
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
