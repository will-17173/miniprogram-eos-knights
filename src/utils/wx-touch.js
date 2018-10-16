/*
DEMO：
<template>
  <div>
    <div  @touchstart="touchStart" @touchmove='touchMove' @touchend='touchEnd($event, handleSwipe)' ></div>
  </div>
</template>
<script>
import WxTouchEvent from "../../utils/wx-touch.js";
const TouchEvent = new WxTouchEvent();
export default {
  data(){
    return {
        handleSwipe(direction) {
          if (direction === "Up") {

          } else if (direction === "Down") {

          }
        }
    }
  },
  method: {
      touchStart: TouchEvent.handlerTouchstart,
      touchMove: TouchEvent.handlerTouchmove,
      touchEnd: TouchEvent.handlerTouchend
  }
}
</script>
*/

function swipeDirection(x1, x2, y1, y2) {
  return Math.abs(x1 - x2)
    >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
}

const data = {
  tStart: {
    pageX: 0,
    pageY: 0,
  },
  limitMove: 0,
};

class TouchEvent {
  swipper(touches) {
    const start = data.tStart;
    const spacing = {
      pageX: touches.pageX - start.pageX,
      pageY: touches.pageY - start.pageY,
    };
    if (data.limitMove < Math.abs(spacing.pageY)) {
      spacing.pageY = -data.limitMove;
    }
  }

  handlerTouchstart(event) {
    const touches = event.touches ? event.touches[0] : {};
    const tStart = data.tStart;
    if (touches) {
      for (const i in tStart) {
        if (touches[i]) {
          tStart[i] = touches[i];
        }
      }
    }
  }

  handlerTouchmove(event) {
    const start = data.tStart;
    const touches = event.touches ? event.touches[0] : {};
    if (touches) {
      const direction = swipeDirection(start.pageX, touches.pageX, start.pageY, touches.pageY);
      if (direction === 'Up' || direction === 'Down') {
        const start = data.tStart;
        const spacing = {
          pageX: touches.pageX - start.pageX,
          pageY: touches.pageY - start.pageY,
        };
        if (data.limitMove < Math.abs(spacing.pageY)) {
          spacing.pageY = -data.limitMove;
        }
      }
    }
  }

  handlerTouchend(event, cb) {
    const start = data.tStart;
    const touches = event.mp.changedTouches ? event.mp.changedTouches[0] : {};
    if (touches) {
      const direction = swipeDirection(start.pageX, touches.pageX, start.pageY, touches.pageY);
      const spacing = {
        pageX: touches.pageX - start.pageX,
        pageY: touches.pageY - start.pageY,
      };
      if (Math.abs(spacing.pageY) >= 40 && direction === 'Up') {
        cb('Up') // eslint-disable-line
      } else if (Math.abs(spacing.pageY) >= 40 && direction === 'Down') {
        cb('Down') // eslint-disable-line
      } else {
        spacing.pageY = 0;
      }
    }
  }
}

export default TouchEvent;
