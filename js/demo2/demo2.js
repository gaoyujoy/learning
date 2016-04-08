function Yudemo(option){
	if (!(this instanceof Yudemo)) {
        return new Yudemo(option);
    }
    else{
        return this.init(option);
    }
};
$.extend(Yudemo.prototype,{
	init:function(option){
		this.$base = $('.'+option.classname);
		this.imgList= [];
		this.height= 0;
		this.width= 0;
		this.timer= 0;
		this.currentIndex= 0;
		this.clearT= null;
		this.$showStar= null;
		this.$showBox= $(document.createElement('div'));
		this.$starList= [];
		var _this = this;
		_this.height = option.height;
		_this.width = option.width;
		_this.timer = option.timer;
		_this.initbase();
		_this.binds();
		_this.timeFunction();
	},
	binds: function(){
		var _this = this;
		$('.show-base').mouseover(function(){
			clearInterval(_this.clearT);
		}).mouseout(function(){
			_this.timeFunction();
		});
		$('.show-star').mouseover(function(){
			var $ele = $(this);
			var this_index = $ele.data('index');
			_this.currentIndex=parseInt(this_index);
			_this.animateImg();
		})
	},
	timeFunction: function(){
		var _this = this;
		_this.clearT = setInterval(function(){
			_this.currentIndex+=1;
			_this.animateImg();
		},_this.timer);
	},
	animateImg: function(){
		var _this = this;
		_this.$showBox.stop();
		if(_this.currentIndex==_this.imgList.length){
			_this.$showBox.animate({
				"left": '0%'
			},500);
			_this.currentIndex=0;
		}else{
			_this.$showBox.animate({
				"left": "-"+(_this.currentIndex*100)+'%'
			},500);
		}
		$('.show-star-index').removeClass('show-star-index');
		_this.$starList[_this.currentIndex].addClass('show-star-index');
	},
	initbase: function(){
		var _this = this;
		var imgs = _this.$base.find('img');
		_this.$base.css({"height": _this.height+'px', "width": _this.width+'px', "overflow": 'hidden'});
		_this.$showBox.css({'position': 'relative'});
		_this.$showStar = $(document.createElement('div'));
		_this.$showStar.css({
			'width': _this.widthpx+'px',
			'height': '50px',
			'position': 'relative',
			'top': _this.height-50+'px',
			'background-color': '#d2d6de',
			'opacity': '0.5'
		});
		var $other = $(document.createElement('div'));
		$other.css({'position': 'absolute', 'top': _this.height+35+'px', 'z-index': '999', 'width': _this.width+'px', 'text-align': 'center'});
		for(var i =0;i <imgs.length;i++){
			var $new_div = $(document.createElement('div'));
			$new_div.css({
				"background-image": "url("+$(imgs[i]).attr('src')+")",
				"height": _this.height+'px', 
				"width": _this.width+'px',
				"background-size": "cover",
				"background-position": "center center",
				"background-repeat": "no-repeat",
				"position": "relative",
				"top": -(i*_this.height)+'px',
				"float": "left",
				"left": i*_this.width+'px'
			});
			var $new_star = $(document.createElement('div'));
			$new_star.attr('data-index',i);
			$new_star.addClass('show-star');
			_this.$starList.push($new_star);
			$other.append($new_star);
			_this.$showBox.append($new_div);
			_this.imgList.push($new_div);
		};
		_this.$base.append(_this.$showBox);
		imgs.remove();
		_this.$base.append($other);
		_this.$base.append(_this.$showStar);
		_this.$starList[0].addClass('show-star-index');;
		_this.$base.show();
	}
});
