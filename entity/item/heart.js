if (!isset(items)) {
	var items = {};
}

items["heart"] = function( ent, x, y, id ) {
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
	this.hy = 3;

	this.max = 1;
	this.delay = 400;
	this.shadowsize = 6;
	this.name = "Sun"
	this.id = ( (!isset(id))? ent.render.length : id );
}

items["heart"].prototype = new _item();

items["heart"].prototype.use = function() {
	this.player.stats_points.hp += 2;
	if ( isset(this.idparent) ) {
		this.idparent.remove( this.id );
	}
	return (true);
}
