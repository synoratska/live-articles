import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
    editPost: null,
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload
    },
  },
  actions: {},
  modules: {},
})
