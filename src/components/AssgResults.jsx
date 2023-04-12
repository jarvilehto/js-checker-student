import React from 'react'
import { useState } from 'react'
import useResource from '../hooks/useResource'

/*
    TODO: Filter results by "PASS" and "FAIL"

    in the case of "FAIL"
    Give the user information of what went wrong.

    in the case of "PASS"
    Tell the user that evertything is ok and the
    assignment is ready to be returned to oma !:)

*/


const  AssgResults = (props) => {
    const [ani, setAni] = useState(true)
    let isPass = true
    console.log(props.res)

    const checkResults = () =>{
    for(const res of props.res){
        if(res.result == "FAIL"){
          isPass = false
        }
    }
    setTimeout(() => {
      setAni(false)
      }, 2000);
  }

  checkResults();


    return(
      <>
          { ani && (
      <div>
        <h3>Hang in there we are crunching some numbers!</h3>
      </div>
      )}


      { (!isPass && !ani) && (
      <div style={{padding:"20px", textAlign:"center"}}>
      <div>
        <h3>Something is not quite right...😓</h3>
      </div>
      <div style={{padding:"20px", marginBottom:"60px"}}>
      {props.res.map(item => (
        <p>{item.description} : {item.result}</p>
      ))} 
      </div>
      <button onClick={() => props.onLoading()}> Ok </button>
      </div>
    )}
    {(isPass && !ani) &&(
      <>
      <div>
        <h1>Hey Everything looks good! Great job! 👍</h1>
        <h2>Make sure to submit the assignment! 😊</h2>
      </div>
      <div>
      <button onClick={() => props.onLoading()}> Ok </button>
      </div>
      </>
    )}
    </>
  )
}

export default AssgResults