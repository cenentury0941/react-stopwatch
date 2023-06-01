import React, {useState, useEffect} from "react";
import './Stopwatch.css'

var runningTime = "" ;
var currentState = "Stopped" ;
function Stopwatch()
{

    var prevTime = undefined;
    var lapTime = "" ;

    const [ mainDisplay , setMainDisplay ] = useState( "00:00.00" );
    const [ lapDisplay , setLapDisplay ] = useState( "00:00.00" );
    const [ history , setHistory ] = useState( [ ] );
    const [ but1Label , setBut1Label ] = useState( "reset" );
    const [ but2Label , setBut2Label ] = useState( "start" );



    function startAndPauseStopwatch()
    {

        console.log( currentState );
        if( currentState === "Running" )
        {
            currentState = "Paused" ;
        }
        else{
            if( currentState === "Stopped" )
            {
                runningTime = 0;
                lapTime = 0;
                setHistory([]);
            }
            currentState = "Running" ;
            updateTime();
        }

    }

    function resetAndLapStopwatch()
    {

    }

    function updateTime()
    {
        console.log( "updateTime : " + currentState );
        
        if( currentState !== "Running" )
        {
            return;
        }

        runningTime += 20;
        let runningDate = new Date(0);
        runningDate.setMinutes(0);
        runningDate.setMilliseconds(runningTime);
        let m = (""+runningDate.getMinutes()).padStart( 2 , "0" );
        let s = (""+runningDate.getSeconds()).padStart( 2 , "0" );
        let ms = (""+runningDate.getMilliseconds()).substring(0,2).padStart(2,"0");
        setMainDisplay( m + ":" + s + "." + ms );
        setTimeout( updateTime , 20 );
    }


    return (
        <div className="StopwatchBody">
            <div className="StopwatchDisplay">
                <div className="StopwatchTimeDisplay">{mainDisplay}</div>
                <div className="StopwatchLapDisplay">{lapDisplay}</div>
                <div className="ControlContainer"><div className="Button" id="but1" onClick={resetAndLapStopwatch}><h4>{but1Label}</h4></div><div className="Button Start" onClick={startAndPauseStopwatch} ><h4>{but2Label}</h4></div></div>
            </div>
            <div className="StopwatchHistory">
                { history.length  && 
                <table>
                    <tr>
                    <th>Laps</th>
                    <th>Lap Time</th>
                    <th>Overall Time</th>
                    </tr>
                    
                    {
                    history.map( (element, index) => {
                        return (
                            <tr>
                            <td>{index+1}</td>
                            <td>{element[0]}</td>
                            <td>{element[1]}</td>
                            </tr>
                        )
                    } )
                    }


                </table>
                }
            </div>
        </div>
    );
}

export default Stopwatch;