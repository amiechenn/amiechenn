
const {ccclass, property} = cc._decorator;

@ccclass
export default class game extends cc.Component {

    @property(cc.Node)
    wall: cc.Node = null;

    @property(cc.Prefab)
    cBlock: cc.Prefab = null;

    @property(cc.Prefab)
    block: cc.Prefab = null;

    @property(cc.Node)
    blockBox: cc.Node = null;

    @property(cc.Node)
    ctrlBlcok: cc.Node = null;

    @property
    indexNumber: number = 1;

    @property
    moveFlag: boolean = true;

    @property
    colorArr: Array<cc.Color> = [new cc.Color(50, 125, 243, 255),
        new cc.Color(50, 125, 243, 255),
        new cc.Color(110, 8, 159, 255),
        new cc.Color(218, 27, 19, 255),
        new cc.Color(243, 205, 28, 255),
        new cc.Color(254, 114, 29, 255),
        new cc.Color(234, 138, 155, 255),
        new cc.Color(128, 196, 119, 255),
        new cc.Color(113, 68, 12, 255),
        new cc.Color(48, 154, 0, 255),
    ];

    @property
    blockWidth: number = 40;

    @property
    addWidth: number = 20;


    //  生产一个刚体球
    creatBlock(pos,number) {
        let num = number || this.indexNumber;
        let node = cc.instantiate(this.block);
        node.color = this.colorArr[num];
        node.parent = this.blockBox;
        node.width = (num-1) * this.addWidth + this.blockWidth;
        node.height = node.width;
        node.getComponent(cc.PhysicsCircleCollider).radius = node.width/2;
        node.getComponent(cc.PhysicsCircleCollider).density = node.width*1000;
        node.getComponent(cc.PhysicsCircleCollider).apply();
        node.getComponent('block').blockNumber = num;
        if(pos) { // 升级球
            node.scale = 0;
            node.x = pos.x;
            node.y = pos.y;
            return node;
        }else{// 下落球
            node.x = this.ctrlBlcok.x;
        }
    }

    // show一个控制球
    showBlock() {
        this.indexNumber = Math.floor(Math.random()*4)+1;
        let children = this.ctrlBlcok.children;
        for(let i=0;i<children.length;i++) {
            if(children[i].name == String(this.indexNumber)){
                children[i].active = true;
            }else{
                children[i].active = false;
            }
        }
        this.ctrlBlcok.x = 0;
        this.ctrlBlcok.scale = 0;
        this.ctrlBlcok.active = true;
        cc.tween(this.ctrlBlcok)
        .to(0.5, { scale: 1 }, { easing: 'backOut' })
        .call(() => {})
        .start()
    }
    
    // 生成所有可能掉落的球的样式
    createrCtrlBlockChildren() {
        for(let i=0;i<4;i++) {
            let node = cc.instantiate(this.cBlock);
            node.color = this.colorArr[i+1];
            node.parent = this.ctrlBlcok;
            node.width = i * this.addWidth + this.blockWidth;
            node.height = node.width;
            node.active = false;
            node.name = String(i+1);
            if(i == 0) {
                node.active = true;
            }
        }
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

    // 升级球
    createLevelUpBlock(indexNumber, pos) {
        let node = this.creatBlock(pos,indexNumber);
        node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, -100);
        node.getComponent(cc.PhysicsCircleCollider).radius = node.height / 2;
        node.getComponent(cc.PhysicsCircleCollider).apply();
        cc.tween(node)
            .to(0.5, { scale: 1 }, { easing: 'backOut' })
            .call(() => {
                if (node.getComponent(cc.PhysicsCircleCollider) != null) {
                    node.getComponent(cc.PhysicsCircleCollider).radius = node.height / 2;
                    // node.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic;
                    node.getComponent(cc.PhysicsCircleCollider).apply();
                }

            })
            .start()

        // GameManager.Instance.fruitHeigth = GameManager.Instance.findHighestFruit();

    }


    init() {
        this.createrCtrlBlockChildren();
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
    }

    onLoad () {
    //     if (GameManager.Instance != null) { 
    //         GameManager.Instance.destroy();
    //    }        
    //    GameManager.Instance = this; 
        this.init();
        cc.director.getPhysicsManager().enabled = true;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
    }

    start () {

    }

}
