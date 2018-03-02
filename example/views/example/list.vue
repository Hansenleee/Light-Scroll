<template>
  <div class="list">
    <div class="container">
      <div class="content">
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
        touchDistanceY: 0,
        isPullingDown: false,
        page: {
          totalCount: 6,
          currentPage: 0,
        },
      }
    },
    mounted() {
      this.init()
      this.fetch()
    },
    methods: {
      /**
       * 加载数据
       */
      fetch(currentPage = 1) {
        if (currentPage > this.page.totalCount) return Promise.reject()
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

        if (refresh) {
          const top = this.touchDistanceY
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
        this.fetch(++this.page.currentPage).then(() => {
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
  }
</style>
