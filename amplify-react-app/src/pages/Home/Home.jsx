import { Link } from "react-router-dom";
const Home = () => {
  return (
    
    <div class="px-4 py-5 my-5 text-center">
        <h1 class="display-5 fw-bold">Bienvenido/a!</h1>
        <div class="col-lg-6 mx-auto">
          <p class="lead mb-4">Acá vas a poder crear torneos, contando con todas las herramientas necesarias
          para llevar el seguimiento del mismo al día. </p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">

            <button type="submit" class="btn btn-dark btn-lg px-4 gap-3"><Link to="/torneos" class="App-link">Crear torneo</Link></button>

          </div>
        </div>
      </div>

  );
};

export default Home;

