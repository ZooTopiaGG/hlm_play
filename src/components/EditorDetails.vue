<template>
  <div id="ueditor">
    <!-- <script id="container" name="content" type="text/plain">
        这里写你的初始化内容
    </script> -->
    <VueUEditor @ready="editorReady"></VueUEditor>
  </div>
</template>
<script>
  import VueUEditor from 'vue-ueditor'
  export default {
    name: 'ueditor',
　　props: {
        //配置可以传递进来
        ueditorConfig: {}
    },
    data () {
        return {
            //编辑器实例
            instance: null,
            content: ''
        };
    },
    components: {
        VueUEditor
    },
    methods: {
      editorReady (instance) {
        instance.setContent('');
        instance.addListener('contentChange', () => {
            this.content = instance.getContent();
            console.log(this.content)
            this.$emit('send-content', this.content)
        });
      },
    }
  }
</script>
<style scoped>
  
</style>