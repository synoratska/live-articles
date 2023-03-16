<template>
  <div class="home">
    <BlogPost :post="welcomeScreen" />
    <BlogPost :post="post" v-for="(post, ind) in sampleBlogPost" :key="ind" />
  </div>
</template>

<script>
import BlogPost from '@/components/BlogPost'
export default {
  name: 'HomePage',
  components: {
    BlogPost,
  },
  data() {
    return {
      welcomeScreen: {
        title: 'Russo-Ukrainian War',
        blogPost:
          "On 24 February 2022, Russia invaded and occupied parts of Ukraine in a major escalation of the Russo-Ukrainian War, which began in 2014. The invasion has resulted in tens of thousands of deaths on both sides and instigated Europe's largest refugee crisis since World War II. About 8 million Ukrainians were displaced within their country by June, and more than 8 million had fled the country by February 2023.",
        welcomeScreen: true,
        photo: '01',
      },
      sampleBlogPost: [
        {
          title: 'This is a title',
          blogHTML:
            "lorem20 lorem lorem lorem On 24 February 2022, Russia invaded and occupied parts of Ukraine in a major escalation of the Russo-Ukrainian War, which began in 2014. The invasion has resulted in tens of thousands of deaths on both sides and instigated Europe's largest refugee crisis since World War II. About 8 million Ukrainians were displaced within their country by June, and more than 8 million had fled the country by February 2023.",
          blogCoverPhoto: '02',
        },
        {
          title: 'This is a title 222222',
          blogHTML:
            "lorem20 lorem lorem lorem On 24 February 2022, Russia invaded and occupied parts of Ukraine in a major escalation of the Russo-Ukrainian War, which began in 2014. The invasion has resulted in tens of thousands of deaths on both sides and instigated Europe's largest refugee crisis since World War II. About 8 million Ukrainians were displaced within their country by June, and more than 8 million had fled the country by February 2023.",
          blogCoverPhoto: '03',
        },
      ],
    }
  },
}
</script>

<style></style>
