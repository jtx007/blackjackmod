import { useContext } from "react";
import { DeckContext } from "../context/DeckContext";
import Card from "./Card";
const PlayerHand = ({ playerValue, gameStatus, standEnd }) => {
  const { playerHand, setPlayerHand, deckId } = useContext(DeckContext);

  const renderPlayerHand = () => {
    return playerHand.map((card) => {
      return <Card key={card.code} image={card.image} value={card.value} />;
    });
  };

  const addCard = async () => {
    const fetchNewCard = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const data = await fetchNewCard.json();
    const { cards } = data;
    setPlayerHand([...playerHand, cards[0]]);
  };

  return (
    <div>
      <h3>Player Hand: {playerValue}</h3>
      {renderPlayerHand()}
      <br />
      <button disabled={gameStatus ? true : false} onClick={addCard}>
        Hit
      </button>
      <button onClick={standEnd} disabled={gameStatus ? true : false}>
        Stand
      </button>
    </div>
  );
};

export default PlayerHand;
