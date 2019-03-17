
<template>
    <div style="height:100%;">
        <dwd :columns="columns" :testData="testData" :chart="chart" :table="table" :form="form" :label="label"  :lable="label" :iconUrl="iconUrl" />
    </div>
</template>

<script>
import dwd from '@/components/ditu/ditu1.vue'
export default {
    name: 'test',
    components: { dwd },
    data() {
        return {
           label: '低洼地',
           columns:[
                { label: "序号", field: 'rowid', style: { textAlign: 'center', width: '40px' } },
                { label: "低洼地名称", field: 'bmnm', style: { textAlign: 'center', width: '180px' } },
                { label: "类型", field: 'type', style: { textAlign: 'center', width: '40px' } },
           ],
           testData:[],
           chart:{
               width:'600px',
               nameField: 'bmnm',
               providerUrl: '/'
           },
            form: {
                label: '基础信息',
                target: 'ennmcd', 
                columns: [
                    { text: '低洼地名称', field: 'bmnm' },
                    { text: '类型', field: 'type' },
                    { text: '责任人', field: 'liable' },
                    { text: '责任人电话', field: 'liablect' },
                    { text: '分类', field: 'category_name' },
                    // { text: '工程规模', field: 'enclnm' },
                    // { text: '所在乡镇', field: 'town' },
                    { text: '行政区划', field: 'areaname' }
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
            iconUrl: 'public/img/dwd.png'
        }
    },
    mounted() {
        this.getData()
    },
    methods:{
       getData() {
         this.$Axios
            .get('http://192.168.118.226:9831/webapi/api/v1/service/center/get/data?key=eca70be4-b64e-4653-a084-e271a0d44d7a&guid=f1823477-ffde-4e03-b7e8-a0a83ba35763&type=')
            .then(d => {
                this.testData = d.data.data.data
            })
       }
    }
}
</script>

<style lang="scss" scoped>

</style>
