/** class */
class HeaderMultipleSort {
  cacheMap = new Map();

  /** 是否人为触发过ElTable的sort事件 */
  hasEffectElTableSortEvent = false;

  /** 默认的排序 */
  defaultSorts = [];

  /**
   * Creates an instance of ElTableMultipleSort.
   *
   * @param {*} [defaultSort=[]] 可数组、可单个: { prop, order }
   * @memberof ElTableMultipleSort
   */
  constructor(defaultSort = []) {
    this.privateInit(defaultSort);
    this.set(defaultSort);
  }

  privateInit(defaultSort) {
    const tempArr = [];

    // if defaultSort is Object item
    if (!Array.isArray(defaultSort)) {
      tempArr.push(defaultSort);
    }

    // if defaultSort is Array
    if (Array.isArray(defaultSort)) {
      [].push.apply(tempArr, defaultSort);
    }

    tempArr.reduce((pre, curItem) => {
      if (HeaderMultipleSort.privateValidateSortItemAvailable(curItem)) {
        [].push.call(pre, curItem);
      }
      return pre;
    }, this.defaultSorts);
  }

  static privateValidateSortItemAvailable(item) {
    if (Object.prototype.toString.call(item) !== '[object Object]') return false;

    const { prop, property, order } = item;
    const key = prop || property;

    return !!(key && (order || order === null));
  }

  /**
   * set cacheMap
   *
   * @param {*} items 可数组、可单个: { prop, order }
   * @memberof ElTableMultipleSort
   */
  set(items) {
    const setSingleItem = (item) => {
      if (HeaderMultipleSort.privateValidateSortItemAvailable(item)) {
        this.cacheMap.set(item.prop, item);
      }
    };

    if (!Array.isArray(items)) {
      setSingleItem(items);
    }
    if (Array.isArray(items)) {
      items.forEach((item) => setSingleItem(item));
    }
  }

  get(key) {
    return this.cacheMap.get(key);
  }

  has(key) {
    return this.cacheMap.has(key);
  }

  getCache() {
    return this.cacheMap;
  }

  /**
   * 返回每一个表头的class name
   *
   * @param {*} column
   * @return {*} class name
   * @memberof ElTableMultipleSort
   */
  headerCellClassName(column) {
    // to do
    const { prop, property } = column;
    const key = prop || property;

    if (!this.has(key)) return null;

    const { order } = this.get(key);

    if (order === 'ascending') return ' active-asc ';
    if (order === 'descending') return ' active-desc ';

    return ' active-null ';
  }

  /**
   * 响应【排序列】的点击事件
   *
   * @param {*} { prop, property, order }
   * @param {string} [defaultOrder='ascending'] 当无有效oder值时，默认采用的排序
   * @memberof ElTableMultipleSort
   */
  handlerMultipleSortChange({ prop, property }, updown, firstOrder = 'ascending') {
    // to do
    let order;
    const key = prop || property;

    if (!this.has(key)) {
      if (updown === 'up') {
        order = 'ascending';
      } else if (updown === 'down') {
        order = 'descending';
      } else {
        order = firstOrder;
      }
    } else {
      const val = this.get(key);
      if (updown === 'up') {
        if (val.order === 'ascending') {
          order = null;
        }
        if (val.order === null) {
          order = 'ascending';
        }
      } else if (updown === 'down') {
        if (val.order === 'descending') {
          order = null;
        }
        if (val.order === null) {
          order = 'descending';
        }
      } else {
        if (val.order === 'ascending') {
          order = 'descending';
        }
        if (val.order === 'descending') {
          order = 'ascending';
        }
      }
    }

    const updateItem = { prop: key, order, clickTime: Date.now() };
    this.set(updateItem);

    this.hasEffectElTableSortEvent = true;
  }

  clearSort(refTable) {
    // 场景1：无默认排序，无排序交互
    // 则无需处理
    if (this.defaultSorts.length === 0 && !this.hasEffectElTableSortEvent) return;

    // // 场景2：无默认排序，有排序交互
    // // clear cache + table.clearSort()
    // if (this.defaultSorts.length === 0 && this.hasEffectElTableSortEvent) {
    //   this.cacheMap.clear();
    //   this.refTableClearSort(refTable);
    //   return;
    // }

    // // 场景3：有默认排序，无排序交互，
    // // clear cache + table.sort() + table.clearSort()
    // if (this.defaultSorts.length > 0 && !this.hasEffectElTableSortEvent) {
    //   this.cacheMap.clear();
    //   // 执行一次排序，因为清空默认排序得触发<el-table>的sort事件
    //   this.refTableSort(refTable, this.defaultSorts[0]);
    //   this.refTableClearSort(refTable);
    //   return;
    // }

    // // 场景4： 有默认排序，有排序交互
    // // clear cache + table.clearSort()
    // if (this.defaultSorts.length > 0 && this.hasEffectElTableSortEvent) {
    //   this.cacheMap.clear();
    //   this.refTableClearSort(refTable);
    //   return;
    // }

    // 场景3, 执行一次排序，因为清空默认排序得触发<el-table>的sort事件
    if (this.defaultSorts.length > 0 && !this.hasEffectElTableSortEvent) {
      HeaderMultipleSort.refTableSort(refTable, this.defaultSorts[0]);
    }

    this.cacheMap.clear();
    HeaderMultipleSort.refTableClearSort(refTable);

    // 可以
    // console.warn('不存在4个场景之外的场景');
    // 代码有冗余，可以精简
    // 果然，穷举场景后，就能提炼不少代码
  }

  /** refs[table].clearSort() */
  static refTableClearSort(refTable) {
    if (refTable == null || typeof refTable !== 'object') {
      return console.error('table clear sort:', '无效的refTable');
    }

    if (typeof refTable.clearSort !== 'function') {
      return console.error('table clear sort:', '无效的clearSort()');
    }

    refTable.clearSort();
    return true;
  }

  /** refs[table].sort({ prop, order }) */
  static refTableSort(refTable, sortObj) {
    if (refTable == null || typeof refTable !== 'object') {
      return console.error('table sort:', '无效的refTable');
    }

    if (typeof refTable.sort !== 'function') {
      return console.error('table sort:', '无效的sort()');
    }

    refTable.sort(sortObj.prop, sortObj.order);
    return true;
  }

  resetSort(refTable, sortObj = {}) {
    this.clearSort(refTable);

    this.set(sortObj);

    HeaderMultipleSort.refTableSort(refTable, sortObj);
  }
}

export default HeaderMultipleSort;
