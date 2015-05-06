if (!isset(items)) {
	var items = {};
}

items["console"] = function( ent, x, y, id ) {
	this.map = ent.map;
	this.gui = ent.gui;
	this.player = ent.player;
	this.context = this.gui.context;
	this.ent = ent;
	this.x = x;
	this.y = y;
	this.cx = this.x;
	this.cy = this.y;
	
	this.hx = 10;
	this.hy = 3;

	this.size = 4;
	this.max = 1;
	this.delay = 400;
	this.id = ( (!isset(id))? ent.render.length : id );
	this.name = "Hardcore console";
	this.statuseffect.wet.set = function( a, b ) {
		a.statuseffect.wet.value = b;
		a.statuseffect.broken.value = b;
	}
}

items["console"].prototype = new _item();

items["console"].prototype.active = function() {
	this.player.hardcore = !this.player.hardcore
	console.log( "hardcore set: "+this.player.hardcore );
	return (false);
}
