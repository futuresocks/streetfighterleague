<template lang="html">
  <form v-on:submit="handleSubmit">
    <label for="rounds">How many rounds you after?</label>
    <input name="rounds" v-model="rounds" type="number"/>
    <label for="startDate">Starting from:</label>
    <input name="startDate" v-model="startDate" type="date" :min="today | dateFormat"/>
    <label for="endDate">To:</label>
    <input name="endDate" v-model="endDate" type="date" :min="startDate"/>
    <input v-if="startDate && endDate && rounds" type="submit" value="Generate Tournament"/>
  </form>
</template>

<script>
import { FixtureGenerator } from '@/models/FixtureGenerator';
import { eventBus } from '@/main';
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
  props: ['players', 'today'],
  filters: {
    dateFormat(dayjs){
      return dayjs.format('YYYY-MM-DD')
    }
  },
  methods: {
    handleSubmit(e){
      e.preventDefault();

      const fixtureGenerator = new FixtureGenerator(this.players, this.rounds)

      const startDate = dayjs(this.startDate);
      const endDate = dayjs(this.endDate);

      this.fixtures = fixtureGenerator.generateFixtures(startDate, endDate);

      const promises = this.fixtures.map(fixture => {
        return fetch("http://localhost:3000/api/fixtures", {
          method: "POST",
          body: JSON.stringify(fixture),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      })

      Promise.all(promises)
      .then(res => res.map(response => response.json()))
      .then(fixtures => fixtures.forEach((fixture) => {
        fixture.then(data => eventBus.$emit('fixture-created', data))
      }))

    }
  }
}
</script>

<style lang="css" scoped>
</style>
