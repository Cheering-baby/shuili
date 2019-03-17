
<template>
    <div style="height:100%;">
        <bzd :columns="columns" :testData="testData" :chart="chart" :table="table" :form="form" :label="label"  :lable="label" :iconUrl="iconUrl" />
    </div>
</template>

<script>
import bzd from '@/components/ditu/ditu1.vue'
export default {
    name: 'test',
    components: { bzd },
    data() {
        return {
           label: '避灾点',
           columns:[
                { label: "序号", field: 'rowid', style: { textAlign: 'center', width: '40px' } },
                { label: "避灾点名称", field: 'stnm', style: { textAlign: 'center', width: '200px' } },
                { label: "占地面积(m²)", field: 'area', style: { textAlign: 'center', width: '40px' } },
           ],
           testData:[],
           chart:{
               width:'600px',
               nameField: 'stnm',
               providerUrl: '/'
           },
            form: {
                label: '基础信息',
                target: 'ennmcd', 
                columns: [
                    { text: '避灾点名称', field: 'stnm' },
                    { text: '占地面积', field: 'area' },
                    { text: '责任人', field: 'header' },
                    { text: '责任人电话', field: 'phone' },
                    { text: '站址', field: 'stlc' },
                    // { text: '所在乡镇', field: 'town' },
                    { text: '行政区划', field: 'adcd' }
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
            iconUrl: 'public/img/bzd.png'
        }
    },
    mounted() {
        this.getData()
    },
    methods:{
       getData() {
         this.$Axios
            .get('http://192.168.118.226:9831/webapi/api/v1/service/center/get/data?key=57157ace-e43c-4962-8640-e0234a6d03ff&guid=f1823477-ffde-4e03-b7e8-a0a83ba35763&')
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
