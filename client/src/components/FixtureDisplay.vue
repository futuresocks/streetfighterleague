<template lang="html">
    <div>
      <li v-for="fixture in sortedFixtures"> {{fixture.playerOne.name}} vs {{fixture.playerTwo.name}}, {{ fixture.date | dateDisplay }}</li>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import { sortBy } from 'lodash'

export default {
  props: ['fixtures'],
  filters: {
    dateDisplay(date){
      return dayjs(date).toString();
    }
  },
  computed: {
    sortedFixtures(){
      return _.sortBy(this.fixtures, 'date');
    }
  }
}
</script>

<style lang="css" scoped>
</style>
