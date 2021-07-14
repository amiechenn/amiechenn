
const {ccclass, property} = cc._decorator;

@ccclass
export default class bgBlock extends cc.Component {

    @property
    col: number = 0;

    @property
    row: number = 0;

    @property
    active: number = 1;

    @property
    isBlock: boolean = false;



    // onLoad () {}

    start () {

    }

}
