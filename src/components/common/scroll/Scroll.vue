<template>
<!--vue中 ref一般绑定给子组件 明确的拿到某个组件 通过this.$refs.绑定的名字  获取的是组件对象-->
<!-- ref绑定在普通元素上的时候 通过this.$refs.绑定的名称 获取的元素对象 -->
<!-- 无论是否设置click:true button按钮都可以点击，但是div盒子必须设置 -->
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

BScroll.use(Pullup)
export default {
    name:'Scroll',
    props:{
        probeType:{
            type:Number,
            default:0
        },
        PullUpLoad:{
            type:Boolean,
            default: false
        }
    },
    data(){
        return {
            scroll:null
        }
    },
    mounted(){
        //1、创建BScroll对象
        this.scroll=new BScroll(this.$refs.wrapper,{
            probeType:this.probeType,
            PullUpLoad:this.PullUpLoad,
            click:true,
            observeDOM: true
        })
        //2、监听滚动的位置 实时监听
        //scrollHeight的属性是根据better-scroll的内容高度决定
        this.scroll.on('scroll',(position)=>{
            this.$emit('scroll',position);
        })
        //监听上拉加载更多的操作
        this.scroll.on('pullingUp',()=>{
            this.$emit('pullingUp');
        })
    },
    methods:{
        scrollTo(x, y, time=300){
            this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
        },
        finishPullUp(){
            this.scroll.finishPullUp();
        },
        refresh(){
            this.scroll && this.scroll.refresh();
        }
    }
}
</script>
<style scoped>

</style>