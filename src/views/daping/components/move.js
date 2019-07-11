var move ={
    getStyle:(obj, name) =>
    {
        if(obj.currentStyle)
        {
            return obj.currentStyle[name];
        }
        else
        {
            return getComputedStyle(obj, false)[name];
        }
    },
    
    startMove: (obj, attr, iTarget, fnEnd) =>
    {
        clearInterval(obj.timer);
        obj.timer=setInterval(function (){
            var cur=0;
            
            if(attr=='opacity')
            {
                cur=Math.round(parseFloat(move.getStyle(obj, attr))*100);
            }
            else
            {
                cur=parseInt(move.getStyle(obj, attr));
            }
            
            var speed=(iTarget-cur)/6;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            
            if(cur==iTarget)
            {
                clearInterval(obj.timer);
                
                if(fnEnd)fnEnd();
            }
            else
            {
                if(attr=='opacity')
                {
                    obj.style.filter='alpha(opacity:'+(cur+speed)+')';
                    obj.style.opacity=(cur+speed)/100;
                }
                else
                {
                    obj.style[attr]=cur+speed+'px';
                }
            }
        }, 30);
    }    
}

export default move