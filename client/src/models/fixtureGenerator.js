const dayjs = require('dayjs');
const Fixture = require('./Fixture');
const _ = require('lodash');

export const FixtureGenerator = function(players, rounds = 1){
  this.players = players;
  this.rounds = rounds;
}

FixtureGenerator.prototype.generateRoundRobins = function () {
  let permutations = [];
  for(let x = 0; x < this.rounds; x++){
    this.players.forEach((player, index) => {
      for (let i = index + 1; i < this.players.length; i++){
        permutations.push([player, this.players[i]]);
      }
    })
  }
  return permutations;
};

FixtureGenerator.prototype.dateMaker = function (startDate, endDate) {
  const dates = [];
  let currentDate = startDate;
  while(currentDate.isBefore(endDate)){
    dates.push(currentDate);
    currentDate.day() === 5 ? currentDate = currentDate.add(3, 'days') : currentDate = currentDate.add(1, 'days');
  }
  dates.push(endDate);
  return dates;
};

FixtureGenerator.prototype.shuffler = function (array) {
  for (let index = array.length - 1; index > 0; index --) {
    let randomIndex = Math.floor(Math.random() * (index + 1));
    let displacedElement = array[index];
    array[index] = array[randomIndex];
    array[randomIndex] = displacedElement;
  }
  return array;
};

FixtureGenerator.prototype.generateFixtures = function (startDate, endDate) {
  const matchups = this.generateRoundRobins();
  const dates = this.dateMaker(startDate, endDate);

  matchups.forEach(array => this.shuffler(array));

  const shuffledMatchups = this.shuffler(matchups);

  const gamesPerDay = matchups.length/dates.length

  const chunkedMatchups = _.chunk(shuffledMatchups, gamesPerDay);

  const fixturesSplitByDay = [];

  dates.forEach((date, index) => {
    const gamesForDate = chunkedMatchups[index];
    const fixturesForDate = gamesForDate.map(matchup => new Fixture(matchup[0], matchup[1], date));
    fixturesSplitByDay.push(fixturesForDate);
  });

  const fixtures = _.flatten(fixturesSplitByDay);

  return fixtures;
}
