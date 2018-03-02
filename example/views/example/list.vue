<template>
  <div class="list">
    <div class="container">
      <div class="content" ref="content">
        <div v-for="(item, index) in list" :key="index" class="item">
          {{ index }}
        </div>
      </div>
      <div ref="refresh" class="refresh" v-show="touchDistanceY > 0">
        <loading
          :y="touchDistanceY"
          :isRefresh="isPullingDown">
        </loading>
      </div>
      <div class="load-footer" v-show="showFooter">
        {{ footerText }}
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import LScroll from 'src/index'
  import Loading from '../components/loading.vue'

  export default {
    components: {
      Loading,
    },
    data() {
      return {
        list: new Array(15),
        showFooter: false,
        touchDistanceY: 0,
        isPullingDown: false,
        onPullingUp: false,
        page: {
          totalCount: 6,
          currentPage: 0,
        },
      }
    },
    computed: {
      /**
       * 底部文案
       * @return {String} 返回字符串
       */
      footerText() {
        return this.onPullingUp ? '加载中...' : '已经到底了...'
      },
    },
    mounted() {
      this.init()
      this.fetch()
      this.setFooterVisible()
    },
    methods: {
      /**
       * 判断是否需要显示底部
       */
      setFooterVisible() {
        const list = this.$refs.content
        this.showFooter = list.offsetHeight >= this.$el.offsetHeight
      },
      /**
       * 加载数据
       */
      fetch(currentPage = 1) {
        if (currentPage > this.page.totalCount) return Promise.resolve()
        if (currentPage === 1) {
          this.list = new Array(15)
        } else {
          this.list = this.list.concat(new Array(15))
        }
        this.page.currentPage = currentPage
        return Promise.resolve()
      },
      /**
       * 初始化LScroll
       */
      init() {
        this._scroll = new LScroll('.container', {
          pullUpLoad: true,
          pullDownRefresh: true,
        })
        this._scroll.on('touchMove', this.touchMove)
        this._scroll.on('loadMore', this.loadMore)
        this._scroll.on('refresh', this.reFresh)
      },
      /**
       * 刷新拖拽
       */
      touchMove(y) {
        this.touchDistanceY = y
        this.setStyle()
      },
      /**
       * 控制loading样式
       */
      setStyle(time = 0) {
        const refresh = this.$refs.refresh
        const top = this.touchDistanceY

        if (refresh && top > 0) {
          const transition = time ? `transition:all ${time}s;` : ''
          refresh.style.cssText = `transform:translate3d(0,${top}px,0);${transition}`
        }
        return new Promise(resolve => setTimeout(resolve, time * 1000))
      },
      /**
       * 加载更多
       */
      loadMore() {
        console.log('call loadMore')
        this.onPullingUp = true
        this.fetch(this.page.currentPage + 1).then(() => {
          this.onPullingUp = false
          this._scroll.finishLoad()
        })
      },
      /**
       * 刷新
       */
      reFresh() {
        console.log('call refresh')
        this.isPullingDown = true
        this.fetch(1).then(() => {
          setTimeout(() => {
            this.isPullingDown = false
            this._scroll.finishLoad()
          }, 500)
        })
      },
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

  .list {
    height: 100vh;
  }

  .container {
    height: 100%;
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;

    & .content {
      overflow: hidden;
    }

    & .item {
      height: 200px;
      line-height 200px;
      background: #eee;
      margin-bottom: 40px;
      font-size: 32px;

      &:last-child {
        margin: 0;
      }
    }

    & .refresh {
      position: absolute;
      left: 0;
      top: -100px;
      line-height: 160px;
      text-align: center;
      height: 160px;
      width: 100%;
      color: #404040;
      font-size: 26px;
      z-index: 20;
    }

    & .load-footer {
      height: 80px;
      line-height: 80px;
      text-align: center;
    }
  }
</style>
