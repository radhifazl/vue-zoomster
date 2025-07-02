<template>
  <div
    class="image-preview-container"
    :style="{
      width: width || '100%',
      height: height || 'auto',
      borderRadius: radius,
    }"
  >
    <div class="thumbnail-wrapper" @click="expandImage">
      <img
        :src="previewImage"
        class="preview-thumbnail"
        :style="{
          aspectRatio: ratio,
        }"
      />
    </div>

    <div class="expand-icon" @click="expandImage">
      <img :src="expandIcon" alt="Expand" />
    </div>

    <div v-if="showViewer" class="modal-viewer">
      <button class="back-button" @click="closeModal">
        <img :src="closeIcon" alt="Close" style="width: 18px; height: 18px" />
      </button>

      <div
        class="image-wrapper"
        ref="wrapper"
        :style="{
          cursor: scaleSize > 1 ? 'move' : 'default',
          pointerEvents: scaleSize > 1 ? 'auto' : 'none',
        }"
      >
        <div
          :class="`g-image-preview-wrapper-${this.imageId}`"
          :style="{
            height: '100vh !important',
            cursor: scaleSize > 1 ? 'move' : 'default',
            maxHeight: '100vh !important',
            maxWidth: '100vw !important',
            cursor: scaleSize > 1 ? 'move' : 'default',
            pointerEvents: scaleSize > 1 ? 'auto' : 'none',
            transition: '0.3s ease-in-out',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }"
        >
          <img
            :ref="`imageElement${imageId}`"
            :src="previewImage"
            class="image-zoomable"
            :style="{
              objectFit: isMobile ? 'cover' : 'none',
            }"
          />
        </div>
      </div>

      <div class="controls">
        <button @click="zoomIn">
          <img
            :src="zoominIcon"
            alt="Zoom In"
            style="width: 18px; height: 18px"
          />
        </button>
        <button @click="zoomOut">
          <img
            :src="zoomoutIcon"
            alt="Zoom Out"
            style="width: 18px; height: 18px"
          />
        </button>
        <button @click="rotateLeft">
          <img
            :src="rotateLeftIcon"
            alt="Rotate Left"
            style="width: 16px; height: 16px"
          />
        </button>
        <button @click="rotateRight">
          <img
            :src="rotateRightIcon"
            alt="Rotate Left"
            style="width: 16px; height: 16px"
          />
        </button>
        <button v-if="downloadable" @click="downloadImage">
          <img
            :src="downloadIcon"
            alt="Download"
            style="width: 20px; height: 20px"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap, Draggable } from "gsap/all";
import expandIcon from "./assets/expand.png";
import downloadIcon from "./assets/download.png";
import closeIcon from "./assets/close.png";
import rotateLeftIcon from "./assets/rotate-left.png";
import rotateRightIcon from "./assets/rotate-right.png";
import zoomoutIcon from "./assets/zoom-out.png";
import zoominIcon from "./assets/zoom-in.png";
import "./zoomster.css";

export default {
  name: "ZoomsterImagePreview",
  props: {
    radius: {
      type: String,
      default: "0",
    },
    ratio: {
      type: String,
      default: "16/9",
    },
    previewImage: {
      type: String,
      default: "",
    },
    imageId: {
      type: String,
      default: "1",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "auto",
    },
    downloadable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rotatePosition: 0,
      scaleSize: 1,
      showViewer: false,
      isLandscape: false,
      imageElement: `imageElement${this.imageId}`,
      expandIcon,
      downloadIcon,
      closeIcon,
      zoomoutIcon,
      zoominIcon,
      rotateLeftIcon,
      rotateRightIcon,
    };
  },
  computed: {
    isMobile() {
      return window && window.innerWidth <= 768;
    },
  },
  watch: {
    scaleSize(oldVal, newVal) {
      if (oldVal < newVal) {
        this.resetDraggable();
      }
    },
  },
  mounted() {
    gsap.registerPlugin(Draggable);
  },
  methods: {
    expandImage() {
      this.showViewer = true;

      this.resetDraggable();

      this.$nextTick(() => {
        const imageElement = this.$refs[this.imageElement];
        Draggable.create(imageElement, {
          type: "x,y",
          bounds: `.g-image-preview-wrapper-${this.imageId}`,
          edgeResistance: 1,
          dragClickables: true,
          allowContextMenu: true,
          zIndexBoost: false,
          minimumMovement: 2,

          onDragEnd: () => {
            if (!this.isMobile) {
              setTimeout(() => {
                this.resetDraggable();
              }, 60000);
            }
          },
          onPress() {
            gsap.set(imageElement, { willChange: "transform" });
          },
          onRelease() {
            gsap.set(imageElement, { clearProps: "willChange" });
          },
        });
      });
    },

    zoomIn() {
      this.scaleSize += 0.5;
      this.gsapScaleTo(this.scaleSize);
    },

    zoomOut() {
      if (this.scaleSize <= 1) {
        this.scaleSize = 1;
        this.gsapScaleTo(this.scaleSize);
      } else {
        this.scaleSize -= 0.5;
        this.gsapScaleTo(this.scaleSize);
      }
    },

    rotateLeft() {
      this.rotatePosition -= 90;

      this.scaleSize = 1;
      this.gsapScaleTo(this.scaleSize);
      //  rotate image to left
      this.gsapRotateTo(this.rotatePosition);

      if (Math.abs(this.rotatePosition) % 180 === 90) {
        this.isLandscape = true;
      } else {
        this.isLandscape = false;
      }

      this.resetDraggable();
    },

    rotateRight() {
      this.rotatePosition += 90;

      this.scaleSize = 1;
      this.gsapScaleTo(this.scaleSize);
      this.gsapRotateTo(this.rotatePosition);

      if (Math.abs(this.rotatePosition) % 180 === 90) {
        this.isLandscape = true;
      } else {
        this.isLandscape = false;
      }

      this.resetDraggable();
    },

    downloadImage() {
      const link = document.createElement("a");
      link.href = this.previewImage;
      link.download = "image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    closeModal() {
      this.resetDraggable();
      this.showViewer = false;

      const imageElement = this.$refs[this.imageElement];

      setTimeout(() => {
        this.scaleSize = 1;
        this.rotatePosition = 0;
        gsap.to(imageElement, {
          duration: 0.5,
          rotate: 0,
          scale: 1,
          ease: "power4.out",
        });
      }, 200);
    },

    resetDraggable() {
      const imageElement = this.$refs[this.imageElement];
      gsap.to(imageElement, {
        duration: 0.5,
        x: 0,
        y: 0,
        ease: "power4.out",
      });
    },

    gsapRotateTo(rotatePos) {
      const imageElement = this.$refs[this.imageElement];
      gsap.to(imageElement, {
        duration: 0.15,
        rotate: rotatePos,
        ease: "power4.out",
      });
    },

    gsapScaleTo(scaleSize) {
      const imageElement = this.$refs[this.imageElement];
      gsap.to(imageElement, {
        duration: 0.15,
        scale: scaleSize,
        ease: "none",
      });
    },
  },
};
</script>
