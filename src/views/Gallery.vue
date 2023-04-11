<template>
  <div class="gallery">

    <div class="gallery-wrap">
      <img :src="require('@/assets/blogCards/002.jpg')" />
      <img :src="require('@/assets/blogCards/004.jpg')" />
      <img :src="require('@/assets/blogCards/003.jpg')" />
      <img :src="require('@/assets/blogCards/005.jpg')" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'PhotoGallery',
  components: {

  },
  props: ['post'],
}
</script>

<style lang="scss" scoped>
.gallery {
  max-width: 1400px;
  position: relative;
}

.gallery-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
 
  img {
    max-width: 50%;
    max-height: 400px;
  }
}

  .gallery-wrap>img:nth-child(odd) {
   margin: 20px;
 }

   .gallery-wrap>img:nth-child(even) {
   margin: 20px;
 }
.edit,
.delete {
  pointer-events: none;
  height: 15px;
  width: auto;
  path {
    fill: #fff;
  }
}
</style>
