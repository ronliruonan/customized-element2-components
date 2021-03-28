<template>
  <div>
    <el-table
      ref="demoxxx"
      :header-cell-class-name="headerCellClassName"
      :data="tableData"
    >
      <el-table-column
        label="表头Key"
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
          表头Sort1
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
          表头Sort2
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
          表头Sort3
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
          表头Sort4
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
import ElMultipleHeader from './elMultipleHeader';

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
  data () {
    return {
      tableData: [
        { key1: 10, sort1: 20, sort2: 33, sort3: 41, sort4: 50 },
        { key1: 50, sort1: 40, sort2: 39, sort3: 20, sort4: 10 },
        { key1: 60, sort1: 90, sort2: 30, sort3: 46, sort4: 80 },
      ]
    };
  },
  methods: {
    /** 此函数触发时机
     * 1. table 首次渲染
     * 2. 人为交互点击排序
     * 3. table.sort() 事件触发
     */
    headerCellClassName ({ column }) {
      console.log('headerCellClassName');
      // 在此处理自定义的排序箭头css
      const className = clazz.headerCellClassName(column);

      return className;
    },
    multipleSortChagne ({ column }, updown) {
      // to do
      clazz.handlerMultipleSortChange(column, updown);
      console.log(clazz.getCache());
    },
    reset () {
      // clazz.resetSort(this.$refs['demoxxx'], { prop: 'sort2', order: 'descending' });
      clazz.resetSort(this.$refs['demoxxx']);
      console.log(clazz.getCache());
    },
    clearSort () {
      clazz.clearSort(this.$refs['demoxxx']);
      console.log(clazz.getCache());
    },
  },
});
</script>
