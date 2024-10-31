

!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.nSlick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="wvpg-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="wvpg-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"wvpg-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unnslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("nslick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".wvpg-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.nslickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-wvpg-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).nslick("getnSlick");t.unnslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("wvpg-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("wvpg-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("wvpg-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("wvpg-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("wvpg-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("wvpg-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("wvpg-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("wvpg-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.wvpg-cloned)").addClass("wvpg-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-wvpg-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("wvpg-slider"),e.$slideTrack=0===e.slideCount?i('<div class="wvpg-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="wvpg-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="wvpg-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("wvpg-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unnslick"===r.breakpointSettings[s]?r.unnslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unnslick"===r.breakpointSettings[s]?r.unnslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.nslick",e.changeSlide).off("mouseenter.nslick",i.proxy(e.interrupt,e,!0)).off("mouseleave.nslick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.nslick",e.keyHandler)),e.$slider.off("focus.nslick blur.nslick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.nslick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.nslick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.nslick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.nslick",e.keyHandler))),e.$list.off("touchstart.nslick mousedown.nslick",e.swipeHandler),e.$list.off("touchmove.nslick mousemove.nslick",e.swipeHandler),e.$list.off("touchend.nslick mouseup.nslick",e.swipeHandler),e.$list.off("touchcancel.nslick mouseleave.nslick",e.swipeHandler),e.$list.off("click.nslick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.nslick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.nslick",e.selectHandler),i(window).off("orientationchange.nslick.wvpg-"+e.instanceUid,e.orientationChange),i(window).off("resize.nslick.wvpg-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.nslick.wvpg-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.nslick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.nslick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".wvpg-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("wvpg-disabled wvpg-arrow wvpg-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("wvpg-disabled wvpg-arrow wvpg-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("wvpg-slide wvpg-active wvpg-center wvpg-visible wvpg-current").removeAttr("aria-hidden").removeAttr("data-wvpg-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("wvpg-slider"),t.$slider.removeClass("wvpg-initialized"),t.$slider.removeClass("wvpg-dotted"),t.unnslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.nslickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.nslick blur.nslick").on("focus.nslick blur.nslick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.nslickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".wvpg-slide").eq(i):n.$slideTrack.children(".wvpg-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".wvpg-slide").eq(i):n.$slideTrack.children(".wvpg-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.nslickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getnSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".wvpg-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-wvpg-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.nslickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("wvpg-initialized")||(i(t.$slider).addClass("wvpg-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".wvpg-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".wvpg-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"wvpg-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"wvpg-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"wvpg-slide-control"+e.instanceUid+s,"aria-controls":"wvpg-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.nslick").on("click.nslick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.nslick").on("click.nslick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.nslick",i.keyHandler),i.$nextArrow.on("keydown.nslick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.nslick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.nslick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.nslick",i.proxy(e.interrupt,e,!0)).on("mouseleave.nslick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.nslick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.nslick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.nslick mousedown.nslick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.nslick mousemove.nslick",{action:"move"},e.swipeHandler),e.$list.on("touchend.nslick mouseup.nslick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.nslick mouseleave.nslick",{action:"end"},e.swipeHandler),e.$list.on("click.nslick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.nslick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.nslick",e.selectHandler),i(window).on("orientationchange.nslick.wvpg-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.nslick.wvpg-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.nslick.wvpg-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("wvpg-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("wvpg-loading").addClass("wvpg-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".wvpg-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".wvpg-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".wvpg-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".wvpg-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".wvpg-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("wvpg-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.nslickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.nslickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.nslickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unnslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.nslickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("wvpg-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("wvpg-loading").addClass("wvpg-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("wvpg-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.nslick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unnslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.nslickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".wvpg-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".wvpg-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".wvpg-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.nslickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("wvpg-vertical"):i.$slider.removeClass("wvpg-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".wvpg-slide").removeClass("wvpg-active wvpg-center wvpg-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("wvpg-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("wvpg-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("wvpg-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("wvpg-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("wvpg-center")),n.$slides.eq(i).addClass("wvpg-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("wvpg-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("wvpg-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("wvpg-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("wvpg-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-wvpg-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("wvpg-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-wvpg-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("wvpg-cloned");s.$slideTrack.find(".wvpg-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".wvpg-slide")?i(e.target):i(e.target).parents(".wvpg-slide"),s=parseInt(o.attr("data-wvpg-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).nslick("getnSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("wvpg-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.nslickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".wvpg-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("wvpg-slide wvpg-active wvpg-visible wvpg-current").attr("aria-hidden","true").css("width","")},e.prototype.unnslick=function(i){var e=this;e.$slider.trigger("unnslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("wvpg-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("wvpg-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("wvpg-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("wvpg-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("wvpg-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("wvpg-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("wvpg-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("wvpg-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("wvpg-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("wvpg-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.nslick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].nslick=new e(o[i],s):t=o[i].nslick[s].apply(o[i].nslick,n),void 0!==t)return t;return o}});
(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);
function parseURL(url){
    url.match(/(http:|https:|)\/\/(player.|www.|m.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
    if (RegExp.$3.indexOf('youtu') > -1) {
        var type = 'youtube';
    } else if (RegExp.$3.indexOf('vimeo') > -1) {
        var type = 'vimeo';
    }
    return {
        type: type,
        id: RegExp.$6
    };
}
const nquery = jQuery;
var slideWrapper = nquery('.videoshop-slider-for');
function playPauseVideo(control){
	player = nquery('.tc_video_slide.wvpg-current.wvpg-active').find('.product_video_iframe').get(0);
	if(nquery(player).attr('video-type')=='vimeo') {		
	    player = new Vimeo.Player(player);
	    switch (control) {
	      case "play":
	    	player.play();
	        break;
	      case "pause":
	    	player.pause();
	        break;
	    }
	} else if(nquery(player).attr('video-type')=='youtube')	{
	    switch (control) {
	      case "play":
	        postMessageToPlayer(player, {
	          "event": "command",
	          "func": "playVideo"
	        });
	        break;
	      case "pause":
	        postMessageToPlayer(player, {
	          "event": "command",
	          "func": "pauseVideo"
	        });
	        break;
	    }
	} else if(nquery(player).attr('video-type')=='html5') {
		switch (control) {
	      case "play":
	    	player.play();
	        break;
	      case "pause":
	    	player.pause();
	        break;
	    }
	} else if(nquery(player).attr('video-type')=='iframe') {
		switch (control) {
	      case "play":
	    	// player.play();
	        break;
	      case "pause":
	    	nquery(player).attr('src',nquery(player).attr('src'));
	        break;
	    }
	}
}
function postMessageToPlayer(player, command){
  if (player == null || command == null) return;
  player.contentWindow.postMessage(JSON.stringify(command), "*");
}
function onYouTubePlayerStateChange(event){
  if(event.data == 0){
  	if(wc_prd_vid_slider_setting.videoshop_lic && wc_prd_vid_slider_setting.videoshop_videoloop == 'yes'){
		playPauseVideo("play");	  	
	  	nquery('.overlay-div').show();
	} else if(wc_prd_vid_slider_setting.videoshop_sliderautoplay == 'yes'){
		slideWrapper.nslick('nslickNext');
	    slideWrapper.nslick("nslickPlay");
	  	nquery('.overlay-div').css({display:''});
	}
  }
  if(wc_prd_vid_slider_setting.videoshop_sliderautoplay == 'yes'){
	if(event.data == 2){
    	slideWrapper.nslick("nslickPlay");
	  	nquery('.overlay-div').css({display:''});
  	}
  	if(event.data == 1){
    	slideWrapper.nslick('nslickPause');
	  	nquery('.overlay-div').css({display:''});
  	}
  }
}
var prd_yt_player = [];
function onYouTubeIframeAPIReady(){
	nquery('.product_video_iframe[id^="videoshop_yt_video_"]').each(function(index,elem){
		nquery(this).load(function(e){
  			prd_yt_player = new YT.Player(this, { events: { 'onStateChange': onYouTubePlayerStateChange } });
		});
	});
}
function getParameterByName(name, url = window.location.href){
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function get_YT_Id(url){
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11){
        return match[2];
    } else {
        return 'error';
    }
}
function videoshop_variations_image_reset() {
	/*
		This script requires google iframe_api which does not collect any information
		Script url: https://www.youtube.com/iframe_api
	*/
	nquery('.zoom.wvpg-slide:not(.wvpg-cloned) .wp-post-image').attr('data-zoom-image',nquery('.zoom.wvpg-slide:not(.wvpg-cloned) .wp-post-image').attr('data-o_zoom-image'));
	nquery('.zoom.wvpg-slide:not(.wvpg-cloned) .wp-post-image').attr('src',nquery('.zoom.wvpg-slide:not(.wvpg-cloned) .wp-post-image').attr('data-o_src'));
	nquery('.wvpg-slide.wp-post-image-thumb img').attr( 'src', nquery('.wvpg-slide.wp-post-image-thumb img').attr('data-o_src'));
	if(nquery('.wvpg-slide.wp-post-image-thumb img').attr('srcset')){
		nquery('.wvpg-slide.wp-post-image-thumb img').attr( 'srcset', nquery('.wvpg-slide.wp-post-image-thumb img').attr('data-o_srcset'));
	}
	if(nquery('.zoom.wvpg-slide:not(.wvpg-cloned) .wp-post-image').attr('srcset')){
		nquery('.zoom.wvpg-slide:not(.wvpg-cloned) .wp-post-image').attr( 'srcset', nquery('.zoom.wvpg-slide:not(.wvpg-cloned) .wp-post-image').attr('data-o_srcset'));
	}
}
nquery(document).ready(function() {
	nquery('span.videoshop-popup_trigger.fa.fa-expand').click(function(e){
	    nquery('.wvpg-current.wvpg-active span.videoshop-popup').click();
	});
	nquery('.product_video_iframe').each(function(index, elem){
		if(nquery(this).attr('video-type')=='youtube'){
			let yt_youtube_url = nquery(this).attr('data_src');
			var iframe_src = get_YT_Id(yt_youtube_url);
			let start = getParameterByName('start',nquery(this).attr('data_src'));
			let autoplay = getParameterByName('autoplay',nquery(this).attr('data_src'));
			let nocookie = '';
			if(yt_youtube_url.search("nocookie") > 0){
				nocookie = '-nocookie';   
			}
		    nquery(this).attr('src','https://www.youtube'+nocookie+'.com/embed/'+iframe_src+'?modestbranding=1&rel=0&autoplay='+autoplay+'&showinfo=0&enablejsapi=1&start='+start);
		    nquery(this).parent('div').find('.product_video_iframe_light').attr('href','https://www.youtube'+nocookie+'.com/embed/'+iframe_src+'?enablejsapi=1&wmode=opaque&start='+start+'&rel=0');
		    if(nquery('.product_video_img.img_'+ index).attr('custom_thumbnail') != 'yes'){
			    nquery('.product_video_img.img_'+ index).attr('src','https://img.youtube.com/vi/'+iframe_src+'/mqdefault.jpg');
		    }
			nquery(this).css({'height':nquery(this).parent('div').width()});
			if(nquery('#iframe-demo').length == 0){
				var tag = document.createElement('script');
				tag.id = 'iframe-demo';
				tag.src = 'https://www.youtube.com/iframe_api';
				var firstScriptTag = document.getElementsByTagName('script')[0];
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			}
		}
		if(wc_prd_vid_slider_setting.videoshop_lic && nquery(this).attr('video-type')=='vimeo'){
			var vimeo_url = nquery(this).attr('src');
		    var player = new Vimeo.Player(this);
		    if(wc_prd_vid_slider_setting.videoshop_lic && wc_prd_vid_slider_setting.videoshop_videoloop == 'yes'){
			    player.setLoop(true);
			} else {
			    player.setLoop(false);
			}
			if(wc_prd_vid_slider_setting.videoshop_sliderautoplay == 'yes')
			{
			    player.on('play', function(){
    				slideWrapper.nslick('nslickPause');
				  	nquery('.overlay-div').css({display:''});
			    });
			    player.on('playing', function(){
    				slideWrapper.nslick('nslickPause');
				  	nquery('.overlay-div').css({display:''});
			    });
			    player.on('pause', function(){
    				slideWrapper.nslick("nslickPlay");
				  	nquery('.overlay-div').css({display:''});
			    });
	    	 	if(wc_prd_vid_slider_setting.videoshop_videoloop != 'yes'){
				    player.on('ended', function(){
				  		nquery('.overlay-div').css({display:''});
					    slideWrapper.nslick('nslickNext');
					    slideWrapper.nslick("nslickPlay");
				    });
				}
			}
		    if(nquery('.product_video_img.img_'+ index).attr('custom_thumbnail') != 'yes'){
				var videoDetails = parseURL(vimeo_url);
				var videoType = videoDetails.type;
				var videoID = videoDetails.id;
				var xhr = new XMLHttpRequest();
		    	xhr.open("GET", "https://vimeo.com/api/v2/video/"+ videoID +".json", true);
		    	xhr.onload = function(e)
		    	{
		      		if(xhr.readyState === 4)
		      		{
		        		if(xhr.status === 200)
		        		{
		          			var data = xhr.responseText;
			        	  	var parsedData = JSON.parse(data);
				          	thumbnail_small = parsedData[0].thumbnail_small;
				          	thumbnail_medium = parsedData[0].thumbnail_medium;
				          	thumbnail_large = parsedData[0].thumbnail_large;
				          	width = nquery('.product_video_img.img_'+ index).attr('width');
				          	height = nquery('.product_video_img.img_'+ index).attr('height');
				          	nquery('.product_video_img.img_'+ index).attr('src',thumbnail_large.replace("d_640", 'd_'+width+'x'+height));
		        		}
		        		else
		        		{
		          			console.error(xhr.statusText);
		        		}
		      		}
		    	};
		    	xhr.send(null);
		    }
		}
		if(wc_prd_vid_slider_setting.videoshop_lic && nquery(this).attr('video-type')=='html5'){
			var vid = this;
			if(wc_prd_vid_slider_setting.videoshop_lic && wc_prd_vid_slider_setting.videoshop_videoloop == 'yes'){
				nquery(this).attr('loop','loop');
			}
		    if(nquery('.product_video_img.img_'+ index).attr('custom_thumbnail') != 'yes'){
				vid.currentTime = 2;
				let nicx_timesRun = 0;
				let video_thumb = nquery('.product_video_img.img_'+ index);
				let w = video_thumb.attr('width');//video.videoWidth * scaleFactor;
				let h = video_thumb.attr('height');//video.videoHeight * scaleFactor;
				let interval = setInterval(function(){
				    nicx_timesRun++;
				    if(nicx_timesRun === 4){
				        clearInterval(interval);
						vid.currentTime = 0;
				    }
					var canvas = document.createElement('canvas');
					canvas.width = w;
					canvas.height = h;
					var ctx = canvas.getContext('2d');
					ctx.drawImage(vid, 0, 0, w, h);
					var data = canvas.toDataURL("image/jpg");
		          	nquery('.product_video_img.img_'+ index).attr('src',data);
				}, 1000);
			}
			if(wc_prd_vid_slider_setting.videoshop_sliderautoplay == 'yes') {
				vid.onplaying = function(){
				  	slideWrapper.nslick('nslickPause');
				  	nquery('.overlay-div').css({display:''});
				};
				vid.onplay = function(){
				  	slideWrapper.nslick('nslickPause');
				  	nquery('.overlay-div').css({display:''});
				};
				vid.onpause = function(){
				  	slideWrapper.nslick('nslickPlay');
				  	nquery('.overlay-div').css({display:''});
				};
				vid.onended = function(){
				  	nquery('.overlay-div').show();
				  	if(wc_prd_vid_slider_setting.videoshop_lic && wc_prd_vid_slider_setting.videoshop_videoloop == 'yes'){
						vid.play();
					}
					else{
						slideWrapper.nslick('nslickNext');
					    slideWrapper.nslick("nslickPlay");
					}
				};
			}
		}
	});
	if(nquery('.videoshop-slider-for').length > 0) {
		var slider_autoplay = (wc_prd_vid_slider_setting.videoshop_sliderautoplay == 'yes') ? true : false;
		var infinitescroll = (wc_prd_vid_slider_setting.videoshop_arrowinfinite =='yes') ? true : false;
		var slider_arrow = (wc_prd_vid_slider_setting.videoshop_arrowdisable =='yes') ? true : false;
		var thumb_arrow = (wc_prd_vid_slider_setting.videoshop_arrow_thumb =='yes') ? true : false;
		var sliderfade = (wc_prd_vid_slider_setting.videoshop_sliderfade =='yes') ? true : false;
		var videoshop_rtl = (wc_prd_vid_slider_setting.videoshop_rtl =='1') ? true : false;
		var videoshop_swipe = (wc_prd_vid_slider_setting.videoshop_swipe == 'yes') ? true : false;
		var adaptiveHeight = (wc_prd_vid_slider_setting.videoshop_adaptive_height == 'yes') ? true : false;
		if(wc_prd_vid_slider_setting.videoshop_show_lightbox != 'yes'){
			nquery('a.videoshop-popup').remove();
		}
		var slide_count = nquery('.images.videoshop_product_images_with_video .zoom, .images.videoshop_product_images_with_video .tc_video_slide').length;
		var sliderlayout = (slide_count > 1 || wc_prd_vid_slider_setting.videoshop_hide_thumbnail != 'yes') ? wc_prd_vid_slider_setting.videoshop_slider_layout : 'horizontal';
		var verticalslider = (sliderlayout != 'horizontal' && sliderlayout!='') ? true : false;
		var isMobile = true;
		var mobilevertical = false;
		if(verticalslider && wc_prd_vid_slider_setting.videoshop_slider_responsive != 'yes'){
			mobilevertical = true;
			isMobile = false;
		}
		slideWrapper.nslick({
			fade: sliderfade,
			dots : false,
			autoplay : slider_autoplay,
			arrows: slider_arrow,
			slidesToScroll:1,
			slidesToShow:1,
			adaptiveHeight:adaptiveHeight,
			infinite:infinitescroll,
			rtl: videoshop_rtl,
			swipe: videoshop_swipe,
			asNavFor: (wc_prd_vid_slider_setting.videoshop_hide_thumbnails != 'yes') ? '.videoshop-slider-nav': false,
			prevArrow: '<i class="btn-prev dashicons dashicons-arrow-left-alt2"></i>',
		    nextArrow: '<i class="btn-next dashicons dashicons-arrow-right-alt2"></i>',
			// verticalSwiping: true,
		}).init(function(e){
			nquery('.images.videoshop_product_images_with_video').removeClass('loading');
			nquery('.zoom.wvpg-slide:not(.wvpg-cloned) .wp-post-image').attr('data-o_zoom-image',nquery('.zoom.wvpg-slide:not(.wvpg-cloned) .wp-post-image').attr('data-zoom-image'));
			nquery('.zoom.wvpg-slide:not(.wvpg-cloned) .wp-post-image').attr('data-o_src',nquery('.zoom.wvpg-slide:not(.wvpg-cloned) .wp-post-image').attr('src'));
			nquery('.wvpg-slide.wp-post-image-thumb img').attr( 'data-o_src', nquery('.wvpg-slide.wp-post-image-thumb img').attr('src'));
			if(nquery('.wvpg-slide.wp-post-image-thumb img').attr('srcset')){
				nquery('.wvpg-slide.wp-post-image-thumb img').attr( 'data-o_srcset', nquery('.wvpg-slide.wp-post-image-thumb img').attr('srcset'));
			}
			if(nquery('.zoom.wvpg-slide:not(.wvpg-cloned) .wp-post-image').attr('srcset')){
				nquery('.zoom.wvpg-slide:not(.wvpg-cloned) .wp-post-image').attr( 'data-o_srcset', nquery('.zoom.wvpg-slide:not(.wvpg-cloned) .wp-post-image').attr('srcset'));
			}
			setIframeHeight();
			set_videoshop_popup_trigger();
		});
		if(wc_prd_vid_slider_setting.videoshop_hide_thumbnails != 'yes'){
			nquery('.videoshop-slider-nav').nslick({
				dots: false,
				arrows: thumb_arrow,lazyLoad: 'ondemand',
				centerMode: false,
				focusOnSelect: true,
				rtl: videoshop_rtl,
				vertical:verticalslider,
				infinite:infinitescroll,
				slidesToShow: parseInt(wc_prd_vid_slider_setting.videoshop_thumbnails_to_show),
				slidesToScroll: 1,
				prevArrow: '<i class="btn-prev thumb_arrow dashicons dashicons-arrow-left-alt2"></i>',
			    nextArrow: '<i class="btn-next thumb_arrow dashicons dashicons-arrow-right-alt2"></i>',
				asNavFor: '.videoshop-slider-for',
				responsive: [{
					breakpoint: 767,
			      	settings: {
			        	vertical: mobilevertical,
						isMobile: isMobile
					}
			    }]
			}).init(function(e){
				nquery('.product_video_img').css({'height':nquery('.product_thumbnail_item').height(),'width':nquery('.product_thumbnail_item').width()});
				if(nquery('#videoshop-gallery .wvpg-list.draggable .wvpg-track > li').length <= wc_prd_vid_slider_setting.videoshop_thumbnails_to_show) {
					nquery('#videoshop-gallery .wvpg-list.draggable .wvpg-track').addClass('techno_stop_slide');
				}
			});
		}
		const post_thumb_index = nquery('.wvpg-slide .wp-post-image').parent('.wvpg-slide').attr('data-wvpg-index');
		nquery(".videoshop-slider-for").on("beforeChange", function (event, nslick, currentSlide, nextSlide){
			set_videoshop_popup_trigger();
			if(wc_prd_vid_slider_setting.videoshop_show_zoom != 'off'){
				if(wc_prd_vid_slider_setting.videoshop_show_zoom == 'yes' || nquery(window).width() < 768){
					nquery('.videoshop-slider-for .wvpg-slide').zoom({magnify:wc_prd_vid_slider_setting.videoshop_zoomlevel});
				} else {
					var img = nquery(nslick.$slides[nextSlide]).find("img");
					nquery('.zoomWindowContainer,.zoomContainer').remove();
					nquery(img).elevateZoom({zoomType:wc_prd_vid_slider_setting.videoshop_show_zoom, cursor:"crosshair", borderSize:1, scrollZoom:1,zoomLevel:wc_prd_vid_slider_setting.videoshop_zoomlevel, zoomWindowHeight: 550, zoomWindowWidth:550, zoomWindowOffetx: 10});
				}
			}
			if(nquery(nslick.$slides[currentSlide]).find('.product_video_iframe').length > 0){
				nquery('.product_video_iframe').show();
				playPauseVideo('pause');
			}
		});
		if( nquery('.product_video_iframe').length > 0 && nquery(window).width() < 768 ){
			var overlayDiv = '<div class="overlay-div" style="position:absolute; background-color:transparent">';
			var iframe = nquery('.product_video_iframe');
			iframe.parent().append(nquery(overlayDiv).css({
				'top':iframe.offset().top,
				'left':iframe.offset().left,
				"width":iframe.width()+"px",
				"height":iframe.height()+"px"
			}));
			nquery('.overlay-div').on('click touchstart', function(){ nquery(this).hide(); });
			nquery(document).on('click touchstart', function(event){
				if(nquery(event.target).attr("class") != 'overlay-div' && nquery(event.target).attr("class") != 'product_video_iframe')nquery('.overlay-div').css({display:''}); 
			});
			nquery('.overlay-div').touchwipe({
				wipeLeft: function() { slideWrapper.nslick('nslickNext'); },
				wipeRight: function() { slideWrapper.nslick('nslickPrev'); },
				min_move_x: 30,
				min_move_y: 30,
				preventDefaultEvents: true
			});			
		}
		nquery(".videoshop-slider-for").on("afterChange", function (slide, index){
			set_videoshop_popup_trigger();
			if(wc_prd_vid_slider_setting.videoshop_show_zoom == 'lens'){
				nquery('.zoomContainer').css({'overflow': 'hidden'});
			}
			if(wc_prd_vid_slider_setting.videoshop_lic && wc_prd_vid_slider_setting.videoshop_videoloop == 'yes'){
				if(nquery('.tc_video_slide.wvpg-current.wvpg-active').length > 0){
					nquery('.product_video_iframe').show();
					playPauseVideo('play');
				}
			}
		});
		if(sliderlayout=='left'){
			nquery(".slider.videoshop-slider-for").addClass("vertical-img-left");
		} else if(sliderlayout=='right'){
			nquery(".slider.videoshop-slider-for").addClass("vertical-img-right");
		} else {
			nquery(".slider.videoshop-slider-for").removeClass('vertical-img-left').removeClass('vertical-img-right');
		}
		if(wc_prd_vid_slider_setting.videoshop_arrowcolor!=''){
			nquery(".btn-prev, .btn-next").css("color",wc_prd_vid_slider_setting.videoshop_arrowcolor);
		}
		if(wc_prd_vid_slider_setting.videoshop_arrowbgcolor!=''){
			nquery(".btn-prev, .btn-next").css("background",wc_prd_vid_slider_setting.videoshop_arrowbgcolor);
		}
		if(wc_prd_vid_slider_setting.videoshop_show_zoom != 'off')
		{
			if(wc_prd_vid_slider_setting.videoshop_show_zoom == 'yes' || nquery(window).width() < 768) {
				nquery('.videoshop-slider-for .wvpg-slide').zoom({magnify:wc_prd_vid_slider_setting.videoshop_zoomlevel});
			} else {
				nquery('.videoshop-slider-for .btn-prev, .videoshop-slider-for .btn-next').css({ opacity: 1, margin: '0px' });
				nquery(".slider.videoshop-slider-for .wvpg-current img").elevateZoom({zoomType:wc_prd_vid_slider_setting.videoshop_show_zoom,cursor: "crosshair",borderSize: 1, scrollZoom:1,zoomLevel:wc_prd_vid_slider_setting.videoshop_zoomlevel, zoomWindowHeight: 550, zoomWindowWidth:550, zoomWindowOffetx: 10});
			}
		}
		nquery('.variations select').change(function(e){
			if(!nquery(this).val()){
				if( slide_count > 1){
					nquery('.videoshop-slider-for').nslick('nslickGoTo', post_thumb_index);
				}
				videoshop_variations_image_reset();
				window.setTimeout(function() {
					if(wc_prd_vid_slider_setting.videoshop_show_zoom != 'off') {
						if(wc_prd_vid_slider_setting.videoshop_show_zoom == 'yes' || nquery(window).width() < 768){
							nquery('.videoshop-slider-for .wvpg-track .wvpg-current').zoom({magnify:wc_prd_vid_slider_setting.videoshop_zoomlevel});
						} else {
							nquery('.videoshop-slider-for .btn-prev, .videoshop-slider-for .btn-next').css({ opacity: 1, margin: '0px' });
							nquery(".slider.videoshop-slider-for .wvpg-current img").elevateZoom({zoomType:wc_prd_vid_slider_setting.videoshop_show_zoom,cursor: "crosshair",borderSize: 1, scrollZoom:1,zoomLevel:wc_prd_vid_slider_setting.videoshop_zoomlevel, zoomWindowHeight: 550, zoomWindowWidth:550, zoomWindowOffetx: 10});
						}
					}
				},20);
			}
		});
		nquery('.single_variation_wrap').on('show_variation', function(event,variation) {
			if ( slide_count > 1 || wc_prd_vid_slider_setting.videoshop_hide_thumbnail != 'yes') {
				nquery('.videoshop-slider-for').nslick('nslickGoTo', post_thumb_index);
			}
			if ( variation && variation.image && variation.image.src && variation.image.src.length > 1 && variation.image.full_src != nquery('.zoom.wvpg-slide:not(.wvpg-cloned) .wp-post-image').attr('data-o_zoom-image')) {
				nquery('.zoom.wvpg-slide:not(.wvpg-cloned) .wp-post-image').attr('src',variation.image.src);
				nquery('.zoom.wvpg-slide:not(.wvpg-cloned) .wp-post-image').attr('data-zoom-image',variation.image.full_src);
				nquery('.wvpg-slide.wp-post-image-thumb img').attr( 'src', variation.image.gallery_thumbnail_src );
				if(variation.image.srcset){
					nquery('.zoom.wvpg-slide:not(.wvpg-cloned) .wp-post-image').attr( 'srcset', variation.image.srcset );
					nquery('.wvpg-slide.wp-post-image-thumb img').removeAttr( 'srcset' );
				}
			} else {
				videoshop_variations_image_reset();
			}
			window.setTimeout(function() {
				if(wc_prd_vid_slider_setting.videoshop_show_zoom != 'off') {
					if(wc_prd_vid_slider_setting.videoshop_show_zoom == 'yes' || nquery(window).width() < 768) {
						nquery('.videoshop-slider-for .wvpg-track .wvpg-current').zoom({magnify:wc_prd_vid_slider_setting.videoshop_zoomlevel});
					} else {
						nquery('.videoshop-slider-for .btn-prev, .videoshop-slider-for .btn-next').css({ opacity: 1, margin: '0px' });
						nquery(".slider.videoshop-slider-for .wvpg-current img").elevateZoom({zoomType:wc_prd_vid_slider_setting.videoshop_show_zoom,cursor: "crosshair",borderSize: 1, scrollZoom:1,zoomLevel:wc_prd_vid_slider_setting.videoshop_zoomlevel, zoomWindowHeight: 550, zoomWindowWidth:550, zoomWindowOffetx: 10});
					}
				}
			},20);
		});
		if(wc_prd_vid_slider_setting.videoshop_show_lightbox == 'yes'){
			if(nquery('.wvpg-cloned .videoshop-popup').remove()){
				nquery('[data-fancybox="product-gallery"]').fancybox({slideShow  : true,fullScreen : true,transitionEffect: "slide",arrows: true,thumbs : false,infobar : true});
			}
		}	
	}
	if (nquery(window).width() > 768 && wc_prd_vid_slider_setting.videoshop_show_zoom != 'yes'){
		nquery(".slider.videoshop-slider-for").on('click','.wvpg-current img', function(e) {
			nquery('.slider.videoshop-slider-for .wvpg-current span').click();
			return false;
		});
	}
  	setIframeHeight();
});
nquery(window).resize(function(){ setIframeHeight(); set_videoshop_popup_trigger(); });
function setIframeHeight(){
	nquery('iframe.product_video_iframe').each(function(i, item){
		var slide_1 = 500;
		if(nquery('.zoom.wvpg-slide').length > 0){
			var slides = nquery('.zoom.wvpg-slide');
			slide_1 = nquery(slides[0]).height();
			if(slide_1 < nquery(slides[1]).height()){
				slide_1 = nquery(slides[1]).height();
			}
		}
		item.height = slide_1;
	});
	setTimeout(function()
	{
		nquery('.product_video_img').css({'height':nquery('.product_thumbnail_item').height(),'width':nquery('.product_thumbnail_item').width()});
	}, 500);
	var video_height = wc_prd_vid_slider_setting.videoshop_aspect_ratio;
	var ratio = 9/16;
	if(video_height == '1x1'){
		ratio = 1;
	}else if(video_height == '4x3'){
		ratio = 3/4;
	}else{
		ratio = 9/16;
	}
	nquery('iframe.product_video_iframe.archive_video_iframe').each(function(i, item){
		var h = nquery('iframe.product_video_iframe.archive_video_iframe').width()*ratio;
		item.height = h;
		nquery('iframe.product_video_iframe.archive_video_iframe').css({ height: h });
	});
	nquery('video.product_video_iframe.archive_video_iframe').each(function(i, item){
		var h = nquery('video.product_video_iframe.archive_video_iframe').width()*ratio;
		item.height = h;
	});
	nquery(window).resize(function() {
		nquery('iframe.product_video_iframe.archive_video_iframe').each(function(i, item){
			var h = nquery('iframe.product_video_iframe.archive_video_iframe').width()*ratio;
			item.height = h;
			nquery('iframe.product_video_iframe.archive_video_iframe').css({ height: h });
		});
		nquery('video.product_video_iframe.archive_video_iframe').each(function(i, item){
			var h = nquery('video.product_video_iframe.archive_video_iframe').width()*ratio;
			item.height = h;
		});
	});
}
function set_videoshop_popup_trigger(){
	if(nquery('span.videoshop-popup_trigger.fa.fa-expand').length > 0){
		window.setTimeout(function() {
				let current_link = nquery('.show_lightbox .wvpg-current.wvpg-active span.videoshop-popup');
				let offset = current_link.offset();
				current_link.css({'opacity':'0'});
				nquery('span.videoshop-popup_trigger.fa.fa-expand').offset({ top: offset.top, left: offset.left});
		},10);
	}
}