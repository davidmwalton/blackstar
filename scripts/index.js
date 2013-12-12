"use strict";

$(document).ready(function () {
	function loadMap(mapName) {
		switch (mapName) {
			case 'map-1':
				map.unload();
				map = new Map({ height: 25, width: 25, mapSelector: '#the-map', baseTileClass: 'snow-tile'});
				map.init();

				map.addCharacter(sorceress);
				// map.addCharacter(shakaesha);
				// map.addCharacter(shakaesha2);
				// shakaesha.moveTo({ top: 100, left: 100 });
				// shakaesha2.moveTo({ top: 100, left: 200 });
				break;
			case 'map-2':
				map.unload();
				map = new Map({ height: 25, width: 25, mapSelector: '#the-map', baseTileClass: 'grass-tile'});
				map.init();

				map.addCharacter(sorceress);
				// map.addCharacter(shakaesha);
				// map.addCharacter(shakaesha2);
				// shakaesha.moveTo({ top: 100, left: 100 });
				// shakaesha2.moveTo({ top: 100, left: 200 });
				break;
		}
	}

	function move(direction) {
		sorceress.externalMove(direction);
	}


	$('.map-link').on('click', function () {
		loadMap($(this).attr('data-map'));
	})

	$('.d-pad').on('click', function () {
		move($(this).attr('data-direction'));
	})
});


var map = new Map({ height: 25, width: 25, mapSelector: '#the-map', interval: 60});
// var map = new Map({});

var shakaesha = new Character({
	// width: 17,
	// height: 54,
	// spriteWidth: 30,
	// spriteCount: 8,
	// baseCharacterClass: 'shaekasha-character',
	// idleInterval: 120,
	// verticalMoveDistance: 2,
	// verticalMoveInterval: 28,
	// horizontalMoveDistance: 2,
	// horizontalMoveInterval: 22
});

var shakaesha2 = new Character({});

var sorceress = new Character({
	idleSprite: new Sprite({
		width: 42,
		height: 68,
		spriteWidth: 42,
		spriteCount: 16,
		interval: 3,
		spriteTop: {
			down: 13,
			up: 597,
			left: 233,
			right: 889
		}
	}),
	walkingSprite: new Sprite({
		width: 48,
		height: 75,
		spriteWidth: 48,
		spriteCount: 8,
		interval: 6,
		spriteTop: {
			down: 13,
			up: 612,
			left: 314,
			right: 913
		},
		spriteLeft: 673
	}),
	baseCharacterClass: 'sorceress-character',
	verticalMoveDistance: 2,
	verticalMoveInterval: 28,
	horizontalMoveDistance: 2,
	horizontalMoveInterval: 22
});

// map.addCharacter(shakaesha);
// shakaesha.init();
// shakaesha.moveTo({ top: 100, left: 100 });
// map.addCharacter(shakaesha2);
// shakaesha2.init();
// shakaesha2.moveTo({ top: 100, left: 200 });
map.init();
map.addCharacter(sorceress);
sorceress.init();
