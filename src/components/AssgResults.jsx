import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player'

/*


*/


const  AssgResults = (props) => {
    /*
    Using state in here would cause too many re-renders of the elements
    that would result in unexpected and unwanted behavior.
    instead using basic boolean variabled works well in this application.
    */
    let ani = true
    let isPass = true

    /*
      Parse through the result response to see if any test has failed.
      If a test fails isPass is set to false and a different set of elements
      is to be shown to the user.
      After that the loading animation is set to false.
    */
    const checkResults = () =>{
    for(const res of props.res){
        if(res.result == "FAIL"){
          isPass = false
        }
    }
    ani = false
  }

  //checkResult() only if res is not empty.
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
      
      <div style={{textAlign:'left', width:'500px', height:'350px' , margin:'auto', display:'flex', flexDirection:'column'
      , padding:'10px', borderRadius:'10px', overflow:scroll}}>
        <p style={{marginBottom:'0px'}}>What went wrong</p>
         <div style={{ marginBottom:"60px" , overflow:'auto', padding:'5px'}}>
      {props.res.map(item =>  (
        <>
          {item.result=="FAIL" &&(
            <> 
              <div>       
                <div style={{display:'flex',flexDirection:'row'}}>
                  <p style={{margin:'0'}}>{item.description}: </p>
                  <p style={{color:'red', margin:'0'}}> {item.result}</p>
                </div>
                 {item.issue &&(
                  <div>
                  <p style={{marginTop: '0'}}>Issue : {item.issue}</p>
                  </div>
                )}
              </div>  
            </>
          )}
        </>
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