
<template>
    <div style="height:100%;">
        <cwz :columns="columns" :testData="testData" :chart="chart" :table="table" :form="form" :label="label"  :lable="label" :iconUrl="iconUrl" />
    </div>
</template>

<script>
import cwz from '@/components/ditu/ditu1.vue'
export default {
    name: 'test',
    components: { cwz },
    data() {
        return {
           label: '潮位站',
           columns:[
                { label: "序号", field: 'rowid', style: { textAlign: 'center', width: '30px' } },
                { label: "站点名称", field: 'stnm', style: { textAlign: 'center', width: '150px' } },
                { label: "位置", field: 'adnm', style: { textAlign: 'center', width: '150px' } },
                // { label: "蓝色警戒潮位值", field: 'wrz_b', style: { textAlign: 'center', width: '50px',fontSize: '12px' } },
                // { label: "橘色警戒潮位值", field: 'wrz_y', style: { textAlign: 'center', width: '50px',fontSize: '12px' } },
                // { label: "红色警戒潮位值", field: 'wrz_r', style: { textAlign: 'center', width: '50px',fontSize: '12px' } },
                // { label: "黄色警戒潮位值", field: 'wrz_o', style: { textAlign: 'center', width: '50px',fontSize: '12px' } },
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
                    { text: '站点名称', field: 'stnm' },
                    { text: '位置', field: 'adnm' },
                    { text: '蓝色警戒潮位值(m)', field: 'wrz_b' },
                    { text: '黄色警戒潮位值(m)', field: 'wrz_y' },
                    { text: '橙色警戒潮位值(m)', field: 'wrz_o' },
                    { text: '红色警戒潮位值(m)', field: 'wrz_r' },
                ]
            },
            table: {
                label: '责任人列表', columns: [
                    { text: '责任人', field: 'name', textAlign: 'left', width:'120' },
                    { text: '联系电话', field: 'phone', textAlign: 'left', width:'120' },
                    { text: '类型', field: 'type', textAlign: 'center', width:'120' },
                    { text: '职务', field: 'position', textAlign: 'center' }
                ]
            },
            iconUrl: 'public/img/cwz.png'
        }
    },
    mounted() {
        this.getData()
    },
    methods:{
       getData() {
         this.$Axios
            .get('http://192.168.118.226:9831/webapi/api/v1/service/center/get/data?key=28911461-a072-429e-bf27-5116c78d6f30&guid=28911461-a072-429e-bf27-5116c78d6f30&')
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
