import { Outlet } from "react-router-dom";
import "./App.css";

export type Card = {
  id: number;
  front: string;
  back: string;
  active: boolean;
  categoryId: boolean;
  category: {
    id: number;
    name: string;
  };
};

export type Category = {
  id: number;
  name: string;
  cards: Card[];
};

function App() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
