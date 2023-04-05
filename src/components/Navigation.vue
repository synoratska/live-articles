<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }"
          >Ukrainian<span>Portal</span>
        </router-link>
      </div>
      <div class="nav-links">
        <ul>
          <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
          <router-link class="link" :to="{ name: 'Places' }"
            >Places</router-link
          >
          <router-link class="link" :to="{ name: 'CreateNote' }"
            >Create A Note</router-link
          >
          <router-link v-if="admin" class="link" :to="{ name: 'PhotoGallery' }"
            >Gallery</router-link
          >
          <router-link v-if="!user" class="link" :to="{ name: 'Login' }"
            >Login/Register</router-link
          >
        </ul>
        <div
          v-if="user"
          class="profile"
          @click.prevent="toggleMobileMenu"
          ref="profile"
        >
          <span>{{ this.$store.state.profileInitials }}</span>
          <div class="profile-menu" v-if="profileMenu">
            <div class="info">
              <p class="initials">{{ this.$store.state.profileInitials }}</p>
              <div class="right">
                <p>
                  {{ this.$store.state.profileFirstName }}
                  {{ this.$store.state.profileLastName }}
                </p>
                <p>{{ this.$store.state.profileUsername }}</p>
                <p>{{ this.$store.state.profileEmail }}</p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link class="option" :to="{ name: 'Profile' }">
                  <userIcon class="icon" />
                  <p>Profile</p>
                </router-link>
              </div>

              <div v-if="admin" class="option">
                <router-link class="option" :to="{ name: 'Admin' }">
                  <adminIcon class="icon" />
                  <p>Admin</p>
                </router-link>
              </div>

              <div @click="signOut" class="option">
                <signOutIcon class="icon" />
                <p>Sign Out</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <menuIcon @click="toggleMobileNav" class="menu-icon" />
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-if="mobileNav">
        <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
        <router-link class="link" :to="{ name: 'Places' }">Places</router-link>
        <router-link class="link" :to="{ name: 'CreateNote' }"
          >Create A Note</router-link
        >
        <router-link v-if="admin" class="link" :to="{ name: 'PhotoGallery' }"
          >Gallery</router-link
        >
        <router-link v-if="!user" class="link" :to="{ name: 'Login' }"
          >Login/Register</router-link
        >
      </ul>
    </transition>
  </header>
</template>

<script>
import menuIcon from '../assets/Icons/bars-regular.svg'
import userIcon from '../assets/Icons/user-alt-light.svg'
import adminIcon from '../assets/Icons/user-crown-light.svg'
import signOutIcon from '../assets/Icons/sign-out-alt-regular.svg'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'NavigationBar',
  components: {
    menuIcon,
    userIcon,
    adminIcon,
    signOutIcon,
  },
  data() {
    return {
      mobileNav: null,
      profileMenu: null,
    }
  },

  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav
    },
    toggleMobileMenu(e) {
      if (e.target === this.$refs.profile) {
        this.profileMenu = !this.profileMenu
      }
    },
    signOut() {
      firebase.auth().signOut()
      window.location.reload()
    },
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    admin() {
      return this.$store.state.profileAdmin
    },
  },
}
</script>

<style lang="scss" scoped>
header {
  background-color: #231f1f;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px #88866f1a, 0 2px 4px -1px #b4b06f0f;
  z-index: 99;
    @media (min-width: 770px) {
      padding: 0 10px 0 25px;
    }

    @media (max-width: 769px) {
      padding: 0 75px 0 25px;
    }



  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;

    &:hover {
      color: #e8de21;
    }
  }

  nav {
    display: flex;
    padding: 25px 0;
    .branding {
      display: flex;
      align-items: center;
      .header {
        font-weight: 600;
        font-size: 24px;
        color: #32119d;
        text-decoration: none;
      }

      .header span {
        color: #ccd313 !important;
      }
    }

    .nav-links {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;

      ul {
        margin-right: 32px;
        @media only screen and (max-width: 770px) {
          display: none;
        }
        .link {
          margin-right: 32px;
          color: #f7faa5;
        }

        .link:last-child {
          margin-right: 0;
        }
      }

      .profile {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 10px 0;
        color: #fff;
        background-color: #303030;

        span {
          pointer-events: none;
          color: #ccd313 !important;
          font-weight: 500;
        }
        .profile-menu {
          position: absolute;
          top: 60px;
          right: 0;
          width: 250px;
          background-color: #303030;
          box-shadow: 0 4px 6px -1px #0000001a, 0 2px 4px -1px #0000000f;

          .info {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #fff;

            .initial {
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              color: #303030;
              background-color: #fff;
            }

            .right {
              flex: 1;
              margin-left: 24px;

              p:nth-child(1) {
                font-size: 14px;
              }

              p:nth-child(2),
              p:nth-child(3) {
                font-size: 12px;
              }
            }
          }

          .options {
            padding: 15px;
            .option {
              text-decoration: none;
              color: #fff;
              display: flex;
              align-items: center;
              margin-bottom: 12px;

              .icon {
                width: 18px;
                height: auto;
              }

              p {
                font-size: 14px;
                margin-left: 12px;
              }

              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }

  .menu-icon {
    display: none;
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 32px;
    height: 25px;
    width: auto;

    @media only screen and (max-width: 770px) {
      display: block;
    }
  }

  .mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;

    .link {
      padding: 15px 0;
      color: #f7faa5;
    }
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 1s ease;
  }

  .mobile-nav-enter {
    transform: translateX(-250px);
  }
  .mobile-nav-enter-to {
    transform: translateX(0);
  }

  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }

  span {
    color: #e8de21;
  }
}
</style>
