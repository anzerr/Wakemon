if (!isset(mob)) {
	var mob = {};
}

mob["skeleton"] = function( ent, id, x, y ) {
	this.map = ent.map;
	this.gui = ent.gui;
	this.player = ent.player;
	this.context = this.gui.context;
	//this.id = id;
	this.ent = ent;
	this.x = x;
	this.y = y;

	this.randomangle();
	this.enemy = true;
	this.modeltype = "skeleton";
	this.dropitempool = {
		0:"attackpotion",
		1:"bbgem",
		2:"bbgem",
		2:"healthpotion",
		3:"healthpotion",
		4:"healthpotion",
		5:"healthpotion",
		6:"sbgem",
		7:"sbgem",
		8:"sbgem",
		9:"sbgem",
		10:"sbgem",
		11:"meat",
		12:"meat",
		13:"meat",
		14:"meat",
		15:"meat",
		16:"heart",
		17:"heart",
		18:"heart",
		19:"heart",
		20:"heart",
		21:"bone",
		22:"bone",
		23:"bone",
		24:"bone",
		25:"bone",
	}
	this.entName = "Skeleton";
	this.stats_points = {
		"hp":10,
		"attack":1
	}
}

mob["skeleton"].prototype = new _mob();

mob["skeleton"].prototype.death = function( reward ) {
	if (reward) {
		if (Math.round(Math.random()*3) == 1) {
			var i = new items[ this.dropitempool[Math.round(Math.random()*(Object.keys(this.dropitempool).length-1))] ]( this.ent, this.x, this.y, i )
			this.ent.add( i );
			i.spawn( this.x, this.y );
		}
		this.player.stats_points.xp += Math.round(Math.random()*100);
	}
}

mob["skeleton"].prototype.use = function() {
	this.setangle( this.player.ax*-1, this.player.ay*-1 );
}
