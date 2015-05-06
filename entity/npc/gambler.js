if (!isset(mob)) {
	var mob = {};
}

mob["gambler"] = function( ent, id, x, y ) {
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
	this.gameon = false;
		this.chat = {
			0:{
				0:function( a ) {
					return ("So want to gamble gems for prizes?");
				}
			},
			1:{
				0:function( a ) {
					return ("So you do.");
				},
				1:function( a ) {
					return ("It will be 1 big blue gem for a game.");
				},
				2:function( a ) {
					return ("You always win something just not always something good");
				},
				3:function( a ) {
					a.gameon = true;
					return ("Ready to play?");
				}
			},
			2:{
				0:function( a ) {
					if (a.itemfound) {	
						var str = {
							0: "It's time to roll the dice.",
							1: "Bad habits always pay off in the long run.",
							2: "Time to toss the dice."
						}
						return ( str[ Math.round( Math.random()*(Object.keys(str).length-1) ) ] );
					} else {
						var str = {
							0: "That will be one gem if you want to play.",
							1: "Only one big blue gem to play.",
							2: "For one big blue gem you can even win a big blue gem so you in?."
						}
						return ( str[ Math.round( Math.random()*(Object.keys(str).length-1) ) ] );
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

mob["gambler"].prototype = new _mob();

mob["gambler"].prototype.death = function( reward ) {
	if (reward) {
		var i = new items[ this.dropitempool[Math.round(Math.random()*(Object.keys(this.dropitempool).length-1))] ]( this.ent, this.x, this.y, i )
		this.ent.add( i );
		i.spawn( this.x, this.y );
		this.player.stats_points.xp += Math.round(Math.random()*100);
	}
}

mob["gambler"].prototype.use = function() {
	this.itemfound = false;
	if (this.gameon) {
		if (!this.player.inchat && this.stats_points.hp > 0 && !this.player.incombat) {
			for (var i in this.ent.render) {
				if ( this.ent.render[i].enttype == "item" && distance( this.x, this.y, this.ent.render[i].x, this.ent.render[i].y ) < 200 ) {
					if (this.ent.render[i].name == "Big Blue Gem") {
						var e = new items[ this.dropitempool[Math.round(Math.random()*(Object.keys(this.dropitempool).length-1))] ]( this.ent, this.x, this.y, i )
						this.ent.add( e );
						e.spawn( this.x, this.y );
						this.ent.remove( i );
						this.itemfound = true;
						break;
					}
				}
			}
		}
		
	}
	this.initchat();
}
