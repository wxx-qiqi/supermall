<template>
    <div id="home" class="wrapper">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
            <home-swiper :banners="banners" />
            <recommend-view :recommends="recommends" />
            <feature-view />
            <tab-control class="tab-control"
             :titles="['流行','新款','精选']"
             @tabclick="tabclick"
             :pull-up-load="true" 
             @pullingUp="loadMore"/>
            <goods-list :goods="showGoods" />
        </scroll>
        <!-- 原生组件能够监听点击 组件不能直接监听点击 必须是@click.native才能监听组件 -->
        <back-top @click.native="backClick" v-show="isShowBackTop" />
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar';
import Scroll from 'components/common/scroll/Scroll';

import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/goods/GoodsList';
import BackTop from 'components/content/backTop/BackTop';

import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView';
import FeatureView from './childComps/FeatureView';

import { getHomeMultidata,getHomeGoods  } from 'network/home';


export default {
    name:'Home',
    data(){
        return {
            banners:[],
            recommends:[],
            goods:{
                'pop':{
                    page:0,
                    list:[]
                },
                'new':{
                    page:0,
                    list:[]
                },
                'sell':{
                    page:0,
                    list:[]
                }
            },
            currentType: 'pop',
            isShowBackTop:false
        }
    },
    computed:{
        showGoods(){
            return this.goods[this.currentType].list
        }
    },
    components:{
        NavBar,
        Scroll,

        TabControl,
        GoodsList,
        BackTop,

        HomeSwiper,
        RecommendView,
        FeatureView
    },
    created(){
        //请求多个数据
       this.getHomeMultidata(),
        //请求商品数据
        this.getHomeGoods('pop'),
        this.getHomeGoods('new'),
        this.getHomeGoods('sell')
        
    },
    mounted(){
        const refresh=this.debounce(this.$refs.scroll.refresh,500);
        //监听图片中的item加载完成
        this.$bus.$on('itemImageLoad',()=>{
            refresh();
        })
    },
    methods:{
        
        //防抖函数debounce  节流函数throttle
        debounce(func,delay){
            let timer=null;
            return function(...args){
                if(timer) clearTimeout(timer);
                timer=setTimeout(()=>{
                    func.apply(this,args)
                },delay)
            }
        },
        /*
        事件监听的方法
        */
       tabclick(index){
           switch (index) {
                case 0:
                    this.currentType='pop';
                    break;
                case 1:
                    this.currentType='new';
                    break;
                case 2:
                    this.currentType='sell';
                    break;
           }

       },
       //返回顶部
       backClick(){
           //拿到对应组件 并且访问对应的属性和方法
           // 通过$refs拿到组件中的对象
            this.$refs.scroll.scrollTo(0, 0, 500);
       },
       //显示导航条
       contentScroll(position){
           //console.log(position);
           this.isShowBackTop=-position.y>1000;
       },
       loadMore(){
           return true;
       },

        /*
        网络请求相关的方法
        */
        getHomeMultidata(){
             getHomeMultidata().then(res=>{
                this.banners=res.data.data.banner.list;
                this.recommends=res.data.data.recommend.list;  
            })
        },
        getHomeGoods(type){
            const page=this.goods[type].page + 1;
            getHomeGoods(type,page).then(res=>{
                //push(...[])能够解析数组里的数据，一个个添加
                //console.log(res.data.data.list);
                this.goods[type].list.push(...res.data.data.list);
                this.goods[type].page+=1;
            })
        }
    }
}
</script>
// scoped是指作用域，当前页面有效
//vh是指视口高度 100vh是指100%高度
<style scoped>
    #home{
        position: relative;
        padding-top: 44px;
        height: 100vh;
    }
    .home-nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background-color: var(--color-tint);
        font-size: 20px;
        color: #fff;
        z-index: 9;
    }
    .tab-control{
        z-index: 9;
    }
    .content{
        position: absolute;
        overflow: hidden;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
    /* .content{
        height: calc(100% - 93px);
        overflow: hidden;
        margin-top: 44px;
    } */
</style>
