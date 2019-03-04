<template lang="html">
  <div>
    <NumberPlayerInput v-if="!players.length && !numberPlayers"/>
    <PlayerForm v-if="numberPlayers && players.length != numberPlayers" :players="players"/>
  </div>
</template>

<script>
import { eventBus } from '@/main'
import PlayerForm from '@/components/PlayerForm';
import NumberPlayerInput from '@/components/NumberPlayerInput';

export default {
  data(){
    return {
      players: [],
      numberPlayers: 0
    }
  },
  mounted(){
    fetch("http://localhost:3000/api/players")
    .then(res => res.json())
    .then(players => this.players = players);

    eventBus.$on('playerNumber-input', (number) => this.numberPlayers = number);
    eventBus.$on('player-added', (player) => this.players.push(player));
  },
  components: {
    PlayerForm,
    NumberPlayerInput
  }
}
</script>

<style lang="css" scoped>
</style>
