<template lang="html">

  <div>
    <h2>{{fixture.playerOne.name}} vs {{fixture.playerTwo.name}}</h2>
    <h3>{{fixture.date | dateDisplay}}</h3>
    <button v-if="resultReady && !edit" v-on:click="recordResult">Record Result</button>

    <FixtureResultRecord v-if="edit" :fixture="fixture"/>
  </div>

</template>

<script>
import dayjs from 'dayjs';
import FixtureResultRecord from '@/components/FixtureResultRecord';
import {eventBus} from '@/main';

export default {
  props: ['fixture'],
  components: {
    FixtureResultRecord
  },
  data(){
    return {
      edit: false
    }
  },
  mounted(){
    eventBus.$on('result-recorded', () => this.edit = false)
  },
  methods: {
    recordResult(){
      this.edit = true;
    }
  },
  computed: {
    resultReady(){
      return dayjs(this.fixture.date).isBefore(dayjs()) && !this.fixture.winner;
    }
  },
  filters: {
    dateDisplay(date){
      return dayjs(date).toString();
    }
  }
}
</script>

<style lang="css" scoped>
</style>
