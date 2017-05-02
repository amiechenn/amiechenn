export function upLoad(obj,fun){
  let starty //开始的touch y坐标
  let once = true //控制滑动一次执行一次刷新效果
  obj.addEventListener('touchstart',(event)=>{
    let touch = event.targetTouches[0];
    starty = touch.pageY
  })
  obj.addEventListener('touchmove',(event)=>{
    let touch = event.targetTouches[0];
    let movey = touch.pageY-starty
    if(movey<0){//上拉
      return false
    }else{//下拉
      if(obj.getBoundingClientRect().top>=0){//元素到顶部，getBoundingClientRect元素相对浏览器距离
        obj.style.transform = `translateY(${movey}px)`;
        obj.addEventListener('touchend',(event)=>{
          obj.style.transform = `translate(0,0)`;
          once=true
        })
        if(movey>100 && once==true){
          once=false
          fun()
        }
      }
    }
  })
}

export function downLoad(obj,fun){
  let oncedown = true     
  let browserheight = document.documentElement.clientHeight//浏览器高度
  let scrollnum = document.body.scrollTop //屏幕上面以外的高度
  let contentheight = obj.offsetHeight//元素总高度
  if(scrollnum+browserheight>=contentheight && oncedown==true){
    oncedown = false
    fun()
    oncedown = true
  } 
  
}
