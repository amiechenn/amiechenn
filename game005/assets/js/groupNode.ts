const {ccclass, property} = cc._decorator;
@ccclass
export default class groupNode extends cc.Component {

    @property
    type: number = 0;

    @property
    typeArr: Array<number> = [];

    // 初始位置
    @property
    pos: object = {};

}
