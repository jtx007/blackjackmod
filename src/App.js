import Table from "./components/Table";
import { DeckProvider } from "./context/DeckContext";
const App = () => {
  return (
    <div className="room">
      <DeckProvider>
        <Table />
      </DeckProvider>
    </div>
  );
};

export default App;
