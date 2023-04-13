import React from 'react'
import { useState } from 'react'
import useResource from '../hooks/useResource'
import { FaChevronRight } from "react-icons/fa"
import AssgResults from './AssgResults'
import useTest from '../hooks/testHook'

const AssgSelector = () => {
  const [assgs, assgService, results] = useResource();
  const [assg, setAssg] = useState("");
  const [url, setURL] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading,  setLoading] = useState(false);
  const [res , setRes] = useState(null);
  

  const onLoading = () => {
      setRes(null);
      setLoading(!loading);
  }

  const onUrlChange = (name) =>{
      setURL(name)
  }
  
  const onAssgSelect = (name) =>{
    if(name == assg){
      setAssg("")
    }
    else{ 
      setAssg(name) 
    }
  }

  const isValidUrl = urlString=> {
	  	var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
	  return !!urlPattern.test(urlString);
	}

  const onEvaluate  =  async () =>{
      if(!assg || !url){
        alert("Make sure you have selected an assignment and given a URL")
        return
      }else{
        if(isValidUrl(url)){
        const body = {url: url}
        onLoading();
        const b = await useTest(assg,body);
        setRes(b);
        //assgService.post(assg, body)
        //onLoading()
        }else{
          alert("Invalid URL!")
          return
        }
      }
  }

  const toggleDropdown = () => setOpen(!isOpen);
  
  const handleItemClick = (id) => {
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
    toggleDropdown();
  }

  return(
    <>
    {!loading &&(
       <>
        <div>
          <h3>Begin evaluating your JS/HTML assignments by making sure you have uploaded your assignment to 
            <a href='https://users.metropolia.fi/~username/folder' target='_blank'> users.metropolia.fi</a> </h3>
        </div>

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
      <input className="assgInput"name="Assignment URL" onChange={(event) => onUrlChange(event.target.value)} placeholder={url}/> 

      <p>3. Send code for evaluation!</p>
      <button className="assgBtn" onClick={onEvaluate}>Send</button>

    </div>
     </>
    )
    }
    {loading &&(
      <AssgResults 
        res = {res}
        onLoading={onLoading}
      />
    )}
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
