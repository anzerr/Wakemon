
var keystate = [];
var keyfound = [];
	window.onkeydown = function(e) { keystate[(e.keyCode)] = true; }
	window.onkeyup = function(e) { keystate[(e.keyCode)] = false; }

var _player = function( map, gui ) {
	this.map = map;
	this.gui = gui;
	this.context = this.gui.context;
	//if ( Math.round(Math.random()*2) == 1) {
		this.spawn_x = 800;
		this.spawn_y = 3175;
	//} else {
		//this.spawn_x = 190;
		//this.spawn_y = 700;
	//}
	
	this.x = this.spawn_x;
	this.y = this.spawn_y;
	this.cur = 0;
	this.ay = 1;
	this.ax = 0;
	this.inventory = [];
	
	this.collisiontype = 1;
	this.size = 6;
	
	this.movefunc = {
		// arrow left
		37:function(a, keystate) {
			if (!a.disable) {
				a.ax = -1; 
				a.ay = 0;
				return({'x':a.x-1,'y':a.y});
			} else if (a.gui.menu.display) {
				console.log("menu acttion left");
				keyfound[37] = false; 
			}
			return(false); 
		},
		// arrow up
		38:function(a, keystate) { 
			if (!a.disable) {
				a.ax = ( (isset(keystate[37]) && keystate[37])? -1 : 0 ); 
				a.ay = -1;  
				return({'x':a.x,'y':a.y-1});
			} else if (a.gui.menu.display) {
				a.gui.menu.elemid -= 1;
				keyfound[38] = false; 
			}
			return(false); 
		},
		// arrow right
		39:function(a, keystate) { 
			if (!a.disable) {
				a.ax = 1; 
				a.ay = ( (isset(keystate[38]) && keystate[38])? -1 : 0 ); 
				return({'x':a.x+1,'y':a.y});
			} else if (a.gui.menu.display) {
				console.log("menu acttion right");
				keyfound[39] = false; 
			}
			return(false); 
		},
		// arrow down
		40:function(a, keystate) { 
			if (!a.disable) {
				a.ax = ( (isset(keystate[37]) && keystate[37])? -1 : ( (isset(keystate[39]) && keystate[39])? 1 : 0 ) ); 
				a.ay = 1; 
				return({'x':a.x,'y':a.y+1});
			} else if (a.gui.menu.display) {
				a.gui.menu.elemid += 1;
				keyfound[40] = false; 
			}
			return(false); 
		},
		// esc button
		27:function(a, keystate) {
			var time = (new Date().getTime());
			if ( time > a.gui.menu.cur+1000 ) {
				a.gui.menu.display = ( (isset(a.gui.menu.display))? !a.gui.menu.display : true );
				a.gui.menu.cur = ( (a.gui.menu.display)? (new Date().getTime()) : a.gui.menu.cur );				
				a.gui.menu.open( "menu", a.gui.menu.display );
				if (!a.incombat) {
					a.disable = a.gui.menu.display; 
				}
			}
			keyfound[27] = false; 
			return(false); 
		},
		// space bar
		32:function(a, keystate) { 
			a.cheight = 10; 
			console.log(a.x+", "+a.y); 
			console.log(a.inventory); 
			keyfound[32] = false; 
			return(false); 
		},
		// f key
		70:function(a, keystate) { 
			for (var i in a.inventory) {
				a.drop( i );
				break;
			}
			keyfound[70] = false;  
			return(false); 
		},
		// 'e' button
		69:function(a, keystate) { 
			if (a.inchat) {
				if ( isset(a.target.chatnext) ) {
					a.target.chatnext();
				} else {
					a.inchat = false;
					a.disable = false;
					a.gui.menu.open( "chat", false );
				}
			} else {
				if ( isset(a.grid) ) {
					var _itemused = false;
					for (var v in a.userorder) {
						if (_itemused) { break; } 
						for (var i in a.grid) {
							if (a.grid[i].enttype == a.userorder[v] || a.userorder[v] == 'all') {
								if ( distance( a.x+(a.ax*10), a.y+(a.ay*10), a.grid[i].x, a.grid[i].y) < 10 && isset(a.grid[i].use) ) {
									a.grid[i].use();
									_itemused =  true;
									break;
								}
							}
						}
					}
				}
			}
			keyfound[69] = false; 
			return(false); 
		}
	};
	this.userorder = {
		0:"item",
		1:"npc",
		2:"env",
		3:'all'
	}
	
	this.map.x = (this.x*-1)+(this.gui.canvas.div.width/2);
	this.map.y = (this.y*-1)+(this.gui.canvas.div.height/2);
	this.animation = 0;
	this.type = "stand";
	this.frame = {
		"run 0,1":{
			'max':2,
			'row':0,
			1:0,
			2:2
		},
		"stand 0,1":{
			'max':1,
			'row':0,
			1:1
		},
		"run 1,0":{
			'max':2,
			'row':0,
			1:3,
			2:5
		},
		"stand 1,0":{
			'max':1,
			'row':0,
			1:4
		},
		"run 0,-1":{
			'max':2,
			'row':0,
			1:6,
			2:8
		},
		"stand 0,-1":{
			'max':1,
			'row':0,
			1:7
		},
		"run -1,0":{
			'max':2,
			'row':0,
			1:9,
			2:11
		},
		"stand -1,0":{
			'max':1,
			'row':0,
			1:10
		},
		"run 1,1":{
			'max':2,
			'row':1,
			1:0,
			2:2
		},
		"stand 1,1":{
			'max':1,
			'row':1,
			1:1
		},
		"run -1,1":{
			'max':2,
			'row':1,
			1:3,
			2:5
		},
		"stand -1,1":{
			'max':1,
			'row':1,
			1:4
		},
		"run 1,-1":{
			'max':2,
			'row':1,
			1:6,
			2:8
		},
		"stand 1,-1":{
			'max':1,
			'row':1,
			1:7
		},
		"run -1,-1":{
			'max':2,
			'row':1,
			1:9,
			2:11
		},
		"stand -1,-1":{
			'max':1,
			'row':1,
			1:10
		},
	}
	
	this.height = 0;
	this.cheight = 0;
	this.shadowsize = 3;
	
	this.incombat = false;
	this.canattack = false;
	this.stats_points = {
		"hp":10,
		"attack":1,
		"xp":0,
	}
	this.entName = "Player";
	this.spawnflash = 0;
	this.hardcore = false;
	this.inwater = false;
	this.waterbob = 0;
	this.statuseffectcur = 0;
	this.statuseffectdelay = 1000;
}

_player.prototype.attack = function( run ) {
	if ( isset(this.target) ) {
		if (run) {
			this.runaway =  true;
			this.canattack = false;
			this.combatgui = this.target.combatgui;
			this.target.canattack = true;
			this.combatgui[0].update( this.target.stats_points.hp, this.stats_points.hp, this.combatgui );
			this.combatgui[0].log( this.entName+" starts to run from "+this.target.entName, this.combatgui );
			this.target.attackcur = (new Date().getTime())+500;
		} else {
			this.target.stats_points.hp -= this.stats_points.attack;
			this.canattack = false;
			this.combatgui = this.target.combatgui;
			this.target.canattack = true;
			this.combatgui[0].update( this.target.stats_points.hp, this.stats_points.hp, this.combatgui );
			this.combatgui[0].log( this.entName+" hit "+this.target.entName+" for "+this.stats_points.attack+" dmg", this.combatgui );
			this.target.attackcur = (new Date().getTime())+500;
		}
	}
}

_player.prototype.shadow = function() {
	if (!this.inwater) {
		this.context.beginPath();
			this.context.fillStyle = "rgba(0, 0, 0, "+Math.min( 0.4, Math.max(0.2, 0.4-(this.height/10)) )+")";
			this.context.arc( (this.x+this.map.x), (this.y+this.map.y-6)+(this.shadowsize*2.5), Math.max(0.5, (this.shadowsize*1.75)-(this.height*0.3)), 0, 2 * Math.PI, false );
		this.context.fill();
	}
}

_player.prototype.draw = function() {
	var change = true;
	if (this.stats_points.hp <= 0) {
		this.x = this.spawn_x;
		this.y = this.spawn_y;
		this.stats_points.hp = 10;
		this.spawnflash = 10;
		if ( isset(this.target) ) {
			this.target.reset();
		}
	} else {
		for(var key in keystate) {
			if ( isset(this.movefunc[key])  ){
				if ( keystate[key] == true ) {
					if (keyfound[key] != false) {
						var next = this.movefunc[key](this, keystate);
						if (next != false) {
							if (this.gui.collision( next.x, next.y, this.size, this ) == false) {
								this.x = next.x;
								this.y = next.y;
								this.type = "run "+this.ax+','+this.ay;
								change = false;
							}
						}
					}
				} else {
					keyfound[key] = true;
				}
			}
		}
		if (change) {
			this.type = "stand "+this.ax+','+this.ay;
		}
		this.height = Math.max( 0, this.height-( (this.cheight<=this.height)? 1 : -1) );
		this.cheight = ( (this.height>=this.cheight)? 0 : this.cheight );
	}
	if ( isset(this.frame[this.type]) ) {
		var time = (new Date().getTime());
		if ( time > this.cur+300 || this.type != this.lastanimation) {
			this.cur = time;
			this.lastanimation = this.type
			this.animation = ( (this.animation >= this.frame[this.type].max)? 1 : this.animation+1 );
			this.spawnflash = Math.max( 0, this.spawnflash-1 );
			this.spawnmob();
		}
		if (this.inwater) {
			if (this.waterbob == 0) {
				if ( time > this.statuseffectcur ) {
					this.statuseffectcur = time+this.statuseffectdelay;
					for (var i in this.inventory) {
						this.inventory[i].statuseffect.wet.set( this.inventory[i], 100 );
					}
				}
			}
			this.waterbob += 0.05;
		} else {
			this.statuseffectcur = 0;
			this.waterbob = 0;
		}
		
		if (this.spawnflash%2 == 0) {
			this.context.drawImage(
				this.gui.img['player'], 
				this.frame[this.type][this.animation]*32, 
				( (!this.inwater)? this.frame[this.type].row : this.frame[this.type].row+3 )*32, 
				32, 
				32, 
				(this.x+this.map.x)-12, 
				( ((this.y+this.map.y)-18)-this.height )+( (this.inwater)? (10+(Math.cos(this.waterbob))) : 0 ), 
				24,
				24
			);
		}
	}
}

_player.prototype.spawnmob = function( ) {
	if ( Math.round(Math.random()*1) == 1 && this.hardcore ) {
		var c = (Math.PI/360)*Math.round(Math.random()*360), r = 100+Math.round(Math.random()*300);
		if ( !this.gui.collision( Math.round(this.x+Math.cos(c)*r), Math.round(this.y+Math.sin(c)*r), this.size, this ) ) {
			this.ent.add( 
				new mob["pigman"]( this.ent, 0, Math.round(this.x+Math.cos(c)*r), Math.round(this.y+Math.sin(c)*r) ) 
			);
			console.log("mob spawned");
		}
	}
}

_player.prototype.add = function( a ) {
	var i = 0; while ( isset(this.inventory[(i = i + 1)]) );
	a.id = i;
	a.idparent = this;
	this.inventory[i] = a;
}

_player.prototype.remove = function( a ) {
	this.inventory[a] = null;
	delete this.inventory[a];
}

_player.prototype.drop = function( a ) {
	var x = Math.round(this.x/12)*12, y = Math.round(this.y/12)*12, found = false;

	if ( this.dropx != x || this.dropy != y) {
		this.dropx = x;
		this.dropy = y;
		this.dropInt = 0;
	}
	
	var grid = {
		0:{ 'x':0, 'y':0 },
		1:{ 'x':1, 'y':0 },
		2:{ 'x':1, 'y':1 },
		3:{ 'x':0, 'y':1 },
		4:{ 'x':-1, 'y':1 },
		5:{ 'x':-1, 'y':0 },
		6:{ 'x':-1, 'y':-1 },
		7:{ 'x':0, 'y':-1 },
		8:{ 'x':1, 'y':-1 },
		9:{ 'x':2, 'y':-1 },
		10:{ 'x':2, 'y':0 },
		11:{ 'x':2, 'y':1 },
		12:{ 'x':2, 'y':2 },
		13:{ 'x':1, 'y':2 },
		14:{ 'x':0, 'y':2 },
		15:{ 'x':-1, 'y':2 },
		16:{ 'x':-2, 'y':2 },
		17:{ 'x':-2, 'y':1 },
		18:{ 'x':-2, 'y':0 },
		19:{ 'x':-2, 'y':-1 },
		20:{ 'x':-2, 'y':-2 },
		21:{ 'x':-1, 'y':-2 },
		22:{ 'x':0, 'y':-2 },
		23:{ 'x':1, 'y':-2 },
		24:{ 'x':2, 'y':-2 },
	};

	while ( isset(grid[this.dropInt]) ) {
		if (this.gui.collision( x-(12*grid[this.dropInt].x), y-(12*grid[this.dropInt].y), 6, this, 1 ) == false) {
			x = x-(12*grid[this.dropInt].x);
			y = y-(12*grid[this.dropInt].y);
			found=true; break;
		}
		this.dropInt = this.dropInt+1;
	}
	
	if  (found) {
		if (isset(this.inventory[a])) {
			this.inventory[a].x = x;
			this.inventory[a].y = y;

			this.inventory[a].cx = this.x;
			this.inventory[a].cy = this.y;
			
			this.ent.add( this.inventory[a] );
			this.inventory[a] = null;
			delete this.inventory[a]
		}
	}
	
	return (found);
}
