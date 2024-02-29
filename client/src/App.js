import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Views/LoginSignup/Login';
import Signup from './Views/LoginSignup/Signup';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
