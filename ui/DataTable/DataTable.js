import header from './mixins/header';
import body from './mixins/body';
import footer from './mixins/footer';
import colgroup from './mixins/colgroup';
import progress from './mixins/progress';
import mousewheel from '../internal/directives/mousewheel';
import { getWidth } from '../utils';

export default {
  name: 'mu-data-table',
  mixins: [header, body, footer, colgroup, progress],
  props: {
    data: Array,
    columns: Array,
    noDataText: {
      type: String,
      default: '暂无数据'
    },
    height: [String, Number],
    maxHeight: [String, Number],
    selectAll: Boolean,
    selectable: Boolean,
    selects: {
      type: Array,
      default: () => []
    },
    sort: {
      type: Object
    },
    checkbox: Boolean,
    stripe: Boolean,
    border: Boolean,
    loading: Boolean,
    hideHeader: Boolean,
    rowKey: {
      type: String,
      default: 'id'
    },
    fit: {
      type: Boolean,
      default: true
    },
    hover: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleHeaderFooterMousewheel (event, data) {
      const { pixelX, pixelY } = data;
      if (Math.abs(pixelX) >= Math.abs(pixelY)) {
        event.preventDefault();
        this.$refs.body.scrollLeft += data.pixelX / 5;
      }
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'mu-table',
      class: {
        'mu-table-border': this.border
      },
      style: {
        'max-height': getWidth(this.maxHeight),
        'height': getWidth(this.height)
      }
    }, [
      !this.hideHeader ? this.createHeader(h) : undefined,
      this.createProgress(h),
      this.createBody(h),
      this.createFooter(h)
    ]);
  },
  directives: {
    mousewheel
  }
};
