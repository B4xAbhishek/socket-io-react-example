import React,{useState,useEffect} from 'react'
import io from "socket.io-client";
import Main from './Main'

const socket = io.connect("http://localhost:3001");

function App() {

  const [arr,setArr] = useState([])
  const addmain = () => {
    //make new component
    setArr([...arr,arr.length])
    socket.emit("increase_button", { arr });
  }

  useEffect(() => {

    socket.on("increase_button", (data) => {

          setArr((prev) => [...prev,data.length])
          console.log(data)
        });
    
        return () => {
          socket.off('increase_button')
        }
      }, [socket]);

  console.log(arr)
  return (
    <div>
      <h2>Project1</h2>
      <Main button={"button"}/>
      <h2>Project2</h2>
    {Array.isArray(arr) && arr.map((index) => <Main key={index} button={"button"+(index+1)} />)}
    <button onClick={addmain}>Add More Buttons</button>
    <br/>
    

    </div>
  )
}

export default App