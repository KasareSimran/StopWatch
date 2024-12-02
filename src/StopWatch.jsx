// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";

function StopWatch(){

    const [isRunning,setIsRunning]=useState(false);
    const [elapsedTime,setElapsedTime]=useState(0);
    const intervalIdRef=useRef(null);
    const startTimeRef=useRef(0);

    useEffect(()=>{
        if(isRunning){
            intervalIdRef.current= setInterval(()=>{
                setElapsedTime(Date.now()-startTimeRef.current)
            },10);
          
        }
       return ()=>{
        clearInterval(intervalIdRef.current);
       }

    },[isRunning])

    function start(){
        setIsRunning(true);
        startTimeRef.current=Date.now()-elapsedTime;
    }
    function stop(){
        setIsRunning(false);
    }
    function reset(){
        setElapsedTime(0);
        setIsRunning(false);

    }
    function formatTime(){

        let hour =Math.floor(elapsedTime/(1000*60*60));
        let min =Math.floor(elapsedTime/(1000*60)%60);
        let sec =Math.floor(elapsedTime/(1000)%60);
        let millisec=Math.floor((elapsedTime%1000)/10);


        hour=String(hour).padStart(2,"0");
        min=String(min).padStart(2,"0");
        sec=String(sec).padStart(2,"0");
        millisec=String(millisec).padStart(2,"0");

        return `${min}:${sec}:${millisec}`;
    }

    return(
        <div className="stopwatch">
            <div className="display">
            {formatTime()}
            </div>
            <div className="control">
                <button  onClick={start} className="start-button">Start</button>
                <button onClick={stop} className="stop-button">Stop</button>
                <button  onClick={reset} className="reset-button">Reset</button>
            </div>
        </div>
    );
}
export default StopWatch