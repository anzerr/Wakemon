if (!isset(env)) {
	var env = {};
}

env["flower"] = function( ent, x, y ) {
	this.map = ent.map;
	this.gui = ent.gui;
	this.player = ent.player;
	this.context = this.gui.context;
	this.ent = ent;
	this.x = x;
	this.y = y;
	
	this.hx = 4;
	
	this.max = 3;
	this.delay = (60+Math.round(Math.random()*20))*1000;
	this.animation = 3;
}

env["flower"].prototype = new _env();

env["flower"].prototype.use = function() {
	if (this.animation == this.max) {
		if (Math.round(Math.random()*10) == 1) {
			var itempool = {
				0:"bbgem",
				1:"sbgem"
			}
			var i = 0; while ( isset(this.ent.render[(i = i + 1)]) );
			this.ent.render[i] = new items[ itempool[Math.round(Math.random()*(Object.keys(itempool).length-1))] ]( this.ent, this.x, this.y, i );
			this.ent.render[i].spawn( this.x, this.y );
		}
		this.animation = 0;
	}
}
