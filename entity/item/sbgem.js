if (!isset(items)) {
	var items = {};
}

items["sbgem"] = function( ent, x, y, id ) {
	this.map = ent.map;
	this.gui = ent.gui;
	this.player = ent.player;
	this.context = this.gui.context;
	this.ent = ent;
	this.x = x;
	this.y = y;
	this.cx = this.x;
	this.cy = this.y;
	
	this.hx = 0;
	this.hy = 2;
	
	this.max = 3;
	this.delay = 400;
	this.shadowsize = 4
	this.id = ( (!isset(id))? ent.render.length : id );
	this.candrop = false;
	this.name = "Small Blue Gem";
}

items["sbgem"].prototype = new _item();

items["sbgem"].prototype.active = function() {
	console.log("you licked the small gem");
	return (false);
}
