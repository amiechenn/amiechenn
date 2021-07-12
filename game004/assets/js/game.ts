
const {ccclass, property} = cc._decorator;

@ccclass
export default class main extends cc.Component {
    @property(cc.Node)
    wall: cc.Node = null;

    @property(cc.Prefab)
    blockArr: Array<cc.Prefab> = [];

    @property(cc.Node)
    blockBox: cc.Node = null;

    @property(cc.Node)
    ctrlBlcok: cc.Node = null;

    @property
    index: number = 1;

    @property
    moveFlag: boolean = true;

    //  生产一个刚体球
    creatBlock() {
        let node = cc.instantiate(this.blockArr[this.index-1]);
        node.parent = this.blockBox;
        node.x = this.ctrlBlcok.x;
    }

    // show一个控制球
    showBlock() {
        this.index = Math.floor(Math.random()*3)+1;
        let children = this.ctrlBlcok.children;
        for(let i=0;i<children.length;i++) {
            if(children[i].name == String(this.index)){
                children[i].active = true;
            }else{
                children[i].active = false;
            }
        }
        this.ctrlBlcok.x = 0;
        this.ctrlBlcok.active = true;
    }

    // 转世界坐标
    changeLocation(event) {
        let pos = event.getLocation();
        return pos = this.node.convertToNodeSpaceAR(pos);
    }

    // 移动控制球
    moveCtrlBlock(pos) {
        let x = pos.x;
        let wallWidth = this.wall.getComponent('wall').width;
        let ctrlBlcokWidhtHaft = this.ctrlBlcok.width/2;
        if(x > (wallWidth - ctrlBlcokWidhtHaft)){
            this.ctrlBlcok.x = wallWidth - ctrlBlcokWidhtHaft;
        }else 
        if(x < (-wallWidth + ctrlBlcokWidhtHaft)){
            this.ctrlBlcok.x = -wallWidth + ctrlBlcokWidhtHaft;
        }else{
            this.ctrlBlcok.x = x;
        }
    }

    setTouch() {
        this.node.on('touchstart',(event) => {
            let pos = this.changeLocation(event);
            this.moveCtrlBlock(pos);
        })
        this.node.on('touchmove',(event) => {
            let pos = this.changeLocation(event);
            this.moveCtrlBlock(pos);
        })
        this.node.on('touchend',(event) => {
            let pos = this.changeLocation(event);
            this.moveCtrlBlock(pos);
            if(this.moveFlag) {
                this.moveFlag = false;
                this.ctrlBlcok.active = false;
                this.creatBlock();
                setTimeout(() => {
                    this.showBlock();
                    this.moveFlag = true;
                },500)
            }
        })
        this.node.on('touchcancel',(event) => {
            this.moveFlag = true;
        })
    }

    onLoad () {
        this.setTouch();
        cc.director.getPhysicsManager().enabled = true;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
    }

    start () {

    }

}
