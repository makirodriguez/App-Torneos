import { useState, useEffect, Fragment } from 'react';
import {API} from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';



const Perfil = () => {

    const [perfil, setPerfil] = useState({
        name: '',
        lastName: '',
        number: '',
        email: '',
        country: '',
        province: '',
        filePath: '',
      });
    
 /*       const [listPerfil, setListPerfil] = useState([]);
      useEffect(() =>{
          async function getPerfil(){
            const allPerfil = await API.graphql({query: queries. listPerfils});
            setListPerfil(allPerfil.data. listPerfils.items);  
          }
        getPerfil();
      });  
     */
    
      const handleFormSubmit = async (e)  =>{
    
         const CreatePerfilInput = {
            name: perfil.name,
            lastName: perfil.lastName,
            number: perfil.number,
            email: perfil.email,
            country: perfil.country,
            province: perfil.province,
            filePath: ''
        } 
         await API.graphql({query: mutations.createPerfil, variables: {input: CreatePerfilInput}}); 
      }

    
      const handleInputChange = (e) =>{
        setPerfil({...perfil, [e.target.name]: e.target.value})
 
      }
    
      


    return (
        <Fragment>
        <div class="container rounded bg-white mt-5 mb-5">
            <div class="row">
                <div class="col-md-5 border-right">
                        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img class="rounded-circle mt-5" src=""></img>
                            <div class="mb-3">
                                <label for="formFile" class="form-label">Cambiar imagen de perfil</label>
                                <input class="form-control" type="file" id="formFile"></input>
                            </div>
                            <span class="font-weight-bold">Nombre: {perfil.name}</span>
                            <span class="text-black-50">Mail: {perfil.email}</span><span></span>
                        </div>
                </div>
                <div class="col-md-5 border-right">
                    <div class="p-3 py-5">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h4 class="text-right">Configurar perfil</h4>
                        </div>
                        <form className="column" onSubmit={handleFormSubmit}>
                            <div class="row mt-2">
                                <div class="col-md-6"><label class="labels">Nombre</label><input type="text" class="form-control" placeholder="Nombre" name="name" onChange={handleInputChange}></input></div>
                                <div class="col-md-6"><label class="labels">Apellido</label><input type="text" class="form-control" placeholder="Apellido" name="lastName" onChange={handleInputChange}></input></div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-12"><label class="labels">Numero de telefono</label><input type="text" class="form-control" placeholder="Ingresar numero de telefono" name="number" onChange={handleInputChange} ></input></div>
                                <div class="col-md-12"><label class="labels">Email</label><input type="email" class="form-control" placeholder="usuario@ejemplo.com" name="email" onChange={handleInputChange}></input></div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-6"><label class="labels">País</label><input type="text" class="form-control" placeholder="Ingresar país" name="country" onChange={handleInputChange}></input></div>
                                <div class="col-md-6"><label class="labels">Provincia</label><input type="text" class="form-control"  placeholder="Ingresar provincia" name="province" onChange={handleInputChange}></input></div>
                            </div>
                            <div class="mt-5 text-center"><button type="submit" class="btn btn-primary profile-button">Guardar cambios</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
     );
     
};

export default Perfil;