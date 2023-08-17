import golfers from '../pages/home/golfers.json';

interface Golfer {
  name: string;
  scores: Array<number>;
}

interface Player {
  name: string;
  rounds: Array<Round>;
}

interface Round {
  round: number;
  players: Array<Golfer>;
}

export const total = ({ players, round }: Round): number => {
  const list: Array<any> = golfers;
  return players.map(player => list.find(({ name }: Golfer) => name === player.name).scores[round - 1])
    .sort((a, b) => a - b)
    .slice(0, 5)
    .reduce((accumulator: any, object: any) => accumulator + object, 0);
}

export const bottomThree = ({ players, round }: any): Array<any> => {
  const list: Array<any> = golfers;
  return players.map((player: any) => list.find(({ name }: Golfer) => name === player.name))
    .sort((a: any, b: any) => a.scores[round - 1] - b.scores[round - 1])
    .slice(5);
}