
<template>
    <div style="height:100%;">
        <sxxx :columns="columns" :testData="testData" :chart="chart" :table="table" :form="form" :label="label"  :lable="label" :iconUrl="iconUrl" />
    </div>
</template>

<script>
import sxxx from '@/components/ditu/ditu2.vue'
export default {
    name: 'test',
    components: { sxxx },
    data() {
        return {
           label: '水系',
           columns:[
                { label: "序号", field: 'rowid', style: { textAlign: 'center', width: '40px' } },
                { label: "水系名称", field: 'bsnm', style: { textAlign: 'center', width: '150px' } },
                { label: "河流长度(km)", field: 'river_length', style: { textAlign: 'center', width: '40px' } },
           ],
           testData:[],
           chart:{
               width:'600px',
               nameField: 'bsnm',
               providerUrl: '/'
           },
            form: {
                label: '基础信息',
                target: 'ennmcd', 
                columns: [
                    { text: '水系名称', field: 'bsnm' },
                    { text: '河流长度(km)', field: 'river_length' },
                    { text: '集水面积(km²)', field: 'drna' },
                    { text: '河道坡降(万分率)', field: 'river_slope' },
                    { text: '流域形状系数', field: 'river_shape' },
                    // { text: '所在乡镇', field: 'town' },
                    // { text: '行政区划', field: 'areaname' }
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
            iconUrl: 'public/img/water.png'
        }
    },
    mounted() {
        this.getData()
    },
    methods:{
       getData() {
           this.loading = this.$loading();
         this.$Axios
            .get('http://192.168.118.226:9831/webapi/api/v2/basic/data?key=s_basin_list&')
            .then(d => {
                console.log(d)
                this.testData = d.data.data
                this.loading.close()
            })
       }
    }
}
</script>

<style lang="scss" scoped>

</style>
