
const { ccclass, property } = cc._decorator;

@ccclass
export default class block extends cc.Component {

    @property
    blockNumber: number = 0;

    @property
    returnNumber: boolean = false;  

    @property
    getNumberTime: number = 0;

    // 碰撞检测onBeginContact
    onBeginContact(contact, self, other) {
        if (other.node.group == "block") {
            //  只有下方的水果触发碰撞回调
            if (self.node.y < other.node.y) {
                return
            }
            if (self.node.getComponent(cc.RigidBody) != null) {
                self.node.getComponent(cc.RigidBody).angularVelocity = 0;
                // 限制一下线速度
            }
            let selfNum = this.blockNumber;
            let otherNum = other.node.getComponent("block").blockNumber;
            //  水果类型相同的合成
            if (selfNum == otherNum && selfNum < 9 && otherNum < 9) {
                if (self.node.getComponent("block").getNumber() == 0) {
                    other.node.getComponent(cc.PhysicsCircleCollider).radius = 0;
                    other.node.getComponent(cc.PhysicsCircleCollider).apply()
                    this.node.getComponent(cc.PhysicsCircleCollider).radius = 0;
                    this.node.getComponent(cc.PhysicsCircleCollider).apply();
                    cc.tween(other.node)
                        .to(0.1, { position: self.node.position })
                        .call(() => {
                            //生成下一个等级的水果
                            // GameManager.Instance.score += this.blockNumber + 1;
                            cc.find("Canvas/game").getComponent('game').createLevelUpBlock(this.blockNumber + 1, self.node.position);
                            other.node.active = false;
                            self.node.active = false;
                            other.node.destroy();
                            self.node.destroy();
                        })
                        .start()
                }
            } else if (selfNum == otherNum && selfNum == 9 && otherNum == 9) {
                if (self.node.getComponent("block").getNumber() == 0) {
                    other.node.getComponent(cc.PhysicsCircleCollider).radius = 0;
                    other.node.getComponent(cc.PhysicsCircleCollider).apply()
                    this.node.getComponent(cc.PhysicsCircleCollider).radius = 0;
                    this.node.getComponent(cc.PhysicsCircleCollider).apply();
                    cc.tween(other.node)
                        .to(0.1, { position: other.node.position })
                        .call(() => {
                            other.node.active = false;
                            self.node.active = false;
                            other.node.destroy();
                            self.node.destroy();
                        })
                        .start()

                }
            }
        }

    }

    //  防止多次碰撞    
    getNumber() {        
        let ad = this.getNumberTime;        
        this.getNumberTime++;       
        this.returnNumber = true;        
        return ad;    
    }    

    update(dt) {        
        if (this.returnNumber) {
            this.scheduleOnce(() => {
                this.getNumberTime = 0;
            }, 0.25)
            this.returnNumber = false;
        }  
    }   

    onLoad() {

    }
}
