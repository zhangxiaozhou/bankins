import Vue from "vue";

//时间选择器-yyyyMMdd输入格式
Vue.directive("elDateFormat", {
  inserted: function(el, binding, vnode) {
    const { value: _obj } = binding;
    const { context: that, data } = vnode;
    const { expression: key } = data.model;
    if (that && that._isVue) {
      console.log(el);
      const $this = el.children[0];
      $this.onchange = function() {
        let value = $this.value; //中文日期
        console.log(value);
        if (value.match(/\d{1,}/g) && value.length == 8) {
          value = value.replace(
            /^(\d{4})\D*(\d{1,2})\D*(\d{1,2})\D*/,
            "$1-$2-$3"
          ); //格式化输入格式
          const time =
            value && value.constructor == String ? new Date(value) : value; //转换时间格式
          let keys = key.split("."); //自定义赋值
          if (_obj) {
            const { keys: keyList } = _obj;
            keys = keyList;
          }
          if (keys && keys.length >= 2) {
            const [key1, key2, key3, key4] = keys;
            if (key4) {
              that[key1][key2][key3][key4] = time;
            } else if (key3) {
              that[key1][key2][key3] = time;
            } else {
              that[key1][key2] = time;
            }
          } else {
            that[key] = time;
          }
        }
      };
    }
  }
});
