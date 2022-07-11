import { useState } from "react";

interface Props {
  players: string[];
  sets: number;
}

const Counter = ({ players, sets }: Props) => {
  const [playerNow, setPlayerNow] = useState(players[0]);
  const [playersScore, setPlayersScore]: [number[], any] = useState([]);

  const handleScore = (score: number) => {
    setPlayersScore([...playersScore, score]);
  };

  return (
    <div>
      <p>Now Turn:</p>
      <h3>{playerNow}</h3>
      <p>Score:</p>
      <input type="text" />
      <button>OK</button>
      <div className="names">
        {players.map((el: string, index: number) => (
          <div key={el}>{`${index} ${el}`}</div>
        ))}
      </div>
    </div>
  );
};

export default Counter;
