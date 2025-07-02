import ZoomSter from "./src/ZoomSter.vue";
import "./src/zoomster.css";

export function install(Vue) {
  Vue.component("ZoomSter", ZoomSter);
}

export { ZoomSter };

export default {
  install,
};
