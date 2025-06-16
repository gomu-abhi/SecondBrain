import { Dashboard } from './pages/dashboard'
import { SecondDashboard } from './pages/secondDashboard'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function App() {
  return <BrowserRouter>
    <Toaster position="bottom-right" reverseOrder={false} /> 
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Signin />} />
      <Route path = "/share/:hash" element={<SecondDashboard />} />
    </Routes>
  </BrowserRouter>
}

export default App
