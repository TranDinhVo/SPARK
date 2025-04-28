import "./CategoryDashboard.scss";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useEffect, useState } from "react";
import { getCategoryByUser } from "../../../services/CategoryService";
import { getCookie } from "../../../helpers/cookie";

function CategoryDashboard() {
  const [categoryList, setCategoryList] = useState([]);
  const userId = getCookie("id");
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCategoryByUser(userId);
      setCategoryList(result);
    };
    fetchApi();
  }, []);

  return (
    <div className="category-dashboard">
      <Splide
        options={{
          type: "loop",
          perPage: 3,
          focus: "center",
          autoplay: true,
          interval: 3000,
          speed: 1000,
          gap: "1rem",
          arrows: false,
          pagination: false,
        }}
      >
        {categoryList.map((category, index) => (
          <SplideSlide key={index}>
            <div className="category-dashboard__item">
              <div
                className="category-dashboard__item--image"
                dangerouslySetInnerHTML={{
                  __html: category.iconUrl,
                }}
              >
                {/* <img
                  src={category.svg}
                  alt={category.name}
                  className="category-dashboard__item--icon"
                /> */}
              </div>
              <span className="category-dashboard__item--name">
                {category.name}
              </span>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}

export default CategoryDashboard;
