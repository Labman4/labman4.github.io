var b=function(f){var e="",h="",k=[],w,l,n,q,x,y,z,A,B,C,D,g=new Date,r=new Date,t,u,m,p;f.m3=function(a){console.log(a.context)};f.openZDdiy=function(a){b.gettoday();w=a.id;l=a.width;n=a.itemheight;y=a.selectimg;z=a.leftimg;A=a.rightimg;B=a.isfromtoday;C=a.titlebac;D=a.mainbac;m=a.datelong;q=a.daytextsize;p=a.daterange;x=document.getElementById(w);$(x).append('<div class="CNMmain"></div>');$(".CNMmain").css({width:l+"px",height:"auto","float":"left","background-color":D});$(".CNMmain").append('<div class="CNMtitle"></div>');
$(".CNMtitle").css({width:l+"px",height:"50px","float":"left","background-color":C});$(".CNMtitle").append('<img class="CNMleftjiantou" src="'+z+'"/><span class="CNMnianyueri">1</span><img class="CNMrightjiantou" src="'+A+'"/>');$(".CNMleftjiantou").css({width:"30px",height:"30px","float":"left",padding:"10px"});$(".CNMrightjiantou").css({width:"30px",height:"30px","float":"right",padding:"10px"});$(".CNMnianyueri").css({width:l-100+"px",height:"50px","float":"left","line-height":"50px","text-align":"center",
"font-size":"18px"});$(".CNMmain").append('<div class="CNMweek"></div>');$(".CNMweek").css({width:l,height:"auto","float":"left"});$(".CNMweek").append("<i class='CNMweekitem'>\u65e5</i><i class='CNMweekitem'>\u4e00</i><i class='CNMweekitem'>\u4e8c</i><i class='CNMweekitem'>\u4e09</i><i class='CNMweekitem'>\u56db</i><i class='CNMweekitem'>\u4e94</i><i class='CNMweekitem'>\u516d</i>");$(".CNMweekitem").css({width:l/7+"px",height:"50px","line-height":"50px","float":"left","text-align":"center","font-size":"18px"});
$(".CNMmain").append('<div class="CNMday"></div>');$(".CNMday").css({width:l,height:"auto","float":"left"});for(a=0;a<b.getwhichday();a++)$(".CNMday").append("<i class='CNMdayitem'></i>");t=b.getMonthDay(1);for(a=0;21>a;a++)$(".CNMday").append("<i class='CNMdayitem' value='"+b.getMonthDay(a+1)+"'>"+(a+1)+"</i>");a=b.getcnmteleonemillon();for(var c=0;10>c;c++){var d=a+86400*(c+1),f=b.getYearonly(),v=b.getMonthonly();d=b.getMillonDate(v,1E3*d);"false"!=d&&($(".CNMday").append("<i class='CNMdayitem' value='"+
(f+"-"+v+"-"+d)+"'>"+d+"</i>"),u=f+"-"+v+"-"+d)}$(".CNMnianyueri").html(b.getYearonly()+"\u5e74"+b.getMonthonly()+"\u6708");$(".CNMdayitem").css({width:l/7+"px",height:n+"px","line-height":n+"px","float":"left","text-align":"center","font-size":q+"px"});$("i").css("font-style","normal");$(".CNMleftjiantou").click(function(){var a=b.hangedatetomillon(t)-86400;g=new Date(1E3*a);b.reloadcanlder()});$(".CNMrightjiantou").click(function(){var a=b.hangedatetomillon(u)+86400;g=new Date(1E3*a);b.reloadcanlder()});
$(".CNMdayitem").click(function(){var a=$(this).attr("value");0==$(this).attr("isallowuse")&&(""==e?(e=a,b.getCNMdatearray()):""!=e&&""==h?((b.hangedatetomillon(e)>b.hangedatetomillon(a)?(b.hangedatetomillon(e)-b.hangedatetomillon(a))/86400:(b.hangedatetomillon(a)-b.hangedatetomillon(e))/86400)>m-1?p("false","",""):h=a,b.getCNMdatearray()):""!=e&&""!=h&&(h=e="",e=a,b.getCNMdatearray()))});k=[];b.getCNMdatearray()};f.getCNMdatearray=function(){if(""!=e&&""!=h)if(k=[],b.hangedatetomillon(e)>b.hangedatetomillon(h)){k.push(h);
for(var a=0;a<m;a++){var c=b.hangedatetomillon(h)+86400*(a+1);if(c<=b.hangedatetomillon(e))k.push(b.getMillonDateCNM(1E3*c));else break}b.getSelectArrayListthis(h,e)}else{k.push(e);for(a=0;a<m;a++)if(c=b.hangedatetomillon(e)+86400*(a+1),c<=b.hangedatetomillon(h))k.push(b.getMillonDateCNM(1E3*c));else break;b.getSelectArrayListthis(e,h)}else""!=e&&""==h?(k=[],k.push(e),b.getSelectArrayListthis(e,"")):k=[];b.scanArrayDateList()};f.getSelectArrayListthis=function(a,c){var d=[];if(""!=e&&""==h)d.push(e),
p(d,e,"");else{for(var f=0;f<m;f++){var g=b.hangedatetomillon(a)+86400*f;if(g<=b.hangedatetomillon(c))d.push(b.getMillonDateCNM(1E3*g));else break}p(d,a,c)}};f.scanArrayDateList=function(){$(".CNMday>i").each(function(){var a=0,c=0,d=$($(this)).attr("value");if("undefined"!=typeof d){for(var e=0;e<k.length;e++)d==k[e]&&(a=1);B&&(b.hangedatetomillon(d)<b.hangedatetomillon(b.gettodaydonmove())?(c=1,b.setdayitemnoclick($(this))):b.setdayitemyesclick($(this)));$($(this)).attr("isallowuse",c);1==a?b.setdayitemback($(this)):
0==a&&b.setdayitembackdel($(this))}})};f.setdayitemback=function(a){$(a).css({"background-image":"url("+y+")","background-position":"center","background-repeat":"no-repeat","background-size":l/8+"px "+l/8+"px"})};f.setdayitembackdel=function(a){$(a).css({"background-image":"","background-position":"","background-repeat":"","background-size":""})};f.setdayitemnoclick=function(a){$(a).css("color","#ccc")};f.setdayitemyesclick=function(a){$(a).css("color","#000")};f.reloadcanlder=function(){$(".CNMday").html("");
for(var a=0;a<b.getwhichday();a++)$(".CNMday").append("<i class='CNMdayitem'></i>");t=b.getMonthDay(1);for(a=0;21>a;a++)$(".CNMday").append("<i class='CNMdayitem' value='"+b.getMonthDay(a+1)+"'>"+(a+1)+"</i>");a=b.getcnmteleonemillon();for(var c=0;10>c;c++){var d=a+86400*(c+1),f=b.getYearonly(),g=b.getMonthonly();d=b.getMillonDate(g,1E3*d);"false"!=d&&($(".CNMday").append("<i class='CNMdayitem' value='"+(f+"-"+g+"-"+d)+"'>"+d+"</i>"),u=f+"-"+g+"-"+d)}$(".CNMnianyueri").html(b.getYearonly()+"\u5e74"+
b.getMonthonly()+"\u6708");$(".CNMdayitem").css({width:l/7+"px",height:n+"px","line-height":n+"px","float":"left","text-align":"center","font-size":q+"px"});$("i").css("font-style","normal");$(".CNMdayitem").click(function(){var a=$(this).attr("value");0==$(this).attr("isallowuse")&&(""==e?(e=a,b.getCNMdatearray()):""!=e&&""==h?((b.hangedatetomillon(e)>b.hangedatetomillon(a)?(b.hangedatetomillon(e)-b.hangedatetomillon(a))/86400:(b.hangedatetomillon(a)-b.hangedatetomillon(e))/86400)>m-1?p("false",
"",""):h=a,b.getCNMdatearray()):""!=e&&""!=h&&(h=e="",e=a,b.getCNMdatearray()))});k=[];b.getCNMdatearray()};f.gettodaydonmove=function(){var a=r.getFullYear(),c=r.getMonth()+1,d=r.getDate();a+="-";10>c&&(a+="0");a+=c+"-";10>d&&(a+="0");return a+d};f.gettoday=function(){var a=g.getFullYear(),c=g.getMonth()+1,d=g.getDate();a+="-";10>c&&(a+="0");a+=c+"-";10>d&&(a+="0");return a+d};f.getwhichday=function(){var a=g.getFullYear(),c=g.getMonth()+1;a+="-";10>c&&(a+="0");a+=c+"-0";return(new Date(1E3*b.hangedatetomillon(a+
1))).getDay()};f.hangedatetomillon=function(a){a=a.replace(/\-/g,"/");a=(new Date(a)).getTime();return a/1E3};f.getMillonDate=function(a,c){var d=new Date(c);d.getFullYear();var e=d.getMonth()+1;d=d.getDate();10>d&&(d="0"+d);return parseInt(e)==parseInt(a)?d:"false"};f.getcnmteleonemillon=function(){var a=g.getFullYear(),c=g.getMonth()+1;a+="-";10>c&&(a+="0");return b.hangedatetomillon(a+(c+"-21"))};f.getMonthDay=function(a){var c=g.getFullYear(),d=g.getMonth()+1;c+="-";10>d&&(c+="0");c+=d+"-";10>
a&&(c+="0");return c+a};f.getMonthonly=function(){var a=g.getMonth()+1;10>a&&(a="0"+a);return a};f.getYearonly=function(){return g.getFullYear()};f.getMillonDateCNM=function(a){var c=new Date(a),d=c.getFullYear();a=c.getMonth()+1;c=c.getDate();d+="-";10>a&&(d+="0");d+=a+"-";10>c&&(d+="0");return d+c};return f}(window.b||{});