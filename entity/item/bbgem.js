if (!isset(items)) {
	var items = {};
}

items["bbgem"] = function( ent, x, y, id ) {
	this.map = ent.map;
	this.gui = ent.gui;
	this.player = ent.player;
	this.context = this.gui.context;
	this.ent = ent;
	this.x = x;
	this.y = y;
	this.cx = this.x;
	this.cy = this.y;
	
	this.hx = 4;
	this.hy = 2;
	
	this.max = 3;
	this.delay = 400;
	this.shadowsize = 6;
	this.name = "Big Blue Gem"
	this.id = ( (!isset(id))? ent.render.length : id );
}

items["bbgem"].prototype = new _item();

items["bbgem"].prototype.active = function() {
	console.log("big gem used it did nothing");
	this.hx = ( (this.hx == 4)? 5 : 4 );
	return (false);
}
