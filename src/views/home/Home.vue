<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <home-swiper :banners="banners" />
        <recommend-view :recommends="recommends" />
        <feature-view />
        <tab-control class="tab-control" :titles="['流行','新款','精选']" />
        <goods-list :goods="goods['pop'].list" />
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar';

import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/goods/GoodsList';

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
            }
        }
    },
    components:{
        NavBar,
        TabControl,
        GoodsList,
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
    methods:{
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
<style scoped>
    #home{
        padding-top: 44px;
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
    
</style>
