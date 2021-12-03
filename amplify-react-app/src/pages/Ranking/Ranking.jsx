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
      <div class="container text-center mt-3 mb-3">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 5 }} aria-label="customized table">
              <TableHead>
                  <TableRow>
                    <StyledTableCell align="center" width="120">
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
                    <StyledTableCell align="center">Equipo</StyledTableCell>
                    <StyledTableCell align="center">Puntos</StyledTableCell>
                  </TableRow>
                </TableHead>
              <TableBody>
                    {listTorneos.map((item) => {
                        if(item.name == torneo){
                          return(
                            <StyledTableRow align="center">
                              <StyledTableCell align="center" component="th" scope="row">
                                {item.name}
                              </StyledTableCell>
                                <StyledTableCell align="center">
                                  {item.teams.map(m=>
                                    <div class="container text-center">
                                      <hr /><StyledTableCell component="th" scope="row">{m}</StyledTableCell> 
                                    </div>
                                  )}
                                </StyledTableCell>
                              <StyledTableCell align="center">
                                <hr />
                                <br></br>
                                12<br></br><br></br><hr />
                                <br></br>
                                8 <br></br><br></br><hr />
                                <br></br>
                                6 <br></br><br></br><hr />
                                <br></br>
                                1 <br></br><br></br><hr />
                              </StyledTableCell>
                            </StyledTableRow>
                          )  
                        }
                      }  
                    )}
              </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
   

  }
  export default Ranking