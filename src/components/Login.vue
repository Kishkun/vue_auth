<template>
  <v-container>
    <kinesis-container>
      <v-row>
        <v-flex xs12 lg4 class="ma-auto mt-16">
          <kinesis-element type='depth' :strength='10'>
            <h1 class=" headline-1 mb-5">Sign in</h1>
          </kinesis-element>
          <form @submit.prevent="loginHandler">
            <kinesis-element type='depth' :strength='5'>
              <v-text-field
                  v-model.trim="email"
                  :error-messages="emailErrors"
                  label="Email"
                  type="text"
                  name="email"
              ></v-text-field>
            </kinesis-element>
            <kinesis-element type='depth' :strength='-5'>
              <v-text-field
                  v-model.trim="password"
                  :error-messages="passwordErrors"
                  :counter="'>' + 6"
                  label="Password"
                  type="password"
                  name="password"
              ></v-text-field>
            </kinesis-element>
            <kinesis-element type="depth">
              <v-btn
                  color="orange lighten-1"
                  outlined
                  class="mt-3"
                  type="submit"
              >login
              </v-btn>
            </kinesis-element>
          </form>
        </v-flex>
      </v-row>
    </kinesis-container>
  </v-container>
</template>
<script>
  import {validationMixin} from "vuelidate"
  import {required, minLength, email} from "vuelidate/lib/validators"
  import {mapActions} from "vuex"

  import {KinesisContainer, KinesisElement} from "vue-kinesis"

  export default {
    name: "Login",
    mixins: [validationMixin],
    validations: {
      email: {required, email},
      password: {required, minLength: minLength(6)}
    },
    data: () => ({
      email: "",
      password: "",
    }),
    computed: {
      emailErrors() {
        const errors = [];
        if (!this.$v.email.$dirty) return errors;
        !this.$v.email.email && errors.push("Must be valid e-mail");
        !this.$v.email.required && errors.push("Email is required.");
        return errors
      },
      passwordErrors() {
        const errors = [];
        if (!this.$v.password.$dirty) return errors;
        !this.$v.password.minLength && errors.push("Password must not be less 6 characters.");
        !this.$v.password.required && errors.push("Password is required.");
        return errors
      },
    },
    methods: {
      ...mapActions({
        login: "login"
      }),
      loginHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return
        }
        const user = {
          email: this.email,
          password: this.password
        };
        this.login(user)
          .then(() => {
            this.$router.push("/");
            this.$v.$reset();
          })
          .catch(err => {
            console.error(err.message)
          });
      }
    },
  }
</script>
