var Player = pc.createScript('player');

// initialize code called once per entity
Player.prototype.initialize = function() {
    //var entity = this.entity;
    this.emphasized = false;
    this.changeState = false;
    
    this.maxUpAndDown = pc.math.random(0.5, 0.25);
    this.speed = pc.math.random(10, 30);
    this.angle = 0;
    this.toDegrees = Math.PI/180;
    
    this.playerPos = this.entity.getPosition();
    this.or_scale = new pc.Vec3();
    
    // timers
    this.playerLerping = {
        value: false,
        x: 0.0,
        z: 0.0,
        x_or: 0.0,
        z_or: 0.0,
        timer: 0.0,
        speed: 3
    };
//     this.entity.position.z = 1;
};

// update code called every frame
Player.prototype.update = function(dt) {
    this.entity.setPosition(this.playerPos);
};