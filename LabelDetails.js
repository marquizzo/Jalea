CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {

    var lines = text.split("\n");

    for (var i = 0; i < lines.length; i++) {
        if(i === 0){
            this.font = '700 60px Play';
        }else{
            this.font = '400 45px Play';
        }

        var words = lines[i].split(' ');
        var line = '';

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = this.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                this.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }

        this.fillText(line, x, y);
        y += lineHeight;
    }
}

var LabelDetails = pc.createScript('labelDetails');

// initialize code called once per entity
LabelDetails.prototype.initialize = function() {

};

// update code called every frame
LabelDetails.prototype.update = function(dt) {
    
};

// swap method called for script hot-reloading
// inherit your script state here
LabelDetails.prototype.swap = function(old) {
    
};

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/

LabelDetails.prototype.prepare = function(playerIndex) {
    
    var arrayIndex = playerIndex - 1;
    var asset = this.app.assets.find(window.database.final.images.players[arrayIndex], "texture");
    var thisPlayer = window.database.final.data.players[arrayIndex];
    
    // label
//     this.entity.setLocalScale(asset.resource.height/100, 1, asset.resource.height/100);
    //label.setPosition(player1.position.x + asset.resource.width/100 + teamLength*0.32,10,0);
    
    // Create a canvas to do the text rendering
    this.text = thisPlayer.jerseyNum  + '\n';
    this.text += thisPlayer.fname + ' ' + thisPlayer.lname + '\n';
    this.text += thisPlayer.title + '\n';

    this.canvas = document.createElement('canvas');
    this.canvas.height = 512;
    this.canvas.width = 512;
    this.context = this.canvas.getContext("2d");

    this.texture = new pc.Texture(this.app.graphicsDevice, {
        format: pc.PIXELFORMAT_R8_G8_B8_A8,
        autoMipmap: true
    });
    this.texture.setSource(this.canvas);
    this.texture.minFilter = pc.FILTER_LINEAR_MIPMAP_LINEAR;
    this.texture.magFilter = pc.FILTER_LINEAR;
    this.texture.addressU = pc.ADDRESS_CLAMP_TO_EDGE;
    this.texture.addressV = pc.ADDRESS_CLAMP_TO_EDGE;

    var ctx = this.context;
    var w = ctx.canvas.width;
    var h = ctx.canvas.height;

    // Clear the context to transparent
    ctx.fillStyle = "#00000000";
    ctx.fillRect(0, 0, w, h);

    // Write white text
    ctx.fillStyle = '#999999';
    ctx.save();
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.wrapText(this.text,0,0,512,45);
    ctx.restore();

    // Copy the canvas into the texture
    this.texture.upload();

    var labelMaterial = new pc.PhongMaterial();
    labelMaterial.shadingModel = pc.SPECULAR_BLINN;
    labelMaterial.emissiveMap = this.texture;
    labelMaterial.opacityMap = this.texture;
    labelMaterial.blendType = pc.BLEND_NORMAL;
//     labelMaterial.depthTest = false;
//     labelMaterial.depthWrite = false;
    labelMaterial.update();

    this.entity.model.material = labelMaterial;
    this.entity.model.enabled = true;
};