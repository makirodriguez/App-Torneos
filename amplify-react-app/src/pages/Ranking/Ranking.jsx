import { useEffect, useState, Fragment } from "react";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {API, Auth} from 'aws-amplify';
import swal from 'sweetalert';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { styled as styled2 } from '@mui/material/styles';
import styled  from 'styled-components';
import '../../App.css';


const StyledTableCell = styled2(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled2(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const Ranking = () => {
    const [listTorneos, setListTorneos] = useState([]);
    const [torneo, setTorneo]= useState('');
    useEffect(() =>{
        async function getAllTorneos(){
            const allTorneos = await API.graphql({query: queries.listTorneos});
            setListTorneos(allTorneos.data.listTorneos.items);  
        }
        getAllTorneos()
        
       /*  Auth.currentAuthenticatedUser().then(user => {
            setUserCreator(user.username);
          }) */
       
    }, []);

    const handleChange = (e) => {
        setTorneo(e.target.value);
        
      };

    return(

        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 5 }} aria-label="customized table">
            <TableHead>
                <TableRow>
                <StyledTableCell>
                                            <select
                                            className="custom-select my-1 mr-2"
                                            id="inlineFormCustomSelect"
                                            name="team"
                                            value={torneo}
                                            onChange={handleChange}
                                          >
                                            <option default>
                                                Seleccione un torneo
                                            </option>
                                            {listTorneos.map((i) => (
                                              <option value={i.name}>{i.name}</option>
                                            ))}
                                          </select>
                                            
                                        </StyledTableCell>
                    <StyledTableCell>Equipo</StyledTableCell>
                    <StyledTableCell>Puntos</StyledTableCell>
                   
                </TableRow>
            </TableHead>
            <TableBody>
                {listTorneos.map((item) => {
                    if(item.name == torneo){
                       return(
                        <StyledTableRow>
                        <StyledTableCell component="th" scope="row">{item.name}</StyledTableCell>
                        <StyledTableRow>
                        {item.teams.map(m=>
                        <StyledTableCell component="th" scope="row">{m}<br></br></StyledTableCell>
                            )}
                        </StyledTableRow>

                        <StyledTableCell>
                            0
                        </StyledTableCell>
                    </StyledTableRow>
                       )
                        
                    }
                }
                    
                )}
            </TableBody>
        </Table>
    </TableContainer> 
    );
   

  }
  export default Ranking