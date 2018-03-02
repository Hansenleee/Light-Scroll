<template>
  <div class="components-scroll-loading">
    <canvas v-show="!isRefresh" ref="loading" :width="100" :height="100" :style="rotateStyle"></canvas>
    <div v-show="isRefresh" class="on-loading">
      <svg class="loading" viewBox="25 25 50 50">
        <circle class="path" cx="50" cy="50" r="12" fill="none" stroke-width="2" stroke-miterlimit="10"/>
      </svg>
    </div>
  </div>
</template>
<script type="text/babel">
  export default {
    props: {
      /**
       * 下拉的距离
       * @type {Number}
       */
      y: {
        type: Number,
        default: 0,
      },
      /**
       * 是否刷新中
       * @type {Boolean}
       */
      isRefresh: {
        type: Boolean,
        default: false,
      },
    },
    mounted() {
      this.initVarible()
      this.init()
    },
    computed: {
      /**
       * canvas旋转样式
       * @return {Object} 样式对象
       */
      rotateStyle() {
        return `transform: rotateZ(${this.y * 3}deg)`
      },
    },
    methods: {
      /**
       * 初始化参数
       */
      initVarible() {
        // 获取像素比
        this._radio = document.documentElement.getAttribute('data-font-size') / 25
        // 最小圆半径
        this._minArrowRadius = 14 * this._radio
        // 宽度
        this._arrowWidth = 3 * this._radio
        // 初始化圆心位置
        this._initCenter = {
          x: 25 * this._radio,
          y: 25 * this._radio,
        }
        // 头部圆形位置
        this.headerPosition = {
          x: this._initCenter.x,
          y: this._initCenter.y,
        }
      },
      /**
       * 初始化
       */
      init() {
        const loading = this.$refs.loading
        const ctx = this._ctx = loading.getContext('2d')
        // 清理区域
        ctx.clearRect(0, 0, loading.width, loading.height)
        this.drawArrow()
      },
      /**
       * 绘制内部箭头
       */
      drawArrow() {
        /* eslint-disable */
        const ctx = this._ctx
        // 保存默认状态
        ctx.save()
        ctx.beginPath()
        const arrowRadius = this._minArrowRadius
        const insideRadius = arrowRadius - this._arrowWidth
        const headerPosition = this.headerPosition
        // 画内圆
        ctx.arc(headerPosition.x, headerPosition.y, insideRadius, -Math.PI / 2, 0, true)
        // 画外圆
        ctx.arc(headerPosition.x, headerPosition.y, arrowRadius, 0, (Math.PI * 3) / 2, false)
        ctx.lineTo(headerPosition.x, headerPosition.y - arrowRadius - this._arrowWidth)
        ctx.lineTo(headerPosition.x + this._arrowWidth * 2,
                   headerPosition.y - arrowRadius + this._arrowWidth / 2)
        ctx.lineTo(headerPosition.x,
                   headerPosition.y - arrowRadius + this._arrowWidth * 2)
        ctx.fillStyle = 'rgb(249,78,84)'
        ctx.fill()
        ctx.restore()
        /* eslint-enable */
      },
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .components-scroll-loading {
    & canvas, & .on-loading {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0px 0px 8px 4px #acacac;
    }

    & .on-loading {
      margin: 0 auto;

      & .loading {
        animation: rotate 2s linear infinite;
        transform-origin: center center;

        & .path {
          stroke: #f94e54;
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
          stroke-linecap: round;
          animation: dash 1.5s ease-in-out infinite;
        }
      }
    }
  }

  @keyframes rotate {
    100% {
      -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -40px;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -148px;
    }
  }
</style>
