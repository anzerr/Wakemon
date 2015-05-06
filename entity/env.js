
var _env = function( ) {
	this.x = 0;
	this.y = 0;
	this.hx = 0;
	this.hy = 0;
	this.collisiontype = 0;
	this.cur = 0;
	this.size = 6;
	this.animation = 0;
	this.max = 0;
	this.delay = 1000;
	this.enttype = "env";
	this.lastupdate = 0;
}

_env.prototype.draw = function() {
	var time = (new Date().getTime());
	if ( time > this.cur ) {
		this.cur = time+this.delay;
		this.animation = Math.min( this.max, this.animation+Math.round( (time-this.lastupdate)/this.delay ) );
		this.lastupdate = time
	}
	this.context.drawImage(this.gui.img['env'], (this.hx+this.animation)*16, this.hy*16, 16, 16,(this.x+this.map.x)-8, (this.y+this.map.y)-8, 16, 16);
}