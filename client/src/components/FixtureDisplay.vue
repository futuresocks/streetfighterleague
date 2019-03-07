<template lang="html">
    <div id="fixtureDisplay">
      <FixtureItem v-for="fixture in sortedFixtures" :fixture="fixture" />
    </div>
</template>

<script>
import { sortBy } from 'lodash'
import FixtureItem from '@/components/FixtureItem'

export default {
  props: ['fixtures'],
  components: {
    FixtureItem
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
