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
                    <el-button icon="plus" type="primary" @click="handleAdd">
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
         <!-- 新增/编辑对话框 -->
         <el-dialog
            :title="isEdit?t('action.edit'):t('action.add')"
            v-model="dialogVisible"
            draggable
            width="40%"
            :close-on-click-modal="false"
            @close="closeDlg">
            <el-form ref="formRef" 
                :model="form" 
                :rules="rules" 
                label-width="80px"
                label-position="right">
                <el-form-item :label="t('thead.title')" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item :label="t('thead.content')" prop="content">
                    <el-input type="textarea" v-model="form.content" :words-limit="300"></el-input>
                </el-form-item>
                <el-form-item :label="t('thead.publish')">
                    <el-switch v-model="form.isPublish"></el-switch>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="closeDlg">{{ t('action.cancel') }}</el-button>
                <el-button type="primary" :loading="formLoading" @click="handleSubmit">
                    {{ t('action.submit') }}
                </el-button>
            </template>
         </el-dialog>
   </div>
</template>
<script setup>
import { listPage, save, update} from '@/apis/sys-notice';
import { ElMessage } from 'element-plus';
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
        prop: 'createdTime',
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
const dialogVisible = ref(false)
const isEdit = ref(false)
const formLoading = ref(false)
const formRef = ref()
const form = reactive({
    id: '',
    title: '',
    content: '',
    isPublish: false
 })
const _formOld_ = { ...form }
const rules = computed(()=> {
    return {
        title: [
            {
                required: true,
                message: t('form.titleRequired'),
                trigger: ['blur', 'change']
            },
            {
                min: 2,
                max: 60,
                message: t('form.titleError'),
                trigger: ['blur', 'change']
            } 
        ],
        content: [
            {
                required: true,
                message: t('form.contentRequired'),
                trigger: ['blur', 'change']
            },
            {
                min: 2,
                max: 300,
                message: t('form.contenError'),
                trigger: ['blur', 'change']
            } 
        ]
    }
})
 // 获取分页数据
 function findPage() {
    tableRef.value.reload()
 }
 // 获取参数
 function getParams() {
    const params = {...form}
    if(!isEdit.value) {
        delete params.id
    }
    return params
 }
 function handleAdd() {
    dialogVisible.value = true
    isEdit.value = false
 }
 function handleSubmit() {
    formRef.value.validate((valid) => {
        if(!valid) return
        formLoading.value = true
        let promise
        const params = getParams()
        if(isEdit.value) {
            promise = update(params)
        } else {
            promise = save(params)
        }
        promise.then(()=> {
            ElMessage({
                message: t("tips.success"),
                type: "success",
                showClose: true
            })
            closeDlg()
            if(isEdit.value) {
                tableRef.value.refresh()
            }else {
                tableRef.value.reload()
            }
        }).finally(()=> {
            formLoading.value = false
        })
    })
 }
 function handleEdit(row) {
    dialogVisible.value = true
    isEdit.value = true
    Object.assign(form, row);
 }

 function handleDelete(ids, callback) {
    console.log('delete', ids, callback)
 }
// 重置表单
function resetForm() {
    Object.assign(form, _formOld_)
}

// 关闭弹窗
function closeDlg() {
    dialogVisible.value = false
    resetForm()
}
</script>