"use strict";
function Sprite(settings) {
	function getSpriteTop(settings) {
		if (settings.spriteTop) {
			return {
				down: settings.spriteTop.down || 0,
				up: settings.spriteTop.up || 0,
				left: settings.spriteTop.left || 0,
				right: settings.spriteTop.right || 0
			}
		}

		return {
			down: 0,
			up: 0,
			left: 0,
			right: 0
		}
	}

	this.width = settings.width || 17;
	this.height = settings.height || 54;
	this.spriteWidth = settings.spriteWidth || 30;
	this.spriteCount = settings.spriteCount || 8;
	this.interval = settings.interval || 8;
	this.spriteTop = getSpriteTop(settings);
	this.spriteLeft = settings.spriteLeft || 0;

	this.active = false;
	this.currentFrame = 0;
	this.currentIntervalTick = 0;
}