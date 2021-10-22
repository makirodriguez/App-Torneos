import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import {Amplify, API, graphqlOperation} from 'aws-amplify';
import { listTorneos } from '../../graphql/queries';
import awsconfig from '../../aws-exports';
import { createTorneo } from '../../graphql/mutations';
import 'bootstrap/dist/css/bootstrap.min.css';



Amplify.configure(awsconfig);

const Torneo = ({ onUpload }) =>{
  const [torneos, setTorneos] = useState({});
  
/* 
  useEffect(() =>{
    fetchTorneos();
  }, []);  */

  const fetchTorneos = async () => {

    try{
      console.log('torneos', torneos);
      const {name, sport, startDate, endDate, description} = torneos;
      const createTorneoInput = {
        name,
        sport,
        startDate,
        endDate,
        description
      };

    console.log(createTorneoInput);
    
      await API.graphql(graphqlOperation(createTorneo, { input: createTorneoInput }));
      onUpload();
      //const torneosData = await API.graphql(graphqlOperation(listTorneos ));
    /*   const TorneoList= torneosData.data.listTorneos.items;
      console.log('TorneoList', TorneoList);
      setTorneos(TorneoList); */
    }
    catch (err) {console.log('Error fetching torneos: ', err)}
  };


  return (
    <div>
          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"

    >
    <h1>Nuevo torneo</h1>

      <FormControl variant="standard">
        <InputLabel htmlFor="component-helper">Nombre del torneo</InputLabel>
        <Input
          id="component-helper"
          value={torneos.name}
          onChange={e => setTorneos({ ...torneos, name: e.target.value })}
          aria-describedby="component-helper-text"
        />
        <FormHelperText id="component-helper-text">
          Campo obligatorio
        </FormHelperText>
        </FormControl>
        <FormControl variant="standard">
        <InputLabel htmlFor="component-helper">Nombre del deporte</InputLabel>
        <Input
          id="component-helper"
          value={torneos.sport}
          onChange={e => setTorneos({ ...torneos, sport: e.target.value })}
          aria-describedby="component-helper-text"
        />
        <FormHelperText id="component-helper-text">
          Campo obligatorio
        </FormHelperText>
        </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-helper">Fecha de inicio</InputLabel>
        <Input
          id="component-helper"
          type="date"
          value={torneos.startDate}
          onChange={e => setTorneos({ ...torneos, startDate: e.target.value })}
          aria-describedby="component-helper-text"
        />
        </FormControl>
        <FormControl variant="standard">
        <InputLabel htmlFor="component-helper">Fecha de fin</InputLabel>
        <Input
          id="component-helper"
          type="date"
          value={torneos.endDate}
          onChange={e => setTorneos({ ...torneos, endDate: e.target.value })}
          aria-describedby="component-helper-text"
        />
        </FormControl>
        <FormControl variant="standard">
        <InputLabel htmlFor="component-helper">Descripcion</InputLabel>
        <Input
          id="component-helper"
          value={torneos.description}
          onChange={e => setTorneos({ ...torneos, description: e.target.value })}
          aria-describedby="component-helper-text"
        />
        <FormHelperText id="component-helper-text">
          Campo obligatorio
        </FormHelperText>
        </FormControl>
  
      <input type="submit" onClick={fetchTorneos} value="Crear torneo"></input>


    </Box>
    </div>
  ); }

  export default Torneo;
    






