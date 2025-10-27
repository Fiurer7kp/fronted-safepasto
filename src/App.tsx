import PastoMap from './components/PastoMap';
import AlertForm from './components/AlertForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>🚨 SafePasto - Alertas Comunitarias</h1>
        <p>Sistema de seguridad colaborativo para Pasto, Nariño</p>
      </header>

      <div className="app-main">
        <div className="form-panel">
          <AlertForm />
        </div>
        <div className="map-panel">
          <PastoMap />
        </div>
      </div>
    </div>
  );
}

export default App;