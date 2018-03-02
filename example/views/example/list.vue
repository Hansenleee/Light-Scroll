<template>
  <div class="list">
    <div class="container">
      <div class="content">
        <div v-for="(item, index) in list" :key="index" class="item">
          {{ index }}
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import LScroll from 'src/index'

  export default {
    data() {
      return {
        list: new Array(15),
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
        this._scroll.on('loadMore', this.loadMore)
        this._scroll.on('reFresh', this.reFresh)
      },
      /**
       * 加载更多
       */
      loadMore() {
        this.fetch(++this.page.currentPage).then(() => {
          this._scroll.finishLoad()
        })
      },
      /**
       * 刷新
       */
      reFresh() {
        console.log('fresh')
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
      height: 100px;
      line-height 100px;
      background: #eee;
      margin-bottom: 20px;
    }
  }
</style>
