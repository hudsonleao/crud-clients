<template>
  <div class="container">
    <h1 class="text-center mb-md-4">Edit client:</h1>
    <header class="jumbotron">
      <form href @submit.prevent="saveEdit">
        <div class="mb-3">
          <label for="name" class="form-label">Name: </label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="client.name"
            required
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email address: </label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="client.email"
            required
          />
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">Phone number: </label>
          <input
            type="text"
            class="form-control"
            id="phone"
            v-model="client.phone"
            required
          />
        </div>
        <div class="mb-3">
          <label for="gender" class="form-label">Gender: </label>
          <select
            v-model="client.gender"
            id="gender"
            class="form-control"
            required
          >
            <option value="M">M</option>
            <option value="F">F</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="dateOfBirth" class="form-label">Date of birthday: </label>
          <input
            type="date"
            class="form-control"
            id="dateOfBirth"
            v-model="client.dateOfBirth"
            required
          />
        </div>
        <div class="mb-3">
          <label for="street" class="form-label">Street: </label>
          <input
            type="text"
            class="form-control"
            id="street"
            v-model="client.street"
            required
          />
        </div>
        <div class="mb-3">
          <label for="number" class="form-label">Number: </label>
          <input
            type="number"
            class="form-control"
            id="number"
            v-model="client.number"
            required
          />
        </div>
        <div class="mb-3">
          <label for="city" class="form-label">City: </label>
          <input
            type="text"
            class="form-control"
            id="city"
            v-model="client.city"
            required
          />
        </div>
        <div class="mb-3">
          <label for="state" class="form-label">State: </label>
          <input
            type="text"
            class="form-control"
            id="state"
            v-model="client.state"
            required
          />
        </div>
        <div class="mb-3">
          <label for="country" class="form-label">Country: </label>
          <input
            type="text"
            class="form-control"
            id="country"
            v-model="client.country"
            required
          />
        </div>
        <div v-if="error" class="alert alert-danger" role="alert">
          {{ error }}
        </div>
        <div v-if="save" class="alert alert-success" role="alert">
          Record saved successfully
        </div>
        <button type="submit" class="btn btn-primary mb-5">
          <font-awesome-icon icon="save" /> Save
        </button>
      </form>
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
      client: "",
      save: "",
      error: ""
    };
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    ClientsService.getClientById(this.$route.query.id).then(
      (response) => {
        response.data.data.dateOfBirth = new Date(
          response.data.data.dateOfBirth
        )
          .toISOString()
          .split("T")[0];
        this.client = response.data.data;
      },
      (error) => {
        if (error == "Error: Request failed with status code 401")
          AuthService.logout();
        this.error = error.response.data.error || error.error || error.toString();
      }
    );
  },
  methods: {
    saveEdit() {
      ClientsService.updateClients(this.$route.query.id, this.client).then(
        (response) => {
          response.data.data.dateOfBirth = new Date(
            response.data.data.dateOfBirth
          )
            .toISOString()
            .split("T")[0];
          this.client = response.data.data;
          this.save = true;
          this.error = false;
        },
        (error) => {
          if (error == "Error: Request failed with status code 401")
            AuthService.logout();
          this.error = error.response.data.error || error.error || error.toString();
          this.save = false;
        }
      );
    },
  },
};
</script>