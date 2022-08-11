import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import "style/style.scss";
import gif from "assets/horses.gif";

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
    <>
      <div className="container">
        <img src={gif} alt="horses" />
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Distance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((horse) => {
              return (
                <tr>
                  <td>{horse.name}</td>
                  <td>{horse.distance}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button onClick={startDistance}>Start</button>
    </>
  );
}

export default App;
