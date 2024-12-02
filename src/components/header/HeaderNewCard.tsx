import { useRef, type FormEvent } from "react";
import { useInfoDispatch, useInfoSelector } from "@/store/hooks";
import { fetchPaginatedCards, createCard } from "@/store/card-actions";
import HeaderCategory from "./HeaderCategory";

const HeaderNewCard = () => {
  const dispatch = useInfoDispatch();
  const front = useRef<HTMLInputElement>(null);
  const back = useRef<HTMLInputElement>(null);
  const categoryS = useInfoSelector((state) => state.categories.idSelected);

  const handleOnSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const frontValue = front.current!.value;
    const backValue = back.current!.value;


    if (frontValue !== "" && backValue !== "" && categoryS > 0) {
      const cardObj = {
        card: {
          front: frontValue,
          back: backValue,
          category_id: categoryS,
          user_id:1
        },
        onAfterCreate: () => {
          dispatch(fetchPaginatedCards({ page: 0, userId:1 }));
        },
      };

      dispatch(createCard(cardObj));

      e.currentTarget.reset();
    } else {
      alert("entra algo en cards");
    }
  };

  return (
    <div className="form-container">
      <div className="form-container-int">
        <HeaderCategory />
        <form onSubmit={handleOnSave}>
          <p>
            <label htmlFor="front">Front</label>
            <input id="front" type="text" ref={front} />
          </p>
          <p>
            <label htmlFor="back">Back</label>
            <input id="back" type="text" ref={back} />
          </p>
          <button>Save</button>
        </form>
      </div>
    </div>
  );
};

export default HeaderNewCard;
