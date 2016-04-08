var snake = {
	canvas: document.getElementById('canvas'),
	snakePoint: [1,2,3],
	keys: {'37': {x: -1, y: 0}, '38': {x: 0, y: -1}, '39': {x: 1, y: 0}, '40': {x: 0, y: 1}},
	snakeCurrent: {x: 1, y: 0},
	currentPoint: 0,
	timer: 500,
	isChange: true,
	init: function(){
		// this.widthCount = $('#action-width').val();
		// this.heightCount = $('#action-height').val();
		this.widthCount = 20;
		this.heightCount = 20;
		this.canvas.style.width = this.widthCount*20;
		this.canvas.style.height = this.heightCount*20;
		this.context = this.canvas.getContext('2d');
		this.binds();
		// this.drawCanvas();
		this.drawSnake();
		this.beginTimer();
		this.timerShow();
	},
	timerShow: function(){
		var _this = this;
		var count = _this.widthCount* _this.heightCount;
		var isBegin = true;
		while(isBegin){
			_this.currentPoint = Math.floor(Math.random()*count+1);
			if (_this.snakePoint.indexOf(_this.currentPoint)<0){
				isBegin = false;
			}
		};
		_this.showPoint();
	},
	showPoint: function(){
		var _this = this;
		var x = (Math.floor(_this.currentPoint%_this.widthCount) == 0 ?  20 : Math.floor(_this.currentPoint%_this.widthCount));
		var y = (Math.floor(_this.currentPoint%_this.widthCount) == 0 ? Math.floor(_this.currentPoint/_this.widthCount) : Math.floor(_this.currentPoint/_this.widthCount+1))
		_this.context.save();
		_this.context.fillStyle = 'red';		
		_this.context.fillRect((x-1)*20, (y-1)*20, 20,20);
		_this.context.restore();
	},
	drawCanvas: function(){
		this.drawX();
		this.drawY();
	},
	drawX: function(){
		var _this = this;
		_this.context.lineWidth = 0.5;
		_this.context.beginPath();
		for (var i = 0; i< _this.widthCount;++i){
			_this.context.moveTo(0, i*20+0.5);
			_this.context.lineTo(_this.canvas.width, i*20+0.5);
		}
		_this.context.stroke();
	},
	drawY: function(){
		var _this = this;
		_this.context.lineWidth = 0.5;
		_this.context.beginPath();
		for (var i = 0; i< _this.heightCount;++i){
			_this.context.moveTo(i*20+0.5, 0);
			_this.context.lineTo(i*20+0.5, _this.canvas.height);
		}
		_this.context.stroke();
	},
	drawSnake: function(){
		var _this = this;
		_this.context.clearRect(0,0,_this.canvas.width,_this.canvas.height);
		$.each(_this.snakePoint, function(index,point){
			var x = (Math.floor(point%_this.widthCount) == 0 ?  20 : Math.floor(point%_this.widthCount));
			var y = (Math.floor(point%_this.widthCount) == 0 ? Math.floor(point/_this.widthCount) : Math.floor(point/_this.widthCount+1))
			_this.context.fillRect((x-1)*20, (y-1)*20, 20,20);
		});
		// _this.drawX();
		// _this.drawY();
		_this.isChange = true;
	},
	beginTimer: function(){
		var _this = this;
		_this.setI = setInterval(function(){
			var isStop = false;
			var lastPoint = _this.snakePoint[_this.snakePoint.length-1];
			var xx = (Math.floor(lastPoint%_this.widthCount) == 0 ?  20 : Math.floor(lastPoint%_this.widthCount));
			var x = xx + _this.snakeCurrent.x;
			var yy = (Math.floor(lastPoint%_this.widthCount) == 0 ? Math.floor(lastPoint/_this.widthCount) : Math.floor(lastPoint/_this.widthCount+1))
			var y = yy + _this.snakeCurrent.y;
			if (x+(y-1)*20==_this.currentPoint){
				_this.snakePoint.push(_this.currentPoint);
				if(_this.timer>100){
					_this.timer-=20;
				}
				_this.drawSnake();
				_this.timerShow();
			}else{
				var oldSnakePoint = _this.snakePoint;
				_this.snakePoint = [];
				$.each(oldSnakePoint, function(index,point){
					if (index==oldSnakePoint.length-1){
						var xx = (Math.floor(point%_this.widthCount) == 0 ?  20 : Math.floor(point%_this.widthCount));
						var x = xx + _this.snakeCurrent.x;
						if (x >_this.widthCount|| x<1){
							alert('Game over!');
							clearInterval(_this.setI);
							isStop= true;
							return;
						}
						var yy = (Math.floor(point%_this.widthCount) == 0 ? Math.floor(point/_this.widthCount) : Math.floor(point/_this.widthCount+1))
						var y = yy + _this.snakeCurrent.y;
						if (y >_this.heightCount|| y<1){
							alert('Game over!');
							clearInterval(_this.setI);
							isStop= true;
							return;
						}
						if(_this.snakePoint.indexOf(x+(y-1)*20)>=0){
							alert('Game over!');
							clearInterval(_this.setI);
							isStop= true;
							return;
						}
						_this.snakePoint.push(x+(y-1)*20);
					}else{
						_this.snakePoint.push(oldSnakePoint[index+1]);
					}
				});
				if (!isStop){
					_this.drawSnake();
				}
				_this.showPoint();
			}
		}, _this.timer);
	},
	binds: function () {
		var _this = this;
		document.onkeydown = function(e){
			if (_this.isChange){
				var keyCode = e.keyCode;
				if(keyCode==37 || keyCode==39){
					if(_this.snakeCurrent.y!=0){
						_this.snakeCurrent = _this.keys[keyCode.toString()]
					}
				}else if(keyCode == 38|| keyCode==40){
					if(_this.snakeCurrent.x!=0){
						_this.snakeCurrent = _this.keys[keyCode.toString()];
					}
				}
				_this.isChange= false;
			}
			
		}; 
	}
};
snake.init();