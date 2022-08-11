import React, { useEffect, useState } from "react";
import io from "socket.io-client";


import 'style/style.scss'

const socket = io.connect("http://localhost:3002");

function App() {
  const [start, setStart] = useState(true);
  const [stop, setStop] = useState("");
  const [data, setData] = useState([]);

  const startDistance = () => {
    socket.emit("start", start);
    console.log(start);
    
  };

  useEffect(() => {
    socket.on("ticker", (datas) => {
      setData(datas);
    });
    console.log(data);
  }, [data]);

  return (
    <div>
      <button onClick={startDistance}>Start</button>
    </div>
  );
}

export default App;
