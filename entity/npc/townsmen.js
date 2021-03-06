if (!isset(mob)) {
	var mob = {};
}

mob["townsmen"] = function( ent, id, x, y ) {
	this.map = ent.map;
	this.gui = ent.gui;
	this.player = ent.player;
	this.context = this.gui.context;
	this.id = id;
	this.ent = ent;
	this.x = x;
	this.y = y;

	this.randomangle();
	this.ai = true;
	this.aiset = this.ai;
	if (Math.round(Math.random()*2) == 1) {
		this.chat = {
			0:{
				0:function( a ) {
					return ("Hello");
				},
				1:function( a ) {
					return ("Have you seen my bear?");
				}
			},
			1:{
				0:function( a ) {
					return ("Have your found it?");
				}
			}
		}
	} else {
		this.chat = {
			0:{
				0:function( a ) {
					return ("Fuck off I have no time for you.");
				}
			},
			1:{
				0:function( a ) {
					return ("Why are you still here?");
				},
				1:function( a ) {
					return ("Be gone!");
				}
			},
			2:{
				0:function( a ) {
					a.setenemy( true );
					return ("...");
				}
			}
		}
	}
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
	this.entName = "Townsmen";
	this.stats_points = {
		"hp":10,
		"attack":1
	}
}

mob["townsmen"].prototype = new _mob();

mob["townsmen"].prototype.death = function( reward ) {
	if (reward) {
		if (Math.round(Math.random()*3) == 1) {
			var i = new items[ this.dropitempool[Math.round(Math.random()*(Object.keys(this.dropitempool).length-1))] ]( this.ent, this.x, this.y, i )
			this.ent.add( i );
			console.log("drop")
			i.spawn( this.x, this.y );
		}
		this.player.stats_points.xp += Math.round(Math.random()*100);
	}
}

mob["townsmen"].prototype.use = function() {
	if (!this.player.inchat && this.stats_points.hp > 0 && !this.player.incombat) {
		for (var i in this.ent.render) {
			if ( this.ent.render[i].enttype == "item" && distance( this.x, this.y, this.ent.render[i].x, this.ent.render[i].y ) < 200 ) {
				if (this.ent.render[i].name == "Big Blue Gem") {
					var newent = new items["halfheart"]( this.ent, this.x, this.y );
					this.ent.add( newent )
					newent.spawn( this.x, this.y );
					this.ent.remove( i );
					break;
				}
			}
		}
		
		this.initchat();
	}
}
