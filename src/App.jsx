
import './App.css'
import Home from './assets/pages/Home.jsx'
import { Routes, Route } from "react-router-dom";
import Login from './assets/pages/Login.jsx'
import Register from './assets/pages/Register.jsx'
import MoviePage from './assets/pages/MoviePage.jsx'


function App() {
 

  return (
    <>
      
     
      <main className="App">
       
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/movie/:type/:id" element={<MoviePage/>} />
      </Routes>
      
       </main>
    
    </>
  )
}

export default App
