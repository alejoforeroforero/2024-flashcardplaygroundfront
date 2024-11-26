import { useEffect } from "react";
import { useInfoDispatch, useInfoSelector } from "@/store/hooks";
import { getCategories } from "@/store/category-actions";
import { getCardsByCategory } from "@/store/card-actions";

const HeaderCagetoryList = () => {
  const dispatch = useInfoDispatch();
  const categories = useInfoSelector((state) => state.categories.list);
   

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleGetCardsByCategory = (id: number) => {
    dispatch(getCardsByCategory({id:id, page:0}));
  };

  return (
    <div className="card-header-category-list">
      {categories.map((category) => {
        return (
          <p
            onClick={() => handleGetCardsByCategory(category.id)}
            key={category.id}
          >
            {category.name}
          </p>
        );
      })}
    </div>
  );
};

export default HeaderCagetoryList;
