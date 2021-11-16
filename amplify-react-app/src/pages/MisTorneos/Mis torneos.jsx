import { useState, useEffect, Fragment } from 'react';
import {API, Auth} from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import swal from 'sweetalert';
import styled from 'styled-components';
import Modal from './Modal'


export const  MisTorneos =() =>{

       const [listTorneos, setListTorneos] = useState([]);
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



    return (
        <Fragment>
            <div class="container rounded bg-dark mt-5 mb-5"><br></br>
                <div class="container-fluid col-md-4 rounded bg-white mb-5">
                    <div class="row">
                        <h1 class ="display-1">Mis torneos</h1>
                    </div>
                </div>
                {listTorneos && listTorneos.map(item => {
                    if(item.userCreator == userCreator){
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


