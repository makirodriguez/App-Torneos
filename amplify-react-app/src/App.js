import './App.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import Header  from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css'


Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <Header />
      <h2>Bienvenido/a!</h2>
    </div>
  );
}

export default App;
