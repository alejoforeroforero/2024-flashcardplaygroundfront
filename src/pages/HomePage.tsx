import { useEffect } from "react";
import { useInfoDispatch, useInfoSelector } from "@/store/hooks";
import {
  fetchPaginatedCards,
  getCardsByCategory,
  searchCards,
} from "@/store/card-actions";
import { signIn } from "@/store/user-actions";
import CardList from "@/components/cards/CardList";
import Header from "@/components/header/Header";
import Pagination from "@/components/ui/Pagination";

const HomePage = () => {
  const dispatch = useInfoDispatch();

  const user = useInfoSelector((state) => state.user);

  const { info, totalCount, currentPage, mode, categoryIdView, query } =
    useInfoSelector((state) => state.cards);

  useEffect(() => {
    if (user.id > 0) {
      if (currentPage === 0) {
        if (mode === "all") {
          dispatch(fetchPaginatedCards({ page: 0, userId: user.id }));
        } else if (mode === "category") {
          dispatch(getCardsByCategory({ id: categoryIdView, page: 0 }));
        } else if (mode === "search") {
          const searchParams = {
            query: query,
            page: 0,
          };
          dispatch(searchCards(searchParams));
        }
      }
    }
  }, [user, currentPage, mode, categoryIdView, query, dispatch]);

  const handlePageChange = (newPage: number) => {
    if (mode === "all") {
      dispatch(fetchPaginatedCards({ page: newPage, userId: user.id }));
    } else if (mode === "category") {
      dispatch(getCardsByCategory({ id: categoryIdView, page: newPage }));
    } else if (mode === "search") {
      const searchParams = {
        query: query,
        page: newPage,
      };
      dispatch(searchCards(searchParams));
    }
  };

  const handleSignin = () => {
    const userEmail = "alejoforeroforero@gmail.com";
    dispatch(signIn({ email: userEmail }));
  };

  return (
    <>
      {!user.isSignedIn && <button onClick={handleSignin}>Sigin</button>}
      {user.isSignedIn && (
        <>
          <h1>{user.email}</h1>
          <header>
            <Header />
          </header>
          <div className="card-list-container">
            {info.length > 0 && <CardList cards={info} />}
          </div>
          <div>
            <Pagination
              currentPage={currentPage}
              totalCount={totalCount}
              handlePageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
