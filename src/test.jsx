import './App.css'
import { useState } from 'react'
import {getAssignmentById, useTest} from './hooks/testHook';
import {Form, useLoaderData } from "react-router-dom";
import {isValidUrl} from './tools/functions';
import AssgResults from './components/AssgResults';

export function loader({params}){
    const assg = getAssignmentById(params.testId)
    return assg
}

export default function Test() {
    const assg = useLoaderData();
    const [url, setURL] = useState("");
    const [loading,  setLoading] = useState(false);
    const [res , setRes] = useState(null);

    const onLoading = () => {
        setRes(null);
        setLoading(!loading);
    }

    //Updates the Input field with input from user.
    const onUrlChange = (name) =>{
        setURL(name)
    } 

      const onEvaluate  =  async () =>{
      if(!url){
        alert("Make sure you have given a valid URL")
        return
      }else{
        if(isValidUrl(url)){
        const body = {url: url}
        onLoading();
        const b = await useTest(assg.name,body); 
        setRes(b);
        }else{
          alert("Invalid URL!")
          return
        }
      }
  }
    

  return(
    <>
    {!loading &&(
       <>
       <div  className='header'>
        <h1>EvaluateJS</h1>
      </div>
    <div className='assgContainer'>
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
        url = {url}
        onLoading={onLoading}
      />
    )}
    </>
  )
}
