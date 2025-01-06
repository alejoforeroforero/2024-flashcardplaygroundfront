import { useState } from "react";
import { useInfoDispatch, useInfoSelector } from "@/store/hooks";
import { fetchPaginatedCards } from "@/store/card-actions";
import HeaderNewCard from "./HeaderNewCard";
import HeaderCagetoryList from "./HeaderCagetoryList";
import HeaderSettings from "./HeaderSettings";
import Search from "../ui/Search";

import "./Header.css";

const Header = () => {
  const user = useInfoSelector((state) => state.user);
  // const categories = useInfoSelector((state) => state.categories);
  const [createOn, setShowCreate] = useState<boolean>(false);
  const [categoriasOn, setShowCategorias] = useState<boolean>(false);
  const [settingsOn, setShowSettings] = useState<boolean>(false);

  const dispatch = useInfoDispatch();

  const handleCreateOn = () => {
    setShowCreate(!createOn);
    setShowCategorias(false);
    setShowSettings(false);
  };

  const handleCategoriasOn = () => {
    if (categoriasOn) {
      dispatch(fetchPaginatedCards({ page: 0, userId: user.id }));
    }
    setShowCategorias(!categoriasOn);
    setShowCreate(false);
    setShowSettings(false);
  };

  const handleSettingsOn = () => {
    setShowCategorias(false);
    setShowCreate(false);
    setShowSettings(!settingsOn);
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
        <p className="header-button" onClick={handleSettingsOn}>
          *
        </p>
      </div>
      {createOn && <HeaderNewCard />}
      {categoriasOn && <HeaderCagetoryList />}
      {settingsOn && <HeaderSettings />}
    </div>
  );
};

export default Header;
