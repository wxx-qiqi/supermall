<template>
    <div>
        <swiper>
            <swiper-item v-for="(item,index) in banners" :key="index">
                <a :href="item.link"></a>
                <img :src="item.image" alt="">
            </swiper-item>
        </swiper>
    </div>
</template>
<script>
import { Swiper , SwiperItem } from 'components/common/swiper';
export default {
    nmae: 'HomeSwiper',
    props:{
        banners:{
            type:Array,
            default() {
                return []
                }
        }
    },
    components:{
        Swiper,
        SwiperItem
    }
}
</script>
<style scoped>

</style>