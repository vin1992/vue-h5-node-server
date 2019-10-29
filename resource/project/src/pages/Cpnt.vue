<template>
<div class="wrap">
  <div>
    <template v-for="(item,id) in config">
      <component v-if="item.component.length > 0" :is="item.component"  v-bind="item.props" :key="id" >
        <cpnt :config="item.children" ></cpnt>
      </component>
    </template>
  </div>
</div>
</template>

<script>
export default {
  name: 'Cpnt',
  props: {
    config: Array,
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost'
      } 
    }
  },
  data() {
    return {
      drag: false
    }
  },

  methods: {
    handleSelect(key) {
      let props = this.$refs[`cpnt-${key}`][0].getConfig();
      this.select(key, props);
    },

    stringifyKey(id) {
      let fk = this.parentKey ? this.parentKey + '-' + String(id) : String(id);
      return fk;
    }
  }

}
</script>

<style lang="less" >
.edit-area {
  border: 1px dashed #ccc;
  &:after {
    content:'可拖入组件';
    width:100%;
    display: block;
    height: 100px;
    text-align: center;
  }

  .view-wrap {
    & > .edit-area {
      &::after {
        visibility: hidden;
      }
    } 
  }

  .cpnt {
    padding: 5px;
    border: 1px dashed #ccc;
  }
  .tips {

    // &:after {
    //   content:'可拖入组件';
    //   width:100%;
    //   display: block;
    //   // height: 5px;
    //   text-align: center;
    // }
  } 
}
</style>
