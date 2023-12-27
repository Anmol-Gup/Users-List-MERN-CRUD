import './App.css'
import Form from './components/Form'
import { Link, Route, Routes } from 'react-router-dom'
import Users from './components/Users'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Users />}/>
        <Route path="/add-user" element={<Form />} />
        <Route path="/update-user/:id" element={<Form />} />
      </Routes>
    </>
  )
}

export default App
