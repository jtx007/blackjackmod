import { createContext, useEffect, useState } from "react";

export const DeckContext = createContext();

export const DeckProvider = ({ children }) => {
  const [deckId, setDeckId] = useState("");
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);

  useEffect(() => {
    const fetchNewDeckAndDealCards = async () => {
      const response = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      const data = await response.json();
      const { deck_id } = data;
      setDeckId(deck_id);
      const response2 = await fetch(
        `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=4`
      );
      const cardsData = await response2.json();
      const { cards } = cardsData;
      setDealerHand([cards[0], cards[2]]);
      setPlayerHand([cards[1], cards[3]]);
    };

    fetchNewDeckAndDealCards();
  }, []);

  return (
    <DeckContext.Provider
      value={{ deckId, dealerHand, playerHand, setPlayerHand }}
    >
      {children}
    </DeckContext.Provider>
  );
};
