<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
  
</template>
<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>
<style scoped>
html,
body{
  height: 100%;
}
#app {
  height: 100%;
  overflow: hidden;
}
</style>
