import DataBus  from '../databus'

const screenWidth    = window.innerWidth
const screenHeight   = window.innerHeight

const BG_WIDTH = 280
const BG_HEIGHT = 280

const left = (screenWidth - BG_WIDTH) / 2;
const top=120;
// 玩家相关常量设置
const PLAYER_WIDTH   =18
const PLAYER_HEIGHT  = 18

let databus = new DataBus()
let chessBoard=[];
for (var i = 0; i < 15; i++) {
  chessBoard[i] = [];
  for (var j = 0; j < 15; j++) {
    chessBoard[i][j] = 0;
  }
}



export default class Player  {
  constructor(ctx) {
    

    this.over=false;
    this.me=true;

    this.wins = [];
    this.getWins();
    this.myWin=[];
    this.computerWin=[];
    this.chessBoard = chessBoard;
    this.winstat();
    // 初始化事件监听
    this.initEvent(ctx)
    
  }
  // 画棋子
  drawChees(ctx, i, j, me) {
    
    
    let x = left + i * 20;
    let y = top + j * 20
    let imgSrc="";
    if (me) {
      imgSrc='images/black.png'
    } else {
      imgSrc = 'images/white.png'
      
    }
    let img = new Image()
    img.src = imgSrc;
    img.onload = function () {
      ctx.drawImage(
        img,
        x - (PLAYER_WIDTH/2),
        y - (PLAYER_HEIGHT/2),
        PLAYER_WIDTH,
        PLAYER_HEIGHT
      )
    }
  }




  /**
   * 玩家响应手指的触摸事件
   */
  initEvent(ctx) {
   
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      if (this.over) {
        return;
      }
      if (!this.me) {
        return;
      }
      var i = Math.floor((x - left+10) / 20);
      var j = Math.floor((y - top + 10) / 20);
      if (chessBoard[i][j] == 0) {
        this.drawChees(ctx, i, j, this.me);

        chessBoard[i][j] = 1;

        for (var k = 0; k < this.count; k++) {
          if (this.wins[i][j][k]) {
            this.myWin[k]++;
            this.computerWin[k] = 6;
            if (this.myWin[k] == 5) {
              databus.myWin=true
              databus.gameOver = true;
            }
          }
        }


        if (!this.over) {

          this.me = !this.me;
          this.computerAi(ctx);
        }
      }

    }).bind(this))
  }

  // 赢法数组

  getWins() {
    for (var i = 0; i < 15; i++) {
      this.wins[i] = [];
      for (var j = 0; j < 15; j++) {
        this.wins[i][j] = [];

      }
    }

    var count = 0;

    for (var i = 0; i < 15; i++) {
      for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
          this.wins[i][j + k][count] = true;
        };
        count++;
      }
    }
    for (var i = 0; i < 15; i++) {
      for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
          this.wins[j + k][i][count] = true;
        };
        count++;
      }
    }
    for (var i = 0; i < 11; i++) {
      for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
          this.wins[i + k][j + k][count] = true;
        };
        count++;
      }
    }

    for (var i = 0; i < 11; i++) {
      for (var j = 14; j > 3; j--) {
        for (var k = 0; k < 5; k++) {
          this.wins[i + k][j - k][count] = true;
        };
        count++;
      }
    }


    this.count = count;

  }
  // 赢法统计数组
  winstat() {
    for (var k = 0; k < this.count; k++) {
      this.myWin[k] = 0;
      this.computerWin[k] = 0;
    }
  }

  // 计算机落子
  computerAi(ctx) {

    var myScore = [];
    var computerScore = [];
    var max = 0;
    var u = 0,
      v = 0;

    for (var i = 0; i < 15; i++) {
      myScore[i] = [];
      computerScore[i] = [];
      for (var j = 0; j < 15; j++) {
        myScore[i][j] = 0;
        computerScore[i][j] = 0;
      }
    }
    for (var i = 0; i < 15; i++) {
      for (var j = 0; j < 15; j++) {
        if (this.chessBoard[i][j] == 0) {
          for (var k = 0; k < this.count; k++) {
            if (this.wins[i][j][k]) {
              if (this.myWin[k] == 1) {
                myScore[i][j] += 200;
              } else if (this.myWin[k] == 2) {
                myScore[i][j] += 400;
              } else if (this.myWin[k] == 3) {
                myScore[i][j] += 2000;
              } else if (this.myWin[k] == 4) {
                myScore[i][j] += 10000;
              }
              if (this.computerWin[k] == 1) {
                computerScore[i][j] += 220;
              } else if (this.computerWin[k] == 2) {
                computerScore[i][j] += 420;
              } else if (this.computerWin[k] == 3) {
                computerScore[i][j] += 2100;
              } else if (this.computerWin[k] == 4) {
                computerScore[i][j] += 20000;
              }
            }
          }

          if (myScore[i][j] > max) {
            max = myScore[i][j];
            u = i;
            v = j;
          } else if (myScore[i][j] == max) {
            if (computerScore[i][j] > computerScore[u][v]) {
              u = i;
              v = j;
            }
          }

          if (computerScore[i][j] > max) {
            max = computerScore[i][j];
            u = i;
            v = j;
          } else if (computerScore[i][j] == max) {
            if (computerScore[i][j] > myScore[u][v]) {
              u = i;
              v = j;
            }
          }
        }
      }

    }
    this.drawChees(ctx, u, v, false);
    this.chessBoard[u][v] = 2;
    for (var k = 0; k < this.count; k++) {
      if (this.wins[u][v][k]) {
        this.computerWin[k]++;
        this.myWin[k] = 6;
        if (this.computerWin[k] == 5) {
          databus.computerWin = true
          databus.gameOver = true;
        }
      }
    }

    if (!this.over) {
      this.me = !this.me;
    }
  }
}
