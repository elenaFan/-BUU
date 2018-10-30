<template>
  <div class="box">
    <div class="search">
      <input type="text" placeholder="搜索">
      <icon class="isearch" type="search" size="14"/>
    </div>
    <swiper indicator-dots autoplay circular>
        <block v-for="(item, index) in swiperList" :key="index" wx:key="">
            <swiper-item>
                <image mode="aspectFill" :src="item.image_src"></image>
            </swiper-item>
        </block>
    </swiper>
    <div class="content-category">
      <div class="cate-item" v-for="(item, index) in categoryList">
          <a :href="item.navigator_url">
            <img :src="item.image_src" alt="">
          </a>
          <p>{{item.name}}</p>
      </div>
   </div>
    <div class="fashion">
        <div class="fash" v-for="(item, index) in fashionList">
          <div class="fash-title">
              {{item.floor_title.name}}
          </div>
          <div :style="'background:url('+item.floor_title.image_src+')'" class="fash-img"></div>
            <div class="fash-body">
                <a href="" v-for="(it,index1) in item.product_list">
                    <img :src="it.image_src" alt="">
                    <p>{{it.name}}</p>
                </a>
          </div>
      </div>
    </div>
 <div class="footer">
   <span>我是有底线的</span>
   <span class="iconfont icon-xiao"></span>
   <div class="back-top" @click="top">
     <span class="iconfont icon-jiantoushang"></span>
     <div>TOP</div>
   </div>
 </div>
  </div> 
</template>

<script>
import tool from "../../utils/tool.js";
export default {
  data() {
    return {
      swiperList: [],
      categoryList: [],
      fashionList: [],
      showTop:false
    };
  },

  methods: {
    top() {
      wx.pageScrollTo({
        scrollTop: 0
      });
    }
  },

  created() {
    // tool.myPro({
    //   url:tool.baseUrl+`api/public/v1/home/swiperdata`
    // }).then(result=>{
    //   console.log(result);
    //   this.swiperList=result.data.message;
    // })
    let p1 = tool.myPro({
      url: tool.baseUrl + `api/public/v1/home/swiperdata`
    });
    let p2 = tool.myPro({
      url: tool.baseUrl + `api/public/v1/home/catitems`
    });
    let p3 = tool.myPro({
      url: tool.baseUrl + `api/public/v1/home/floordata`
    });
    Promise.all([p1, p2, p3]).then(result => {
      // console.log(result);
      this.swiperList = result[0].data.message;
      this.categoryList = result[1].data.message;
      this.fashionList = result[2].data.message;
      // this.fashionList=result[2].data.message;
    });
  }
};
</script>

<style lang="scss" scoped>
$mainColor: #ff2d4a;
.box {
  margin-top: 100rpx;
  box-sizing: border-box;
}
.search {
  top: 0rpx;
  left: 0rpx;
  position: fixed;
  height: 100rpx;
  width: 100%;
  background-color: $mainColor;
  padding: 20rpx 20rpx;
  box-sizing: border-box;
  z-index: 998;
  input {
    background-color: aliceblue;
    text-align: center;
    font-size: 28rpx;
  }
  .isearch {
    position: absolute;
    left: 50%;
    transform: translate(-70rpx, -40rpx);
  }
}
swiper {
  width: 100%;
  swiper-item {
    width: 100%;
    image {
      width: 100%;
    }
  }
}
.content-category {
  display: flex;
  width: 100%;
  height: 180rpx;
  // display: flex;

  .cate-item {
    box-sizing: border-box;
    text-align: center;
    padding: 20rpx 30rpx;
    display: block;
    width: 25%;
    flex: 1;
    ._p {
      font-size: 28rpx;
    }
    ._a {
      padding: 10rpx 16rpx;
      display: block;
      width: 100%;

      ._img {
        display: block;
        height: 100rpx;
        width: 100rpx;
      }
    }
  }
}
.fashion {
  width: 100%;
  height: 100%;
  .fash {
    .fash-img {
      &:nth-of-type(1) {
        height: 200rpx;
      }
      //  display: block;
      background-color: #ff2d4a;
      width: 100%;
      height: 100rpx;
    }
    .fash-title {
      // position: absolute;
      font-size: 26rpx;
      line-height: 100rpx;
      padding: 0 20rpx;
      box-sizing: border-box;
    }
    .fash-body {
      padding: 10rpx 10rpx;
      a {
        padding: 5rpx 5rpx;
        box-sizing: border-box;
        display: inline-block;
        float: left;
        width: 33.33%;
        height: 200rpx;
        position: relative;
        &:first-of-type {
          height: 400rpx;
        }

        img {
          display: block;
          width: 100%;
          height: 100%;
        }
        p {
          position: absolute;
          top: 100rpx;
          left: 100rpx;
          color: whitesmoke;
        }
      }
    }
  }
}
.footer {
  text-align: center;
  .iconfont {
    font-size: 46rpx;
  }
  .back-top {
    padding: 10rpx;
    background-color: aqua;
    border-radius: 50%;
    font-size: 26rpx;
    position: fixed;
    top: 1000rpx;
    right: 20rpx;
  }
}
</style>

