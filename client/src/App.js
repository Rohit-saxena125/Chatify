import Login from './View/LoginSignup/Login/Login';
import {Routes, Route} from 'react-router-dom';
function App() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
