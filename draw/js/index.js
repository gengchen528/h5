new Image().src="decode.png";
new Image().src="234.png";
var start, showDecode, jumpToDecode, lastTime, lastAcc, isStarted = false;

start = function() {
	isStarted = true;
	$('.decode').hide();
	$('.result').show();
	setTimeout(showDecode, 3000);
}

showDecode = function(){
	$('.result').hide();
	$('.decode').show();
	setTimeout(jumpToDecode, 3000);
}

jumpToDecode = function(){
	var urls = [
	"http://mp.weixin.qq.com/s?__biz=MzA3Njk5ODcyNg==&mid=211601542&idx=1&sn=c788d7b644eb0e88867eb6c8c5cdb157#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA3Njk5ODcyNg==&mid=211601516&idx=1&sn=f099e1245475329b7b03e07d9a3d6878#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA3Njk5ODcyNg==&mid=211601499&idx=1&sn=3741bd14f6db2e91f5e9c1a3633565eb#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA3Njk5ODcyNg==&mid=211601447&idx=1&sn=1cb34f1cbc0bddd51ac1b47a7db5fee2#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA3Njk5ODcyNg==&mid=211601462&idx=1&sn=c396620fe76b29d2eed3012364946ea9#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA3Njk5ODcyNg==&mid=211601487&idx=1&sn=a33edb213cad7143773c403c0c3bc403#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA3Njk5ODcyNg==&mid=211601432&idx=1&sn=f157a6b3e21fb7f50816792138115d25#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA3Njk5ODcyNg==&mid=211601405&idx=1&sn=2879e3adb3209ce79ec06c5ab26057dc#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA3Njk5ODcyNg==&mid=211598920&idx=1&sn=cc628327018cf9f637a8b3e2ecd98ace#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA3Njk5ODcyNg==&mid=211598882&idx=1&sn=c9ba09fb6d8583bd61e825d14e708c1e#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA3Njk5ODcyNg==&mid=211598438&idx=1&sn=948cef4383e8fae07dc07bb75602102c#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA3Njk5ODcyNg==&mid=211598245&idx=1&sn=347b044e158b3ce249de5274d0eb6a97#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA3Njk5ODcyNg==&mid=211598226&idx=1&sn=650482e374c9834f38ae204d9ecef5f5#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA3Njk5ODcyNg==&mid=211598171&idx=1&sn=b974c291e7a63548985c97c529a6b604#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA3Njk5ODcyNg==&mid=211598195&idx=1&sn=58881d0da007946abf45930953e57ae6#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA3Njk5ODcyNg==&mid=211598206&idx=1&sn=2438da193c66ce2e0f5a527957089373#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA3Njk5ODcyNg==&mid=211598144&idx=1&sn=b18cae7fa0b428c651f42122ebd4742d#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA3Njk5ODcyNg==&mid=211598130&idx=1&sn=f9291e48e41a007f9118847f65815433#rd", 
	"http://mp.weixin.qq.com/s?__biz=MzA3Njk5ODcyNg==&mid=211598103&idx=1&sn=3c907e80005a3bf4e5462ec1076b3b32#rd"
	];
	var jumpTo = urls[parseInt(Math.random() * urls.length)];
	window.location = jumpTo;
}

$('.do').click(start);

//摇一摇
$(window).on('deviceorientation', function(e) {
	if (isStarted) {
		return true;
	}
	if (!lastAcc) {
		lastAcc = e;
		return true;
	}
	var speed = e.alpha + e.beta + e.gamma - lastAcc.alpha - lastAcc.beta - lastAcc.gamma;
	if (Math.abs(speed) > 50) {
		start();
	}
	lastAcc = e;
});

//微信分享  失效了，有时间的可以根据官方公布的 JS-SDK进行开发

var shareMeta = {
	img_url: "http://www.imeiwen.com/2015/thumbnail.gif",
	image_width: 100,
	image_height: 100,
	link: 'http://www.imeiwen.com/2015/index.html',
	title: "2015乙未羊，为自己摇枚新年签！",
	desc: "这是对过去的感悟和对新年的祈望，希望它能为你带来好运...",
	appid: ''
};
document.addEventListener('WeixinJSBridgeReady', function () {
	WeixinJSBridge.on('menu:share:appmessage', function(){
		WeixinJSBridge.invoke('sendAppMessage', shareMeta);
	});
	WeixinJSBridge.on('menu:share:timeline', function(){
		WeixinJSBridge.invoke('shareTimeline', shareMeta);
	});
	WeixinJSBridge.on('menu:share:weibo', function(){
		WeixinJSBridge.invoke('shareWeibo', {
			content: shareMeta.title + shareMeta.desc,
			url: shareMeta.link
		});
	});
});