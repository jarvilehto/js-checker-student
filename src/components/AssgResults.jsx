import React from 'react'
import { useState } from 'react'
import useResource from '../hooks/useResource'
import { Player } from '@lottiefiles/react-lottie-player'

/*
    TODO: Filter results by "PASS" and "FAIL"

    in the case of "FAIL"
    Give the user information of what went wrong.

    in the case of "PASS"
    Tell the user that evertything is ok and the
    assignment is ready to be returned to oma !:)

*/


const  AssgResults = (props) => {
    let ani = true
    let isPass = true
    console.log(props.res != null)

    const checkResults = () =>{
    for(const res of props.res){
        if(res.result == "FAIL"){
          isPass = false
        }
    }
    ani = false
  }

  if(props.res != null){
    checkResults();
  }

    return(
      <>
          { ani && (
        <div>
        <h3>Evaluating...</h3>
        <Player 
        src='https://assets8.lottiefiles.com/packages/lf20_kxsd2ytq.json' 
        className='player' 
        loop 
        autoplay
        style={{height:'200px', width:'200px'}}
        />
      </div>
      )}


      { (!isPass && !ani) && (
        <>
      <div>
        <h2 style={{color:'red'}}>FAIL!</h2>
        <h3>Something is not quite right...😓</h3>
      </div>
      
      <div style={{textAlign:'left', width:'350px', margin:'auto', display:'flex', justifyContent:'center', flexDirection:'column'
      , padding:'10px', borderRadius:'10px'}}>
        <p style={{marginBottom:'0px'}}>What went wrong</p>
         <div style={{ marginBottom:"60px"}}>
      {props.res.map(item => (
        <p>{item.description} : {item.result}</p>
      ))} 
      </div>
      </div>


      <button onClick={() => props.onLoading()}> Ok </button>
      </>
    )}
    {(isPass && !ani) &&(
      <>
      <div>
        <h2 style={{color:'green'}}>PASS!</h2>
        <h3>Hey Everything looks good! Great job! 👍</h3>
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