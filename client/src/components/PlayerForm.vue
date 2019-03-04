<template lang="html">
  <form v-on:submit="handleSubmit">
    <label for="nameInput">Player {{playerNumber}}, enter your name!</label>
    <input type="text" v-model="name"/>
    <input v-if="name" type="submit" value="Register Player"/>
  </form>
</template>

<script>
import { eventBus } from '@/main';
import Player from '@/models/Player';

export default {
  data(){
    return {
      name: ""
    }
  },
  methods: {
    handleSubmit(e){
      e.preventDefault();

      const newPlayer = new Player(this.name);

      fetch("http://localhost:3000/api/players", {
        method: "POST",
        body: JSON.stringify(newPlayer),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(player => eventBus.$emit('player-added', player))
    }
  },
  props: ['players'],
  computed: {
    playerNumber(){
      return this.players.length + 1;
    }
  }

}
</script>

<style lang="css" scoped>
</style>
