<template>
  <div class="home">
    <BlogPost :post="welcomeScreen" />
    <BlogPost :post="post" v-for="(post, ind) in sampleBlogPost" :key="ind" />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCards
            :post="post"
            v-for="(post, ind) in sampleBlogCards"
            :key="ind"
          />
        </div>
      </div>
    </div>
    <div class="updates">
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
import BlogCards from '@/components/BlogCard'
import Arrow from '@/assets/Icons/arrow-right-light.svg'
export default {
  name: 'HomePage',
  components: {
    BlogPost,
    BlogCards,
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
            'Lviv is a city of about 750,000 in Ukraine, a nation of some 40 million. Located among hills and plains in the country’s west, Lviv has an innovative tech spirit, exuberant street-singing, jazz-filled cafés, buzzing coffeehouses, elaborate restaurants, and frequent festivals celebrating a cuisine and culture nourished by the region of Ukrainian Galicia and the Carpathian mountains.  popular tourist destination for foreigners and Ukrainians alike, Lviv has a unique ethos as the world’s only majority Greek Catholic city, the nexus of East and West. On holidays the cobbled streets of the pedestrian-focused centre are filled with people wearing the traditional embroidered garb of the Ukrainian people: the vyshyvanka. Named for Leo («Lion»), the son of the great 13th century king Danylo of Galicia, Lviv is sometimes called the city of lions, coffee, and rain – reflecting great things commonly encountered here, the lions in the form of a staggering number of statues and carvings; the rain sometimes in the form of snow; and the coffee, brought by invading Turkish armies, in many formats. Located amid large hills including the High Castle and emanating from its stately central tower, the city of Lviv is a 90 minute flight to both Kyiv and Vienna, with many train connections around Ukraine and beyond. The climate is temperate, and access is easy by train, car, or bus to the Carpathian mountains and local forests and lakes. A crossroads city that has weathered many invasions, Lviv has been known as Lemberg (German, from Austro-Hungarian days), Lwow (Polish), and Leopolis (Latin). A place of dissidence, art, and learning during the years of Soviet oppression. Together, these elements make Lviv a place of conversation and ideas whether in the Ukrainian language or in English.',
          blogCoverPhoto: '03',
        },
      ],
      sampleBlogCards: [
        {
          blogTitle: 'Blog Card #1',
          blogCoverPhoto: '001',
          blogDate: 'March 15, 2023',
        },
        {
          blogTitle: 'Blog Card #2',
          blogCoverPhoto: '002',
          blogDate: 'August 15, 2023',
        },
        {
          blogTitle: 'Blog Card #3',
          blogCoverPhoto: '003',
          blogDate: 'September 15, 2023',
        },
        {
          blogTitle: 'Blog Card #4',
          blogCoverPhoto: '004',
          blogDate: 'July 15, 2023',
        },
      ],
    }
  },
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
