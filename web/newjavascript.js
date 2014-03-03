var EKTweener={
    targetTweens:[],
    frameRate:60,
    to:function(a,c,b,d){
        if(a.tweenId==undefined){
            a.tweenId=EKTweener.targetTweens.length;
            EKTweener.targetTweens[a.tweenId]=[]
        }
        c=new EKTween(a,c,b,d);
        EKTweener.targetTweens[a.tweenId].push(c);
        return c
    },
    killTweensOf:function(a){
        if(a=EKTweener.targetTweens[a.tweenId]){
            for(;a[0];){
                a[0].removeProperties();
                a[0].kill();
                delete a[0]
            }
            a.splice(0,a.length)
        }
    }
};
function EKTween(a,c,b,d){
    var e=this,g=0;
    a=a;
    var k=false;
    this.isFinished=false;
    this.ease=EKTweenFunc.easeOutCirc;
    this.onCompleteParams=this.onComplete=this.onUpdateParams=this.onUpdate=this.onStartParams=this.onStart=undefined;
    this.properties={};
    
    this.prefix={};
    
    this.suffix={};
    
    for(var h in d)switch(h){
        case "prefix":case "suffix":case "ease":case "onStart":case "onStartParams":case "onUpdate":case "onUpdateParams":case "onComplete":case "onCompleteParams":
            this[h]=d[h];
            break;
        default:
            e.properties[h]=[];
            e.properties[h][0]=d[h]
    }
    if(this.tweens=EKTweener.targetTweens[a.tweenId])if(this.tweens.length!=0)for(h=this.tweens.length;h--;)if(this.tweens[h].removeProperties(e.properties)==0){
        this.tweens[h].kill();
        this.tweens.splice(h,1)
    }
    var f=b*1E3/EKTweener.frameRate,n=c*1E3/EKTweener.frameRate,l=function(){
        if(e.onUpdate)e.onUpdateParams?e.onUpdate.apply(e.itself,e.onUpdateParams):e.onUpdate()
    },m=function(){
        if(!e.isFinished){
            if(!e.isPaused){
                if(g>=f)if(e.isStarted)if(g>=n+f){
                    for(var r in e.properties)u(e.properties[r][0],
                        r,e.properties[r]);l();
                    if(e.onComplete)e.onCompleteParams?e.onComplete.apply(e,e.onCompleteParams):e.onComplete();
                    e.kill();
                    for(r=e.tweens.length;r--;)e.tweens[r]&&e.tweens[r].isFinished&&e.tweens.splice(r,1);
                    return
                }else{
                    for(r in e.properties)s(r,e.properties[r]);l()
                }else{
                    for(r in e.properties)o(r,e.properties[r]);if(e.onStart)e.onStartParams?e.onStart.apply(e,e.onStartParams):e.onStart();
                    e.isStarted=true
                }
                g++
            }
            setTimeout(m,1E3/EKTweener.frameRate)
        }
    },o=function(r,t){
        if(e.prefix)if(e.prefix[r])t[2]=e.prefix[r];
        if(e.suffix)if(e.suffix[r])t[3]=e.suffix[r];
        t[1]=parseFloat(a[r])
    },s=function(r,t){
        u(e.ease(g-f,t[1],t[0]-t[1],n),r,t)
    },u=function(r,t,v){
        a[t]=v[2]||v[3]?(v[2]?v[2]:"")+r+(v[3]?v[3]:""):r
    };
    
    m();
    this.kill=function(){
        e.isFinished=true
    };
    
    this.pause=function(){
        k=true
    };
    
    this.resume=function(){
        if(k)k=false
    };
        
    this.removeProperties=function(r){
        var t;
        if(r){
            var v=0;
            for(t in e.properties)if(t in r)delete e.properties[t];else v++;return v
        }else for(t in e.properties)delete e.properties[t]
    };
        
    this.changeFrom=function(r,
        t){
        if(e.properties[r])e.properties[r][1]=t
    };
        
    this.changeTo=function(r,t){
        if(e.properties[r])e.properties[r][0]=t
    }
}
var EKTweenFunc={
    linear:function(a,c,b,d){
        return b*a/d+c
    },
    easeInQuad:function(a,c,b,d){
        return b*(a/=d)*a+c
    },
    easeOutQuad:function(a,c,b,d){
        return-b*(a/=d)*(a-2)+c
    },
    easeInOutQuad:function(a,c,b,d){
        if((a/=d/2)<1)return b/2*a*a+c;
        return-b/2*(--a*(a-2)-1)+c
    },
    easeInCubic:function(a,c,b,d){
        return b*(a/=d)*a*a+c
    },
    easeOutCubic:function(a,c,b,d){
        return b*((a=a/d-1)*a*a+1)+c
    },
    easeInOutCubic:function(a,c,b,d){
        if((a/=d/2)<1)return b/2*a*a*a+c;
        return b/2*((a-=2)*a*a+2)+c
    },
    easeOutInCubic:function(a,c,b,d){
        if(a<
            d/2)return EKTweenFunc.easeOutCubic(a*2,c,b/2,d);
        return EKTweenFunc.easeInCubic(a*2-d,c+b/2,b/2,d)
    },
    easeInQuart:function(a,c,b,d){
        return b*(a/=d)*a*a*a+c
    },
    easeOutQuart:function(a,c,b,d){
        return-b*((a=a/d-1)*a*a*a-1)+c
    },
    easeInOutQuart:function(a,c,b,d){
        if((a/=d/2)<1)return b/2*a*a*a*a+c;
        return-b/2*((a-=2)*a*a*a-2)+c
    },
    easeOutInQuart:function(a,c,b,d){
        if(a<d/2)return EKTweenFunc.easeOutQuart(a*2,c,b/2,d);
        return EKTweenFunc.easeInQuart(a*2-d,c+b/2,b/2,d)
    },
    easeInQuint:function(a,c,b,d){
        return b*(a/=d)*
        a*a*a*a+c
    },
    easeOutQuint:function(a,c,b,d){
        return b*((a=a/d-1)*a*a*a*a+1)+c
    },
    easeInOutQuint:function(a,c,b,d){
        if((a/=d/2)<1)return b/2*a*a*a*a*a+c;
        return b/2*((a-=2)*a*a*a*a+2)+c
    },
    easeOutInQuint:function(a,c,b,d){
        if(a<d/2)return EKTweenFunc.easeOutQuint(a*2,c,b/2,d);
        return EKTweenFunc.easeInQuint(a*2-d,c+b/2,b/2,d)
    },
    easeInSine:function(a,c,b,d){
        return-b*Math.cos(a/d*(Math.PI/2))+b+c
    },
    easeOutSine:function(a,c,b,d){
        return b*Math.sin(a/d*(Math.PI/2))+c
    },
    easeInOutSine:function(a,c,b,d){
        return-b/2*(Math.cos(Math.PI*
            a/d)-1)+c
    },
    easeOutInSine:function(a,c,b,d){
        if(a<d/2)return EKTweenFunc.easeOutSine(a*2,c,b/2,d);
        return EKTweenFunc.easeInSine(a*2-d,c+b/2,b/2,d)
    },
    easeInExpo:function(a,c,b,d){
        return a==0?c:b*Math.pow(2,10*(a/d-1))+c-b*0.001
    },
    easeOutExpo:function(a,c,b,d){
        return a==d?c+b:b*1.001*(-Math.pow(2,-10*a/d)+1)+c
    },
    easeInOutExpo:function(a,c,b,d){
        if(a==0)return c;
        if(a==d)return c+b;
        if((a/=d/2)<1)return b/2*Math.pow(2,10*(a-1))+c-b*5.0E-4;
        return b/2*1.0005*(-Math.pow(2,-10*--a)+2)+c
    },
    easeOutInExpo:function(a,
        c,b,d){
        if(a<d/2)return EKTweenFunc.easeOutExpo(a*2,c,b/2,d);
        return EKTweenFunc.easeInExpo(a*2-d,c+b/2,b/2,d)
    },
    easeInCirc:function(a,c,b,d){
        return-b*(Math.sqrt(1-(a/=d)*a)-1)+c
    },
    easeOutCirc:function(a,c,b,d){
        return b*Math.sqrt(1-(a=a/d-1)*a)+c
    },
    easeInOutCirc:function(a,c,b,d){
        if((a/=d/2)<1)return-b/2*(Math.sqrt(1-a*a)-1)+c;
        return b/2*(Math.sqrt(1-(a-=2)*a)+1)+c
    },
    easeOutInCirc:function(a,c,b,d){
        if(a<d/2)return EKTweenFunc.easeOutCirc(a*2,c,b/2,d);
        return EKTweenFunc.easeInCirc(a*2-d,c+b/2,b/2,d)
    },
    easeInElastic:function(a,
        c,b,d,e,g){
        if(a==0)return c;
        if((a/=d)==1)return c+b;
        g||(g=d*0.3);
        if(!e||e<Math.abs(b)){
            e=b;
            b=g/4
        }else b=g/(2*Math.PI)*Math.asin(b/e);
        return-(e*Math.pow(2,10*(a-=1))*Math.sin((a*d-b)*2*Math.PI/g))+c
    },
    easeOutElastic:function(a,c,b,d,e,g){
        var k;
        if(a==0)return c;
        if((a/=d)==1)return c+b;
        g||(g=d*0.3);
        if(!e||e<Math.abs(b)){
            e=b;
            k=g/4
        }else k=g/(2*Math.PI)*Math.asin(b/e);
        return e*Math.pow(2,-10*a)*Math.sin((a*d-k)*2*Math.PI/g)+b+c
    },
    easeInOutElastic:function(a,c,b,d,e,g){
        var k;
        if(a==0)return c;
        if((a/=d/2)==
            2)return c+b;
        g||(g=d*0.3*1.5);
        if(!e||e<Math.abs(b)){
            e=b;
            k=g/4
        }else k=g/(2*Math.PI)*Math.asin(b/e);
        if(a<1)return-0.5*e*Math.pow(2,10*(a-=1))*Math.sin((a*d-k)*2*Math.PI/g)+c;
        return e*Math.pow(2,-10*(a-=1))*Math.sin((a*d-k)*2*Math.PI/g)*0.5+b+c
    },
    easeOutInElastic:function(a,c,b,d,e,g){
        if(a<d/2)return EKTweenFunc.easeOutElastic(a*2,c,b/2,d,e,g);
        return EKTweenFunc.easeInElastic(a*2-d,c+b/2,b/2,d,e,g)
    },
    easeInBack:function(a,c,b,d,e){
        if(e==undefined)e=1.70158;
        return b*(a/=d)*a*((e+1)*a-e)+c
    },
    easeOutBack:function(a,
        c,b,d,e){
        if(e==undefined)e=1.70158;
        return b*((a=a/d-1)*a*((e+1)*a+e)+1)+c
    },
    easeInOutBack:function(a,c,b,d,e){
        if(e==undefined)e=1.70158;
        if((a/=d/2)<1)return b/2*a*a*(((e*=1.525)+1)*a-e)+c;
        return b/2*((a-=2)*a*(((e*=1.525)+1)*a+e)+2)+c
    },
    easeOutInBack:function(a,c,b,d,e){
        if(a<d/2)return EKTweenFunc.easeOutBack(a*2,c,b/2,d,e);
        return EKTweenFunc.easeInBack(a*2-d,c+b/2,b/2,d,e)
    },
    easeInBounce:function(a,c,b,d){
        return b-EKTweenFunc.easeOutBounce(d-a,0,b,d)+c
    },
    easeOutBounce:function(a,c,b,d){
        return(a/=d)<
        1/2.75?b*7.5625*a*a+c:a<2/2.75?b*(7.5625*(a-=1.5/2.75)*a+0.75)+c:a<2.5/2.75?b*(7.5625*(a-=2.25/2.75)*a+0.9375)+c:b*(7.5625*(a-=2.625/2.75)*a+0.984375)+c
    },
    easeInOutBounce:function(a,c,b,d){
        return a<d/2?EKTweenFunc.easeInBounce(a*2,0,b,d)*0.5+c:EKTweenFunc.easeOutBounce(a*2-d,0,b,d)*0.5+b*0.5+c
    },
    easeOutInBounce:function(a,c,b,d){
        if(a<d/2)return EKTweenFunc.easeOutBounce(a*2,c,b/2,d);
        return EKTweenFunc.easeInBounce(a*2-d,c+b/2,b/2,d)
    }
};

var StageReference=new (function(){
    var a=[],c=[],b=[],d={},e=false,g=0,k=0,h=0,f=false,n=-1,l={};
    
    this.stage={};
    
    this.frameRate=60;
    this.mouseYCenterRatio=this.mouseXCenterRatio=this.stageHeight=this.stageWidth=0;
    this.isRendering=false;
    this.quality=2;
    this.isOther=this.isMa=this.isCh=this.isNN=this.isOp=this.isSa=this.isFF=this.isIE=false;
    this.browserPrefix="";
    this.init=function(m,o,s){
        StageReference.stage=m;
        this.frameRate=o;
        if(e=s){
            l=DisplayObjectUtil.create("div");
            l.style.fontFamily="Arial";
            l.style.fontSize=
            "9px";
            l.style.color="#CCC";
            l.style.backgroundColor="#333";
            l.style.width="64px";
            l.style.height="24px";
            l.style.padding="3px";
            l.style.display="none";
            try{
                if(typeof performance.memory.totalJSHeapSize!="undefined")f=true
            }catch(u){}
            document.body.appendChild(l)
        }
        m=navigator.userAgent.toLowerCase();
        StageReference.isIE=m.indexOf("msie")!=-1;
        StageReference.isFF=m.indexOf("firefox")!=-1;
        StageReference.isSa=m.indexOf("safari")!=-1;
        StageReference.isOp=m.indexOf("opera")!=-1;
        StageReference.isNN=m.indexOf("netscape")!=
        -1;
        StageReference.isCh=m.indexOf("chrome")!=-1;
        StageReference.isMa=StageReference.isIE;
        StageReference.isOther=!StageReference.isIE&&!StageReference.isFF&&!StageReference.isSa&&!StageReference.isOp&&!StageReference.isNN&&!StageReference.isSa;
        StageReference.browserPrefix=StageReference.isIE?"-ms-":StageReference.isFF?"-moz-":StageReference.isOp?"-o-":"-webkit-";
        window.onresize=StageReference.onResize
    };
        
    this.registerStageResizeFunc=function(m){
        found=false;
        for(var o=0;o<a.length;o++)if(a[o]==m){
            found=
            true;
            return
        }
        found||a.push(m)
    };
        
    this.deregisterStageResizeFunc=function(m){
        found=false;
        for(var o=0;o<a.length;o++)if(a[o]==m){
            found=true;
            break
        }
        found&&a.splice(o,1)
    };
        
    this.onResize=function(){
        StageReference.stageWidth=window.innerWidth;
        StageReference.stageHeight=window.innerHeight;
        for(var m=0;m<a.length;++m)a[m]()
    };
            
    this.addLayer=function(m){
        if(!b[m]){
            var o=DisplayObjectUtil.create("div");
            StageReference.stage.appendChild(o);
            b[m]=o
        }
    };
    
    this.getLayer=function(m){
        return b[m]
    };
    
    this.startRender=function(){
        if(!StageReference.isRendering){
            if(e){
                k=
                0;
                h=(new Date).getTime();
                l.style.display=""
            }
            StageReference.isRendering=true;
            d=setInterval(StageReference.render,1E3/StageReference.frameRate)
        }
    };

    this.stopRender=function(){
        if(StageReference.isRendering){
            if(e)l.style.display="none";
            StageReference.isRendering=false;
            clearInterval(d)
        }
    };

    this.registerRenderFunc=function(m){
        found=false;
        for(var o=0;o<c.length;o++)if(c[o]==m){
            found=true;
            return
        }
        found||c.push(m)
    };
    
    this.deregisterRenderFunc=function(m){
        found=false;
        for(var o=0;o<c.length;o++)if(c[o]==m){
            found=true;
            break
        }
        found&&c.splice(o,1)
    };
    
    this.render=function(){
        for(var m=0;m<c.length;++m)c[m]();
        if(e){
            k++;
            g=(new Date).getTime();
            if(g>h+1E3){
                if(f)n=performance.memory.usedJSHeapSize*9.5367E-7;
                l.innerHTML="FPS: "+k+"<br/>MEM: "+Math.round(n)+"MB";
                k=0;
                h=g
            }
        }
    };

    this.getOuterFitScreenRatio=function(m,o){
        if(StageReference.stageWidth/m>StageReference.stageHeight/o)return StageReference.stageWidth/m;
        return StageReference.stageHeight/o
    };
    
    this.getInnerFitScreenRatio=function(m,o){
        if(StageReference.stageWidth/m<StageReference.stageHeight/
            o)return StageReference.stageWidth/m;
        return StageReference.stageHeight/o
    };
    
    this.calculateMouseXYCenterRatio=function(m,o){
        this.mouseXCenterRatio=2*m/this.stageWidth-1;
        this.mouseXCenterRatio=this.mouseXCenterRatio>1?1:this.mouseXCenterRatio<-1?-1:this.mouseXCenterRatio;
        this.mouseYCenterRatio=2*o/this.stageHeight-1;
        this.mouseYCenterRatio=this.mouseYCenterRatio>1?1:this.mouseYCenterRatio<-1?-1:this.mouseYCenterRatio
    }
});
function CanvasMovieClip(a){
    var c=[],b=false,d=1;
    this.currentFrame=this.totalFrames=0;
    this.ctx=a;
    this.y=this.x=0;
    this.scaleY=this.scaleX=1;
    this.addFrame=function(e,g,k){
        c.push([e,,g,k]);
        _amount++
    };
    
    this.draw=function(){
        var e=c[this.currentFrame];
        this.ctx.drawImage(e[0],this.x+e[1]*this.scaleX,this.y+e[2]*this.scaleY,e[0].width*this.scaleX,e[0].height*this.height);
        this.update()
    };
        
    this.update=function(){
        if(b){
            this.currentFrame+=d;
            if(this.currentFrame<0)this.currentFrame=this.totalFrames-1;
            if(this.currentFrame>=
                this.totalFrames)this.currentFrame=0
        }
    };
    
    this.play=function(e){
        b=false;
        d=e==null?1:-1
    };
    
    this.stop=function(e){
        b=true
    };
    
    this.gotoAndStop=function(e){
        b=true;
        this.currentFrame=e
    };
    
    this.gotoAndPlay=function(e){
        b=false;
        this.currentFrame=e
    }
};

var EKLoader=new (function(){
    var a=["jpg","png","apng","tiff","svg","jpeg","pnga","gif"],c=["txt","htm","html","xml"],b=["mp3","ogg"],d=["js"],e=["audio/mpeg","audio/ogg"],g=[["mp4","mpeg","mpg"],["ogv","oga"],["dvx","divx","xdiv"]],k=["video/mp4","video/ogg","video/divx"];
    this.TYPE_IMAGE="IMAGE";
    this.TYPE_TEXT="TEXT";
    this.TYPE_JSON="JSON";
    this.TYPE_JS="JS";
    this.TYPE_AUDIO="AUDIO";
    this.TYPE_VIDEO="VIDEO";
    var h=[],f={},n=null,l=null;
    this.weightSum=0;
    var m=function(j,x){
        for(var q=0;q<j.length;q++)if(j[q]===
            x)return true;return false
    };
        
    this.resetListeners=function(j,x){
        for(var q=[];h[0];){
            if(h[0].started)h[0].isKilled=true;else q.unshift(h[0]);
            h.shift()
        }
        h=q;
        this.weightSum=0;
        n=j;
        l=x
    };
        
    this.get=function(j){
        return f[j]
    };
        
    this.getSource=function(j){
        return f[j].source
    };
        
    this.singleLoad=function(j,x,q,w,A){
        j=o(j,x,q,w,A,1);
        j.standalone=true;
        s(j);
        return j
    };
        
    this.add=function(j,x,q,w,A,I){
        I=I||1;
        this.weightSum+=I;
        h[h.length]=f[j]=o(j,x,q,w,A,I);
        return true
    };
        
    var o=function(j,x,q,w,A,I){
        if(!q){
            w=j.split(".").pop().toLowerCase();
            q=m(a,w)?EKLoader.TYPE_IMAGE:m(c,w)?EKLoader.TYPE_TEXT:m(d,w)?EKLoader.TYPE_JS:undefined;
            var L="";
            if(!q){
                for(var J=b.length;J--;)if(w==b[J]){
                    q=EKLoader.TYPE_AUDIO;
                    L=e[J];
                    break
                }
                if(!q)for(var M=g.length;M--;){
                    for(J=g[M].length;J--;)if(g[M][J]==w){
                        q=EKLoader.TYPE_VIDEO;
                        L=k[M];
                        break
                    }
                    if(q)break
                }
                if(!q)throw"File type not found.";
            }
        }
        if(f[j])if(q==EKLoader.TYPE_IMAGE){
            if(f[j].loaded){
                f[j].source=new Image;
                f[j].source.src=j;
                x&&x(f[j])
            }
        }else throw"File already exists.";
        j=new EKLoaderItem(j,x,q,A,I);
        if(L!="")j.mime=
            j.mime=L;
        return j
    };

    this.start=function(){
        for(var j=h.length,x=0;x<j;x++)s(h[x])
    };
        
    var s=function(j){
        if(!j.started){
            j.started=true;
            switch(j.type){
                case EKLoader.TYPE_IMAGE:
                    u(j);
                    break;
                case EKLoader.TYPE_TEXT:case EKLoader.TYPE_JSON:
                    r(j);
                    break;
                case EKLoader.TYPE_JS:
                    t(j);
                    break;
                case EKLoader.TYPE_AUDIO:
                    v(j);
                    break;
                case EKLoader.TYPE_VIDEO:
                    z(j);
                    break
            }
        }
    },u=function(j){
        j.source=new Image;
        j.source.onload=function(){
            j.source.onload=null;
            E(j)
        };
        
        j.source.src=j.url
    },r=function(j){
        function x(){
            if(q.readyState==4)if(q.status==
                200){
                j.source=w?typeof JSON!="undefined"?JSON.parse(q.responseText.toString()):eval(q.responseText.toString()):q.responseText;
                E(j)
            }
        }
        var q,w=j.type==EKLoader.TYPE_JSON;
        if(window.XMLHttpRequest){
            q=new XMLHttpRequest;
            q.onreadystatechange=x;
            q.open("GET",j.url,true);
            q.send(null)
        }else if(window.ActiveXObject)if(q=new ActiveXObject("Microsoft.XMLHTTP")){
            q.onreadystatechange=x;
            q.open("GET",j.url,true);
            q.send()
        }
    },t=function(j){
        j.source=document.createElement("script");
        j.source.type="text/javascript";
        if(j.source.readyState)j.source.onreadystatechange=
            function(){
                if(j.source.readyState=="loaded"||j.source.readyState=="complete"){
                    j.source.onreadystatechange=null;
                    E(j)
                }
            };else j.source.onload=function(){
            E(j)
        };
    
        j.source.src=j.url;
        document.getElementsByTagName("head")[0].appendChild(j.source)
    },v=function(j){
        try{
            j.source=new Audio
        }catch(x){
            j.source=document.createElement("audio")
        }
        j.source.progress=j.onLoadingListenerFunc=function(){
            p(j)
        };
        
        j.source.canplaythrough=j.source.load=j.onLoadedListenerFunc=function(){
            C(j)
        };
        
        j.source.src=j.url;
        j.source.load()
    },z=
    function(j){
        try{
            j.source=new Video
        }catch(x){
            j.source=document.createElement("video")
        }
        j.source.progress=j.onLoadingListenerFunc=function(){
            p(j)
        };
        
        j.source.canplaythrough=j.source.load=j.onLoadedListenerFunc=function(){
            C(j)
        };
        
        j.source.src=j.url;
        j.source.load()
    },p=function(j){
        if(!j.isKilled)if(j.source.buffered!=undefined)if(j.source.buffered.length>0){
            j.percentage=j.source.buffered.end(0)/j.source.duration;
            n&&n(EKLoader.getPercentage())
        }
    },C=function(j){
        j.source.canplaythrough=j.source.load=j.source.progress=
        null;
        E(j)
    },E=function(j){
        j.loaded=true;
        switch(j.type){
            case EKLoader.TYPE_IMAGE:
                break;
            case EKLoader.TYPE_TEXT:
                break;
            case EKLoader.TYPE_JS:
                break;
            case EKLoader.TYPE_AUDIO:
                break;
            case EKLoader.TYPE_VIDEO:
                break
        }
        j.percentage=1;
        if(!j.isKilled){
            n&&n(EKLoader.getPercentage());
            j.onLoadedFunc&&j.onLoadedFunc(j);
            if(!j.standalone)if(EKLoader.getPercentage()==1){
                n=null;
                if(l){
                    l();
                    l=null
                }
            }
        }
    };

    this.getPercentage=function(){
        for(var j=0,x=h.length,q=0;q<x;q++)j+=h[q].percentage*h[q].weight;
        return j/EKLoader.weightSum
    };
    this.setOnLoad=function(j){
        E(j)
    }
});
function EKLoaderItem(a,c,b,d,e){
    this.isKilled=false;
    this.url=a;
    this.type=b;
    this.onLoadedFunc=c;
    this.loaded=this.started=false;
    this.source={};
    
    this.data=d;
    this.percentage=0;
    this.onLoadingListenerFunc=this.onLoadedListenerFunc=null;
    this.weight=e;
    this.standalone=false
};
    
var DisplayObjectUtil=new (function(){
    this.setParent=function(a,c){
        if(!a.parentNode||a.parentNode&&a.parentNode!=c)if(c)a.parent=c
    };
            
    this.addTo=function(a,c){
        if(!a.parentNode||a.parentNode&&a.parentNode!=c){
            if(c)a.parent=c;
            a.parent.appendChild(a)
        }
    };
    
    this.removeItself=function(a){
        a.parentNode&&a.parentNode.removeChild(a)
    };
    
    this.create=function(a){
        a=document.createElement(a);
        a.style.margin="0px auto";
        a.style.position="absolute";
        return a
    };
    
    this.defaultMouseText="this.style.cursor = 'default'; return false;"
});
var CanvasUtil=new (function(){
    var a={},c={};
    
    this.init=function(){
        a=DisplayObjectUtil.create("canvas");
        c=canvas.getContext("2d")
    };
        
    this.createCache=function(b,d,e,g,k){
        var h=DisplayObjectUtil.create("canvas"),f=h.getContext("2d");
        h.setAttribute("width",g);
        h.setAttribute("height",k);
        f.drawImage(b,d,e,g,k,0,0,g,k);
        return h
    };
        
    this.createBlurCaches=function(b,d,e,g,k,h){
        d=[];
        b=b;
        for(var f,n=0;n<h;n++){
            e=DisplayObjectUtil.create("canvas");
            f=e.getContext("2d");
            e.setAttribute("width",g+(n+1)*2);
            e.setAttribute("height",
                k+(n+1)*2);
            f.drawImage(b,0,0,g+(n+1)*2,k+(n+1)*2);
            d.push(e);
            b=cnavas
        }
        return d
    };
        
    this.tintCanvasCtx=function(b,d,e,g,k,h,f,n){
        f=b.getImageData(k,h,f,n);
        n=f.data;
        for(var l=n.length-1;l>0;){
            if(n[l]>0){
                n[l-3]=d;
                n[l-2]=e;
                n[l-1]=g
            }
            l-=4
        }
        b.putImageData(f,k,h)
    }
});
var MathUtil=new (function(){
    this.RAD_TO_DEGREE=57.29577951308232;
    this.DEGREE_TO_RAD=0.017453292519943295;
    this.getAngleDifference=function(a,c){
        for(a=c-a;a<-180;)a+=360;
        for(;a>180;)a-=360;
        return a
    };
        
    this.getXYLength=function(a,c){
        return Math.sqrt(a*a+c*c)
    };
        
    this.getXYZLength=function(a,c,b){
        return Math.sqrt(a*a+c*c+b*b)
    }
});
var BrowserUtil=new (function(){
    var a=(this.isSupportCanvas=!!document.createElement("canvas").getContext)?document.createElement("canvas").getContext("2d"):null;
    this.isSupportCanvasText=a==null?false:typeof a.fillText=="function"?true:false;
    this.isSupportVideo=!!document.createElement("video").canPlayType;
    this.isSupportAudio=!!document.createElement("audio").canPlayType
});
var Main=new (function(){
    var a=function(){},c=function(){};
    
    this.init=function(){
        var b=false,d=navigator.userAgent.toString().toLowerCase().split("firefox/");
        if(d.length>1)if(parseInt(d[1][0])<4)b=true;
        if(BrowserUtil.isSupportAudio&&BrowserUtil.isSupportCanvasText&&!b){
            document.documentElement.style.overflowX="hidden";
            document.documentElement.style.overflowY="hidden";
            StageReference.init(document.getElementById("stage"),60,false);
            StageReference.onResize();
            StageReference.addLayer("scene2D");
            StageReference.addLayer("scene2DOverlay");
            StageReference.addLayer("section");
            StageReference.addLayer("top");
            StageReference.addLayer("mouseBlocker");
            StageReference.addLayer("info");
            StageReference.registerStageResizeFunc(a);
            MouseBlocker.init();
            SectionManager.init();
            Line.init();
            TopBar.init();
            BottomBar.init();
            BlackOverlay.init();
            SubtitleManager.init();
            Instruction.init();
            HighestScores.init();
            Preloader.init();
            Panel.init();
            EnterName.init();
            YourScore.init();
            SectionManager.show(Instruction);
            AssetManager.preload();
            StageReference.onResize();
            window.addEventListener("blur",
                c,false)
        }else{
            document.getElementById("stage").style.display="none";
            document.getElementById("nohtml5").style.display="inline"
        }
    }
});
var AssetManager=new (function(){
    this.preload=function(){
        var c=".svg",b=navigator.userAgent.toString().toLowerCase().split("firefox/");
        if(b.length>1)if(parseInt(b[1][0])<4)c=".png";
        EKLoader.resetListeners(Preloader.setPercentage,a);
        TimeScale.loadAssets("images/");
        MusicManager.load("images/","audios/","audios/");
        WhatIsThis.loadAssets("images/");
        BackgroundManager.loadImages("images/",c);
        BakedImageManager.loadAssets("images/");
        FloatImageManager.loadAssets("images/",c);
        EKLoader.start()
    };
        
    var a=function(){
        TimeScale.init();
        MusicManager.init()
    }
});
var MouseBlocker=new (function(){
    var a={},c=function(){
        a.style.width=StageReference.stageWidth+"px";
        a.style.height=StageReference.stageHeight+"px"
    };
        
    this.init=function(){
        a=document.getElementById("mouseBlocker");
        DisplayObjectUtil.addTo(a,StageReference.getLayer("mouseBlocker"));
        a.addEventListener("mouseover",function(){},false);
        StageReference.registerStageResizeFunc(c)
    };
        
    this.show=function(){
        a.style.display="inline"
    };
        
    this.hide=function(){
        a.style.display="none"
    }
});
var BottomBar=new (function(){
    var a;
    this.container={};
    
    this.HEIGHT=60;
    var c=function(){
        a.style.width=StageReference.stageWidth+"px";
        a.style.top=StageReference.stageHeight-BottomBar.HEIGHT+"px"
    };
        
    this.init=function(){
        a=document.getElementById("bottom");
        DisplayObjectUtil.removeItself(a);
        DisplayObjectUtil.addTo(a,StageReference.getLayer("top"));
        DisplayObjectUtil.removeItself(a);
        DisplayObjectUtil.addTo(a,StageReference.getLayer("top"));
        StageReference.registerStageResizeFunc(c);
        this.container=a
    };
        
    this.show=
    function(){
        a.style.display="inline";
        a.style.margin=this.HEIGHT+"px 0px";
        EKTweener.to(a.style,1,0,{
            margin:0,
            suffix:{
                margin:"px 0px"
            }
        })
    }
});
var Preloader=new (function(){
    var a={};
    
    this.container={};
    
    this.percentage=0;
    var c=false;
    this.isAnimated=false;
    this.playTextOpacity=1;
    this.mouseOverAngle=this.innerRadius=this.outerRadius=0;
    this.init=function(){
        a=DisplayObjectUtil.create("div");
        DisplayObjectUtil.addTo(a,SectionManager.container);
        this.container=a;
        _canvas=DisplayObjectUtil.create("canvas");
        _canvas.setAttribute("width",150);
        _canvas.setAttribute("height",150);
        _ctx=_canvas.getContext("2d");
        DisplayObjectUtil.addTo(_canvas,a);
        this.show()
    };
    this.show=function(){
        Preloader.mouseOverAngle=0;
        a.style.display="inline";
        EKTweener.to(Preloader,2,0,{
            outerRadius:55,
            ease:EKTweenFunc.easeOutBack
        });
        EKTweener.to(Preloader,2.5,0,{
            innerRadius:45,
            onUpdate:b,
            ease:EKTweenFunc.easeOutBack
        });
        c&&EKTweener.to(Preloader,2,0,{
            playTextOpacity:1
        })
    };
        
    this.hide=function(){
        EKTweener.to(Preloader,2,0,{
            outerRadius:0,
            ease:EKTweenFunc.easeInBack
        });
        EKTweener.to(Preloader,2.5,0,{
            innerRadius:0,
            onUpdate:b,
            ease:EKTweenFunc.easeInBack,
            onComplete:function(){
                a.style.display="none"
            }
        });
        c&&EKTweener.to(Preloader,2,0,{
            playTextOpacity:0
        })
    };
    
    this.setPercentage=function(h){
        EKTweener.to(Preloader,2,0,{
            percentage:h,
            onUpdate:b,
            ease:EKTweenFunc.linear
        })
    };
    
    var b=function(){
        !c&&Preloader.percentage==1&&d();
        _ctx.clearRect(0,0,150,150);
        if(!c){
            _ctx.fillStyle="rgba(255,255,255,.3)";
            _ctx.beginPath();
            _ctx.arc(75,75,Preloader.outerRadius,0,Math.PI*2,true);
            _ctx.fill()
        }
        _ctx.fillStyle="#FFF";
        _ctx.beginPath();
        _ctx.moveTo(75,75);
        _ctx.arc(75,75,Preloader.outerRadius,Math.PI*1.5,Math.PI*1.5+Math.PI*2*Preloader.percentage,
            false);
        _ctx.fill();
        _ctx.strokeStyle="#e5e5e5";
        _ctx.fillStyle="#f6f6f6";
        _ctx.beginPath();
        _ctx.arc(75,75,Preloader.innerRadius,0,Math.PI*2,true);
        _ctx.fill();
        _ctx.stroke();
        if(c){
            _ctx.fillStyle="#000";
            _ctx.beginPath();
            _ctx.arc(75,75,Preloader.innerRadius,Math.PI*(0.25-Preloader.mouseOverAngle),Math.PI*(0.25+Preloader.mouseOverAngle),false);
            _ctx.fill()
        }
        _ctx.font="italic 20px Georgia";
        _ctx.textAlign="center";
        var h=~~(127+Preloader.mouseOverAngle*128);
        _ctx.fillStyle="rgba("+h+","+h+","+h+","+Preloader.playTextOpacity+
        ")";
        _ctx.fillText(c?Game.isPlaying?"Resume":"Play!":parseInt(Preloader.percentage*100)+"%",75,83)
    },d=function(){
        EKTweener.killTweensOf(Preloader);
        c=true;
        TopBar.show();
        BottomBar.show();
        Game.init();
        StageReference.startRender();
        _canvas.style.cursor="pointer";
        _canvas.addEventListener("mouseover",e,false);
        _canvas.addEventListener("mouseout",g,false);
        _canvas.addEventListener("click",k,false);
        Panel.show();
        MouseBlocker.hide()
    },e=function(){
        if(!SectionManager.isAnimating){
            MusicManager.playMouseOver();
            EKTweener.to(Preloader,
                1,0,{
                    mouseOverAngle:1,
                    onUpdate:b
                });
            EKTweener.to(Preloader,1,0,{
                outerRadius:40
            });
            EKTweener.to(Preloader,0.6,0,{
                innerRadius:60
            })
        }
    },g=function(){
        if(!SectionManager.isAnimating){
            MusicManager.playMouseOver();
            EKTweener.to(Preloader,1,0,{
                mouseOverAngle:0,
                onUpdate:b
            });
            EKTweener.to(Preloader,1,0,{
                outerRadius:55
            });
            EKTweener.to(Preloader,0.6,0,{
                innerRadius:45
            })
        }
    },k=function(){
        SectionManager.hide()
    }
});
var BlackOverlay=new (function(){
    var a={},c={},b=0,d=0,e=0,g={};
    
    this.opacity=0;
    var k=function(){
        b=StageReference.stageWidth;
        d=StageReference.stageHeight;
        a.setAttribute("width",b);
        a.setAttribute("height",d);
        e=MathUtil.getXYLength(b,d)>>1;
        a.parentNode&&h()
    };
        
    this.init=function(){
        a=DisplayObjectUtil.create("canvas");
        c=a.getContext("2d");
        DisplayObjectUtil.addTo(a,StageReference.getLayer("scene2DOverlay"));
        StageReference.registerStageResizeFunc(k);
        this.show()
    };
        
    this.show=function(){
        EKTweener.killTweensOf(BlackOverlay);
        DisplayObjectUtil.addTo(a);
        EKTweener.to(BlackOverlay,2,0,{
            opacity:0.2,
            onUpdate:h
        })
    };
        
    this.hide=function(){
        EKTweener.killTweensOf(BlackOverlay);
        EKTweener.to(BlackOverlay,2,0,{
            opacity:0,
            onUpdate:h,
            onComplete:function(){
                DisplayObjectUtil.removeItself(a)
            }
        })
    };
    
    var h=function(){
        g=c.createRadialGradient(b>>1,d>>1,0,b>>1,d>>1,e);
        g.addColorStop(0,"rgba(0,0,0,0)");
        g.addColorStop(1,"rgba(0,0,0,"+BlackOverlay.opacity+")");
        c.clearRect(0,0,b,d);
        c.fillStyle=g;
        c.fillRect(0,0,b,d)
    }
});
var TopBar=new (function(){
    var a,c,b,d;
    this.HEIGHT=60;
    var e=function(){
        a.style.width=StageReference.stageWidth+"px"
    };
        
    this.init=function(){
        a=document.getElementById("top");
        c=document.getElementById("what_is_this_btn");
        b=document.getElementById("instruction_btn");
        d=document.getElementById("highest_scores_btn");
        SectionManager.addSection(c,WhatIsThis);
        SectionManager.addSection(b,Instruction);
        SectionManager.addSection(d,HighestScores);
        DisplayObjectUtil.removeItself(a);
        DisplayObjectUtil.addTo(a,StageReference.getLayer("top"));
        StageReference.registerStageResizeFunc(e)
    };
        
    this.show=function(){
        a.style.display="inline";
        a.style.margin=-TopBar.HEIGHT+"px 0px";
        EKTweener.to(a.style,1,0,{
            margin:0,
            suffix:{
                margin:"px 0px"
            }
        })
    }
});
var Panel=new (function(){
    var a={},c={},b={},d={
        l:0,
        r:0,
        t:0,
        b:0
    },e=false,g=function(){
        a.style.left=StageReference.stageWidth-parseInt(a.style.width)-50+"px";
        d.l=parseInt(a.style.left);
        d.r=d.l+parseInt(a.style.width)+8
    };
        
    this.init=function(){
        a=document.getElementById("panel");
        c=document.getElementById("panel_logo");
        b=document.getElementById("panel_clip");
        DisplayObjectUtil.removeItself(a);
        DisplayObjectUtil.addTo(a,StageReference.getLayer("scene2DOverlay"));
        StageReference.registerStageResizeFunc(g);
        d.t=
        parseInt(a.style.top);
        d.b=d.t+265+8;
        c.addEventListener("click",k,false)
    };
        
    var k=function(){
        if(e){
            EKTweener.killTweensOf(b.style);
            EKTweener.killTweensOf(a.style);
            var h=EKTweener.to(b.style,1,0,{
                clip:80,
                prefix:{
                    clip:"rect(0px, 220px,"
                },
                suffix:{
                    clip:"px, 0px)"
                }
            });
            h.changeFrom("clip",265);
            EKTweener.to(a.style,1,0,{
                height:80,
                suffix:{
                    height:"px"
                }
            })
        }else{
            MusicManager.playMouseOver();
            EKTweener.killTweensOf(b.style);
            EKTweener.killTweensOf(a.style);
            h=EKTweener.to(b.style,1,0,{
                clip:265,
                prefix:{
                    clip:"rect(0px, 220px,"
                },
                suffix:{
                    clip:"px, 0px)"
                }
            });
            _containerTween=h.changeFrom("clip",80);
            EKTweener.to(a.style,1,0,{
                height:265,
                suffix:{
                    height:"px"
                }
            })
        }
        e=!e
    };

    this.show=function(){
        a.style.top=d.t-120+"px";
        a.style.display="inline";
        EKTweener.to(a.style,1.5,0,{
            top:d.t,
            suffix:{
                top:"px"
            },
            ease:EKTweenFunc.easeOutBack
        })
    }
});
var WhatIsThis=new (function(){
    this.scetionId=0;
    var a={},c={},b={},d={},e={},g={},k=0,h=0,f=0,n=0;
    this.LINE_TOP="-30px";
    this.LINE_LEFT="-220px";
    this.LINE_ANGLE=-70;
    this.LINE_WIDTH=280;
    this.loadAssets=function(t){
        EKLoader.add(t+"mypic.png",m)
    };
        
    var l=function(){
        _mouseRatioCurrentY=_mouseRatioCurrentX=0
    },m=function(t){
        a=DisplayObjectUtil.create("div");
        a.style.display="none";
        DisplayObjectUtil.addTo(a,SectionManager.container);
        a.style.top="-325px";
        a.style.left="-250px";
        e=DisplayObjectUtil.create("div");
        e.style.top="180px";
        e.style.left="200px";
        e.style.opacity=0;
        DisplayObjectUtil.addTo(e,a);
        var v=DisplayObjectUtil.create("canvas");
        v.setAttribute("width",370);
        v.setAttribute("height",370);
        var z=v.getContext("2d");
        z.fillStyle="#FFF";
        z.beginPath();
        z.arc(185,185,185,0,Math.PI*2,true);
        z.fill();
        z.strokeStyle="#e5e5e5";
        z.fillStyle="#f6f6f6";
        z.beginPath();
        z.arc(185,185,175,0,Math.PI*2,true);
        z.fill();
        z.stroke();
        DisplayObjectUtil.addTo(v,e);
        v=document.getElementById("what_is_this");
        DisplayObjectUtil.addTo(v,
            e);
        v.style.display="inline";
        g=document.getElementById("contact");
        g.style.display="inline";
        DisplayObjectUtil.addTo(g,a);
        v=document.getElementsByClassName("contact_link");
        for(i=0;i<v.length;i++)v[i].addEventListener("mouseover",o,false);
        c=t.source;
        k=c.width;
        h=c.height;
        b=DisplayObjectUtil.create("canvas");
        b.setAttribute("width",190);
        b.setAttribute("height",190);
        d=b.getContext("2d");
        b.style.left="-45px";
        b.style.top="155px";
        b.style.opacity=0;
        DisplayObjectUtil.addTo(b,a);
        StageReference.registerStageResizeFunc(l)
    },
    o=function(){
        MusicManager.playMouseOver()
    };
        
    this.show=function(){
        a.style.display="inline";
        window.addEventListener("mousemove",u,false);
        StageReference.registerRenderFunc(r);
        g.style.left="85px";
        EKTweener.to(e.style,2,0,{
            opacity:1,
            top:150,
            suffix:{
                top:"px"
            }
        });
        EKTweener.to(g.style,2,0,{
            opacity:1,
            left:65,
            suffix:{
                left:"px"
            }
        });
        EKTweener.to(b.style,2,0,{
            opacity:1,
            top:175,
            suffix:{
                top:"px"
            },
            onUpdate:s,
            onComplete:function(){
                SectionManager.showComplete()
            }
        })
    };

    this.hide=function(){
        EKTweener.to(e.style,2,0,{
            opacity:0,
            top:180,
            suffix:{
                top:"px"
            }
        });
        EKTweener.to(g.style,2,0,{
            opacity:0,
            left:45,
            suffix:{
                left:"px"
            }
        });
        EKTweener.to(b.style,2,0,{
            opacity:0,
            top:155,
            suffix:{
                top:"px"
            },
            onUpdate:s,
            onComplete:function(){
                SectionManager.hideComplete();
                a.style.display="none";
                window.removeEventListener("mousemove",u,false);
                StageReference.deregisterRenderFunc(r)
            }
        })
    };

    var s=function(){
        Line.redraw()
    },u=function(t){
        t&&StageReference.calculateMouseXYCenterRatio(t.clientX,t.clientY)
    },r=function(){
        f+=(StageReference.mouseXCenterRatio-f)*0.05;
        n+=(StageReference.mouseYCenterRatio-n)*0.05;
        d.clearRect(0,0,190,190);
        d.fillStyle="#FFF";
        d.beginPath();
        d.arc(95,95,95,0,Math.PI*2,true);
        d.fill();
        d.save();
        d.beginPath();
        d.arc(95,95,85,0,Math.PI*2,false);
        d.clip();
        d.drawImage(c,-10-20*f,-10-20*n);
        d.restore();
        d.strokeStyle="#e5e5e5";
        d.beginPath();
        d.arc(95,95,85,0,Math.PI*2,true);
        d.stroke()
    }
});
var Instruction=new (function(){
    this.scetionId=0;
    this.LINE_TOP="115px";
    this.LINE_LEFT="-25px";
    this.LINE_ANGLE=-45;
    this.LINE_WIDTH=320;
    var a={},c={},b={},d={},e=[],g=[],k=[];
    this.isAnimating=false;
    this.innerRadius=this.outerRadius=0;
    this.init=function(){
        var f=0;
        a=DisplayObjectUtil.create("div");
        DisplayObjectUtil.addTo(a,SectionManager.container);
        c=DisplayObjectUtil.create("canvas");
        c.setAttribute("width",420);
        c.setAttribute("height",420);
        c.style.top="-210px";
        c.style.left="-210px";
        b=c.getContext("2d");
        DisplayObjectUtil.addTo(c,a);
        d=document.getElementById("instruction_title");
        d.style.opacity=0;
        d.style.display="none";
        DisplayObjectUtil.addTo(d,a);
        var n=document.getElementsByClassName("instruction_line");
        for(f=0;f<n.length;f++){
            e.push(n[f]);
            g[f]=parseInt(e[f].style.top);
            e[f].style.opacity=0;
            e[f].style.display="none"
        }
        for(f=0;f<e.length;f++)DisplayObjectUtil.addTo(e[f],a)
    };
            
    this.show=function(){
        Preloader.show();
        Preloader.container.style.top="100px";
        Preloader.container.style.left="100px";
        if(!Instruction.isAnimating){
            var f=
            0;
            a.style.display="inline";
            EKTweener.killTweensOf(d.style);
            d.style.display="inline";
            EKTweener.to(d.style,2,0,{
                opacity:1
            });
            for(f=0;f<e.length;f++){
                EKTweener.killTweensOf(e[f].style);
                e[f].style.display="inline";
                e[f].style.top=g[f]-20+"px";
                EKTweener.to(e[f].style,1.5,f*0.25,{
                    opacity:1,
                    top:g[f],
                    suffix:{
                        top:"px"
                    }
                })
            }
            for(f=0;f<k.length;f++){
                EKTweener.killTweensOf(k[f].style);
                k[f].style.display="inline";
                EKTweener.to(k[f].style,2,0,{
                    opacity:0.1
                })
            }
            EKTweener.killTweensOf(Instruction);
            EKTweener.to(Instruction,
                2,0,{
                    outerRadius:155,
                    ease:EKTweenFunc.easeOutBack
                });
            EKTweener.to(Instruction,2.5,0,{
                innerRadius:145,
                onUpdate:h,
                ease:EKTweenFunc.easeOutBack,
                onComplete:function(){
                    SectionManager.showComplete();
                    Instruction.isAnimating=false
                }
            });
            Instruction.isAnimating=true
        }
    };

    this.hide=function(){
        Preloader.hide();
        if(!Instruction.isAnimating){
            var f=0;
            EKTweener.killTweensOf(d.style);
            EKTweener.to(d.style,2,0,{
                opacity:0,
                onComplete:function(){
                    d.style.display="none"
                }
            });
            for(f=0;f<e.length;f++){
                var n=f;
                EKTweener.killTweensOf(e[f].style);
                EKTweener.to(e[f].style,1.5,f*0.25,{
                    opacity:0,
                    top:g[f]-20,
                    suffix:{
                        top:"px"
                    },
                    onComplete:function(){
                        e[n].style.display="none"
                    }
                })
            }
            for(f=0;f<k.length;f++){
                n=f;
                EKTweener.killTweensOf(k[f].style);
                EKTweener.to(k[f].style,2,0,{
                    opacity:0,
                    onComplete:function(){
                        k[n].style.display="none"
                    }
                })
            }
            EKTweener.killTweensOf(Instruction);
            EKTweener.to(Instruction,2,0,{
                outerRadius:0,
                ease:EKTweenFunc.easeInBack
            });
            EKTweener.to(Instruction,2.5,0,{
                innerRadius:0,
                onUpdate:h,
                ease:EKTweenFunc.easeInBack,
                onComplete:function(){
                    SectionManager.hideComplete();
                    Instruction.isAnimating=false;
                    a.style.display="none"
                }
            });
            Instruction.isAnimating=true
        }
    };

    var h=function(){
        Line.redraw();
        b.clearRect(0,0,420,420);
        b.fillStyle="#FFF";
        b.beginPath();
        b.arc(210,210,Instruction.outerRadius,0,Math.PI*2,true);
        b.fill();
        b.strokeStyle="#e5e5e5";
        b.fillStyle="#f6f6f6";
        b.beginPath();
        b.arc(210,210,Instruction.innerRadius,0,Math.PI*2,true);
        b.fill();
        b.stroke()
    };
    
    this.updateCanvas=function(){}
});
var HighestScores=new (function(){
    var a='<table width="200" border="0" cellpadding="0" cellspacing="2"><tr style="color:#666"><td>NAME</td><td>SCORE</td></tr>',c="</table>";
    this.name="Nobody";
    this.score=0;
    this.LINE_LEFT=this.LINE_TOP="-20px";
    this.LINE_ANGLE=70;
    this.LINE_WIDTH=280;
    var b={},d={},e={},g=false;
    this.init=function(){
        b=DisplayObjectUtil.create("div");
        b.style.display="none";
        DisplayObjectUtil.addTo(b,SectionManager.container);
        b.style.top="-325px";
        b.style.left="-250px";
        d=DisplayObjectUtil.create("div");
        d.style.left="10px";
        d.style.opacity=0;
        DisplayObjectUtil.addTo(d,b);
        var h=DisplayObjectUtil.create("canvas");
        h.setAttribute("width",340);
        h.setAttribute("height",340);
        var f=h.getContext("2d");
        f.fillStyle="#FFF";
        f.beginPath();
        f.arc(170,170,170,0,Math.PI*2,true);
        f.fill();
        f.strokeStyle="#e5e5e5";
        f.fillStyle="#f6f6f6";
        f.beginPath();
        f.arc(170,170,160,0,Math.PI*2,true);
        f.fill();
        f.stroke();
        DisplayObjectUtil.addTo(h,d);
        h=document.getElementById("highest_scores");
        DisplayObjectUtil.addTo(h,d);
        h.style.display=
        "inline";
        e=document.getElementById("highest_scores_table")
    };
        
    this.show=function(){
        Preloader.show();
        Preloader.container.style.top="-160px";
        Preloader.container.style.left="110px";
        d.style.top="150px";
        k();
        b.style.display="inline";
        EKTweener.to(d.style,2.5,0,{
            opacity:1,
            top:185,
            suffix:{
                top:"px"
            },
            onUpdate:Line.redraw,
            onComplete:function(){
                SectionManager.showComplete()
            }
        })
    };
    
    this.hide=function(){
        Preloader.hide();
        EKTweener.to(d.style,2.5,0,{
            opacity:0,
            top:210,
            suffix:{
                top:"px"
            },
            onUpdate:Line.redraw,
            onComplete:function(){
                SectionManager.hideComplete();
                b.style.display="none"
            }
        })
    };

    var k=function(){
        function h(){
            if(f.readyState==4)if(f.status==200){
                e.innerHTML=a+f.responseText+c;
                EKTweener.to(e.style,1,0,{
                    opacity:1
                })
            }
        }
        if(!g){
            e.style.opacity=0;
            var f,n="get_scores.php?t="+(new Date).getTime()+"&n="+EnterName.name+"&s="+ScoreManager.getScore();
            if(window.XMLHttpRequest){
                f=new XMLHttpRequest;
                f.onreadystatechange=h;
                f.open("GET",n,true);
                f.send(null)
            }else if(window.ActiveXObject)if(f=new ActiveXObject("Microsoft.XMLHTTP")){
                f.onreadystatechange=h;
                f.open("GET",
                    n,true);
                f.send()
            }
        }
    }
});
var Line=new (function(){
    var a={},c={};
    
    this.targetWidth=this.width=0;
    this.init=function(){
        a=DisplayObjectUtil.create("canvas");
        a.setAttribute("height",1);
        c=a.getContext("2d");
        DisplayObjectUtil.addTo(a,SectionManager.container)
    };
        
    this.changeSection=function(b){
        a.setAttribute("width",Line.targetWidth=b.LINE_WIDTH);
        a.style.top=b.LINE_TOP;
        a.style.left=b.LINE_LEFT;
        c.clearRect(0,0,this.targetWidth,1);
        a.style[StageReference.isFF?"MozTransform":StageReference.browserPrefix+"transform"]="rotate("+b.LINE_ANGLE+
        "deg)"
    };
        
    this.redraw=function(){
        c.clearRect(0,0,Line.targetWidth,1);
        c.fillStyle="#d1d1d1";
        c.fillRect(0,0,Line.width,1)
    }
});
var SectionManager=new (function(){
    var a=[],c=[];
    this.container=[];
    this.isAnimating=false;
    var b=null,d=function(){
        c.style.left=StageReference.stageWidth*0.5+"px";
        c.style.top=StageReference.stageHeight*0.5+"px"
    };
        
    this.init=function(){
        c=DisplayObjectUtil.create("div");
        c.style.opacity=1;
        this.container=c;
        DisplayObjectUtil.addTo(c,StageReference.getLayer("section"));
        StageReference.registerStageResizeFunc(d)
    };
        
    this.addSection=function(f,n){
        f.sectionId=n.sectionId=a.length;
        f.style.opacity=0.7;
        f.addEventListener("mouseover",
            e,false);
        f.addEventListener("mouseout",g,false);
        f.addEventListener("click",k,false);
        a.push([f,n])
    };
        
    var e=function(f){
        if(!(SectionManager.isAnimating||b==a[f.target.sectionId][1])){
            MusicManager.playMouseOver();
            EKTweener.to(f.target.style,0.5,0,{
                opacity:1
            })
        }
    },g=function(f){
        SectionManager.isAnimating||EKTweener.to(f.target.style,0.5,0,{
            opacity:0.7
        })
    },k=function(f){
        SectionManager.isAnimating||b==a[f.target.sectionId][1]||SectionManager.show(a[f.target.sectionId][1])
    };
    
    this.show=function(f){
        if(!SectionManager.isAnimating){
            Game.isPlaying&&
            !Game.isPaused&&Game.pauseGame();
            SectionManager.setAnimated(true);
            if(b){
                h(b);
                b=f
            }else{
                b=f;
                SectionManager.hideComplete()
            }
        }
    };

    this.hide=function(f){
        SectionManager.isAnimating||h(f)
    };
    
    var h=function(f){
        SectionManager.setAnimated(true);
        f==null?b.hide():f.hide();
        b=null;
        EKTweener.to(Line,2,0,{
            width:0
        })
    };
    
    this.hideComplete=function(){
        if(b){
            SectionManager.setAnimated(true);
            Line.changeSection(b);
            EKTweener.to(Line,2,0,{
                width:Line.targetWidth
            });
            b.show()
        }else{
            SectionManager.setAnimated(false);
            Game.isPlaying?Game.resumeGame():
            Game.startGame()
        }
    };

    this.showComplete=function(){
        SectionManager.setAnimated(false)
    };
    
    this.setAnimated=function(f){
        if(SectionManager.isAnimating!=f){
            var n=0;
            if(SectionManager.isAnimating=f)for(n=0;n<a.length;n++){
                a[n][0].style.cursor="default";
                EKTweener.killTweensOf(a[n][0].style);
                EKTweener.to(a[n][0].style,0.5,0,{
                    opacity:0.7
                })
            }else for(n=0;n<a.length;n++)a[n][0].style.cursor=b==null?"pointer":n==b.sectionId?"default":"pointer";
            if(SectionManager.isAnimating)MouseBlocker.show();else Preloader.percentage==
                1&&MouseBlocker.hide()
        }
    }
});
var YourScore=new (function(){
    var a={},c={};
    
    this.tweenScore=0;
    var b={},d=function(){
        a.style.left=StageReference.stageWidth*0.5+"px";
        a.style.top=StageReference.stageHeight*0.5+"px"
    };
        
    this.init=function(){
        a=DisplayObjectUtil.create("div");
        a.style.display="none";
        DisplayObjectUtil.addTo(a,StageReference.getLayer("info"));
        a.style.opacity=0;
        var l=DisplayObjectUtil.create("canvas");
        l.setAttribute("width",200);
        l.setAttribute("height",200);
        var m=l.getContext("2d");
        m.fillStyle="#FFF";
        m.beginPath();
        m.arc(100,
            100,100,0,Math.PI*2,true);
        m.fill();
        m.strokeStyle="#e5e5e5";
        m.fillStyle="#f6f6f6";
        m.beginPath();
        m.arc(100,100,90,0,Math.PI*2,true);
        m.fill();
        m.stroke();
        DisplayObjectUtil.addTo(l,a);
        l.style.left="-100px";
        l.style.top="-100px";
        l=document.getElementById("your_score");
        DisplayObjectUtil.addTo(l,a);
        l.style.display="inline";
        c=document.getElementById("your_score_score");
        b=document.getElementById("your_score_btn");
        b.addEventListener("mouseover",h,false);
        b.addEventListener("mouseout",f,false);
        b.addEventListener("click",
            n,false);
        StageReference.registerRenderFunc(d)
    };
        
    this.show=function(){
        MouseBlocker.show();
        a.style.display="inline";
        EKTweener.to(a.style,1,0,{
            opacity:1
        });
        YourScore.tweenScore=0;
        EKTweener.to(YourScore,1,0,{
            tweenScore:ScoreManager.score,
            onUpdate:e
        })
    };
        
    var e=function(){
        c.innerHTML=~~YourScore.tweenScore
    },g=function(){
        EKTweener.to(a.style,1,0,{
            opacity:0,
            onComplete:k
        })
    },k=function(){
        a.style.display="none";
        MouseBlocker.hide();
        SectionManager.show(HighestScores);
        StageReference.deregisterStageResizeFunc(d)
    },h=
    function(){
        MusicManager.playMouseOver();
        b.style.opacity=1
    },f=function(){
        b.style.opacity=0.6
    },n=function(){
        g()
    }
});
var EnterName=new (function(){
    this.name="";
    var a={},c={},b={},d={},e=function(){
        a.style.left=StageReference.stageWidth*0.5+"px";
        a.style.top=StageReference.stageHeight*0.5+"px"
    };
        
    this.init=function(){
        a=DisplayObjectUtil.create("div");
        a.style.display="none";
        DisplayObjectUtil.addTo(a,StageReference.getLayer("info"));
        a.style.opacity=0;
        var l=DisplayObjectUtil.create("canvas");
        l.setAttribute("width",240);
        l.setAttribute("height",240);
        var m=l.getContext("2d");
        m.fillStyle="#FFF";
        m.beginPath();
        m.arc(120,120,
            120,0,Math.PI*2,true);
        m.fill();
        m.strokeStyle="#e5e5e5";
        m.fillStyle="#f6f6f6";
        m.beginPath();
        m.arc(120,120,110,0,Math.PI*2,true);
        m.fill();
        m.stroke();
        DisplayObjectUtil.addTo(l,a);
        l.style.left="-120px";
        l.style.top="-120px";
        l=document.getElementById("enter_name");
        DisplayObjectUtil.addTo(l,a);
        l.style.display="inline";
        c=document.getElementById("enter_name_name");
        d=document.getElementById("enter_name_reminder");
        b=document.getElementById("enter_name_btn");
        b.addEventListener("mouseover",h,false);
        b.addEventListener("mouseout",
            f,false);
        b.addEventListener("click",n,false);
        StageReference.registerRenderFunc(e)
    };
        
    this.show=function(){
        c.focus();
        MouseBlocker.show();
        a.style.display="inline";
        EKTweener.to(a.style,1,0,{
            opacity:1
        })
    };
        
    var g=function(){
        EKTweener.to(a.style,1,0,{
            opacity:0,
            onComplete:k
        })
    },k=function(){
        a.style.display="none";
        MouseBlocker.hide();
        Game.startGame();
        StageReference.deregisterStageResizeFunc(e)
    },h=function(){
        MusicManager.playMouseOver();
        b.style.opacity=1
    },f=function(){
        b.style.opacity=0.6
    },n=function(){
        for(var l=
            c.value.toString().split(""),m=false,o="",s=0;s<l.length;s++)if(l[s].match(/[\sa-zA-Z0-9\.]/))o+=l[s]==" "?"_":l[s];
            else{
                m=true;
                break
            }
        if(m||l.length<5||l.length>20){
            d.style.color="#FF0000";
            c.focus()
        }else{
            EnterName.name=o;
            g()
        }
    }
});
var Game=new (function(){
    var a={};
    
    this.canvas={};
    
    var c={},b=0;
    this.isEnd=this.isPaused=this.isPlaying=false;
    this.frequency=1;
    var d=0,e=0,g=0,k=0,h={},f=0,n=0.25,l=this.spotlightB=this.spotlightG=this.spotlightR=0,m=0,o=0,s=0;
    this.pointY=this.pointX=0;
    var u=-12,r=0;
    this.shakeFactor=0;
    var t=function(){
        e=StageReference.stageWidth;
        g=StageReference.stageHeight-TopBar.HEIGHT-BottomBar.HEIGHT;
        a.setAttribute("width",e);
        a.setAttribute("height",g);
        k=MathUtil.getXYLength(e,g)>>1;
        CanvasManager.onResize(e,g);
        BallManager.onResize(e,g);
        ScoreManager.onResize(e,g);
        BackgroundManager.onResize(e,g);
        StageReference.render()
    },v=function(p){
        if(p&&!Game.isEnd){
            l=p.clientX-0;
            m=p.clientY-0-TopBar.HEIGHT;
            StageReference.calculateMouseXYCenterRatio(p.clientX,p.clientY);
            CanvasManager.setXY(l,m);
            o=StageReference.mouseXCenterRatio*5;
            s=StageReference.mouseYCenterRatio*5
        }
    };
    
    this.init=function(){
        a=DisplayObjectUtil.create("canvas");
        a.setAttribute("class","canvas");
        a.setAttribute("onSelectStart","this.style.cursor='default'; return false;");
        a.style.top=TopBar.HEIGHT+"px";
        this.canvas=a;
        DisplayObjectUtil.addTo(a,StageReference.getLayer("scene2D"));
        c=a.getContext("2d");
        CanvasManager.init(c);
        BallManager.init(c);
        ScoreManager.init(c);
        BackgroundManager.init(c);
        window.addEventListener("mousemove",v,false);
        StageReference.registerStageResizeFunc(t);
        StageReference.onResize()
    };
    
    this.startGame=function(){
        if(EnterName.name=="")EnterName.show();
        else{
            EKTweener.killTweensOf(a.style);
            a.style.opacity=1;
            StageReference.registerRenderFunc(this.render);
            Game.isPlaying=
            true;
            Game.isPaused=false;
            Game.isEnd=false;
            ScoreManager.reset();
            ScoreManager.show();
            SubtitleManager.show();
            MusicManager.reset();
            CanvasManager.changeColor(0,0,0);
            CanvasManager.beatColor="rgba(0,0,0,.06)";
            CanvasManager.beatLighter=false;
            SubtitleManager.changeColor("#777");
            ScoreManager.changeColor("#777");
            BakedImageManager.useBlack=true;
            FloatImageManager.useBlack=true;
            BackgroundManager.setBackground(0);
            MusicManager.play()
        }
    };

    this.pauseGame=function(){
        MusicManager.pause();
        StageReference.deregisterRenderFunc(this.render);
        t();
        SubtitleManager.hide();
        ScoreManager.hide();
        Game.isPaused=true
    };
    
    this.resumeGame=function(){
        MusicManager.resume();
        StageReference.registerRenderFunc(this.render);
        SubtitleManager.show();
        ScoreManager.show();
        Game.isPaused=false
    };
    
    this.endGame=function(){
        SubtitleManager.hide();
        ScoreManager.hide();
        Game.isPaused=false;
        Game.isPlaying=false;
        Game.isEnd=true;
        EKTweener.to(a.style,1,0,{
            opacity:0,
            onComplete:function(){
                StageReference.deregisterRenderFunc(this.render)
            }
        });
        YourScore.show()
    };

    this.render=function(){
        if(Game.shakeFactor>
            0.01)Game.shakeFactor+=-Game.shakeFactor*0.03;
        var p=u+(Game.shakeFactor>0.01?(Math.random()-0.5)*Game.shakeFactor*2:0),C=r+(Game.shakeFactor>0.01?(Math.random()-0.5)*Game.shakeFactor*2:0);
        o+=(StageReference.mouseXCenterRatio*5-o)*0.02;
        s+=(StageReference.mouseYCenterRatio*5-s)*0.02;
        BackgroundManager.draw((p-o)*0.7,(C-s)*0.7);
        CanvasManager.update(~~(p-o),~~(C-s));
        if(!Game.isEnd)if(b%~~(40/Game.frequency)==0)d++%2==0?BallManager.addBlueBall():BallManager.addRedBall();
        BallManager.update(p,C-s);
        ScoreManager.update();
        z();
        b++
    };

    var z=function(){
        Game.spotlightR+=-Game.spotlightR*0.01;
        Game.spotlightG+=-Game.spotlightG*0.01;
        Game.spotlightB+=-Game.spotlightB*0.01;
        f+=(n-f)*0.02;
        h=c.createRadialGradient(e>>1,g>>1,0,e>>1,g>>1,k);
        h.addColorStop(0,"rgba("+~~Game.spotlightR+","+~~Game.spotlightG+","+~~Game.spotlightB+",0)");
        h.addColorStop(1,"rgba("+~~Game.spotlightR+","+~~Game.spotlightG+","+~~Game.spotlightB+","+f+")");
        c.fillStyle=h;
        c.fillRect(0,0,e,g)
    }
});
var TimeScale=new (function(){
    var a,c,b,d=0,e=function(){
        c.style.width=StageReference.stageWidth+"px"
    };
        
    this.loadAssets=function(h){
        EKLoader.add(h+"scale.png",g)
    };
        
    var g=function(h){
        a=DisplayObjectUtil.create("div");
        DisplayObjectUtil.addTo(a,BottomBar.container);
        b=DisplayObjectUtil.create("div");
        b.style.backgroundColor="#ff007e";
        b.style.top="-8px";
        b.style.width="0px";
        b.style.height="8px";
        DisplayObjectUtil.addTo(b,a);
        c=DisplayObjectUtil.create("div");
        c.style.backgroundImage="url("+h.url+")";
        c.style.top=
        "-11px";
        c.style.height="11px";
        DisplayObjectUtil.addTo(c,a);
        StageReference.registerStageResizeFunc(e)
    };
        
    this.init=function(){
        StageReference.registerRenderFunc(k)
    };
        
    var k=function(){
        d+=(MusicManager.currentTime/MusicManager.duration*StageReference.stageWidth-d)*0.2;
        b.style.width=d+"px"
    }
});
function Ribbon(a,c,b,d,e){
    var g=0,k=d,h=0,f=0,n=0,l=0,m=0,o=0,s=0,u=0,r=0,t=0,v=0,z=0,p=0,C=0,E=0,j=0,x=0,q=0,w=0,A=0,I=0,L=0,J=0,M=0,P=0,Q=0,R=0,S=0,T=0,U=0,O=[],N=[0,0,0];
    for(d=0;d<15;d++)O[d]=new RibbionSpark;
    this.updateAndDrawCache=function(D,F,H,y,G,B,K){
        k+=y;
        F=F+Math.cos(k)*e;
        H=H+Math.sin(k)*e;
        y=MathUtil.getXYLength(F-h,H-f);
        G=b*Math.pow(1-y/CanvasManager.maxDistance,20)+4*b*G;
        if(G<0)G=0;
        G+=c;
        P=x+B;
        Q=q+K;
        R=w+B;
        S=A+K;
        E=u+B;
        j=r+K;
        x=v+B;
        q=z+K;
        w=p+B;
        A=C+K;
        u=h+B;
        r=f+K;
        t=n;
        h+=T=(F-h)*0.1+T*0.7;
        f+=
        U=(H-f)*0.1+U*0.7;
        n=G;
        B=-Math.atan2(h-u,f-r);
        l=h-G*Math.cos(B);
        m=f-G*Math.sin(B);
        o=h*2-l;
        s=f*2-m;
        B=MathUtil.getXYLength(u-E,r-j);
        K=MathUtil.getXYLength(E-h,j-f);
        G=MathUtil.getXYLength(h-u,f-r);
        F=Math.atan2(f-r,h-u);
        H=Math.atan2(j-r,E-u);
        y=H-F;
        if(y>Math.PI)y-=Math.PI*2;
        if(y<-Math.PI)y+=Math.PI*2;
        B=(y>0?F:H+Math.PI)+Math.acos((B*B-K*K+G*G)/(2*B*G))/2;
        if(isNaN(B))B=g;else g=B;
        v=u+t*Math.cos(B);
        z=r+t*Math.sin(B);
        p=u*2-v;
        C=r*2-z;
        y=MathUtil.getXYLength(v-x,z-q)*0.5;
        B=Math.atan2(z-Q,v-P);
        I=x+Math.cos(B)*
        y;
        L=q+Math.sin(B)*y;
        y=MathUtil.getXYLength(p-w,C-A)*0.5;
        B=Math.atan2(C-S,p-R);
        J=w+Math.cos(B)*y;
        M=A+Math.sin(B)*y;
        D.beginPath();
        D.moveTo(x,q);
        D.quadraticCurveTo(I,L,v,z);
        D.lineTo(p,C);
        D.quadraticCurveTo(J,M,w,A);
        D.fill();
        D.stroke()
    };
        
    this.updateThickestPointXY=function(D){
        Game.pointX=h+D;
        Game.pointY=f+D
    };
        
    this.getPointX=function(){
        return h
    };
        
    this.getPointY=function(){
        return f
    };
        
    this.drawCanvas=function(D,F,H){
        a.beginPath();
        a.moveTo(v+D,z+F);
        a.lineTo(l+D,m+F);
        a.lineTo(o+D,s+F);
        a.lineTo(p+D,C+F);
        a.fill();
        a.stroke();
        a.beginPath();
        a.arc(h+D,f+F,n,0,Math.PI*2,false);
        a.fill();
        if(H){
            H=MusicManager.level*150;
            a.save();
            if(CanvasManager.beatLighter)a.globalCompositeOperation="lighter";
            a.fillStyle=CanvasManager.beatColor;
            for(var y=0;y<3;y++){
                a.beginPath();
                N[y]+=(MusicManager.level*(100+y*20)-N[y])*0.2*y;
                a.arc(h+D,f+F,N[y],0,Math.PI*2,false);
                a.fill();
                if(H<=N[y]+2)N[y]=0
            }
            for(y=0;y<15;y++){
                O[y].life--<=0&&O[y].reset(h+D,f+F);
                O[y].draw(a)
            }
            a.restore()
        }
    }
}
function RibbionSpark(){
    var a=0,c=0,b=0,d=0,e=0;
    this.life=-1;
    this.reset=function(g,k){
        a=g;
        c=k;
        e=5+Math.random()*15;
        b=Math.random()*6-3;
        d=Math.random()*6-3;
        this.life=5*~~(Math.random()*15)
    };
        
    this.draw=function(g){
        g.save();
        g.globalAlpha=this.life/20;
        g.beginPath();
        g.arc(a+=b,c+=d,e,0,Math.PI*2,false);
        g.fill();
        g.restore()
    }
};

var BallManager=new (function(){
    var a=[],c=[],b=[],d={},e=-40,g=0,k=-40,h=0;
    this.init=function(l){
        d=l
    };
        
    this.onResize=function(l,m){
        g=l+40;
        h=m+40
    };
        
    this.addBlueBall=function(){
        f(c,true)
    };
        
    this.addRedBall=function(){
        f(b,false)
    };
        
    var f=function(l,m){
        for(var o=0;o<l.length;o++)if(!l[o].active){
            n(l[o],m);
            return
        }
        m=new Ball(m);
        n(m);
        l.push(m);
        a.push(m)
    },n=function(l){
        l.radius=0;
        l.radius_target=15+Math.random()*25;
        l.x=g;
        l.y=k+Math.random()*(h+40);
        l.active=true
    };
        
    this.killAllBalls=function(){
        for(var l=0;l<arr.length;l++)arr[l].active=
            false
    };
            
    this.update=function(l,m){
        for(var o,s,u=0;u<a.length;u++){
            o=a[u];
            if(o.active){
                o.x+=l;
                o.y+=m;
                if(o.isInside(Game.pointX,Game.pointY,40)&&!Game.isEnd){
                    if(o.isBlue){
                        ScoreManager.addScore(100,Game.pointX,Game.pointY);
                        if(ScoreManager.combo>4){
                            CanvasManager.changeColor(255,255,255);
                            CanvasManager.beatColor="rgba(0,255,255,.06)";
                            CanvasManager.beatLighter=true;
                            SubtitleManager.changeColor("#FFF");
                            ScoreManager.changeColor("#FFF");
                            BakedImageManager.useBlack=false;
                            FloatImageManager.useBlack=false;
                            BackgroundManager.setBackground(5)
                        }else{
                            CanvasManager.changeColor(0,
                                0,0);
                            CanvasManager.beatColor="rgba(0,0,0,.06)";
                            CanvasManager.beatLighter=false;
                            SubtitleManager.changeColor("#777");
                            ScoreManager.changeColor("#777");
                            BakedImageManager.useBlack=true;
                            FloatImageManager.useBlack=true;
                            BackgroundManager.setBackground(0)
                        }
                        Game.spotlightR=0;
                        Game.spotlightG=255;
                        Game.spotlightB=255
                    }else{
                        ScoreManager.addScore(-100,Game.pointX,Game.pointY);
                        CanvasManager.changeColor(255,255,255);
                        CanvasManager.beatColor="rgba(255,255,0,.06)";
                        CanvasManager.beatLighter=true;
                        SubtitleManager.changeColor("#FFF");
                        ScoreManager.changeColor("#FFF");
                        BakedImageManager.useBlack=false;
                        FloatImageManager.useBlack=false;
                        BackgroundManager.setBackground(1);
                        Game.shakeFactor=30;
                        Game.spotlightR=255;
                        Game.spotlightG=0;
                        Game.spotlightB=0
                    }
                    o.active=false
                }else if(o.x>e){
                    o.radius+=(o.radius_target-o.radius)*0.05;
                    d.beginPath();
                    s=d.createRadialGradient(o.x,o.y,0,o.x,o.y,o.radius);
                    s.addColorStop(0.8,"rgba("+o.color+",.7)");
                    s.addColorStop(0.8,"rgba("+o.color+",1)");
                    s.addColorStop(1,"rgba("+o.color+",0)");
                    d.fillStyle=s;
                    d.arc(o.x,o.y,
                        o.radius,0,2*Math.PI,false);
                    d.fill()
                }else o.active=false
            }
        }
    }
});
function Ball(a){
    this.color=(this.isBlue=a)?"0,255,255":"235,18,79";
    this.y=this.x=this.radius=this.radius_target=0;
    this.active=true;
    this.isInside=function(c,b,d){
        return c-d<this.x?c+d>this.x?b-d<this.y?b+d>this.y?true:false:false:false:false
    }
}
function BallSpark(){};

var ScoreManager=new (function(){
    var a=[],c={};
    
    this.score=0;
    var b={};
    
    this.combo=0;
    this.onResize=function(){
        c.style.top=StageReference.stageHeight-110+"px";
        c.style.left=StageReference.stageWidth-240+"px"
    };
        
    this.init=function(d){
        b=d;
        c=DisplayObjectUtil.create("p");
        DisplayObjectUtil.addTo(c,StageReference.getLayer("scene2D"));
        this.changeColor("#777");
        c.style.width="200px";
        c.style.textAlign="right";
        c.style.fontFamily="Allan";
        c.style.fontSize="20px";
        c.style.fontWeight="bold";
        c.style.opacity=0
    };
        
    this.changeColor=
    function(d){
        c.style.color=d
    };
        
    this.reset=function(){
        ScoreManager.score=0;
        ScoreManager.combo=0;
        c.innerHTML="SCORE: 0"
    };
        
    this.show=function(){
        EKTweener.to(c.style,1,0,{
            opacity:1
        })
    };
        
    this.hide=function(){
        EKTweener.to(c.style,1,0,{
            opacity:0
        })
    };
        
    this.addScore=function(d,e,g){
        var k=false,h=d;
        this.combo=d>0?this.combo+1:0;
        if(this.combo>4)h+=(this.combo-4)*20;
        if(h>300)h=300;
        for(d=0;d<a.length;d++)if(!a[d].active){
            k=true;
            a[d].reset(h,e,g);
            break
        }
        k||a.push(new ScoreLabel(h,e,g));
        c.innerHTML="SCORE: "+(ScoreManager.score+=
            h)
    };
        
    this.getScore=function(){
        var d=ScoreManager.score<0?ScoreManager.score-1:ScoreManager.score+1;
        if(!Game.isPlaying)ScoreManager.score=0;
        return d
    };
        
    this.update=function(){
        var d,e=0;
        b.font="bold 28px Allan";
        b.lineWidth=1;
        for(var g=0;g<a.length;g++){
            d=a[g];
            if(d.active){
                d.y+=(d.ty-d.y)*0.03;
                if(d.y-d.ty>0.1){
                    e=(d.y-d.ty)/40;
                    b.fillStyle="rgba("+d.colorShadow+","+e*0.3+")";
                    b.fillText(d.s,d.x+3,d.y+3);
                    b.fillStyle="rgba("+d.colorFill+","+e+")";
                    b.fillText(d.s,d.x,d.y)
                }else d.active=false
            }
        }
    }
});
function ScoreLabel(a,c,b){
    this.active=true;
    this.colorShadow=this.colorFill="";
    this.reset=function(d,e,g){
        this.active=true;
        this.s=d>0?"+"+d:d;
        this.x=e;
        this.y=g;
        this.ty=g-40;
        this.colorFill=d<0?"255,0,0":"0,255,255";
        this.colorShadow=d<0?"50,0,0":"0,50,50"
    };
        
    this.reset(a,c,b)
};
    
var BackgroundManager=new (function(){
    var a,c=[],b={},d=this.id=0,e=0,g=0,k=0,h=0;
    this.init=function(f){
        a=f;
        this.setBackground(0)
    };
        
    this.setBackground=function(f){
        this.id=f;
        b=c[f];
        b.updateCache(d,e)
    };
        
    this.onResize=function(f,n){
        b.updateCache(d=f,e=n)
    };
        
    this.loadImages=function(f,n){
        c.push(new Background(f+"paper_texture.jpg"));
        c.push(new Background(f+"monster_0"+n));
        c.push(new Background(f+"monster_1"+n));
        c.push(new Background(f+"monster_2"+n));
        c.push(c[2]);
        c.push(new Background(f+(StageReference.isFF?
            "star_sky.png":"star_sky.svg")))
    };
        
    this.draw=function(f,n){
        if(this.id>0&&this.id<5)if(h++%10==0)this.setBackground(this.id=this.id+1==5?1:this.id+1);
        g+=g+f<-b.srcWidth?f+b.srcWidth:g+f>0?f-b.srcWidth:f;
        k+=k+n<-b.srcHeight?n+b.srcHeight:k+n>0?n-b.srcHeight:n;
        a.drawImage(b.cache,g,k)
    }
});
function Background(a){
    var c=this,b={},d={};
    
    this.cache={};
    
    this.ctx={};
    
    var e=this.height=this.width=this.srcHeight=this.srcWidth=0,g=0,k=function(h){
        b=CanvasUtil.createCache(h.source,0,0,c.srcWidth=h.source.width,c.srcHeight=h.source.height);
        d=b.getContext("2d").createPattern(b,"repeat");
        c.cache=DisplayObjectUtil.create("canvas");
        c.ctx=c.cache.getContext("2d")
    };
        
    this.updateCache=function(h,f){
        if(!(e==h&&g==f)){
            c.cache.setAttribute("width",c.width=(Math.ceil(h/c.srcWidth)+1)*c.srcWidth);
            c.cache.setAttribute("height",
                c.height=(Math.ceil(f/c.srcHeight)+1)*c.srcHeight);
            c.ctx.fillStyle=d;
            c.ctx.fillRect(0,0,c.width,c.height);
            e=h;
            g=f
        }
    };
    
    EKLoader.add(a,k)
};

var CanvasManager=new (function(){
    var a={},c={},b={},d={},e={},g={},k={},h={},f=true,n={},l=[],m=this.maxDistance=this.mouseY=this.mouseX=0,o=0,s=0,u=0,r=0,t=0;
    this.beatColor="rgba(0,0,0,.06)";
    this.beatLighter=false;
    var v=[[5,20,0,0],[0,4,90*MathUtil.DEGREE_TO_RAD,10],[1,5,180*MathUtil.DEGREE_TO_RAD,15],[2,8,270*MathUtil.DEGREE_TO_RAD,20],[0,7,360*MathUtil.DEGREE_TO_RAD,25]],z="#000",p=0,C=0,E=0;
    this.changeColor=function(q,w,A){
        if(!(p==q||C==w||E==A)){
            p=q;
            C=w;
            E=A;
            z="rgb("+q+","+w+","+A+")";
            CanvasUtil.tintCanvasCtx(g,
                q,w,A,0,0,s,u)
        }
    };
    
    this.init=function(q){
        a=DisplayObjectUtil.create("canvas");
        c=a.getContext("2d");
        b=DisplayObjectUtil.create("canvas");
        d=b.getContext("2d");
        n=q;
        for(q=0;q<5;q++)l[q]=new Ribbon(n,v[q][0],v[q][1],v[q][2],v[q][3]);
        c.lineWidth=1;
        d.lineWidth=1
    };
    
    this.onResize=function(q,w){
        m=q;
        o=w;
        s=q+300;
        u=w+300;
        this.maxDistance=MathUtil.getXYLength(s,u);
        x();
        g.clearRect(0,0,s,u);
        g.drawImage(k,0,0);
        k.setAttribute("width",s);
        k.setAttribute("height",u);
        h.drawImage(e,0,0);
        e.setAttribute("width",s);
        e.setAttribute("height",
            u);
        g.drawImage(k,0,0)
    };
    
    this.setXY=function(q,w){
        this.mouseX=150+q;
        this.mouseY=150+w
    };
    
    var j=0,x=function(){
        k=f?b:a;
        h=f?d:c;
        e=f?a:b;
        g=f?c:d
    };
    
    this.update=function(q,w){
        x();
        var A=0;
        j+=(MusicManager.deltaLevel*0.5-j)*0.2;
        g.clearRect(0,0,s,u);
        h.fillStyle=z;
        h.strokeStyle=z;
        for(A=0;A<5;A++)l[A].updateAndDrawCache(h,this.mouseX,this.mouseY,0.05*(A%2==0?-1:1),j,r,t);
        l[0].updateThickestPointXY(-150);
        if(!MusicManager.isEffect1Used){
            BakedImageManager.drawInk(h,l[0].getPointX(),l[0].getPointY());
            MusicManager.isEffect1Used=
            true;
            Game.shakeFactor=10+Math.random()*15
        }
        g.drawImage(k,q,w);
        n.drawImage(k,q-150,w-150);
        n.fillStyle=z;
        n.strokeStyle=z;
        n.lineWidth=1;
        for(A=0;A<5;A++)l[A].drawCanvas(q-150,w-150,A==0);
        if(!MusicManager.isEffect2Used){
            FloatImageManager.create(l[0].getPointX()-150,l[0].getPointY()-150);
            MusicManager.isEffect2Used=true
        }
        FloatImageManager.draw(n);
        r=q;
        t=w;
        f=!f
    }
});
var MusicManager=new (function(){
    var a={},c=0,b={};
    
    this.deltaLevel=this.level=this.playedPercentage=this.duration=this.currentTime=0;
    var d=[["00:00.50","00:06.50","Ven estoy temblando sienteme"],["00:07.20","00:11.20","Se que no me puedo contener..."],["00:14.40","00:19.50","Ven estoy tan s\u00f3lo abrazame"],["00:21.00","00:25.00","Ven estoy tan s\u00f3lo abrazame"],["00:28.10","00:33.60","Esta vez s\u00f3lo escuchame..."],["00:34.00","00:37.50","Hoy somos un par de extra\u00f1os m\u00e1s"],["00:37.50",
    "00:44.20","Entre el dolor y la necesidad de tenerte"],["00:44.20","00:46.50","Detente"],["00:48.00","00:53.50","Ves todo quedo en el ayer"],["00:55.50","01:00.00","Ve voltea al cielo y mientele"],["01:00.50","01:07.00","No me dejes s\u00f3lo.. No te dejar\u00e9 escapar"],["01:07.00","01:12.00","No me dejes s\u00f3lo..."],["01:12.20","01:18.20","Esta vez s\u00f3lo escuchame.."],["01:18.50","01:22.30","Hoy somos un par de extra\u00f1os m\u00e1s"],["01:22.50","01:29.50","Entre el dolor y la necesidad de tenerte"],
    ["01:29.80","01:31.00","Detente.."],["01:33.20","01:35.90","Hoy somos un par de extra\u00f1os m\u00e1s"],["01:36.00","01:42.80","Entre el dolor y la necesidad de tenerte"],["01:43.00","01:45.60","Detente.."],["01:46.50","01:53.00","No puedo ser feliz..abrazando el tiempo.."],["01:53.40","02:01.30","La vida se detiene.. Entre tus besos..no me djes"],["02:14.00","02:17.70","Hoy somos un par de extra\u00f1os m\u00e1s"],["02:18.00","02:23.50","Entre el dolor y la necesidad de tenerte "],["02:25.00","02:27.50",
    "Detente.."],["02:28.00","02:31.70","Hoy somos un par de extra\u00f1os m\u00e1s"],["02:32.00","02:37.70","Entre el dolor y la necesidad de tenerte"],["02:39.00","02:41.70","Detente"]],e=0,g=0;
    this.isEffect2Used=this.isEffect1Used=true;
    var k=[["00:28.10",1],["00:35.00",1],["00:38.00",1],["00:54.50",2],["01:13.20",1],["01:20.20",1],["01:23.20",2],["01:34.20",1],["01:37.20",2],["01:54.20",1],["02:15.20",1],["02:29.20",2],["02:33.20",2]],h=[["00:00.00",1],["00:28.10",2],["00:34.00",3],["00:48.00",1],
    ["01:12.20",2],["01:18.50",3],["01:45.00",2],["02:01.00",1],["02:14.00",3],["02:28.00",4],["02:42.00",1]],f=0,n=[["00:00.00",3],["00:08.00",0],["00:30.52",1],["00:40.74",0],["00:52.06",3],["00:56.00",0],["00:58.00",2],["01:06.50",0],["01:15.49",2],["01:25.98",0],["01:39.50",3],["01:52.50",0],["01:54.00",2],["02:03.00",0],["02:23.00",1],["02:35.00",0],["02:36.00",3],["02:40.00",0],["02:41.50",2],["02:50.00",0],["02:58.48",2]],l=0,m=function(){
        for(var p=0;p<d.length;p++){
            d[p][0]=o(d[p][0]);
            d[p][1]=
            o(d[p][1])
        }
        for(p=0;p<k.length;p++)k[p][0]=o(k[p][0]);
        for(p=0;p<h.length;p++)h[p][0]=o(h[p][0]);
        for(p=0;p<n.length;p++)n[p][0]=o(n[p][0])
    },o=function(p){
        p=p.split(":");
        return parseInt(p[0])*60+parseFloat(p[1])
    };
        
    this.play=function(){
        b.currentTime=0;
        b.play();
        b.volume=1
    };
        
    this.pause=function(){
        b.pause();
        b.volume=0
    };
        
    this.resume=function(){
        b.play();
        b.volume=1
    };
        
    this.init=function(){
        for(var p=document.getElementsByName("btn"),C=0;C<p.length;C++)p[C].addEventListener("mouseover",s,false)
    };
            
    this.playMouseOver=
    function(){
        a["mouseover_"+c++%2].play()
    };
        
    var s=function(p){
        p.target.style.opacity=0.8;
        p.target.removeEventListener("mouseover",s,false);
        p.target.addEventListener("mouseout",u,false)
    },u=function(p){
        p.target.style.opacity=1;
        MusicManager.playMouseOver();
        p.target.removeEventListener("mouseout",u,false);
        p.target.addEventListener("mouseover",s,false)
    };
        
    this.load=function(p,C,E){
        var j=StageReference.isFF?".ogg":".mp3";
        EKLoader.add(p+"data.png",r);
        EKLoader.add(E+"Detente-Pasaporte"+j,t,null,null,null,30);
        EKLoader.add(C+"mouseover_0"+j,this.addToMusicList,null,null,{
            id:"mouseover_0"
        });
        EKLoader.add(C+"mouseover_1"+j,this.addToMusicList,null,null,{
            id:"mouseover_1"
        })
    };
        
    var r=function(p){
        SpectrumManager.init(p.source,0)
    },t=function(p){
        b=p.source;
        MusicManager.duration=b.duration;
        b.addEventListener("timeupdate",v,false);
        b.addEventListener("ended",z,false)
    };
        
    this.addToMusicList=function(p){
        a[p.data.id]=p.source
    };
        
    var v=function(){
        var p=MusicManager.currentTime=b.currentTime;
        MusicManager.playedPercentage=p/MusicManager.duration;
        MusicManager.level=SpectrumManager.getLevel(p);
        MusicManager.deltaLevel=SpectrumManager.getLevel(p-1/60)-MusicManager.level;
        for(p=e;p<d.length;p++){
            if(MusicManager.currentTime<d[p][0])break;
            if(MusicManager.currentTime<d[p][1])SubtitleManager.changeSubtitle(d[p][2]);
            else{
                SubtitleManager.changeSubtitle("");
                e++
            }
        }
        for(p=g;p<k.length;p++){
            if(MusicManager.currentTime<k[p][0])break;
            MusicManager.isEffect1Used=false;
            MusicManager.isEffect2Used=!k[p][1]==2;
            g++
        }
        for(p=f;p<h.length;p++){
            if(MusicManager.currentTime<
                h[p][0])break;
            Game.frequency=h[p][1];
            f++
        }
    };
    
    this.reset=function(){
        l=g=e=f=0
    };
    
    var z=function(){
        Game.endGame()
    };
    
    m()
});
var SpectrumManager=new (function(){
    var a=[];
    this.init=function(c){
        var b=DisplayObjectUtil.create("canvas");
        b.width=c.width;
        b.height=c.height;
        var d=b.getContext("2d");
        d.drawImage(c,0,0);
        c=d.getImageData(0,0,b.width,b.height).data;
        for(i=0;i<c.length;i++)i%4<3&&a.push(c[i])
    };
            
    this.getLevel=function(c){
        c=~~(c*60);
        return c<0||c>=a.length?0:a[c]/255
    }
});
var SubtitleManager=new (function(){
    var a={},c={},b={},d="",e=false,g=function(){
        a.style.left=StageReference.stageWidth*0.5+"px";
        a.style.top=StageReference.stageHeight+-140+"px"
    };
        
    this.init=function(){
        a=DisplayObjectUtil.create("div");
        DisplayObjectUtil.addTo(a,StageReference.getLayer("scene2DOverlay"));
        b=DisplayObjectUtil.create("div");
        c=DisplayObjectUtil.create("div");
        b.style.width=c.style.width="500px";
        b.style.left=c.style.left="-250px";
        b.style.textAlign=c.style.textAlign="center";
        b.style.height=
        c.style.height="40px";
        b.style.fontFamily=c.style.fontFamily="Allan";
        b.style.fontSize=c.style.fontSize="24px";
        b.style.fontWeight=c.style.fontWeight="bold";
        this.changeColor("#777");
        c.setAttribute("onMouseOver",DisplayObjectUtil.defaultMouseText);
        b.setAttribute("onMouseOver",DisplayObjectUtil.defaultMouseText);
        c.setAttribute("onSelectStart",DisplayObjectUtil.defaultMouseText);
        b.setAttribute("onSelectStart",DisplayObjectUtil.defaultMouseText);
        DisplayObjectUtil.addTo(b,a);
        DisplayObjectUtil.addTo(c,a);
        StageReference.registerStageResizeFunc(g)
    };
        
    this.changeColor=function(f){
        b.style.color=c.style.color=f
    };
        
    this.show=function(){
        EKTweener.to(a.style,0.5,0,{
            opacity:1
        })
    };
        
    this.hide=function(){
        EKTweener.to(a.style,0.5,0,{
            opacity:0
        })
    };
        
    this.changeSubtitle=function(f){
        d=f;
        e||k()
    };
        
    var k=function(){
        if(b.innerHTML!=d){
            e=true;
            EKTweener.killTweensOf(c.style);
            c.innerHTML=b.innerHTML;
            c.style.top="0px";
            c.style.opacity=1;
            EKTweener.to(c.style,0.5,0,{
                opacity:0,
                top:-30,
                suffix:{
                    top:"px"
                }
            });
            EKTweener.killTweensOf(b.style);
            b.innerHTML=d;
            b.style.top="30px";
            b.style.opacity=0;
            EKTweener.to(b.style,0.5,0,{
                opacity:1,
                top:0,
                suffix:{
                    top:"px"
                },
                onComplete:h
            })
        }
    },h=function(){
        e=false;
        k()
    }
});
var BakedImageManager=new (function(){
    var a=[],c=0;
    this.useBlack=true;
    this.loadAssets=function(b){
        for(var d,e=0;e<4;e++){
            a.push(d=new BakedImage);
            EKLoader.add(b+"ink_"+e+".png",d.addImage,null,null,null,10)
        }
    };
        
    this.drawInk=function(b,d,e){
        a[c].draw(BakedImageManager.useBlack,b,d,e,0);
        c=c+1==a.length?0:c+1
    }
});
function BakedImage(){
    var a={},c={},b=0,d=0;
    this.addImage=function(e){
        c=e.source;
        a=DisplayObjectUtil.create("canvas");
        a.setAttribute("width",c.width);
        a.setAttribute("height",c.height);
        b=-c.width>>1;
        d=-c.height>>1;
        var g=a.getContext("2d");
        g.drawImage(c,0,0);
        CanvasUtil.tintCanvasCtx(g,255,255,255,0,0,a.width,a.height)
    };
        
    this.draw=function(e,g,k,h,f){
        if(f==null)g.drawImage(e?c:a,k+b,h+d);
        else{
            g.save();
            g.translate(k,h);
            g.rotate(f);
            g.drawImage(e?c:a,b,d);
            g.restore()
        }
    }
};

var FloatImageManager=new (function(){
    var a=[],c=[],b=[a,c],d=-1;
    this.life=0;
    this.useBlack=true;
    this.loadAssets=function(e,g){
        for(var k,h=0;h<7;h++){
            a.push(k=new FloatImage);
            EKLoader.add(e+"bird_"+h+"_b"+g,k.addBlackImage);
            EKLoader.add(e+"bird_"+h+"_w"+g,k.addWhiteImage);
            c.push(k=new FloatImage);
            EKLoader.add(e+"note_"+h+"_b"+g,k.addBlackImage);
            EKLoader.add(e+"note_"+h+"_w"+g,k.addWhiteImage)
        }
    };
        
    this.create=function(e,g){
        d=d+1==b.length?0:d+1;
        for(var k=0;k<7;k++)b[d][k].reset(e,g);
        FloatImageManager.life=
        150
    };
    
    this.draw=function(e){
        if(FloatImageManager.life>0){
            for(var g=0;g<7;g++)b[d][g].draw(e,FloatImageManager.useBlack);
            FloatImageManager.life--
        }
    }
});
function FloatImage(){
    var a={},c={},b=0,d=0,e=0,g=0,k=0,h=0,f=0,n=0,l=0,m=0,o=0;
    this.addWhiteImage=function(s){
        a=s.source;
        m=-a.width>>1;
        o=-a.height>>1
    };
        
    this.addBlackImage=function(s){
        c=s.source
    };
        
    this.reset=function(s,u){
        n=f=0;
        b=s;
        d=u;
        l=0;
        e=20+Math.random()*20;
        g=Math.random()*10-5;
        k=-20-Math.random()*20;
        h=Math.random()*30-15
    };
        
    this.draw=function(s,u){
        e+=(k-e)*0.02;
        g+=(h-g)*0.02;
        b+=e;
        d+=g;
        l+=(Math.atan2(d-n,b-f)-l)*0.2;
        s.save();
        s.translate(b,d);
        s.rotate(l);
        s.drawImage(u?c:a,-m,-o);
        s.restore();
        f=b;
        n=
        d
    }
};