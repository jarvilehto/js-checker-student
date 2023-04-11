import React from 'react'
import { useState } from 'react'
import useResource from '../hooks/useResource'

const  AssgResults = (props) => {
    return(
        <div style={{padding:"20px", textAlign:"center"}}>
        <div>
          <h3>Results!</h3>
        </div>
        <div style={{padding:"20px", marginBottom:"60px"}}>
           {props.res.map(item => (
          <p>{item.description} : {item.result}</p>
        ))} 
        </div>
        <button onClick={() => props.onLoading()}> return </button>
     </div>
    )
}

export default AssgResults