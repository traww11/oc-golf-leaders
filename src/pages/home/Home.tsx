import React, { useEffect, useMemo, useRef, useState } from 'react';
import golfers from './golfers.json';
import players from './players.json';
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import PlayerDetails from './PlayerDetails';
import { total } from '../../utils/utils';

interface Golfer {
  name: string;
}

interface Player {
  name: string;
  rounds: Array<Round>;
}

interface Round {
  players: Array<Golfer>;
}

function Home() {
  // const score = (player: any, round: number): number => {
  //   const list: Array<any> = golfers;
  //   var test = list.find(({ name }: Golfer) => name === player.name)
  //   if (test) {
  //     return test.scores[round];
  //   }
  //   return 0;
  // }
  
  // const total = (player: Player): number => {
  //   var sum = 0;
  //   player.rounds.forEach(({ players }, i) => {
  //     sum += players.reduce((accumulator: any, object: any) => accumulator + score(object, i), 0);
  //   });
  //   return sum;
  // };

  const sum = ({ rounds }: Player) => {
    return rounds.reduce((accumulator: any, object: any) => accumulator + total(object), 0);
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
          accessorFn: (row) => sum(row)
        }
      ],
      [],
    );
    
    //optionally, you can manage any/all of the table state yourself
    const [rowSelection, setRowSelection] = useState({});
    
    useEffect(() => {
    //do something when the row selection changes
    }, [rowSelection]);

    //Or, optionally, you can get a reference to the underlying table instance
    const tableInstanceRef = useRef(null);

    return (
        <MaterialReactTable 
            columns={columns} 
            data={players} 
            enableColumnOrdering //enable some features
            enablePagination={false} //disable a default feature
            enableRowNumbers
            rowNumberMode='static'
            initialState={{
              sorting: [
                    {
                      id: 'score', //then sort by lastName if age is the same
                      desc: false,
                    },
                ],
            }}
            tableInstanceRef={tableInstanceRef} //get a reference to the underlying table instance (optional)
            renderDetailPanel={({ row: { original } }) => (
              <Box>
                <PlayerDetails player={original} />
              </Box>
            )}
        />
    );
}
  
export default Home;