import { useEffect, useState } from "react";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {API, Auth} from 'aws-amplify';
import * as queries from '../../graphql/queries';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const MisEquipos = () => {
    const [listTorneos, setListTorneos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    var [array, setArrayBusqueda] = useState([]);
    const [union, setUnion]= useState();
    const [userCreator, setUserCreator] = useState('');

    useEffect(() =>{
        async function getAllTorneos(){
            const allTorneos = await API.graphql({query: queries.listTorneos});
            setListTorneos(allTorneos.data.listTorneos.items);  
        }
        getAllTorneos();
        Auth.currentAuthenticatedUser().then(user => {
            setUserCreator(user.username);
          })
       
    });

    const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda=listTorneos.filter((elemento)=>{
               if(((elemento.name.toString().toLowerCase()).includes(terminoBusqueda.toLowerCase())))
               {
                   return elemento;
               }                      
         }); 
         setArrayBusqueda(resultadosBusqueda)
       } 
    

   const buscador = (e) =>{
       e.preventDefault()
       if(!busqueda.trim()){
           window.alert("Ingrese su busqueda")
           return
       }
       filtrar(busqueda);
     
   }


   const unirmeTorneo = (e) => {
       setUnion(e.target.value)
       console.log(e.target.value)
       window.alert('Te uniste exitosamente') 
  
   }

    return (
        <div className="container">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" onSubmit={buscador}>
                        <input
                            className="form-control inputBuscar"
                            name="buscador"
                            value={busqueda}
                            placeholder="Búsqueda por Usuario o Torneo"
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary mt-2">Buscar</button>
                    </form>
                   
                     <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 5 }} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>Torneo</StyledTableCell>
                                <StyledTableCell>Fecha de inicio</StyledTableCell>
                                <StyledTableCell>Fecha de fin</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {array.map((item) => (
                                <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    {item.name}
                                </StyledTableCell>
                                <StyledTableCell>{item.startDate}</StyledTableCell>
                                <StyledTableCell>{item.endDate}</StyledTableCell>
                                <StyledTableCell>
                                <button  onClick={unirmeTorneo} value={item.id} >Unirme</button>
                                </StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer> 

                </div>
            </div>

    );
};

export default MisEquipos;