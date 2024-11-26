import { useState } from "react";
import { useInfoDispatch } from "@/store/hooks";
import { fetchPaginatedCards } from "@/store/card-actions";
import HeaderNewCard from "./HeaderNewCard";
import HeaderCagetoryList from "./HeaderCagetoryList";
import Search from "../ui/Search";

import "./Header.css";

const Header = () => {
  const [createOn, setShowCreate] = useState<boolean>(false);
  const [categoriasOn, setShowCategorias] = useState<boolean>(false);

  const dispatch = useInfoDispatch();

  const handleCreateOn = () => {
    setShowCreate(!createOn);
    setShowCategorias(false);
  };

  const handleCategoriasOn = () => {
    if (categoriasOn) {
      console.log("entro");
      dispatch(fetchPaginatedCards({ page: 0 }));
    }
    setShowCategorias(!categoriasOn);
    setShowCreate(false);
  };

  return (
    <div id="card-header">
      <div className="card-header-top">
        <p className="header-button" onClick={handleCreateOn}>
          Crear
        </p>
        <p className="header-button" onClick={handleCategoriasOn}>
          Categorias
        </p>
        <Search />
      </div>
      {createOn && <HeaderNewCard />}
      {categoriasOn && <HeaderCagetoryList />}
    </div>
  );
};

export default Header;
