var root = document.getElementsByTagName('html')[0],
NATIVE_W = 750;
function updateSize() {
  var w = window.innerWidth;
  var cw = w / (NATIVE_W / 100);
  root.style.fontSize = cw + 'px';
};
updateSize();


 export function setCookie(name,value,exdays){
    var d = new Date()
    d.setTime(d.getTime()+exdays*24*60*60*1000)//毫秒
    d.toUTCString()
    document.cookie = name +"=" +  value+";expires="+d
}

export function getCookie(name){
    var x = document.cookie.split(';')
    var cname = name + "="

    for(var i=0;i<x.length;i++){
        var c = x[i].trim()
        if(c.indexOf(cname)===0){
            return c.substring(cname.length,c.length)
        }
    }

}
export function getUrlValue(str,isEncodeUrl){
    var url = isEncodeUrl ? location.href : decodeURI(location.href);
    var len = str.length;
    if(url.indexOf(str + '=') == -1) {
        return '';
    } else{
        var val = url.slice(url.indexOf(str + '=') + len + 1);
        if(val.indexOf('&') == -1){
            if(val.indexOf('#') == -1){
                return val;
            }else{
                return val.slice(0,val.indexOf('#'));
            }
        }else{
            return val.slice(0,val.indexOf('&'));
        }
    }
}

