import React, { useEffect } from "react";
import "./App.css";
import Counter from "./components/Counter";
import InputSet from "./components/InputSet";
import "./index.css";

function App() {
  const [save, setSave]: any = React.useState([]);
  const [start, setStart]: any = React.useState(false);
  const [sets, setSets]: any = React.useState(3);
  const [play, setPlay]: any = React.useState(false);

  const savePlayers = (text: string) => {
    if (text.trim())
      setSave((prev: any) => {
        return [...prev, text];
      });
  };

  useEffect(() => {
    console.log(save, sets);
  }, [save, sets]);

  const resetGame = () => {
    setStart(false);
    setSets(3);
    setPlay(false);
  };

  return (
    <div className="App">
      <div className="container">
        {!start && (
          <>
            <InputSet label="Nickname" saveFunc={savePlayers}></InputSet>
            <ul className="names">
              {save.map((el: string, id: number) => (
                <li key={el}>{`${id + 1}) ${el}`}</li>
              ))}
            </ul>
            <button className="start" onClick={() => setStart(true)}>
              START
            </button>
          </>
        )}
        {start && !play && (
          <>
            <p>Sets number</p>
            <input
              className="main-input"
              type="text"
              placeholder="Number of sets"
              value={sets}
              onChange={(e) =>
                isFinite(+e.target.value)
                  ? setSets(Number(e.target.value))
                  : setSets(3)
              }
            />
            <button
              className="main-button"
              onClick={() => {
                setPlay(true);
              }}
            >
              PLAY
            </button>
          </>
        )}
        {play && <Counter resetGame={resetGame} players={save} sets={sets} />}
      </div>
    </div>
  );
}

export default App;
