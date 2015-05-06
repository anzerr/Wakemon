
var _door = function( map, gui, player, ix, iy, ox, oy, func1, max1, func2, max2 ) {
	this.map = map;
	this.gui = gui;
	this.player = player;
	this.context = this.gui.context;
	this.ix = ix;
	this.iy = iy;
	this.ox = ox;
	this.oy = oy;
	this.actionframe = 0;
	this.action = function() { };
	
	this.action1 = func1
	this.max1 = max1;
	this.action2 = func2
	this.max2 = max2;
}

_door.prototype.draw = function() {
	if ( this.actionframe <= 0 ) {
		if (this.disable) {
			this.disable = false;
			this.player.disable = this.disable;
		}
		
		if (distance( this.player.x, this.player.y, this.ix, this.iy) < 14 ) {
			this.player.x = this.ox;
			this.player.y = this.oy;
			this.actionframe = this.max1;
			this.action = this.action1;
			this.disable = true;
			this.player.disable = this.disable;
			return (true);
		}
		if (distance( this.player.x, this.player.y, this.ox, this.oy) < 14 ) {
			this.player.x = this.ix;
			this.player.y = this.iy;
			this.actionframe = this.max2;
			this.action = this.action2;
			this.disable = true;
			this.player.disable = this.disable;
			return (true);
		}
	} else {
		var a = this.action( this.player );
		this.player.x = a.x; this.player.y = a.y;
		this.actionframe--;
	}
}
