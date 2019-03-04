<template lang="html">
  <form v-on:submit="handleSubmit">
    <label for="rounds">How many rounds you after?</label>
    <input name="rounds" v-model="rounds" type="number"/>
    <label for="startDate">Starting from:</label>
    <input name="startDate" v-model="startDate" type="date"/>
    <label for="endDate">To:</label>
    <input name="endDate" v-model="endDate" type="date"/>
    <input v-if="startDate && endDate && rounds" type="submit" value="Generate Tournament"/>
  </form>
</template>

<script>
import { FixtureGenerator } from '@/models/FixtureGenerator';
import dayjs from 'dayjs';

export default {
  data(){
    return {
      startDate: null,
      endDate: null,
      rounds: 0,
      fixtures: []
    }
  },
  props: ['players'],
  methods: {
    handleSubmit(e){
      e.preventDefault();

      const fixtureGenerator = new FixtureGenerator(this.players, this.rounds)

      const startDate = dayjs(this.startDate);
      const endDate = dayjs(this.endDate);

      this.fixtures = fixtureGenerator.generateFixtures(startDate, endDate);

      //Bring in the fixture generator, pass in the rounds and players, generate fixtures using the dates

      //Post all fixtures to the db


    }
  }
}
</script>

<style lang="css" scoped>
</style>
