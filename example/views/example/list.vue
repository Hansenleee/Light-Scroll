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
      }
    },
    mounted() {
      this._scroll = new LScroll('.container', {
        pullUpLoad: true,
        pullDownRefresh: true,
      })
      this._scroll.on('loadMore', () => {
        console.log(111)
      })
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
