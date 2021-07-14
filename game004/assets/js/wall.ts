
const {ccclass, property} = cc._decorator;

@ccclass
export default class wall extends cc.Component {

    @property(cc.Node)
    wallLeft: cc.Node = null;

    @property(cc.Node)
    wallBottom: cc.Node = null;

    @property(cc.Node)
    wallRight: cc.Node = null;

    @property
    width: number = null;

    onLoad () {
        let width = cc.winSize.width/2-200;
        this.wallLeft.x = -width;
        this.wallRight.x = width;
        this.wallBottom.y = -cc.winSize.height/2-5+600;
        this.width = width - ( this.wallLeft.width/2);
    }

    start () {

    }

    // update (dt) {}
}
