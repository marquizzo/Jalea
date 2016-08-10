var Jumbotron = pc.createScript('jumbotron');

Jumbotron.prototype.initialize = function() {
    this.spotlights = this.entity.findByName("Spotlights");
    this.screenTextures = [];
    this.screenMaterial = this.app.assets.find("ScreenMaterial").resource;
    this.screenID = 0;
    this.spotRotY = 0;
    this.counter = 0.5;
    
    // Sequence of screens
    this.screenTextures.push(this.app.assets.get(4791248).resource);    // Blank
    this.screenTextures.push(this.app.assets.get(4791249).resource);    // Star 1
    this.screenTextures.push(this.app.assets.get(4791250).resource);    // Star 2
    this.screenTextures.push(this.app.assets.get(4791251).resource);    // Star 3
    this.screenTextures.push(this.app.assets.get(4791252).resource);    // Star 4
    this.screenTextures.push(this.app.assets.get(4791253).resource);    // Star 5
    this.screenTextures.push(this.app.assets.get(4791248).resource);    // Blank
    this.screenTextures.push(this.app.assets.get(4791292).resource);    // Bottom chevron
    this.screenTextures.push(this.app.assets.get(4791293).resource);    // Double chevron
    this.screenTextures.push(this.app.assets.get(4791295).resource);    // Top chevron
    this.screenTextures.push(this.app.assets.get(4791248).resource);    // Blank
    this.screenTextures.push(this.app.assets.get(4791292).resource);    // Bottom chevron
    this.screenTextures.push(this.app.assets.get(4791293).resource);    // Double chevron
    this.screenTextures.push(this.app.assets.get(4791295).resource);    // Top chevron
    this.screenTextures.push(this.app.assets.get(4791248).resource);    // Blank
    this.screenTextures.push(this.app.assets.get(4791394).resource);    // Hazard solid
    this.screenTextures.push(this.app.assets.get(4791296).resource);    // Hazard outline
    this.screenTextures.push(this.app.assets.get(4791394).resource);    // Hazard solid
    this.screenTextures.push(this.app.assets.get(4791296).resource);    // Hazard outline
};

Jumbotron.prototype.update = function(dt) {
    this.rotY -= dt * 20;
    this.spotRotY += dt * 40;
    this.spotRotY %= 360;
    this.spotlights.setEulerAngles(0, this.spotRotY, 0);

    this.counter -= dt;
    if(this.counter <= 0){
        this.counter = (Math.random() * 0.3) + 0.2;
        this.nextScreen();
    }
};

Jumbotron.prototype.swap = function(old) {
    this.initialize();
};

Jumbotron.prototype.nextScreen = function(){
    this.screenID = (this.screenID + 1) % this.screenTextures.length;
    this.screenMaterial.emissiveMap = this.screenTextures[this.screenID];
    this.screenMaterial.update();
}