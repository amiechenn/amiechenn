
const {ccclass, property} = cc._decorator;

@ccclass
export default class block extends cc.Component {

    // 碰撞检测
    onCollisionEnter(other, self) {
        console.log('on collision enter');

        console.log('world.position',self.world,other);

        // 碰撞系统会计算出碰撞组件在世界坐标系下的相关的值，并放到 world 这个属性里面
        var world = self.world;

        // 碰撞组件的 aabb 碰撞框
        var aabb = world.aabb;

        // 节点碰撞前上一帧 aabb 碰撞框的位置
        var preAabb = world.preAabb;

        // 碰撞框的世界矩阵
        var t = world.transform;

        // 以下属性为圆形碰撞组件特有属性
        var r = world.radius;
        var p = world.position;
    }


    onLoad () {
        
    }
}