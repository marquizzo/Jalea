(function(a,b){if(typeof define==="function"&&define.amd){define([],b);}else{if(typeof exports==="object"){module.exports=b();}else{a.X2JS=b();}}}(this,function(){return function(z){var t="1.2.0";z=z||{};i();u();function i(){if(z.escapeMode===undefined){z.escapeMode=true;}z.attributePrefix=z.attributePrefix||"_";z.arrayAccessForm=z.arrayAccessForm||"none";z.emptyNodeForm=z.emptyNodeForm||"text";if(z.enableToStringFunc===undefined){z.enableToStringFunc=true;}z.arrayAccessFormPaths=z.arrayAccessFormPaths||[];if(z.skipEmptyTextNodesForObj===undefined){z.skipEmptyTextNodesForObj=true;}if(z.stripWhitespaces===undefined){z.stripWhitespaces=true;}z.datetimeAccessFormPaths=z.datetimeAccessFormPaths||[];if(z.useDoubleQuotes===undefined){z.useDoubleQuotes=false;}z.xmlElementsFilter=z.xmlElementsFilter||[];z.jsonPropertiesFilter=z.jsonPropertiesFilter||[];if(z.keepCData===undefined){z.keepCData=false;}}var h={ELEMENT_NODE:1,TEXT_NODE:3,CDATA_SECTION_NODE:4,COMMENT_NODE:8,DOCUMENT_NODE:9};function u(){}function x(B){var C=B.localName;if(C==null){C=B.baseName;}if(C==null||C==""){C=B.nodeName;}return C;}function r(B){return B.prefix;}function s(B){if(typeof(B)=="string"){return B.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");}else{return B;}}function k(B){return B.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&amp;/g,"&");}function w(C,F,D,E){var B=0;for(;B<C.length;B++){var G=C[B];if(typeof G==="string"){if(G==E){break;}}else{if(G instanceof RegExp){if(G.test(E)){break;}}else{if(typeof G==="function"){if(G(F,D,E)){break;}}}}}return B!=C.length;}function n(D,B,C){switch(z.arrayAccessForm){case"property":if(!(D[B] instanceof Array)){D[B+"_asArray"]=[D[B]];}else{D[B+"_asArray"]=D[B];}break;}if(!(D[B] instanceof Array)&&z.arrayAccessFormPaths.length>0){if(w(z.arrayAccessFormPaths,D,B,C)){D[B]=[D[B]];}}}function a(G){var E=G.split(/[-T:+Z]/g);var F=new Date(E[0],E[1]-1,E[2]);var D=E[5].split(".");F.setHours(E[3],E[4],D[0]);if(D.length>1){F.setMilliseconds(D[1]);}if(E[6]&&E[7]){var C=E[6]*60+Number(E[7]);var B=/\d\d-\d\d:\d\d$/.test(G)?"-":"+";C=0+(B=="-"?-1*C:C);F.setMinutes(F.getMinutes()-C-F.getTimezoneOffset());}else{if(G.indexOf("Z",G.length-1)!==-1){F=new Date(Date.UTC(F.getFullYear(),F.getMonth(),F.getDate(),F.getHours(),F.getMinutes(),F.getSeconds(),F.getMilliseconds()));}}return F;}function q(D,B,C){if(z.datetimeAccessFormPaths.length>0){var E=C.split(".#")[0];if(w(z.datetimeAccessFormPaths,D,B,E)){return a(D);}else{return D;}}else{return D;}}function b(E,C,B,D){if(C==h.ELEMENT_NODE&&z.xmlElementsFilter.length>0){return w(z.xmlElementsFilter,E,B,D);}else{return true;}}function A(D,J){if(D.nodeType==h.DOCUMENT_NODE){var K=new Object;var B=D.childNodes;for(var L=0;L<B.length;L++){var C=B.item(L);if(C.nodeType==h.ELEMENT_NODE){var I=x(C);K[I]=A(C,I);}}return K;}else{if(D.nodeType==h.ELEMENT_NODE){var K=new Object;K.__cnt=0;var B=D.childNodes;for(var L=0;L<B.length;L++){var C=B.item(L);var I=x(C);if(C.nodeType!=h.COMMENT_NODE){var H=J+"."+I;if(b(K,C.nodeType,I,H)){K.__cnt++;if(K[I]==null){K[I]=A(C,H);n(K,I,H);}else{if(K[I]!=null){if(!(K[I] instanceof Array)){K[I]=[K[I]];n(K,I,H);}}(K[I])[K[I].length]=A(C,H);}}}}for(var E=0;E<D.attributes.length;E++){var F=D.attributes.item(E);K.__cnt++;K[z.attributePrefix+F.name]=F.value;}var G=r(D);if(G!=null&&G!=""){K.__cnt++;K.__prefix=G;}if(K["#text"]!=null){K.__text=K["#text"];if(K.__text instanceof Array){K.__text=K.__text.join("\n");}if(z.stripWhitespaces){K.__text=K.__text.trim();}delete K["#text"];if(z.arrayAccessForm=="property"){delete K["#text_asArray"];}K.__text=q(K.__text,I,J+"."+I);}if(K["#cdata-section"]!=null){K.__cdata=K["#cdata-section"];delete K["#cdata-section"];if(z.arrayAccessForm=="property"){delete K["#cdata-section_asArray"];}}if(K.__cnt==0&&z.emptyNodeForm=="text"){K="";}else{if(K.__cnt==1&&K.__text!=null){K=K.__text;}else{if(K.__cnt==1&&K.__cdata!=null&&!z.keepCData){K=K.__cdata;}else{if(K.__cnt>1&&K.__text!=null&&z.skipEmptyTextNodesForObj){if((z.stripWhitespaces&&K.__text=="")||(K.__text.trim()=="")){delete K.__text;}}}}}delete K.__cnt;if(z.enableToStringFunc&&(K.__text!=null||K.__cdata!=null)){K.toString=function(){return(this.__text!=null?this.__text:"")+(this.__cdata!=null?this.__cdata:"");};}return K;}else{if(D.nodeType==h.TEXT_NODE||D.nodeType==h.CDATA_SECTION_NODE){return D.nodeValue;}}}}function o(I,F,H,C){var E="<"+((I!=null&&I.__prefix!=null)?(I.__prefix+":"):"")+F;if(H!=null){for(var G=0;G<H.length;G++){var D=H[G];var B=I[D];if(z.escapeMode){B=s(B);}E+=" "+D.substr(z.attributePrefix.length)+"=";if(z.useDoubleQuotes){E+='"'+B+'"';}else{E+="'"+B+"'";}}}if(!C){E+=">";}else{E+="/>";}return E;}function j(C,B){return"</"+(C.__prefix!=null?(C.__prefix+":"):"")+B+">";}function v(C,B){return C.indexOf(B,C.length-B.length)!==-1;}function y(C,B){if((z.arrayAccessForm=="property"&&v(B.toString(),("_asArray")))||B.toString().indexOf(z.attributePrefix)==0||B.toString().indexOf("__")==0||(C[B] instanceof Function)){return true;}else{return false;}}function m(D){var C=0;if(D instanceof Object){for(var B in D){if(y(D,B)){continue;}C++;}}return C;}function l(D,B,C){return z.jsonPropertiesFilter.length==0||C==""||w(z.jsonPropertiesFilter,D,B,C);}function c(D){var C=[];if(D instanceof Object){for(var B in D){if(B.toString().indexOf("__")==-1&&B.toString().indexOf(z.attributePrefix)==0){C.push(B);}}}return C;}function g(C){var B="";if(C.__cdata!=null){B+="<![CDATA["+C.__cdata+"]]>";}if(C.__text!=null){if(z.escapeMode){B+=s(C.__text);}else{B+=C.__text;}}return B;}function d(C){var B="";if(C instanceof Object){B+=g(C);}else{if(C!=null){if(z.escapeMode){B+=s(C);}else{B+=C;}}}return B;}function p(C,B){if(C===""){return B;}else{return C+"."+B;}}function f(D,G,F,E){var B="";if(D.length==0){B+=o(D,G,F,true);}else{for(var C=0;C<D.length;C++){B+=o(D[C],G,c(D[C]),false);B+=e(D[C],p(E,G));B+=j(D[C],G);}}return B;}function e(I,H){var B="";var F=m(I);if(F>0){for(var E in I){if(y(I,E)||(H!=""&&!l(I,E,p(H,E)))){continue;}var D=I[E];var G=c(D);if(D==null||D==undefined){B+=o(D,E,G,true);}else{if(D instanceof Object){if(D instanceof Array){B+=f(D,E,G,H);}else{if(D instanceof Date){B+=o(D,E,G,false);B+=D.toISOString();B+=j(D,E);}else{var C=m(D);if(C>0||D.__text!=null||D.__cdata!=null){B+=o(D,E,G,false);B+=e(D,p(H,E));B+=j(D,E);}else{B+=o(D,E,G,true);}}}}else{B+=o(D,E,G,false);B+=d(D);B+=j(D,E);}}}}B+=d(I);return B;}this.parseXmlString=function(D){var F=window.ActiveXObject||"ActiveXObject" in window;if(D===undefined){return null;}var E;if(window.DOMParser){var G=new window.DOMParser();var B=null;if(!F){try{B=G.parseFromString("INVALID","text/xml").getElementsByTagName("parsererror")[0].namespaceURI;}catch(C){B=null;}}try{E=G.parseFromString(D,"text/xml");if(B!=null&&E.getElementsByTagNameNS(B,"parsererror").length>0){E=null;}}catch(C){E=null;}}else{if(D.indexOf("<?")==0){D=D.substr(D.indexOf("?>")+2);}E=new ActiveXObject("Microsoft.XMLDOM");E.async="false";E.loadXML(D);}return E;};this.asArray=function(B){if(B===undefined||B==null){return[];}else{if(B instanceof Array){return B;}else{return[B];}}};this.toXmlDateTime=function(B){if(B instanceof Date){return B.toISOString();}else{if(typeof(B)==="number"){return new Date(B).toISOString();}else{return null;}}};this.asDateTime=function(B){if(typeof(B)=="string"){return a(B);}else{return B;}};this.xml2json=function(B){return A(B);};this.xml_str2json=function(B){var C=this.parseXmlString(B);if(C!=null){return this.xml2json(C);}else{return null;}};this.json2xml_str=function(B){return e(B,"");};this.json2xml=function(C){var B=this.json2xml_str(C);return this.parseXmlString(B);};this.getVersion=function(){return t;};};}));

var QueryString = function () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}();

var Main = pc.createScript('main');

// initialize code called once per entity
Main.prototype.initialize = function() {
  this.uiButtons  = [];
  this.teamLogo   = null;
  this.teamName   = null;
  this.instruct   = null;
  this.lensFlare  = null;
  this.loadUI();
  this.camScript = this.entity.findByName("Camera").script.camera;

    window.database = {};
    window.database.final = {};
    window.database.final.data = {};
    window.url = {};

    var app = this.app;

    var fulldomain;
    if(location.host.indexOf('playcanvas.') > -1){
        fulldomain ='';
        window.playcanvas = true;
        if(QueryString.presentation === undefined){QueryString.presentation = '/api/assets/4752751/file/asset.json';}
        if(QueryString.group === undefined){QueryString.group = '/api/assets/4752755/file/asset.json';}
    }else{
        fulldomain = location.protocol + '//' + location.host + location.pathname;
        window.playcanvas = false;
        window.fulldomain = fulldomain;
        if(QueryString.presentation === undefined){QueryString.presentation = 'files/assets/4632484/1/asset.json';}
        if(QueryString.group === undefined){QueryString.group = 'files/assets/4632483/1/asset.json';}
//         if(QueryString.presentation === undefined){QueryString.presentation = 'databases/PresentationDatabase.xml';}
//         if(QueryString.group === undefined){QueryString.group = 'databases/GroupDatabase.xml';}
    }

    //http://localhost:8888/jaleatech/release/5th/?group=databases/GroupDatabaseForLastNight.json
    //http://pirron.me/jalea?group=databases/GroupDatabaseForLastNight.json


    this.loadJsonFromRemote(fulldomain + QueryString.presentation, function (data) {
        window.database.presentation = data;
        app.fire('database:presentationLoaded');
    });
    this.loadJsonFromRemote(fulldomain + QueryString.group, function (data) {
        window.database.group = data;
        app.fire('database:groupLoaded');
    });

    this.app.on('database:presentationLoaded', function(){
        if(window.database.group !== undefined){app.fire('database:loaded');}
    });
    this.app.on('database:groupLoaded', function(){
      if(window.database.presentation !== undefined){app.fire('database:loaded');}
      // Initializes logo in UI
      this.initUILogo(
        app.assets.find(window.database.group.Root.Groups.Group.Logo.Image, "texture").getFileUrl(),
        window.database.group.Root.Groups.Group.displayName
      );
    }.bind(this));

    // window.database.presentation = app.assets.find('PresentationDatabase', "json").resource;
    // window.database.group = app.assets.find('GroupDatabase', "json").resource;

    // this.app.fire('database:loaded');
    // // Initializes logo in UI
    // this.initUILogo(
    //     app.assets.find(window.database.group.Root.Groups.Group.Logo.Image, "texture").getFileUrl(),
    //     window.database.group.Root.Groups.Group.displayName
    // );

};

Main.prototype.loadUI = function(){
  // Get HTML asset
  var htmlAsset = this.app.assets.find("ui.html", "html");
  var cssAsset = this.app.assets.find("ui.css", "css");
  document.body.insertAdjacentHTML("beforeend", htmlAsset.resource);
  document.head.insertAdjacentHTML("beforeend", "<style>" + cssAsset.resource + "</style>");

  this.uiButtons = document.getElementsByClassName("svgArrow");
  this.teamLogo = document.getElementById("logoBox");
  this.lensFlare = document.getElementById("flare");
  this.teamName = document.getElementById("teamName");
  this.instruct = document.getElementById("teamInstruct");
  this.uiButtons[0].addEventListener("click", this.uiClickPrev.bind(this));
  this.uiButtons[1].addEventListener("click", this.uiClickNext.bind(this));
  this.uiButtons[2].addEventListener("click", this.uiClickTeam.bind(this));
}

Main.prototype.uiClickPrev = function(event){
  window.player_emphasized --;
  if(window.player_emphasized < 1){
    window.player_emphasized = window.teamCounter;
  }

  this.camScript.switchPage('PlayerPage' + window.player_emphasized);
}

Main.prototype.uiClickNext = function(event){
  window.player_emphasized ++;
  if(window.player_emphasized > window.teamCounter){
    window.player_emphasized = 1;
  }

  this.camScript.switchPage('PlayerPage' + window.player_emphasized);
}

Main.prototype.uiClickTeam = function(event){
  this.camScript.switchPage("TeamPage");
}

Main.prototype.activateUIArrows = function(){
  this.uiButtons[0].setAttribute('class', 'svgArrow active');
  this.uiButtons[1].setAttribute('class', 'svgArrow active');
  this.uiButtons[2].setAttribute('class', 'svgArrow active');
  this.teamLogo.setAttribute('class', '');
  this.teamName.setAttribute('class', '');
  this.instruct.setAttribute('class', '');
}

Main.prototype.deactivateUIArrows = function(){
  this.uiButtons[0].setAttribute('class', 'svgArrow');
  this.uiButtons[1].setAttribute('class', 'svgArrow');
  this.uiButtons[2].setAttribute('class', 'svgArrow');
  this.teamLogo.setAttribute('class', 'active');
  this.teamName.setAttribute('class', 'active');
  this.instruct.setAttribute('class', 'active');
}

Main.prototype.initUILogo = function(logoURL, logoText){
  var flareURL = this.app.assets.get(4791501).getFileUrl();
  this.teamLogo.style.backgroundImage = "url(" + logoURL + ")";
  this.lensFlare.style.backgroundImage = "url(" + flareURL + ")";

  this.teamName.innerHTML = logoText;
  this.deactivateUIArrows();
}

Main.prototype.loadJsonFromRemote = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function () {
        if(url.indexOf('.xml') > -1){
            var parser = new X2JS();
            callback(parser.xml_str2json(this.response));
        }else{
            callback(JSON.parse(this.response));
        }
    });
    xhr.open("GET", url);
    xhr.send();
};
