<template>
    <div class="shoping" id="shoping">
        <footerbar></footerbar>
        <h1>购物车<span>编辑</span></h1>
        <div class="shoping-all">
            <div class="area"> 
                <!-- <h3>
                    <div class="checkbox">
                        <input type="checkbox" name="store" id="store">
                        <label for="store"></label>
                    </div>
                    <span>联系专卖店（长沙店）</span>
                </h3> -->
                <div class="list">
                    <ul>
                        <li v-for="(item,index) in itemList">
                            <div class="checkbox">
                                <input type="checkbox" name="item" :id="item" v-model='checkboxModel[index]'  @change="money(500,checkboxModel[index])">
                                <label :for="item"></label>
                            </div>
                            <div class="img">
                                <img :src="require('../assets/img/product/'+item+'.jpg')">
                            </div>
                            <router-link tag="div" :to="{path:'detail',query: {key:item}}" class="content">
                                <h2>拯救者-15ISK 游戏笔记本80RQ000B CD</h2>
                                <p>颜色分类：MT8165 64-bit处理器16G存储空间，支持128G扩展;套餐类型：官方标配</p>
                                <div class="tip">已优惠￥200.00</div>
                                <div class="money">￥500.00</div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="total">
           <h3>
                <div class="checkbox">
                    <input type="checkbox" name="store" id="all" v-model='checked' @click='checkedAll'>
                    <label for="all"></label>
                </div>
                <span>全选</span>
            </h3>
            <div class="num">合计：<span>￥{{takeMoney}}</span></div>
            <div class="btn">去结算</div>
        </div>
    </div>
</template>

<script>
import footerbar from '@/components/footer';
import '../assets/js/base.js';
export default {
    name: 'shoping',
    components: {
        footerbar
    },
    data(){
        return{
            itemList:[1,2,3],
            takeMoney:0, 
            checkboxModel:[],
            checked:""

        }
    },
    watch:{
        'checkboxModel': {
            handler: function (val, oldVal) { 
                var str = false
                if(this.checkboxModel.length == this.itemList.length){                
                    for(var i=0;i<this.checkboxModel.length;i++){
                        if(this.checkboxModel[i]==false||this.checkboxModel[i]==null){
                            this.checked=false;
                            return
                        }else{
                            this.checked=true;
                        }
                    }
                }else{
                    this.checked=false;
                }
              // console.log(this.checkboxModel,this.checked)
            },
            deep: true
        }
    },
    methods:{
        checkedAll(){
            var self = this;
            if (this.checked) {//实现反选
              self.checkboxModel = [];
              this.takeMoney = 0
            }else{//实现全选
              self.checkboxModel = [];
              self.itemList.forEach(function(item) {
                self.checkboxModel.push(item);
              });
              this.takeMoney = 500*3
            }
            console.log(self.checkboxModel); 
        },
        money(x,y){
            if(y==true){
                this.takeMoney+=x
            }else{
                this.takeMoney-=x
            }
            
        }
    }
}
</script>

<style scoped  lang="less">
@import '../assets/css/base.css';
@import '../assets/css/shoping.less';
</style>
