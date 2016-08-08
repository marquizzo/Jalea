var Jumbotron = pc.createScript('jumbotron');

Jumbotron.prototype.initialize = function() {
    this.spotlights = this.entity.findByName("Spotlights");
    this.spotRotY = 0;
};

Jumbotron.prototype.update = function(dt) {
    this.rotY -= dt * 20;
    this.spotRotY += dt * 40;
    this.spotRotY %= 360;
    this.spotlights.setEulerAngles(0, this.spotRotY, 0);
};

Jumbotron.prototype.swap = function(old) {
    this.initialize();
};