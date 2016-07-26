document.addEventListener("DOMContentLoaded", function () { 

    console.log('jestem');
    
    // var Furry = function(x, y, direction) { 
    //     this.x = x;
    //     this.y = y;
    //     this.direction = direction;
    // };

    // var Coin = function() {
    //     this.x = Math.floor(Math.random() * 10);
    //     this.y = Math.floor(Math.random() * 10);
    // }

    // var Game = function() { 
    //     this.board = document.querySelectorAll('#board div');
    //     this.furry = new Furry(0, 0, 'right');
    //     this.coin = new Coin();
    //     this.score = 0;
    //     self = this;
    //     this.position = function(x, y) {
    //         var index = x + y * 10;
    //         return this.board[index];
    //     }
    //     this.drawFurry = function(){ 
    //         for (var i = 0; i < this.board.length; i++) {
    //              this.board[i].classList.remove("furry");
    //         }
    //         if (this.furry.x >= 0 && this.furry.y >= 0 && this.furry.x <=9 && this.furry.y <= 9) {
    //             this.position(this.furry.x, this.furry.y).classList.add("furry");
    //         }
    //     }
    //     this.drawCoin = function() {
    //         for (var i = 0; i < this.board.length; i++) {
    //             this.board[i].classList.remove("coin");
    //         }
    //         this.coin = new Coin();
    //         this.position(this.coin.x, this.coin.y).classList.add("coin");
    //     }
    //     this.cursor = function(event) {
    //         console.log('dsjhfkj');
    //         if (event.which === 37) {
    //             self.furry.direction = 'left';
    //         }
    //         if (event.which === 38) {
    //             self.furry.direction = 'up';
    //         }
    //         if (event.which === 39) {
    //             self.furry.direction = 'right';
    //         }
    //         if (event.which === 40) {
    //             self.furry.direction = 'down';
    //         }
    //     }
    //     this.go = function() {
    //         if (this.furry.direction === 'left') {
    //             this.furry.x --;
    //         }
    //         if (this.furry.direction === 'right') {
    //             this.furry.x ++;
    //         }
    //         if (this.furry.direction === 'up') {
    //             this.furry.y --;
    //         }
    //         if (this.furry.direction === 'down') {
    //             this.furry.y ++;
    //         }
    //         this.drawFurry();
    //     }
    //     this.eat = function() {
    //         if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
    //             this.score ++;
    //             this.drawCoin();
    //         }
    //     }
    //     this.die = function() {
    //         if (this.furry.x < 0 || this.furry.y < 0 || this.furry.x > 9 || this.furry.y > 9) {
    //             document.getElementById('board').classList.add('hidden');
    //             clearInterval(step);
    //             document.removeEventListener('keydown', self.cursor);
    //             document.getElementById('game-over').classList.remove('hidden');
    //         } 
    //     }
    //     this.showScore = function(){
    //         document.getElementById('score').innerText = this.score;
    //     }
    //     this.step = function() {
    //         self.go();
    //         self.die();
    //         self.eat();
    //         self.showScore();
            
    //     }
    //     document.addEventListener('keydown', self.cursor);
    //     var step = setInterval(self.step, 300);
    // };

    // var play = new Game();
    // play.drawFurry();
    // play.drawCoin();

});



