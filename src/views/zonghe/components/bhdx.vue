
<template>
    <div style="height:100%;">
        <bhdx :columns="columns" :testData="testData" :chart="chart" :table="table" :form="form" :label="label"  :lable="label" :iconUrl="iconUrl" />
    </div>
</template>

<script>
import bhdx from '@/components/ditu/ditu1.vue'
export default {
    name: 'test',
    components: { bhdx },
    data() {
        return {
           label: '重要保护对象',
           columns:[
                { label: "序号", field: 'rowid', style: { textAlign: 'center', width: '40px' } },
                { label: "保护对象名称", field: 'lflnnm', style: { textAlign: 'center', width: '200px' } },
                { label: "类型", field: 'type_name', style: { textAlign: 'center', width: '40px' } },
           ],
           testData:[],
           chart:{
               width:'600px',
               nameField: 'lflnnm',
               providerUrl: '/'
           },
            form: {
                label: '基础信息',
                target: 'ennmcd', 
                columns: [
                    { text: '保护对象名称', field: 'lflnnm' },
                    { text: '类型', field: 'type_name' },
                    { text: '责任人', field: 'liable' },
                    { text: '责任人电话', field: 'phone' },
                    { text: '分类', field: 'category_name' },
                    // { text: '工程规模', field: 'enclnm' },
                    // { text: '所在乡镇', field: 'town' },
                    { text: '行政区划', field: 'adnm' }
                ]
            },
            table: {
                // label: '责任人列表', columns: [
                //     { text: '责任人', field: 'name', textAlign: 'left', width:'120' },
                //     { text: '联系电话', field: 'phone', textAlign: 'left', width:'120' },
                //     { text: '类型', field: 'type', textAlign: 'center', width:'120' },
                //     { text: '职务', field: 'position', textAlign: 'center' }
                // ]
            },
            iconUrl: 'public/img/bh.png'
        }
    },
    mounted() {
        this.getData()
    },
    methods:{
       getData() {
           this.loading = this.$loading();
         this.$Axios
            .get('http://192.168.118.226:9831/webapi/api/v2/basic/data?key=s_fzfx_protect_list&')
            .then(d => {
                this.testData = d.data.data
                this.loading.close()
            })
       }
    }
}
</script>

<style lang="scss" scoped>

</style>
