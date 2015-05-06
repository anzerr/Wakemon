if (!isset(items)) {
	var items = {};
}

items["healthpotion"] = function( ent, x, y, id ) {
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
	this.hy = 3;
	
	this.shadowsize = 3;
	this.id = ( (!isset(id))? ent.render.length : id );
	
	this.charge = 3;
	this.namechange = {
		0:"Empty Health potion",
		1:"Less Health potion",
		2:"Half Health potion",
		3:"Full Health potion",
	}
	this.name = this.namechange[ this.charge ];
}

items["healthpotion"].prototype = new _item();

items["healthpotion"].prototype.active = function() {
	this.charge += -1;
	this.player.stats_points.hp += 1;
	this.hx += 1;
	this.name = this.namechange[ this.charge ];
	if (this.charge == 0) {
		if ( isset(this.idparent) ) {
			this.idparent.remove( this.id );
			return (true);
		}
	}
	return (false);
}
