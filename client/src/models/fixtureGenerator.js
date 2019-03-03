const dayjs = require('dayjs');
const Fixture = require('./fixture');

const FixtureGenerator = function(players, rounds = 1){
  this.players = players;
  this.rounds = rounds;
}

FixtureGenerator.prototype.generateRoundRobins = function () {
  permutations = [];
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

FixtureGenerator.prototype.generateFixtures = function (startDate, endDate) {
  const matchups = this.generateRoundRobins;
  const dates = this.dateMaker(startDate, endDate);

};

module.exports = FixtureGenerator;
