var seconds = new Date().getTime();
$(document).ready( function() {
    paper.install(window);
    console.log("load:"+(new Date().getTime() - seconds));
    console.log(window.innerWidth);
    paper.setup('myCanvas');
    $("#myCanvas").attr( "width", window.innerWidth );
    $("#myCanvas").attr( "height", window.innerHeight );
    view.size.width = window.innerWidth;
    view.size.height = window.innerHeight;
    console.log(view.bounds);
    var background = new Path.Rectangle(new Size(window.innerWidth,window.innerHeight));
    var from = background.position;
    var to = background.position + [0,400];
    var stops0 = [['#FFCC99', 0], ['#CC6633', 0.75], ['#CC6633', 1]];
    var gradient = new Gradient(stops0, 'radial');
    var gradientColor = new GradientColor(gradient, from, to);
    background.fillColor = gradientColor;
    
    var path = new Path();
    var pathWrap = new Path();
    pathWrap.visible = true;
    pathWrap.style = {
        strokeCap: 'round',
        strokeJoin: 'round',
        
        fillColor : 'black'
    };
    
    path.style = {
        visible: true
    
    };
    var size = 35;
    var segments = path.segments;
    var wrapSegments = pathWrap.segments;
    var start = new Point(view.center.x/10,view.center.y);
    for (var i = 0; i < size; i++){
        path.add(start.x + i ,start.y + 20);
        if(i>1){
            var vector1 = new Point(segments[i-2].point.x-segments[i-1].point.x,segments[i-2].point.y-segments[i-1].point.y);
            var vector2 = new Point(segments[i].point.x-segments[i-1].point.x,segments[i].point.y-segments[i-1].point.y);
            
            var angle1 = (vector1.angle<0)?(vector1.angle+360):(vector1.angle);
            
            var angle2 = (vector2.angle<0)?(vector2.angle+360):(vector2.angle);
            
            var doubleangle = angle1-angle2;
            if(doubleangle<0){
                doubleangle+=360;
            }
            
            var buildervector = new Point();
            buildervector.angle = doubleangle/2 + angle2;
            buildervector.length = 10;
            pathWrap.add(new Point(segments[i-1].point.x+buildervector.x,segments[i-1].point.y+buildervector.y));
            pathWrap.insert(0,new Point(segments[i-1].point.x-buildervector.x,segments[i-1].point.y-buildervector.y));
        }
    }
    pathWrap.closed = true;
    
    
    var loadingText = new PointText(new Point(view.center.x, view.center.y+100));
    loadingText.justification = 'center';
    loadingText.fillColor = 'black';
    loadingText.content = 'loading...';
    loadingText.characterStyle = {
        fontSize: 15,
        justification: 'center'
    };
    var angle = 0;
    var radius = 60;
    var mode = "loading";
    
    view.onFrame = function(event){
        if(mode == "loading"){
            
            for (var j = 0; j < size; j++) {
                segments[j].point = new Point(view.center.x + Math.cos(angle-0.15*j)*radius,view.center.y + Math.sin(angle-0.15*j)*radius);
            }
            angle += 0.07;
            
            
            
            for (var k = 0; k < size; k++) {
                if(k>1){
                    
                    var vector1 = new Point(segments[k-2].point.x-segments[k-1].point.x,segments[k-2].point.y-segments[k-1].point.y);
                    var vector2 = new Point(segments[k].point.x-segments[k-1].point.x,segments[k].point.y-segments[k-1].point.y);
                    var angle1 = (vector1.angle<0)?(vector1.angle+360):(vector1.angle);
                    var angle2 = (vector2.angle<0)?(vector2.angle+360):(vector2.angle);
                    var doubleangle = angle1-angle2;
                    if(doubleangle<0){
                        doubleangle+=360;
                    }
                    var buildervector1 = new Point();
                    var buildervector2 = new Point();
                    buildervector1.angle = doubleangle/2 + angle2;
                    buildervector2.angle = doubleangle/2 + angle2;
                    buildervector1.length = size/2-k/2+1;
                    buildervector2.length = size/2-k/2+1;
                    wrapSegments[k-2].point.x = segments[k-1].point.x+buildervector1.x;
                    wrapSegments[k-2].point.y = segments[k-1].point.y+buildervector1.y;
                    wrapSegments[2*(size-2)-k+1].point.x = segments[k-1].point.x-buildervector2.x;
                    wrapSegments[2*(size-2)-k+1].point.y = segments[k-1].point.y-buildervector2.y;
                }
            }
            pathWrap.smooth();
            wrapSegments[0].handleOut =0;
            wrapSegments[1].handleOut = 0;
            wrapSegments[1].handleIn = 0;
            wrapSegments[2*size-5].handleIn = 0;
            wrapSegments[2*size-6].handleIn = 0;
            wrapSegments[2*size-6].handleOut = 0;
            var headHandle = new Point(wrapSegments[0].point.x-wrapSegments[2*size-5].point.x,wrapSegments[0].point.y-wrapSegments[2*size-5].point.y);
            var handleOut = new Point(headHandle);
            handleOut.length = 25;
            handleOut.angle += 80
            wrapSegments[2*size-5].handleOut = handleOut;
            var handleIn = new Point(wrapSegments[2*size-5].point.x-wrapSegments[0].point.x,wrapSegments[2*size-5].point.y-wrapSegments[0].point.y);
            handleIn.length = 25;
            handleIn.angle = handleIn.angle-80;
            wrapSegments[0].handleIn = handleIn;
        }
    };
    window.onload = function() {
        console.log("all loaded: " + (new Date().getTime() - seconds));
        console.log(view.bounds);
        mode ="loaded";
        var level = -2;
        loadingText.visible= false;
        
        var g0 = new Point(segments[0].point.x,segments[0].point.y);
        var g1 = new Point(view.center.x+view.size.width/6,view.center.y-300);
        var g2 = new Point(view.center.x+view.size.width/3,view.center.y+150);
        var g3 = new Point(view.size.width+400,view.size.height/2);
        var gcx = 3*(g1.x - g0.x);
        var gbx = 3*(g2.x - g1.x) - gcx;
        var gax = g3.x - g0.x - gcx - gbx;
        var gcy = 3*(g1.y - g0.y);
        var gby = 3*(g2.y - g1.y) - gcy;
        var gay = g3.y - g0.y - gcy - gby;
        var gtspeed = 0.01;
        
        //        var helpath = new Path(g0);
        //        helpath.cubicCurveTo(g1, g2, g3);
        //        helpath.strokeColor='black';
        
        var music = document.getElementById("audio1");
        var music2 = document.getElementById("audio2");
        var music3 = document.getElementById("audio3");
        var tool = new Tool();
        
        var hitOptions = {
            stroke: true,
            fill: true,
            segments: true,
            tolerance: 0
        };
        var angryMaskHitOptions = {
            fill: false,
            stroke: true,
            tolerance: 30,
            segments: true
        };
        
        var stops = new Array(7);
        stops[1] = [['#AF5032', 0], ['#561B0B', 0.75], ['#561B0B', 1]];
        stops[2] = [['#FCFFA6', 0], ['#FFF540', 0.8], ['#FFF540', 1]];
        stops[3] = [['#EF1828', 0], ['#8F0000', 0.75], ['#8F0000', 1]];
        stops[4] = [['#FF784F', 0], ['#AF5032', 0.7], ['#AF5032', 1]];
        stops[5] = [['#FFE224', 0], ['#E0C41A', 0.7], ['#E0C41A', 1]];
        stops[6] = [['#EB7B4C', 0], ['#EF1828', 0.75], ['#EF1828', 1]];
        
        var BamideleB = new Raster('BAMIDELEB');
        var BamideleA = new Raster('BAMIDELEA');
        var BamideleM = new Raster('BAMIDELEM');
        var BamideleI = new Raster('BAMIDELEI');
        var BamideleD = new Raster('BAMIDELED');
        var BamideleE = new Raster('BAMIDELEE');
        var BamideleL = new Raster('BAMIDELEL');
        var BamideleE2 = new Raster('BAMIDELEE2');
        
        BamideleB.visible = false;
        BamideleA.visible = false;
        BamideleM.visible = false;
        BamideleI.visible = false;
        BamideleD.visible = false;
        BamideleE.visible = false;
        BamideleL.visible = false;
        BamideleE2.visible = false;
        
        var greenRaster = new Raster('basket');
        var BrownRaster = new Raster('brownn');
        var germanyRaster = new Raster('germany');
        var angryMask1 = new Raster('angryMask1');
        var angryMask2 = new Raster('angryMask2');
        var angryMask3 = new Raster('angryMask3');
        var angryMask4 = new Raster('angryMask4');
        var angryMask5 = new Raster('angryMask5');
        
        var greenSymbol = new Symbol(greenRaster);
        var germanySymbol = new Symbol(germanyRaster);
        var brownSymbol = new Symbol(BrownRaster);
        var angrySymbol1 = new Symbol(angryMask1);
        
        var angrySymbol2 = new Symbol(angryMask2);
        var angrySymbol3 = new Symbol(angryMask3);
        var angrySymbol4 = new Symbol(angryMask4);
        var angrySymbol5 = new Symbol(angryMask5);
        
        var tambourine = new Raster('tambourine');
        
        
        var masks = new Array();
        var score=0;
        angryMask1.scale(.13);
        angryMask2.scale(.13);
        angryMask3.scale(.13);
        angryMask4.scale(.13);
        angryMask5.scale(.13);
        
        tambourine.scale(.18);
        
        var tambourineSymbol = new Symbol(tambourine);
        var x = view.size.width;
        var y = view.size.height; 
        
        var scoreCount=0;
        
        var eventt;
        tool.onMouseMove = function(event) {
            eventt = event;
        
        
        }
        var pointArray= new Array();
        for(var a2=0;a2<35;a2++){
            pointArray.push(new Point());
        }
        for(var qqq=0;qqq<segments.length;qqq++){
            pointArray[0].x=772;
            pointArray[0].y=260; 
            pointArray[1].x=765.7179317448432;
            pointArray[1].y=252.21953610396199; 
            pointArray[2].x=756.948332590104;
            pointArray[2].y=247.41390080098736; 
            pointArray[3].x=746.9610462625258;
            pointArray[3].y=246.9098057593829; 
            pointArray[4].x=737.4879366274251;
            pointArray[4].y=250.11295949302797; 
            pointArray[5].x=729.5077411971032;
            pointArray[5].y=256.1392751911863; 
            pointArray[6].x=723.6548609643902;
            pointArray[6].y=264.2475298111102; 
            pointArray[7].x=720.317636507215;
            pointArray[7].y=273.6742436034363; 
            pointArray[8].x=719.5864576120497;
            pointArray[8].y=283.6474766511127; 
            pointArray[9].x=721.3326113428311;
            pointArray[9].y=293.4938438567616; 
            pointArray[10].x=725.3422812972356;
            pointArray[10].y=302.6547688568228; 
            pointArray[11].x=731.3728250731579;
            pointArray[11].y=310.6317696570412; 
            pointArray[12].x=739.1194140248974;
            pointArray[12].y=316.9555627919237; 
            pointArray[13].x=748.1620094954166;
            pointArray[13].y=321.22539500836336; 
            pointArray[14].x=757.9665851745456;
            pointArray[14].y=323.19270173387224; 
            pointArray[15].x=767.9595858176614;
            pointArray[15].y=322.81861865929255; 
            pointArray[16].x=777.6254896258489;
            pointArray[16].y=320.2553583192441; 
            pointArray[17].x=786.5623621085825;
            pointArray[17].y=315.768454015901; 
            pointArray[18].x=794.4768332138233;
            pointArray[18].y=309.6560774630118; 
            pointArray[19].x=801.1454876518632;
            pointArray[19].y=302.20429593199447; 
            pointArray[20].x=806.3770248242591;
            pointArray[20].y=293.68191253215616; 
            pointArray[21].x=809.9943839151096;
            pointArray[21].y=284.35910645201903; 
            pointArray[22].x=811.8406760568885;
            pointArray[22].y=274.5310239672611; 
            pointArray[23].x=811.8030833631436;
            pointArray[23].y=264.5310946280419; 
            pointArray[24].x=809.8428741315021;
            pointArray[24].y=254.72509749525693; 
            pointArray[25].x=806.017220893542;
            pointArray[25].y=245.48581303687567; 
            pointArray[26].x=800.4819252258768;
            pointArray[26].y=237.15751778085075; 
            pointArray[27].x=793.4733814086152;
            pointArray[27].y=230.02447400126243; 
            pointArray[28].x=785.2779200601165;
            pointArray[28].y=224.29434195345902; 
            pointArray[29].x=776.2006778102303;
            pointArray[29].y=220.09866880879179; 
            pointArray[30].x=766.5429358171373;
            pointArray[30].y=217.50482617770422; 
            pointArray[31].x=756.5904442805452;
            pointArray[31].y=216.5312183438906; 
            pointArray[32].x=746.6102103228679;
            pointArray[32].y=217.15965302627777; 
            pointArray[33].x=736.851353352081;
            pointArray[33].y=219.34247473766922; 
            pointArray[34].x=727.5462326598176;
            pointArray[34].y=223.00508704344398;     
        
        }
        var hittedShape = new Array();
        for(var qq=0;qq<size;qq++){
            hittedShape.push(new Point());
        }
        
        hittedShape[0].x=608;
        hittedShape[0].y=582; 
        hittedShape[1].x=599.4142627172322;
        hittedShape[1].y=576.8730988588339; 
        hittedShape[2].x=591.4179114317086;
        hittedShape[2].y=570.8682369854429; 
        hittedShape[3].x=583.6619182202769;
        hittedShape[3].y=564.555981500735; 
        hittedShape[4].x=576.1961573225857;
        hittedShape[4].y=557.9029811085431; 
        hittedShape[5].x=569.1496473265294;
        hittedShape[5].y=550.8074404754781; 
        hittedShape[6].x=562.6641044686062;
        hittedShape[6].y=543.1957564411765; 
        hittedShape[7].x=556.8700966264438;
        hittedShape[7].y=535.0453286533264; 
        hittedShape[8].x=551.8758625925561;
        hittedShape[8].y=526.3817481917182; 
        hittedShape[9].x=547.7633916911924;
        hittedShape[9].y=517.2665091336662; 
        hittedShape[10].x=544.5891279679864;
        hittedShape[10].y=507.78367992421937; 
        hittedShape[11].x=542.3866044844931;
        hittedShape[11].y=498.0292506582571; 
        hittedShape[12].x=541.1688177139071;
        hittedShape[12].y=488.10367785960284; 
        hittedShape[13].x=540.9294357713335;
        hittedShape[13].y=478.1065434559065; 
        hittedShape[14].x=541.6432004523701;
        hittedShape[14].y=468.1320489834981; 
        hittedShape[15].x=543.2665097754007;
        hittedShape[15].y=458.264685260509; 
        hittedShape[16].x=545.7390602555035;
        hittedShape[16].y=448.57518093245676; 
        hittedShape[17].x=548.9868698998475;
        hittedShape[17].y=439.11728832817613; 
        hittedShape[18].x=552.926386761031;
        hittedShape[18].y=429.9259768384892; 
        hittedShape[19].x=557.4690050317114;
        hittedShape[19].y=421.017294598849; 
        hittedShape[20].x=562.5252553178244;
        hittedShape[20].y=412.389761171259; 
        hittedShape[21].x=568.0081303722093;
        hittedShape[21].y=404.0268620843392; 
        hittedShape[22].x=573.8353006126647;
        hittedShape[22].y=395.9001107660847; 
        hittedShape[23].x=579.9302348240377;
        hittedShape[23].y=387.97219950529006; 
        hittedShape[24].x=586.222406222841;
        hittedShape[24].y=380.1999038927903; 
        hittedShape[25].x=592.6468287444618;
        hittedShape[25].y=372.5365628940032; 
        hittedShape[26].x=599.1431614003436;
        hittedShape[26].y=364.93408553302913; 
        hittedShape[27].x=605.654574281519;
        hittedShape[27].y=357.3445201771696; 
        hittedShape[28].x=612.1265146702289;
        hittedShape[28].y=349.7212670917089; 
        hittedShape[29].x=618.5054607729478;
        hittedShape[29].y=342.02003039760535; 
        hittedShape[30].x=624.7377095696878;
        hittedShape[30].y=334.19960362309155; 
        hittedShape[31].x=630.7682142836146;
        hittedShape[31].y=326.2225732924919; 
        hittedShape[32].x=636.5394634387538;
        hittedShape[32].y=318.05601445848447; 
        hittedShape[33].x=641.9903740691267;
        hittedShape[33].y=309.6722460158515; 
        hittedShape[34].x=647.0551533446364;
        hittedShape[34].y=301.0497167529051;
        
        var defenceEvolutionVector = new Point();
        var defenceEvolved = false;
        tool.onMouseDown = function(event) {
            
            if(masks.length>0)
            {
                defenceEvolutionVector.x= eventt.point.x-pointArray[0].x;
                defenceEvolutionVector.y= eventt.point.y-pointArray[0].y;
                defenceEvolved = false;
                mode = "defence";
            
            
            }
        }
        tool.onMouseUp = function(event){
            if(mode=="defence"){
                mode="normal";
            }
        }
        var speed =9;
        
        
        var showScore = new PointText(new Point(1300, 30));
        
        showScore.characterStyle = {
            font: 'Pristina',
            fontSize: 26,
            fillColor:'Yellow',
            justification: 'center',
            strokeColor: 'Yellow'
        };
        
        tool.onKeyDown = function(event) {
            if(level==0){
                
                
                if(text.fillColor.alpha==1){
                    if(text1.content.length<11)
                        text1.content += event.character;
                }
                if(event.key== "backspace") {
                    text1.content=text1.content.substr(0,text1.content.length-2);
                }
                
                if(event.key == "enter") {
                    if(text1.content.length>6 &&text1.content.length<11){
                        
                        text.remove();
                        text1.fontSize = 26;
                        text1.position = new Point(100,30);
                        name.remove();
                        level = 1;
                        music.play();
                        pathWrap.visible = true;
                        for(var i=0;i<2;i++){
                            tambourines[i] = tambourineSymbol.place(new Point((view.size.width/4)*(i*2+1),y+95));
                        }
                    }
                }
            }
        }
        
        BamideleB.scale(5);
        BamideleA.scale(5);
        BamideleM.scale(5);
        BamideleI.scale(5);
        BamideleD.scale(5);
        BamideleE.scale(5);
        BamideleL.scale(5);
        BamideleE2.scale(5);
        BamideleB.position= new Point(230,340);
        BamideleA.position= new Point(365,340);
        BamideleM.position= new Point(520,340);
        BamideleI.position= new Point(660,340);
        BamideleD.position= new Point(760,340);
        BamideleE.position= new Point(895,340);
        BamideleL.position= new Point(1020,340);
        BamideleE2.position= new Point(1135,340);
        
        
        var enterNameCounter =0;
        var date = new Date();
        var time = date.getTime();
        var text;
        var text1;
        var name;
        var dance;
        var text2;
        var endOfGameCurveParameters = new Array();
        var endofGameJamLength = 10;
        
        var bamideleLetter = " ";
        view.onFrame = function(event){
            if(level==-2){
                update();
            }
            if(level==-1){
                
                if(new Date().getTime()-time >5000){
                    BamideleB.remove();
                    BamideleA.remove();
                    BamideleM.remove();
                    BamideleI.remove();
                    BamideleD.remove();
                    BamideleE.remove();
                    BamideleL.remove();
                    BamideleE2.remove();
                    name = new Raster('EnterName');
                    name.position = new Point(653,350);
                    text = new PointText(new Point(630, 110));
                    
                    text.content = 'ENTER YOUR NAME';
                    text.characterStyle = {
                        font: 'Algerian',
                        fontSize: 24,
                        fillColor:'#2B2772',
                        justification: 'center',
                        strokeColor: '#2B2772'
                    };
                    text1 = new PointText(new Point(665, 150));
                    text1.characterStyle = {
                        font: 'Exotc350 Bd BT',
                        fontSize: 28,
                        fillColor:'Yellow',
                        justification: 'center'
                    };
                    text.fillColor.alpha = 0;
                    text.strokeColor.alpha = 0;
                    
                    level=0;
                }
                
                
                var scaleFactor = 0.935;
                if(bamideleLetter == " "){
                    BamideleB.visible=true;
                    bamideleLetter = "B";
                }
                if(bamideleLetter == "B"){
                    if(BamideleB.bounds.width>131){
                        BamideleB.scale(scaleFactor);
                    }else{
                        BamideleA.visible=true;
                        bamideleLetter = "A";
                        
                        music3.play();
                    
                    }
                }
                if(bamideleLetter == "A"){
                    if(BamideleA.bounds.width>140){
                        BamideleA.scale(scaleFactor);
                    }else{
                        BamideleM.visible=true;
                        bamideleLetter = "M";
                        
                        if(music3.ended){
                            music3.play();
                        }else{
                            music3.currentTime = 0;
                        }
                    
                    }
                }
                if(bamideleLetter == "M"){
                    if(BamideleM.bounds.width>165){
                        BamideleM.scale(scaleFactor);
                    }else{
                        BamideleI.visible=true;
                        bamideleLetter = "I";
                        
                        if(music3.ended){
                            music3.play();
                        }else{
                            music3.currentTime = 0;
                        }
                    
                    }
                }
                if(bamideleLetter == "I"){
                    if(BamideleI.bounds.width>120){
                        BamideleI.scale(scaleFactor);
                    }else{
                        BamideleD.visible=true;
                        bamideleLetter = "D";
                        
                        if(music3.ended){
                            music3.play();
                        }else{
                            music3.currentTime = 0;
                        }
                    
                    }
                }
                if(bamideleLetter == "D"){
                    if(BamideleD.bounds.width>120){
                        BamideleD.scale(scaleFactor);
                    }else{
                        BamideleE.visible=true;
                        bamideleLetter = "E";
                        
                        if(music3.ended){
                            music3.play();
                        }else{
                            music3.currentTime = 0;
                        }
                    
                    }
                }
                if(bamideleLetter == "E"){
                    if(BamideleE.bounds.width>130){
                        BamideleE.scale(scaleFactor);
                    }else{
                        BamideleL.visible=true;
                        bamideleLetter = "L";
                        
                        if(music3.ended){
                            music3.play();
                        }else{
                            music3.currentTime = 0;
                        }
                    
                    }
                }
                if(bamideleLetter == "L"){
                    if(BamideleL.bounds.width>120){
                        BamideleL.scale(scaleFactor);
                    }else{
                        BamideleE2.visible=true;
                        bamideleLetter = "E2";
                        
                        if(music3.ended){
                            music3.play();
                        }else{
                            music3.currentTime = 0;
                        }
                    
                    }
                }
                if(bamideleLetter == "E2"){
                    if(BamideleE2.bounds.width>130){
                        BamideleE2.scale(scaleFactor);
                    }else{
                        bamideleLetter = "end";
                        
                        if(music3.ended){
                            music3.play();
                        }else{
                            music3.currentTime = 0;
                        }
                    }
                }
            
            
            
            }
            if(level==0){
                
                if(enterNameCounter<250){
                    text.fillColor.alpha+= 0.008;
                    text.strokeColor.alpha += 0.008;
                    enterNameCounter++;
                }
            }
            
            if(level==1){
                if(music.currentTime>1 && music.currentTime<208){
                    level=2;
                    gradient = new Gradient(stops[4], 'radial');
                    gradientColor = new GradientColor(gradient, from, to);
                    background.fillColor = gradientColor;
                    music2.play();
                }
                update();
            }
            if(level==2){
                playTambourine();
                //  
                
                if(music.currentTime>209){
                    
                    dance = new Raster('Dance');
                    dance.scale(.95);
                    dance.position.y= dance.height/2 -40;
                    dance.position.x = x/2;
                    dance.opacity=0;
                    text2= new PointText(new Point(dance.position.x-155,dance.position.y-240));
                    text2.content = text1.content+'\n'+"Your Score "+'\n'+score;
                    text2.characterStyle = {
                        font: 'Tempus Sans ITC',
                        fontSize: 20,
                        fillColor:'black',
                        strokeColor:'black',
                        justification: 'center'
                    };
                    text2.fillColor.alpha = 0;
                    text2.strokeColor.alpha = 0;
                    level=4;
                
                }
                update();
            }
            if(level==3)
                level=4;
            if(level==4){
                for(var bb=baskets.length-1;bb>=0;bb--){
                    baskets[bb].element.opacity-=.02;
                    if(baskets[bb].element.opacity<=0){
                        baskets[bb].element.remove();
                        baskets.splice(bb,1);
                    }
                }
                for(var aa=masks.length-1;aa>=0;aa--){
                    masks[aa].element.opacity-=.02;
                    if(masks[aa].element.opacity<=0){
                        masks[aa].element.remove();
                        masks.splice(aa,1);
                    }
                }
                if(dance.opacity<1)
                    dance.opacity+=.01;
                if(dance.opacity>=1 && mode!="endofGame" && mode!="endofGameJam"){
                    dance.opacity=1;
                    var p0 = new Point(segments[0].point.x,segments[0].point.y);
                    var p1 = new Point(100,y-100);
                    var p2 = new Point(100,100);
                    var p3 = new Point(text2.point.x+20,text2.point.y);
                    var cx = 3*(p1.x - p0.x);
                    var bx = 3*(p2.x - p1.x) - cx;
                    var ax = p3.x - p0.x - cx - bx;
                    var cy = 3*(p1.y - p0.y);
                    var by = 3*(p2.y - p1.y) - cy;
                    var ay = p3.y - p0.y - cy - by;
                    var tspeed = 0.02;
                    var t =0;
                    endOfGameCurveParameters = {
                        p0: p0,
                        ax: ax,
                        bx: bx,
                        cx: cx,
                        ay: ay,
                        by: by,
                        cy: cy,
                        tspeed: tspeed,
                        t: 0
                    };
                    mode="endofGame";
                }
                if(mode=="endofGame"){
                    if(endOfGameCurveParameters.t<=1){
                        //                    console.log(endOfGameCurveParameters.ax*endOfGameCurveParameters.t*endOfGameCurveParameters.t*endOfGameCurveParameters.t + endOfGameCurveParameters.bx*endOfGameCurveParameters.t*endOfGameCurveParameters.t+endOfGameCurveParameters.cx*endOfGameCurveParameters.t + endOfGameCurveParameters.p0.x);
                        var temp = endOfGameCurveParameters.ax*endOfGameCurveParameters.t*endOfGameCurveParameters.t*endOfGameCurveParameters.t + endOfGameCurveParameters.bx*endOfGameCurveParameters.t*endOfGameCurveParameters.t+endOfGameCurveParameters.cx*endOfGameCurveParameters.t + endOfGameCurveParameters.p0.x;
                        segments[0].point.x = temp;
                        //                    console.log(segments[0].point.x);
                        segments[0].point.y = endOfGameCurveParameters.ay*endOfGameCurveParameters.t*endOfGameCurveParameters.t*endOfGameCurveParameters.t + endOfGameCurveParameters.by*endOfGameCurveParameters.t*endOfGameCurveParameters.t+endOfGameCurveParameters.cy*endOfGameCurveParameters.t + endOfGameCurveParameters.p0.y;
                        endOfGameCurveParameters.t+=endOfGameCurveParameters.tspeed;
                    }else{
                        mode="endofGameJam";
                    }
                
                }    
                if(mode=="endofGameJam" && text2.fillColor.alpha<1){
                    text2.fillColor.alpha+= 0.005;
                    text2.strokeColor.alpha += 0.005;   
                }
                update();
            }   
        
        }
        
        music2.loop= false;
        var viewSize = view.size; 
        view.onResize = function(event) {
            console.log(view.bounds);
            background.scale(event.size.width/viewSize.width,event.size.height/viewSize.height);
            background.position = view.center;
            console.log(event.size.height-viewSize.height);
            for(var i=0;i<2;i++){
                tambourines[i].position.y += event.size.height-viewSize.height;
            }
            viewSize = event.size;
        
        }
        var point;
        var tambourines = new Array();
        function placeTambourines(){
        
        }
        function random(){
            return new Point(Math.random()*100+x+100,(Math.random()*(y-100))+50);
        }
        
        var baskets = new Array(); 
        var rotateTambourine=1;
        var tambourineCount =0;
        var tambourinePosition=1;
        var volume=1;
        
        function playTambourine(){
            
            if(tambourinePosition==1){
                for (var e = 0; e < 2; e++) {
                    var tambourineItem = tambourines[e];
                    if(tambourineItem.position.y> y-55){
                        moveTambourine();
                        tambourineItem.position.y--;
                    }
                }
                if(volume==1){
                    music.volume-=.01;
                    
                    if(music.volume<.1)
                        volume=2;
                }
                
                if(tambourineItem.position.y<y-55)
                    tambourinePosition=2;
            }
            if(tambourinePosition==2){
                
                moveTambourine();
                if(music2.currentTime >3.9)
                    tambourinePosition=3;
            
            }
            if(tambourinePosition==3){
                for (var e1 = 0; e1 < 2; e1++) {
                    var tambourineItem1 = tambourines[e1];
                    if(tambourineItem1.position.y< y+95){
                        moveTambourine();
                        tambourineItem1.position.y++;
                    }
                }
                if(volume==2){
                    music.volume+=.01;
                    if(music.volume>.99)
                        volume=0;
                }
                if(tambourineItem1.position.y>y+95)
                    tambourinePosition=0;
            
            }
        }
        function moveTambourine(){
            for (var e = 0; e < 2; e++) {
                var tambourineItem = tambourines[e];
                
                if(rotateTambourine==1){
                    tambourineItem.rotate(1);
                    tambourineCount++;
                    if(tambourineCount==5){
                        rotateTambourine=2;
                        tambourineCount=0;
                    }     
                }
                
                if(rotateTambourine==2){
                    tambourineItem.rotate(-2);
                    tambourineCount++;
                    if(tambourineCount==5){
                        rotateTambourine=3;
                        tambourineCount=0;
                    }     
                }
                if(rotateTambourine==3){
                    tambourineItem.rotate(1);
                    tambourineCount++;
                    if(tambourineCount==5){
                        rotateTambourine=1;
                        tambourineCount=0;
                    }     
                }
            }
        }
        
        function AngryMask(element,p0,p1,p2,p3,speed){
            this.element=element;
            this.type = "mask";
            this.p0 = p0;
            this.p1 = p1;
            this.p2 = p2;
            this.p3 = p3;
            this.p3 = segments[Math.floor(size/2)].point;
            this.cx = 3*(this.p1.x - this.p0.x);
            this.bx = 3*(this.p2.x - this.p1.x) - this.cx;
            this.ax = this.p3.x - this.p0.x - this.cx - this.bx;
            this.cy = 3*(this.p1.y - this.p0.y);
            this.by = 3*(this.p2.y - this.p1.y) - this.cy;
            this.ay = this.p3.y - this.p0.y - this.cy - this.by;
            this.t = 0;
            this.firstTry = true;
            this.speed = speed;
            this.vanishVector=null;
            this.previousPosition = new Point();
            this.dispose = false;
            var randX = 10+(Math.random()*10);
            var randY = 10+(Math.random()*10);
            var rand1X = Math.floor(Math.random()*2);
            var rand1Y = Math.floor(Math.random()*2);
            if(rand1X ==0){
                this.velocityX=randX;
            }
            else {
                this.velocityX=-randX;
            }
            if(rand1Y==1){
                this.velocityY=randY;
            
            }else{
                this.velocityY=-randY;
            }
        }
        AngryMask.prototype.update = function(){
            if(mode=="attacked"||mode=="attackRecovery"){
                this.dispose = true;
            }
            if(this.dispose){
                var disposeWhenAttackedVector = new Point(this.element.position.x-segments[0].point.x,this.element.position.y-segments[0].point.y);
                var normalDisposeWhenAttackedVector = disposeWhenAttackedVector.normalize();
                normalDisposeWhenAttackedVector.length = 10;
                this.element.position.x += normalDisposeWhenAttackedVector.x;
                this.element.position.y += normalDisposeWhenAttackedVector.y;
                if(this.element.bounds.right<0||this.element.bounds.left>x||this.element.bounds.top>y||this.element.bounds.bottom<0){
                    var index = masks.indexOf(this);
                    masks.splice(index,1);
                    this.element.remove();
                }
            }else{
                if(!this.vanishVector){
                    
                    if(this.t<1){
                        this.previousPosition.x = this.element.position.x;
                        this.previousPosition.y = this.element.position.y;
                        this.element.position.x = this.ax*this.t*this.t*this.t + this.bx*this.t*this.t+this.cx*this.t + this.p0.x;
                        this.element.position.y = this.ay*this.t*this.t*this.t + this.by*this.t*this.t+this.cy*this.t + this.p0.y;
                        this.t+=this.speed;
                    }else{
                        this.firstTry = false;
                        this.p0 = this.element.position;
                        this.p3 = segments[Math.floor(size/2)].point;
                        this.cx = 3*(this.p1.x - this.p0.x);
                        this.bx = 3*(this.p2.x - this.p1.x) - this.cx;
                        this.ax = this.p3.x - this.p0.x - this.cx - this.bx;
                        this.cy = 3*(this.p1.y - this.p0.y);
                        this.by = 3*(this.p2.y - this.p1.y) - this.cy;
                        this.ay = this.p3.y - this.p0.y - this.cy - this.by;
                        this.t = 0;
                        this.speed += 0.004;
                    }
                }else{
                    this.element.position.x+=this.vanishVector.x;
                    this.element.position.y+=this.vanishVector.y;
                    if(this.element.position.x<0||this.element.position.y<0||this.element.position.x>x||this.element.position.y>y){
                        var index1 = masks.indexOf(this);
                        masks.splice(index1,1);
                        this.element.remove();
                    }
                }
            }
        }
        var attackVector = new Point();
        var attackedEvolutionShape = new Path();
        var attackedEvolutionVectorsToShape = new Array();
        var attackedEvolved = false;
        AngryMask.prototype.hit = function(){
            if(mode == "attacked"){
                return false;
            }
            if(this.t<0.3 && this.firstTry){
                return false;
            }
            var hitResult;
            hitResult = pathWrap.hitTest(this.element.position,angryMaskHitOptions); 
            if(hitResult){
                if(this.vanishVector){
                    return false;
                }
                if(mode=="defence"){
                    var vector=new Point();
                    vector.x= this.element.position.x-segments[0].point.x;
                    vector.y= this.element.position.y-segments[0].point.y;
                    this.vanishVector= vector;
                    return false;
                }else{
                    attackVector.x = this.element.position.x - this.previousPosition.x;
                    attackVector.y = this.element.position.y - this.previousPosition.y;
                    attackVector.length = 12;
                    var index = masks.indexOf(this);
                    masks.splice(index,1);
                    this.element.remove();
                    
                    attackedEvolutionShape = new Path();
                    
                    
                    var attackVectorCopy = new Point(attackVector.x,attackVector.y);
                    var pathHitIndex = (hitResult.segment.index<size-2)?(hitResult.segment.index+1):(2*(size-2)-hitResult.segment.index);
                    attackVectorCopy.length = 200;
                    var controlPoint = new Point(this.element.position.x + attackVectorCopy.x,this.element.position.y + attackVectorCopy.y);
                    var cx = 3*(controlPoint.x - segments[0].point.x);
                    var bx = -cx;
                    var ax = segments[size-1].point.x - segments[0].point.x - cx - bx;
                    var cy = 3*(controlPoint.y - segments[0].point.y);
                    var by = -cy
                    var ay = segments[size-1].point.y - segments[0].point.y - cy - by
                    for(var i=0;i<size;i++){
                        var t = i/(size-1);
                        attackedEvolutionShape.add(new Point(ax*t*t*t + bx*t*t + cx*t + segments[0].point.x,ay*t*t*t + by*t*t + cy*t + segments[0].point.y));
                    }
                    //                for(var i=pathHitIndex;i<size;i++){
                    //                    var temp = (i-pathHitIndex)*(i-pathHitIndex);
                    //                    attackVectorCopy.length = Math.abs(100-temp)/3.5;
                    //                    if(temp<100){
                    //                        attackedEvolutionShape.add(new Point(segments[i].point.x + attackVectorCopy.x,segments[i].point.y + attackVectorCopy.y));
                    //                    }else{
                    //                        attackedEvolutionShape.add(new Point(segments[i].point.x - attackVectorCopy.x,segments[i].point.y - attackVectorCopy.y));
                    //                    }
                    //                }
                    //                for(var j=pathHitIndex-1;j>=0;j--){
                    //                    var temp2 = (pathHitIndex-j)*(pathHitIndex-j);
                    //                    attackVectorCopy.length = Math.abs(100-temp2)/3.5;
                    //                    if(temp2<100){
                    //                        attackedEvolutionShape.insert(0,new Point(segments[j].point.x + attackVectorCopy.x,segments[j].point.y + attackVectorCopy.y));
                    //                    }else{
                    //                        attackedEvolutionShape.insert(0,new Point(segments[j].point.x - attackVectorCopy.x,segments[j].point.y - attackVectorCopy.y)); 
                    //                    }
                    //                }
                    
                    for (var j = 0; j < size - 1; j++) {
                        var nextSegment = attackedEvolutionShape.segments[j + 1];
                        var position = attackedEvolutionShape.segments[j].point;
                        var angleP = new Point(position.x - nextSegment.point.x,position.y - nextSegment.point.y);
                        var vector1 = new Point();
                        vector1.angle= angleP.angle;
                        var length=10;
                        vector1.length= angleP.length<length?angleP.length:length;
                        nextSegment.point = new Point(position.x - vector1.x,position.y - vector1.y);
                    
                    }
                    
                    attackedEvolutionVectorsToShape = new Array();
                    for(var k=0;k<size;k++){
                        attackedEvolutionVectorsToShape.push(new Point(attackedEvolutionShape.segments[k].point.x-segments[k].point.x,attackedEvolutionShape.segments[k].point.y-segments[k].point.y));
                        attackedEvolutionVectorsToShape[k].length /=5;
                    }
                    
                    
                    
                    mode = "attacked";
                    attackedEvolved = false;
                    return true;
                
                }
            
            
            }
            return false;
        }
        function GreenBasket(element){
            this.element = element;
            this.type=1;
            this.scoreFactor=1;
        
        }
        GreenBasket.prototype.update = function(){
            this.element.rotate(20);
            this.element.position.x -=12;
            if (this.element.bounds.right < 0) {
                this.element.visible = false;
                var n = baskets.indexOf(this);
                baskets.splice(n,1);
                this.element.remove();
            
            }
        }
        GreenBasket.prototype.hit = function(){
            var hitResult = this.element.hitTest(segments[1].point,hitOptions);
            if(hitResult){
                brown1hit= false;
                if(scoreCount<5){
                    score+=100;
                    scoreCount++;
                }else{
                    score+=(100+this.scoreFactor*20);
                    this.scoreFactor++;
                
                } 
                this.element.visible = false;
                var n = baskets.indexOf(this);
                baskets.splice(n,1);
                this.element.remove();
                return true;
            
            }
            return false;
        
        }
        function BrownBasket1(element){
            this.element = element;
            this.movement=1;
            this.moveCount =0;
            this.type=2;
        
        }
        BrownBasket1.prototype.update = function(){
            
            if(this.movement == 1){
                this.element.position.x -=.5;
                this.element.position.y +=1;
                this.moveCount++;
                if(this.moveCount==10){
                    this.movement=2;
                    this.moveCount=0;
                }
            }
            if(this.movement ==2){
                this.element.position.x +=.5;
                this.element.position.y -=1;
                this.moveCount++;
                if(this.moveCount==10){
                    this.movement=3;
                    this.moveCount=0;
                }
            }
            if(this.movement==3){
                this.element.position.x +=1;
                this.element.position.y +=.5;
                this.moveCount++;
                if(this.moveCount==10){
                    this.movement=4;
                    this.moveCount=0;
                }
            }
            if(this.movement==4){
                this.element.position.x -=1;
                this.element.position.y -=.5;
                this.moveCount++;
                if(this.moveCount==10){
                    this.movement=1;
                    this.moveCount=0;
                }
            }
            this.element.position.x -=12 ;
            
            if (this.element.bounds.right < 0) {
                this.element.visible = false;
                var n = baskets.indexOf(this);
                baskets.splice(n,1);
                this.element.remove();
            
            }
        
        
        
        }
        var brown1hit;
        var brown1hitTime;
        BrownBasket1.prototype.hit = function(){
            var hitResult = this.element.hitTest(segments[1].point,hitOptions);
            if(hitResult){
                brown1hit=true;
                brown1hitTime = new Date().getTime();
                if(score==0 || score<0){
                    score=0;
                }else{
                    score-=100;
                }
                scoreCount=0;
                this.element.visible = false;
                var n = baskets.indexOf(this);
                baskets.splice(n,1);
                this.element.remove();
                return true;
            
            }
            return false;
        
        }
        function BrownBasket2(element){
            this.element = element;
            this.type=3;
        
        }
        BrownBasket2.prototype.update = function(){
            this.element.rotate(20);
            this.element.position.x -=12 ;
            if (this.element.bounds.right < 0) {
                this.element.visible = false;
                var n = baskets.indexOf(this);
                baskets.splice(n,1);
                this.element.remove();
            
            }
        }
        BrownBasket2.prototype.hit = function(){
            
            var hitResult = this.element.hitTest(segments[1].point,hitOptions);
            if(hitResult){
                if(score==0 || score<0){
                    score=0;
                }else{
                    score-=100;
                }
                scoreCount=0;
                var n = baskets.indexOf(this);
                baskets.splice(n,1);
                this.element.remove();
                var newPoint = new Point(this.element.position.x - segments[1].point.x,this.element.position.y - segments[1].point.y);
                newPoint.x = this.element.position.x+newPoint.x;
                newPoint.y = this.element.position.y+newPoint.y;
                var mask1 = new AngryMask(angrySymbol1.place(this.element.position),newPoint,new Point(2*x,0),new Point(-x,0),segments[Math.floor(size/2)].point,0.0025+Math.random()*0.005);
                masks.push(mask1);
                var mask2 = new AngryMask(angrySymbol2.place(this.element.position),newPoint,new Point(x,-y),new Point(x,2*y),segments[Math.floor(size/2)].point,0.0025+Math.random()*0.005);
                masks.push(mask2);
                var mask3 = new AngryMask(angrySymbol3.place(this.element.position),newPoint,new Point(x,2*y),new Point(x,-y),segments[Math.floor(size/2)].point,0.0025+Math.random()*0.005);
                masks.push(mask3);
                var mask4 = new AngryMask(angrySymbol4.place(this.element.position),newPoint,new Point(2*x,y),new Point(-x,y),segments[Math.floor(size/2)].point,0.0025+Math.random()*0.005);
                masks.push(mask4);
                var mask5 = new AngryMask(angrySymbol5.place(this.element.position),newPoint,new Point(-x,-y/2),new Point(2*x,y/4),segments[Math.floor(size/2)].point,0.003+Math.random()*0.004);
                masks.push(mask5);
                
                return true; 
            }
            return false;
        
        }
        var basketArrivalSpeed = 70;
        var basketMakingFrameCounter = 0;
        var goodOrBadProbability = 0.5;
        var badOrMasksProbability = 0.5;
        function manage(){
            if(level ==1){
                if(++basketMakingFrameCounter==Math.floor(1000/basketArrivalSpeed)){
                    basketMakingFrameCounter = 0;
                    var newPos = random();
                    for (var h = 0; h < baskets.length; h++) {
                        while((Math.abs(newPos.x-baskets[h].element.position.x)<85) && (Math.abs(newPos.y-baskets[h].element.position.y)<85)){
                            newPos=random();
                            h=0;
                        }
                    }
                    var rand = Math.random();
                    if(rand>goodOrBadProbability){
                        if(goodOrBadProbability<0.5){
                            goodOrBadProbability = 0.5 + 0.23;
                        }else{
                            goodOrBadProbability += 0.23;
                        }
                        var newPlacedSymbol;
                        newPlacedSymbol = greenSymbol.place(newPos);
                        newPlacedSymbol.scale(Math.random() * (.7-.5) + .5);
                        baskets.push(new GreenBasket(newPlacedSymbol));                    
                    }else{
                        if(goodOrBadProbability>0.5){
                            goodOrBadProbability = 0.5 - 0.23;
                        }else{
                            goodOrBadProbability -= 0.23;
                        }
                        var newPlacedSymbol1;
                        newPlacedSymbol1 = brownSymbol.place(newPos);
                        newPlacedSymbol1.scale(Math.random() * (.7-.5) + .5);
                        baskets.push(new BrownBasket1(newPlacedSymbol1));
                    }
                }
            
            }
            if(level==2){
                if(masks.length==0 && mode!="attackRecovery" && mode!="attacked"){
                    
                    if(++basketMakingFrameCounter==Math.floor(1000/basketArrivalSpeed)){
                        basketMakingFrameCounter = 0;
                        var newPos1 = random();
                        for (var g = 0; g < baskets.length; g++) {
                            while((Math.abs(newPos1.x-baskets[g].element.position.x)<85) && (Math.abs(newPos1.y-baskets[g].element.position.y)<85)){
                                newPos1=random();
                                g=0;
                            }
                        }
                        var rand1 = Math.random();
                        if(rand1>goodOrBadProbability){
                            if(goodOrBadProbability<0.5){
                                goodOrBadProbability = 0.5 + 0.23;
                            }else{
                                goodOrBadProbability += 0.23;
                            }
                            var newPlacedSymbol2;
                            newPlacedSymbol2 = greenSymbol.place(newPos1);
                            newPlacedSymbol2.scale(Math.random() * (.7-.5) + .5);
                            baskets.push(new GreenBasket(newPlacedSymbol2));                    
                        }else{
                            if(goodOrBadProbability>0.5){
                                goodOrBadProbability = 0.5 - 0.23;
                            }else{
                                goodOrBadProbability -= 0.23;
                            }
                            var rand2 = Math.random();
                            if(rand2>badOrMasksProbability){
                                var newPlacedSymbol3;
                                newPlacedSymbol3 = brownSymbol.place(newPos1);
                                newPlacedSymbol3.scale(Math.random() * (.7-.5) + .5);
                                baskets.push(new BrownBasket1(newPlacedSymbol3));
                            }else{
                                var newPlacedSymbol4;
                                newPlacedSymbol4 = germanySymbol.place(newPos1);
                                newPlacedSymbol4.scale(Math.random() * (.75-.6) + .6);
                                baskets.push(new BrownBasket2(newPlacedSymbol4))
                            }
                        }
                    }
                
                
                }else{
                    for(var i=0;i<baskets.length;i++){
                        var disposeWhenAttackedVector = new Point(baskets[i].element.position.x-segments[0].point.x,baskets[i].element.position.y-segments[0].point.y);
                        var normalDisposeWhenAttackedVector = disposeWhenAttackedVector.normalize();
                        normalDisposeWhenAttackedVector.length = 10;
                        baskets[i].element.position.x += normalDisposeWhenAttackedVector.x;
                        baskets[i].element.position.y += normalDisposeWhenAttackedVector.y;
                        if(baskets[i].element.bounds.right<0||baskets[i].element.bounds.left>x||baskets[i].element.bounds.top>y||baskets[i].element.bounds.bottom<0){
                            baskets[i].element.remove();
                            baskets.splice(i,1);
                        }
                    
                    }
                }
            
            }
        }
        
        function update(){
            
            manage();
            pathUpdate();
            showScore.content = score;
            
            for (var m = 0; m<baskets.length;m++){
                if(baskets[m].hit())
                    continue;
                baskets[m].update();
            }
            for (var r = 0 ; r<masks.length;r++){
                if( masks[r].hit())
                    continue;
                
                masks[r].update();
            }
        }
        
        var t = 0;
        function pathUpdate(){
            if(mode=="defence"){
                if(!defenceEvolved){
                    for(var a3=0;a3<pointArray.length;a3++){
                        segments[a3].point.x+=(defenceEvolutionVector.x+pointArray[a3].x-segments[a3].point.x)/5; 
                        segments[a3].point.y+=(defenceEvolutionVector.y+pointArray[a3].y-segments[a3].point.y)/5;
                    }
                    if(Math.abs(segments[size-1].point.x-(defenceEvolutionVector.x+pointArray[size-1].x))<5){
                        for(var a4=0;a4<pointArray.length;a4++){
                            segments[a4].point.x=defenceEvolutionVector.x+pointArray[a4].x; 
                            segments[a4].point.y=defenceEvolutionVector.y+pointArray[a4].y;
                        
                        }
                        defenceEvolved = true;
                    }
                }else{
                    path.position = eventt.point;
                    path.rotate(-20);
                }
                if(masks.length==0){
                    mode = "normal";
                }
            }
            
            if(mode=="attacked"){
                if(!attackedEvolved){
                    var evolvedSegmentsCounter = 0;
                    for(var i=0;i<size;i++){
                        segments[i].point.x += (attackedEvolutionVectorsToShape[i].x);
                        segments[i].point.y += (attackedEvolutionVectorsToShape[i].y);
                        if(Math.abs(attackedEvolutionShape.segments[i].point.x-segments[i].point.x)<1 && Math.abs(attackedEvolutionShape.segments[i].point.y-segments[i].point.y)<1)
                            evolvedSegmentsCounter++;
                    }
                    if(evolvedSegmentsCounter==size){
                        attackedEvolved = true;
                    }
                }else{
                    path.position.x += attackVector.x;
                    path.position.y += attackVector.y;
                    if(path.bounds.right>x||path.bounds.left<0||path.bounds.top<0||path.bounds.bottom>y){
                        mode="attackRecovery";
                    }
                }
            }
            if(mode=="attackRecovery"){
                var p0 = segments[0].point;
                var p1 = new Point(x-100,y-100);
                var p2 = new Point(x-100,100);
                var p3 = eventt.point;
                var cx = 3*(p1.x - p0.x);
                var bx = 3*(p2.x - p1.x) - cx;
                var ax = p3.x - p0.x - cx - bx;
                var cy = 3*(p1.y - p0.y);
                var by = 3*(p2.y - p1.y) - cy;
                var ay = p3.y - p0.y - cy - by;
                var tspeed = 0.02;
                if(t<1){
                    segments[0].point.x = ax*t*t*t + bx*t*t+cx*t + p0.x;
                    segments[0].point.y = ay*t*t*t + by*t*t+cy*t + p0.y;
                    t+=tspeed;
                }else{
                    t=0;
                    mode = "normal";
                
                }
            }
            if(mode=="loaded"){
                if(t<1){
                    segments[0].point.x = gax*t*t*t + gbx*t*t+gcx*t + g0.x;
                    segments[0].point.y = gay*t*t*t + gby*t*t+gcy*t + g0.y;
                    t+=gtspeed;
                }else{
                    t=0;
                    mode = "normal";
                    pathWrap.visible = false;
                    level = -1;
                }
            }
            
            if(mode=="normal"){
                if(eventt){
                    segments[0].point = eventt.point;
                }else{
                    segments[0].point.y=400;
                    segments[0].point.x=330;
                
                }
            }
            
            if(mode=="normal"||mode=="attackRecovery"||mode=="endofGame"||mode=="endofGameJam"||mode=="loaded"){
                for (var j = 0; j < size - 1; j++) {
                    var nextSegment = segments[j + 1];
                    var position = path.segments[j].point;
                    var angleP = new Point(position.x - nextSegment.point.x,position.y - nextSegment.point.y);
                    var vector = new Point();
                    vector.angle= angleP.angle;
                    var length=10;
                    if(mode=='endofGameJam'){
                        if(endofGameJamLength>0){
                            endofGameJamLength -= 0.005;
                        }
                        length = endofGameJamLength;
                    }
                    //                console.log(length);
                    vector.length= angleP.length<length?angleP.length:length;
                    nextSegment.point = new Point(position.x - vector.x,position.y - vector.y);
                
                }
            }
            
            
            for (var k = 0; k < size; k++) {
                if(k>1){
                    
                    var vector1 = new Point(segments[k-2].point.x-segments[k-1].point.x,segments[k-2].point.y-segments[k-1].point.y);
                    var vector2 = new Point(segments[k].point.x-segments[k-1].point.x,segments[k].point.y-segments[k-1].point.y);
                    var angle1 = (vector1.angle<0)?(vector1.angle+360):(vector1.angle);
                    var angle2 = (vector2.angle<0)?(vector2.angle+360):(vector2.angle);
                    var doubleangle = angle1-angle2;
                    if(doubleangle<0){
                        doubleangle+=360;
                    }
                    var buildervector1 = new Point();
                    var buildervector2 = new Point();
                    buildervector1.angle = doubleangle/2 + angle2;
                    buildervector2.angle = doubleangle/2 + angle2;
                    buildervector1.length = size/2-k/2+1;
                    buildervector2.length = size/2-k/2+1;
                    if(brown1hit){
                        buildervector1.length += -3/2+3*Math.random();
                        buildervector2.length += -3/2+3*Math.random();
                        if((new Date().getTime() - brown1hitTime) > 1000){
                            brown1hit = false;
                        }
                    }
                    wrapSegments[k-2].point.x = segments[k-1].point.x+buildervector1.x;
                    wrapSegments[k-2].point.y = segments[k-1].point.y+buildervector1.y;
                    wrapSegments[2*(size-2)-k+1].point.x = segments[k-1].point.x-buildervector2.x;
                    wrapSegments[2*(size-2)-k+1].point.y = segments[k-1].point.y-buildervector2.y;
                }
            }
            pathWrap.smooth();
            wrapSegments[0].handleOut =0;
            wrapSegments[1].handleOut = 0;
            wrapSegments[1].handleIn = 0;
            wrapSegments[2*size-5].handleIn = 0;
            wrapSegments[2*size-6].handleIn = 0;
            wrapSegments[2*size-6].handleOut = 0;
            var headHandle = new Point(wrapSegments[0].point.x-wrapSegments[2*size-5].point.x,wrapSegments[0].point.y-wrapSegments[2*size-5].point.y);
            var handleOut = new Point(headHandle);
            handleOut.length = 25;
            handleOut.angle += 80
            wrapSegments[2*size-5].handleOut = handleOut;
            var handleIn = new Point(wrapSegments[2*size-5].point.x-wrapSegments[0].point.x,wrapSegments[2*size-5].point.y-wrapSegments[0].point.y);
            handleIn.length = 25;
            handleIn.angle = handleIn.angle-80;
            wrapSegments[0].handleIn = handleIn;
            if(mode=="normal") 
                path.position.x -= speed;
        
        
        
        }
        view.draw();
    
    }

});
console.log(new Date().getTime() - seconds);
console.log(new Date().getTime() - seconds);
