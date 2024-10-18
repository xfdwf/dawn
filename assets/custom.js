/*
 * custom.js
 */

(function () {
  // 获取用户国家跳转子站点
  // $.get('https://ipinfo.io?token=2d442c53f12833', function (data) {
  // $.get('https://freegeoip.app/json/', function (data) {
  //   const country = data;
  //   console.log('User Country: ', data);
  //   if(country=='US'){
  //     // window.location.href = 'https://uk.popilush.com/'
  //   }
  // }).fail(function () {
  //   console.error('Error fetching geolocation');
  // });
  
  // 判断是否在移动端应用内
    function isInApp() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      // 检测特定的User-Agent标志，可以根据具体应用的User-Agent特征来定制
      // const isAndroid = /Android/i.test(userAgent);
      // const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
      const isUniApp = /uni-app/i.test(userAgent); // uni-app的标识
      // return isAndroid || isIOS || isUniApp; // 或者根据实际情况调整判断逻辑
      return isUniApp; // 或者根据实际情况调整判断逻辑
    }
    
    // 只有在应用内时才添加事件监听
    if(isInApp()){
      let startX = 0;
      let startY = 0;
      let thresholdX = 50; // X轴上的滑动阈值
      let thresholdY = 40; // Y轴上的滑动阈值
      let edgeThreshold = 30; // 边缘检测阈值
      let isEdgeSwipe = false;
      document.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
        // 检查触摸点是否在左侧边缘
        isEdgeSwipe = startX <= edgeThreshold;
      });
      document.addEventListener('touchend', (event) => {
        if (!isEdgeSwipe) return; // 如果不是从边缘开始的滑动，不执行后续操作
        let endX = event.changedTouches[0].clientX;
        let endY = event.changedTouches[0].clientY;
        let deltaX = endX - startX;
        let deltaY = endY - startY;
        if (Math.abs(deltaY) < thresholdY && deltaX > thresholdX) {
          // 确保 Y 轴偏移量小于阈值，并且向右滑动的距离超过阈值
          window.history.back();
        }
      });
    }
  window.onload = function () {
    
    function getSlidesPerViewForPage() { // slide预览数量
      var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; // 可视宽度
      const preImageEle = document.getElementById('pre_image_num');
      const preNum = preImageEle && preImageEle.dataset.num || 5;
      const slidesNum = width > 1000 ? +preNum : (+preNum)-1.5;
      return slidesNum;
    }
    const prevewNum = getSlidesPerViewForPage();
    // 落地页-slid滑动图片功能
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: prevewNum,
      spaceBetween: 1,
      centeredSlides: true,
      loop: true,
      initialSlide: Math.floor(prevewNum),
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        init: function () {
          updateCurrentImageSrc();
        },
        slideChange: function () {
          updateCurrentImageSrc();
        },
      },
    });
    const getImageSrcButton = document.getElementById('get-src-button'); // shop now btn
    const getSlideImgColor = document.getElementById('get-slide-img-color');
    function updateCurrentImageSrc() { // 更新图片src地址
      if (!swiper) return;
      const imgSrc = getCenteredSlideImgSrc();
      getSlideImgColor.style.backgroundImage = `url(${imgSrc[0]})`;
      getImageSrcButton.href = imgSrc[1];
    }
    function getCenteredSlideImgSrc() { // 获取图片地址
      const activeIndex = swiper.activeIndex;
      const centeredSlide = swiper.slides[activeIndex];
      const imgElement = centeredSlide.querySelector('img');
      const imgHref = centeredSlide.querySelector('.link-page-item');
      const img = imgElement ? imgElement.src : '';
      return [img, imgHref || ''];
    }

    


  }
})();
