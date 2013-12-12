"use strict";
function Map(options) {
	var $map, 
		settings,
		theLoop,
		handles = {};

		settings = {
			height: 16,
			width: 16,
			mapSelector: '#the-map',
			baseTileClass: 'snow-tile',
			interval: 60,
			pixelWidth: 3,
			tileWidth: 16
		}

	$.extend(settings, options);

	function getDomElements() {
		$map = $(settings.mapSelector);
	}

	function drawMap() {
		var i, area, divElement, tileStyle, tileClass;

		tileStyle = 'height: ' + (settings.tileWidth * settings.pixelWidth) + 'px; ' + 
					'width: ' + (settings.tileWidth * settings.pixelWidth) + 'px;';

		tileClass = settings.baseTileClass + ' tile';
		area = settings.width * settings.height;

		$map.width(settings.width * settings.tileWidth * settings.pixelWidth);
		$map.empty();

		for (i = 0; i < area; i++) {
			divElement = document.createElement('div');
			$(divElement).addClass(tileClass);
			// $(divElement).attr('style', tileStyle);

			$map.append(divElement);
		}
	}

	function startLoop () {
		theLoop = window.setInterval(doLoop, ((1 / settings.interval) * 1000) );
	}

	function doLoop() {
		var index;

		// do some loooping
		for (index in handles) {
			handles[index]();
		}

//		window.setTimeout(doLoop, settings.interval);
	}

	function unload() {
		clearInterval(theLoop);
	}

	function addCharacter(character) {
		$map.append(character.getCharacterElement());
		handles[character.id] = character.onLoop;
	}

	function init() {
		getDomElements();
		drawMap();
		startLoop();
	}

	this.addCharacter = addCharacter;
	this.init = init;
	this.unload = unload;
}




