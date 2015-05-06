
var _map = function() {
	this.x = 0;
	this.y = 0;
	this.cx = 0;
	this.cy = 0;
	this.player = false;
}

_map.prototype.update = function() {
	if ( this.player != false ) {
		this.cx = (this.player.x*-1)+(this.player.gui.canvas.div.width/2);
		this.cy = (this.player.y*-1)+(this.player.gui.canvas.div.height/2);
		var tmp = Math.max(this.x,this.cx)-Math.min(this.x,this.cx), sx = -1, sy = -1;
		while ((sx = sx+1, tmp = tmp/10) > 1);
		tmp = Math.max(this.y,this.cy)-Math.min(this.y,this.cy)
		while ((sy = sy+1, tmp = tmp/10) > 1);
		this.x += ( (this.cx<this.x)? sx*-1 : ( (this.cx==this.x)? 0 : sx ) );
		this.y += ( (this.cy<this.y)? sy*-1 : ( (this.cy==this.y)? 0 : sy ) );
	}
}