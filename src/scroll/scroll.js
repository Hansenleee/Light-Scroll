/**
 * 滚动触摸相关事件
 */

export default (LScroll) => {
  /**
   * 滚动事件
   */
  LScroll.prototype._onScroll = function() {
    const wrapper = this.wrapper
    // 加载更多触发的阈值
    const threshold = this._pullUpLoad.threshold || this.constructor.PULLDONG_LOAD_THRESHOLD

    if (wrapper.scrollTop + wrapper.offsetHeight + threshold
      >= wrapper.scrollHeight && !this.onPullUpLoading) {
      // 触发下拉刷新
      this._pullingUpLoad()
    }
  }

  /**
   * 触摸开始事件
   */
  LScroll.prototype._touchStart = function(e) {
    const touch = e.touches[0]
    this.startY = touch.clientY
    this.onTouch = true
    this.touchDistanceY = 0
  }

  /**
   * 触摸移动事件
   * touchmove事件目前仅针对下拉刷新，下拉刷新的触发点如下
   * 1.scrollTop为0
   * 2.向下滑动
   */
  LScroll.prototype._touchMove = function(e) {
    if (!this.onTouch) return false
    const scrollTop = this.wrapper.scrollTop
    const touch = e.touches[0]
    const y = touch.clientY
    // 每次滑动的距离
    const disY = y - this.startY
    this.startY = y
    // 判断方向是否符合下拉刷新
    if (scrollTop !== 0 || (disY < 0 && this.touchDistanceY === 0)) {
      return this._touchEndHandler()
    }
    e.preventDefault()
    this.touchDistanceY += disY
    // 判断是否可以达到下拉最大位置，如果达到直接出发刷新
    if (this.touchDistanceY >= this.constructor.PULLDOWN_TOP) {
      return this._pullingFresh()
    }
    // 调整下拉刷新bar样式
    return this._setRefreshBar()
  }

  /**
   * 触摸结束事件
   */
  LScroll.prototype._touchEnd = function() {
    // 触摸结束判断是否达到刷新位置
    if (this.touchDistanceY >= this.constructor.PULLDOWN_FRESH && this.onTouch) {
      this._pullingFresh()
    } else {
      this._touchEndHandler()
    }
    return this._session && this._storeScroll()
  }

  /**
   * 处理滑动结束
   */
  LScroll.prototype._touchEndHandler = function() {
    // 下拉刷新中
    if (this.isPullingDown) return
    // 标识
    this.onTouch = false
    // 下拉DOM归位
    if (this.touchDistanceY > 0) {
      this._resetTouch()
    }
  }

  /**
   * 下拉样式等设置回归到原始状态
   */
  LScroll.prototype._resetTouch = function() {
    /**
     * 这里设置为0.01，因为如果为0的话，可能DOM上判断会直接隐藏掉
     * 就没有回弹动画
     */
    this.touchDistanceY = 0.01
    // 设置回弹样式
    this._setRefreshBar(0.4).then(() => {
      // 最终设置为0
      this.touchDistanceY = 0
    })
  }

  /**
   * 下拉的样式设置
   */
  LScroll.prototype._setRefreshBar = function(time = 0) {
    const refresh = this._pullDownRefresh_bar

    if (refresh) {
      const top = this.touchDistanceY
      const transition = time ? `transition:all ${time}s;` : ''
      refresh.style.cssText = `transform:translate3d(0,${top}px,0);${transition}`
    }
    return new Promise(resolve => setTimeout(resolve, time * 1000))
  }

  /**
   * 缓存住当前的scrollTop值
   */
  LScroll.prototype._storeScroll = function() {}
} 
