/**
 * 滚动触摸相关事件
 */

export default (LScroll) => {
  /**
   * 滚动事件
   */
  LScroll.prototype._onScroll = () => {
    const wrapper = this.wrapper
    const threshold = this._pullUpLoad.threshold || 0

    if (wrapper.scrollTop + wrapper.offsetHeight + threshold
      >= wrapper.scrollHeight && !this.onPullUpLoading) {
      // 触发下拉刷新
      this._pullingUpLoad()
    }
  }

  /**
   * 触摸开始事件
   */
  LScroll.prototype._touchStart = (e) => {}

  /**
   * 触摸移动事件
   */
  LScroll.prototype._touchMove = (e) => {}

  /**
   * 触摸结束事件
   */
  LScroll.prototype._touchEnd = () => {}
} 
