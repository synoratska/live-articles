import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '../firebase/firebaseInit'

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
    noteHTML: 'Write your blog title here...',
    noteTitle: '',
    notePhotoName: '',
    notePhotoFileURL: null,
    notePhotoPreview: null,
    editPost: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },
  mutations: {
    newNotePost(state, payload) {
      state.noteHTML = payload
    },

    updateNoteTitle(state, payload){
      state.noteTitle = payload
    },

    fileChangeName(state, payload){
      state.notePhotoName = payload
    },

    createFileURL(state, payload) {
      state.notePhotoFileURL = payload
    },

    openPhotoPreview(state){
      state.notePhotoPreview = !state.notePhotoPreview
    },

    toggleEditPost(state, payload) {
      state.editPost = payload
    },

    updateUser(state, payload) {
      state.user = payload
    },

    setProfileAdmin(state,payload){
      state.profileAdmin = payload
      console.log(state.profileAdmin)
    },

    setProfileInfo(state, doc) {
      state.profileId = doc.id
      state.profileEmail = doc.data().email
      state.profileFirstName = doc.data().firstName
      state.profileLastName = doc.data().lastName
      state.profileUsername = doc.data().username
    },

    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join('') +
        state.profileLastName.match(/(\b\S)?/g).join('')
    },

    changeFirstName(state, payload) {
      state.profileFirstName = payload
    },

    changeLastName(state, payload) {
      state.profileLastName = payload
    },

    changeUsername(state, payload) {
      state.profileUsername = payload
    },

  },
  actions: {
    async getCurrentUser({ commit }, user) {
      const dataBase = await db
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
      const dbResults = await dataBase.get()
      commit('setProfileInfo', dbResults)
      commit('setProfileInitials')
      const token = await user.getIdTokenResult()
      const admin = await token.claims.admin
      commit('setProfileAdmin', admin)
    },
    async updateUserSettings({ commit, state }) {
      const dataBase = await db.collection('users').doc(state.profileId)
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername,
      })
      commit('setProfileInitials')
    },
  },
  modules: {},
})
