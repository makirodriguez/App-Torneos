import { useState, useEffect, Fragment } from 'react';
import {API, Auth} from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import swal from 'sweetalert';
import styled from 'styled-components';
import Modal from './Modal'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled as styled2 } from '@mui/material/styles';

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

export const  MisTorneos =() =>{

    const [busqueda, setBusqueda] = useState('');
    var [array, setArrayBusqueda] = useState([]);
    const [listTorneos, setListTorneos] = useState([]);
    const [estadoModal, cambiarEstadoModal] = useState(false);
    const [userCreator, setUserCreator] = useState('');
    const [union, setUnion]= useState();
    const [updateTorneo, setUpdateTorneo] = useState({
        id: '',
        name: '',
        sport: '',
        startDate: '',
        endDate: '',
        description: '',
        userCreator:'',
        teams:''
    });
    
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

 
    const confirmacionDelete = async (id) => {
        swal({
            title:"¿Está seguro que desea eliminar el torneo?",
            text:"Confirme la acción",
            icon:"warning",
            buttons: ["No", "Si"]
        }).then(respuesta=>{
              if(respuesta){
                swal({
                  title:"Torneo eliminado con éxito",
                  icon:"success",
                  button:"Aceptar",
                })
                  const DeleteTorneoInput={
                      id: id.target.value
                  }
                  API.graphql({query: mutations.deleteTorneo, variables: {input: DeleteTorneoInput}});
              }
        })
    }

    const handleInputChange = (e) =>{
        setUpdateTorneo({...updateTorneo, [e.target.name]: e.target.value})
    
      }

     
    const confirmacionModify = async (id, userCreator) => {

       const UpdateTorneoInput={
        id: id,
        name: updateTorneo.name,
        sport: updateTorneo.sport,
        startDate: updateTorneo.startDate,
        endDate: updateTorneo.endDate,
        description: updateTorneo.description,
        userCreator: userCreator,
        teams:''
      }
      await API.graphql({query: mutations.updateTorneo, variables: {input: UpdateTorneoInput}});
      swal({
        title:"Torneo modificado con éxito",
        icon:"success",
        button:"Aceptar",
        timer:"5000"
    });
      
  }  

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

    const unirmeTorneo = (e) => {
        setUnion(e.target.value)
        console.log(e.target.value)
        swal({
             title: "Solitud enviada con éxito",
             text: "El creador del torneo revisará su solicitud",
             icon: "success",
             button: "Aceptar",
         });
    }

    return (
        <Fragment>
            <div className="container">
                <form class="px-2 mx-auto mt-3 w-75 d-flex mb-3" onSubmit={buscador}>
                    <input
                        class="form-control inputBuscar mr-sm-2"
                        name="buscador"
                        value={busqueda}
                        placeholder="Buscar torneo para unirse por nombre"
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
                                            <button  onClick={unirmeTorneo} value={item.id}>Enviar solicitud</button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                </TableContainer>
            </div>
            <div class="container rounded bg-dark mt-3 mb-3"><br></br>
                <div class="container-fluid col-md-4 rounded bg-white">
                    <div class="row">
                        <h1 class ="display-1">Mis torneos</h1>
                    </div>
                </div><br></br>
                {listTorneos && listTorneos.map(item => {
                    if(item.userCreator === userCreator){
                        return(
                       
                          <div class="container-fluid col-md-5 rounded bg-white mt-4 mb-5">
                            <div class="row">
                                <p key={item.id} >
                                    <h1>Nombre del torneo</h1>
                                    <h2>{item.name}</h2><br></br>
                                    <h1>Deporte</h1>
                                    <h2>{item.sport}</h2><br></br>
                                    <h1>Fecha de inicio: {item.startDate}</h1><br></br>
                                    <h1>Fecha de fin: {item.endDate}</h1><br></br>
                                    <h1>Descripción: {item.description}</h1><br></br><br></br>
                                  
                                    <button className="btn btn-primary btn-lg" onClick={() => cambiarEstadoModal(!estadoModal)}>Modificar</button>
                                    <button className="btn btn-danger btn-lg" value={item.id} onClick={confirmacionDelete}>Eliminar</button>
                                </p>
                            </div> 
                            <Modal
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
                            </Modal>
                            
                             </div> 
                
                        
                
                )}})} 
                </div>

  </Fragment>
    ); 
    

}
 
export default MisTorneos;

/* const ContenedorBotones = styled.div`
	padding: 40px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 20px;
`; */

const Boton = styled.button`
	display: block;
	padding: 10px 30px;
	border-radius: 100px;
	color: #fff;
	border: none;
	background: #1766DC;
	cursor: pointer;
	font-family: 'Roboto', sans-serif;
	font-weight: 500;
	transition: .3s ease all;
	&:hover {
		background: #0066FF;
	}
`;

const Contenido = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	h1 {
		font-size: 42px;
		font-weight: 700;
		margin-bottom: 10px;
	}
	p {
		font-size: 18px;
		margin-bottom: 20px;
	}
	img {
		width: 100%;
		vertical-align: top;
		border-radius: 3px;
	}
`;


