import { useState, useEffect, Fragment } from 'react';
import {API} from 'aws-amplify';
import * as queries from '../../graphql/queries';

const MisTorneos = () => {

    const [listTorneos, setListTorneos] = useState([]);
    useEffect(() =>{
        async function getAllTorneos(){
            const allTorneos = await API.graphql({query: queries.listTorneos});
            setListTorneos(allTorneos.data.listTorneos.items);  
        }
        getAllTorneos();
    });

    return (
        <Fragment>
            <div class="container rounded bg-dark mt-5 mb-5"><br></br>
                <div class="container-fluid col-md-4 rounded bg-white mb-5">
                    <div class="row">
                        <h1 class ="display-1">Mis torneos</h1>
                    </div>
                </div>
                    {listTorneos && listTorneos.map(item =>
                        <div class="container-fluid col-md-5 rounded bg-white mt-4 mb-5">
                            <div class="row">
                                <p key={item.id}>
                                    <h1>Nombre del torneo</h1>
                                    <h2>{item.name}</h2><br></br>
                                    <h1>Deporte</h1>
                                    <h2>{item.sport}</h2><br></br>
                                    <h1>Fecha de inicio: {item.startDate}</h1><br></br>
                                    <h1>Fecha de fin: {item.endDate}</h1><br></br>
                                    <h1>Descripción: {item.description}</h1><br></br><br></br>
                                    <button className="btn btn-primary btn-lg">Modificar</button> <button className="btn btn-danger btn-lg">Eliminar</button>
                                </p>
                            </div>
                        </div>
                    )}
                <br></br>
            </div>
        </Fragment>
    );
};

export default MisTorneos;