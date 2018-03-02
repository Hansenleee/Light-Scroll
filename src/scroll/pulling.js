/**
 * 上拉加载更多
 * 下拉刷新
 */
import transition from '../utils/transition'

export default (LScroll) => {
  /**
   * 上拉加载更多
   */
  LScroll.prototype._pullingUpLoad = function() {
    // 标记正在加载更多
    this.onPullUpLoading = true
    // 触发加载更多事件
    this.emit('loadMore')
  }

  /**
   * 加载更多结束
   */
  LScroll.prototype._finishPullUp = function() {
    this.onPullUpLoading = false
  }

  /**
   * 下拉刷新
   */
  LScroll.prototype._pullingFresh = function() {
    // 标识
    this.isPullingDown = true
    this.beforePulldingDown = false
    this.onTouch = false
  
    // 刷新DOM回弹到特定位置
    transition.transition(
      this.touchDistanceY,
      this.constructor.PULLDOWN_FRESH,
      -10,
      this._touchMoveY.bind(this)
    )
    
    // this.touchDistanceY = this.constructor.PULLDOWN_FRESH
    // this.emit('touchMove', this.touchDistanceY)
  
    // 触发刷新
    this.emit('refresh')
  }

  /**
   * 下拉刷新结束
   */
  LScroll.prototype._finishPullDown = function() {
    this.isPullingDown = false

    // 延时处理，保证动画顺利完成
    setTimeout(() => {
      this.beforePulldingDown = true
    }, this.constructor.PULLDOWN_BACK_TIME)
    
    // 刷新结束，回弹动画
    this._resetTouch()
  }

}
