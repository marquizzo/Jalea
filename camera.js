var Camera = pc.createScript('camera');

// initialize code called once per entity
Camera.prototype.initialize = function() {

    var app = this.app;
    var entity = this.entity;
    var picker = new pc.Picker(this.app.graphicsDevice, 1024, 1024);

    this.teamLength;
    this.teamX;
    this.mainScript = this.entity.getParent().script.main;

    this.cameraPos = this.entity.getPosition();

    this.viewPos = new pc.Vec3();
    this.targetViewPos = new pc.Vec3();
    this.targetViewPos.y += 2;
    this.tempVec = new pc.Vec3();

    this.rotX = -90;
        this.oldRotX = 0;
    this.rotY = 0;
    this.targetRotX = 0;
    this.targetRotY = -10;
    this.quatX = new pc.Quat();
    this.quatY = new pc.Quat();

    // Slight motion on player page
    this.direction = 1;
    this.rotVelocity = 0;

    // Disabling the context menu stops the browser disabling a menu when
    // you right-click the page
    this.app.mouse.disableContextMenu();

    // timers
    this.pageAnimate = {
        value: false,
        x: 0.0,
        y: 0.0,
        x_or: 0.0,
        y_or: 0.0,
        timer: 0.0,
        speed: 3
    };

    this.app.on('database:loaded', function(){
        // set background color
        var color = entity.camera.clearColor;
        color.r = window.database.group.Root.Groups.Group.Logo.PrimaryColor_RGB["-R"]/255;
        color.g = window.database.group.Root.Groups.Group.Logo.PrimaryColor_RGB["-G"]/255;
        color.b = window.database.group.Root.Groups.Group.Logo.PrimaryColor_RGB["-B"]/255;
        entity.camera.clearColor = color;

    });

    var hammer = new Hammer(document.body);

    // drag
    var cachedX;
    hammer.on("panstart", function (ev) {
        if(window.currentPage == 'TeamPage'){
            cachedX = ev.deltaX;
        }
    }.bind(this));

    hammer.on("pan", function (ev) {
        if(window.currentPage == 'TeamPage'){
            var dx = ev.deltaX - cachedX;
            this.orbit(dx * 0.3, 0.0);
            cachedX = ev.deltaX;
        }
    }.bind(this));

    // swipe
    var once = false;
    hammer.on('pan', function(ev) {
        if(window.currentPage.indexOf('PlayerPage') == -1){return false;}
        if(once === true){return false;}

        //var swipeThreshold = window.innerWidth * 0.05;
        var swipeThreshold = 0;
        if(Math.abs(ev.deltaX) > swipeThreshold){

            var or_player = window.player_emphasized;

            if(ev.deltaX>0){window.player_emphasized = window.player_emphasized - 1;}
            if(ev.deltaX<0){window.player_emphasized = window.player_emphasized + 1;}

            if(window.player_emphasized > window.teamCounter){window.player_emphasized = 1;}
            if(window.player_emphasized < 1){window.player_emphasized = window.teamCounter;}

            if(or_player !== window.player_emphasized){
                entity.script.camera.switchPage('PlayerPage'+window.player_emphasized);
                app.root.findByName('PlayerPage'+window.player_emphasized).findByName('LabelDetails').script.labelDetails.prepare(window.player_emphasized);

//                 app.root.findByName('WallPhoto1').script.playerPhoto.prepare(window.player_emphasized);
//                 app.root.findByName('WallPhoto2').script.playerPhoto.prepare(window.player_emphasized);
//                app.root.findByName('LabelDetails').script.labelDetails.prepare(window.player_emphasized);
            }

            once = true;
            setTimeout(function(){once = false;}, 2000);
        }
     });

    // tap
    hammer.on('tap', function(ev) {

        var canvas = app.graphicsDevice.canvas;
        var canvasWidth = parseInt(canvas.clientWidth, 10);
        var canvasHeight = parseInt(canvas.clientHeight, 10);

        var camera = entity.camera.camera;
        var scene = app.scene;

        picker.prepare(camera, scene);

        var selected = picker.getSelection({
            x: Math.floor(ev.center.x * (picker.width / canvasWidth)),
            y: picker.height - Math.floor(ev.center.y * (picker.height / canvasHeight))
        });

        // Get the graph node used by the selected mesh instance
        if(selected[0] === undefined){return false;}
        var selEntity = selected[0].node;

        // Bubble up the hierarchy until we find an actual Entity
        while (!(selEntity instanceof pc.Entity) && selEntity !== null) {
            selEntity = selEntity.getParent();
        }
        if (selEntity) {

            // team page, selected player
            if(selEntity.name.indexOf('Player') > -1){
                var playerIndex = selEntity.name.replace(/\D/g,'');
                entity.script.camera.switchPage('PlayerPage'+playerIndex);
                app.root.findByName('PlayerPage'+playerIndex).findByName('LabelDetails').script.labelDetails.prepare(playerIndex);
            }

            // player page, selected back button
            if(selEntity.name.indexOf('BackButton') > -1){
                entity.script.camera.switchPage('TeamPage');
            }
        }

    });

};

// update code called every frame
Camera.prototype.update = function(dt) {
    if(this.teamLength !==undefined && this.cameraPos !== undefined){

        if(window.currentPage == 'PlayerPage1'){
            var distance = (30 * 1.1) / window.innerWidth * window.innerHeight;
            distance = distance / (2.0 * Math.tan (0.5 * this.entity.camera.fov * pc.math.DEG_TO_RAD))

            if(this.pageAnimate.value === true){
                this.pageAnimate.timer += dt * this.pageAnimate.speed;
                var x_lerp = pc.math.lerp(this.pageAnimate.x_or, this.pageAnimate.x, this.pageAnimate.timer);
                var y_lerp = pc.math.lerp(this.pageAnimate.y_or, this.pageAnimate.y, this.pageAnimate.timer);
                this.cameraPos.x = x_lerp;
                this.cameraPos.y = y_lerp;

                if(this.pageAnimate.timer > 1.0){
                    this.pageAnimate.timer = 0.0;
                    this.pageAnimate.value = false;
                }
            }

            this.cameraPos.z = distance;
            this.entity.setPosition(this.cameraPos);
        }

        // Camera orbits around jumbotron
        if(window.currentPage == 'TeamPage'){
            this.targetRotX += 0.1;
            if(this.direction === 1){
                this.rotVelocity += 0.0003;
            }else{
                this.rotVelocity -= 0.0003;
            }
            this.rotVelocity = pc.math.clamp(this.rotVelocity, -0.03, 0.03);
            this.targetRotY += this.rotVelocity;

            // Change directions
            if(this.targetRotY < -10){
                this.direction = 1;
            }
            else if(this.targetRotY > 10){
                this.direction = -1;
            }
        }

        // Gives camera slight motion on PlayerPage
        if(window.currentPage.indexOf('PlayerPage') > -1){
            if(this.direction === 1){
                this.rotVelocity += 0.0003;
            }else{
                this.rotVelocity -= 0.0003;
            }
            this.rotVelocity = pc.math.clamp(this.rotVelocity, -0.03, 0.03);

            this.targetRotX += this.rotVelocity;

            // Change directions
            if(this.targetRotX < -10){
                this.direction = 1;
            }
            else if(this.targetRotX > 10){
                this.direction = -1;
            }
        }

        if(window.currentPage == 'TeamPage' || window.currentPage.indexOf('PlayerPage') > -1){
            var distance = (this.teamLength * 1.1) / window.innerWidth * window.innerHeight;
            distance = distance / (2.0 * Math.tan (0.5 * this.entity.camera.fov * pc.math.DEG_TO_RAD))

            // Implement a delay in camera controls by lerping towards a target
            this.viewPos.lerp(this.viewPos, this.targetViewPos, dt / 0.2);
            this.rotX = pc.math.lerp(this.rotX, this.targetRotX, dt / 0.2);
            this.rotY = pc.math.lerp(this.rotY, this.targetRotY, dt / 0.2);

            // Calculate the camera's rotation
            this.quatX.setFromAxisAngle(pc.Vec3.RIGHT, -this.rotY);
            this.quatY.setFromAxisAngle(pc.Vec3.UP, -this.rotX);
            this.quatY.mul(this.quatX);

            // Set the camera's current position and orientation
            this.entity.setPosition(this.viewPos);
            this.entity.setRotation(this.quatY);
            this.entity.translateLocal(0, 0, distance+3);

//             if(window.currentPage.indexOf('PlayerPage') > -1){
//                 var e = this.entity.getLocalEulerAngles();
//                 var position = this.entity.getLocalPosition();
//                 position.y += 10;
//                 this.entity.setLocalPosition(position);
//                 this.entity.setLocalEulerAngles(e.x, e.y, e.z + 180);
//             }
        }

    }
};

// swap method called for script hot-reloading
// inherit your script state here
Camera.prototype.swap = function(old) {

};

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/

Camera.prototype.setValues = function(teamLength, teamX) {
    this.teamLength = teamLength;
    this.teamX = teamX;
};

Camera.prototype.switchPage = function(pageName) {
    window.currentPage = pageName;

    var entiyPage = this.app.root.findByName(pageName);
    var pagePos = this.app.root.findByName(pageName).getPosition();

    this.targetViewPos.x = pagePos.x;
    this.targetViewPos.y = pagePos.y;
    this.targetViewPos.z = pagePos.z;
    this.rotVelocity = 0;

    // per case corrections
    if(pageName == 'TeamPage'){
        //this.targetRotX = (Math.random() * 90) - 45
        this.targetRotX = this.oldRotX;
        this.targetRotY = -10;
        this.targetViewPos.y += 2;
        this.mainScript.deactivateUIArrows();
    }
    if(pageName.indexOf('PlayerPage') > -1){
        this.oldRotX = this.rotX;
        this.targetRotX = 0;
        this.targetRotY = -20;
        this.mainScript.activateUIArrows();
    }

    if(pagePos !==undefined){
        this.pageAnimate.value = true;
        this.pageAnimate.x_or = this.cameraPos.x;
        this.pageAnimate.y_or = this.cameraPos.y;
        this.pageAnimate.x = pagePos.x;
        this.pageAnimate.y = pagePos.y;
    }
};

Camera.prototype.orbit = function (movex, movey) {
    this.targetRotX += movex;
    this.targetRotY += movey;
    // this.targetRotX = pc.math.clamp(this.targetRotX, -360, 360);
    // this.targetRotY = pc.math.clamp(this.targetRotY, -45, 0);
};
