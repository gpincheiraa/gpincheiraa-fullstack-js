<template>
  <v-alert
    class="text-center"
    :type="type"
    dismissible
    outlined
    border="left"
    @input="closeAlert"
  >
  {{ message }}
  </v-alert>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'error'
    },
    closeAlert: Function
  }
}
</script>

<style>

</style>
