<template lang="html">
  <tr>
    <td>
      {{position}}
    </td>
    <td>
      {{player.name}}
    </td>
    <td>
      {{player.matchesWon}}
    </td>
    <td>
      {{player.matchesLost}}
    </td>
    <td>
      {{player.roundsWon}}
    </td>
    <td>
      {{player.roundsLost}}
    </td>
    <td>
      {{roundDifference}}
    </td>
  </tr>
</template>

<script>
export default {
  props: ['player', 'index'],
  computed: {
    position(){
      return this.index + 1;
    },
    roundDifference(){
      return this.player.roundsWon - this.player.roundsLost;
    }
  }
}
</script>

<style lang="css" scoped>
</style>
