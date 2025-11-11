import LoginPage from './pages/LoginPage/LoginPage'
import DashboardPage from './pages/HomePage/HomePage'
import { Route, Routes } from 'react-router-dom'
import ProfileSettings from './pages/ProfilePage/ProfilePage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<DashboardPage page='dashboard'/>}/>
      <Route path='/incomes' element={<DashboardPage page='incomes'/>}/>
      <Route path='/expenses' element={<DashboardPage page='expenses'/>}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/profile' element={<ProfileSettings />}/>
    </Routes>
  )
}

export default App

