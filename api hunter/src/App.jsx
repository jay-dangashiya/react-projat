import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Home />
      <Footer studentName="Your Name" studentId="Your ID" />
    </div>
  )
}

export default App
