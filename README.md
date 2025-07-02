# 📦 vue-zoomster

A Vue 2 component for image **zoom**, **rotate**, **drag**, and **download**, powered by GSAP.

No bloat, just vibes. Works great for receipts, galleries, or anything you wanna inspect closer.

---

## 🚀 Features

- 🔍 Zoom In / Out
- 🔄 Rotate Left / Right
- 🖱️ Drag to Move (GSAP Draggable)
- 📥 Download Image
- 💡 Responsive Layout
- 📦 Lightweight – no Bootstrap or CSS frameworks

---

## 📦 Installation

```bash
npm install vue-zoomster gsap
```

---

## ▶️ Usage

> 💡 Don’t forget to **import the CSS** manually:

```js
import "vue-zoomster/dist/ZoomSter.css";
```

### ✅ Single Image Example

```vue
<template>
  <div>
    <ZoomSter
      :preview-image="'https://your-image-url.com/image.jpg'"
      :radius="'12px'"
      :ratio="'16/9'"
      :width="'100%'"
      :height="'auto'"
      :downloadable="true"
    />
  </div>
</template>

<script>
import { ZoomSter } from "vue-zoomster";
import "vue-zoomster/dist/ZoomSter.css"; // required!

export default {
  components: {
    ZoomSter,
  },
};
</script>
```

---

### 🔁 `v-for` Multiple Images Example

```vue
<template>
  <div class="gallery">
    <ZoomSter
      v-for="(img, idx) in images"
      :key="`zoom-${idx}`"
      :preview-image="img"
      :image-id="`img-${idx}`"
      :radius="'8px'"
      :ratio="'4/3'"
      :downloadable="true"
    />
  </div>
</template>

<script>
import { ZoomSter } from "vue-zoomster";
import "vue-zoomster/dist/ZoomSter.css"; // required!

export default {
  components: {
    ZoomSter,
  },
  data() {
    return {
      images: [
        "https://yourdomain.com/img1.jpg",
        "https://yourdomain.com/img2.jpg",
        "https://yourdomain.com/img3.jpg",
      ],
    };
  },
};
</script>
```

---

## ⚙️ Props

| Prop           | Type    | Default  | Description                                                            |
| -------------- | ------- | -------- | ---------------------------------------------------------------------- |
| `radius`       | String  | `"0"`    | Border radius of the thumbnail container. Accepts any valid CSS value. |
| `ratio`        | String  | `"16/9"` | Aspect ratio of the preview image. E.g. `"4/3"`, `"1/1"`, etc.         |
| `previewImage` | String  | `""`     | URL or path to the image you want to preview.                          |
| `imageId`      | String  | `""`     | Unique ID for the image preview instance. Required if using `v-for`.   |
| `width`        | String  | `"100%"` | Width of the image preview container. Accepts any valid CSS value.     |
| `height`       | String  | `"auto"` | Height of the image preview container. Accepts any valid CSS value.    |
| `downloadable` | Boolean | `false`  | If `true`, shows a download button in the viewer modal.                |

---

## 🙏 Credits

Icons by [Icons8](https://icons8.com)
