const { createVuePlugin } = require("vite-plugin-vue2");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  plugins: [createVuePlugin()],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: "./src/ZoomSter.vue",
      name: "VueZoomSter",
      fileName: (format) => `vue-zoomster.${format}.js`,
    },
    rollupOptions: {
      external: ["vue", "gsap"],
      output: {
        globals: {
          vue: "Vue",
          gsap: "gsap",
        },
      },
    },
  },
});
