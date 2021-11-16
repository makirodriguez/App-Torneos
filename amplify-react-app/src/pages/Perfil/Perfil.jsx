import {API, Auth} from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';

const Perfil = () => {
    const [email, setEmail] = useState('');
    const [phone_number, setPhonenumber] = useState('');
    const [listProfiles, setListProfiles] = useState([]);
    const [perfil, setPerfil] = useState({
        name: '',  
        lastname: '',
        number: '',
        email: '',
        country: '',
        province: '',
        filePath: ''
      });
    useEffect(() => {
        async function getProfile(){
            const profile = await API.graphql({query: queries.listProfiles});
            setListProfiles(profile.data.listProfiles.items);  
            console.log(profile.data.listProfiles.items)

          }
        getProfile()
        Auth.currentAuthenticatedUser().then(user => {
          setEmail(user.attributes.email);
          setPhonenumber(user.attributes.phone_number);
          console.log(user)
        });
      }, [])

   
      const handleFormSubmit = async (e)  =>{

        const CreateProfileInput = {
            name: perfil.name,
            lastname: perfil.lastname,
            number: phone_number,
            email: email,
            country: perfil.country,
            province: perfil.province,
            filePath: ''
       } 
       console.log(perfil)
       await API.graphql({query: mutations.createProfile, variables: {input: CreateProfileInput}});
     }
   
   
     const handleInputChange = (e) =>{
       setPerfil({...perfil, [e.target.name]: e.target.value})
     }
     
    return (
        <div class="container rounded bg-white mt-5 mb-5">
            <div class="row">
                <div class="col-md-5 border-right">
                        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img class="rounded-circle mt-5" src=""></img>
                            <div class="mb-3">
                                <label for="formFile" class="form-label">Cambiar imagen de perfil</label>
                                <input class="form-control" type="file" id="formFile"></input>
                            </div>
                            <span class="font-weight-bold">Nombre</span><span class="text-black-50">Mail {email}</span><span></span>
                        </div>
                </div>
                
                <div class="col-md-5 border-right">
                    <div class="p-3 py-5">
                    <form onSubmit={handleFormSubmit}>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h4 class="text-right">Configurar perfil</h4>
                        </div>
                        
                        <div class="row mt-2">
                            <div class="col-md-6"><label class="labels">Nombre</label><input type="text" class="form-control" placeholder="Nombre" name="name" onChange={handleInputChange}></input></div>
                            <div class="col-md-6"><label class="labels">Apellido</label><input type="text" class="form-control" placeholder="Apellido" name="lastname" onChange={handleInputChange}></input></div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12"><label class="labels">Numero de telefono</label><input type="text" class="form-control" placeholder="Ingresar numero de telefono" name="number" value={phone_number}></input></div>
                            <div class="col-md-12"><label class="labels">Email</label><input type="email" class="form-control" placeholder="usuario@ejemplo.com" name="email" value={email}></input></div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6"><label class="labels">País</label><input type="text" class="form-control" placeholder="Ingresar país" name="country" onChange={handleInputChange}></input></div>
                            <div class="col-md-6"><label class="labels">Provincia</label><input type="text" class="form-control"  placeholder="Ingresar provincia" name="province" onChange={handleInputChange}></input></div>
                        </div>
                        <div class="mt-5 text-center"><button class="btn btn-primary profile-button" >Guardar cambios</button></div>
                </form>

                    </div>
                </div>
            </div>
        </div>
     );
};

export default Perfil;