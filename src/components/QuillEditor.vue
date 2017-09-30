<template>
  <div id="quill" v-loading="imageLoading"
     element-loading-text="请稍等，图片上传中...">
    <quill-editor
      ref="newEditor"
      :content="content"
      :options="editorOption"
      @change="onEditorChange($event)">
    </quill-editor>
    <form action="" method="post" enctype="multipart/form-data" id="uploadFormMulti">
       <input style="display: none" :id="uniqueId" type="file" name="file" multiple accept="image/jpg,image/jpeg,image/png,image/gif" @change="uploadImg('uploadFormMulti')">
     </form>
  </div>
</template>
<script>
  import Quill from 'quill'
  export default {
    name: 'quill',
    data () {
      return{
        uniqueId: Date.now(),
        imageLoading: false,
        content: '',
        editorOption: {
          modules: {
            toolbar: [
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              ['bold', 'italic', 'underline','strike'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{'align': 'right'}, {'align': 'center'}, {'align': 'justify'}],
               [{ 'color': [] }, { 'background': [] }],
              ['image', 'link','code-block']
            ],
          },
          themes: 'snow'
        }
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    methods: {
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      onEditorChange({ editor, html, text }) {
        this.content = html
        // console.log(this.content)
        this.$emit('send-content', this.content)
      },
      uploadImgNow () {

      },
      uploadImgReq (formData, url) {
        return new Promise((resolve, reject) => {
          $.ajax({
            url: 'http://120.77.43.178:8088/api/upload/image',
            type: 'POST',
            cache: false,
            data: formData,
            processData: false,
            contentType: false
          })
          .done(function(res) {
            resolve(res.url)
          })
          .fail(function(err) {
            // console.log(err)
          });
        })
      },
      uploadImg: async function(id) {
         var vm = this
         vm.imageLoading = true
         var formData = new FormData($('#' + id)[0])
         try {
           const url = await vm.uploadImgReq(formData)// 自定义的图片上传函数
           if (url != null && url.length > 0) {
              var value = url
              vm.addImgRange = vm.$refs.newEditor.quill.getSelection()
              value = value.indexOf('http') != -1 ? value : 'http:' + value
              vm.$refs.newEditor.quill.insertEmbed(vm.addImgRange != null?vm.addImgRange.index:0, 'image', value, Quill.sources.USER)
            } else {
             vm.$message.warning("图片增加失败")
          }
           document.getElementById(vm.uniqueId).value=''
        } catch ({message: msg}) {
           document.getElementById(vm.uniqueId).value=''
           vm.$message.warning(msg)
        }
         vm.imageLoading = false
      },
    },
    mounted() {
      var vm =this
      var imgHandler = async function(image) {
        vm.addImgRange = vm.$refs.newEditor.quill.getSelection()
        if (image) {
           var fileInput = document.getElementById(vm.uniqueId) //隐藏的file文本ID
           fileInput.click() //加一个触发事件
        }
      }
      vm.$refs.newEditor.quill.getModule("toolbar").addHandler("image", imgHandler)
   }
  }
</script>
<style>
  #quill .ql-container{
    height: 500px;
    font-size: 15px;
  }
  .ql-snow .ql-editor img{
    max-width: 100%;
  }
</style>