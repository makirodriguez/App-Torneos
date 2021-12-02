import { useState, useEffect, Fragment } from 'react';
import {API, Auth} from 'aws-amplify';
import swal from "sweetalert";
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import cancha from '../../imagenes/cancha.jpg'
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import Modal from './Modal'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import { styled as styled2 } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, green } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import '../../App.css';
import { CompressOutlined } from '@mui/icons-material';


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


const ExpandMore = styled2((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export const  MisTorneos =() =>{

    const [busqueda, setBusqueda] = useState('');
    const [expanded, setExpanded] = React.useState(false);
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
    const [listTeams, setListTeams] = useState([]);
    const [team, setTeam] = useState('');
    useEffect(() =>{
        async function getAllTorneos(){
            const allTorneos = await API.graphql({query: queries.listTorneos});
            setListTorneos(allTorneos.data.listTorneos.items);  
        }
        getAllTorneos()
        async function getAllTeams(){
            const allTeams = await API.graphql({query: queries.listTeams});
            setListTeams(allTeams.data.listTeams.items);  
        }
        getAllTeams()
        
        Auth.currentAuthenticatedUser().then(user => {
            setUserCreator(user.username);
          })
       
    }, []);


    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
    
  

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
                      id: id
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

    const solicitudes =[];

    const unirmeTorneo = (e) => {
        setUnion(e.target.value)
        solicitudes.push(team)
        listTorneos.map(e=>{
            if(e.id == union){
                e.teams.map(m=>{
                    solicitudes.push(m)
                    console.log(solicitudes)
                    const UpdateTorneoInput={
                        id: e.id,
                        name: e.name,
                        sport: e.sport,
                        startDate: e.startDate,
                        endDate: e.endDate,
                        description: e.description,
                        userCreator: e.userCreator,
                        teams:solicitudes
                      }
                       API.graphql({query: mutations.updateTorneo, variables: {input: UpdateTorneoInput}});
                })
                
            }
        })
        swal({
             title: "Solitud enviada con éxito",
             text: "El creador del torneo revisará su solicitud",
             icon: "success",
             button: "Aceptar",
         });
    }

    const handleChange = (e) => {
        setTeam(e.target.value);
        console.log(team)
      };

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
                                    <StyledTableCell>Equipo</StyledTableCell>
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
                                            <select
                                            className="custom-select my-1 mr-2"
                                            id="inlineFormCustomSelect"
                                            name="team"
                                            value={team}
                                            onChange={handleChange}
                                          >
                                            <option default>
                                              Equipo para unirse
                                            </option>
                                            {listTeams.map((i) => (
                                              <option value={i.name}>{i.name}</option>
                                            ))}
                                          </select>
                                            
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <button  className="btn btn-success mt-2 mb-2 mx-2 h-25" value={item.id} onClick={unirmeTorneo}>Enviar solicitud</button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                </TableContainer>
                
            </div>
            <div class="container">
                <div class="d-flex overflow-scroll mt-3">
                        {listTorneos && listTorneos.map(item => {


                            return(
                            <div class="d-flex col-md-3">
                                <div>
                                <Card sx={{ maxWidth: 345 }}>
                                <CardHeader
                                    avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        F
                                    </Avatar>
                                    }
                                    action={
                                    <IconButton aria-label="send" href='/ranking'>
                                    <SendIcon />
                                    </IconButton>
                                    }
                                    title={item.name}
                                />
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={cancha}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        Deporte: {item.sport} <br></br>
                                        Fecha de inicio: {item.startDate} <br></br>
                                        Fecha de fin: {item.endDate} 
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                
                                <Fab size="small" sx={{ bgcolor: red[500] }} color="primary" aria-label="delete" >
                                <DeleteIcon onClick={() => confirmacionDelete(item.id)} />
                                </Fab>
                            
                                &nbsp;&nbsp;
                                <Fab size="small" sx={{ bgcolor: green[500] }} color="primary" aria-label="edit">
                                <EditIcon onClick={() => cambiarEstadoModal(!estadoModal)}/>
                                </Fab>
                                    <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                    >
                                    <ExpandMoreIcon />
                                    </ExpandMore>
                                </CardActions>
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                    <Typography paragraph>Descripcion:</Typography>
                                    <Typography paragraph>
                                        {item.description}
                                    </Typography>
                                    </CardContent>
                                </Collapse>
                                </Card>
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
                                            placeholder={item.name} 
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
                                        onChange={handleInputChange}/>
                                    </div>
                                    <div class="col-md">
                                            <label class="labels">Fecha de finalización del torneo</label>
                                            <input className="form-control" 
                                            type="date" 
                                            name="endDate" 
                                            onChange={handleInputChange}/> 
                                        </div>
                                    </div>
                                </div>    
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <div class="col-md">
                                        <label class="labels">Descripción del torneo</label>
                                        <textarea className="form-control"
                                        placeholder={item.description}
                                        type="text" 
                                        name="description" 
                                        onChange={handleInputChange}/> 
                                    </div>
                                </div>
                                        <Boton  onClick={() => {cambiarEstadoModal(!estadoModal); confirmacionModify(item.id, userCreator)}}>Guardar cambios</Boton>
                                    </Contenido>
                                </Modal>
                                
                                </div> 
                                
                    
                            
                    
                    )})} 
                    
                    </div>
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

