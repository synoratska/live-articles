<template>
  <div class="create-note">
    <NoteCoverPreview v-show="this.$store.state.notePhotoPreview" />
    <Loading v-if="loading" />
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error: </span> {{ this.errorMsg }}</p>
      </div>
      <div class="note-info">
        <input
          type="text"
          placeholder="Enter A Note title"
          v-model="noteTitle"
        />
        <div class="upload-file">
          <label class="label" for="note-photo">Upload Cover Photo</label>
          <input
            type="file"
            ref="notePhoto"
            id="note-photo"
            @change="fileChange"
            accept=".png, .jpg, .jpeg"
          />
          <button
            class="preview label"
            @click="openPreview"
            :class="{ 'button-inactive': !this.$store.state.notePhotoFileURL }"
          >
            Preview Photo
          </button>
          <span>File Chosen: {{ this.$store.state.notePhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor
          :editorOptions="editorSettings"
          v-model="noteHTML"
          useCustomImageHandler
          @image-added="imageHandler"
        />
      </div>
      <div class="note-actions">
        <button @click="uploadNote">Publish Note</button>
        <router-link class="router-button" :to="{ name: 'NotePreview' }"
          >Note Preview</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import NoteCoverPreview from '@/components/NoteCoverPreview'
import Loading from '@/components/Loading'
import firebase from 'firebase/app'
import 'firebase/storage'
import db from '@/firebase/firebaseInit'
import Quill from 'quill'
window.Quill = Quill
const ImageResize = require('quill-image-resize-module').default
Quill.register('modules/imageResize', ImageResize)

export default {
  name: 'CreateNote',
  components: {
    NoteCoverPreview,
    Loading,
  },
  data() {
    return {
      file: null,
      error: null,
      errorMsg: null,
      loading: null,
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
    }
  },
  methods: {
    fileChange() {
      this.file = this.$refs.notePhoto.files[0]
      const fileName = this.file.name
      this.$store.commit('fileChangeName', fileName)
      this.$store.commit('createFileURL', URL.createObjectURL(this.file))
    },
    openPreview() {
      this.$store.commit('openPhotoPreview')
    },

    imageHandler(file, Editor, cursorLocation, resetUploader) {
      const storageRef = firebase.storage().ref()
      const docRef = storageRef.child(`documents/notePostPhotos/${file.name}`)
      docRef.put(file).on(
        'state_changed',
        (snapshot) => {
          console.log(snapshot)
        },
        (err) => {
          console.log(err)
        },
        async () => {
          const downloadURL = await docRef.getDownloadURL()
          Editor.insertEmbed(cursorLocation, 'image', downloadURL)
          resetUploader()
        }
      )
    },
    uploadNote() {
      if (this.noteTitle.length !== 0 && this.noteHTML.length !== 0) {
        if (this.file) {
          this.loading = true
          const storageRef = firebase.storage().ref()
          const docRef = storageRef.child(
            `documents/NoteCoverPhotos/${this.$store.state.notePhotoName}`
          )
          docRef.put(this.file).on(
            'state_changed',
            (snapshot) => console.log(snapshot),
            (err) => {
              console.log(err)
              this.loading = false
            },
            async () => {
              const downloadURL = await docRef.getDownloadURL()
              const timestamp = await Date.now()
              const dataBase = await db.collection('notePosts').doc()

              await dataBase.set({
                noteID: dataBase.id,
                noteHTML: this.noteHTML,
                noteCoverPhoto: downloadURL,
                noteCoverPhotoName: this.noteCoverPhotoName,
                noteTitle: this.noteTitle,
                profileId: this.profileId,
                date: timestamp,
              })
              await this.$store.dispatch('getNote')
              this.loading = false
              this.$router.push({
                name: 'ViewNote',
                params: { noteid: dataBase.id },
              })
            }
          )
          return
        }
        this.error = true
        this.errorMsg = 'Please ensure you uploaded a cover photo'
        setTimeout(() => (this.error = false), 5000)
        return
      }
      this.error = true
      this.errorMsg = 'Please ensure Note Title & Note Post has been filled'
      setTimeout(() => (this.error = false), 5000)
      return
    },
  },
  computed: {
    profileId() {
      return this.$store.state.profileId
    },
    noteCoverPhotoName() {
      return this.$store.state.notePhotoName
    },
    noteTitle: {
      get() {
        return this.$store.state.noteTitle
      },
      set(payload) {
        this.$store.commit('updateNoteTitle', payload)
      },
    },
    noteHTML: {
      get() {
        return this.$store.state.noteHTML
      },
      set(payload) {
        this.$store.commit('newNotePost', payload)
      },
    },
  },
}
</script>

<style lang="scss">
.create-note {
  position: relative;
  height: 100%;

  .container {
    background-color: #e0e1c0 !important;
  }

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px 0;
    padding: 12px 24px;
    color: #ffffff;
    background-color: #303030;
    text-decoration: none;

    &:hover {
      background-color: #303030b3;
    }
  }

  .label {
    color: #f7faa5;
    @media (max-width: 750px) {
      padding: 10px 14px;
      font-size: 12px;
    }
    @media (max-width: 710px) {
      padding: 8px 12px;
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  // error styling

  .invisible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;
    p {
      font-size: 14px;
      @media (max-width: 610px){
        font-size: 12px;
      }
    }

    span {
      font-weight: 600;
    }
  }

  .note-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
      background-color: #f5f3d4;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
      @media (max-width: 610px) {
        margin-bottom: 10px;
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      @media (max-width: 610px) {
        margin-left: 0 !important;
      }
      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }

    @media (max-width: 610px) {
      flex-direction: column;
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }
  }

  .note-actions {
    /* margin-top: 32px; */

    button {
      margin-right: 16px;
      color: #f7faa5;
      @media (max-width: 360px) {
        width: 100%;
        text-align: center;
        margin-right: 0 !important;
      }
    }

    .router-button {
      color: #f7faa5;
      @media (max-width: 360px) {
        margin-top: 10px;
        width: 100%;
        text-align: center;
      }
    }

    @media (max-width: 360px) {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
