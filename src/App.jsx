import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useResource from './hooks/useResource'
import AssgSelector from './components/AssgSelector'

function App() {
  const [assgs, assgService] = useResource();
  const [assg, setAssg] = useState("");
  const [count, setCount] = useState(0);
  const [url, setURL] = useState("");
  const [loading, setLoading] = useState(false);


  const onUrlChange = (name) =>{
      setURL(name)
  }

  const onAssgSelect = (name) =>{
     setAssg(name);
  }

  const onEvaluate = () =>{
    const body = {url: url}
    assgService.post(assg, body)
  }

  return (
    <>
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <AssgSelector 
        assgs={assgs} 
        onUrlChange={onUrlChange}
        onAssgSelect={onAssgSelect}
        onEvaluate={onEvaluate}
        />
      </div>
    </div>
    </>
  )
}

export default App
