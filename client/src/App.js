import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Views/LoginSignup/Login';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
