import { useState, useEffect, Fragment } from 'react';
import {API} from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import 'bootstrap/dist/css/bootstrap.min.css';


const Torneo = () => {

  const [torneos, setTorneos] = useState({
    name: '',
    sport: '',
    startDate: '',
    endDate: '',
    description: ''
  });

   const [listTorneos, setListTorneos] = useState([]);
  useEffect(() =>{
      async function getAllTorneos(){
        const allTorneos = await API.graphql({query: queries.listTorneos});
        setListTorneos(allTorneos.data.listTorneos.items);  
      }
    getAllTorneos();
  });  


  const handleFormSubmit = async (e)  =>{

     const CreateTorneoInput = {
      name: torneos.name,
      sport: torneos.sport,
      startDate: torneos.startDate,
      endDate: torneos.endDate,
      description: torneos.description
    } 
    await API.graphql({query: mutations.createTorneo, variables: {input: CreateTorneoInput}});
  }


  const handleInputChange = (e) =>{
    setTorneos({...torneos, [e.target.name]: e.target.value})
    console.log(torneos)
  }

return(
  <Fragment>
    <div class="container rounded bg-white mt-5 mb-5">
      <h1>Nuevo torneo</h1>
        <form className="column" onSubmit={handleFormSubmit}>
          <div class="p-2 py-6">
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
                  placeholder="Ingrese el deporte" 
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
                  placeholder="Ingrese la descripcion"
                  type="text" 
                  name="description" 
                  onChange={handleInputChange}/> 
                </div>
              </div>
              <div class="d-flex justify-content-center align-items-center mb-3">
                <button className="btn btn-dark">Crear torneo</button>
              </div>
          </div>
        </form>
    </div>
  </Fragment>
);} 

export default Torneo;
    






