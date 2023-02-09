import { useParams } from 'react-router-dom';

function Game() {
  const { id } = useParams();
  return <div className="Game">Game ID: {id}</div>;
}

export default Game;
