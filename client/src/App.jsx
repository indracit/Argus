import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import Requiredauth from "./components/Requiredauth";
import './App.scss'


const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path="/" element={ <Requiredauth/>}>
      <Route path='/' element={<Layout/>}>
        <Route 
          path='/dashboard'
          element={<Dashboard/>}
        />
        <Route 
          path='/reports'
          element={<Reports/>}
        />
      </Route>
      </Route>
      <Route path="/*" element={<h1>Page Not Found </h1>}/>
    </Routes>
  )
}

export default App
