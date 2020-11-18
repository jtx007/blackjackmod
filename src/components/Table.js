import { useContext, useState, useEffect } from "react";
import { DeckContext } from "../context/DeckContext";
import DealerHand from "./DealerHand";
import PlayerHand from "./PlayerHand";
const Table = () => {
  const { playerHand, dealerHand } = useContext(DeckContext);
  const [playerValue, setPlayerValue] = useState("");
  const [dealerValue, setDealerValue] = useState("");
  const [gameStatus, setGameStatus] = useState("");

  useEffect(() => {
    const calculateHandValues = () => {
      let dealerValueTotal = 0;
      let playerValueTotal = 0;
      dealerHand.forEach((card) => {
        if (
          card.value === "KING" ||
          card.value === "QUEEN" ||
          card.value === "JACK"
        ) {
          dealerValueTotal += 10;
        } else if (card.value === "ACE") {
          if (dealerValueTotal + 11 > 21) {
            dealerValueTotal += 1;
          } else {
            dealerValueTotal += 11;
          }
        } else {
          dealerValueTotal += parseInt(card.value);
        }
      });
      playerHand.forEach((card) => {
        if (
          card.value === "KING" ||
          card.value === "QUEEN" ||
          card.value === "JACK"
        ) {
          playerValueTotal += 10;
        } else if (card.value === "ACE") {
          if (playerValueTotal + 11 > 21) {
            playerValueTotal += 1;
          } else {
            playerValueTotal += 11;
          }
        } else {
          playerValueTotal += parseInt(card.value);
        }
      });
      if (playerValueTotal > 21) {
        setGameStatus("YOU LOSE");
      }

      setPlayerValue(playerValueTotal);
      setDealerValue(dealerValueTotal);
    };

    calculateHandValues();
  }, [playerHand, dealerHand]);

  const standEnd = () => {
    if (playerValue > dealerValue) {
      setGameStatus("You WIN");
    } else {
      setGameStatus("YOU LOSE");
    }
  };

  return (
    <div className="table">
      {gameStatus && <h1>{gameStatus}</h1>}
      <DealerHand dealerValue={dealerValue} />
      <PlayerHand
        standEnd={standEnd}
        gameStatus={gameStatus}
        playerValue={playerValue}
      />
    </div>
  );
};

export default Table;
