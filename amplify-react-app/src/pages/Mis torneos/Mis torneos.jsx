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
            <div class="container rounded bg-dark mt-5 mb-5">
                <h1>Mis torneos</h1>
                    {listTorneos && listTorneos.map(item =>
                        <div class="container rounded bg-white mt-4 mb-5">
                            <li key={item.id}>
                                <h2>Nombre del torneo</h2>
                                {item.name} <br></br>
                                <h3>Deporte</h3>
                                {item.sport} <br></br>
                                <h3>Fecha de inicio</h3>
                                {item.startDate} <br></br>
                                <h3>Fecha de finalización</h3>
                                {item.endDate} <br></br>
                                <h3>Descripción</h3>
                                {item.description} <br></br>
                            </li>
                        </div>
                    )}
            </div>
        </Fragment>
    );
};

export default MisTorneos;