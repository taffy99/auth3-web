<template>
    <div class="main-body">
         <!-- 工具栏 -->
         <div class="toolbar">
             <el-form :inline="true" :model="filters">
                 <el-form-item>
                     <el-input v-model="filters.name" :placeholder="t('thead.username')"></el-input>
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
 import { listPage } from '@/apis/sys-user';
 import { computed, reactive } from 'vue';
 const  { t } = useI18n()
 const tableRef = ref()
 const filters = reactive({
     name: ''
 })
 const columns = computed(()=>[
     {
         type: 'selection',
         selectable: isSelectable
     },
     {
         prop: 'id',
         label: t('thead.ID'),
         minWidth: 50
     },
     {
         prop: 'name',
         label: t('thead.username'),
         minWidth: 120
     },
     {
         prop: 'roleName',
         label: t('thead.group'),
         minWidth: 120
     },
     {
         prop: 'createdBy',
         label: t('thead.createBy'),
         minWidth: 120
     },
     {
         prop: 'ip',
         label: t('thead.latestIp'),
         minWidth: 100
     },
     {
         prop: 'visitTime',
         label: t('thead.latestVisit'),
         minWidth: 120
     }
 ])
  const operations = [
     {
         type: 'edit',
         show: (row) => row.createdBy != 'system'
     },
     {
         type: 'delete',
         show: (row) => row.createdBy != 'system'
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

  function isSelectable(row) {
     return row.createdBy !== 'system'
  }
 
 </script>