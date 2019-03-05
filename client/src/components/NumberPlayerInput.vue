<template lang="html">
  <form v-on:submit="handleSubmit">
    <label for="numPlayers">How many fighters?</label>
    <input name="numPlayers" type="number" min="2" v-model="numPlayers"/>
    <input type="submit" value="Confirm"/>
  </form>
</template>

<script>
import { eventBus } from '../main';

export default {
  data(){
    return {
      numPlayers: 2
    }
  },
  methods: {
    handleSubmit(e){
      e.preventDefault();

      eventBus.$emit('playerNumber-input', this.numPlayers);
    }
  }
}
</script>

<style lang="css" scoped>
</style>
