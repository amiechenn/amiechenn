cc.Class({
    extends: cc.Component,

    properties: {
        gameOverScore: cc.Node,
        gameOverScoreImgPrefab: cc.Prefab,
        numberAtlas: cc.SpriteAtlas,
    },

    // 结束分数图片
    gameOverScoreImg(num) {
        num = num.toString().split("");
        let len = this.gameOverScore.children.length;
        if(len<num.length){
            for(let i=0;i<(num.length-len);i++) {
                let node = cc.instantiate(this.gameOverScoreImgPrefab);
                node.parent = this.gameOverScore;
            }
        }
        let children = this.gameOverScore.children;
        for(let i=0;i<num.length;i++) {
            children[i].getComponent(cc.Sprite).spriteFrame = this.numberAtlas.getSpriteFrame(num[i].toString());
        }
    },

    // onLoad () {},

    start () {

    },
});
