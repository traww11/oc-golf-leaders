import React, { useMemo, useRef } from 'react';
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import golfers from './golfers.json';
import { bottomThree } from '../../utils/utils';
import { Box } from '@mui/material';

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

  const cut = bottomThree(round);

  const score = (player: any, round: number): number => {
    const list: Array<any> = golfers;
    var test = list.find(({ name }: Golfer) => name === player.name)
    if (test) {
      return test.scores[round];
    }
    return 0;
  }

  const renderScore = (value: any, name: string) => {
    if (cut.find(golfer => golfer.name == name)) {
      return (
        <Box component="span" sx={(theme) => ({
          backgroundColor: theme.palette.error.dark,
          borderRadius: '0.25rem',
          color: '#fff',
          maxWidth: '9ch',
          p: '0.25rem',
        })}>
          { value }
        </Box>
      );
    }
    return value;
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
        Cell: ({ cell, row: { original: { name } } }) => renderScore(cell.getValue(), name)
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