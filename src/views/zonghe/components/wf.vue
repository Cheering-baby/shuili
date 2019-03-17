
<template>
    <div style="height:100%;">
        <wf :columns="columns" :testData="testData" :chart="chart" :table="table" :form="form" :label="label"  :lable="label" :iconUrl="iconUrl" />
    </div>
</template>

<script>
import wf from '@/components/ditu/ditu1.vue'
export default {
    name: 'test',
    components: { wf },
    data() {
        return {
           label: '危房',
           columns:[
                { label: "序号", field: 'rowid', style: { textAlign: 'center', width: '40px' } },
                { label: "危房名称", field: 'rmnm', style: { textAlign: 'center', width: '200px' } },
                { label: "威胁人口", field: 'popul', style: { textAlign: 'center', width: '40px' } },
           ],
           testData:[],
           chart:{
               width:'600px',
               nameField: 'rmnm',
               providerUrl: '/'
           },
            form: {
                label: '基础信息',
                target: 'ennmcd', 
                columns: [
                    { text: '危房名称', field: 'rmnm' },
                    { text: '威胁人口', field: 'popul' },
                    { text: '责任人', field: 'liable' },
                    { text: '责任人电话', field: 'liablect' },
                    { text: '位置', field: 'location' },
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
            iconUrl: 'public/img/wf.png'
        }
    },
    mounted() {
        this.getData()
    },
    methods:{
       getData() {
         this.$Axios
            .get('http://192.168.118.226:9831/webapi/api/v1/service/center/get/data?key=b3602a7a-195a-4644-834b-ba2cf51312e5&guid=f1823477-ffde-4e03-b7e8-a0a83ba35763&')
            .then(d => {
                console.log(d)
                this.testData = d.data.data.data
            })
       }
    }
}
</script>

<style lang="scss" scoped>

</style>
