import {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface Props {
  players: string[];
  sets: number;
  resetGame: () => void;
}

const Counter = ({ players, sets, resetGame }: Props) => {
  const [playerNow, setPlayerNow] = useState({ player: players[0], set: 0 });
  const [playersScore, setPlayersScore]: [any, any] = useState({});
  const [playerId, setPlayerId] = useState(0);
  const [show, setShow] = useState(false);

  const [showWinner, setShowWinner] = useState(false);
  const [results, setResults]: [
    {
      player: string;
      sum: any;
    }[],
    Dispatch<SetStateAction<{ player: string; sum: number }[]>>
  ] = useState([
    {
      player: "",
      sum: 0,
    },
  ]);

  const scoreInput = useRef<HTMLInputElement>(null);

  const handleScore = (id: number, score: HTMLInputElement | null) => {
    const newScore = { ...playersScore }[id] ? { ...playersScore }[id] : [];
    if (!score || !isFinite(+score.value)) {
      return;
    }
    newScore.push(score?.value);
    setPlayersScore({ ...playersScore, [id]: newScore });
    console.log({ ...playersScore, [id]: newScore });
    if (score) score.value = "";
    setPlayerNow({ ...playerNow, set: playerNow.set + 1 });
    if (playerNow.set + 1 >= sets) {
      setPlayerNow({ player: players[id + 1], set: 0 });
      setPlayerId(id + 1);
      if (!players[id + 1]) {
        setShow(true);
      }
    }
  };

  const calculateResults = () => {
    const results = players
      .map((player, id) => {
        const score = playersScore[id] ? playersScore[id] : [];
        const sum = score.reduce((acc: number, cur: number) => +acc + +cur, 0);
        return { player, sum };
      })
      .sort((a, b) => b.sum - a.sum);
    setResults(results);
    setShowWinner(true);
  };

  return (
    <div>
      {!showWinner && (
        <>
          <p>Now Turn:</p>
          <h3>{playerNow.player}</h3>
          <p>Score:</p>
          <input className="main-input" type="text" ref={scoreInput} />
          <button
            className="main-button"
            disabled={show}
            onClick={() => handleScore(playerId, scoreInput.current)}
          >
            OK
          </button>
          <div className="names players">
            {players.map((el: string, index: number) => (
              <div className="player" key={el}>
                <span className="playerName">{`${index + 1}) ${el}`}</span>
                <div className="player-score">
                  {playersScore[index]?.map((el: string, id: number) => (
                    <span>{`${id + 1}) ${el}`}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {show && (
        <button className="show-results" onClick={calculateResults}>
          SHOW RESULTS
        </button>
      )}
      {showWinner && (
        <>
          <ul className="names">
            {results.map((el, id) => (
              <li>{`${id + 1}) ${el.player}: ${el.sum}`}</li>
            ))}
          </ul>
          <button className="reset-btn" onClick={resetGame}>
            RESET
          </button>
        </>
      )}
    </div>
  );
};

export default Counter;
