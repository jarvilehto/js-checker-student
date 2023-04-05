import React from 'react'
import { useState } from 'react'
import useResource from '../hooks/useResource'

const AssgSelector = (props) => {
  const [assgs, assgService, results] = useResource();
  const [assg, setAssg] = useState("");
  const [url, setURL] = useState("");
  
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

  return(
    <div className="assgContainer">
      <p>1. Begin by selecting the correspoding assignment with your task below</p>
    <select onChange={(event) => onAssgSelect(event.target.value)}>
      <option value=""><p>Choose task</p></option>
      {assgs.map((assg, index) => (
        <option key={index} value={assg.name}>
          {assg.name}
        </option>
      ))}
    </select>
    
    <p>2. Paste the URL to the assignment HTML from your users.metropolia.fi</p>

      <input className="assgInput"name="Assignment URL" onChange={(event) => onUrlChange(event.target.value)} placeholder='users.metropolia.fi'/> 

      <p>3. Send code for evaluation!</p>
      <button className="assgBtn" onClick={onEvaluate}>Send</button>

    </div>
  )
}

export default AssgSelector;
