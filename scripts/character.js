"use strict";
function Character(settings) {
	var characterElement, idleSprite, walkingSprite,
		rotators, frames, baseCharacterClass,
		$character, horizontalMoveDistance, verticalMoveDistance, horizontalMoveInterval, 
		verticalMoveInterval, moving, moveKey, movementTimeout, direction,
		id, currentFrame, self, sprites;


	sprites = {};
	sprites.idle = settings.idleSprite || new Sprite({});
	sprites.walking = settings.walkingSprite || new Sprite({});

	baseCharacterClass = settings.baseCharacterClass || 'shaekasha-character';
	verticalMoveDistance = settings.verticalMoveDistance || 2;
	verticalMoveInterval = settings.verticalMoveInterval || 28;
	horizontalMoveDistance = settings.horizontalMoveDistance || 2;
	horizontalMoveInterval = settings.horizontalMoveInterval || 22;
	moving = false;
	moveKey = 0;
	direction = 'down';
	id = util.getNewGuid();
	self = this;

	function getCharacterElement() {
		var characterStyle, characterClass;

		characterStyle = 'height: ' + sprites.idle.height + 'px; ' + 
					'width: ' + sprites.idle.width + 'px;';

		characterClass = baseCharacterClass + ' character';

		characterElement = document.createElement('div');
		$character = $(characterElement);
		$character.addClass(characterClass);
		$character.attr('style', characterStyle);

		return characterElement;
	}

	function idle() {
		sprites.idle.active = true;

		// window.setTimeout(rotateBackground.bind(this, idleFrame, 'idle', idleSprite), idleSprite.interval);
	}

	function stopIdle() {
		sprites.idle.active = false;
	}

	function rotateBackground(currentSprite) {
		currentSprite.currentIntervalTick += 1;

		if (currentSprite.currentIntervalTick >= currentSprite.interval) {
			currentSprite.currentIntervalTick = 0;
		}

		if (currentSprite.currentIntervalTick > 0) {
			return;
		}

		currentSprite.currentFrame += 1;

		if (currentSprite.currentFrame >= currentSprite.spriteCount) {
			currentSprite.currentFrame = 0;
		}

		$character.css('background-position', '-' + ((currentSprite.currentFrame * currentSprite.spriteWidth) + currentSprite.spriteLeft) + 'px -' + currentSprite.spriteTop[direction] + 'px');
	}

	function bindListeners() {
		$(window).on('keydown', handleKeydown);
		$(window).on('keyup', handleKeyup);
	}

	function handleKeydown(event) {
		var newValue, position;

		switch (event.keyCode) {
			case 38: // up
			case 39: // right
			case 37: // left
			case 40: // down
				if (moving) {
					moveKey = event.keyCode;
					return;
				}

				stopIdle();

				rotators.walking = true;
				// window.setTimeout(rotateBackground.bind(this, walkingFrame, 'walking', walkingSprite), walkingSprite.interval);

				moving = true;
				moveKey = event.keyCode;
				move();


				break;
		}
	}

	function move() {
		var position, newValue, moveInterval;

		if (moving) {
			position = $character.position();
	
			switch (moveKey) {
				case 38: // up
					newValue = position.top - verticalMoveDistance;
					$character.css('top', newValue + 'px');
					moveInterval = verticalMoveInterval;
					direction = 'up';
					break;
				case 39: // right
					newValue = position.left + horizontalMoveDistance;
					$character.css('left', newValue + 'px');
					moveInterval = horizontalMoveInterval;
					direction = 'right';
					break;
				case 37: // left
					newValue = position.left - horizontalMoveDistance;
					$character.css('left', newValue + 'px');
					moveInterval = horizontalMoveInterval;
					direction = 'left';
					break;
				case 40: // down
					newValue = position.top + verticalMoveDistance;
					$character.css('top', newValue + 'px');
					moveInterval = verticalMoveInterval;
					direction = 'down';
					break;
			}

			// movementTimeout = window.setTimeout(move, moveInterval);
		}

	}

	function externalMove(direction) {
		var newValue, position, keyCode;

		switch (direction) {
			case 'up':
				keyCode = 38;
				break;
			case 'down':
				keyCode = 40;
				break;
			case 'left':
				keyCode = 37;
				break;
			case 'right':
				keyCode = 39;
				break;
		}

		if (moving) {
			moveKey = keyCode;
			return;
		}

		stopIdle();

		rotators.walking = true;
		// window.setTimeout(rotateBackground.bind(this, walkingFrame, 'walking', walkingSprite), walkingSprite.interval);

		moving = true;
		moveKey = keyCode;
		move();

		// window.setTimeout(function () { 
		// 		moving = false;
		// 		rotators.walking = false;
		// 		idle();
		// 	}, 250);
	}

	function moveTo(position) {
		$character.css('top', position.top + 'px');
		$character.css('left', position.left + 'px');
	}

	function handleKeyup(event) {
		moving = false;
		rotators.walking = false;
		idle();
	}


	function onLoop() {
		if (sprites.idle.active) {
			rotateBackground(sprites.idle);
		}
	}

	function init() {
		bindListeners();
		idle();
	}
    
	this.getCharacterElement = getCharacterElement;
	this.moveTo = moveTo;
	this.externalMove = externalMove;
	this.init = init;
	this.onLoop = onLoop;
	this.id = id;
}