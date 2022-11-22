import { createContext, useState } from "react";
import "./App.css";
import History from "./components/History/History";
import MoneyDetails from "./components/MoneyDetails/MoneyDetails";
import Navbar from "./components/Navbar/Navbar";

export const TransContext = createContext();

function App() {
  const [trans, setTrans] = useState([]);


  return (
    <div className="container">
      <TransContext.Provider value={{trans,setTrans}}>
        <Navbar />
        <MoneyDetails />
        <History />
      </TransContext.Provider>
    </div>
  );
}

export default App;
