<template lang="html">
  <form v-on:submit="handleSubmit">
    <label for="playerOneFighter">{{fixture.playerOne.name}}'s Fighter</label>
    <select name="playerOneFighter">
      <option v-for="fighter in fighters">{{fighter}}</option>
    </select>
    <label for="playerOneRounds">Rounds Won:</label>
    <input name="playerOneRounds" v-model="playerOneRounds" type="number" min="0" max="2" required/>
    <label for="playerTwoFighter">{{fixture.playerTwo.name}}'s Fighter</label>
    <select name="playerTwoFighter">
      <option v-for="fighter in fighters">{{fighter}}</option>
    </select>
    <label for="playerTwoRounds">Rounds Won:</label>
    <input name="playerTwoRounds" v-model="playerTwoRounds" type="number" min="0" max="2" required/>
    <input type="submit" value="Record Result"/>
  </form>
</template>

<script>
import {eventBus} from '@/main';

export default {
  props: ['fixture'],
  data(){
    return {
      fighters: ["Ryu", "Ken", "Guile", "Blanka", "E.Honda", "Chun Li", "Sagat", "Zangief", "Balrog", "Vega", "M. Bison"],
      playerOneRounds: 0,
      playerTwoRounds: 0
    }
  },
  computed: {
    winner(){
      return this.playerOneRounds > this.playerTwoRounds ? this.fixture.playerOne : this.fixture.playerTwo
    }
  },
  methods: {
    handleSubmit(e){
      e.preventDefault();

      this.fixture.winner = this.winner;

      console.log(this.fixture);

      //PUT REQUEST TO FIXTURE TO RECORD CHOSEN FIGHTERS AND WINNER
      //PUT REQUEST TO UPDATE WINNER



      eventBus.$emit('result-recorded', this.winner)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
