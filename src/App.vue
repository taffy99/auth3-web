<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
  
</template>
<script setup>
import { elementLocales } from '@/i18n';
const { locale } = useI18n()
locale.value = localStorage.getItem('locale') || 'zh-cn'
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
