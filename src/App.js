import './styles/App.scss';
import Form from './Form';

function App() {
  return (
    <div className="App">
      <div className="main-content-container">
        <div className="main-content">
          <div className="img-content">
            <img src="https://via.placeholder.com/600" alt="" />
          </div>
          <div className="form-container">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
