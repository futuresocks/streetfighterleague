const assert = require('assert');
const Fixture = require('../Fixture.js');
const Player = require('../Player.js');
const dayjs = require('dayjs');
const FixtureGenerator = require('../fixtureGenerator.js');

describe('fixture generator', () => {

  let players, player1, player2, player3, startDate, endDate, weekdayEndDate, fixtureGenerator;

  beforeEach(() => {
    player1 = new Player("Colin");
    player2 = new Player("Kane");
    player3 = new Player("Stevie");
    players = [player1, player2, player3];
    startDate = dayjs('2019-03-04') //This is a Monday
    endDate = dayjs('2019-03-08') //This is a Friday
    weekendEndDate = dayjs('2019-03-11') //The following Monday
    expectedDates = [startDate, dayjs('2019-03-05'), dayjs('2019-03-06'), dayjs('2019-03-07'), endDate];
    fixtureGenerator = new FixtureGenerator(players);
  })

  it('should be able to create round robins', () => {
    const expected = [
      [player1, player2],
      [player1, player3],
      [player2, player3]
    ];
    assert.deepStrictEqual(fixtureGenerator.generateRoundRobins(), expected);
  });

  it('should be able to create round robins for multiple rounds', () => {
    let fixtureGenerator = new FixtureGenerator(players, 2)
    const expected = [
      [player1, player2],
      [player1, player3],
      [player2, player3],
      [player1, player2],
      [player1, player3],
      [player2, player3]
    ];
    assert.deepStrictEqual(fixtureGenerator.generateRoundRobins(), expected);
  });

  it('should be able to create a range of dates', () => {
    const actual = fixtureGenerator.dateMaker(startDate, endDate);
    assert.deepStrictEqual(actual, expectedDates);
  });

  it('should be able to create dates, ignoring weekends', () => {
    const actual = fixtureGenerator.dateMaker(startDate, weekendEndDate);
    expectedDates.push(weekendEndDate)
    assert.deepStrictEqual(actual, expectedDates);
  });

  it('should be able to create fixtures');

})
