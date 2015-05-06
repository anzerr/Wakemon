
var load_scene = function( map, gui, player ) {
	this.map = map;
	this.gui = gui;
	this.player = player;
	this.render = [];
	this.key = [];
	
	var bush = function( ent, grid, m, ox, oy, type ) {
		for (var x=0; x<=m; x++){
			for (var y=0; y<=m; y++){
				if ( isset(grid[y]) ) {
					if (grid[y][x] == 1) {
						ent.add( new env[type]( ent, ox+(x*16), oy+(y*16) ) );
					}
				}
			}
		}
	}

	this.add( new mob["gambler"]( this, this.render.length, 170, 780 ) );
	for (var i=0; i<7; i++){
		this.add( new mob["skeleton"]( this, this.render.length, 332, 780+(i*16) ) );
	}

	for (var v=0; v<15; v++){
		for (var i=0; i<3; i++){
			this.add( new mob["townsmen"]( this, this.render.length, 1095+(i*14), 2939+(v*16) ) );
		}
	}
	for (var v=0; v<2; v++){
		for (var i=0; i<37; i++){
			this.add( new mob["townsmen"]( this, this.render.length, 899+(i*14), 3205+(v*16) ) );
		}
	}
	for (var v=0; v<3; v++){
		for (var i=0; i<30; i++){
			this.add( new mob["townsmen"]( this, this.render.length, 1000+(i*14), 3398+(v*16) ) );
		}
	}
	// 302
	
	
	/*var off = 150;
	for (var i=1; i<=5; i++){
		off += 12;
		this.render[ this.render.length ] = new items["meat"]( this, off, 776 );
	}*/
	var off = 40
	for (var i=1; i<=1; i++){
		this.add( new items["console"]( this, 190, 680 ) );
	}
	for (var i=1; i<=1; i++){
		this.add( new items["console"]( this, 780, 3175 ) );
	}
	for (var i=1; i<=5; i++){
		off += 12;
		this.add( new items["bbgem"]( this, off, 760 ) );
	}
	for (var i=1; i<=5; i++){
		off += 12;
		this.add( new items["sbgem"]( this, off, 760 ) );
	}
	for (var i=1; i<=5; i++){
		off += 12;
		var item = new items["healthpotion"]( this, off, 760 )
		item.charge = 1+Math.round( Math.random()*2 );
		item.name = item.namechange[ item.charge ];
		item.hx += 3-item.charge;
		this.add( item );
	}
	for (var i=1; i<=5; i++){
		off += 12;
		var item = new items["attackpotion"]( this, off, 760 )
		item.charge = 1+Math.round( Math.random()*2 );
		item.name = item.namechange[ item.charge ];
		item.hx += 3-item.charge;
		this.add( item );
	}
	
	off = 40;
	for (var i=1; i<=5; i++){
		off += 12;
		this.add( new items["meat"]( this, off, 776 ) );
	}
	for (var i=1; i<=5; i++){
		off += 12;
		this.add( new items["bone"]( this, off, 776 ) );
	}
	for (var i=1; i<=5; i++){
		off += 12;
		this.add( new items["heart"]( this, off, 776 ) );
	}
	for (var i=1; i<=5; i++){
		off += 12;
		this.add( new items["halfheart"]( this, off, 776 ) );
	}
	
	this.add( new _door( 
		map, gui, player, 
		88, 910, 295, 910, 
		function(a) { a.ay = 1; a.ax = 0; return({'x':a.x,'y':a.y+2}) }, 20,
		function(a) { a.ay = 1; a.ax = 0; return({'x':a.x,'y':a.y+2}) }, 20
	) );

	var grid = {};
		grid[0] = { 0:1, 1:1, 2:1, 3:1 };
		grid[1] = { 0:1, 1:1, 2:1 };
		grid[2] = grid[1];
	bush( this, grid, 3, 216, 1160, "grass" );
	
	var grid = {};
		grid[0] = { 2:1, 3:1 };
		grid[1] = { 1:1, 2:1, 3:1, 4:1 };
		grid[2] = { 1:1, 2:1, 3:1, 4:1, 5:1 };
		grid[3] = { 1:1, 2:1, 3:1 };
		grid[4] = { 1:1, 2:1, 3:1, 6:1, 7:1, 8:1, 9:1, 10:1, 11:1 };
		grid[5] = { 6:1, 7:1, 8:1, 9:1, 10:1, 11:1 };
		grid[6] = grid[5];
		grid[9] = grid[3];
		grid[10] = grid[3];
		grid[11] = { 3:1, 4:1, 5:1 };
		grid[12] = { 3:1, 4:1, 5:1, 13:1 };
		grid[13] = { 11:1, 12:1, 13:1, 13:1, 14:1 };
		grid[14] = grid[13];
		grid[15] = grid[13];
	bush( this, grid, 15, 120, 1464, "grass" );
	
	var grid = {};
		grid[0] = { 1:1, 3:1 };
		grid[1] = { 0:1, 2:1 };
	bush( this, grid, 3, 280, 1252, "flower" );
	
	var grid = {};
		grid[0] = { 0:1 };
		grid[1] = { 1:1, 3:1 };
	bush( this, grid, 3, 279, 985, "flower" );
	
	var grid = {};
		grid[0] = { 0:1 };
		grid[1] = { 2:1 };
		grid[2] = grid[0];
		grid[3] = grid[1];
	bush( this, grid, 3, 264, 1464, "flower" );
	
	var grid = {};
		grid[0] = { 1:1, 3:1 };
		grid[1] = { 0:1, 2:1 };
	bush( this, grid, 3, 216, 1672, "flower" );
	
	var grid = {};
		grid[0] = { 0:1 };
		grid[1] = { 1:1 };
		grid[2] = grid[0];
	bush( this, grid, 3, 72, 2600, "flower" );
	
	var grid = {};
		grid[0] = { 0:1, 3:1, 6:1 };
		grid[2] = { 2:1, 5:1 };
	bush( this, grid, 6, 248, 2600, "flower" );
	
	var grid = {};
		grid[0] = { 0:1 };
		grid[1] = { 2:1 };
		grid[2] = { 1:1 };
	bush( this, grid, 3, 56, 2727, "flower" );
	
	var grid = {};
		grid[0] = { 1:1 };
		grid[1] = { 2:1 };
		grid[2] = grid[0];
		grid[3] = { 0:1, 2:1, 4:1 };
	bush( this, grid, 4, 280, 2872, "flower" );
}

load_scene.prototype.remove = function( a ) {
	this.render[a] = null;
	delete this.render[a];
}

load_scene.prototype.add = function( a ) {
	var i = 0; while ( isset(this.render[(i = i + 1)]) );
	a.id = i;
	a.idparent = this;
	this.render[i] = a;
}