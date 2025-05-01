import "./CategoryDashboard.scss";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useEffect, useState } from "react";
import { getCategoryByUser } from "../../../services/CategoryService";
import { getCookie } from "../../../helpers/cookie";
import { Skeleton } from "antd";

function CategoryDashboard() {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = getCookie("id");

  useEffect(() => {
    if (!userId) return;

    const fetchApi = async () => {
      try {
        const result = await getCategoryByUser(userId);
        setCategoryList(result);
      } catch (err) {
        console.error("Lỗi khi fetch category:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApi();
  }, [userId]);

  return (
    <div className="category-dashboard">
      {loading ? (
        <div className="category-dashboard__skeleton">
          <Skeleton.Input
            active
            size="large"
            style={{ width: "100%", height: 100 }}
          />
        </div>
      ) : categoryList.length > 0 ? (
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
              <div className="category-dashboard__item animate__animated animate__fadeInUp">
                <div
                  className="category-dashboard__item--image"
                  dangerouslySetInnerHTML={{ __html: category.iconUrl }}
                />
                <span className="category-dashboard__item--name">
                  {category.name}
                </span>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      ) : (
        <div className="category-dashboard__empty">Không có danh mục nào</div>
      )}
    </div>
  );
}

export default CategoryDashboard;
