import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App({button}) {
  //Room State
  const [count1, setCount1] = useState(0);


  const sendMessage = () => {
    socket.emit("increase_counter1", { count1 });
  };

  useEffect(() => {

socket.on("increase_counter1", (data) => {
      setCount1(data)
    });

    return () => {
      socket.off('increase_counter1')
    }
  }, [socket]);

  const handlecount1 = () => {
    setCount1(count1+1)
  }

  return (
    <div className="App">
      <div>
      <button onClick={handlecount1}>{button}</button> {count1}
      </div><br/>
<button onClick={sendMessage}> Send {button} value</button>
<hr/>
    </div>
   
  );
}

export default App;
