var PlayerPhoto = pc.createScript('playerPhoto');

// initialize code called once per entity
PlayerPhoto.prototype.initialize = function() {

};

// update code called every frame
PlayerPhoto.prototype.update = function(dt) {
    var camera = this.app.root.findByName('Camera');
    // var cameraPos = camera.getPosition();
    // this.entity.setEulerAngles(0, 0, 0);

//     this.entity.setRotation(camera.getRotation());
//     this.entity.rotateLocal(90, 0, 0);

    // this.rotX = -90;
    // this.rotY = 0;
};

// swap method called for script hot-reloading
// inherit your script state here
PlayerPhoto.prototype.swap = function(old) {

};

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/

PlayerPhoto.prototype.prepare = function(playerIndex, asset) {

    var arrayIndex = playerIndex - 1;
    // var asset;

    // if(this.entity.name.indexOf('1') > -1){
    //     var name = window.database.final.images.players[arrayIndex];
    //     or_asset = window.fulldomain + 'images/' + name;
    //     if(window.playcanvas === true){
    //         or_asset = or_asset.file.url;
    //     }
    //     asset = this.app.assets.find(window.database.final.images.players[arrayIndex], "texture");

    // }
    // if(this.entity.name.indexOf('2') > -1){
    //     var name = window.database.final.images.playersClose[arrayIndex];
    //     or_asset = window.fulldomain + 'images/' + name;
    //     if(window.playcanvas === true){
    //         or_asset = or_asset.file.url;
    //     }
    //     asset = this.app.assets.find(window.database.final.images.playersClose[arrayIndex], "texture");
    // }

//     if(this.entity.name.indexOf('2') > -1){
//     }
    
    if(asset !==undefined){
        var material = new pc.PhongMaterial();
        material.shadingModel = pc.SPECULAR_BLINN;
        material.diffuseMap = asset.resource;
        material.opacityMap = asset.resource;
        material.blendType = 2;
        material.opacityMapChannel = 'a';
        material.update();
        this.entity.model.model.meshInstances[0].material = material;

        // size and position
        var size = 1;
        this.entity.setLocalScale(asset.resource.width/100 * size, 1, asset.resource.height/100 * size);

        this.entity.model.enabled = true;
    }

};
