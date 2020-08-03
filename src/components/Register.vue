<template>
  <v-container>
    <kinesis-container>
      <v-row>
        <v-flex xs12 lg4 class="ma-auto mt-16">
          <kinesis-element type="depth" :strength='10'>
            <h1 class="headline-1 mb-5">Register</h1>
          </kinesis-element>
          <form @submit.prevent="registerHandler">
            <kinesis-element type='depth' :strength='5'>
              <v-text-field
                  v-model.trim="email"
                  :error-messages="emailErrors"
                  label="Email"
                  type="text"
                  name="email"
              ></v-text-field>
            </kinesis-element>
            <kinesis-element type='depth' :strength='0'>
              <v-text-field
                  v-model.trim="password"
                  :error-messages="passwordErrors"
                  :counter="'>' + 6"
                  label="Password"
                  type="password"
                  name="password"
              ></v-text-field>
            </kinesis-element>
            <kinesis-element type='depth' :strength='-5'>
              <v-text-field
                  v-model.trim="confirmPassword"
                  :counter="'>' + 6"
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  :error-messages="confirmPasswordErrors"
              ></v-text-field>
            </kinesis-element>
            <kinesis-element type='depth'>
              <v-btn
                  color="orange lighten-1"
                  outlined
                  class="mt-3"
                  type="submit"
              >register
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
  import {required, minLength, sameAs, email} from "vuelidate/lib/validators"
  import {mapActions} from "vuex"

  export default {
    name: "Register",
    mixins: [validationMixin],
    validations: {
      email: {required, email},
      password: {required, minLength: minLength(6)},
      confirmPassword: {required, sameAsPassword: sameAs("password")}
    },
    data: () => ({
      email: "",
      password: "",
      confirmPassword: "",
      isAdmin: null
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
      confirmPasswordErrors() {
        const errors = [];
        if (!this.$v.confirmPassword.$dirty) return errors;
        !this.$v.confirmPassword.sameAsPassword && errors.push("Password should match");
        !this.$v.confirmPassword.required && errors.push("Password is required.");
        return errors
      }
    },
    methods: {
      ...mapActions({
        register: "register"
      }),
      registerHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return
        }
        const user = {
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
          isAdmin: this.isAdmin
        };
        this.register(user)
          .then(() => {
            this.$router.push("/");
            this.$v.$reset();
          })
          .catch(err => {
            console.error(err.message)
          })
      }
    },
  }
</script>
