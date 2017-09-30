<template>
  <div class="maps" ref="mapBox" @mousewheel.prevent="wheel()">
    <div id="container" class="mymap"></div>
    <div >
      位置更新：<span id="nearestJunction"></span> &nbsp;&nbsp;<span>点击上方确认地址</span>
    </div>
  </div>
</template>

<script>
import AMap from 'AMap'
import { bus } from '../assets/js/public.js'
export default {
  name: 'maps',
  data () {
    return {
      addr: '',
      newmap:{},
      state: ''
    }
  },
  created () {
    bus.$on('address', (val) => {
      this.geocoders(val)
    })
  },
  mounted () {
    const map = new AMap.Map('container', {
      zoom: 16,
      scrollWheel: false,
      resizeEnable: true
    });
    this.newmap = map
    this.loadmap(this.newmap)
  },
  methods: {
    success () {
      const h = this.$createElement;
      this.$notify({
        message: h('span', { style: 'color: teal'}, '培训地点更新成功')
      });
    },
    error () {
      this.$message({
        showClose: true,
        message: '错了哦，这是一条错误消息',
        type: 'error'
      })
    },
    geocoders(val) {
        var self = this;
        let msg = val
        var geocoder = new AMap.Geocoder({
            city: "", //城市，默认：“全国”
            radius: 1000 //范围，默认：500
        });
        //地理编码,返回地理编码结果
        geocoder.getLocation(msg, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                self.geocoders_CallBack(result);
            }
        });
    },
    addMarker(i, d) {
        var self = this
        var marker = new AMap.Marker({
            map: self.newmap,
            position: [ d.location.getLng(),  d.location.getLat()]
        });
        var infoWindow = new AMap.InfoWindow({
            content: d.formattedAddress,
            offset: {x: 0, y: -30}
        });
        marker.on("mouseover", function(e) {
            infoWindow.open(self.newmap, marker.getPosition());
        });
    },
    //地理编码返回结果展示
   geocoders_CallBack(data) {
        var self = this;
        var resultStr = "";
        //地理编码结果数组
        var geocode = data.geocodes;
        self.addMarker(geocode.length-1, geocode[geocode.length-1]);
        // for (var i = 0; i < geocode.length; i++) {
        //     //拼接输出html
        //     resultStr += "<span style=\"font-size: 12px;padding:0px 0 4px 2px; border-bottom:1px solid #C1FFC1;\">" + "<b>地址</b>：" + geocode[i].formattedAddress + "" + "&nbsp;&nbsp;<b>的地理编码结果是:</b><b>&nbsp;&nbsp;&nbsp;&nbsp;坐标</b>：" + geocode[i].location.getLng() + ", " + geocode[i].location.getLat() + "" + "<b>&nbsp;&nbsp;&nbsp;&nbsp;匹配级别</b>：" + geocode[i].level + "</span>";
        //     self.addMarker(i, geocode[i]);
        // }
        self.newmap.setFitView();
        // document.getElementById("result").innerHTML = resultStr;
    },
    loadmap(map){
      var self = this
      //加载SimpleMarker
      AMapUI.loadUI(['overlay/SimpleMarker', 'misc/PositionPicker', 'misc/PoiPicker'], function(SimpleMarker, PositionPicker, PoiPicker) {
        //内置的样式
        var iconStyles = SimpleMarker.getBuiltInIconStyles();

        //创建SimpleMarker实例
        //创建拖拽 PositionPicker 实例
        var positionPicker = new PositionPicker({
            mode: 'dragMap',//设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
            map: map,//依赖地图对象
            // iconStyle: {//自定义外观
            //    url: '//webapi.amap.com/ui/1.0/assets/position-picker2.png',//图片地址
            //    size: [48,48],  //要显示的点大小，将缩放图片
            //    ancher: [24,40],//锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置
            // }
        });
        //TODO:事件绑定、结果处理等
        positionPicker.on('success', function(positionResult) {
            // self.success()
            // document.getElementById('lnglat').innerHTML = positionResult.position;
            // document.getElementById('address').innerHTML = positionResult.address;
            document.getElementById('nearestJunction').innerHTML = positionResult.nearestPOI;
            // document.getElementById('nearestRoad').innerHTML = positionResult.nearestRoad;
            // document.getElementById('nearestPOI').innerHTML = positionResult.nearestPOI;
            bus.$emit('getAddress', positionResult.nearestPOI)
            bus.$emit('lnglat', positionResult.position)
        });
        positionPicker.on('fail', function(positionResult) {
            // self.error()
            // 海上或海外无法获得地址信息
            // document.getElementById('lnglat').innerHTML = ' ';
            // document.getElementById('address').innerHTML = ' ';
            // document.getElementById('nearestJunction').innerHTML = ' ';
            // document.getElementById('nearestRoad').innerHTML = ' ';
            // document.getElementById('nearestPOI').innerHTML = ' ';
        })
        positionPicker.start();
      })
    },
    wheel (event) {
      event = event || window.event;
      if(event.deltaY > 0){
        this.newmap.zoomOut()
      }else{
        this.newmap.zoomIn()
      }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .amap-logo{
    display: none !important;
  }
  .amap-copyright{
    left: 0;
  }
</style>
<style scoped>
  .mymap{
    border: 1px solid #ddd;
    height: 512px;
    margin:auto;
  }
 .amap-marker-label {
    font-size: 13px;
    border: 1px solid orange;
    background: #fff;
    border-radius: 10px 0 0 0;
    color: #690441;
  }
  .maps{
    font-size: 14px;
  }
  input[type=text]{
    height: 30px;
    width: 100px
  }
</style>
