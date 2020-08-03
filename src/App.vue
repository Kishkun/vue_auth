<template>
  <v-app>
    <div>
      <v-app-bar
          color="orange lighten-1"
          light
      >
        <v-toolbar-title tag="a" link :to="'/'">
          <router-link
              tag="span"
              exact
              :to="'/'"
              class="pointer"
          >
            Vue Auth
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text
                 v-for="(link, i) in links"
                 :key="i"
                 link
                 :to="link.url"
          >
            <v-icon left>{{ link.icon }}</v-icon>
            <span>{{ link.title }}</span>
          </v-btn>
          <v-btn text
                 @click="onLogout"
                 v-if="isUserLoggedIn"
          >
            <v-icon left>exit_to_app</v-icon>
            <span>Logout</span>
          </v-btn>
        </v-toolbar-items>
      </v-app-bar>
    </div>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
  import Home from './views/Home'
  import {mapActions, mapGetters} from "vuex"
  

  export default {
    name: 'App',
    components: {
      Home
    },
    methods: {
      ...mapActions({
        logout: 'logout'
      }),
      onLogout() {
        this.logout()
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
    computed: {
      ...mapGetters(['users']),
      isUserLoggedIn() {
        return this.users
      },
      links() {
        if (this.isUserLoggedIn) {
          return [
            {title: "Cart", icon: "shopping_cart", url: "/checkout"}
          ]
        }
        return [
          {title: "Login", icon: "account_box", url: "/login"},
          {title: "Register", icon: "face", url: "/register"}
        ]
      }
    },
    created() {
      this.$http.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.logout()
          }
          throw err;
        });
      });
    }
  };
</script>
<style scoped>
  .pointer{
    cursor: pointer;
  }
</style>
