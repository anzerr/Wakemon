
var _menu = function( map, gui, player ) {
	this.map = map;
	this.gui = gui;
	this.player = false;
	this.context = this.gui.context;
	this.cur = 0;
	
	this.id = 'menu';
	this.elemid = 1;

	this.div = [];
	this.inventory = [];

//--------------------  MAIN MENU
	this.div["menu"] = [];
	this.div["menu"][0] = new create_div( {'p':this.gui.body} );
	this.div["menu"][0].style( {
		"width":(10*(16+5))+"px", "height":"calc(100% - 60px)", "BColor":rgb(50,50,50), "P":"10px", "overflow":"auto",
		"border-radius":"5px", "position":"absolute", "top":"20px", "left":(this.gui.body.div.offsetWidth*1.5)+"px", 
		"display":"none", "borderStyle":"solid", "borderColor":rgb(75, 75, 75), "color":rgb(255,255,255)
	} );

	this.div["menu"][1] = new create_div( {'c':"no-select"} );
	this.div["menu"][1].style( {
		"width":"100px", "height":"auto", "BColor":rgb(100,100,100), "position":"absolute", "display":"none",
		"top":"50px", "left":"50px", "overflow":"hidden", "border":"1px solid "+rgb(25,25,25), "color":rgb(255,255,255)
	} );
	this.div["menu"][1].div.onclick = function(e) {
		if (!e) var e = window.event;
		e.cancelBubble=true;
		if (e.stopPropagation) { e.stopPropagation(); }
		
		//console.log("cat"+e.pageY+" "+e.pageX)
		//this.rightmenu.div.style.display = "none"
		
		return false;
	}
		this.div["menu"][4] = new create_div( {'p':this.div["menu"][1], 'c':"no-select"} );
		this.div["menu"][4].style( {
			"width":"90px", "height":"auto", "M":"5px", "cursor":"default",
			"*innerHTML":"Name", "textAlign":"center", "lineHeight":"18px", "fontSize":"10px"
		} );
	
		this.div["menu"][2] = new create_div( {'p':this.div["menu"][1], 'c':"no-select"} );
		this.div["menu"][2].style( {
			"width":"90px", "height":"20px", "BColor":rgb(75, 75, 75), "M":"5px", 
			"boxSizing":"border-box", "border":"1px solid "+rgb(25,25,25), "cursor":"pointer",
			"*innerHTML":"use", "textAlign":"center", "lineHeight":"18px", "fontSize":"10px"
		} );
		this.div["menu"][2].div.onclick = function(e) {
			if (!e) var e = window.event;
			e.cancelBubble=true;
			if (e.stopPropagation) { e.stopPropagation(); }
			
			var div = this.parentNode.him
			var tmp = div.him.player.inventory[ div.itemid ].active()
			
			if (tmp) {
				div.parentNode.removeChild( div );
				div.him.inventory[ div.num ] = null
				delete div.him.inventory[ div.num ];
			} else {
				div.style.background = "url(content/env.png) "+(div.him.player.inventory[ div.itemid ].hx*-16)+"px "+(div.him.player.inventory[ div.itemid].hy*-16)+"px"
			}
			this.parentNode.style.display = "none";
			return false;
		}
		this.div["menu"][3] = new create_div( {'p':this.div["menu"][1], 'c':"no-select"} );
		this.div["menu"][3].style( {
			"width":"90px", "height":"20px", "BColor":rgb(75, 75, 75), "M":"5px", 
			"boxSizing":"border-box", "border":"1px solid "+rgb(25,25,25), "cursor":"pointer",
			"*innerHTML":"drop", "textAlign":"center", "lineHeight":"18px", "fontSize":"10px"
		} );
		this.div["menu"][3].div.onclick = function(e) {
			if (!e) var e = window.event;
			e.cancelBubble=true;
			if (e.stopPropagation) { e.stopPropagation(); }

			var div = this.parentNode.him
			var tmp = div.him.player.drop( div.itemid );
			if (tmp) {
				/*var tmp = div.nextSibling
				while ( tmp && tmp.nodeType != 1 ) {
					tmp.num += -1;
					tmp = tmp.nextSibling;
				}*/
				div.parentNode.removeChild( div );
				div.him.inventory[ div.num ] = null
				delete div.him.inventory[ div.num ];
				//console.log( div.him );

				this.parentNode.style.display = "none";
			} else {
				var color = div.menu[1].div.style.backgroundColor, lastx = parseInt(div.menu[1].div.style.top), lasty = parseInt(div.menu[1].div.style.left)
				console.log( div.menu[1].div.offsetTop );
				div.menu[1].transition( {"background-color":0, "padding":0, "left":0, "top":0} );
				setTimeout(function(){
					div.menu[1].style( {"BColor":rgb(255,0,0), "P":"5px", "left":(lasty-5)+"px", "top":(lastx-5)+"px"} );
					setTimeout(function(){
						div.menu[1].transition( {"background-color":1, "padding":1, "left":1, "top":1} );
						setTimeout(function(){div.menu[1].style( {"BColor":color, "P":"0px", "left":lasty+"px", "top":lastx+"px"} )},10);
					},10);
				},10);
				
			}

			return false;
		}
		
		this.div["menu"][0].div.rightmenu = this.div["menu"][1];
		this.div["menu"][0].div.onclick = function(e) {
			if (!e) var e = window.event;
			e.cancelBubble=true;
			if (e.stopPropagation) { e.stopPropagation(); }

			this.rightmenu.div.style.display = "none"
			
			return false;
		}
		
	this.div["menu"][0].him = this;
		this.div["menu"][0].open =  function( a, b, c ) {
			if (a) {
				c[0].style( {"display":"inline-block", "height":"calc(100% - "+( (this.him.player.incombat || this.him.player.inchat)? 250 : 60 )+"px)"} );
				c[0].transition( {"left":1} );
				setTimeout(function(){c[0].style( {"left":(b.gui.body.div.offsetWidth-(c[0].div.offsetWidth+30))+"px"} )},10);
				c[0].update( b, c );
			} else {
				c[0].style( {"display":"none"} );
				c[0].transition( {"left":0} );
				c[0].style( {"left":(b.gui.body.div.offsetWidth*1.5)+"px"} );
				c[1].style( {"display":"none"} );
			}
		}
		
		this.div["menu"][0].update =  function( a, b ) {
			var num = 0;

			for ( var i in a.player.inventory ) {
				if ( !isset(a.inventory[num]) ) {
					a.inventory[num] = new create_div( {'p':b[0], 'c':"no-select"} );
					a.inventory[num].style( {
						"width":"16px", "height":"16px", "M":"5px", "BColor":rgb(0,255,0), "display":"inline-block", "cursor":"pointer",
						"background":"url(content/env.png) "+(a.player.inventory[i].hx*-16)+"px "+(a.player.inventory[i].hy*-16)+"px", "backgroundSize":"512px 512px"
					} );
					a.inventory[num].div.him = a;
					a.inventory[num].div.itemid = i;
					a.inventory[num].div.num = num;
					a.inventory[num].div.menu = b;
					a.inventory[num].div.onclick = function(e) {
						
						if (!e) var e = window.event;
						e.cancelBubble=true;
						if (e.stopPropagation) { e.stopPropagation(); }
						function getPos(el) {
							// yay readability
							for (var lx=0, ly=0;
								 el != null;
								 lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
							return {x: lx,y: ly};
						}
					
						var a = this;
						a.menu[1].transition( {"left":0, "top":0} );
						setTimeout(function(){
							a.menu[1].style( {"display":"block", 
								"top":e.pageY, "left":e.pageX,
								"maxHeight":"0px"
							} );

							a.menu[1].div.him = a;
							a.menu[3].style( {"display": ( (a.him.player.inventory[ a.itemid ].candrop)? "block" : "none" )} );
							a.menu[2].style( {"display": ( (a.him.player.inventory[ a.itemid ].active)? "block" : "none" )} );
							var name = "<b>"+a.him.player.inventory[ a.itemid ].name
							var item = a.him.player.inventory[ a.itemid ];
							for ( var v in item.statuseffect ) {
								var add = item.statuseffect[v].name( item );
								console.log( add+" "+item.statuseffect[v].value+" "+item.statuseffect[v].color );
								if (add != '') {
									name += "<b style='color:"+item.statuseffect[v].color+";'><br>"+add+"</b>";//'<b style="color:'+effect[v].color+';>'+add+"<b><br>";
								}
							}
							a.menu[4].style( {"*innerHTML":name} );
							
							setTimeout(function(){
								a.menu[1].transition( {"max-height":0.5} );
								setTimeout(function(){
									a.menu[1].style( {"maxHeight":"500px"} );
								},10);
							},10);
						},10);
						return false;
					}
				} else {
					a.inventory[num].div.itemid = i;
				}
				num++;
			}
			
			var last = [];
			for (var i in a.inventory) {
				var add = true;
				for (var v in last) {
					if ( last[v] == a.inventory[i].div.itemid ) {
						a.inventory[ i ].div.parentNode.removeChild( a.inventory[i].div );
						a.inventory[ i ] = null
						delete a.inventory[ i ];
						add = false;
						break;
					}
				}
				if (add) {
					last[ last.length ] = a.inventory[i].div.itemid;
				}
			}
			for (var i in a.inventory) {
				if ( !isset(a.player.inventory[ a.inventory[i].div.itemid ]) ) {
					a.inventory[ i ].div.parentNode.removeChild( a.inventory[i].div );
					a.inventory[ i ] = null
					delete a.inventory[ i ];
				}
			}	
		}
	
//--------------------  CHAT
	this.div["chat"] = [];
	this.div["chat"][0] = new create_div( {'p':this.gui.body, 'c':"no-select"} );
	this.div["chat"][0].style( {
		"width":"calc(100% - 60px)", "height":"150px", "BColor":rgb(50,50,50), "P":"10px", "border-radius":"5px",
		"position":"absolute", "top":"calc(100% - 190px)", "left":"20px", "display":"none", "fontSize":"17px",
		"borderStyle":"solid", "borderColor":rgb(75, 75, 75), "color":rgb(255,255,255)
	} );
		this.div["chat"][0].div.onclick = function() {
			var a = this.player;
			if ( isset(a.target.chatnext) ) {
				a.target.chatnext();
			} else {
				a.inchat = false;
				a.disable = false;
				a.gui.menu.open( "chat", false );
			}
		}	
		this.div["chat"][0].open =  function( a, b, c ) {
			if (a) {
				c[0].style( {"display":"inline-block"} );
			} else {
				c[0].style( {"display":"none"} );
			}
		}
		this.div["chat"][0].setchat =  function( a ) {
			this.style( {"*innerHTML":a} );
		}
//--------------------  COMBAT
	this.div["combat"] = [];
	this.div["combat"][0] = new create_div( {'p':this.gui.body, 'c':"no-select"} );
	this.div["combat"][0].style( {
		"width":"calc(50% - 60px)", "height":"150px", "BColor":rgb(50,50,50), "P":"10px", "border-radius":"5px",
		"position":"absolute", "top":"calc(100% - 190px)", "left":"20px", "display":"none", "fontSize":"17px",
		"borderStyle":"solid", "borderColor":rgb(75, 75, 75), "color":rgb(255,255,255)
	} );
		
		this.div["combat"][0].open =  function( a, b, c ) {
			if (a) {
				c[0].style( {"display":"inline-block"} );
				c[10].style( {"display":"inline-block"} );
				c[0].playerhp = b.player.stats_points.hp;
				c[0].targethp = b.player.target.stats_points.hp;
				console.log( b.player )
			} else {
				c[0].style( {"display":"none"} );
				c[10].style( {"display":"none"} );
			}
		}
		
		this.div["combat"][0].update =  function( a, b, c ) {
			c[1].style( {"*innerHTML":b, "width":( (b/c[0].playerhp)*45 )+"%", "MRight":( 55-(b/c[0].playerhp)*45 )+"%" } );
			c[2].style( {"*innerHTML":a, "width":( (a/c[0].targethp)*45 )+"%"} );
		}
		
		this.div["combat"][0].log =  function( a, c ) {
			c[3].combatlog = ( (isset(c[3].combatlog))? c[3].combatlog : '' )+a+"<br>";
			var tmp = c[3].combatlog.split(/<br[^>]*>/);
			c[3].combatlog = ( (tmp.length==10)? (tmp.splice(1, tmp.length)).join("<br>") : c[3].combatlog )
			c[3].style( {"*innerHTML":c[3].combatlog} );
		}
		
		this.div["combat"][1] = new create_div( {'p':this.div["combat"][0], 'c':"no-select"} );
		this.div["combat"][1].style( {"width":"45%", "height":"20px", "BColor":rgb(0,255,0), "display":"inline-block", "MRight":"10%", "textAlign":"center",
			"textShadow":"-1px -1px 0 "+rgb(50, 50, 50)+", 1px -1px 0 "+rgb(50, 50, 50)+", -1px 1px 0 "+rgb(50, 50, 50)+", 1px 1px 0 "+rgb(50, 50, 50)
		} );
		this.div["combat"][1].transition( {"width":1, "margin":1} );
		this.div["combat"][2] = new create_div( {'p':this.div["combat"][0], 'c':"no-select"} );
		this.div["combat"][2].style( {"width":"45%", "height":"20px", "BColor":rgb(255,0,0), "display":"inline-block", "textAlign":"center",
			"textShadow":"-1px -1px 0 "+rgb(50, 50, 50)+", 1px -1px 0 "+rgb(50, 50, 50)+", -1px 1px 0 "+rgb(50, 50, 50)+", 1px 1px 0 "+rgb(50, 50, 50)
		} );
		this.div["combat"][2].transition( {"width":1} );
		
		this.div["combat"][3] = new create_div( {'p':this.div["combat"][0], 'c':"no-select"} );
		this.div["combat"][3].style( {"width":"calc(100% - 8px)", "height":"calc(100% - 20px)", "P":"4px", "fontSize":"12px"} );
		
	this.div["combat"][10] = new create_div( {'p':this.gui.body, 'c':"no-select"} );
	this.div["combat"][10].style( this.div["combat"][0]._style );
	this.div["combat"][10].style( {"left":"calc(50% + 10px)"} );
	
		this.div["combat"][11] = new create_div( {'p':this.div["combat"][10], 'c':"no-select"} );
		this.div["combat"][11].style( {
			"width":"45%", "height":"100%", "BColor":rgb(70,70,70), "display":"inline-block", "MRight":"10%" , "*innerHTML":"attack",
			"textAlign":"center", "lineHeight":"100%", "lineHeight":"150px"
		} );
		this.div["combat"][11].div.him = this;
		this.div["combat"][11].div.onclick = function() {
			if (this.him.player.canattack) {
				this.him.player.attack( false );
				this.style.backgroundColor = rgb(20,20,20);
			}
		}
		
		this.div["combat"][12] = new create_div( {'p':this.div["combat"][10], 'c':"no-select"} );
		this.div["combat"][12].style( {
			"width":"45%", "height":"100%", "BColor":rgb(70,70,70), "display":"inline-block", "*innerHTML":"run",
			"textAlign":"center", "lineHeight":"150px"
		} );
		this.div["combat"][12].div.him = this;
		this.div["combat"][12].div.onclick = function() {
			if (this.him.player.canattack) {
				this.him.player.attack( true );
				this.style.backgroundColor = rgb(20,20,20);
			}
		}
}

_menu.prototype.open = function( b, a ) {
	if (this.player == false) { this.player = this.gui.player; }
	
	if ( isset(this.div[b][0].open) ) {
		this.div[b][0].open( a, this, this.div[b] );
		return( this.div[b] );
	}
	return (false);
}