import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"
import Card from "./components/Card"
import Table from "./components/Table"
import Form from "./components/Form"


function App() {
  return (
    <>
      <Navbar/>
      <HeroSection/>
      <Card/>
      <Table/>
      <Form/>
    
      <footer className="bg-dark text-light text-center py-3">
        © 2026 MyWebsite | Built with Bootstrap & React
      </footer>

      <div className="modal fade" id="demoModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Bootstrap Modal</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              This is a working modal inside React + Vite.
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
