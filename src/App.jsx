
import './App.css'
import Home from './assets/pages/Home.jsx'
import { Routes, Route } from "react-router-dom";
import Login from './assets/pages/Login.jsx'
import Register from './assets/pages/Register.jsx'


function App() {
 

  return (
    <>
      <main className="App">
       
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
      </Routes>
      
       </main>
    
    </>
  )
}

export default App
