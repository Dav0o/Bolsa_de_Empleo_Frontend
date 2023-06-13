import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/layout/Layout'
import Candidate from './pages/candidate/Candidate'
import Home from './pages/home/Home'
import Candidates from './pages/candidates/Candidates'
import Offers from './pages/offers/Offers'
import AddCandidate from './pages/add-candidate/AddCandidate'
import AddSkills from './pages/add-skills/AddSkills'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='/add-candidate' element={<AddCandidate/>}/>
          <Route path='/candidates' element={<Candidates/>}/>
          <Route path='/candidate/:candidateId' element={<Candidate/>}/>
          <Route path='/add-skills/:candidateId' element={<AddSkills/>}/>
          <Route path='/offers' element={<Offers/>}/>
          
          
        </Route>
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
