import { createContext, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Main from "./components/Main";
import { store } from "./redux/store";

// export const TransContext = createContext();

function App() {
  // const [trans, setTrans] = useState([]);


  return (
    <div className="container-fluid">
      {/* <TransContext.Provider value={{trans,setTrans}}> */}
      <Provider store={store}>
        <Router>
          <Routes>
             <Route path="/" element={<Login />} />
             <Route path="/register" element={<Register />} />
             <Route path="/main" element={<Main />} />
          </Routes>
        </Router>
        </Provider>
      {/* </TransContext.Provider> */}
    </div>
  );
}

export default App;
