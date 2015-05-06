if (!isset(items)) {
	var items = {};
}

items["halfheart"] = function( ent, x, y, id ) {
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
	this.hy = 3;

	this.max = 1;
	this.delay = 400;
	this.shadowsize = 4;
	this.name = "Sun"
	this.id = ( (!isset(id))? ent.render.length : id );
}

items["halfheart"].prototype = new _item();

items["halfheart"].prototype.use = function() {
	this.player.stats_points.hp += 1;
	if ( isset(this.idparent) ) {
		this.idparent.remove( this.id );
	}
	return (true);
}
