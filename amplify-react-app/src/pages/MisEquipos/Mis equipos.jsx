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
import Modal from './Modal'
import * as mutations from '../../graphql/mutations';
import { styled as styled2 } from '@mui/material/styles';
import styled  from 'styled-components';
import { chainPropTypes } from "@mui/utils";

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


const MisEquipos = () => {
    const [listTeams, setListTeams] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    var [array, setArrayBusqueda] = useState([]);
    const [union, setUnion]= useState('');
    const [userCreator, setUserCreator] = useState('');
    const [estadoModal, cambiarEstadoModal] = useState(false);
    const [updateTeam, setUpdateTeam] = useState({
        id: '',
        name: '',
        users:'',
        userCreator:''
    });
    const [email, setEmail]= useState('');

    useEffect(() =>{
        async function getAllTeams(){
            const allTeams = await API.graphql({query: queries.listTeams});
            setListTeams(allTeams.data.listTeams.items);  
        }
        getAllTeams();
        Auth.currentAuthenticatedUser().then(user => {
            setUserCreator(user.username);
            setEmail(user.attributes.email);
            
           
          })
       
    }, []);


    const confirmacionDelete = async (id) => {
        swal({
            title:"¿Está seguro que desea eliminar el equipo?",
            text:"Confirme la acción",
            icon:"warning",
            buttons: ["No", "Si"]
        }).then(respuesta=>{
              if(respuesta){
                swal({
                  title:"Equipo eliminado con éxito",
                  icon:"success",
                  button:"Aceptar",
                })
                  const DeleteTeamInput={
                      id: id.target.value
                  }
                  API.graphql({query: mutations.deleteTeam, variables: {input: DeleteTeamInput}});
              }
        })
    }

    const handleInputChange = (e) =>{
        setUpdateTeam({...updateTeam, [e.target.name]: e.target.value})
    
      }

     
    const confirmacionModify = async (id) => {

       const UpdateTeamInput={
        id: id,
        name: updateTeam.name,
        users:solicitudes,
        userCreator: email
      }
      await API.graphql({query: mutations.updateTeam, variables: {input: UpdateTeamInput}});
      swal({
        title:"Equipo modificado con éxito",
        icon:"success",
        button:"Aceptar",
        timer:"5000"
    });
      
  }  

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

   const solicitudes =[];

   const unirmeTeam = async (e) => {
       setUnion(e.target.value)
       solicitudes.push(email)
       
       listTeams.map(e=>{
           if(e.id == union){
                e.users.map(m=> {
                    solicitudes.push(m)                
                   /* solicitudes.map(n=>{
                         if(n === m){
                            swal({
                                title: "Ya enviaste una solicitud al equipo",
                                text: "Aguarde que el equipo acepte su solicitud",
                                icon: "error",
                                button: "Aceptar",
                            });       
                        }
                        else{  */
                            const UpdateTeam = {
                                id: e.id,
                                name: e.name,
                                users: solicitudes
                            }
                            API.graphql({query: mutations.updateTeam, variables: {input: UpdateTeam}});
                            swal({
                                title: "Solitud enviada con éxito",
                                text: "El equipo revisará su solicitud",
                                icon: "success",
                                button: "Aceptar",
                            });              
                    /*    }
                    }) */
            })
                
             }          
        })       
    }
   
    return (
        <Fragment>
            <div className="container">
                <form class="px-2 mx-auto mt-3 w-75 d-flex mb-3" onSubmit={buscador}>
                    <input
                        class="form-control inputBuscar mr-sm-2"
                        name="buscador"
                        value={busqueda}
                        placeholder="Buscar equipo para unirse por nombre"
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <button type="submit" className="btn btn-success mt-2 mb-2 mx-2 h-25">Buscar</button>
                </form>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 5 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Equipo</StyledTableCell>
                                <StyledTableCell>Creador</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {array.map((item) => (
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">{item.name}</StyledTableCell>
                                    <StyledTableCell component="th" scope="row">{item.userCreator}</StyledTableCell>
                                    <StyledTableCell>
                                    <button className="btn bg-success"
                                    onClick={unirmeTeam} value={item.id}>Enviar solicitud</button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> 
            </div>
            <div class="container rounded bg-dark mt-3 mb-5"><br></br>
                <div class="container-fluid col-md-4 rounded bg-white">
                    <div class="row">
                        <h1 class ="display-1">Mis equipos</h1>
                    </div>
                </div><br></br>
                {listTeams && listTeams.map(item => {
                    if(item.userCreator == email){
                        return(
                          <div class="container-fluid col-md-5 rounded bg-white mt-4 mb-5">
                            <div class="row">
                                <p key={item.id} >
                                    <h1>Nombre del equipo</h1>
                                    <h2>{item.name}</h2><br></br>
                                    <button className="btn btn-primary btn-lg" onClick={() => cambiarEstadoModal(!estadoModal)}>Modificar</button>
                                    <button className="btn btn-danger btn-lg" value={item.id} onClick={confirmacionDelete}>Eliminar</button>
                                </p>
                            </div>
                            <Modal
                                estado={estadoModal}
                                cambiarEstado={cambiarEstadoModal}
                                titulo="Modificar equipo"
                                mostrarHeader={true}
                                mostrarOverlay={true}
                                posicionModal={'center'}
                                padding={'20px'}
                                key={item.id}
                            >
                                <Contenido>
                                
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <div class="col-md">
                                        <label class="labels">Nombre del equipo</label>
                                        <input  className="form-control"
                                        placeholder="Ingrese el nombre del equipo"  
                                        type="text" 
                                        name="name" 
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
};

export default MisEquipos;


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