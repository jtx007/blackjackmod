import { useContext } from "react";
import { DeckContext } from "../context/DeckContext";
import Card from "./Card";

const DealerHand = ({ dealerValue }) => {
  const { dealerHand } = useContext(DeckContext);

  const renderDealerHand = () => {
    return dealerHand.map((card) => {
      return <Card key={card.code} image={card.image} value={card.value} />;
    });
  };

  return (
    <>
      <h3>Dealer Hand: {dealerValue}</h3>
      {renderDealerHand()}
    </>
  );
};

export default DealerHand;
