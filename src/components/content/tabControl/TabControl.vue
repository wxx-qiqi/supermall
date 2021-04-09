<template>
    <div class="tab-control">
        <!-- vue的复用问题就加key -->
        <div v-for="(item,index) in titles" :key="index" class="tab-control-item" :class="{active:index===currentIndex}"
        @click="itemclick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TabControl',
    props: {
        titles: {
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            currentIndex:0
        }
    },
    methods: {
        itemclick(index){
            this.currentIndex=index;
        }
    }
}
</script>
<style scoped>
    .tab-control{
        /* 移动端适用该属性 */
        position: sticky;
        top: 44px;
        display: flex;
        text-align: center;
        font-size: 15px;
        background-color: #fff;
    }
    .tab-control-item {
        flex: 1;
        height: 40px;
        line-height: 40px;
    }
    .tab-control-item span {
        padding: 5px;
    }
    .active {
        color: var(--color-high-text);
        
    }
    .active span {
        border-bottom: 3px solid pink;
    }
</style>