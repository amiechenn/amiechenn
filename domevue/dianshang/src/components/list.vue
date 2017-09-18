<template>
    <div class="list" id="list">
        <footerbar></footerbar>
        <h1>选购中心</h1>
        <div class="content">
            <div class="left"> 
                <ul>
                    <li @click="toggle(index)"  v-for="(item,index) in tabs" :class="{active:active==index}">{{item}}</li>
                </ul>
            </div>
            <div class="right">
                <div class="banner"><img src="../assets/img/list-banner.jpg"></div>
                <div class="area"  :class="{hide:currentView !='area1'}">
                    <h2>笔记本电脑</h2>
                    <!-- <div class="more"></div> -->
                    <ul class="clearfix">
                        <li>
                            <a href="">
                                <img src="../assets/img/2.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/2.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/2.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/2.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/2.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/2.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        
                    </ul>
                </div>
                <div class="area" :class="{hide:currentView !='area2'}">
                    <h2>YOGA系列</h2>
                    <!-- <div class="more"></div> -->
                    <ul class="clearfix">
                        <li>
                            <a href="">
                                <img src="../assets/img/1.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/1.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/1.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/1.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/1.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/1.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        
                    </ul>
                </div>
                <div class="area" :class="{hide:currentView !='area3'}">
                    <h2>一体机</h2>
                    <!-- <div class="more"></div> -->
                    <ul class="clearfix">
                        <li>
                            <a href="">
                                <img src="../assets/img/1.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/1.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/1.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/1.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/1.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/1.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        
                    </ul>
                </div>
                <div class="area"  :class="{hide:currentView !='area4'}">
                    <h2>鼠标键盘</h2>
                    <!-- <div class="more"></div> -->
                    <ul class="clearfix">
                        <li>
                            <a href="">
                                <img src="../assets/img/2.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/2.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/2.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/2.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/2.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/2.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        
                    </ul>
                </div>
                <div class="area" :class="{hide:currentView !='area5'}">
                    <h2>其他</h2>
                    <!-- <div class="more"></div> -->
                    <ul class="clearfix">
                        <li>
                            <a href="">
                                <img src="../assets/img/1.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/1.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/1.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/1.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/1.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        <li>
                            <a href="">
                                <img src="../assets/img/1.jpg">
                                <h3>常规笔记本</h3>
                            </a>    
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import footerbar from '@/components/footer';
import '../assets/js/base.js';
export default {
    name: 'list',
    components: {
        footerbar
    },
    data () {
        return {
            active:0,
            currentView: 'area1',
            tabs:['笔记本电脑','YOGA系列','一体机','鼠标键盘','其他']
        }
    },
    methods:{
        toggle(i,x){
            this.active = i;
            this.currentView = "area"+(i+1)
        }
    }
}
</script>

<style scoped  lang="less">
@import '../assets/css/base.css';
@import '../assets/css/list.less';
</style>
