import React, { useMemo, useRef } from 'react';
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import golfers from './golfers.json';

interface Golfer {
  name: string;
}

interface Player {
  name: string;
  rounds: Array<Round>;
}

interface Round {
  round: number;
  players: Array<Golfer>;
}

interface Props {
  round: Round
}

function RoundDetails({ round }: Props) {

  const score = (player: any, round: number): number => {
    const list: Array<any> = golfers;
    var test = list.find(({ name }: Golfer) => name === player.name)
    if (test) {
      return test.scores[round];
    }
    return 0;
  }

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'name', //simple recommended way to define a column
        header: 'Name',
      },
      {
        id: 'score',
        header: 'Score',          
        accessorFn: (row) => score(row, round.round - 1),
      }
    ],
    []
  );

    return (
      <MaterialReactTable 
        columns={columns} 
        data={round.players}
        enablePagination={false} //disable a default feature
        enableTopToolbar={false}
        initialState={{
          sorting: [
              {
                id: 'score',
                desc: false,
              },
          ],
        }}
      />
    );
}
  
export default RoundDetails;