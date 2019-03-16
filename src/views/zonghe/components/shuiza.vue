
<template>
    <div style="height:100%;">
        <shuiza :columns="columns" :testData="testData" :chart="chart" :table="table" :form="form" :label="label" :lable="label" :iconUrl="iconUrl" />
    </div>
</template>

<script>
import shuiza from '@/components/ditu/ditu1.vue'
export default {
    name: 'test',
    components: { shuiza },
    data() {
        return {
           label: '水闸',
        //     search: [
        //     { text: '避风港', type: 'input', field: 'havennm', width: 180 },
        //     { text: '区划', type: 'tree_select', field: 'addvcd', id: 'val', pid: 'pid', name: 'label', width: 180, height: 200, checkable: false, url: '/api/v2/basic/data?key=s_area_by_material' }
        //    ],
           columns:[
                { label: "序号", field: 'rowid', style: { textAlign: 'center', width: '40px' } },
                { label: "水闸名称", field: 'stnm', style: { textAlign: 'center', width: '150px' } },
                { label: "状态", field: 'status', style: { textAlign: 'center', width: '40px' } },
           ],
           testData:[], 
           chart:{
               width:'600px',
               nameField: 'ennm',
               providerUrl: 'http://192.168.118.226:9831/webapi/api/v2/basic/data?key=s_slcmin_response'
           },
            form: {
                label: '水库基础信息', 
                columns: [
                    { text: '水闸名称', field: 'stnm' },
                    { text: '状态', field: 'status' },
                    { text: '孔数', field: 'holenum' },
                    { text: '设计流量', field: 'designflow' },
                    { text: '闸门高程', field: 'gatetopelevation' },
                    { text: '闸门低程', field: 'gatebottomelevation' },
                    // { text: '所在乡镇', field: 'town' },
                    { text: '行政区划', field: 'area_name' }
                ]
            },
            table: {
                label: '责任人列表', columns: [
                    { text: '责任人', field: 'name', textAlign: 'left', width:'120' },
                    { text: '联系电话', field: 'phone', textAlign: 'left', width:'120' },
                    { text: '类型', field: 'type', textAlign: 'center', width:'150' },
                    { text: '职务', field: 'position', textAlign: 'center' }
                ]
            },
            iconUrl: 'public/img/sz.png'
        }
    },
    mounted() {
        this.getData()
    },
    methods:{
       getData() {
         this.$Axios
            .get('http://192.168.118.226:9831/webapi/api/v1/sluicepump/match?time=%5B2019-03-15%2021%3A00%3A00%2C2019-03-16%2021%3A00%3A00%5D&type=ZM')
            .then(d => {
                this.testData = d.data.data
            })
       }
    }
}
</script>

<style lang="scss" scoped>

</style>
