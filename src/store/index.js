import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '../firebase/firebaseInit'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notePosts: [],
    noteLoaded: null,
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
  getters: {
    notePostsFeed(state) {
      return state.notePosts.slice(0, 2)
    },
    notePostsCards(state) {
      return state.notePosts.slice(3, 7)
    },
  },
  mutations: {
    newNotePost(state, payload) {
      state.noteHTML = payload
    },

    updateNoteTitle(state, payload) {
      state.noteTitle = payload
    },

    fileChangeName(state, payload) {
      state.notePhotoName = payload
    },

    createFileURL(state, payload) {
      state.notePhotoFileURL = payload
    },

    openPhotoPreview(state) {
      state.notePhotoPreview = !state.notePhotoPreview
    },

    toggleEditPost(state, payload) {
      state.editPost = payload
    },

    updateUser(state, payload) {
      state.user = payload
    },

    setProfileAdmin(state, payload) {
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

    filterNotePost(state, payload) {
      state.notePosts = state.notePosts.filter(
        (post) => post.noteID !== payload
      )
    },
    setNoteState(state, payload) {
      state.noteTitle = payload.noteTitle
      state.noteHTML = payload.noteHTML
      state.notePhotoFileURL = payload.noteCoverPhoto
      state.notePhotoName = payload.noteCoverPhotoName
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
    async getNote({ state }) {
      const dataBase = await db.collection('notePosts').orderBy('date', 'desc')
      const dbResults = await dataBase.get()
      dbResults.forEach((doc) => {
        if (!state.notePosts.some((post) => post.noteID === doc.id)) {
          const data = {
            noteID: doc.data().noteID,
            noteHTML: doc.data().noteHTML,
            noteCoverPhoto: doc.data().noteCoverPhoto,
            noteTitle: doc.data().noteTitle,
            noteDate: doc.data().date,
            noteCoverPhotoName: doc.data().noteCoverPhotoName,
          }
          state.notePosts.push(data)
        }
      })
      state.noteLoaded = true
    },

    async updateNote({ commit, dispatch }, payload) {
      commit('filterNotePost', payload)
      await dispatch('getNote')
    },
    async deletePost({ commit }, payload) {
      const getNote = await db.collection('notePosts').doc(payload)
      await getNote.delete()
      commit('filterNotePost', payload)
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
