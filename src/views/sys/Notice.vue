<template>
   <div class="main-body">
        <!-- 工具栏 -->
        <div class="toolbar">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.title" :placeholder="t('thead.title')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="search" type="primary" @click="findPage">
                        {{ t('action.search') }}
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button icon="plus" type="primary">
                        {{ t('action.add') }}
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 表格内容栏 -->
        <cm-table ref="tableRef" 
                :get-page="listPage"
                :filters="filters"
                :columns="columns"
                :operations="operations"
                @handleEdit="handleEdit"
                @handleDelete="handleDelete">
        </cm-table>
   </div>
</template>
<script setup>
import { listPage } from '@/apis/sys-notice';
import { computed, reactive } from 'vue';
const  { t } = useI18n()
const tableRef = ref()
const filters = reactive({
    title: ''
})
const columns = computed(()=>[
    {
        type: 'selection'
    },
    {
        prop: 'id',
        label: t('thead.ID'),
        minWidth: 50
    },
    {
        prop: 'title',
        label: t('thead.title'),
        minWidth: 120,
        showOverflowTooltip: true
    },
    {
        prop: 'content',
        label: t('thead.content'),
        minWidth: 120,
        showOverflowTooltip: true
    },
    {
        prop: 'publishTime',
        label: t('thead.publishTime'),
        minWidth: 120
    },
    {
        prop: 'createTime',
        label: t('thead.createTime'),
        minWidth: 120
    },
    {
        prop: 'createBy',
        label: t('thead.createBy'),
        minWidth: 120
    },
])
 const operations = [
    {
        type: 'edit',
        disabled: (row) => !!row.publishTime
    },
    {
        type: 'delete'
    }
 ]
 // 获取分页数据
 function findPage() {
    tableRef.value.reload()
 }
 
 function handleEdit(row) {
    console.log('edit', row)
 }

 function handleDelete(ids, callback) {
    console.log('delete', ids, callback)
 }

</script>