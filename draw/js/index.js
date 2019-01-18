new Image().src = "decode.png";
new Image().src = "234.png";
var start, showDecode, jumpToDecode, lastTime, lastAcc, isStarted = false;

start = function () {
  isStarted = true;
  $('.decode').hide();
  $('.result').show();
  setTimeout(showDecode, 3000);
}

showDecode = function () {
  $('.result').hide();
  $('.decode').show();
  setTimeout(jumpToDecode, 3000);
}

jumpToDecode = function () {
  var urls = [
	"https://mp.weixin.qq.com/s/VGP1xQc9dGX6ouUv4pj6ZA",//自由
	"https://mp.weixin.qq.com/s/hhbUVE8t4tHGOlM86aS0Qg",//转运
	"https://mp.weixin.qq.com/s/E73nvD4PpuK1fEmJl33QNw",//知足
	"https://mp.weixin.qq.com/s/BRRlm0wUSFu54wyLE_iSkA", //喜结
	"https://mp.weixin.qq.com/s/KXn1psaXcvHProB_34Q5ug", //勇气
	"https://mp.weixin.qq.com/s/8aYFTJeBp0lviETaNHWtRg", //佑儿
	"https://mp.weixin.qq.com/s/vh8LnRcbBp4YR4RmOl9j5g", //温柔
	"https://mp.weixin.qq.com/s/yUDUwA-aCq8k42U2sPBEvQ", //任性
	"https://mp.weixin.qq.com/s/cNaYd6y-Bnw3ANU0tzygmw", //勤学
	"https://mp.weixin.qq.com/s/jivIU5mJys07cotH2LZYLQ", //气愈
	"https://mp.weixin.qq.com/s/iX-58_CL31p1psi2hDuJbA", //你谢见
	"https://mp.weixin.qq.com/s/YNdaFfR0OM7Kjf1KzVRSFw", //蜜恋
	"https://mp.weixin.qq.com/s/L3li5J4sWGFE3PKxoGm-kQ", //旅行
	"https://mp.weixin.qq.com/s/itEi-7cRz0NpFACA46xwDw", //孤独
	"https://mp.weixin.qq.com/s/zKH0grKlLSfFOUP83jkH3w", //利事
	"https://mp.weixin.qq.com/s/oUr44ETBtrvniEYHKtSlGg", //良缘
	"https://mp.weixin.qq.com/s/fZDmT-F_yhF3X3Ru3A1Yqg", //断舍离
	"https://mp.weixin.qq.com/s/_frPrZhUdL23nFj7bynYWw", //白首
	"https://mp.weixin.qq.com/s/7gthnQ4kLbEwoLsOf6rvEw" //安产
  ];
  var jumpTo = urls[parseInt(Math.random() * urls.length)];
  window.location = jumpTo;
}

$('.do').click(start);

//摇一摇
$(window).on('deviceorientation', function (e) {
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
  img_url: "http://image.bloggeng.com/qian.png",
  image_width: 100,
  image_height: 100,
  link: 'http://h5.xkboke.com/draw/',
  title: "2019己亥猪，为自己摇新年第一签",
  desc: "这是对过去的感悟和对新年的祈望，希望它能为你带来好运...",
  appid: ''
};

document.addEventListener('WeixinJSBridgeReady', function () {
  WeixinJSBridge.on('menu:share:appmessage', function () {
	WeixinJSBridge.invoke('sendAppMessage', shareMeta);
  });
  WeixinJSBridge.on('menu:share:timeline', function () {
	WeixinJSBridge.invoke('shareTimeline', shareMeta);
  });
  WeixinJSBridge.on('menu:share:weibo', function () {
	WeixinJSBridge.invoke('shareWeibo', {
	  content: shareMeta.title + shareMeta.desc,
	  url: shareMeta.link
	});
  });
});
