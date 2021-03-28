<template>
  <div style="width:800px; margin:10px auto;">
    <el-table
      ref="demoxxx"
      :header-cell-class-name="headerCellClassName"
      :data="tableData"
       style="width:100%"
       align="center"
    >
      <el-table-column
        label="Key"
        prop="key1"
      />
      <el-table-column
        prop="sort1"
        sortable="custom"
      >
        <ElMultipleHeader
          slot="header"
          slot-scope="scope"
          :only-asc="true"
          @multiple-sort-change="multipleSortChagne(scope, 'up')"
        >
          Sort1
        </ElMultipleHeader>
      </el-table-column>
      <el-table-column
        prop="sort2"
        sortable="custom"
      >
        <ElMultipleHeader
          slot="header"
          slot-scope="scope"
          :only-desc="true"
          @multiple-sort-change="multipleSortChagne(scope, 'down')"
        >
          Sort2
        </ElMultipleHeader>
      </el-table-column>
      <el-table-column
        prop="sort3"
        sortable="custom"
      >
        <ElMultipleHeader
          slot="header"
          slot-scope="scope"
          @multiple-sort-change="multipleSortChagne(scope)"
        >
          Sort3
        </ElMultipleHeader>
      </el-table-column>
      <el-table-column
        prop="sort4"
        sortable="custom"
      >
        <ElMultipleHeader
          slot="header"
          slot-scope="scope"
          @multiple-sort-change="multipleSortChagne(scope)"
        >
          Sort4
        </ElMultipleHeader>
      </el-table-column>
    </el-table>
    <el-button @click="clearSort">
      clearSort
    </el-button>
    <el-button @click="reset">
      重置2
    </el-button>
  </div>
</template>

<script>
import Vue from 'vue';
import HeaderMultipleSort from './HeaderMultipleSort';
import ElMultipleHeader from './elMultipleHeader.vue';

// const defaultSorts = [
//   { prop: 'sort1', order: 'ascending' },
//   { prop: 'sort2', order: 'descending' },
// ];
const defaultSorts = { prop: 'sort1', order: 'ascending' };
const clazz = new HeaderMultipleSort(defaultSorts);

export default Vue.extend({
  name: 'ElTableMultipleSortTable',
  components: {
    ElMultipleHeader,
  },
  data() {
    return {
      tableData: [
        {
          key1: 110, sort1: 120, sort2: 133, sort3: 141, sort4: 150,
        },
        {
          key1: 150, sort1: 140, sort2: 139, sort3: 120, sort4: 110,
        },
        {
          key1: 160, sort1: 190, sort2: 130, sort3: 146, sort4: 180,
        },
      ],
    };
  },
  methods: {
    /** 此函数触发时机
     * 1. table 首次渲染
     * 2. 人为交互点击排序
     * 3. table.sort() 事件触发
     */
    headerCellClassName({ column }) {
      console.log('headerCellClassName');
      // 在此处理自定义的排序箭头css
      const className = clazz.headerCellClassName(column);

      return className;
    },
    multipleSortChagne({ column }, updown) {
      // to do
      clazz.handlerMultipleSortChange(column, updown);
      console.log(clazz.getCache());
    },
    reset() {
      // clazz.resetSort(this.$refs.demoxxx, { prop: 'sort2', order: 'descending' });
      clazz.resetSort(this.$refs.demoxxx);
      console.log(clazz.getCache());
    },
    clearSort() {
      clazz.clearSort(this.$refs.demoxxx);
      console.log(clazz.getCache());
    },
  },
});
</script>
