
<template>
  <div style="height:100%;">
    <div class="search">
      <!-- <el-input v-model="input" placeholder="请输入水库名称"></el-input> -->
    </div>
    <shuiku
      :columns="columns"
      :testData="testData"
      :chart="chart"
      :table="table"
      :form="form"
      :label="label"
      :searchContent="search"
      :lable="label"
      :iconUrl="iconUrl"
    />
  </div>
</template>

<script>
import shuiku from "@/components/ditu/ditu.vue";
export default {
  name: "test",
  components: { shuiku },
  data() {
    return {
      input: "",
      label: "水库",
      search: [
        { text: "避风港", type: "input", field: "havennm", width: 180 },
        {
          text: "区划",
          type: "tree_select",
          field: "addvcd",
          id: "val",
          pid: "pid",
          name: "label",
          width: 180,
          height: 200,
          checkable: false,
          url: "/api/v2/basic/data?key=s_area_by_material"
        }
      ],
      columns: [
        {
          label: "序号",
          field: "rowid",
          style: { textAlign: "center", width: "40px" }
        },
        {
          label: "水库名称",
          field: "ennm",
          style: { textAlign: "center", width: "150px" }
        },
        {
          label: "工程规模",
          field: "enclnm",
          style: { textAlign: "center", width: "40px" }
        }
      ],
      testData: [],
      chart: {
        width: "600px",
        nameField: "ennm",
        providerUrl:
          "http://192.168.118.226:9831/webapi/api/v2/basic/data?key=s_sk_responsible"
      },
      form: {
        label: "基础信息",
        target: "ennmcd",
        columns: [
          { text: "水库名称", field: "ennm" },
          { text: "坝高", field: "dam_height" },
          { text: "坝长", field: "dam_length" },
          { text: "总库容", field: "ttst" },
          { text: "所在河流", field: "river" },
          { text: "工程规模", field: "enclnm" },
          { text: "所在乡镇", field: "town" },
          { text: "行政区划", field: "dsnm" }
        ]
      },
      table: {
        label: "责任人列表",
        columns: [
          { text: "责任人", field: "name", textAlign: "left", width: "120" },
          { text: "联系电话", field: "phone", textAlign: "left", width: "120" },
          { text: "类型", field: "type", textAlign: "center", width: "120" },
          { text: "职务", field: "position", textAlign: "center" }
        ]
      },
      iconUrl: "public/img/shuiku.png"
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
         this.loading = this.$loading();
      this.$Axios
        .get(
          "http://192.168.118.226:9831/webapi/api/v2/basic/data?key=s_project_sk_list&"
        )
        .then(d => {
          this.testData = d.data.data;
          this.loading.close();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
