// import iconAnUong from "./icons/ic_an-uong.svg?raw";
// import iconGiaiTri from "./icons/ic_giai-tri.svg?raw";

// const iconList = [
//   { name: "Ăn uống", svg: iconAnUong },
//   { name: "Báo chí", svg: iconGiaiTri },
//   { name: "Chơi gamegame", svg: "" },
//   { name: "coffee", svg: "" },
//   { name: "Con đường", svg: "" },

//   { name: "Công việc", svg: "" },
//   { name: "điện thoại thông minh", svg: "" },
//   { name: "điên thoai", svg: "" },
//   { name: "Điện", svg: "" },
//   { name: "Đồ uống", svg: "" },
//   { name: "Du lịch", svg: "" },
//   { name: "Dù", svg: "" },
//   { name: "Dụng cụ học tập", svg: "" },
//   { name: "Gia đình", svg: "" },
//   { name: "Giải trí", svg: "" },
//   { name: "Giáo dục 1", svg: "" },
//   { name: "Giáo dục", svg: "" },
//   { name: "Giầy dép", svg: "" },
//   { name: "Hóa đơn", svg: "" },
//   { name: "Hóa đơn 1", svg: "" },
//   { name: "Học tập", svg: "" },
//   { name: "Huy chương", svg: "" },
//   { name: "Khách sạn", svg: "" },
//   { name: "Khám bênh", svg: "" },
//   { name: "Máy bay", svg: "" },
//   { name: "Môto", svg: "" },
//   { name: "Mua hàng", svg: "" },
//   { name: "Mua hoa", svg: "" },
//   { name: "Mua sắm", svg: "" },
//   { name: "Mục tiêutiêu", svg: "" },
//   { name: "Mỹ phẩm", svg: "" },
//   { name: "Ngấm cảnh", svg: "" },
//   { name: "Ngân hàng", svg: "" },
//   { name: "Nha cửa", svg: "" },
//   { name: "nhà máy", svg: "" },
//   { name: "ông ba", svg: "" },
//   { name: "Quà tặng", svg: "" },
//   { name: "Quần áo", svg: "" },
//   { name: "Sữa chữa", svg: "" },
//   { name: "Sức khỏe", svg: "" },
//   { name: "Thể thao", svg: "" },
//   { name: "Thú cưng", svg: "" },
//   { name: "Thu nhập", svg: "" },
//   { name: "Thức ăn cho thú", svg: "" },
//   { name: "Thưc uống", svg: "" },
//   { name: "Thuê nhà", svg: "" },
//   { name: "Thuốc lá", svg: "" },
//   { name: "Tiệc tùng", svg: "" },
//   { name: "Tiền nước", svg: "" },
//   { name: "Tiêt kiệm", svg: "" },
//   { name: "Tình yêu", svg: "" },
//   { name: "Trẻ em", svg: "" },
//   { name: "Trò chơi", svg: "" },
//   { name: "Vận chuyển", svg: "" },
//   { name: "Xăng xe", svg: "" },
//   { name: "Xe đạp", svg: "" },
//   { name: "Xe hơi", svg: "" },
// ];

// export default iconList;

// Tự động import tất cả SVG trong thư mục ./icons dưới dạng chuỗi HTML
// Sử dụng import raw với SVGR plugin
// Tự động import tất cả SVG trong thư mục icon dưới dạng chuỗi HTML
// Sử dụng import.meta.glob với Vite

const iconModules = import.meta.glob("./icon/*.svg", {
  eager: true,
  as: "raw",
});

// console.log("SVG modules found:", Object.keys(iconModules));

const iconList = Object.entries(iconModules).map(([path, svg]) => {
  const filename = path.split("/").pop().replace(".svg", "");

  const label = filename
    .replace(/^ic_/, "")
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // console.log(`Processing: ${path} -> ${label}`);

  return {
    name: label,
    svg,
  };
});

// console.log("Final iconList:", iconList);

export default iconList;
