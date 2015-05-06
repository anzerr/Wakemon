
var _gui = function( map ) {
	this.map = map;
	this.body = new create_div( );
		this.body.style( {"width":"800px", "height":"800px", "overflow":"hidden", "BColor":rgb(0,0,0), "position":"relative", "margin":"0 auto"} );
	
	this.img = [];
	var loadimg = {
		'1':"./content/map/1.png",
		'2':"./content/map/2.png",
		'3':"./content/map/3.png",
		'env':"./content/env.png",
		'player':"./content/npc/player.png",
		'skeleton':"./content/npc/skeleton.png"
	}
	for (var i in loadimg) {
		this.img[i] =  new Image;
		this.img[i].src = loadimg[i];
		this.img[i].load = false;
		this.img[i].onload = function() { this.load = true; }
	}

	this.canvas = new create_div( {'t':"canvas", 'p':this.body} );
	this.canvas.style( {"width":"100%", "height":"100%", "BColor":rgb(0,0,0)} );
	this.canvas.div.width = this.canvas.div.offsetWidth; 
	this.canvas.div.height = this.canvas.div.offsetHeight;
	this.context = this.canvas.div.getContext("2d");

	this.canvas2 = new create_div( {'t':"canvas", 'p':this.body} );
	this.canvas2.style( {"width":"1px", "height":"1px", "BColor":rgb(0,0,0), "display":"none"} );
	this.canvas2.div.width = this.canvas.div.offsetWidth; 
	this.canvas2.div.height = this.canvas.div.offsetHeight;
	this.context2 = this.canvas2.div.getContext("2d");

	window.onresize = function() {
		var a = window.onresize.gui;
		a.canvas.div.width = a.canvas.div.offsetWidth; 
		a.canvas.div.height = a.canvas.div.offsetHeight;
	}
	
	window.onresize.gui = this;
	this.loading = 0.0001;
	this.menu = new _menu( this.map, this );
	this.lmapx = 0;
	this.lmapy = 0;
}

_gui.prototype.draw = function( a ) {
	if (this.player !=  false) {
		if (a == 0) {
			this.context.clearRect( 0, 0, this.canvas.div.width, this.canvas.div.height );
			this.context.drawImage(this.img['2'], this.map.x, this.map.y);
			if ( this.lmapx != this.map.x || this.lmapy != this.map.y ) {
				this.lmapy = this.map.y;
				this.lmapx = this.map.x;
				this.context2.clearRect( 0, 0, this.canvas2.div.width, this.canvas2.div.height );
				this.context2.drawImage(this.img['1'], this.map.x, this.map.y);
			
				this.imgData = this.context2.getImageData(0, 0, this.canvas2.div.height, this.canvas2.div.width).data
			}
		} else {
			this.context.drawImage(this.img['3'], this.map.x, this.map.y);
		}
	}
}

_gui.prototype.collision = function( nx, ny, range, ent, type ) {
	if (this.player !=  false) {
		/*this.context2.clearRect( 0, 0, this.canvas2.div.width, this.canvas2.div.height );
		this.context2.drawImage(this.img['1'], this.map.x, this.map.y);
		
		var imgData = this.context2.getImageData(0, 0, this.canvas2.div.height, this.canvas2.div.width)*/
		var color = {
			"0, 0, 255":0,
			"255, 255, 255":0
		}
		for (var x=range*-1; x<range; x++) {
			for (var y=range*-1; y<range; y++) {
				var pixelpos = ( (this.canvas2.div.width*(ny+this.map.y+y))+ (nx+this.map.x+x) )*4
				color[ this.imgData[ pixelpos ]+", "+this.imgData[ pixelpos+1 ]+", "+this.imgData[ pixelpos+2 ] ] += 1;
				
				if ( this.imgData[ pixelpos ] == 0 && this.imgData[ pixelpos+1 ] == 0 && this.imgData[ pixelpos+2 ] == 0 ) {
					ent.lastcollisioninfo = "map";
					return (true);
				}
			}
		}
		if ( isset(this.player.grid) ) {
			for (var i in this.player.grid) {
				if ( (this.player.grid[i] != ent && this.player.grid[i].collisiontype == 1) || type == 1) {
					if (distance( nx, ny, this.player.grid[i].x, this.player.grid[i].y ) < ( (isset(this.player.grid[i].size))? range+this.player.grid[i].size : range ) ) {
						ent.lastcollisioninfo = this.player.grid[i]
						return (true);
					}
				}
			}
		}
		
		if ( ent ) {
			var type = "", max = 0; 
			for (var i in color) {
				if ( max < color[i]) {
					type = i;
					max = color[i];
				}
			}
			//console.log( color );
			ent.inwater = ( ( type == "0, 0, 255" )? true : false );
		}
	}
	return (false);
}

_gui.prototype.load = function(  a ) {
	this.context.clearRect( 0, 0, this.canvas.div.width, this.canvas.div.height );

	this.loading = Math.min( 1, ( (a == 1)? this.loading+0.05 : this.loading/(this.loading+0.1) ) );
	
	var w = this.canvas.div.width;
	var h = this.canvas.div.width;
	var s = 6
	this.context.beginPath();
		this.context.rect( (w-((w*0.8)+s))/2, (h-(20+s))/2, (w*0.8)+s,  20+s);
		this.context.lineWidth = 2;
		this.context.strokeStyle = 'gray';
	this.context.stroke();
	
	this.context.beginPath();
		this.context.rect( (w-(w*0.8))/2, (h-(20))/2, (w*0.8)*this.loading ,  20);
		this.context.fillStyle = 'gray';
	this.context.fill();
}