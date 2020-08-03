<template>
  <v-container>
    <v-row>
      <v-flex>
        {{ this.$store.state.user }}
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  
  }
}
</script>
