<template>
  <div class="container" v-if="!client.error">
    <h1 class="text-center mb-md-4">View client:</h1>
    <header class="jumbotron">
      <div v-if="!client.error">
        <div class="card">
          <div class="card-header text-center">
            <h3><b>Client:</b> {{ client.name }}</h3>
          </div>
          <div class="card-body text-justify">
            <p><b>Name: </b>{{ client.name }}</p>
            <p><b>Email: </b>{{ client.email }}</p>
            <p><b>CPF: </b>{{ client.cpf }}</p>
            <p><b>Phone number: </b>{{ client.phone }}</p>
            <p><b>Gender: </b>{{ client.gender }}</p>
            <p><b>Street: </b>{{ client.street }}</p>
            <p><b>Number: </b>{{ client.number }}</p>
            <p><b>City: </b>{{ client.city }}</p>
            <p><b>State: </b>{{ client.state }}</p>
            <p><b>Country: </b>{{ client.country }}</p>
            <p><b>Age: </b>{{ client.age }}</p>
            <router-link
              :to="'/edit-client?id=' + client._id"
              tag="button"
              class="btn btn-warning mb-md-2 mt-4 text-light"
              ><font-awesome-icon icon="edit" /> Editar</router-link
            >
            <button
              class="btn btn-danger btn-space mx-3 mb-md-2 mt-4"
              @click.prevent="deleteClient(client._id)"
            >
             <font-awesome-icon icon="trash" /> Delete
            </button>
          </div>
        </div>
      </div>

      <div v-if="client.error" class="alert alert-danger" role="alert">
        {{ client.error }}
      </div>
    </header>
  </div>
</template>

<script>
import ClientsService from "../services/clients.service";

export default {
  name: "Home",
  computed: {
    currentUser() {
      return this.$store.state.auth.token;
    },
  },
  data() {
    return {
      client: "",
    };
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    ClientsService.getClientById(this.$route.query.id).then(
      (response) => {
        response.data.data.cpf = response.data.data.cpf.replace(
          /(\d{3})?(\d{3})?(\d{3})?(\d{2})/,
          "$1.$2.$3-$4"
        );
        response.data.data.phone = response.data.data.phone.replace(
          /(\d{2})?(\d{4,5})?(\d{4})/,
          "($1) $2-$3"
        );
        this.client = response.data.data;
      },
      (error) => {
        this.client =
          error.response.data || error.data.data || error.toString();
      }
    );
  },
  methods: {
    deleteClient(id) {
      ClientsService.deleteClients(id).then(
        () => {
          this.$router.push("/home");
        },
        (error) => {
          this.client =
            error.response.data || error.data.data || error.toString();
        }
      );
    },
  },
};
</script>