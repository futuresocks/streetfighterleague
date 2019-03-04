<template lang="html">
  <div>
    <NumberPlayerInput v-if="!players.length && !numberPlayers"/>
    <PlayerForm v-if="numberPlayers && players.length != numberPlayers" :players="players"/>
    <FixtureForm v-if="numberPlayers && players.length == numberPlayers && !fixtures" :players="players"/>
    <FixtureDisplay v-if="fixtures" :fixtures="fixtures"/>
    <LeagueTable :players="players"/>
  </div>
</template>

<script>
import { eventBus } from '@/main'
import PlayerForm from '@/components/PlayerForm';
import NumberPlayerInput from '@/components/NumberPlayerInput';
import FixtureForm from '@/components/FixtureForm';
import FixtureDisplay from '@/components/FixtureDisplay';
import LeagueTable from '@/components/LeagueTable';

export default {
  data(){
    return {
      fixtures: [],
      players: [],
      numberPlayers: 0
    }
  },
  mounted(){
    fetch("http://localhost:3000/api/players")
    .then(res => res.json())
    .then(players => this.players = players);

    fetch("http://localhost:3000/api/fixtures")
    .then(res => res.json())
    .then(fixtures => this.fixtures = fixtures);

    eventBus.$on('playerNumber-input', number => this.numberPlayers = number);
    eventBus.$on('player-added', player => this.players.push(player));
    eventBus.$on('fixture-created', fixture => this.fixtures.push(fixture));
  },
  components: {
    PlayerForm,
    NumberPlayerInput,
    FixtureForm,
    FixtureDisplay,
    LeagueTable
  }
}
</script>

<style lang="css" scoped>
</style>
