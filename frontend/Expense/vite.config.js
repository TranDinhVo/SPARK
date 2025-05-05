// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import svgr from "vite-plugin-svgr";

// export default defineConfig({
//   plugins: [react(), svgr()],
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      // Cấu hình SVGR để hỗ trợ cả component và raw string
      svgrOptions: {
        // Các tùy chọn SVGR
        exportType: "named",
        ref: true,
      },
      // Cho phép sử dụng ?raw trong import
      include: "**/*.svg",
    }),
  ],
  resolve: {
    alias: {
      // Có thể thêm alias nếu cần
    },
  },
});
