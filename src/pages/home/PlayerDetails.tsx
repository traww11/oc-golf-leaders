import React, { useMemo, useRef } from 'react';
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import RoundDetails from './RoundDetails';
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
  player: Player
}

function PlayerDetails({ player }: Props) {

  const score = (player: any, round: number): number => {
    const list: Array<any> = golfers;
    var test = list.find(({ name }: Golfer) => name === player.name)
    if (test) {
      return test.scores[round];
    }
    return 0;
  }

  const total = (round: Round): number => {
    return round.players.reduce((accumulator: any, object: any) => accumulator + score(object, round.round - 1), 0);
  };

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        id: 'round',
        accessorKey: 'round', //simple recommended way to define a column
        header: 'Round #',
        sortingFn: 'alphanumeric'
      },
      {
        id: 'score',
        header: 'Score',          
        accessorFn: (row) => total(row),
      }
    ],
    [],
  );

    //Or, optionally, you can get a reference to the underlying table instance
    const tableInstanceRef = useRef(null);

    return (
        <MaterialReactTable 
            columns={columns} 
            data={player.rounds}
            enableColumnOrdering //enable some features
            enablePagination={false} //disable a default feature
            enableTopToolbar={false}
            initialState={{
              sorting: [
                    {
                      id: 'round', //then sort by lastName if age is the same
                      desc: false,
                    },
                ],
            }}
            tableInstanceRef={tableInstanceRef} //get a reference to the underlying table instance (optional)
            renderDetailPanel={({ row: { original } }) => {
              return (
                <Box>
                  <RoundDetails round={original} />
                </Box>
              )
            }}
        />
    );
}
  
export default PlayerDetails;