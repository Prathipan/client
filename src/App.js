import { useSelector } from "react-redux";
import { BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import "./App.css";
import EmailVerify from "./components/EmailVerify/EmailVerify";
import History from "./components/History/History";
import Login from "./components/login/Login";
import Register from "./components/login/Register";


function App() {
  const user = useSelector(state => state.user.currentUser);
  return (
    <div className="container-fluid">
        <Router>
          <Routes>
             <Route path="/" element={user ? <Navigate to="/main" /> :<Login />} />
             <Route path="/register" element={<Register />} />
             <Route path="/main" element={!user ? <Navigate to="/" /> : <History />} />
             <Route path="/user/:id/verify/:token" element={<EmailVerify />}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
