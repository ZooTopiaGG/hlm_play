<template>
  <div class="all" v-loading.body="loadingCreateTrains" element-loading-text="正在创建...">
    <div class="home margin" :style="{ overflow:isFlow }">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="培训名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="宣传图片" v-loading.body="loadingAvatarUpload" required>
          <el-col :span="6" class='backgroundImg'>
            <img :src="form.addImgSrc">
          </el-col>
          <el-col :span="14" class="rightBtn">
            <el-button type="primary">添加海报</el-button>
            <p class="prompt">温馨提示：图片尺寸建议365*280，图片须小于1M</p>
            <!-- <input class="avatar-uploader-icon" name="file" id="file" type="file" @change="beforeAvatarUpload"> -->
            <el-upload
              class="avatar-uploader"
              action="http://120.77.43.178:8088/api/upload/image"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-form-item>
        <el-form-item label="上课时间" required >
          <el-col :span="4">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="开始日期" :picker-options="form.pickerOptions0" v-model="form.date1" style="width: 150px;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="4">
            <el-form-item prop="date2">
              <el-date-picker type="date" placeholder="结束日期" :picker-options="form.pickerOptions0" v-model="form.date2" style="width: 150px;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24" id="efi">
            <div class="schedule flex-v">
              <div class="weekList flex flex-pack-around">
                <span>一</span>
                <span>二</span>
                <span>三</span>
                <span>四</span>
                <span>五</span>
                <span>六</span>
                <span>日</span>
              </div>
              <div class="boxes flex">
                <div class="timeList flex-v">
                  <span>上午</span>
                  <span>下午</span>
                  <span>晚上</span>
                </div>
                <div class="checkList flex-1">
                  <div class="week1" ref="week1">
                    <el-checkbox v-for="(item, index) in checkedSchedule[0]" :key="1111" @change="changeWeek(index, 1)">
                    </el-checkbox>
                  </div>
                  <div class="week2" ref="week2">
                     <el-checkbox v-for="(item, index) in checkedSchedule[1]" :key="2222" @change="changeWeek(index, 2)">
                    </el-checkbox>
                  </div>
                  <div class="week3" ref="week3">
                     <el-checkbox v-for="(item, index) in checkedSchedule[2]" :key="3333" @change="changeWeek(index, 3)">
                    </el-checkbox>
                   
                  </div>
                  <div class="week4" ref="week4">
                     <el-checkbox v-for="(item, index) in checkedSchedule[3]" :key="4444" @change="changeWeek(index, 4)">
                    </el-checkbox>
                  </div>
                  <div class="week5" ref="week5">
                     <el-checkbox v-for="(item, index) in checkedSchedule[4]" :key="5555" @change="changeWeek(index, 5)">
                    </el-checkbox>
                  </div>
                  <div class="week6" ref="week6">
                     <el-checkbox v-for="(item, index) in checkedSchedule[5]" :key="6666" @change="changeWeek(index, 6)">
                    </el-checkbox>
                  </div>
                  <div class="week7" ref="week7">
                     <el-checkbox v-for="(item, index) in checkedSchedule[6]" :key="7777" @change="changeWeek(index, 7)">
                    </el-checkbox>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-form-item>
        <el-form-item label="报名截止" required>
          <el-col :span="24" class="margin-10">
            <el-form-item prop="sign">
              <span>培训结束前均可报名 </span>
              <el-switch on-text="" off-text="" v-model="form.sign" @change="changeSign()"></el-switch>
            </el-form-item>
          </el-col>
          <el-collapse-transition>
            <div v-show="form.isSign">
              <el-col :span="4">
                <el-form-item prop="date3">
                  <el-date-picker type="date" placeholder="截止日期" :picker-options="form.pickerOptions0"  v-model="form.date3" style="width: 150px;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="4">
                <el-form-item prop="date4">
                  <el-time-picker type="fixed-time" placeholder="截止时间"  v-model="form.date4" style="width: 150px;"></el-time-picker>
                </el-form-item>
              </el-col>
            </div>
          </el-collapse-transition>
        </el-form-item>
        <el-form-item label="人数范围" required>
          <el-col :span="4">
            <el-form-item prop="personRange1">
              <el-input v-model="form.personRange1" type='number' style="width: 150px;" min="0" placeholder="输入最少人数"></el-input>
              
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="4">
            <el-form-item prop="personRange2">
              <el-input v-model="form.personRange2" type='number' style="width: 150px;" min="0" placeholder="输入最多人数"></el-input>
              
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="年龄阶段" required>
          <el-col :span="4">
            <el-form-item prop="ageRange1">
              <el-input v-model="form.ageRange1" type='number' style="width: 150px;"  min="0" placeholder="输入最小年龄"></el-input>
            
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="4">
            <el-form-item prop="ageRange2">
              <el-input v-model="form.ageRange2" type='number' style="width: 150px;"  min="0" placeholder="输入最大年龄"></el-input>
             
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="培训地点" required style="margin-bottom: 10px;">
          <el-col :span="4">
            <el-form-item prop="cityRange" id="city">
              <el-select v-model="form.cityRange" placeholder="选择城市" @change="toAddress()" style="width: 150px;">
                <el-option
                  v-for="(item, index) in cityList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="areaRange" id="area">
              <el-select v-model="form.areaRange" placeholder="市/市级县（区）" @change="toAddress()" style="width: 150px;">
                 <el-option
                  v-for="(item, index) in areaList"
                  :key="item.index"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item prop="streetRange">
               <el-input v-model="form.streetRange" id="streetInput" placeholder="详细地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="edit" id="editInput" @click="sureAddress()">确认地址</el-button>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col>
            <el-collapse-transition>
              <AMap v-show="form.showMap" @get-info="getInfo" :addrs="form.givAddr"></AMap>
            </el-collapse-transition>
          </el-col>
        </el-form-item>
        <el-form-item label="培训类别" prop="category" required>
          <el-select v-model="form.category" placeholder="选择培训类别" style="width: 150px;">
            <el-option label="篮球" value="lanqiu"></el-option>
            <el-option label="足球" value="zuqiu"></el-option>
            <el-option label="羽毛球" value="yumaoqiu"></el-option>
            <el-option label="网球" value="wangqiu"></el-option>
            <el-option label="橄榄球" value="ganlanqiu"></el-option>
            <el-option label="乒乓球" value="pingpangqiu"></el-option>
            <el-option label="游泳" value="youyong"></el-option>
            <el-option label="舞蹈类" value="wudaolei"></el-option>
            <el-option label="搏击类" value="bojilei"></el-option>
            <el-option label="高尔夫球" value="gaoerfuqiu"></el-option>
            <el-option label="瑜伽" value="yujia"></el-option>
            <el-option label="极限类" value="jixianlei"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报名费用" required>
          <el-col :span="24" style="border: 1px solid #DCDCDC" id="prices">
            <el-form-item class="col4">
              <el-col :span="4">序号</el-col><el-col :span="4">原价</el-col><el-col :span="4">现价</el-col><el-col :span="4">单位</el-col><el-col :span="4">人数<span>(课程所包含人数)</span></el-col><el-col :span="4">操作</el-col>
            </el-form-item>
            <el-form-item
              v-for="(domain, index) in form.domains"
              :prop="'domains.' + index + '.value'"
              class="col4"
              :key="index"
            >
              <el-col :span="4">
                <span>{{ index+1 }}</span>
              </el-col>
              <el-col :span="4">
                <el-input v-model="domain.old_price" type="number"  min="0" style="width:70px"></el-input>
              </el-col>
              <el-col :span="4">
                <el-input v-model="domain.price" type="number" min="0" style="width:70px"></el-input>
              </el-col>
              <el-col :span="4" >
                <div id="domains">
                  <el-input v-model="domain.amount" type="number" min="0" style="width:70px" id="do_input"></el-input>
                  <el-select v-model="domain.unit" style="width:80px" label="" placeholder=" " id="select">
                    <el-option label="课时" value="课时"></el-option>
                    <el-option label="周" value="周"></el-option>
                    <el-option label="月" value="月"></el-option>
                    <el-option label="季" value="季"></el-option>
                    <el-option label="半年" value="半年"></el-option>
                    <el-option label="年" value="年"></el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="4">
                <el-input v-model="domain.people" type="number" min="0" style="width:70px"></el-input>
              </el-col>
              <el-col :span="4" v-show="form.domains.length > 1">
                <el-button @click.prevent="removeDomain(domain)">删除</el-button>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="24"  style="margin-top:20px">
            <el-form-item>
              <el-button type="primary" @click="addDomain()">新增费用</el-button>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="课程介绍" prop="desc" required id="editor">
          <!-- <el-input type="textarea" :rows='Number(form.len)' v-model="form.desc"></el-input> -->
          <EditorDetails @send-content="getContent"></EditorDetails>
        </el-form-item>
        <el-form-item label="详情图片">
          <el-upload
            action="http://120.77.43.178:8088/api/upload/image"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handlePictureSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="form.dialogVisible" size="tiny">
            <img width="100%" :src="form.dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="submitForm('form')" class="public">发布</el-button>
          <!-- <el-button @click="resetForm('form')"></el-button> -->
          <el-button type="warning" @click.stop="previewing" style="width:141px;height:52px;">预览</el-button>
        </el-form-item>
      </el-form>
    </div>
    <transition name="fade">
      <div class="box" v-show="preview">
        <div class="copy-tel">
          <div class="close-box">
            <img @click="closeBox" src="../assets/images/close.png">
          </div>
          <div class="copy-tel-box" >
            <div class="copy-tel-box-deep" ref="deepDiv" v-html="form.desc">
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="homeBtm">
      <bottom-nav></bottom-nav>
    </div>
  </div>
</template>
<script>
  import BottomNav from './BottomNav.vue'
  import EditorDetails from './QuillEditor.vue'
  import AMap from './AMap.vue'
  import { bus } from '../assets/js/public.js'
  import axios from 'axios'
  import qs from 'qs'
  import { mapGetters } from 'vuex'
  import { Loading } from 'element-ui'
  export default {
    name: 'all',
    data() {
      return {
        isFlow: 'auto',
        message: '',
        form: {
          pickerOptions0: {
            disabledDate(time) {
              return time.getTime() < Date.now() - 8.64e7;
            }
          },
          name: '',
          region: '',
          date1: '',
          date2: '',
          date3: '',
          date4: '',
          sign: false,
          isSign: true,
          open_join: 0,
          join_end: '',
          type: [],
          resource: '',
          detailsAddress: '',
          showMap: false,
          givAddr: '',
          desc: '',
          personRange1: '',
          personRange2: '',
          ageRange1: '',
          ageRange2: '',
          category: '',
          cityRange: '',
          areaRange: '',
          streetRange: '',
          dialogImageUrl: '',
          dialogVisible: false,
          addImgSrc: 'http://img1.hudongba.com/static_v4/images/post/posterImg.png',
          coverImg: '',
          len:'10',
          position: '',
          // 详情图片数组
          detailsImg: [],
          // 区域id
          areaid: '',
          // 报名费用操作
          domains: [
            {
              // 现价
              price: '',
              // 原价
              old_price: '',
              // 数量
              amount: '',
              //单位
              unit: '',
              //人数
              people: ''
            }
          ]
        },
        // 预览
        preview: false,
        // 加载
        loadingAvatarUpload: false,
        loadingCreateTrains: false,
        // schedules
        checkedSchedules:[
          {
            morning: 0,
            afternoon: 0,
            evening: 0
          },
          {
            morning: 0,
            afternoon: 0,
            evening: 0
          },
          {
            morning: 0,
            afternoon: 0,
            evening: 0
          },
          {
            morning: 0,
            afternoon: 0,
            evening: 0
          },
          {
            morning: 0,
            afternoon: 0,
            evening: 0
          },
          {
            morning: 0,
            afternoon: 0,
            evening: 0
          },
          {
            morning: 0,
            afternoon: 0,
            evening: 0
          },
        ],
        checkedSchedule:[
          {
            morning: 0,
            afternoon: 0,
            evening: 0
          },
          {
            morning: 0,
            afternoon: 0,
            evening: 0
          },
          {
            morning: 0,
            afternoon: 0,
            evening: 0
          },
          {
            morning: 0,
            afternoon: 0,
            evening: 0
          },
          {
            morning: 0,
            afternoon: 0,
            evening: 0
          },
          {
            morning: 0,
            afternoon: 0,
            evening: 0
          },
          {
            morning: 0,
            afternoon: 0,
            evening: 0
          },
        ],
        // 城市列表
        cityList: [],
        // 区域列表
        areaList: [],
        // 表单验证规则
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          personRange1: [
            { required: true, message: '请输入最少人数（整数）', trigger: 'change' }
          ],
          personRange2: [
            { required: true, message: '请输入最多人数（整数）', trigger: 'change' }
          ],
          ageRange1: [
            { required: true, message: '请输入最小年龄（整数）', trigger: 'change' }
          ],
          ageRange2: [
            { required: true, message: '请输入最大年龄（整数）', trigger: 'change' }
          ],
          cityRange: [
            { required: true, message: '请选择地区', trigger: 'change' }
          ],
          provinceRange: [
            { required: true, message: '请选择城市', trigger: 'change' }
          ],
          // streetRange: [
          //   { required: true, message: '请输入详细地址', trigger: 'blur' }
          // ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择培训类别', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写课程介绍', trigger: 'blur' }
          ]
        }
      }
    },
    components: {
      AMap,
      BottomNav,
      EditorDetails
    },
    computed: {
      ...mapGetters([
        'GET_LOGIN_RESULT'
      ]),
    },
    methods: {
      // 获取yyyy-mm-dd
      getD (time) {
        if (time) {
          var d = new Date(time)
          let Y =  d.getFullYear() 
          let M =  (d.getMonth() + 1) < 10 ? '0'+ (d.getMonth() + 1) : (d.getMonth() + 1)
          let D =  d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
          let ymd = Y + '-' + M + '-' + D
          return ymd
        } else {
          var ymd = ''
          return ymd
        }
      },
      // 获取time
      getT (time) {
        if (time) {
          var d = new Date(time)
          let h =  d.getHours() < 10 ? '0' + d.getHours() : d.getHours() 
          let m =  d.getMinutes() < 10 ? '0'+ d.getMinutes() : d.getMinutes()
          let s =  d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
          let hms = h + ':' + m + ':' + s
          return hms
        }else {
          var ymd = ''
          return ymd
        }
      },
      // 点击关闭
      closeBox () {
        this.preview = false
      },
      // 点击预览
      previewing () {
        this.preview = true
      },
      // 获取编辑器文本内容
      getContent (data) {
        if (data) {
          this.form.desc = '<div class="ql-editor">'+data+'</div>'
        }else {
          this.form.desc = ''
        }
      },
      // ueditor 编辑器
      editorReady (instance) {
        instance.setContent('');
        instance.addListener('contentChange', () => {
            this.content = instance.getContent();
        });
      },
      // 课程表周期
      changeWeek(str, idx) {
        var index = parseInt(idx - 1)
        for(var k in this.checkedSchedules[index]){
          if(k === str){
            if(this.checkedSchedules[index][k] === 0){
              this.checkedSchedules[index][k] = 1
            }else{
              this.checkedSchedules[index][k] = 0
            }
          }
        }
      },
      // 提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.createTrains()
          } else {
            return false;
          }
        });
      },
      // 重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 添加模块
      addDomain () {
        this.form.domains.push({
            // 现价
            price: '',
            // 原价
            old_price: '',
            // 数量
            amount: '',
            //单位
            unit: '',
            //人数
            people: ''
        });
      },
      // 删除当前模块
      removeDomain (item) {
        var index = this.form.domains.indexOf(item)
        if (index !== -1) {
          this.form.domains.splice(index, 1)
        }
      },
      // 上传海报成功回调
      handleAvatarSuccess(res, file) {
        this.loadingAvatarUpload = false
        //转换blob对象 
        this.form.addImgSrc = URL.createObjectURL(file.raw);
        this.form.coverImg = res.url
      },
      // 上传海报之前之前
      beforeAvatarUpload(file) {
        this.loadingAvatarUpload= true
        const isIMG = file.type.indexOf('image') > -1
        const isLt4M = file.size / 1024 / 1024 < 4

        if (!isIMG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt4M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isIMG && isLt4M;
      },
      // 删除详情图片
      handleRemove(file, fileList) {
        // console.log(file, fileList);
      },
      // 上传放大详情图片
      handlePictureCardPreview(file) {
        this.form.dialogImageUrl = file.url;
        this.form.dialogVisible = true;
      },
      // 上传详情图片成功后
      handlePictureSuccess (res, file) {
        this.form.detailsImg.push(res.url)
      },
      // 返回计算属性数组
      returnArr (obj1, obj2) {
        var arr = []
        arr = obj1.map((x) => {
          let newX = Number(x.label) + Number(obj2)
          let newObj = {
            value: newX.toString(),
            label: newX.toString()
          }
          return newObj
        })
        let addObj = {
          value: '不限',
          label: '不限'
        }
        arr.unshift(addObj)
        return arr
      },
      // 获取城市
      toAddress () {
        var id = ''
        this.cityList.forEach((val) => {
          if(this.form.cityRange === val.name){
            id = val.id
            return
          }
        })
        this.areaList.forEach((val) => {
          if(this.form.areaRange === val.name){
            this.form.areaid = val.id
            return
          }
        })
        if(typeof(id) == 'number'){
          this.getArea(id)
        }
        this.form.showMap = true
        this.form.givAddr = this.form.cityRange + this.form.areaRange + this.form.streetRange
        // console.log(this.form.givAddr)
        bus.$emit('address', this.form.givAddr)
      },
      // 动态获取地理位置信息
      getInfo (obj) {
        this.form.detailsAddress = obj.poi
        this.form.position = obj.pos
      },
      // 确定获取到详细地址
      sureAddress () {
        this.form.streetRange = this.form.detailsAddress
        this.form.showMap = !this.form.showMap
      },
      changeSign () {
        this.form.isSign = !this.form.sign
        if(this.form.isSign){
          this.form.open_join = 0
        } else {
          this.form.open_join = 1
        }
      },
      // 培训详情
      getTrainsDetails () {
        axios.get('trains/01/detail')
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      },
      // 创建培训
      createTrains () {
        this.loadingCreateTrains = true
        var token,
        res = window.localStorage.getItem('hlm_l_r')
        res = JSON.parse(res)
        if(this.GET_LOGIN_RESULT && this.GET_LOGIN_RESULT.token){
          token = this.GET_LOGIN_RESULT.token
        }else if(res && res.token ){
          token = res.token
        }else{
          token = 'AUTO_TOKEN'
        }
        var instance = axios.create({
           baseURL: 'http://120.77.43.178:8088/api/'
        })
        //在实例创建后改变默认值
        instance.defaults.headers.common['Authorization'] = 'Bearer'+' '+token
        var _this = this

        var dp_pri = _this.form.domains.map(x => {
          return {
            price: x.price * 100,
            old_price: x.old_price * 100,
            amount: x.amount,
            unit: x.unit,
            people: x.people
          }
        })
        if (_this.form.open_join == 0) {
          _this.form.join_end = _this.getD(_this.form.date3)+' '+_this.getT(_this.form.date4)
        } else {
          _this.form.join_end = ''
        }

        var para = {
          // 培训名称
          title: _this.form.name,
          // 培训封面
          cover: _this.form.coverImg,
          // 开始日期
          start_date: _this.getD(_this.form.date1),
          //  结束日期
          end_date: _this.getD(_this.form.date2),
          // 每天开始时间 可选
          start_time: '',
          // 每天结束时间 可选
          end_time: '',
          // 最小年龄
          age: _this.form.ageRange1,
          // 最大年龄
          age_max: _this.form.ageRange2,
          // 最少人数
          capacity: _this.form.personRange1,
          // 最多人数
          capacity_max: _this.form.personRange2,
          // 课程价格 array // _this.form.domains
          prices: dp_pri,
          // 课表数组 
          // 上午,中午，下午是否有课 1是0否
          schedules: _this.checkedSchedules,
          // 地区id
          area_id: _this.form.areaid,
          // 培训结束前均可报名（1-是，0-否）
          open_join: _this.form.open_join,
          // 报名截止时间(open_join为0时需要，格式如 2017-06-25 12:50:22) 可选
          join_end_at: _this.form.join_end,
          // 地址
          address: _this.form.detailsAddress,
          // 描述
          description: _this.form.desc,
          // 课程周期 (数组如[1,2,3,4,5,6,7]: 为周一至周日)
          cycle: [1,2,3,4,5,6,7],
          // 培训图片url数组
          images: _this.form.detailsImg,
          // 经度
          longitude: _this.form.position.lng,
          // 纬度
          latitude: _this.form.position.lat,
          // 培训类别
          category: _this.form.category
        }
        axios.post('seller/trains', para)
        .then(res => {
          this.loadingCreateTrains = false
          this.$message.success('创建成功！')
        })
        .catch(err => {
          this.loadingCreateTrains = false
        })
      },
      // 获取城市列表
      getCity () {
        let loadingInstance = Loading.service({
          target: document.getElementById('city')
        })
        var para = {}
        axios.post('cities', para)
        .then(res => {
          this.cityList = res.data
          loadingInstance.close()
        })
        .catch(err => {
          console.log(err)
        })
      },
      // 获取区域列表
      getArea (id) {
        let loadingInstance = Loading.service({
          target: document.getElementById('area')
        })
        var para = {
          city_id: id
        }
        axios.post('areas', para)
        .then(res => {
          this.areaList = res.data
          loadingInstance.close()
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    mounted () {
      this.getCity()
      var res = window.localStorage.getItem('hlm_l_r')
      res = JSON.parse(res)
      if(this.GET_LOGIN_RESULT && this.GET_LOGIN_RESULT.token){
        bus.$emit('name', this.GET_LOGIN_RESULT.name)
      }else if(res && res.token){
        bus.$emit('name', res.name)
      }else{
        return
      }
      // this.getTrainsDetails()
      this.$watch('form.cityRange', (newVal, oldVal) => {
        if(newVal != oldVal){
          this.form.areaRange = ''
          this.form.streetRange = ''
        }
      })
      this.$watch('form.areaRange', (newVal, oldVal) => {
        if(newVal != oldVal){
          this.form.streetRange = ''
        }
      })
      // // 获取街道信息
      // bus.$on('getAddress', (val) => {
      //  this.form.detailsAddress = val
      // })
      // // 获取坐标
      // bus.$on('lnglat', (val) => {
      //   this.form.position = val
      // })
    }
  }
</script>
<style>
#editor-container {
  height: 375px;
}
.public{
  width: 221px;
  height: 52px;
}
  #editor .el-form-item__content{
    line-height: 20px
  }
  #streetInput input{
    border-radius: 4px 0 0 4px;
    border-right: 0;
  }
  #editInput{
    border-radius: 0 4px 4px 0;
    padding: 10px 7px;
  }
  .el-form-item{
    margin-bottom: 40px;
  }
  .el-form-item__label{
    padding-right: 20px;
  }
  .col4 .el-form-item__content{
    line-height: 62px;
  }
  .line-center{
    text-align: center;
  }
  .col4 input{
    text-align: center;
  }
  .col4 .el-col-4{
    text-align: center;
  }
  #prices .el-input input{
    padding: 0
  }
  #domains{
    display: flex;
    justify-content:center;
  }

  #do_input input{
    border-radius: 4px 0 0 4px;
    border-right: 0
  }

  #select input{
    border-radius: 0 4px 4px 0;
    border-left: 0
  }
  #domains input:focus{
    border-color:#bfcbd9;
  }
  #domains input:hover{
    border-color:#bfcbd9;
  }
  .avatar-uploader-icon{
    width: 88px;
    height: 36px;
    position: absolute;
    top: 40px;
    cursor: pointer;
    opacity: 0;
    z-index: 9
  }
  .schedule{
    display: flex;
    width: 423px;
    height: 202px;
    border: 1px solid #DCDCDC;
    margin-top: 20px;
  }
  .weekList{    
    padding: 16px 0;
    margin-left: 46px;
    margin-right: 10px
  }
  .timeList{
    width: 16px;
    padding:0 15px;
  }
  .timeList span{
    line-height: 24px
  }
  #efi{
    line-height: 20px
  }
  .checkList{
    margin-right: 10px;
  }
  .checkList .el-checkbox__input.is-checked .el-checkbox__inner{
    background: #F9EB0D;
    border-color: #F9EB0D;
    width: 40px;
    height: 40px;
  }
  .checkList .el-checkbox__inner{
    width: 40px;
    height: 40px;
  }
  .checkList{
    display: flex;
    -webkit-box-pack:justify;
    -webkit-justify-content:space-around;
    -ms-flex-pack:justify;
    justify-content:space-around;
  }
  .checkList div{
    display: flex;
    flex-direction: column; 
  }
  .checkList div label{
    margin-bottom: 9px
  }
  .checkList .el-checkbox+.el-checkbox{
    margin-left: 0
  }
  .checkList .el-checkbox__inner::after {
    box-sizing: content-box;
    content: "";
    border: 3px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 20px;
    left: 14px;
    position: absolute;
    top: 3px;
    -ms-transform: rotate(45deg) scaleY(0);
    transform: rotate(45deg) scaleY(0);
    width: 10px;
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
    -ms-transform-origin: center;
    transform-origin: center;
}
</style>
<style>
  .home{
    width: 1190px;
    min-width: 1190px;
    height: auto;
    padding: 40px 0; 
  }
  .prompt{
    font-size: 12px;
    color: #BFBFBF;
  }
  .rightBtn{
    margin-top: 39.5px; 
  }
  .backgroundImg img{
    width: 210px;
    height: 123px;
  }
  .box{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.49);
    z-index: 999;
    min-height:  8.88rem;
  }
  .copy-tel{
    width: 4.33rem;
    height: auto;
    background:url(../assets/images/cptel.png) no-repeat;
    background-size: cover;
    position: absolute;
    left: 50%;
    margin-left: -2.165rem;
    top: 50%;
    margin-top: -4.44rem;
    cursor: pointer;
  }
  .copy-tel-box{
    margin: 1.1rem 0.3rem;
    height: 6.65rem;
    overflow-y: auto;
    overflow-x: hidden; 
    background: #fff;
  }
  .copy-tel-box-deep{
    padding: 0.1rem;
  }
  .close-box img{
    width: 0.51rem;
    height: 0.51rem;
  }
  
  .close-box{
    position: absolute;
    right: -0.51rem;
    top: 0;
    cursor: pointer;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active 在低于版本 2.1.8 中 */ {
    opacity: 0
  }
  .copy-tel-box-deep img{
    max-width: 100%;
    height: auto;
  }
</style>
