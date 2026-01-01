import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [number ,setNumber] = useState(0)

  function add(){
    setNumber(number + 1)
  }

  function sub(){
    if(number <= 0){
      setNumber(number)
    } else{
      setNumber(number - 1)
    }
  }

  return (
    <>
      <h1 >counter</h1>
      <div>
        <h1>{number}</h1>
        <div className='but'>
        <button onClick={add}>add</button>
        <button onClick={sub}>sub</button>
        </div>
      </div>
    </>
  )
}

export default App
