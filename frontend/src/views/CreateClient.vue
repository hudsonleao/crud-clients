<template>
  <div class="container">
    <h1 class="text-center mb-md-4">Create client:</h1>
    <header class="jumbotron">
      <form href @submit.prevent="saveCreate">
        <div class="mb-3">
          <label for="name" class="form-label">Name: </label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="body.name"
            required
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email address: </label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="body.email"
            required
          />
        </div>
        <div class="mb-3">
          <label for="cpf" class="form-label">CPF: </label>
          <input
            type="text"
            class="form-control"
            id="cpf"
            v-model="body.cpf"
            v-mask="'###.###.###-##'"
            required
          />
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">Phone number: </label>
          <input
            type="text"
            class="form-control"
            id="phone"
            v-model="body.phone"
            required
          />
        </div>
        <div class="mb-3">
          <label for="gender" class="form-label">Gender: </label>
          <select v-model="body.gender" id="gender" class="form-control" required>
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
            v-model="body.dateOfBirth"
            required
          />
        </div>
        <div class="mb-3">
          <label for="street" class="form-label">Street: </label>
          <input
            type="text"
            class="form-control"
            id="street"
            v-model="body.street"
            required
          />
        </div>
        <div class="mb-3">
          <label for="number" class="form-label">Number: </label>
          <input
            type="number"
            class="form-control"
            id="number"
            v-model="body.number"
            required
          />
        </div>
        <div class="mb-3">
          <label for="city" class="form-label">City: </label>
          <input
            type="text"
            class="form-control"
            id="city"
            v-model="body.city"
            required
          />
        </div>
        <div class="mb-3">
          <label for="state" class="form-label">State: </label>
          <input
            type="text"
            class="form-control"
            id="state"
            v-model="body.state"
            required
          />
        </div>
        <div class="mb-3">
          <label for="country" class="form-label">Country: </label>
          <input
            type="text"
            class="form-control"
            id="country"
            v-model="body.country"
            required
          />
        </div>
        <div v-if="client.error" class="alert alert-danger" role="alert">
          {{ client.error }}
        </div>
        <button type="submit" class="btn btn-primary mb-5"><font-awesome-icon icon="save" /> Save</button>
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
      body: {
        name: "",
        email: "",
        cpf: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        street: "",
        number: "",
        city: "",
        state: "",
        country: "",
      },
    };
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  methods: {
    saveCreate() {
      this.body.cpf = this.body.cpf.replaceAll(".", "").replace("-", "");
      ClientsService.createClients(this.body).then(
        () => {
          this.$router.push("/home?save=true");
        },
        (error) => {
          if (error == "Error: Request failed with status code 401")
            AuthService.logout();
          this.client = error.response.data || error.error || error.toString();
        }
      );
    },
  },
};
</script>