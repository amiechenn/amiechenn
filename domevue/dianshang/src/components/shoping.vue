<template>
    <div class="shoping" id="shoping">
        <footerbar></footerbar>
        <h1>购物车<span>编辑</span></h1>
        <div class="shoping-all">
            <div class="area"> 
                <h3>
                    <div class="checkbox">
                        <input type="checkbox" name="store" id="store">
                        <label for="store"></label>
                    </div>
                    <span>联系专卖店（长沙店）</span>
                </h3>
                <div class="list">
                    <ul>
                        <li>
                            <div class="checkbox">
                                <input type="checkbox" name="item" id="checkbox1">
                                <label for="checkbox1"></label>
                            </div>
                            <div class="img"><img src="../assets/img/1.jpg"></div>
                            <div class="content">
                                <h2>拯救者-15ISK 游戏笔记本80RQ000B CD</h2>
                                <p>颜色分类：MT8165 64-bit处理器16G存储空间，支持128G扩展;套餐类型：官方标配</p>
                                <div class="tip">已优惠￥200.00</div>
                                <div class="money">￥5,699.00</div>
                            </div>
                        </li>
                        <li>
                            <div class="checkbox">
                                <input type="checkbox" name="item" id="checkbox2">
                                <label for="checkbox2"></label>
                            </div>
                            <div class="img"><img src="../assets/img/1.jpg"></div>
                            <div class="content">
                                <h2>拯救者-15ISK 游戏笔记本80RQ000B CD</h2>
                                <p>颜色分类：MT8165 64-bit处理器16G存储空间，支持128G扩展;套餐类型：官方标配</p>
                                <div class="tip">已优惠￥200.00</div>
                                <div class="money">￥5,699.00</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="area"> 
                <h3>
                    <div class="checkbox">
                        <input type="checkbox" name="store" id="store2">
                        <label for="store2"></label>
                    </div>
                    <span>联系专卖店（长沙店）</span>
                </h3>
                <div class="list">
                    <ul>
                        <li>
                            <div class="checkbox">
                                <input type="checkbox" name="item" id="checkbox2-1">
                                <label for="checkbox2-1"></label>
                            </div>
                            <div class="img"><img src="../assets/img/1.jpg"></div>
                            <div class="content">
                                <h2>拯救者-15ISK 游戏笔记本80RQ000B CD</h2>
                                <p>颜色分类：MT8165 64-bit处理器16G存储空间，支持128G扩展;套餐类型：官方标配</p>
                                <div class="tip">已优惠￥200.00</div>
                                <div class="money">￥5,699.00</div>
                            </div>
                        </li>
                        <li>
                            <div class="checkbox">
                                <input type="checkbox" name="item" id="checkbox2-2">
                                <label for="checkbox2-2"></label>
                            </div>
                            <div class="img"><img src="../assets/img/1.jpg"></div>
                            <div class="content">
                                <h2>拯救者-15ISK 游戏笔记本80RQ000B CD</h2>
                                <p>颜色分类：MT8165 64-bit处理器16G存储空间，支持128G扩展;套餐类型：官方标配</p>
                                <div class="tip">已优惠￥200.00</div>
                                <div class="money">￥5,699.00</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="total">
           <h3>
                <div class="checkbox">
                    <input type="checkbox" name="store" id="all">
                    <label for="all"></label>
                </div>
                <span>全选</span>
            </h3>
            <div class="num">合计：<span>￥0</span></div>
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
    }
}
</script>

<style scoped  lang="less">
@import '../assets/css/base.css';
@import '../assets/css/shoping.less';
</style>
