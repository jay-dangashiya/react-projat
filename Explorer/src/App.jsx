import React from 'react'
import Card from './components/card/Card'

const App = () => {
  return (
    <div className="card-grid">
      <Card
        img="./src/assets/images/1.webp"
        name="Frans Lanting"
        role="Dutch photographer and author"
      />

      <Card
        img="./src/assets/images/2.webp"
        name="Art Wolfe"
        role="American photographer and conservationist"
      />

      <Card
        img="./src/assets/images/3.webp"
        name="Ami Vitale"
        role="American photojournalist"
      />
    </div>
  )
}

export default App
