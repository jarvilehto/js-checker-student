import React from 'react'
import { useState } from 'react'
import useResource from '../hooks/useResource'
import { FaChevronRight } from "react-icons/fa"

const AssgSelector = (props) => {
  const [assgs, assgService, results] = useResource();
  const [assg, setAssg] = useState("");
  const [url, setURL] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const onUrlChange = (name) =>{
      setURL(name)
  }

  
  const onAssgSelect = (name) =>{
     setAssg(name);
  }

  const onEvaluate  =  () =>{
    const body = {url: url}
    assgService.post(assg, body)
  }

 
  
  const toggleDropdown = () => setOpen(!isOpen);
  
  const handleItemClick = (id) => {
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
    toggleDropdown();
  }

  return(
    <>
    <div className='assgContainer'>
      <p>1. Begin by selecting the correspoding assignment with your task below</p>
      <div className='dropdown'>
      <div className='dropdown-header' onClick={toggleDropdown}>
        {selectedItem ? assgs.find(item => item._id == selectedItem).name : "Select assignment"}
        <FaChevronRight className= {`fa fa-chevron-right icon ${isOpen && "open"}`}/>
      </div>
      <div className={`dropdown-body ${isOpen && 'open'}`}>
        {assgs.map(item => (
          <div className="dropdown-item" onClick={(e) =>{ handleItemClick(e.target.id), onAssgSelect(item.name)}} id={item._id}>
            <span className={`dropdown-item-dot ${item._id == selectedItem && 'selected'}`}>• </span>
            {item.name.toUpperCase()}
          </div>
        ))}
      </div>
    </div>

    <p>2. Paste the URL to the assignment HTML from your users.metropolia.fi</p>
      <input className="assgInput"name="Assignment URL" onChange={(event) => onUrlChange(event.target.value)} placeholder='users.metropolia.fi'/> 

      <p>3. Send code for evaluation!</p>
      <button className="assgBtn" onClick={onEvaluate}>Send</button>

    </div>

      <div>
        {results.map(item => (
          <p>{item.description} : {item.result}</p>
      ))}
     </div>

    </>
 
    /*
    <>
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

    <div>
        {results.map(item => (
          <p>{item.description} : {item.result}</p>
      ))}
    </div>
    </>
    */
  )
}

export default AssgSelector;
