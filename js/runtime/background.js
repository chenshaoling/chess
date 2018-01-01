
const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

const BG_WIDTH     = 280
const BG_HEIGHT    = 280

const left = (screenWidth-BG_WIDTH)/2;
console.log(screenWidth)

/**
 * 游戏背景类
 */
export default class BackGround  {
  constructor(ctx) {

    this.render(ctx)

  }

  /**
   * 棋盘绘制
   */
  render(ctx) {
    ctx.fillStyle="#fff";
    ctx.fillRect(0,0 ,screenWidth,screenHeight);
    ctx.fill();
    ctx.strokeStyle = "#867a7a";

    for (var i = 0; i < 15; i++) {
      ctx.moveTo(left + i * 20, 120);
      ctx.lineTo(left + i * 20, 400);
      ctx.stroke();

      ctx.moveTo(left, 120 + i * 20);
      ctx.lineTo(left+280, 120 + i * 20);
      ctx.stroke();
    }
  }
}
