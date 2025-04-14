import "./CategoryDashboard.scss";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

function CategoryDashboard() {
  const categoryList = [
    {
      name: "Ăn uống",
      svg: "https://img.icons8.com/color/96/restaurant.png",
    },
    {
      name: "Mua sắm",
      svg: "https://img.icons8.com/color/96/shopping-cart-loaded.png",
    },
    {
      name: "Điện nước",
      svg: "https://img.icons8.com/color/96/electrical.png",
    },
    {
      name: "Giải trí",
      svg: "https://img.icons8.com/color/96/popcorn.png",
    },
    {
      name: "Đi lại",
      svg: "https://img.icons8.com/color/96/car--v1.png",
    },
  ];

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
          pagination: true,
        }}
      >
        {categoryList.map((category, index) => (
          <SplideSlide key={index}>
            <div className="category-dashboard__item">
              <div className="category-dashboard__item--image">
                <img
                  src={category.svg}
                  alt={category.name}
                  className="category-dashboard__item--icon"
                />
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
