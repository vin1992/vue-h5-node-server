<template>
  <div class="view-wrap">
    <cpnt :config="config" ></cpnt>
  </div>
</template>

<script>
import cpnt from './Cpnt';
// import config  from '../data';
import vconsole from 'vconsole';
import request from '../utils/request';
export default {
  components:{
    cpnt
  },
  
  data() {
    return {
      config:[],
    }
  },

  created() {
    // 数据库请求 pid 对应的  config JSON 文件 
    let pid = this.$route.params.pid;
    console.log('route:',this.$route);

    request.get('/api/admin/page/details',{params:{pid}}).then(res => {
      console.log(res);
      let { code, data, message } = res;
      if (code == 0) {
        let tmp = JSON.parse(data.content);
        this.config = tmp;
        console.log('config',this.config);
      }
    }).catch(e => e); 
  },

  mounted() {
  var vConsole = new vconsole();
  console.log('Hello world');
  },

  methods:{

  }
}
</script>

<style lang="less">
body {
  margin:0;
}
</style>
