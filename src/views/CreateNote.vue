<template>
  <div class="create-note">
    <NoteCoverPreview v-show="this.$store.state.notePhotoPreview" />
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
          <label for="note-photo">Upload Cover Photo</label>
          <input
            type="file"
            ref="notePhoto"
            id="note-photo"
            @change="fileChange"
            accept=".png, .jpg, .jpeg"
          />
          <button
            class="preview"
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
        <button>Publish Note</button>
        <router-link class="router-button" :to="{name: 'NotePreview'}">Note Preview</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import NoteCoverPreview from '@/components/NoteCoverPreview'
import firebase from 'firebase/app'
import 'firebase/storage'
import Quill from 'quill'
window.Quill = Quill
const ImageResize = require('quill-image-resize-module').default
Quill.register('modules/imageResize', ImageResize)

export default {
  name: 'CreateNote',
  components: {
    NoteCoverPreview,
  },
  data() {
    return {
      file: null,
      error: null,
      errorMsg: null,
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
    color: #fff;
    background-color: #303030;
    text-decoration: none;

    &:hover {
      background-color: #303030b3;
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
    transition: 0.5s ease all p {
      font-size: 14px;
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
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

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
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>




















