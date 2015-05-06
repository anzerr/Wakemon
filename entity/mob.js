
var _mob = function( ) {
	this.x = 0;
	this.y = 0;
	this.collisiontype  = 1;
	
	this.enttype = "npc";
	
	this.animation = 0;
	this.type = "run 0,1";
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
		"death":{
			'max':11,
			'row':2,
			1:0,
			2:1,
			3:2,
			4:3,
			5:4,
			6:5,
			7:6,
			8:7,
			9:8,
			10:9,
			11:10,
		},
	}
	
	this.move = {
		"1, 0":function(a) {
			return({'x':a.x+1,'y':a.y});
		},
		"-1, 0":function(a) {
			return({'x':a.x-1,'y':a.y});
		},
		"0, 1":function(a) {
			return({'x':a.x,'y':a.y+1});
		},
		"0, -1":function(a) {
			return({'x':a.x,'y':a.y-1});
		},
		"1, 1":function(a) {
			return({'x':a.x+1,'y':a.y+1});
		},
		"-1, -1":function(a) {
			return({'x':a.x-1,'y':a.y-1});
		},
		"-1, 1":function(a) {
			return({'x':a.x-1,'y':a.y+1});
		},
		"1, -1":function(a) {
			return({'x':a.x+1,'y':a.y-1});
		},
	}
	
	this.controlecur = 0;
	this.ay = 1;
	this.ax = 0;
	this.curg = 0;
	this.height = 0;
	this.cheight = 0;
	
	this.size = 6;
	this.shadowsize = 3;
	this.enemy = false;
		this.targetfound = false;
		this.target = null;
		this.tagetfork = 5;
		this.tagetrange = 100;
		
	this.ai = false;
	this.aiset = this.ai;
	this.modeltype =  "player";
	
	this.chatpoint = 0;
	this.chattimes = 0;
	this.canattack = false;
	this.stats_points = {
		"hp":10,
		"attack":1
	}
	this.givereward =  true;
}

_mob.prototype.chatnext = function() {
	if ( isset(this.chat) ) {
		if ( isset( this.chat[this.chattimes][this.chatpoint] ) ) {
			this.chatgui[0].setchat( this.chat[this.chattimes][this.chatpoint]( this ) );
			this.chatpoint += 1;
		} else {
			this.chatpoint = 0;
			this.player.inchat = false;
			this.player.disable = false;
			this.gui.menu.open( "chat", false );
			this.chattimes = ( (isset(this.chat[this.chattimes+1]))? this.chattimes+1 : this.chattimes );
		}
	}
}

_mob.prototype.setenemy = function( a ) {
	this.enemy = a;
	this.lastplayerpos = "";
}

_mob.prototype.initchat = function() {
	if ( isset(this.chat) && !this.player.incombat ) {
		this.chatgui = this.gui.menu.open( "chat", true );
		this.chatgui[0].div.player = this.player;
		this.player.inchat = true;
		this.player.target = this;
		this.player.disable = true;
		this.chatnext();
		this.ax = this.player.ax*-1;
		this.ay = this.player.ay*-1;
	}
}

_mob.prototype.shadow = function() {
	this.context.beginPath();
		this.context.fillStyle = "rgba(0, 0, 0, "+Math.min( 0.4, Math.max(0.2, 0.4-(this.height/10)) )+")";
		this.context.arc( (this.x+this.map.x), (this.y+this.map.y-6)+(this.shadowsize*2.5), Math.max(0.5, (this.shadowsize*1.75)-(this.height*0.3)), 0, 2 * Math.PI, false );
	this.context.fill();
}

_mob.prototype.randomangle = function() {
	this.ay = Math.round( Math.random()*2-1 );
	this.ax = Math.round( (this.ay == 1 || this.ay == -1)? Math.round( Math.random()*2-1 ) : ( (Math.round(Math.random()*1) == 1)? -1 : 1 ) );
	this.lastplayerpos = "";
}

_mob.prototype.setangle = function( x, y ) {
	this.ay = y;
	this.ax = x;
	this.lastplayerpos = "";
}

_mob.prototype.reset = function( ) {
	this.randomangle();
	this.targetfound = false;
	this.aiset = this.ai;
	this.controlecur = 0;
	this.curg = 0;
	this.player.incombat = false;
	this.player.disable = false;
	this.gui.menu.open( "combat", false );
}

_mob.prototype.attack = function() {
	if (this.player.runaway) {
		this.player.stats_points.hp -= this.stats_points.attack*2;
		
		this.player.runaway = false;
		this.canattack = false;
		this.givereward = false;
		this.combatgui[0].log( this.entName+" hit "+this.player.entName+" for "+(this.stats_points.attack*2)+" dmg in the back", this.combatgui );
		this.stats_points.hp = 0;
	}

	if (this.stats_points.hp > 0) {
		this.player.stats_points.hp -= this.stats_points.attack;
		this.canattack = false;
		this.player.canattack = true;
		this.combatgui[0].update( this.stats_points.hp, this.player.stats_points.hp, this.combatgui );
		this.combatgui[0].log( this.entName+" hit "+this.player.entName+" for "+this.stats_points.attack+" dmg", this.combatgui );
	} else {
		if ( isset(this.death) ) {
				this.death( this.givereward );
		}
		this.reset();
		this.deathframes = 10;
		this.animation = 1;
		this.type = "death";
		this.collisiontype = 0;
		this.canattack = false;
	}
	this.combatgui[12].style( {"BColor":rgb(70,70,70)} );
	this.combatgui[11].style( {"BColor":rgb(70,70,70)} );
}

_mob.prototype.draw = function() {
	var move = true;
	var time = (new Date().getTime());
	
	if (this.gui.loading >= 1 ) {
		if (this.stats_points.hp <= 0) {
			if ( this.deathframes <= 0 ) {
				this.ent.remove( this.id );
			}
		} else {
			if (this.aiset && !this.player.inchat) {
				if ( time > this.curg ) {
					if (this.curg  != -1) {
						this.curg = ( (Math.round(Math.random()*20) == 1)? time+Math.round(2000+Math.random()*3000) : 0 );
					}
					
					if ( time > this.controlecur && this.controlecur != -1 ) {
						this.controlecur = time+Math.round(1000+Math.random()*4000);
						this.randomangle();
					}
					
					if ( isset(this.move[this.ax+", "+this.ay]) ) {
						var next = this.move[this.ax+", "+this.ay](this);
						if (this.gui.collision( next.x, next.y, 6, this ) == false) {
							this.type = "run "+this.ax+','+this.ay;
							this.x = next.x;
							this.y = next.y;
							move = false;
						} else {
							if (!this.targetfound) {
								this.randomangle();
							} else {
								if ( distance( this.x, this.y, this.player.x, this.player.y ) > 20 ) {
									if (this.lastcollisioninfo != "map") {
										if (this.lastcollisioninfo.enemy) {
											this.lastcollisioninfo.ax = this.ax;
											this.lastcollisioninfo.ay = this.ay;
											this.lastcollisioninfo.lastplayerpos = "";
										}
									}
									this.reset( );
								} else {
									if (this.openmenu) {
										this.openmenu = false;
										this.combatgui = this.gui.menu.open( "combat", true );
										this.player.canattack = true;
										this.combatgui[0].update( this.stats_points.hp, this.player.stats_points.hp, this.combatgui );
										this.combatgui[3].combatlog = '';
										this.combatgui[0].log( this.player.entName+" enters in to combat with "+this.entName, this.combatgui );
									}
								}
							}
						
							this.curg = time+Math.round(2000+Math.random()*3000);
						}
					}
				}
			}
			if (this.enemy && !this.targetfound && !this.player.inchat && this.lastplayerpos != this.player.x+","+this.player.y && !this.player.incombat) {
				this.lastplayerpos = this.player.x+","+this.player.y;
				var losx = Math.round(this.x-this.player.x), losy = Math.round(this.y-(this.player.y-1));
				if (distance( this.x, this.y, this.player.x, this.player.y ) < this.tagetrange ) {
					if ( (losy*this.ax) <= (losx*this.ay)+(this.tagetfork) && (losy*this.ax) >= (losx*this.ay)+(this.tagetfork*-1) ) {
						if ( ( ((losy<=this.ay)? 1 : -1 ) == this.ay || this.ay == 0 ) && ( ((losx<=this.ax)? 1 : -1 ) == this.ax || this.ax == 0 )  ) {
							this.controlecur = -1;
							this.curg = -1;
							this.player.incombat = true;
							this.player.disable = true;
							this.player.runaway = false;
							this.targetfound = true;
							this.player.ax = this.ax*-1;
							this.player.ay = this.ay*-1;
							this.aiset = true;
							this.canattack = false;
							this.openmenu = true;
							this.player.target = this;
						}
					}
				}
			}
			
			if (move && this.type != "stand "+this.ax+','+this.ay) {
				this.type = "stand "+this.ax+','+this.ay;
			}
			
			this.height = Math.max( 0, this.height-( (this.cheight<=this.height)? 1 : -1) );
			this.cheight = ( (this.height>=this.cheight)? 0 : this.cheight );
		}
		
		if (this.canattack && this.enemy && this.targetfound) {
			if ( time > this.attackcur ) {
				this.attack();
			}
		}
	}
	
	if ( isset(this.frame[this.type]) ) {
		if ( time > this.cur+300 || this.type != this.lastanimation) {
			this.cur = time;
			this.lastanimation = this.type
			if (this.stats_points.hp <= 0) {
				this.deathframes--;
			}
			this.animation = ( (this.animation >= this.frame[this.type].max)? 1 : this.animation+1 );
		}
		this.context.drawImage(
			this.gui.img[ this.modeltype ], 
			this.frame[this.type][this.animation]*32, 
			this.frame[this.type].row*32, 
			32, 
			32, 
			(this.x+this.map.x)-12, 
			((this.y+this.map.y)-18)-this.height, 
			24, 
			24
		);
	}
}