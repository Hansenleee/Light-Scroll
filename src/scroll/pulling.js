/**
 * 上拉加载更多
 * 下拉刷新
 */

export default (LScroll) => {
  // 上拉加载更多
  LScroll.prototype._pullingUpLoad = () => {
    // 标记正在加载更多
    this.onPullUpLoading = true
    // 触发加载更多事件
    this.emit('loadMore')
  }
}
