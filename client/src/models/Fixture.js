const Fixture = function(playerOne, playerTwo, date){
  this.playerOne = playerOne;
  this.playerTwo = playerTwo;
  this.fighterOne = null;
  this.fighterTwo = null;
  this.date = date;
  this.winner = null;
}

module.exports = Fixture
