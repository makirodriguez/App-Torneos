import { useState, useEffect, Fragment } from 'react';
import {API, Auth} from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';


const CrearEquipo = () => {

  const [team, setTeam] = useState({
    name: '',
    users:[]
  });
  const [userCreator, setUserCreator] = useState('');

  const [listTeams, setListTeams] = useState([]);
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

  const handleFormSubmit = async (e)  =>{

     const CreateTeamInput = {
      name: team.name,
      users:['']

    } 
    await API.graphql({query: mutations.createTeam, variables: {input: CreateTeamInput}});   
  }

const handleInputChange = (e) =>{
    setTeam({...team, [e.target.name]: e.target.value})
    
  }

const alerta = () =>{
  swal({
    title:"Equipo creado con éxito",
    icon:"success",
    button:"Aceptar",
});
}

return(
  <Fragment>
    <div class="container rounded bg-white mt-5 mb-5">
      <h1>Nuevo equipo</h1>
        <form className="column" onSubmit={handleFormSubmit}> 
          <div class="p-2 py-6">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div class="col-md">
                <label class="labels">Nombre del equipo</label>
                <input  className="form-control"
                placeholder="Ingrese el nombre del torneo"  
                type="text" 
                name="name" 
                onChange={handleInputChange}/>
              </div>
            </div>
              <div class="d-flex justify-content-center align-items-center mb-3">
                <button className="btn btn-dark" type="submit" onClick={alerta}>Crear torneo</button>
              </div>
          </div>
        </form> 
    </div>
  </Fragment>
);} 

export default CrearEquipo;
    






