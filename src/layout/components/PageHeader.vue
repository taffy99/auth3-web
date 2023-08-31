<template>
    <!-- 头部组件包括系统logo、中英文切换元件、消息图标元件以及个人信息元件 -->
    <div class="header-content">
        <div class="left">
            <h1>
                <router-link to="/">{{ t('sitename') }}</router-link>
            </h1>
        </div>
        <div class="right flex-center">
            <div class="lang gap">
                <span class="item" :class="{active: locale === 'zh-cn'}" @click="changeLanguage('zh-cn')">简体中文</span>/
                <span class="item" :class="{active:locale === 'en'}" @click="changeLanguage('en')">EN</span>
            </div>
            <div class="gap cursor">
                <router-link to="/personal/message">
                    <el-icon></el-icon>
                </router-link>
            </div>
            <el-dropdown trigger="click">
                <div class="flex-center cursor">
                    这里是用户名
                    <el-icon><caret-bottom/></el-icon>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>{{ t('personalCenter') }}</el-dropdown-item>
                        <el-dropdown-item>{{ t('logout') }}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup>
const {locale, t} = useI18n()

// 语言切换
function changeLanguage(lang) {
    locale.value = lang
    localStorage.setItem('locale', lang)
}
</script>
<style lang="scss" scoped>
.header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 100%;
    a {
        color: inherit;
        text-decoration: none;
    }
    h1 {
        margin: 0;
        font-size: 20px;
    }
    .gap {
        margin-right: 20px;
    }
    .right {
        .lang {
            font-size: 14px;
            .item {
                cursor: pointer;
                &.active {
                    font-size: 18px;
                    font-weight: bold;
                }
            }
        }
    }
    .el-dropdown {
        color: inherit;
    }
    .flex-center {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .cursor {
    cursor: pointer;
    }
}
</style>