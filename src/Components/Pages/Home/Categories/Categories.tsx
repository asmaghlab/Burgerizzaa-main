import React from "react";
import "./Categories.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Category {
  id: string;
  name: string;
}

interface Item {
  id: string;
  name: string;
  category: string;
}

const Categories: React.FC = () => {
  const navigate = useNavigate();

  // ✅ Fetch categories
  const { data: categories = [], isLoading: loadingCats } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get<Category[]>(
        "https://68e3e5f38e116898997a5f72.mockapi.io/Categories"
      );
      return data;
    },
  });

  // ✅ Fetch items
  const { data: items = [], isLoading: loadingItems } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const { data } = await axios.get<Item[]>(
        "https://68e3e5f38e116898997a5f72.mockapi.io/items"
      );
      return data;
    },
  });

  const isLoading = loadingCats || loadingItems;

  const categoryEmojis: Record<string, string> = {
    pizza: "🍕",
    burger: "🍔",
    dessert: "🍰",
    drinks: "🍹",
  };

  if (isLoading)
    return <p className="text-center mt-5">Loading categories...</p>;

  const handleCategoryClick = (category: string) => {
    navigate("/menu", { state: { category } });
  };

  return (
    <div id="categories">
      <div className="container_box categories_box">
        <div className="categories_title">
          <h3 className="mt-2">Popular Categories</h3>
        </div>

        <div className="cate_carts">
          {categories.map((cat) => {
            const emoji =
              categoryEmojis[cat.name.toLowerCase()] || "📦";
            const count = items.filter(
              (item) => item.category.toLowerCase() === cat.name.toLowerCase()
            ).length;

            return (
              <div
                key={cat.id}
                className="cate_cart"
                onClick={() => handleCategoryClick(cat.name)}
                style={{ cursor: "pointer" }}
              >
                <h3>{emoji}</h3>
                <p className="fw-bold">{cat.name}</p>
                <p className="text-muted">
                  {count} {count === 1 ? "item" : "items"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
