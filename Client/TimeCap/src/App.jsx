import './App.css'
import Home from './Pages/Home'
import Navbar from './components/Navbar';
import firebaseConfig from './firebaseConfig';
function App() {

  return (
    <div>
      <Navbar/>
      <Home/>
    </div>
  )
}

export default App
