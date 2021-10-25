import { useState, useEffect, Fragment } from 'react';
import {API} from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';


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

     const createTorneoInput = {
      name: torneos.name,
      sport: torneos.sport,
      startDate: torneos.startDate,
      endDate: torneos.endDate,
      description: torneos.description
    } 
    await API.graphql({query: mutations.createTorneo, variables: {input: createTorneoInput}});
  }


  const handleInputChange = (e) =>{
    setTorneos({...torneos, [e.target.name]: e.target.value})
  }

  return(
    <Fragment>
        <div>

          <h1>Nuevo torneo</h1>
          <form className="column" onSubmit={handleFormSubmit}>
            <div className="col-md-2">
              <input  className="form-control"
              placeholder="Ingrese el nombre del torneo"  
              type="text" 
              name="name" 
              onChange={handleInputChange}/>
            </div>
            <div className="col-md-2">
              <input className="form-control"
              placeholder="Ingrese el deporte" 
              type="text" 
              name="sport" 
              onChange={handleInputChange}/> 
            </div>
            <div className="col-md-2">
              <input className="form-control" 
              type="date" 
              name="startDate" 
              onChange={handleInputChange}/> 
            </div>
            <div className="col-md-2">
              <input className="form-control" 
              type="date" 
              name="endDate" 
              onChange={handleInputChange}/> 
            </div>
            <div className="col-md-2">
              <input className="form-control"
              placeholder="Ingrese la descripcion"
              type="text" 
              name="description" 
              onChange={handleInputChange}/> 
            </div>
            <div className="col-md-2">
              <button className="btn btn-dark">Crear torneo</button>
            </div>
          </form>
        </div>
        <div>    
          <p> Torneo: {torneos.name}- {torneos.sport}</p>
          {listTorneos && listTorneos.map(item =>
            <li key={item.id}>
              {item.name}
              {item. sport}
            </li>
          )}
        </div>
    </Fragment>
  );
} 
     
export default Torneo;
    






