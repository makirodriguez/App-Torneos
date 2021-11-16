import { useState, useEffect, Fragment } from 'react';
import {API, Auth} from 'aws-amplify';
import swal from "sweetalert";
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import cancha from '../../imagenes/cancha.jpg'
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import Modal from './Modal'
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import '../../App.css';



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

       const [listTorneos, setListTorneos] = useState([]);
       const [expanded, setExpanded] = React.useState(false);
       const [estadoModal, cambiarEstadoModal] = useState(false);
       const [userCreator, setUserCreator] = useState('');
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

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
    
    const expandirTorneo = () => {

    }

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



    return (
        <Fragment>
<div class="d-flex overflow-auto position-absolute top-50 start-50 translate-middle h-75 w-75">
                    {listTorneos && listTorneos.map(item => {
                    if(item.userCreator == userCreator){
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
                                <IconButton aria-label="share">
                                <ShareIcon />
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


