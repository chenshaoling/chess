import Player     from './player/index'
import Enemy      from './npc/enemy'
import BackGround from './runtime/background'
import GameInfo   from './runtime/gameinfo'
import Music      from './runtime/music'
import DataBus    from './databus'

let ctx   = canvas.getContext('2d')
let databus = new DataBus()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.restart();
  
  }

  restart() {
    databus.reset()

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )

    this.bg       = new BackGround(ctx)
    this.player   = new Player(ctx)
    this.gameinfo = new GameInfo()
    // this.music    = new Music()
    this.render()

    window.requestAnimationFrame(
      this.loop.bind(this),
      canvas
    )
  }

 

  // 全局碰撞检测
  collisionDetection() {
    let that = this

    // databus.bullets.forEach((bullet) => {
    //   for ( let i = 0, il = databus.enemys.length; i < il;i++ ) {
    //     let enemy = databus.enemys[i]

    //     if ( !enemy.isPlaying && enemy.isCollideWith(bullet) ) {
    //       enemy.playAnimation()
    //       // that.music.playExplosion()

    //       bullet.visible = false
    //       databus.score  += 1

    //       break
    //     }
    //   }
    // })

   
  }

  //游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
     e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnArea

    if (   x >= area.startX
        && x <= area.endX
        && y >= area.startY
        && y <= area.endY  )
      this.restart()
    }

    /**
     * canvas重绘函数
     * 每一帧重新绘制所有的需要展示的元素
     */
    render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.bg.render(ctx)
    this.player.initEvent(ctx)
   

    this.gameinfo.renderGameScore(ctx, databus.score)
  }

  // 游戏逻辑更新主函数
  update() {
    // this.bg.update()

    
    // this.enemyGenerate()

    // this.collisionDetection();
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++

    this.update()
    // this.render()

    

    // 游戏结束停止帧循环
    if ( databus.gameOver ) {
      this.gameinfo.renderGameOver(ctx, databus.score)

      this.touchHandler = this.touchEventHandler.bind(this)
      canvas.addEventListener('touchstart', this.touchHandler)

      return
    }

    window.requestAnimationFrame(
      this.loop.bind(this),
      canvas
    )
  }
}
