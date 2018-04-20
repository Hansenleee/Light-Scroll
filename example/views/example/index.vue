<template>
  <div class="example">
    <div class="header">example</div>
    <router-view></router-view>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .example {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .header {
    height: 88px;
    line-height: 88px;
    color: #007bff;
    box-shadow: 0 2px 12px #ccc;
    font-size: 32px;
    margin-bottom: 0px;
  }
</style>
