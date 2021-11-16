import { useEffect, useState, Fragment } from "react";
import * as React from 'react';
/*import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';*/
import {API, Auth} from 'aws-amplify';
import swal from 'sweetalert';
import * as queries from '../../graphql/queries';

/*const StyledTableCell = styled(TableCell)(({ theme }) => ({
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
*/
const MisEquipos = () => {
    const [listTeams, setListTeams] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    var [array, setArrayBusqueda] = useState([]);
    const [union, setUnion]= useState();
    const [userCreator, setUserCreator] = useState('');

    useEffect(() =>{
        async function getAllTeams(){
            const allTeams = await API.graphql({query: queries.listTeams});
            setListTeams(allTeams.data.listTeams.items);  
        }
        getAllTeams();
        Auth.currentAuthenticatedUser().then(user => {
            setUserCreator(user.username);
          })
       
    });

    const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda=listTeams.filter((elemento)=>{
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
            swal({
                title: "No ingresó una búsqueda",
                text: "Introduzca algo para buscar",
                icon: "warning",
                button: "Aceptar",
            });
           return
       }
       filtrar(busqueda);
     
   }


   const unirmeTeam = (e) => {
       setUnion(e.target.value)
       console.log(e.target.value)
       swal({
            title: "Solitud enviada con éxito",
            text: "El equipo revisará su solicitud",
            icon: "success",
            button: "Aceptar",
        });
   }

    return (
        <Fragment>
            <div className="container">
                <form class="px-2 mx-auto mt-3 w-75 d-flex" onSubmit={buscador}>
                    <input
                        class="form-control inputBuscar mr-sm-2"
                        name="buscador"
                        value={busqueda}
                        placeholder="Buscar por nombre de equipo"
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <button type="submit" className="btn btn-success mt-2 mb-2 mx-2 h-25">Buscar</button>
                </form>
            </div>
            <div class="container rounded bg-dark mt-3 mb-5"><br></br>
                <div class="container-fluid col-md-4 rounded bg-white">
                    <div class="row">
                        <h1 class ="display-1">Mis equipos</h1>
                    </div>
                </div><br></br>
                {listTeams && listTeams.map(item => {
                    /*if(item.userCreator == userCreator){*/
                        return(
                       
                          <div class="container-fluid col-md-5 rounded bg-white mt-4 mb-5">
                            <div class="row">
                                <p key={item.id} >
                                    <h1>Nombre del equipo</h1>
                                    <h2>{item.name}</h2><br></br>
                                    <button className="btn btn-primary btn-lg" /*onClick={() => cambiarEstadoModal(!estadoModal)}*/>Modificar</button>
                                    <button className="btn btn-danger btn-lg" value={item.id} /*onClick={confirmacionDelete}*/>Eliminar</button>
                                </p>
                            </div>
                            {/* <Modal
                                estado={estadoModal}
                                cambiarEstado={cambiarEstadoModal}
                                titulo="Modificar torneo"
                                mostrarHeader={true}
                                mostrarOverlay={true}
                                posicionModal={'center'}
                                padding={'20px'}
                                key={item.id}
                            >
                                <Contenido>
                                
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <div class="col-md">
                                        <label class="labels">Nombre del torneo</label>
                                        <input  className="form-control"
                                        placeholder="Ingrese el nombre del torneo"  
                                        type="text" 
                                        name="name" 
                                        onChange={handleInputChange}/>
                                    </div>  
                                </div>
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <div class="col-md">
                                        <label class="labels">Nombre del deporte</label>
                                        <input className="form-control"
                                        placeholder={item.sport} 
                                        type="text" 
                                        name="sport" 
                                        //value={item.sport}
                                        onChange={handleInputChange}/> 
                                    </div>
                                </div>
                                <div class="mb-3">
                                <div class="row">
                                <div class="col-md">
                                    <label class="labels">Fecha de inicio del torneo</label>
                                    <input className="form-control" 
                                    type="date" 
                                    name="startDate" 
                                    //value={item.startDate}
                                    onChange={handleInputChange}/>
                                </div>
                                <div class="col-md">
                                        <label class="labels">Fecha de finalización del torneo</label>
                                        <input className="form-control" 
                                        type="date" 
                                        name="endDate" 
                                        //value={item.endDate}
                                        onChange={handleInputChange}/> 
                                    </div>
                                </div>
                            </div>    
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <div class="col-md">
                                    <label class="labels">Descripción del torneo</label>
                                    <textarea className="form-control"
                                    placeholder="Ingrese la descripcion"
                                    type="text" 
                                    name="description" 
                                    //value={item.description}
                                    onChange={handleInputChange}/> 
                                </div>
                            </div>
                                    <Boton  onClick={() => {cambiarEstadoModal(!estadoModal); confirmacionModify(item.id, userCreator)}}>Guardar cambios</Boton>
                                </Contenido>
                            </Modal>*/ }
                            
                             </div> 
                
                        
                
                )}/*}*/)} 
                </div>

  </Fragment>
    ); 
        /*<div className="container">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <form class="px-2 mx-auto mt-3 mb-3 w-75 d-flex" onSubmit={buscador}>
                        <input
                            class="form-control inputBuscar mr-sm-2"
                            name="buscador"
                            value={busqueda}
                            placeholder="Buscar por nombre de equipo"
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                        <button type="submit" className="btn btn-success mt-2 mb-2 mx-2 h-25">Buscar</button>
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

    );*/
};

export default MisEquipos;