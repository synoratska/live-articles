<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }"
          >Ukrainian<span>Portal</span> </router-link
        >
      </div>
      <div class="nav-links">
        <ul>
          <router-link class="link" to="#">Home</router-link>
          <router-link class="link" to="#">Articles</router-link>
          <router-link class="link" to="#">Create An Article</router-link>
          <router-link class="link" to="#">Login/Register</router-link>
        </ul>
      </div>
    </nav>
    <menuIcon @click="toggleMobileNav" class="menu-icon" />
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-if="mobileNav">
        <router-link class="link" to="#">Home</router-link>
        <router-link class="link" to="#">Articles</router-link>
        <router-link class="link" to="#">Create An Article</router-link>
        <router-link class="link" to="#">Login/Register</router-link>
      </ul>
    </transition>
  </header>
</template>

<script>
import menuIcon from '../assets/Icons/bars-regular.svg'
export default {
  name: 'NavigationBar',
  components: {
    menuIcon,
  },
  data() {
    return {
      mobileNav: null,
    }
  },

  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav
    },
  },
}
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px #0000001a,
    0 2px 4px -1px #0000000f;
  z-index: 99;

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
        }

        .link:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .menu-icon {
    display: none;
    cursor: pointer;
    position: absolute;
    top: 27px;
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
      color: #fff;
    }
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 1s ease;
  }

  .mobile-nav-enter {
    transform: translateX(-250px)
  }
  .mobile-nav-enter-to {
    transform: translateX(0)
  }

  .mobile-nav-leave-to {
    transform: translateX(-250px)
  }

  span {
    color:#e8de21;
  }
}
</style>
