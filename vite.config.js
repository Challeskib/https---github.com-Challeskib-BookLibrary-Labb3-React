import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import alias from "vite-plugin-alias";

// export default defineConfig({
//   plugins: [
//     react(),
//     alias({
//       entries: [
//         {
//           find: "react-router-dom",
//           replacement: "react-router-dom/esm/react-router-dom.js",
//         },
//       ],
//     }),
//   ],
// });
