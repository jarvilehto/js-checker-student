import React from 'react'
import { useState } from 'react'
import useResource from '../hooks/useResource'
import { FaChevronRight } from "react-icons/fa"
import AssgResults from './AssgResults'
import useTest from '../hooks/testHook'

const AssgSelector = () => {
  //Get all the listed assignments from database
  const [assgs] = useResource();
  //Currently selected assignment
  const [assg, setAssg] = useState("");
  //Users url input
  const [url, setURL] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  //Loading animation toggle
  const [loading,  setLoading] = useState(false);
  //State variable for test validation responses.
  const [res , setRes] = useState(null);
  
  /*
  Resets res to null and sets setLoading to true of false
  Removing or starting the loading animation of the page.
  */
  const onLoading = () => {
      setRes(null);
      setLoading(!loading);
  }

  //Updates the Input field with input from user.
  const onUrlChange = (name) =>{
      setURL(name)
  }
  
  /*
  When selecting an assignment from the dropdown menu 
  Sets it to be the active assignment. If selected again
  Sets assignment to be empty.
  */
  const onAssgSelect = (name) =>{
    if(name == assg){
      setAssg("")
    }
    else{ 
      setAssg(name) 
    }
  }

  // Checks if userinput is a valid URL.
  const isValidUrl = (urlString)=> {
	  	var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator~
      const url = new URL(urlString);
      console.log(url.pathname.split('/')[1])
	  return !!urlPattern.test(urlString);
	}

  /*
    1. Checks if assg and url fields are not empyty
       and reminds the user to select an assignment and to input a working URL
    2. Checks if the URL is valid after the 1st test.
    3. Starts the loading animation by calling onLoading();
       useTest is called to validate the users test and the result is then
        returned and set as the 'res' state variable. 
  */
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
        console.log(b);
        }else{
          alert("Invalid URL!")
          return
        }
      }
  }

  //Is used to toggle the state of the dropdown menu true/false.
  const toggleDropdown = () => setOpen(!isOpen);
  
  //Dropdown menu uses this to handle which item is selected.
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
      <p className='pmarginBottom'>1. Begin by selecting the correspoding assignment with your task below</p>
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
  )
}

export default AssgSelector;
