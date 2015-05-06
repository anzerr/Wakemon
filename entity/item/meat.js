if (!isset(items)) {
	var items = {};
}

items["meat"] = function( ent, x, y, id ) {
	this.map = ent.map;
	this.gui = ent.gui;
	this.player = ent.player;
	this.context = this.gui.context;
	this.ent = ent;
	this.x = x;
	this.y = y;
	this.cx = this.x;
	this.cy = this.y;
	
	this.hx = 2;
	this.hy = 1;

	this.size = 6;
	this.id = ( (!isset(id))? ent.render.length : id );
	this.name = "Meat";
}

items["meat"].prototype = new _item();

items["meat"].prototype.active = function() {
	console.log("cat");
	return (false);
}
