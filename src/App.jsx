import { useState } from 'react'
import './App.css'
import useResource from './hooks/useResource'
import AssgSelector from './components/AssgSelector'

function App() {
  return (
    <>
    <div className="App">
      <div  className='header'>
        <h1>EvaluateJS</h1>
      </div>
        <div>
          <h3>To start evaluating your JS/HTML assignments, make sure you have uploaded your assignment to 
            <a href='https://users.metropolia.fi/~username/folder' target='_blank'> users.metropolia.fi</a> </h3>
        </div>
        <AssgSelector/>
    </div>
    </>
  )
}

export default App
