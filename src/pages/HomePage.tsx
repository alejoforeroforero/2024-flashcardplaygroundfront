import { useEffect } from "react";
import { useInfoDispatch, useInfoSelector } from "@/store/hooks";
import { fetchPaginatedCards, getCardsByCategory, searchCards } from "@/store/card-actions";
import CardList from "@/components/cards/CardList";
import Header from "@/components/header/Header";
import Pagination from "@/components/ui/Pagination";

const HomePage = () => {
  const dispatch = useInfoDispatch();

  const { info, totalCount, currentPage, mode, categoryIdView, query } =
    useInfoSelector((state) => state.cards);

  useEffect(() => {
    // Only fetch on initial load if currentPage is 0
    if (currentPage === 0) {
      if (mode === "all") {
        dispatch(fetchPaginatedCards({ page: 0 }));
      } else if (mode === "category") {
        dispatch(getCardsByCategory({ id: categoryIdView, page: 0 }));
      } else if (mode === "search") {
        const searchParams = {
          query:query,
          page: 0
        };
        dispatch(searchCards(searchParams));
      }
    }
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (mode === "all") {
      dispatch(fetchPaginatedCards({ page: newPage }));
    } else if (mode === "category") {
      dispatch(getCardsByCategory({ id: categoryIdView, page: newPage }));
    } else if (mode === "search") {
      const searchParams = {
        query:query,
        page: newPage
      };
      dispatch(searchCards(searchParams));
      //dispatch(getCardsByCategory({ id: categoryIdView, page: newPage }));
    }
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <div className="card-list-container">
        <CardList cards={info} />
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default HomePage;
