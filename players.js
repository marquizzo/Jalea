var Players = pc.createScript('players');

// initialize code called once per entity
Players.prototype.initialize = function() {

    var app = this.app;
    var entity = this.entity;
    var players = Array();
    var playersClose = Array();
    var playersEntities = Array();
    var playersPageEntities = Array();
    var camera = entity.findByName('Camera');
    var bank = entity.findByName('PlayerBank01');
    var team = entity.findByName('TeamPage');
    var playerPage = entity.findByName('PlayerPageTemplate');
    playerPage.enabled = false;
    var tempPlayer = {};

    // variables
    var teamLength = 0;
    window.teamCounter = 0;
    window.currentPage = 'TeamPage';

    this.app.on('database:loaded', function(){
        
        window.database.final.data.players = Array();
        window.database.final.images = {};
        window.database.final.images.playersClose = Array();
        for (i = 0; i < window.database.group.Root.Individuals.Individual.length; i++) {

            tempPlayer = window.database.group.Root.Individuals.Individual[i];
            var name = tempPlayer.Image1;
            var or_asset = window.fulldomain + 'images/' + name;
            if(window.playcanvas === true){
                or_asset = app.assets.find(name, "texture");
                if(or_asset ===undefined){continue;}
            }
            players.push(name);

            window.database.final.images.playersClose.push(tempPlayer.Image2);
            playersClose.push(tempPlayer.Image2);

            window.database.final.data.players.push({
                fname: tempPlayer.FName,
                lname: tempPlayer.LName,
                title: tempPlayer.Title,
                jerseyNum: tempPlayer.JerseyNum,
                age: tempPlayer.Age,
                height1: tempPlayer.Height1,
                height2: tempPlayer.Height2,
                supervisor: tempPlayer.Supervisor,
            });
        }
        window.database.final.images.players = players;

        for (i = 0; i < window.database.group.Root.Individuals.Individual.length; i++) {
            var name = window.database.group.Root.Individuals.Individual[i].Image1;

            var or_asset = window.fulldomain + 'images/' + name;
            if(window.playcanvas === true){
                or_asset = app.assets.find(name, "texture");
                if(or_asset ===undefined){continue;}
                or_asset = or_asset.file.url;
            }
            
            app.assets.loadFromUrl(or_asset, "texture", function (err, asset) {
                window.teamCounter++;
                
                // create a clone of a player
                var player = bank.clone();
                var playerPageEntity = playerPage.clone();
                playerPageEntity.findByName("Structure" + (window.teamCounter % 2 + 1)).enabled = true;
                playerPageEntity.findByName("Structure" + ((window.teamCounter + 1) % 2 + 1)).enabled = false;

                team.addChild(player);
                app.root.addChild(playerPageEntity);

                player.name = 'Player'+(players.indexOf(asset.name)+1);
                playerPageEntity.name = 'PlayerPage'+(players.indexOf(asset.name)+1);

                player.enabled = true;
                playerPageEntity.enabled = true;

                playersEntities.push(player);
                playersPageEntities.push(playerPageEntity);

                playerPageEntity.findByName('WallPhoto1').script.playerPhoto.prepare(players.indexOf(asset.name)+1, asset);

                var material = new pc.PhongMaterial();
                material.name = 'Mat'+player.name;
                material.shadingModel = pc.SPECULAR_BLINN;
                material.diffuseMap = asset.resource;
                material.emissiveMap = asset.resource;
                material.emissiveIntensity = 0.5;
                material.opacityMap = asset.resource;
                material.blendType = 2;
                material.opacityMapChannel = 'a';
                material.cull = pc.CULLFACE_NONE; // debug
                material.update();
                player.model.model.meshInstances[0].material = material;

                if(window.teamCounter === players.length){
                    playersEntities.sort(function(a, b) {
                        return a.name.replace(/\D/g,'') - b.name.replace(/\D/g,'');
                    });
                    playersPageEntities.sort(function(a, b) {
                        return a.name.replace(/\D/g,'') - b.name.replace(/\D/g,'');
                    });

                    for (i = 0; i < playersEntities.length; i++) {
                        player = playersEntities[i];
                        // scale model
                        player.setLocalScale(asset.resource.width/100, 1, asset.resource.height/100);
                        teamLength += player.getLocalScale().x;
                    }

                    // player position inside team, create a stonhedge (circular) array
                    var radius = 10;
                    var center = {x:0, y: 0};

                    var slice = 2 * Math.PI / playersEntities.length;
                    for(var j = 0; j < playersEntities.length; j++) {
                        var angle = slice * j;
                        var x = center.x + radius * Math.cos(angle);
                        var y = center.y + radius * Math.sin(angle);

                        var position = playersEntities[j].getPosition();
                        position.x = x; position.z = y;
                        playersEntities[j].rotate(0, 90 - angle * (180 / Math.PI), 0);
                    }

                    // playerPage position, create a much bigger stonhedge (circular) array
                    var radius = 25;
                    var center = {x:0, y: 0};

                    var slice = 2 * Math.PI / playersPageEntities.length;
                    for(var j = 0; j < playersPageEntities.length; j++) {
                        var angle = slice * j;
                        var x = center.x + radius * Math.cos(angle);
                        var y = center.y + radius * Math.sin(angle);

                        var position = playersPageEntities[j].getPosition();
                        position.x = x*10; position.y = -100; position.z = y*10;
                        playersPageEntities[j].setPosition(position);
                        //playersPageEntities[j].rotate(180, 180, 0);
                    }

                    // prepare 2nd image placeholders
                    for(var j = 0; j < playersClose.length; j++) {
                        var or_asset = window.fulldomain + 'images/' + playersClose[j];
                        if(window.playcanvas === true){
                            or_asset = app.assets.find(playersClose[j], "texture");
                            if(or_asset ===undefined){continue;}
                            or_asset = or_asset.file.url;
                        }

                        app.assets.loadFromUrl(or_asset, "texture", function (err, assetClose) {
                            playersPageEntities[playersClose.indexOf(assetClose.name)].findByName('WallPhoto2').script.playerPhoto.prepare(playersClose.indexOf(assetClose.name), assetClose);
                            playersPageEntities[playersClose.indexOf(assetClose.name)].findByName('LabelDetails').script.labelDetails.prepare(playersClose.indexOf(assetClose.name)+1);
                        });
                    }

                    // select player to emphasize
                    window.player_emphasized = Math.round((players.length) / 2);
                    var playerEmphasized = entity.findByName('Player'+window.player_emphasized);
                    //playerEmphasized.script.player.emphasize(true);

                    // correct camera position
                    camera.script.camera.setValues(teamLength, camera.position.x);
                    app.fire('players:loaded', playersEntities[0], teamLength);

                    window.database.final.entities = {};
                    window.database.final.players = playersEntities;
                }
            });
        }

    }); // event

};

// update code called every frame
Players.prototype.update = function(dt) {

};

// swap method called for script hot-reloading
// inherit your script state here
Players.prototype.swap = function(old) {

};

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/
