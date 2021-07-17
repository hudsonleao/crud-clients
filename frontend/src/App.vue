<template>
  <div id="app">
    <header class="p-3 mb-3 border-bottom">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href @click.prevent class="d-flex mb-2 mb-lg-0 text-dark text-decoration-none">
          <span class="fs-4">Crud Clients</span>
        </a>

        <ul class="nav col-12 col-lg-1 me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><router-link to="/home" class="nav-link px-2 link-dark">Home</router-link></li>
        </ul>

        <div v-if="!currentUser" class="dropdown text-end">
          <a>
            <router-link to="/login" class="nav-link link-dark"><font-awesome-icon icon="sign-in-alt" /> Login</router-link>
          </a>
        </div>

        <div v-if="currentUser" class="dropdown text-end">
          <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="mdo" width="32" height="32" class="rounded-circle">
          </a>
          <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
            <li><a href @click.prevent="logOut" class="dropdown-item">LogOut</a></li>
          </ul>
        </div>
      </div>
    </div>
  </header>

  <div class="b-example-divider"></div>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.token;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>