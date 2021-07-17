<template>
  <div class="container">
    <h1 class="text-center mb-md-4">Clients</h1>
    <header class="jumbotron">
      <div v-if="save" class="alert alert-success" role="alert">
        Record saved successfully
      </div>
      <div v-if="deleted" class="alert alert-success" role="alert">
        Record remove successfully
      </div>
      <div class="row">
        <div class="col-8">
          <router-link
            to="/create-client"
            tag="button"
            class="btn btn-success mb-md-2"
            ><font-awesome-icon icon="user-plus" /> Create</router-link
          >
        </div>
        <div class="col-4">
          <input
            type="text"
            class="form-control"
            id="findValue"
            v-model="findValue"
            ref="findValue"
            v-on:keypress="find()"
            v-on:keydown="find()"
            placeholder="Find by name..."
          />
        </div>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody v-for="client in clients.docs" :key="client._id">
            <tr @click.prevent="handleView(client._id)">
              <td>{{ client.name }}</td>
              <td>{{ client.email }}</td>
              <td>{{ client.phone }}</td>
              <td><font-awesome-icon icon="eye" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav aria-label="navigation">
        <ul class="pagination">
          <li v-if="clients.prevPage" class="page-item">
            <a class="page-link" :href="'/home?page=' + clients.prevPage"
              >Previous</a
            >
          </li>
          <li v-if="!clients.prevPage" class="page-item disabled">
            <a class="page-link" href="#">Previous</a>
          </li>
          <li v-if="clients.prevPage" class="page-item">
            <a class="page-link" :href="'/home?page=' + clients.prevPage">{{
              clients.prevPage
            }}</a>
          </li>
          <li v-if="clients.page" class="page-item">
            <a class="page-link" :href="'/home?page=' + clients.page">{{
              clients.page
            }}</a>
          </li>
          <li v-if="clients.nextPage" class="page-item">
            <a class="page-link" :href="'/home?page=' + clients.nextPage">{{
              clients.nextPage
            }}</a>
          </li>
          <li v-if="clients.nextPage" class="page-item">
            <a class="page-link" :href="'/home?page=' + clients.nextPage"
              >Next</a
            >
          </li>
          <li v-if="!clients.nextPage" class="page-item disabled">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
import ClientsService from "../services/clients.service";
import AuthService from "../services/auth.service";
export default {
  name: "Home",
  computed: {
    currentUser() {
      return this.$store.state.auth.token;
    },
  },
  data() {
    return {
      clients: "",
      save: "",
      deleted: "",
    };
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    if (this.$route.query.save) {
      this.save = true;
    }
    if (this.$route.query.deleted) {
      this.deleted = true;
    }
    ClientsService.getClients(this.$route.query).then(
      (response) => {
        this.clients = response.data.data;
      },
      (error) => {
        if (error == "Error: Request failed with status code 401")
          AuthService.logout();
        this.clients =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods: {
    handleView(id) {
      this.$router.push(`/view-client?id=${id}`);
    },
    find() {
      if (this.$refs.findValue.value != "") {
        ClientsService.getClients({ q: this.$refs.findValue.value }).then(
          (response) => {
            this.clients = response.data.data;
          },
          (error) => {
            if (error == "Error: Request failed with status code 401")
              AuthService.logout();
            this.clients =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      } else {
        ClientsService.getClients(this.$route.query).then(
          (response) => {
            this.clients = response.data.data;
          },
          (error) => {
            if (error == "Error: Request failed with status code 401")
              AuthService.logout();
            this.clients =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
  },
};
</script>