<template>
<!--vue中 ref一般绑定给子组件 明确的拿到某个组件 通过this.$refs.绑定的名字  获取的是组件对象-->
<!-- ref绑定在普通元素上的时候 通过this.$refs.绑定的名称 获取的元素对象 -->
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
export default {
    name:'Scroll',
    data(){
        return {
            scroll:null
        }
    },
    mounted(){
        this.scroll=new BScroll(this.$refs.wrapper,{
            probeType:3,
            scrollY:true,
            click:true,
            observeDOM: true
        })
    }
}
</script>
<style scoped>

</style>