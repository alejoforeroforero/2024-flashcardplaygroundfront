import { useState, useEffect, type ChangeEvent } from "react";
import { searchCards, fetchPaginatedCards } from "@/store/card-actions";
import { useInfoDispatch } from "@/store/hooks";
import { useDebounce } from "@/hooks/hooks";

import './Search.css';

const Search = () => {
  const dispatch = useInfoDispatch();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (debouncedSearch) {
      const searchParams = {
        query: debouncedSearch,
        page: 0
      };
      dispatch(searchCards(searchParams));
    }else{
       dispatch(fetchPaginatedCards({ page: 0 }));
    }
  }, [debouncedSearch, dispatch]);


  return (
    <div className="search">
      <div>
        <input
          value={searchValue}
          onChange={handleOnChange}
          type="text"
          placeholder="Search cards..."
        />
      </div>
    </div>
  );
};

export default Search;
