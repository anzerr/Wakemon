﻿
var isset = function(a) { return (typeof(a) != "undefined") }
var rgb = function(red, green, blue) { 
	return ( '#' + (0x1000000 + Math.round(blue) + 0x100 * Math.round(green) + 0x10000 * Math.round(red)).toString(16).substr(1) ); 
}
var strlen = function( b ) { return Math.max( 0, (b+' ').split("").length-1 ); }

var create_div = function( a ) {
	a = ( (isset(a))? a : [] ); 
	this.div = document.createElement( ( (!isset(a['t']))? "div" : a['t'] ) );
	( (!isset(a['c']))? '' : (this.div.className = a['c']) );
	( (!isset(a['p']))? document.body : ( (!isset(a['p'].nodeName))? a['p'].div : a['p'] ) ).appendChild( this.div );
}

var distance = function( x1, y1, x2, y2 ) {
	return Math.sqrt( Math.pow( x2-x1, 2) + Math.pow( y2-y1, 2) );
}

create_div.prototype.style = function( a ) {
	this._style = a;
	var type = { 'M':"margin", 'P':"padding", 'B':"background", "S":"border" };
	var dub = { "float":"cssFloat" };

	for( var key in a ) {
		var tmp = ''; var offset = ( (key.charAt(0) == "*") ? 1 : 0 );
		if ( isset(type[key.charAt(offset)]) ) { tmp += type[key.charAt(offset)]; }
		tmp += ( (strlen(tmp)!=0) ? key.slice(offset+1) : key.slice(offset) );
		
		if ( offset == 0 ) { 
			if ( isset(dub[tmp]) ) { this.div.style[dub[tmp]] = a[key]; }
			this.div.style[tmp] = a[key]; 
		} else {
			this.div[tmp] = a[key];
		}
	}
}

create_div.prototype.transition = function( a ) {
	var b = '', c = 0, d = 0; for ( var key in a ) { d++; }
	
	for ( var key in a ) {
		b += key+' '+a[key]+( ((c = c+1) < d)? 's, ' : 's' );
	}
	this.style( {"WebkitTransition":b, "MozTransition":b, "transition":b} );
}
