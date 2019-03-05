<template lang="html">
  <table>
    <tr>
      <th>Rank</th>
      <th>Player</th>
      <th>Wins</th>
      <th>Losses</th>
      <th>Rounds Won</th>
      <th>Rounds Lost</th>
      <th>Round Difference</th>
    </tr>
    <LeagueItem v-for="(player, index) in sortedPlayers" :player="player" :index="index" />
  </table>
</template>

<script>
import { orderBy } from 'lodash';
import LeagueItem from '@/components/LeagueItem'

export default {
  props: ['players'],
  components: {
    LeagueItem
  },
  computed: {
    sortedPlayers(){
      return _.orderBy(this.players, ['wins', 'roundsWon'], ['asc', 'desc']);
    }
  }
}
</script>

<style lang="css" scoped>
</style>
