<template>
  <v-content className="home"  style="position:absolute">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(swiperSRC, index) in swiperSRCs">
        <img class="swiper-img"  :src="baseImgUrl+swiperSRC.src" >
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div>
        <VGridRow v-for="items in gridItems" class="btn-grid">
          <VGridCol  :width="item.colWidth" :style="columnStyle" v-for="item in items">
            <router-link class="btn-circle" :to="{path:'/home/'+item.path}">
              <img :src="baseUrl + item.icon" style="width:100%;height:100%">
            </router-link>
            <span style="font-size:12px">{{ item.title }}</span>
          </VGridCol>
        </VGridRow>
      </div>
  </v-content>
</template>

<script>

  import VContent from '../../components/Content';
  import { swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper';
  import VGridCol from '../../components/Grid-col';
  import VGridRow from '../../components/Grid-row';
  import {assetsPublicPath} from '../../config';


  export default {
    created(){
      this.$store.commit('setHead',this.head);
      this.$store.commit('showFooter');
      this.$store.commit('setActiveItem',0);
    },

    data() {
      return {
        baseImgUrl:assetsPublicPath,
        baseUrl: assetsPublicPath + 'static/img/icons/',
        swiperOption: {
          pagination: '.swiper-pagination',
          direction: 'horizontal',
          slidesPerView: 1,
          paginationClickable: true,
          spaceBetween:0,
          mousewheelControl: true
        },
        swiperSRCs:[
          { src: 'static/img/ess_banner_1.jpg' },
          { src: 'static/img/ess_banner_2.jpg' }
        ],
        columnStyle: 'border: none; padding:5px; text-align: center',
        gridItems:[
          [{
            colWidth:'33',
            title:'我的人事档案',
            icon:'myStarProfile.png',
            path:'profile'
          },{
            colWidth:'33',
            title:'我的工资单',
            icon:'myStarSalary.png',
            path:'payslip'
          },{
            colWidth:'33',
            title:'我的休假',
            icon:'myLeave.png',
            path:'leave'
          }],[{
            colWidth:'33',
            title:'我的加班',
            icon:'myOverTime.png',
            path:'overtime'
          },{
            colWidth:'33',
            title:'考勤打卡',
            icon:'myAttend.png',
            path:'attend'
          },{
            colWidth:'33',
            title:'我的审批',
            icon:'HRTransfer.png',
            path:'approve'
          }],[{
            colWidth:'33',
            title:'我的下属',
            icon:'myTeam.png',
            path:'team'
          }]
        ],
        head:{
            backShow:false,
            rightShow:false,
            rightInfo:'',
            show:true,
            title:'员工自助服务'
        }
      }
    },

    methods:{
      onSlideChangeStart (currentPage) {
        console.log('onSlideChangeStart', currentPage);
      },
      onSlideChangeEnd (currentPage) {
        console.log('onSlideChangeEnd', currentPage);
      }
    },

    components: {
      VContent,
      swiper,
      swiperSlide,
      VGridCol,
      VGridRow
    },

  }
</script>

<style scoped>
  .swiper-img{
    width: 100%;
  }
  .btn-circle{
    width: 75px;
    height: 75px;
    border-radius: 50%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn-grid{
    margin: 1rem 0;
  }
  .btn-distance{
    padding-bottom: 10px;
  }

</style>
