
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

    //   替换刚体球
    changeBlock(pos,index) {
        let node = cc.instantiate(this.blockArr[index-1]);
        node.parent = this.blockBox;
        pos = this.node.convertToNodeSpaceAR(pos);
        // node.x = pos.x;
        // node.y = pos.y;
        console.log('node',node)
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
    touchChangeLocation(event) {
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

    init() {
        this.node.on('touchstart',(event) => {
            let pos = this.touchChangeLocation(event);
            this.moveCtrlBlock(pos);
        })
        this.node.on('touchmove',(event) => {
            let pos = this.touchChangeLocation(event);
            this.moveCtrlBlock(pos);
        })
        this.node.on('touchend',(event) => {
            let pos = this.touchChangeLocation(event);
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
        //  监听碰撞后升级球
        this.node.on('change-block',  (event) => {
            // console.log('event',event)
            this.changeBlock(event.target.pos,event.target.index);
            event.stopPropagation();
        });
    }

    onLoad () {
        this.init();
        cc.director.getPhysicsManager().enabled = true;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
    }

    start () {

    }

}
