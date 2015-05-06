if (!isset(items)) {
	var items = {};
}

items["attackpotion"] = function( ent, x, y, id ) {
	this.map = ent.map;
	this.gui = ent.gui;
	this.player = ent.player;
	this.context = this.gui.context;
	this.ent = ent;
	this.x = x;
	this.y = y;
	this.cx = this.x;
	this.cy = this.y;
	
	this.hx = 7;
	this.hy = 3;
	
	this.shadowsize = 3;
	this.id = ( (!isset(id))? ent.render.length : id );
	
	this.charge = 3;
	this.namechange = {
		0:"Empty Attack potion",
		1:"Less Attack potion",
		2:"Half Attack potion",
		3:"Full Attack potion",
	}
	this.name = this.namechange[ this.charge ];
}

items["attackpotion"].prototype = new _item();

items["attackpotion"].prototype.active = function() {
	this.charge += -1;
	this.player.stats_points.attack += 1;
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
