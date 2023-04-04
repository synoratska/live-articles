<template>
  <div class="modal" ref-modal>
    <div class="modal-content">
      <close @click="closePreview" class="icon" />
      <img :src="this.noteCoverPhoto" />
    </div>
  </div>
</template>

<script>
import close from '@/assets/Icons/times-circle-light.svg'
export default {
  name: 'NoteCoverPreview',
  components: {
    close,
  },
  methods: {
    closePreview() {
      this.$store.commit('openPhotoPreview')
    },
  },
  computed: {
    noteCoverPhoto() {
      return this.$store.state.notePhotoFileURL
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
  top: 0;
  background-color: #00000080;
  z-index: 90;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  .modal-content {
    display: flex;
    justify-content: center;
    position: relative;
    border-radius: 12px;
    background-color: #fff;
    height: 400px;
    width: 600px;
    padding: 50px;
    box-shadow: 0 4px 6px -1px #0000001a, 0 2px 4px -1px #0000000f;

    .icon {
      width: 24px;
      height: auto;
      cursor: pointer;
      font-size: 24px;
      position: absolute;
      top: 15px;
      right: 15px;
      color: #303030;
    }

    img {
      margin-top: 16px;
      display: block;
      width: auto;
      height: 100%;
      box-shadow: 0 4px 6px -1px #0000001a, 0 2px 4px -1px #0000000f;
    }
  }
}
</style>
