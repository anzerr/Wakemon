
window.onload = function() {
	
	var map = new _map();
	var gui = new _gui( map );
	var player = new _player( map, gui );
		map.player = player; gui.player = player;
		
	var ent = new load_scene( map, gui, player );
		player.ent = ent;
	
	var scale = 500, load = false;
	var render = function() {
		if (!load) {
			gui.load(0);
			var a = true;
			for (var i in gui.img) {
				if (!gui.img[i].load) {
					a = false;
					break;
				}
			}
			load = a;
		} else {
			map.update();
			gui.draw(0);

				var grid = [];
				for (var i in ent.render) {
					if (isset(ent.render[i].x)) {
						if (distance( player.x, player.y, ent.render[i].x, ent.render[i].y) < scale ) {
							grid[ grid.length ] = ent.render[i];
							if ( isset(ent.render[i].shadow) ) {
								ent.render[i].shadow();
							}
						}
					} else {
						var out = false;
						if (distance( player.x, player.y, ent.render[i].ix, ent.render[i].iy) < scale && !out ) {
							grid[ grid.length ] = ent.render[i]; out = true;
						}
						if (distance( player.x, player.y, ent.render[i].ox, ent.render[i].oy) < scale && !out ) {
							grid[ grid.length ] = ent.render[i]; out = true;
						}
					}
				}
				grid[ grid.length ] = player;
				player.shadow();
				player.grid = grid;

				for (var i in grid) {
					for (var v in grid) {
						if (grid[i].y < grid[v].y) {
							var tmp = grid[i];
							grid[i] = grid[v];
							grid[v] = tmp;
						}
					}
				}
				
				for (var i in grid) {
					grid[i].draw();
				}

			gui.draw(1);
			if (gui.loading < 1) {
				gui.load( 1 );
			}
		}
	}
	
	window.requestAnimFrame = (function(callback) {
		return 	(
			window.requestAnimationFrame || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame || 
			window.oRequestAnimationFrame || 
			window.msRequestAnimationFrame ||
			function(callback) { window.setTimeout(callback, 1000 / 30); }
		);
	})();

	var animate = function() {
		render();
		requestAnimFrame(function() {
			animate();
		});
	};
	animate();
}
