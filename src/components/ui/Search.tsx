import { useState, useEffect, type ChangeEvent } from "react";
import { searchCards, fetchPaginatedCards } from "@/store/card-actions";
import { useInfoDispatch } from "@/store/hooks";
import { useDebounce } from "@/hooks/hooks";
import { useInfoSelector } from "@/store/hooks";

import "./Search.css";

const Search = () => {
  const dispatch = useInfoDispatch();
  const user = useInfoSelector((state) => state.user);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (debouncedSearch) {
      const searchParams = {
        query: debouncedSearch,
        page: 0,
        userId:user.id
      };
      dispatch(searchCards(searchParams));
    } else {
      if (user.id > 0) {
        dispatch(fetchPaginatedCards({ page: 0, userId: user.id }));
      }
    }
  }, [debouncedSearch, dispatch, user.id]);

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
