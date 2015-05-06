
var _item = function( ) {
	this.x = 0;
	this.y = 0;
	this.cx = this.x;
	this.cy = this.y;
	this.enttype = "item";
	
	this.hx = 0;
	this.hy = 0;
	
	this.collisiontype = 0;
	this.size = 6;
	this.shadowsize = 6;
	this.id = 0;
	this.idparent = false;
	
	this.ent = {};
	this.cur = 0;
	this.animation = 0;
	
	this.sprite = 0;
	this.max = 0;
	this.delay = 10000;
	this.candrop = true;
	
	this.statuseffectcur = 0;
	this.statuseffectdelay = 1000;
	this.statuseffect = {
		"wet":{
			"value":0,
			"color":rgb(0,0,255),
			"set":function( a, b ) {
				a.statuseffect.wet.value = b;
			},
			"name":function( a ) {
				return ( (a.statuseffect.wet.value != 0 )? "wet" : '' );
			},
			"think":function( a ) {
				a.statuseffect.wet.value = Math.max( 0, a.statuseffect.wet.value-1 );
			}
		},
		"broken":{
			"value":0,
			"color":rgb(255,0,0),
			"set":function( a, b ) {
				a.statuseffect.broken.value = b;
			},
			"name":function( a ) {
				return ( (a.statuseffect.broken.value != 0 )? "broken" : '' );
			},
			"think":function( a ) {
				return (false);
			}
		}
	}
}

_item.prototype.use = function() {
	this.ent.remove( this.id );
	this.player.add( this );
}

_item.prototype.shadow = function() {
	this.context.beginPath();
		this.context.fillStyle = "rgba(0, 0, 0, "+Math.max( 0.3, Math.sin(this.animation)/4)+")";
		this.context.arc( (this.cx+this.map.x)-2, (this.cy+this.map.y)+2, this.shadowsize+(Math.sin(this.animation)/2), 0, 2 * Math.PI, false );
	this.context.fill();
}

_item.prototype.draw = function() {
	var time = (new Date().getTime());
	if ( time > this.cur ) {
		this.cur = time+this.delay;
		this.sprite = ( (this.sprite >= this.max)? 0 : this.sprite+1 );
	}
	if ( time > this.statuseffectcur ) {
		this.statuseffectcur = time+this.statuseffectdelay;
		for (var i in this.statuseffect) {
			this.statuseffect[i].think( this );
		}
	}
	
	this.animation = this.animation+0.075;
	
	this.cx += ( (this.cx>this.x)? -1 : ( (this.cx==this.x)? 0 : 1 ) );
	this.cy += ( (this.cy>this.y)? -1 : ( (this.cy==this.y)? 0 : 1 ) );

	this.context.drawImage(this.gui.img['env'], (this.hx+this.sprite)*16, this.hy*16, 16, 16,(this.cx+this.map.x)-8, ((this.cy+this.map.y)-8)+Math.sin(this.animation), 12, 12);
}

_item.prototype.spawn = function( ox, oy ) {
	var x = Math.round(this.x/12)*12, y = Math.round(this.y/12)*12, found = false;

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
	for (var i in grid){
		if (this.gui.collision( x-(12*grid[i].x), y-(12*grid[i].y), 6, this, 1 ) == false) {
			x = x-(12*grid[i].x);
			y = y-(12*grid[i].y);
			found=true; break;
		}
	}
	
	if  (found) {
		this.x = x;
		this.y = y;
		this.cx = ox;
		this.cy = oy;
	}
	
	return (found);
}