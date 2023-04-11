import { useState } from 'react'
import './App.css'
import AssgSelector from './components/AssgSelector'
import AssgResults from './components/AssgResults'


function App() {
  return (
    <>
    <div className="App">
      <div  className='header'>
        <h1>EvaluateJS</h1>
      </div>
          <AssgSelector/>
    </div>
    </>
  )
}

export default App
