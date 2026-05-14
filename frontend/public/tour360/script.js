(function(){
    var script = {
 "start": "this.init()",
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "vrPolyfillScale": 0.5,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "scrollBarVisible": "rollOver",
 "children": [
  "this.MainViewer"
 ],
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "desktopMipmappingEnabled": false,
 "paddingLeft": 0,
 "minHeight": 20,
 "backgroundPreloadEnabled": true,
 "scripts": {
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "existsKey": function(key){  return key in window; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "registerKey": function(key, value){  window[key] = value; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "unregisterKey": function(key){  delete window[key]; },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "getKey": function(key){  return window[key]; }
 },
 "borderSize": 0,
 "contentOpaque": false,
 "defaultVRPointer": "laser",
 "paddingBottom": 0,
 "scrollBarMargin": 2,
 "minWidth": 20,
 "downloadEnabled": false,
 "borderRadius": 0,
 "class": "Player",
 "height": "100%",
 "verticalAlign": "top",
 "gap": 10,
 "width": "100%",
 "propagateClick": false,
 "shadow": false,
 "overflow": "visible",
 "scrollBarWidth": 10,
 "data": {
  "name": "Player445"
 },
 "paddingTop": 0,
 "mouseWheelEnabled": true,
 "horizontalAlign": "left",
 "definitions": [{
 "vfov": 180,
 "label": "3101",
 "id": "panorama_F954B244_F73C_7A79_41E5_028FB682D8D8",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA",
   "yaw": -137.06,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 72.76
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_t.jpg",
 "overlays": [
  "this.overlay_F84A4B05_F73C_6BFB_41DC_34507F8D7A18"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": -19.26,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1D8925CE_0D84_B693_4180_37BBE145E302",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "duong-ra-hoi-truong",
 "id": "panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_9A53D395_8A77_839C_41C8_70478C88A4B1",
   "yaw": 160.74,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -21.36
  },
  {
   "panorama": "this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE",
   "yaw": -18.96,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 159.54
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_t.jpg",
 "overlays": [
  "this.overlay_9A46FBB9_8A77_8394_41B5_F012A2BF94B0",
  "this.overlay_9AB240EE_8A7E_9D8C_419E_87B4B1B4BE45"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "vfov": 180,
 "label": "bot-bao-ve",
 "id": "panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011",
   "yaw": 28.45,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -70.08
  },
  {
   "panorama": "this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE",
   "yaw": -87.48,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 76.5
  },
  {
   "panorama": "this.panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A",
   "yaw": -33.85,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 154.15
  },
  {
   "panorama": "this.panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21",
   "yaw": 164.51,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -40.26
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_t.jpg",
 "overlays": [
  "this.overlay_9A591837_8A5E_8C9C_41E0_2DB4B0A05BA3",
  "this.overlay_847B3C85_8A5E_847F_41A0_619E529D0775",
  "this.overlay_985C2AD5_8ADD_8D9C_41E0_9973DE59674D",
  "this.overlay_9C141389_8A5A_9C74_41E0_DEE041939AF8"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "2302",
 "id": "panorama_D2503D71_F73C_7155_41CF_7ED250A076A7",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32",
   "yaw": 0.65,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -119.57
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_t.jpg",
 "overlays": [
  "this.overlay_D37510B0_F73C_4FD3_41E2_6CB48AD4AEE1"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "vfov": 180,
 "label": "lab 3",
 "id": "panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF",
   "yaw": 87.97,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -26.92
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_t.jpg",
 "overlays": [
  "this.overlay_BA16E433_AB5A_A63A_41E2_A8331651CF81"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 32.9,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1904DBB8_0D84_B2FE_419F_E185C9D26C8E",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -13.51,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1C3D6819_0D84_BDBE_419C_0214F0761E02",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "cong-truong",
 "id": "panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B",
   "yaw": -70.08,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 28.45
  },
  {
   "panorama": "this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B",
   "yaw": -70.08,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 28.45
  },
  {
   "panorama": "this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B",
   "yaw": -70.08,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 28.45
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_t.jpg",
 "overlays": [
  "this.overlay_003ADEF7_0D84_9271_4166_F346A4B07D23"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "vfov": 180,
 "label": "hanh-lang-t2(gd3)",
 "id": "panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5",
   "yaw": 174.29,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -68.26
  },
  {
   "panorama": "this.panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5",
   "yaw": 174.29,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -68.26
  },
  {
   "panorama": "this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52",
   "yaw": 9.44,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -138.8
  },
  {
   "panorama": "this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52",
   "yaw": 9.44,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -138.8
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_t.jpg",
 "overlays": [
  "this.overlay_9C02CD5B_8A6E_8494_4194_A73D90358E30",
  "this.overlay_9D9D5651_8A6E_8497_41E1_2CF958B9144C"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -50.1,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1E1E2A89_0D84_B291_4196_A7555A9235AF",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -26.58,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1DD7CC6B_0D84_B591_418F_070D13FD4231",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 133.04,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1983850B_0D84_B792_4160_1D4C60A235A9",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "duong-ra-nha-the-chat",
 "id": "panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24",
   "yaw": 35.75,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 132.37
  },
  {
   "panorama": "this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE",
   "yaw": -147.1,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -18.8
  },
  {
   "panorama": "this.panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE",
   "yaw": 15.72,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 93.68
  },
  {
   "panorama": "this.panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D",
   "yaw": 96.4,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -149.89
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_t.jpg",
 "overlays": [
  "this.overlay_9849939E_8AD5_838C_41D5_9634A799D874",
  "this.overlay_98C54FFB_8AD6_8394_41CB_74D38D036313",
  "this.overlay_A3835255_8BF6_FC9C_41C7_83A288C30B73",
  "this.overlay_DBD298B8_D4EE_94B4_41E8_68D808BE8B0D"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -154.87,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1EE84A78_0D84_B27F_4188_A1AF64E66B4F",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 52.98,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1E155470_0D84_B58E_418E_C0A5FD0F32BE",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "san bong ro",
 "id": "panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7",
   "yaw": -103.8,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 132.94
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_t.jpg",
 "overlays": [
  "this.overlay_FDA62D05_EE5A_7AB8_41D0_01821B1EA0DA"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "vfov": 180,
 "label": "phong-giat",
 "id": "panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6",
   "yaw": -133.55,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -37.86
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_t.jpg",
 "overlays": [
  "this.overlay_DE5FF7C7_F7D4_D1BC_41E6_7F9B947C4895"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": -116.15,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1E3E4AAC_0D84_B297_41A4_A43A98CF6886",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -15.13,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1E4FC4C7_0D84_B692_41AA_3D9B8581949B",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -113.99,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1CD787A4_0D84_B296_419F_006BCC291BB7",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -104.24,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1DBADC36_0D84_B5F2_41A7_EEEDA00E3D28",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -50.01,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1C65C86B_0D84_BD92_418C_765410CDFEE6",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -47.63,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1EBBFA23_0D84_BD91_41A3_185BE4046C1D",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 61.25,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1E93E3D6_0D84_B2B2_419E_E70E1C9C5748",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 62.39,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1D7FF732_0D84_B3F2_41A5_FC4A30A1FCA0",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 78.14,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1CF4A7C6_0D84_B292_4198_3612BFAFE284",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -151.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1F222975_0D84_BE76_4187_E7C7D7704C17",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -150.1,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1E6E74E8_0D84_B69E_4192_A35DB8BDC2B3",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "san sau gd2",
 "id": "panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3",
   "yaw": 129.99,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -60.57
  },
  {
   "panorama": "this.panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7",
   "yaw": 37.12,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -156.72
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_t.jpg",
 "overlays": [
  "this.overlay_FB25380F_EE2A_DAC8_41E7_3C219B78ADDF",
  "this.overlay_F60D5E1F_EE3A_76C8_41E8_1C7212E851F0"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -151.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1F4059A3_0D84_BE91_41A6_306B4CCC4B83",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "lab1",
 "id": "panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_82BAF319_901A_2F0D_41C4_309B78B0C979",
   "yaw": 100.6,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 7.17
  },
  {
   "panorama": "this.panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197",
   "yaw": -26.92,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 87.97
  },
  {
   "panorama": "this.panorama_93F12805_8A6E_8C7C_41D9_78F983707124",
   "yaw": 29.9,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -117.42
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_t.jpg",
 "overlays": [
  "this.overlay_902DCA8F_8A6B_8D8C_41D4_2E56962AF3C4",
  "this.overlay_83BC2280_9016_29FC_41DB_826793121830",
  "this.overlay_BA3BD77E_AB5A_622B_41D8_B54E351F8354"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": -79.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_199DB4F9_0D84_B67E_4190_2E37EF7FD624",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "cua len gd3(gan nha the chat)",
 "id": "panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA",
   "yaw": 153.42,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -66.39
  },
  {
   "panorama": "this.panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6",
   "yaw": 11.43,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 156.5
  },
  {
   "panorama": "this.panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE",
   "yaw": -23.03,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -43.38
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_t.jpg",
 "overlays": [
  "this.overlay_C6D274E8_D4F6_BCD4_41D5_132B824F8903",
  "this.overlay_FC2BA2D5_F26D_1972_41BD_B50311D3B4E7",
  "this.overlay_E3502D29_F754_2E0B_41E4_E74DC402E0EB"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": -176.47,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1EB3B40D_0D84_B591_4184_1B364A6DC3B1",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "hanh lang -t2(gd2)",
 "id": "panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36",
   "yaw": -98.04,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 129.9
  },
  {
   "panorama": "this.panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007",
   "yaw": -159.4,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -149.78
  },
  {
   "panorama": "this.panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E",
   "yaw": -18.5,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 63.85
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_t.jpg",
 "overlays": [
  "this.overlay_94A79AA9_8BBA_8DB4_41D6_EAE9397D24B5",
  "this.overlay_81866D9B_91C3_9793_4189_808E9F82BEA7",
  "this.overlay_EDE6F085_F74C_56FB_419E_FE88E4D5F8F2"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": -109.38,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_19C7AB6C_0D84_B397_4184_CE111B804264",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "dom e",
 "id": "panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258",
   "yaw": -37.86,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -133.55
  },
  {
   "panorama": "this.panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3",
   "yaw": 71.45,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 31.37
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_t.jpg",
 "overlays": [
  "this.overlay_DEB60503_F7D4_56B5_41E2_F7383446515F",
  "this.overlay_DE233E50_F7D4_F353_41E8_8D6616EF9234"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "phong-may",
 "id": "panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52",
   "yaw": -155.18,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 113.42
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_t.jpg",
 "overlays": [
  "this.overlay_92B042AA_8A55_BDB4_41BC_2684FB452D8D"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": -47.06,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1915ABA0_0D84_B28E_41A4_FE3823CD4882",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 111.74,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1FCFB8DD_0D84_BEB6_419B_9FE5460C8579",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 62.58,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1D27E6E0_0D84_B28E_4196_40C5A4AEFB56",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "gd2-t2-dau-hanh-lang",
 "id": "panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2",
   "yaw": 63.85,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -18.5
  },
  {
   "panorama": "this.panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8",
   "yaw": 72.56,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 25.13
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_t.jpg",
 "overlays": [
  "this.overlay_EC119B1F_F74C_2A07_4176_B8500BFA043F",
  "this.overlay_EB09CA86_F75B_D3BC_41B1_16CDE58C480F"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": -106.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1F8B389C_0D84_BEB6_4186_EE81CDC84FE1",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 158.64,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1EF68454_0D84_B5B7_4182_185E6170F0CE",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "gd2(t1)-hanh-lang",
 "id": "panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC",
   "yaw": 164.87,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -84.11
  },
  {
   "panorama": "this.panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49",
   "yaw": -127.02,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 65.69
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_t.jpg",
 "overlays": [
  "this.overlay_957760EE_8BBB_FD8C_41D7_2981D49F5313",
  "this.overlay_94C04A93_8BBA_8D94_41E0_864608603980",
  "this.overlay_E097B2DB_F74C_DA0F_41CF_72296D0FD4DF"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": -23.5,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1D5DE700_0D84_B38F_41A2_B68B959B2B4C",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 144.57,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_19E67B8F_0D84_B292_41A7_47EB7E13716D",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 24.82,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1F77B9B6_0D84_BEF2_419D_745E39F420B3",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -142.88,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1C76E85B_0D84_BDB2_41A5_0E4C7041B6D5",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 109.92,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1DB7E5DB_0D84_B6B1_41A8_3B55B3D7FD36",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 136.62,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1D412711_0D84_B38E_4198_5F2337BB8F5D",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "sanh-t2-gd3",
 "id": "panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3",
   "yaw": 70.62,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -118.75
  },
  {
   "panorama": "this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52",
   "yaw": -117.45,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 88.16
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_t.jpg",
 "overlays": [
  "this.overlay_9FD72DA2_8AFD_87B4_41C1_4D812AA89815",
  "this.overlay_9CB8EB1E_8A5E_8C8C_41D8_C73EEC332F7A"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 41.2,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1F1DB92C_0D84_BF96_4164_5981FE21A92E",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 23.28,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1DE1F67D_0D84_B271_4197_B90A7D7B08E3",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "3104",
 "id": "panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA"
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_t.jpg",
 "overlays": [
  "this.overlay_E23B08CF_F75C_5607_41C6_7922C7579C77"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 97.07,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1C2C182A_0D84_BD92_4192_C2AD5E80AA0A",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -15.49,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1E0A948E_0D84_B692_417A_AD2725AECCAB",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "GD2(2)",
 "id": "panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C"
  },
  {
   "panorama": "this.panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2",
   "yaw": 129.9,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -98.04
  },
  {
   "panorama": "this.panorama_98AA559B_8A76_8794_41CA_9930712915C9",
   "yaw": 58.26,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -141.75
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_t.jpg",
 "overlays": [
  "this.overlay_823FAB5C_900A_FF04_41DD_2393E5CA09F0",
  "this.overlay_826DFCB6_900B_F904_41A1_1CAA12B5FD4E",
  "this.overlay_823C3D2F_900A_3B05_41DF_C3A3475B6D00"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 30.74,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1CA1F794_0D84_B2B6_41A9_5DB915746771",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -179.85,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1FB9D8AD_0D84_BE96_4184_C959D41046C0",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -86.32,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1ED9BA4E_0D84_BD93_41A1_706E10F7DA71",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 161.2,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1EABFA3B_0D84_BDF2_4193_C18AC106E55F",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -66.58,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1DADB611_0D84_B58E_419B_FDA50AF4782B",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 20.6,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1F66D3A8_0D84_B29F_41A3_A28028355F55",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "duong-ra-gd1",
 "id": "panorama_9A53D395_8A77_839C_41C8_70478C88A4B1",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_98AA559B_8A76_8794_41CA_9930712915C9",
   "yaw": 170.28,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -28.84
  },
  {
   "panorama": "this.panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162",
   "yaw": -21.36,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 160.74
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E"
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_t.jpg",
 "overlays": [
  "this.overlay_9A773555_8A7E_849C_41D0_CAEC999E252E",
  "this.overlay_9A030052_8A76_BC94_41B2_1C27958BDB43",
  "this.overlay_98B10DCE_8ABB_878C_41B9_B0DC6841817A"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": -150.42,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_19824B25_0D84_B396_41AB_236C4AD9C693",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "gd2-tang3-dau",
 "id": "panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32",
   "yaw": -109.62,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 66.01
  },
  {
   "panorama": "this.panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B",
   "yaw": -117.61,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 3.61
  },
  {
   "panorama": "this.panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007",
   "yaw": 70.5,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -101.86
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_t.jpg",
 "overlays": [
  "this.overlay_E9DF26FB_F754_5355_41E9_0F13ABAAFE39",
  "this.overlay_E83B24B1_F74D_D7D5_41EB_EAA8762DAC28",
  "this.overlay_D3F7AD13_F734_56D5_41E6_45E99A7165E2"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 135.31,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1ED21437_0D84_B5F1_4173_4C1858A81F2D",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -107.11,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_19B0FB36_0D84_B3F3_4195_04BF9694DEF6",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "3103",
 "id": "panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8",
   "yaw": 156.5,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 11.43
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_t.jpg",
 "overlays": [
  "this.overlay_E4C547F2_F755_DA19_41ED_4DD67C07BF49"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": -91.84,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1E8523EF_0D84_B292_41A1_4FBFBB23694E",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "nga 4 thang cong",
 "id": "panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498",
   "yaw": -22.12,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 166.15
  },
  {
   "panorama": "this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE",
   "yaw": 75.76,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -104.25
  },
  {
   "panorama": "this.panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7",
   "yaw": 155.43,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 37.4
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_t.jpg",
 "overlays": [
  "this.overlay_965EC472_8BAA_8495_41DB_0E56FFA763DA",
  "this.overlay_9F18DD27_8EFB_0627_41D8_353810C63A0C",
  "this.overlay_FF1277AA_EE6A_75C8_41BF_A2C9CDBE8A9E"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 157.88,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1C0E6808_0D84_BD9E_418E_613CA831F10F",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 46.45,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1D1D569D_0D84_B2B1_4192_90E0AAFC5E3B",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 38.25,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1D8715B3_0D84_B6F2_41A2_B544C549B6B1",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "loi-vao-lab",
 "id": "panorama_93F12805_8A6E_8C7C_41D9_78F983707124",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF",
   "yaw": -117.42,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 29.9
  },
  {
   "panorama": "this.panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26",
   "yaw": 29.58,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 100.64
  },
  {
   "panorama": "this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52",
   "yaw": 60.53,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -46.96
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_t.jpg",
 "overlays": [
  "this.overlay_90C4B3BC_8A6F_838D_41D4_35D87BEAF76C",
  "this.overlay_90497676_8A6A_849C_41C9_773C5422DBE9",
  "this.overlay_9064CA68_8A55_8CB4_41D4_0075298C0116"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_t.jpg",
 "label": "2101",
 "id": "panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F",
 "hfovMax": 130,
 "pitch": 0,
 "hfovMin": "135%",
 "partial": false,
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "vfov": 180,
 "label": "lab2",
 "id": "panorama_82BAF319_901A_2F0D_41C4_309B78B0C979",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF",
   "yaw": 7.17,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 100.6
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_t.jpg",
 "overlays": [
  "this.overlay_83EE6C1C_9016_7904_41BB_C3CF35196CB6"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "vfov": 180,
 "label": "nha-an",
 "id": "panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B",
   "yaw": 132.37,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 35.75
  },
  {
   "panorama": "this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8",
   "yaw": -82.47,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 72.19
  },
  {
   "panorama": "this.panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3",
   "yaw": -2.93,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -149.26
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_t.jpg",
 "overlays": [
  "this.overlay_989BDC54_8AED_849C_41D1_7E0A1E9C1954",
  "this.overlay_99D7041B_8AED_8494_41D4_DAE3B054A46A",
  "this.overlay_A80968E8_8BAB_8DB4_41DC_8334EBC6B1B9"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -109.5,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1F6813C2_0D84_B292_416E_A754D4421C7A",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "san-bong",
 "id": "panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B",
   "yaw": -149.89,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 96.4
  },
  {
   "panorama": "this.panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9",
   "yaw": 78.7,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -101.04
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_t.jpg",
 "overlays": [
  "this.overlay_A1764E40_8BEB_84F5_41B3_6B2572A0655A",
  "this.overlay_A28EDA27_8BF7_8CBC_41DC_89389C917486"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 36.93,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1E626B03_0D84_B392_41AA_09D7E4D7BBFE",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "2101",
 "id": "panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C",
   "yaw": -84.11,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 164.87
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_t.jpg",
 "overlays": [
  "this.overlay_E09C8918_F774_7609_41E0_8341C81AD393"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": -164.28,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1FA958BD_0D84_BEF6_4195_851B8B7C877F",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -35.25,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1DDD9C78_0D84_B67F_417C_45799F1709FA",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -172.83,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1D09D6BF_0D84_B2F2_4180_D739BF12179E",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -121.74,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1C967754_0D84_B3B6_417F_6E787532B380",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -148.63,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1D06A6AE_0D84_B292_418E_74589C93C6FC",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -101.3,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1E5CBACE_0D84_B293_418A_14C0FAF4BEEE",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 41.2,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1FEE5916_0D84_BFB2_4177_C446FC1EC02E",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -119.47,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1E8519F9_0D84_BE7E_41A6_E0A041114F62",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -142.6,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1E5F64B9_0D84_B6FE_419D_27F214C21E4E",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 70.38,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_19D71B5A_0D84_B3B2_41A5_10336B8BAE17",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 156.97,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1FDF08CD_0D84_BE91_4190_AE1B2D16A885",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 161.04,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1DA6EC43_0D84_B591_4193_5D0422738506",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "tap-hoa-truong-sinh",
 "id": "panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F",
   "yaw": 166.15,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -22.12
  },
  {
   "panorama": "this.panorama_9607D4FC_9906_6A31_41DB_47B84633749D",
   "yaw": -28.69,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 166.49
  },
  {
   "panorama": "this.panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE",
   "yaw": 0.15,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -82.93
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_t.jpg",
 "overlays": [
  "this.overlay_9DFE9795_8EFD_02FB_41B0_C13762D26A96",
  "this.overlay_96E6407B_9902_6A37_4197_4BF3FFE74B17",
  "this.overlay_F9B04FA7_F65A_D381_41B3_D2CCE64F27FC"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 119.43,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1DFE8670_0D84_B58E_41A0_7019F6A9E2E6",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "gd3-tang3-cuoi",
 "id": "panorama_D568A391_F74C_51D4_41EB_EA36557FA15B",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32",
   "yaw": 72.89,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -113.93
  },
  {
   "panorama": "this.panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271",
   "yaw": -112.99,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 3.53
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_t.jpg",
 "overlays": [
  "this.overlay_D6907DD0_F74C_D153_41C5_713CB9725137",
  "this.overlay_D226D140_F73C_4EB4_41EB_5CDD1B44B0BF"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "vfov": 180,
 "label": "the-chat-ngoai-troi",
 "id": "panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D",
   "yaw": -101.04,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 78.7
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_t.jpg",
 "overlays": [
  "this.overlay_A3B10469_8BEB_84B4_41D4_4334453C455A"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": -170.56,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1F67E9CE_0D84_BE92_4196_86AB24468DEF",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "media": "this.panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_camera"
  },
  {
   "media": "this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_camera"
  },
  {
   "media": "this.panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_camera"
  },
  {
   "media": "this.panorama_9A53D395_8A77_839C_41C8_70478C88A4B1",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_camera"
  },
  {
   "media": "this.panorama_98AA559B_8A76_8794_41CA_9930712915C9",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_98AA559B_8A76_8794_41CA_9930712915C9_camera"
  },
  {
   "media": "this.panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_camera"
  },
  {
   "media": "this.panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_camera"
  },
  {
   "media": "this.panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_camera"
  },
  {
   "media": "this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_camera"
  },
  {
   "media": "this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_camera"
  },
  {
   "media": "this.panorama_992EFE19_8AEE_8497_41C5_7168906A82C4",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_camera"
  },
  {
   "media": "this.panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_camera"
  },
  {
   "media": "this.panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_camera"
  },
  {
   "media": "this.panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_camera"
  },
  {
   "media": "this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_camera"
  },
  {
   "media": "this.panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_camera"
  },
  {
   "media": "this.panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_camera"
  },
  {
   "media": "this.panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_camera"
  },
  {
   "media": "this.panorama_93F12805_8A6E_8C7C_41D9_78F983707124",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_93F12805_8A6E_8C7C_41D9_78F983707124_camera"
  },
  {
   "media": "this.panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_camera"
  },
  {
   "media": "this.panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_camera"
  },
  {
   "media": "this.panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_camera"
  },
  {
   "media": "this.panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_camera"
  },
  {
   "media": "this.panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_camera"
  },
  {
   "media": "this.panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_camera"
  },
  {
   "media": "this.panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_camera"
  },
  {
   "media": "this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_camera"
  },
  {
   "media": "this.panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_camera"
  },
  {
   "media": "this.panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_camera"
  },
  {
   "media": "this.panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_camera"
  },
  {
   "media": "this.panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_camera"
  },
  {
   "media": "this.panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_camera"
  },
  {
   "media": "this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_camera"
  },
  {
   "media": "this.panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_camera"
  },
  {
   "media": "this.panorama_82BAF319_901A_2F0D_41C4_309B78B0C979",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 34, 35)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_camera"
  },
  {
   "media": "this.panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_camera"
  },
  {
   "media": "this.panorama_9607D4FC_9906_6A31_41DB_47B84633749D",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9607D4FC_9906_6A31_41DB_47B84633749D_camera"
  },
  {
   "media": "this.panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_camera"
  },
  {
   "media": "this.panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 38, 39)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_camera"
  },
  {
   "media": "this.panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 39, 40)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_camera"
  },
  {
   "media": "this.panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 40, 41)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_camera"
  },
  {
   "media": "this.panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 41, 42)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_camera"
  },
  {
   "media": "this.panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 42, 43)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_camera"
  },
  {
   "media": "this.panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 43, 44)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_camera"
  },
  {
   "media": "this.panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 44, 45)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_camera"
  },
  {
   "media": "this.panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 45, 46)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_camera"
  },
  {
   "media": "this.panorama_F954B244_F73C_7A79_41E5_028FB682D8D8",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 46, 47)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_camera"
  },
  {
   "media": "this.panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 47, 48)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_camera"
  },
  {
   "media": "this.panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 48, 49)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_camera"
  },
  {
   "media": "this.panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 49, 50)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_camera"
  },
  {
   "media": "this.panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 50, 51)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_camera"
  },
  {
   "media": "this.panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 51, 52)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_camera"
  },
  {
   "media": "this.panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 52, 53)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_camera"
  },
  {
   "media": "this.panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 53, 54)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_camera"
  },
  {
   "media": "this.panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 54, 55)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_camera"
  },
  {
   "media": "this.panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 55, 56)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_camera"
  },
  {
   "media": "this.panorama_D568A391_F74C_51D4_41EB_EA36557FA15B",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 56, 57)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_camera"
  },
  {
   "media": "this.panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 57, 58)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_camera"
  },
  {
   "media": "this.panorama_D2503D71_F73C_7155_41CF_7ED250A076A7",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 58, 59)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_camera"
  },
  {
   "media": "this.panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 59, 60)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_camera"
  },
  {
   "media": "this.panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 60, 61)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_camera"
  },
  {
   "media": "this.panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 61, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_camera"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "san-chao-co",
 "id": "panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_98AA559B_8A76_8794_41CA_9930712915C9"
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_t.jpg",
 "overlays": [
  "this.overlay_9884097B_8AB6_8C8B_41D4_DC45800586ED"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": -107.44,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_19B3B51D_0D84_B7B6_419F_08F77E6D968F",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "loi-vao-y-te",
 "id": "panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0",
   "yaw": 78.47,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -121.57
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_t.jpg",
 "overlays": [
  "this.overlay_AEE8D29D_8BDA_9D8C_41BD_12D9A9D26C17"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": -176.39,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1CC517B6_0D84_B2F2_41A7_37BFF8A8A7D5",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "phong an",
 "id": "panorama_992EFE19_8AEE_8497_41C5_7168906A82C4",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8",
   "yaw": 70.41,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -73.27
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_t.jpg",
 "overlays": [
  "this.overlay_9FC74F80_8AFA_8475_41D3_C846F7AB24EC"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": -124.07,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1C1837F7_0D84_B272_41A1_9EF9F93467E1",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 111.74,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1FFE08FC_0D84_BE76_416D_63BD9299A862",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -109.59,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1EA89429_0D84_B591_416E_B20DC1706132",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "cuoi hanh lang - gd2(t1)",
 "id": "panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C",
   "yaw": 65.69,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -127.02
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_t.jpg",
 "overlays": [
  "this.overlay_A9AE2D43_8BB7_84F4_41DF_81F8D65C7E95"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "vfov": 180,
 "label": "2303",
 "id": "panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_D568A391_F74C_51D4_41EB_EA36557FA15B",
   "yaw": 3.53,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -112.99
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_t.jpg",
 "overlays": [
  "this.overlay_D273FA0C_F73C_F2CC_41ED_9D8D4B1E8D65"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 135.31,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1EC09445_0D84_B591_41A2_4D1DCB14A492",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "gd3(2)",
 "id": "panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_F954B244_F73C_7A79_41E5_028FB682D8D8",
   "yaw": 72.76,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -137.06
  },
  {
   "panorama": "this.panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8",
   "yaw": -66.39,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 153.42
  },
  {
   "panorama": "this.panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80",
   "yaw": 0.67,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 144.75
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_t.jpg",
 "overlays": [
  "this.overlay_FDF2FB87_F26B_0FDE_41E9_31B49E166047",
  "this.overlay_F8B11397_F73C_7A07_41E5_577BB1CFD9AF",
  "this.overlay_E79421D5_F735_F61B_41A9_DF332478B2C3",
  "this.overlay_E11200C8_F755_F609_41C7_A2B714B7246A"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 42.94,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1DA90C5E_0D84_B5B3_41A5_F598E5322D4E",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 75.75,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1E28A4AB_0D84_B692_417F_A8EC1EAC2C00",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "thu-vien",
 "id": "panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_93F12805_8A6E_8C7C_41D9_78F983707124",
   "yaw": 100.64,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 29.58
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_t.jpg",
 "overlays": [
  "this.overlay_963AAF11_8A57_8494_41C2_F2C627F303AC"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 177.07,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1C6BB87B_0D84_BE71_419A_E7032D3921B5",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 76.2,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1C40D84A_0D84_BD93_41A6_753216E8BE26",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 161.5,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1EF85A69_0D84_BD9E_4184_8D2AAF3051C7",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_9607D4FC_9906_6A31_41DB_47B84633749D_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 144.57,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_19F64B7E_0D84_B272_419B_6A2FE1815F48",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 146.15,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1C9B4763_0D84_B392_419A_0042DD15B6DD",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -79.4,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1DF43662_0D84_B592_41A6_AF065BF6A57B",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -179.33,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1F33895D_0D84_BFB6_41AA_3FCB37B9F95A",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 92.52,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1DACCC50_0D84_B58F_418C_666AA9BBCE66",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 66.07,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1E88E3FF_0D84_B272_4181_6869254AEFEB",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "gd3(3)",
 "id": "panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA"
  },
  {
   "panorama": "this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0",
   "yaw": -10.78,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 169.08
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_t.jpg",
 "overlays": [
  "this.overlay_E5726209_F66A_4C81_41C1_1FD16365470C",
  "this.overlay_E154815B_F75C_760F_41E2_D6D16B9EAC90"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "vfov": 180,
 "label": "san-choi-gd2",
 "id": "panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973",
   "yaw": -60.57,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 129.99
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_t.jpg",
 "overlays": [
  "this.overlay_F66BAD34_EE3A_5AD8_41D3_48C11B7BE167"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 67.01,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1E1B747F_0D84_B672_4192_4678463053F9",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "3102",
 "id": "panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA",
   "yaw": 144.75,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 0.67
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_t.jpg",
 "overlays": [
  "this.overlay_E6CA7F3F_F74C_2A07_41EA_B70C9B9769FF"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": -107.24,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1D4B9721_0D84_B391_414D_EC1FB5B22141",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "loi-vao-ktx",
 "id": "panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24",
   "yaw": -149.26,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -2.93
  },
  {
   "panorama": "this.panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6",
   "yaw": 31.37,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 71.45
  },
  {
   "panorama": "this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0",
   "yaw": -58.51,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 73.45
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_t.jpg",
 "overlays": [
  "this.overlay_A89372B7_8BAA_BD9C_41CE_8779ED58CBF0",
  "this.overlay_A8CC0E88_8BDF_8474_41C1_528F2DBF6255",
  "this.overlay_DF1939DD_F7DC_714D_41E5_5CA6EE340FBA"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": -9.72,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1D624743_0D84_B392_41A0_1562F199A3F1",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "nha-de-xe",
 "id": "panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B",
   "yaw": -40.26,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 164.51
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_t.jpg",
 "overlays": [
  "this.overlay_983ED8A9_8ADD_8DB4_41DB_0D3888138C17"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": -144.25,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1C8F0774_0D84_B276_4197_38057E2BFF34",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 97.53,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1EA5D41B_0D84_B5B1_4168_B65587215DF8",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 113.61,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1D2B06EF_0D84_B291_4171_D35C65BDAA9A",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 142.14,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1E8BCA11_0D84_BD8E_41A3_BDC92188E31C",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 151.31,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1E7FE4D6_0D84_B6B2_4178_775BF50E88FF",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -151.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1F524987_0D84_BE91_41A0_162211B3ABB8",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 95.89,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1CFBA7D6_0D84_B2B2_41A9_83A49269A845",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -92.03,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1D3316CF_0D84_B291_4177_A9D29BF6E768",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "loi vao gd3",
 "id": "panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498",
   "yaw": -82.93,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 0.15
  },
  {
   "panorama": "this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B",
   "yaw": 93.68,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 15.72
  },
  {
   "panorama": "this.panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8",
   "yaw": -43.38,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -23.03
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_t.jpg",
 "overlays": [
  "this.overlay_C44A83DA_D4EF_94F4_41E2_CA8F8F6EA37F",
  "this.overlay_C5D33580_D4F7_7D54_41A0_C8ABCFA5942E",
  "this.overlay_F89D9039_F65E_4C81_41EB_0D6F3ABA0159"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_98AA559B_8A76_8794_41CA_9930712915C9_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "sanh-truoc-cong",
 "id": "panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B",
   "yaw": -18.8,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -147.1
  },
  {
   "panorama": "this.panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F",
   "yaw": -104.25,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 75.76
  },
  {
   "panorama": "this.panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162",
   "yaw": 159.54,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -18.96
  },
  {
   "panorama": "this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B",
   "yaw": 76.5,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -87.48
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_t.jpg",
 "overlays": [
  "this.overlay_9E8F46DC_8EF2_6347_41D8_5B734F8F231E",
  "this.overlay_9D8C7789_8EF1_A1CE_41DB_9234ACC09764",
  "this.overlay_9D4E159B_8EFE_61C2_41CE_9CB1A99A8802",
  "this.overlay_9E8004C1_901A_297D_41B8_49C279D33A85"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 139.74,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1DA71604_0D84_B596_4192_636883167B1A",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -107.81,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1CBD3783_0D84_B291_41A9_D7AF3C9024BD",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "hanh-lang-t3(gd2)",
 "id": "panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2",
   "yaw": -149.78,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -159.4
  },
  {
   "panorama": "this.panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874",
   "yaw": -101.86,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 70.5
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_t.jpg",
 "overlays": [
  "this.overlay_9F7DE400_91CE_B46D_41B5_E94971CE1E48",
  "this.overlay_EAFF6493_F754_77D4_416D_48AF183C1168"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -10.92,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1DC35656_0D84_B5B2_419E_21131E985D18",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 81.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_19A2E52F_0D84_B792_419B_9CAB984D1897",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "tang-2-gd3",
 "id": "panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14",
   "yaw": -118.75,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 70.62
  },
  {
   "panorama": "this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8",
   "yaw": -44.69,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -35.43
  },
  {
   "panorama": "this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8",
   "yaw": 170.91,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -35.43
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_t.jpg",
 "overlays": [
  "this.overlay_9E7ECB73_8AF6_8C94_41E0_45187CD5833D",
  "this.overlay_9D7214FB_8AF5_8594_41B8_462C87745F99",
  "this.overlay_9F40C392_8AFE_8394_4190_9E0D3C1056E4"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": -5.71,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1F7C7392_0D84_B2B2_4187_BC6AB64748E9",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "2301",
 "id": "panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874",
   "yaw": 3.61,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -117.61
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_t.jpg",
 "overlays": [
  "this.overlay_D44CEBBD_F73C_D1CD_41ED_05A6850C74BB"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "vfov": 180,
 "label": "sanh-nha-an",
 "id": "panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24",
   "yaw": 72.19,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -82.47
  },
  {
   "panorama": "this.panorama_992EFE19_8AEE_8497_41C5_7168906A82C4",
   "yaw": -73.27,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 70.41
  },
  {
   "panorama": "this.panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3",
   "yaw": -35.43,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -44.69
  },
  {
   "panorama": "this.panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3",
   "yaw": 145.98,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -44.69
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_t.jpg",
 "overlays": [
  "this.overlay_994472FB_8AEF_9D94_41C9_4C74606797A9",
  "this.overlay_9FC813FB_8AEB_8394_41C3_0CC4FD936293",
  "this.overlay_9EC727B2_8AF6_8395_41DE_1E4760939A10",
  "this.overlay_9E396B89_8AF6_8C74_41C2_5A7A8C489008"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": -25.85,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1DBAF5F7_0D84_B672_41A2_AD03F08DCC7F",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "san sau gd1",
 "id": "panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F",
   "yaw": 37.4,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 155.43
  },
  {
   "panorama": "this.panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F",
   "yaw": 132.94,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -103.8
  },
  {
   "panorama": "this.panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973",
   "yaw": -156.72,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 37.12
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_t.jpg",
 "overlays": [
  "this.overlay_FF8A6E7A_EE6A_D748_41AC_D92622DF1FB6",
  "this.overlay_FCDA8F2A_EE5A_36C8_41C0_76C9A0A00C35",
  "this.overlay_FB8F676A_EE2A_3548_41E2_17E4D68C7D31"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_93F12805_8A6E_8C7C_41D9_78F983707124_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 30.11,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1EC9CA5C_0D84_BDB7_419A_2E44B8448658",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "viewerArea": "this.MainViewer",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "class": "PanoramaPlayer",
 "mouseControlMode": "drag_acceleration"
},
{
 "initialPosition": {
  "yaw": -24.57,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1C51983A_0D84_BDF2_41A5_AB9854499954",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -114.31,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1CE9F7E7_0D84_B291_4178_971E38547858",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "duong-vao-nha-clb",
 "id": "panorama_9607D4FC_9906_6A31_41DB_47B84633749D",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498",
   "yaw": 166.49,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -28.69
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_t.jpg",
 "overlays": [
  "this.overlay_899A65B3_9903_AA37_41C1_1651E45E3C67"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 106.73,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1F0C7949_0D84_BF9E_418C_768DFAAB25D6",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -108.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1F9B388B_0D84_BE91_4195_68969CC24410",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -179.35,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_19A0CB47_0D84_B390_41A3_8C8B7C1E1F7F",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 30.22,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1E0E2A9A_0D84_B2B3_419C_F5A6EDCC8C5C",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -101.53,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1E73EAF1_0D84_B271_4181_77D6D58151CA",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "duong-ra-gd2",
 "id": "panorama_98AA559B_8A76_8794_41CA_9930712915C9",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_9A53D395_8A77_839C_41C8_70478C88A4B1",
   "yaw": -28.84,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 170.28
  },
  {
   "panorama": "this.panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36",
   "yaw": -141.75,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 58.26
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_t.jpg",
 "overlays": [
  "this.overlay_9AFB2D4D_8A77_848C_41D2_347C1282F452",
  "this.overlay_9AE171BE_8A55_BF8C_41D0_5A83BCC834EA"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 121.49,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_19919B14_0D84_B3B6_41A8_4B47EA7EB599",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 169.22,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1E430AE0_0D84_B28E_4183_0687311A4ED2",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "phong-canh-phong-may",
 "id": "panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D",
   "yaw": -68.26,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 174.29
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_t.jpg",
 "overlays": [
  "this.overlay_93DA570D_8A76_848C_419D_845F80869E07"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 60.43,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1E2CAABE_0D84_B2F2_418F_F27C7DCE2A58",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 62.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1E9599E6_0D84_BE92_4185_0954E3FEECB6",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "phong-nghi-gv-gd2",
 "id": "panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E",
   "yaw": 25.13,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 72.56
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_t.jpg",
 "overlays": [
  "this.overlay_EBCFE583_F75C_31B5_41D2_FC15981DF128"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": -103.5,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1DBC35E9_0D84_B69E_418B_AABBDB478178",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "gd2-tang3-giua",
 "id": "panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_D568A391_F74C_51D4_41EB_EA36557FA15B",
   "yaw": -113.93,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 72.89
  },
  {
   "panorama": "this.panorama_D2503D71_F73C_7155_41CF_7ED250A076A7",
   "yaw": -119.57,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 0.65
  },
  {
   "panorama": "this.panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874",
   "yaw": 66.01,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -109.62
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_t.jpg",
 "overlays": [
  "this.overlay_E8A11030_F74C_4ED3_41E6_ED7A1199BEE8",
  "this.overlay_D7802BC8_F74C_31B3_41BC_DCA06B29E623",
  "this.overlay_D3E8C2F0_F73C_D354_41ED_D560529CC180"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": -83.6,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1DAAA61E_0D84_B5B3_41A3_227DFD54ACAF",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "hanh-lang-gd3(t2)",
 "id": "panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95",
   "yaw": 113.42,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -155.18
  },
  {
   "panorama": "this.panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D",
   "yaw": -138.8,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 9.44
  },
  {
   "panorama": "this.panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14",
   "yaw": 88.16,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -117.45
  },
  {
   "panorama": "this.panorama_93F12805_8A6E_8C7C_41D9_78F983707124",
   "yaw": -46.96,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 60.53
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_t.jpg",
 "overlays": [
  "this.overlay_9C8882CF_8A5A_9D8C_41C8_C30CA2A0F909",
  "this.overlay_93CC75D5_8A6A_879C_41CA_194F9C585764",
  "this.overlay_932122C3_8A6E_9DF4_4199_47069396E3D6",
  "this.overlay_96FECD3A_8A5D_8495_41BE_CF36D02B261C"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 153.08,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1DEAF68E_0D84_B292_41A1_B2D514BFE491",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -20.46,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1EE59462_0D84_B593_417F_A5C909030BC4",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "loi-vao-phong-y-te",
 "id": "panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D",
   "yaw": 169.08,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -10.78
  },
  {
   "panorama": "this.panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D",
   "yaw": -121.57,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 78.47
  },
  {
   "panorama": "this.panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21",
   "yaw": 55.93,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -143.07
  },
  {
   "panorama": "this.panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3",
   "yaw": 73.45,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -58.51
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_t.jpg",
 "overlays": [
  "this.overlay_AF3591F7_8BDE_BF9C_4162_FE183C34C520",
  "this.overlay_AFA1BFAE_8BDB_838C_41C2_43EC2A22C3F0",
  "this.overlay_AEA8A5CA_8BD6_87F4_41D6_256A6AB62849",
  "this.overlay_E40F125B_F66F_CC81_41E0_CF08C1003C27"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 78.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1DD1662C_0D84_B597_419C_3022EA941735",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "ATM",
 "id": "panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B",
   "yaw": 154.15,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -33.85
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_t.jpg",
 "overlays": [
  "this.overlay_9CA7EA66_8A5A_8CBD_41DA_55419E68C239"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 151.16,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1D83E5C1_0D84_B691_41A0_2C7EC66FF4DA",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -168.57,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1DDF0639_0D84_B5F1_4184_B91BE73AA779",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -13.85,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1E38849C_0D84_B6B7_41A3_84658FAEF222",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "label": "phong-thi-nghiem",
 "id": "panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21",
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0",
   "yaw": -143.07,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 55.93
  }
 ],
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMin": "135%",
 "hfov": 360,
 "thumbnailUrl": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_t.jpg",
 "overlays": [
  "this.overlay_AD14AE1B_8BD5_848B_41C2_AA339EA90EA3"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "rowCount": 5,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "yaw": 58.43,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_1DC41647_0D84_B591_4190_D763E2FE3EB7",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipOpacity": 1,
 "toolTipFontSize": "1.11vmin",
 "id": "MainViewer",
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarRight": 0,
 "width": "100%",
 "paddingLeft": 0,
 "minHeight": 50,
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "paddingBottom": 0,
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "minWidth": 100,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowVerticalLength": 0,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "class": "ViewerArea",
 "playbackBarBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "transitionMode": "blending",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "shadow": false,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "paddingRight": 0,
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "borderSize": 0,
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "progressBorderColor": "#000000",
 "data": {
  "name": "Main Viewer"
 },
 "paddingTop": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "transitionDuration": 500
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA, this.camera_1D4B9721_0D84_B391_414D_EC1FB5B22141); this.mainPlayList.set('selectedIndex', 44)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_E3399BFA_F73C_6A09_41E2_A984E1935BE3",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -25.32,
   "yaw": -137.06,
   "hfov": 16.54,
   "distance": 50
  }
 ],
 "id": "overlay_F84A4B05_F73C_6BFB_41DC_34507F8D7A18",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02c Left-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -137.06,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 16.54,
   "pitch": -25.32
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9A53D395_8A77_839C_41C8_70478C88A4B1, this.camera_1EF68454_0D84_B5B7_4182_185E6170F0CE); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_99126E55_8A7E_849C_41DD_12E624998647",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -17.07,
   "yaw": 160.74,
   "hfov": 10.94,
   "distance": 100
  }
 ],
 "id": "overlay_9A46FBB9_8A77_8394_41B5_F012A2BF94B0",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 160.74,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.94,
   "pitch": -17.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE, this.camera_1EE59462_0D84_B593_417F_A5C909030BC4); this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_99123E55_8A7E_849C_41B7_80CF2C076BC3",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -13.09,
   "yaw": -18.96,
   "hfov": 11.14,
   "distance": 100
  }
 ],
 "id": "overlay_9AB240EE_8A7E_9D8C_419E_87B4B1B4BE45",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0_HS_2_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -18.96,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.14,
   "pitch": -13.09
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011, this.camera_1DB7E5DB_0D84_B6B1_41A8_3B55B3D7FD36); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_8451F0C5_8A5B_9DFC_41D1_E40F39B7ECD1",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -18.38,
   "yaw": 28.45,
   "hfov": 10.03,
   "distance": 50
  }
 ],
 "id": "overlay_9A591837_8A5E_8C9C_41E0_2DB4B0A05BA3",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 28.45,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.03,
   "pitch": -18.38
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE, this.camera_1DBC35E9_0D84_B69E_418B_AABBDB478178); this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_845130C5_8A5B_9DFC_41D2_FA8D91EE70DA",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -12.82,
   "yaw": -87.48,
   "hfov": 10.04,
   "distance": 50
  }
 ],
 "id": "overlay_847B3C85_8A5E_847F_41A0_619E529D0775",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -87.48,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.04,
   "pitch": -12.82
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21, this.camera_1DA71604_0D84_B596_4192_636883167B1A); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_980BB0B4_8ADE_BD9C_41D2_6067A997AD7E",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -14.4,
   "yaw": 164.51,
   "hfov": 11.08,
   "distance": 100
  }
 ],
 "id": "overlay_985C2AD5_8ADD_8D9C_41E0_9973DE59674D",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0_HS_2_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 164.51,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.08,
   "pitch": -14.4
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A, this.camera_1DBAF5F7_0D84_B672_41A2_AD03F08DCC7F); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_93A38A9F_8A5A_8D8C_41D6_C514AA7FA387",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -8.15,
   "yaw": -33.85,
   "hfov": 9.97,
   "distance": 100
  }
 ],
 "id": "overlay_9C141389_8A5A_9C74_41E0_DEE041939AF8",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0_HS_3_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -33.85,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.97,
   "pitch": -8.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32, this.camera_1E2CAABE_0D84_B2F2_418F_F27C7DCE2A58); this.mainPlayList.set('selectedIndex', 55)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_1_HS_0_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 129
     }
    ]
   },
   "pitch": -4.61,
   "yaw": 0.65,
   "hfov": 6.83
  }
 ],
 "id": "overlay_D37510B0_F73C_4FD3_41E2_6CB48AD4AEE1",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow Transparent Right"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 0.65,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 6.83,
   "pitch": -4.61
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF, this.camera_1DEAF68E_0D84_B292_41A1_B2D514BFE491); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_B3507E35_AB59_A239_41C6_3CE7CF61CD60",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -30.41,
   "yaw": 87.97,
   "hfov": 7.78,
   "distance": 50
  }
 ],
 "id": "overlay_BA16E433_AB5A_A63A_41E2_A8331651CF81",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 87.97,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.78,
   "pitch": -30.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "rollOver": "this.startPanoramaWithCamera(this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B, this.camera_1F4059A3_0D84_BE91_41A6_306B4CCC4B83); this.mainPlayList.set('selectedIndex', 1); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_03E41E1A_0D83_B5B2_41A9_EAD3109E8ADE",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -9.33,
   "yaw": -70.08,
   "hfov": 16.93,
   "distance": 50
  }
 ],
 "id": "overlay_003ADEF7_0D84_9271_4166_F346A4B07D23",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02c Left-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -70.08,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 16.93,
   "pitch": -9.33
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5, this.camera_1FFE08FC_0D84_BE76_416D_63BD9299A862); this.mainPlayList.set('selectedIndex', 17); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_921F20EE_8A6D_9D8C_41AC_189112708CCA",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -12.78,
   "yaw": 174.29,
   "hfov": 5.22,
   "distance": 50
  }
 ],
 "id": "overlay_9C02CD5B_8A6E_8494_4194_A73D90358E30",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 174.29,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 5.22,
   "pitch": -12.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52, this.camera_1F1DB92C_0D84_BF96_4164_5981FE21A92E); this.mainPlayList.set('selectedIndex', 14); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_921EB0EE_8A6D_9D8C_41DF_D46CF2AD2D24",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -14.53,
   "yaw": 9.44,
   "hfov": 5.19,
   "distance": 100
  }
 ],
 "id": "overlay_9D9D5651_8A6E_8497_41E1_2CF958B9144C",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_1_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 9.44,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 5.19,
   "pitch": -14.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24, this.camera_1EBBFA23_0D84_BD91_41A3_185BE4046C1D); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9F05ACEC_8AD7_858C_41DE_23B46E5C1912",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -15.36,
   "yaw": 35.75,
   "hfov": 11.03,
   "distance": 100
  }
 ],
 "id": "overlay_9849939E_8AD5_838C_41D5_9634A799D874",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 35.75,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.03,
   "pitch": -15.36
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE, this.camera_1EABFA3B_0D84_BDF2_4193_C18AC106E55F); this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9F056CEC_8AD7_858C_41CD_F2F064B6195C",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -17,
   "yaw": -147.1,
   "hfov": 10.94,
   "distance": 100
  }
 ],
 "id": "overlay_98C54FFB_8AD6_8394_41CB_74D38D036313",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_1_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -147.1,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.94,
   "pitch": -17
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D, this.camera_1EC9CA5C_0D84_BDB7_419A_2E44B8448658); this.mainPlayList.set('selectedIndex', 30)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9E277991_8ED5_0EFB_41DC_AAC886AE2ABF",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -15.15,
   "yaw": 96.4,
   "hfov": 9.94,
   "distance": 50
  }
 ],
 "id": "overlay_A3835255_8BF6_FC9C_41C7_83A288C30B73",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 96.4,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.94,
   "pitch": -15.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE, this.camera_1ED9BA4E_0D84_BD93_41A1_706E10F7DA71); this.mainPlayList.set('selectedIndex', 38)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_C7C98613_D4ED_9F74_41E9_52DCD51C32FE",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -6.11,
   "yaw": 15.72,
   "hfov": 4.72,
   "distance": 50
  }
 ],
 "id": "overlay_DBD298B8_D4EE_94B4_41E8_68D808BE8B0D",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02a Left"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0_HS_3_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 15.72,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 4.72,
   "pitch": -6.11
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7, this.camera_1915ABA0_0D84_B28E_41A4_FE3823CD4882); this.mainPlayList.set('selectedIndex', 40)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_F87E7FCC_EE5A_5548_41C1_9DDCB598C27A",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -6.66,
   "yaw": -103.8,
   "hfov": 8.05,
   "distance": 50
  }
 ],
 "id": "overlay_FDA62D05_EE5A_7AB8_41D0_01821B1EA0DA",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -103.8,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 8.05,
   "pitch": -6.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6, this.camera_1E8BCA11_0D84_BD8E_41A3_BDC92188E31C); this.mainPlayList.set('selectedIndex', 60)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_C4EB3CFC_F7D4_3753_41E8_C0C274BC9968",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -34.22,
   "yaw": -133.55,
   "hfov": 19.16,
   "distance": 50
  }
 ],
 "id": "overlay_DE5FF7C7_F7D4_D1BC_41E6_7F9B947C4895",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02c Left-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -133.55,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 19.16,
   "pitch": -34.22
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7, this.camera_1DE1F67D_0D84_B271_4197_B90A7D7B08E3); this.mainPlayList.set('selectedIndex', 40)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_F76F6447_EE2B_CAB8_41E9_70CE3D33D33E",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -10.97,
   "yaw": 37.12,
   "hfov": 6.26,
   "distance": 100
  }
 ],
 "id": "overlay_FB25380F_EE2A_DAC8_41E7_3C219B78ADDF",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 37.12,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 6.26,
   "pitch": -10.97
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3, this.camera_1DFE8670_0D84_B58E_41A0_7019F6A9E2E6); this.mainPlayList.set('selectedIndex', 43)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_F4BD75C5_EE3B_D5B8_41D9_F4234C1AB51D",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -9.87,
   "yaw": 129.99,
   "hfov": 5.17,
   "distance": 100
  }
 ],
 "id": "overlay_F60D5E1F_EE3A_76C8_41E8_1C7212E851F0",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 129.99,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 5.17,
   "pitch": -9.87
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_93F12805_8A6E_8C7C_41D9_78F983707124, this.camera_1D27E6E0_0D84_B28E_4196_40C5A4AEFB56); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_AAD0B620_8A56_84B4_41D0_E4F2A2B5010B",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -31.62,
   "yaw": 29.9,
   "hfov": 5.88,
   "distance": 100
  }
 ],
 "id": "overlay_902DCA8F_8A6B_8D8C_41D4_2E56962AF3C4",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 29.9,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 5.88,
   "pitch": -31.62
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_82BAF319_901A_2F0D_41C4_309B78B0C979, this.camera_1D09D6BF_0D84_B2F2_4180_D739BF12179E); this.mainPlayList.set('selectedIndex', 34)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_87987D71_9016_5B1C_41DA_590CF9B5E49A",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -28.8,
   "yaw": 100.6,
   "hfov": 4.33,
   "distance": 50
  }
 ],
 "id": "overlay_83BC2280_9016_29FC_41DB_826793121830",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 100.6,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 4.33,
   "pitch": -28.8
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197, this.camera_1D3316CF_0D84_B291_4177_A9D29BF6E768); this.mainPlayList.set('selectedIndex', 37)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_B34CAE30_AB59_A237_41CE_71DF380AA36A",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -17.19,
   "yaw": -26.92,
   "hfov": 4.19,
   "distance": 50
  }
 ],
 "id": "overlay_BA3BD77E_AB5A_622B_41D8_B54E351F8354",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -26.92,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 4.19,
   "pitch": -17.19
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE, this.camera_1D412711_0D84_B38E_4198_5F2337BB8F5D); this.mainPlayList.set('selectedIndex', 38)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_C2F447E7_D4F5_FCDC_4178_73DB747B1D60",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -39.38,
   "yaw": -23.03,
   "hfov": 7.96,
   "distance": 50
  }
 ],
 "id": "overlay_C6D274E8_D4F6_BCD4_41D5_132B824F8903",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -23.03,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.96,
   "pitch": -39.38
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA, this.camera_1D2B06EF_0D84_B291_4171_D35C65BDAA9A); this.mainPlayList.set('selectedIndex', 44)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_E0325AE2_F26B_0956_41D9_A1B84A853CEA",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -33.63,
   "yaw": 153.42,
   "hfov": 8.57,
   "distance": 50
  }
 ],
 "id": "overlay_FC2BA2D5_F26D_1972_41BD_B50311D3B4E7",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 153.42,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 8.57,
   "pitch": -33.63
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6, this.camera_1D5DE700_0D84_B38F_41A2_B68B959B2B4C); this.mainPlayList.set('selectedIndex', 48)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_E0FDB986_F754_F6F9_41E0_2FB327B3CE54",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -42.67,
   "yaw": 11.43,
   "hfov": 15.85,
   "distance": 50
  }
 ],
 "id": "overlay_E3502D29_F754_2E0B_41E4_E74DC402E0EB",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02c Right-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 11.43,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.85,
   "pitch": -42.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36, this.camera_1E1E2A89_0D84_B291_4196_A7555A9235AF); this.mainPlayList.set('selectedIndex', 33)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_AB28C99E_8BBD_8F8D_41C1_9111F9EE43FC",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -23.46,
   "yaw": -98.04,
   "hfov": 6.66,
   "distance": 50
  }
 ],
 "id": "overlay_94A79AA9_8BBA_8DB4_41D6_EAE9397D24B5",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -98.04,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 6.66,
   "pitch": -23.46
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007, this.camera_1E0E2A9A_0D84_B2B3_419C_F5A6EDCC8C5C); this.mainPlayList.set('selectedIndex', 35)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_85A95DEA_91C2_F7BD_41E0_811163682743",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -26.19,
   "yaw": -159.4,
   "hfov": 4.34,
   "distance": 100
  }
 ],
 "id": "overlay_81866D9B_91C3_9793_4189_808E9F82BEA7",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -159.4,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 4.34,
   "pitch": -26.19
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E, this.camera_1E3E4AAC_0D84_B297_41A4_A43A98CF6886); this.mainPlayList.set('selectedIndex', 52)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EA3CFC75_F74C_6E1B_41E8_92CE0AC0CCD9",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -33.2,
   "yaw": -18.5,
   "hfov": 14.36,
   "distance": 50
  }
 ],
 "id": "overlay_EDE6F085_F74C_56FB_419E_FE88E4D5F8F2",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02b Left-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -18.5,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.36,
   "pitch": -33.2
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258, this.camera_1D1D569D_0D84_B2B1_4192_90E0AAFC5E3B); this.mainPlayList.set('selectedIndex', 61)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_1_HS_0_0.png",
      "width": 72,
      "class": "ImageResourceLevel",
      "height": 95
     }
    ]
   },
   "pitch": 1.71,
   "yaw": -37.86,
   "hfov": 3.87
  }
 ],
 "id": "overlay_DEB60503_F7D4_56B5_41E2_F7383446515F",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow Transparent Left"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 21
     }
    ]
   },
   "yaw": -37.86,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 3.87,
   "pitch": 1.71
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3, this.camera_1D06A6AE_0D84_B292_418E_74589C93C6FC); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_C4EABCFC_F7D4_3753_419F_3C7C1E0A619E",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -4.89,
   "yaw": 71.45,
   "hfov": 6.17,
   "distance": 100
  }
 ],
 "id": "overlay_DE233E50_F7D4_F353_41E8_8D6616EF9234",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 71.45,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 6.17,
   "pitch": -4.89
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52, this.camera_1DADB611_0D84_B58E_419B_FDA50AF4782B); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_91E96E22_8A57_84B4_41DF_01428A258E4C",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -16.12,
   "yaw": -155.18,
   "hfov": 3.89,
   "distance": 50
  }
 ],
 "id": "overlay_92B042AA_8A55_BDB4_41BC_2684FB452D8D",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -155.18,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 3.89,
   "pitch": -16.12
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2, this.camera_1EF85A69_0D84_BD9E_4184_8D2AAF3051C7); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D773FF3A_F75C_52D4_41E5_D328F604ED4C",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -13.97,
   "yaw": 63.85,
   "hfov": 7.88,
   "distance": 100
  }
 ],
 "id": "overlay_EC119B1F_F74C_2A07_4176_B8500BFA043F",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 63.85,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.88,
   "pitch": -13.97
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8, this.camera_1EE84A78_0D84_B27F_4188_A1AF64E66B4F); this.mainPlayList.set('selectedIndex', 53)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0_HS_1_0.png",
      "width": 57,
      "class": "ImageResourceLevel",
      "height": 75
     }
    ]
   },
   "pitch": -2.43,
   "yaw": 72.56,
   "hfov": 3.05
  }
 ],
 "id": "overlay_EB09CA86_F75B_D3BC_41B1_16CDE58C480F",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow Transparent Right"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 21
     }
    ]
   },
   "yaw": 72.56,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 3.05,
   "pitch": -2.43
  }
 ]
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9A8FB739_8A6A_8497_41AB_D0C15E31E1E9, this.camera_81E543EC_903E_6F0B_41DE_094D48B9170A)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_AB293999_8BBD_8F94_41BE_DEC0ED489E28",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -5.99,
   "yaw": 60.6,
   "hfov": 4.11,
   "distance": 100
  }
 ],
 "id": "overlay_957760EE_8BBB_FD8C_41D7_2981D49F5313",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 60.6,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 4.11,
   "pitch": -5.99
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49, this.camera_1CE9F7E7_0D84_B291_4178_971E38547858); this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_AA266A4A_8BB6_8CF4_41DC_AEC41F186E44",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -15.6,
   "yaw": -127.02,
   "hfov": 4.21,
   "distance": 100
  }
 ],
 "id": "overlay_94C04A93_8BBA_8D94_41E0_864608603980",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -127.02,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 4.21,
   "pitch": -15.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC, this.camera_1CFBA7D6_0D84_B2B2_41A9_83A49269A845); this.mainPlayList.set('selectedIndex', 51)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EF7B2BFF_F774_2A07_41DA_8C9D454F87F5",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -49.59,
   "yaw": 164.87,
   "hfov": 11.26,
   "distance": 100
  }
 ],
 "id": "overlay_E097B2DB_F74C_DA0F_41CF_72296D0FD4DF",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01c"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0_HS_2_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 164.87,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.26,
   "pitch": -49.59
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3, this.camera_1E93E3D6_0D84_B2B2_419E_E70E1C9C5748); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9F7EF540_8AFD_84F4_41DB_E5BBEFF93254",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -17.28,
   "yaw": 70.62,
   "hfov": 10.92,
   "distance": 100
  }
 ],
 "id": "overlay_9FD72DA2_8AFD_87B4_41C1_4D812AA89815",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 70.62,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.92,
   "pitch": -17.28
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52, this.camera_1E8523EF_0D84_B292_41A1_4FBFBB23694E); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_932B2554_8A5D_849C_41DE_3FBD649B3CC4",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -11.31,
   "yaw": -117.45,
   "hfov": 11.22,
   "distance": 100
  }
 ],
 "id": "overlay_9CB8EB1E_8A5E_8C8C_41D8_C73EEC332F7A",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -117.45,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.22,
   "pitch": -11.31
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 44)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_1_HS_0_0.png",
      "width": 76,
      "class": "ImageResourceLevel",
      "height": 91
     }
    ]
   },
   "pitch": -4.38,
   "yaw": 25.99,
   "hfov": 4.1
  }
 ],
 "id": "overlay_E23B08CF_F75C_5607_41C6_7922C7579C77",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow Transparent Right"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 19
     }
    ]
   },
   "yaw": 25.99,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 4.1,
   "pitch": -4.38
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2, this.camera_19A2E52F_0D84_B792_419B_9CAB984D1897); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_85BBCCB9_900A_590C_41DE_E43A33CBD14F",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -41.16,
   "yaw": 129.9,
   "hfov": 7.75,
   "distance": 50
  }
 ],
 "id": "overlay_823FAB5C_900A_FF04_41DD_2393E5CA09F0",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 129.9,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.75,
   "pitch": -41.16
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_98AA559B_8A76_8794_41CA_9930712915C9, this.camera_1D8715B3_0D84_B6F2_41A2_B544C549B6B1); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_85BB5CB9_900A_590C_41D8_2E3084509082",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -47.48,
   "yaw": 58.26,
   "hfov": 7.73,
   "distance": 100
  }
 ],
 "id": "overlay_826DFCB6_900B_F904_41A1_1CAA12B5FD4E",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_1_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 58.26,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.73,
   "pitch": -47.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_85BB6CB9_900A_590C_41D1_82AE9A539C7B",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -28.4,
   "yaw": -112.44,
   "hfov": 10.06,
   "distance": 100
  }
 ],
 "id": "overlay_823C3D2F_900A_3B05_41DF_C3A3475B6D00",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_1_HS_2_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -112.44,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.06,
   "pitch": -28.4
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162, this.camera_1D8925CE_0D84_B693_4180_37BBE145E302); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9912CE55_8A7E_849C_41E0_0BA495F5E4FE",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -5.89,
   "yaw": -21.36,
   "hfov": 11.38,
   "distance": 100
  }
 ],
 "id": "overlay_9A773555_8A7E_849C_41D0_CAEC999E252E",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -21.36,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.38,
   "pitch": -5.89
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_98AA559B_8A76_8794_41CA_9930712915C9, this.camera_1D83E5C1_0D84_B691_41A0_2C7EC66FF4DA); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_992C825A_8A76_BC94_419B_437C349D2AE0",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -21.12,
   "yaw": 170.28,
   "hfov": 10.67,
   "distance": 100
  }
 ],
 "id": "overlay_9A030052_8A76_BC94_41B2_1C27958BDB43",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 170.28,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.67,
   "pitch": -21.12
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9850958A_8AB5_8474_41DE_E7401C1B01EE",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -33.13,
   "yaw": 75.83,
   "hfov": 9.58,
   "distance": 100
  }
 ],
 "id": "overlay_98B10DCE_8ABB_878C_41B9_B0DC6841817A",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0_HS_2_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 75.83,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.58,
   "pitch": -33.13
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007, this.camera_1CF4A7C6_0D84_B292_4198_3612BFAFE284); this.mainPlayList.set('selectedIndex', 35)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D27CDC16_F754_D6DC_41DC_09FF65CDB8F6",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -19.23,
   "yaw": 70.5,
   "hfov": 7.35,
   "distance": 100
  }
 ],
 "id": "overlay_E9DF26FB_F754_5355_41E9_0F13ABAAFE39",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 70.5,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.35,
   "pitch": -19.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32, this.camera_1CD787A4_0D84_B296_419F_006BCC291BB7); this.mainPlayList.set('selectedIndex', 55)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_DB810FBC_F734_31CC_41C8_7A4EA548AEF9",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -9.57,
   "yaw": -109.62,
   "hfov": 11.25,
   "distance": 100
  }
 ],
 "id": "overlay_E83B24B1_F74D_D7D5_41EB_EAA8762DAC28",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -109.62,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.25,
   "pitch": -9.57
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B, this.camera_1CC517B6_0D84_B2F2_41A7_37BFF8A8A7D5); this.mainPlayList.set('selectedIndex', 57)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_DB818FBC_F734_31CC_41E8_F7D109FFB6C5",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -22.62,
   "yaw": -117.61,
   "hfov": 8.96,
   "distance": 50
  }
 ],
 "id": "overlay_D3F7AD13_F734_56D5_41E6_45E99A7165E2",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02c Left"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -117.61,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 8.96,
   "pitch": -22.62
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8, this.camera_1DDF0639_0D84_B5F1_4184_B91BE73AA779); this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_1_HS_0_0.png",
      "width": 115,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -5.18,
   "yaw": 156.5,
   "hfov": 6.19
  }
 ],
 "id": "overlay_E4C547F2_F755_DA19_41ED_4DD67C07BF49",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow Transparent Left"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 156.5,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 6.19,
   "pitch": -5.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE, this.camera_1E28A4AB_0D84_B692_417F_A8EC1EAC2C00); this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_A92EB4C5_8BAA_85FC_41C6_644C3BC9478D",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -18.17,
   "yaw": 75.76,
   "hfov": 10.87,
   "distance": 100
  }
 ],
 "id": "overlay_965EC472_8BAA_8495_41DB_0E56FFA763DA",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 75.76,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.87,
   "pitch": -18.17
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498, this.camera_1E38849C_0D84_B6B7_41A3_84658FAEF222); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9AF2187D_8EFD_0E2B_41E1_4B76B0C06B4E",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -7.84,
   "yaw": -22.12,
   "hfov": 5.24,
   "distance": 100
  }
 ],
 "id": "overlay_9F18DD27_8EFB_0627_41D8_353810C63A0C",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -22.12,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 5.24,
   "pitch": -7.84
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7, this.camera_1E5F64B9_0D84_B6FE_419D_27F214C21E4E); this.mainPlayList.set('selectedIndex', 40)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_F803EFC3_EE5A_55B8_41D4_6E710FA149C3",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -8.46,
   "yaw": 155.43,
   "hfov": 5.23,
   "distance": 100
  }
 ],
 "id": "overlay_FF1277AA_EE6A_75C8_41BF_A2C9CDBE8A9E",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0_HS_2_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 155.43,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 5.23,
   "pitch": -8.46
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52, this.camera_1983850B_0D84_B792_4160_1D4C60A235A9); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_AAD36620_8A56_84B4_41CA_F5FDD7DA9EFE",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -23.59,
   "yaw": 60.53,
   "hfov": 10.48,
   "distance": 100
  }
 ],
 "id": "overlay_90C4B3BC_8A6F_838D_41D4_35D87BEAF76C",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 60.53,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.48,
   "pitch": -23.59
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF, this.camera_1E6E74E8_0D84_B69E_4192_A35DB8BDC2B3); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_AAD38620_8A56_84B4_41DA_7933CB071328",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -18.79,
   "yaw": -117.42,
   "hfov": 5.13,
   "distance": 100
  }
 ],
 "id": "overlay_90497676_8A6A_849C_41C9_773C5422DBE9",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_1_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -117.42,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 5.13,
   "pitch": -18.79
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26, this.camera_199DB4F9_0D84_B67E_4190_2E37EF7FD624); this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_AAD01620_8A56_84B4_41D0_14F5FD121C53",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -56.57,
   "yaw": 29.58,
   "hfov": 5.76,
   "distance": 50
  }
 ],
 "id": "overlay_9064CA68_8A55_8CB4_41D4_0075298C0116",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 29.58,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 5.76,
   "pitch": -56.57
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF, this.camera_1DF43662_0D84_B592_41A6_AF065BF6A57B); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_87935D76_9016_5B04_41DA_4BB6A4937024",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -52.15,
   "yaw": 7.17,
   "hfov": 6.32,
   "distance": 50
  }
 ],
 "id": "overlay_83EE6C1C_9016_7904_41BB_C3CF35196CB6",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 7.17,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 6.32,
   "pitch": -52.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B, this.camera_1C8F0774_0D84_B276_4197_38057E2BFF34); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_984E1BE3_8AEE_83B4_41B4_54B037B2C132",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -19.48,
   "yaw": 132.37,
   "hfov": 9.71,
   "distance": 50
  }
 ],
 "id": "overlay_989BDC54_8AED_849C_41D1_7E0A1E9C1954",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 132.37,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.71,
   "pitch": -19.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8, this.camera_1CBD3783_0D84_B291_41A9_D7AF3C9024BD); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_984EBBE3_8AEE_83B4_41D1_17554C282868",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -12.41,
   "yaw": -82.47,
   "hfov": 10.06,
   "distance": 50
  }
 ],
 "id": "overlay_99D7041B_8AED_8494_41D4_DAE3B054A46A",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -82.47,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.06,
   "pitch": -12.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3, this.camera_1CA1F794_0D84_B2B6_41A9_5DB915746771); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_A4AE953A_8BEA_8494_4197_F6FA4DC345AE",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -8.52,
   "yaw": -2.93,
   "hfov": 4.79,
   "distance": 50
  }
 ],
 "id": "overlay_A80968E8_8BAB_8DB4_41DC_8334EBC6B1B9",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -2.93,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 4.79,
   "pitch": -8.52
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9, this.camera_1DD1662C_0D84_B597_419C_3022EA941735); this.mainPlayList.set('selectedIndex', 29)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9FD59991_8ED5_0EFB_41C8_A70BC03D72CF",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -8.39,
   "yaw": 78.7,
   "hfov": 6.54,
   "distance": 100
  }
 ],
 "id": "overlay_A1764E40_8BEB_84F5_41B3_6B2572A0655A",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 78.7,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 6.54,
   "pitch": -8.39
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B, this.camera_1DAAA61E_0D84_B5B3_41A3_227DFD54ACAF); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9FD5F991_8ED5_0EFB_41B4_47DA93F47DA7",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -15.06,
   "yaw": -149.89,
   "hfov": 7.79,
   "distance": 50
  }
 ],
 "id": "overlay_A28EDA27_8BF7_8CBC_41DC_89389C917486",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -149.89,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.79,
   "pitch": -15.06
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C, this.camera_1E4FC4C7_0D84_B692_41AA_3D9B8581949B); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_1_HS_0_0.png",
      "width": 115,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -3.07,
   "yaw": -84.11,
   "hfov": 6.15
  }
 ],
 "id": "overlay_E09C8918_F774_7609_41E0_8341C81AD393",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow Transparent Right"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -84.11,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 6.15,
   "pitch": -3.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F, this.camera_1C0E6808_0D84_BD9E_418E_613CA831F10F); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9AF8487D_8EFD_0E2B_41E1_7C72B547B22C",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -12.97,
   "yaw": 166.15,
   "hfov": 5.22,
   "distance": 100
  }
 ],
 "id": "overlay_9DFE9795_8EFD_02FB_41B0_C13762D26A96",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 166.15,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 5.22,
   "pitch": -12.97
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9607D4FC_9906_6A31_41DB_47B84633749D, this.camera_1C3D6819_0D84_BDBE_419C_0214F0761E02); this.mainPlayList.set('selectedIndex', 36)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_8A283BA7_9902_FEDF_41AA_D572B44C74D4",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -8.34,
   "yaw": -28.69,
   "hfov": 6.5,
   "distance": 50
  }
 ],
 "id": "overlay_96E6407B_9902_6A37_4197_4BF3FFE74B17",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -28.69,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 6.5,
   "pitch": -8.34
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE, this.camera_1C2C182A_0D84_BD92_4192_C2AD5E80AA0A); this.mainPlayList.set('selectedIndex', 38)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_E3BCA2A2_F65A_4D83_41E9_025C081F0E8F",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -3.9,
   "yaw": 0.15,
   "hfov": 3.12,
   "distance": 50
  }
 ],
 "id": "overlay_F9B04FA7_F65A_D381_41B3_D2CCE64F27FC",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Right"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 0.15,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 3.12,
   "pitch": -3.9
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32, this.camera_1E88E3FF_0D84_B272_4181_6869254AEFEB); this.mainPlayList.set('selectedIndex', 55)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_DEAE8504_F734_F6B3_41D7_BC18FC975411",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -17.49,
   "yaw": 72.89,
   "hfov": 11.72,
   "distance": 100
  }
 ],
 "id": "overlay_D6907DD0_F74C_D153_41C5_713CB9725137",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01c"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 72.89,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.72,
   "pitch": -17.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271, this.camera_1EB3B40D_0D84_B591_4184_1B364A6DC3B1); this.mainPlayList.set('selectedIndex', 59)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D9C41685_F7CD_D3BC_41A7_24C12A4438F2",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -22.6,
   "yaw": -112.99,
   "hfov": 7.9,
   "distance": 50
  }
 ],
 "id": "overlay_D226D140_F73C_4EB4_41EB_5CDD1B44B0BF",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02c Left"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -112.99,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.9,
   "pitch": -22.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D, this.camera_1E5CBACE_0D84_B293_418A_14C0FAF4BEEE); this.mainPlayList.set('selectedIndex', 30)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9FD4E991_8ED5_0EFB_41AF_D4203E464BEC",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -12.63,
   "yaw": -101.04,
   "hfov": 5.62,
   "distance": 100
  }
 ],
 "id": "overlay_A3B10469_8BEB_84B4_41D4_4334453C455A",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -101.04,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 5.62,
   "pitch": -12.63
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9850658A_8AB5_8474_4184_1E35EEAC68D3",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -6.3,
   "yaw": -136.32,
   "hfov": 11.37,
   "distance": 100
  }
 ],
 "id": "overlay_9884097B_8AB6_8C8B_41D4_DC45800586ED",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -136.32,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.37,
   "pitch": -6.3
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0, this.camera_1DC41647_0D84_B591_4190_D763E2FE3EB7); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_A4BAB53A_8BEA_8494_41C6_F5C6D227E689",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -13.65,
   "yaw": 78.47,
   "hfov": 6.32,
   "distance": 50
  }
 ],
 "id": "overlay_AEE8D29D_8BDA_9D8C_41BD_12D9A9D26C17",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 78.47,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 6.32,
   "pitch": -13.65
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8, this.camera_1F0C7949_0D84_BF9E_418C_768DFAAB25D6); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_920075A2_8AFB_87B4_41DF_73F24B1E3859",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -15.56,
   "yaw": 70.41,
   "hfov": 8.64,
   "distance": 100
  }
 ],
 "id": "overlay_9FC74F80_8AFA_8475_41D3_C846F7AB24EC",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 70.41,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 8.64,
   "pitch": -15.56
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C, this.camera_1E155470_0D84_B58E_418E_C0A5FD0F32BE); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_AA265A4A_8BB6_8CF4_41D9_5D0BF88EB7FF",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -12.27,
   "yaw": 65.69,
   "hfov": 6.84,
   "distance": 100
  }
 ],
 "id": "overlay_A9AE2D43_8BB7_84F4_41DF_81F8D65C7E95",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 65.69,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 6.84,
   "pitch": -12.27
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D568A391_F74C_51D4_41EB_EA36557FA15B, this.camera_1E1B747F_0D84_B672_4192_4678463053F9); this.mainPlayList.set('selectedIndex', 56)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_1_HS_0_0.png",
      "width": 115,
      "class": "ImageResourceLevel",
      "height": 116
     }
    ]
   },
   "pitch": -5.82,
   "yaw": 3.53,
   "hfov": 6.13
  }
 ],
 "id": "overlay_D273FA0C_F73C_F2CC_41ED_9D8D4B1E8D65",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow Transparent Right"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 3.53,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 6.13,
   "pitch": -5.82
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8, this.camera_1DD7CC6B_0D84_B591_418F_070D13FD4231); this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_E00EDAE4_F26B_0952_41E1_91A95C80CF69",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -18.44,
   "yaw": -66.39,
   "hfov": 8.65,
   "distance": 100
  }
 ],
 "id": "overlay_FDF2FB87_F26B_0FDE_41E9_31B49E166047",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -66.39,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 8.65,
   "pitch": -18.44
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_F954B244_F73C_7A79_41E5_028FB682D8D8, this.camera_1DA90C5E_0D84_B5B3_41A5_F598E5322D4E); this.mainPlayList.set('selectedIndex', 46)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_E3394BFA_F73C_6A09_41E5_65A8D4626E5D",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -34.42,
   "yaw": 72.76,
   "hfov": 14.16,
   "distance": 50
  }
 ],
 "id": "overlay_F8B11397_F73C_7A07_41E5_577BB1CFD9AF",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02b Left-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 72.76,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.16,
   "pitch": -34.42
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80, this.camera_1DDD9C78_0D84_B67F_417C_45799F1709FA); this.mainPlayList.set('selectedIndex', 47)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_E5C77A1E_F74C_2A09_41E3_B97356AA4154",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -37.09,
   "yaw": 0.67,
   "hfov": 9.32,
   "distance": 50
  }
 ],
 "id": "overlay_E79421D5_F735_F61B_41A9_DF332478B2C3",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02c Right-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 0.67,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.32,
   "pitch": -37.09
  }
 ]
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_E1AD0453_F754_3E1F_41E0_9CD69E0B42FA, this.camera_E198EF4A_F754_2A09_41E6_C6D7C7FF72F1)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EE8D9CC9_F754_2E0B_41BB_7D42B2ED5890",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -21.5,
   "yaw": -41.47,
   "hfov": 12.03,
   "distance": 50
  }
 ],
 "id": "overlay_E11200C8_F755_F609_41C7_A2B714B7246A",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02c Right-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0_HS_3_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -41.47,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 12.03,
   "pitch": -21.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_93F12805_8A6E_8C7C_41D9_78F983707124, this.camera_19824B25_0D84_B396_41AB_236C4AD9C693); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_960813EE_8A56_838C_41DC_7BF066162034",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -17.34,
   "yaw": 100.64,
   "hfov": 5.11,
   "distance": 50
  }
 ],
 "id": "overlay_963AAF11_8A57_8494_41C2_F2C627F303AC",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 100.64,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 5.11,
   "pitch": -17.34
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0, this.camera_1DC35656_0D84_B5B2_419E_21131E985D18); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_E52A97A9_F66A_D381_41DA_5E0C193BAF44",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -48.3,
   "yaw": -10.78,
   "hfov": 12.56,
   "distance": 100
  }
 ],
 "id": "overlay_E5726209_F66A_4C81_41C1_1FD16365470C",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01c"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -10.78,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 12.56,
   "pitch": -48.3
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 49)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_E29F33BA_F75D_DA09_41A5_688298A2DA5F",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -25.18,
   "yaw": -112.07,
   "hfov": 15.64,
   "distance": 50
  }
 ],
 "id": "overlay_E154815B_F75C_760F_41E2_D6D16B9EAC90",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02b Left-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -112.07,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.64,
   "pitch": -25.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973, this.camera_1C65C86B_0D84_BD92_418C_765410CDFEE6); this.mainPlayList.set('selectedIndex', 42)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_F4BDC5C5_EE3B_D5B8_41E4_D6E192075412",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -8.54,
   "yaw": -60.57,
   "hfov": 3.92,
   "distance": 100
  }
 ],
 "id": "overlay_F66BAD34_EE3A_5AD8_41D3_48C11B7BE167",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -60.57,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 3.92,
   "pitch": -8.54
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA, this.camera_1F33895D_0D84_BFB6_41AA_3FCB37B9F95A); this.mainPlayList.set('selectedIndex', 44)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_1_HS_0_0.png",
      "width": 119,
      "class": "ImageResourceLevel",
      "height": 119
     }
    ]
   },
   "pitch": -8.07,
   "yaw": 144.75,
   "hfov": 6.31
  }
 ],
 "id": "overlay_E6CA7F3F_F74C_2A07_41EA_B70C9B9769FF",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow Black Right"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 144.75,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 6.31,
   "pitch": -8.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24, this.camera_1C6BB87B_0D84_BE71_419A_E7032D3921B5); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_A4BB553A_8BEA_8494_41DE_5D4211C9B7A2",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -11.94,
   "yaw": -149.26,
   "hfov": 3.88,
   "distance": 100
  }
 ],
 "id": "overlay_A89372B7_8BAA_BD9C_41CE_8779ED58CBF0",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -149.26,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 3.88,
   "pitch": -11.94
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0, this.camera_1F8B389C_0D84_BEB6_4186_EE81CDC84FE1); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_A4BB153A_8BEA_8494_41CB_B2CA0B34D152",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -3.44,
   "yaw": -58.51,
   "hfov": 1.8,
   "distance": 100
  }
 ],
 "id": "overlay_A8CC0E88_8BDF_8474_41C1_528F2DBF6255",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_1_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -58.51,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 1.8,
   "pitch": -3.44
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6, this.camera_1F9B388B_0D84_BE91_4195_68969CC24410); this.mainPlayList.set('selectedIndex', 60)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_C4C50CDE_F7D4_374F_41E1_181E016511B5",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -13.97,
   "yaw": 31.37,
   "hfov": 5.9,
   "distance": 100
  }
 ],
 "id": "overlay_DF1939DD_F7DC_714D_41E5_5CA6EE340FBA",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01c"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0_HS_2_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 31.37,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 5.9,
   "pitch": -13.97
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B, this.camera_1E0A948E_0D84_B692_417A_AD2725AECCAB); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_980E40B4_8ADE_BD9C_41D6_288FD71EEFB0",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -1.7,
   "yaw": -40.26,
   "hfov": 10.02,
   "distance": 50
  }
 ],
 "id": "overlay_983ED8A9_8ADD_8DB4_41DB_0D3888138C17",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02 Left"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -40.26,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.02,
   "pitch": -1.7
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B, this.camera_1FA958BD_0D84_BEF6_4195_851B8B7C877F); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_C7DEF625_D4ED_9F5C_41D5_A3FB355C927D",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -4.32,
   "yaw": 93.68,
   "hfov": 3.24,
   "distance": 100
  }
 ],
 "id": "overlay_C44A83DA_D4EF_94F4_41E2_CA8F8F6EA37F",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 93.68,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 3.24,
   "pitch": -4.32
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8, this.camera_1FDF08CD_0D84_BE91_4190_AE1B2D16A885); this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_EFCC4465_F754_DE3B_41D4_2D98D4E404C6",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -12.15,
   "yaw": -43.38,
   "hfov": 7.61,
   "distance": 100
  }
 ],
 "id": "overlay_C5D33580_D4F7_7D54_41A0_C8ABCFA5942E",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -43.38,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.61,
   "pitch": -12.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498, this.camera_1FB9D8AD_0D84_BE96_4184_C959D41046C0); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_E3B832A4_F65A_4D87_41DC_9FE28D289D9F",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -8.19,
   "yaw": -82.93,
   "hfov": 6.11,
   "distance": 100
  }
 ],
 "id": "overlay_F89D9039_F65E_4C81_41EB_0D6F3ABA0159",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0_HS_2_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -82.93,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 6.11,
   "pitch": -8.19
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B, this.camera_1DACCC50_0D84_B58F_418C_666AA9BBCE66); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9A160EC9_8EFF_A34E_41C9_E69EA7CDC22C",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -10.76,
   "yaw": 76.5,
   "hfov": 6.44,
   "distance": 100
  }
 ],
 "id": "overlay_9E8F46DC_8EF2_6347_41D8_5B734F8F231E",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 76.5,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 6.44,
   "pitch": -10.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162, this.camera_1DA6EC43_0D84_B591_4193_5D0422738506); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9A17CEC9_8EFF_A34E_41DE_63ACC805833D",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -15.15,
   "yaw": 159.54,
   "hfov": 7.45,
   "distance": 100
  }
 ],
 "id": "overlay_9D8C7789_8EF1_A1CE_41DB_9234ACC09764",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_1_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 159.54,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.45,
   "pitch": -15.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B, this.camera_1904DBB8_0D84_B2FE_419F_E185C9D26C8E); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9A176EC9_8EFF_A34E_41D1_4936F0E62209",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -8.66,
   "yaw": -18.8,
   "hfov": 4.4,
   "distance": 100
  }
 ],
 "id": "overlay_9D4E159B_8EFE_61C2_41CE_9CB1A99A8802",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_1_HS_2_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -18.8,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 4.4,
   "pitch": -8.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F, this.camera_1DBADC36_0D84_B5F2_41A7_EEEDA00E3D28); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_824F0192_9016_2B1F_41D8_51059B55CAA7",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -7.87,
   "yaw": -104.25,
   "hfov": 7.17,
   "distance": 100
  }
 ],
 "id": "overlay_9E8004C1_901A_297D_41B8_49C279D33A85",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0_HS_3_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -104.25,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.17,
   "pitch": -7.87
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2, this.camera_1F66D3A8_0D84_B29F_41A3_A28028355F55); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_85A1FDF3_91C2_F793_4191_4C166E39CB00",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -24.95,
   "yaw": -149.78,
   "hfov": 5.65,
   "distance": 50
  }
 ],
 "id": "overlay_9F7DE400_91CE_B46D_41B5_E94971CE1E48",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -149.78,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 5.65,
   "pitch": -24.95
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874, this.camera_1F6813C2_0D84_B292_416E_A754D4421C7A); this.mainPlayList.set('selectedIndex', 54)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D2682C10_F754_D6D4_41E0_B959E31B8252",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -30.18,
   "yaw": -101.86,
   "hfov": 11.57,
   "distance": 100
  }
 ],
 "id": "overlay_EAFF6493_F754_77D4_416D_48AF183C1168",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01c"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -101.86,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.57,
   "pitch": -30.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8, this.camera_19F64B7E_0D84_B272_419B_6A2FE1815F48); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_93030EF3_8AF5_859B_4181_4D20C04261AF",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -9.66,
   "yaw": -44.69,
   "hfov": 6.95,
   "distance": 100
  }
 ],
 "id": "overlay_9E7ECB73_8AF6_8C94_41E0_45187CD5833D",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -44.69,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 6.95,
   "pitch": -9.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8, this.camera_19E67B8F_0D84_B292_41A7_47EB7E13716D); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9302FEF3_8AF5_859B_4196_4C753A3DD3B0",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -23.51,
   "yaw": 170.91,
   "hfov": 7.62,
   "distance": 100
  }
 ],
 "id": "overlay_9D7214FB_8AF5_8594_41B8_462C87745F99",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 170.91,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.62,
   "pitch": -23.51
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14, this.camera_19C7AB6C_0D84_B397_4184_CE111B804264); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9F7F5540_8AFD_84F4_41C3_1CAD7A14F037",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -33.75,
   "yaw": -118.75,
   "hfov": 8.83,
   "distance": 100
  }
 ],
 "id": "overlay_9F40C392_8AFE_8394_4190_9E0D3C1056E4",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0_HS_2_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -118.75,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 8.83,
   "pitch": -33.75
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874, this.camera_1D7FF732_0D84_B3F2_41A5_FC4A30A1FCA0); this.mainPlayList.set('selectedIndex', 54)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_1_HS_0_0.png",
      "width": 115,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -5.79,
   "yaw": 3.61,
   "hfov": 6.13
  }
 ],
 "id": "overlay_D44CEBBD_F73C_D1CD_41ED_05A6850C74BB",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow Transparent Right"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 3.61,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 6.13,
   "pitch": -5.79
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_992EFE19_8AEE_8497_41C5_7168906A82C4, this.camera_1EA89429_0D84_B591_416E_B20DC1706132); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_984DFBE3_8AEE_83B4_41DA_68B0766C486A",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -36.5,
   "yaw": -73.27,
   "hfov": 8.28,
   "distance": 50
  }
 ],
 "id": "overlay_994472FB_8AEF_9D94_41C9_4C74606797A9",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -73.27,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 8.28,
   "pitch": -36.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24, this.camera_1EA5D41B_0D84_B5B1_4168_B65587215DF8); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9D30BD47_8AF7_84FC_41DF_190BB9667E47",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -13.5,
   "yaw": 72.19,
   "hfov": 11.12,
   "distance": 100
  }
 ],
 "id": "overlay_9FC813FB_8AEB_8394_41C3_0CC4FD936293",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 72.19,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.12,
   "pitch": -13.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3, this.camera_1ED21437_0D84_B5F1_4173_4C1858A81F2D); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9D30CD47_8AF7_84FC_41CB_B4F7BAC37590",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -18.24,
   "yaw": -35.43,
   "hfov": 8.78,
   "distance": 100
  }
 ],
 "id": "overlay_9EC727B2_8AF6_8395_41DE_1E4760939A10",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0_HS_2_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -35.43,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 8.78,
   "pitch": -18.24
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3, this.camera_1EC09445_0D84_B591_41A2_4D1DCB14A492); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9D307D47_8AF7_84FC_41B0_0E9734180834",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -15.22,
   "yaw": 145.98,
   "hfov": 7.86,
   "distance": 100
  }
 ],
 "id": "overlay_9E396B89_8AF6_8C74_41C2_5A7A8C489008",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0_HS_3_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 145.98,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.86,
   "pitch": -15.22
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F, this.camera_1C51983A_0D84_BDF2_41A5_AB9854499954); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_F87F4FCB_EE5A_5548_41D7_235FCE3762F5",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -15.56,
   "yaw": 37.4,
   "hfov": 10.23,
   "distance": 100
  }
 ],
 "id": "overlay_FF8A6E7A_EE6A_D748_41AC_D92622DF1FB6",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 37.4,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.23,
   "pitch": -15.56
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F, this.camera_1C40D84A_0D84_BD93_41A6_753216E8BE26); this.mainPlayList.set('selectedIndex', 41)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_F87FEFCC_EE5A_5548_41D5_2668F90CDF68",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -19.2,
   "yaw": 132.94,
   "hfov": 10.8,
   "distance": 100
  }
 ],
 "id": "overlay_FCDA8F2A_EE5A_36C8_41C0_76C9A0A00C35",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_1_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 132.94,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.8,
   "pitch": -19.2
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973, this.camera_1C76E85B_0D84_BDB2_41A5_0E4C7041B6D5); this.mainPlayList.set('selectedIndex', 42)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_F76C7441_EE2B_CAB8_41DE_A167B9FA9788",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -9.67,
   "yaw": -156.72,
   "hfov": 6.4,
   "distance": 100
  }
 ],
 "id": "overlay_FB8F676A_EE2A_3548_41E2_17E4D68C7D31",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0_HS_2_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -156.72,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 6.4,
   "pitch": -9.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498, this.camera_1E7FE4D6_0D84_B6B2_4178_775BF50E88FF); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_8A35EBB0_9902_FE31_41B1_FA696522A3F6",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -19.53,
   "yaw": 166.49,
   "hfov": 7.79,
   "distance": 100
  }
 ],
 "id": "overlay_899A65B3_9903_AA37_41C1_1651E45E3C67",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 166.49,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.79,
   "pitch": -19.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9A53D395_8A77_839C_41C8_70478C88A4B1, this.camera_1D624743_0D84_B392_41A0_1562F199A3F1); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_99ED022D_8A6E_BC8C_41D9_2C0E2A9D6E02",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -17,
   "yaw": -28.84,
   "hfov": 10.94,
   "distance": 100
  }
 ],
 "id": "overlay_9AFB2D4D_8A77_848C_41D2_347C1282F452",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -28.84,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.94,
   "pitch": -17
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36, this.camera_1C967754_0D84_B3B6_417F_6E787532B380); this.mainPlayList.set('selectedIndex', 33)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_9B7A982C_8A56_8C8C_41D0_991BC0FB8FD1",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -12.06,
   "yaw": -141.75,
   "hfov": 16.02,
   "distance": 100
  }
 ],
 "id": "overlay_9AE171BE_8A55_BF8C_41D0_5A83BCC834EA",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0_HS_2_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -141.75,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 16.02,
   "pitch": -12.06
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D, this.camera_1F7C7392_0D84_B2B2_4187_BC6AB64748E9); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_96D7EE66_8A77_84BD_41E0_089D1A206CA7",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -3.62,
   "yaw": -68.26,
   "hfov": 10.27,
   "distance": 50
  }
 ],
 "id": "overlay_93DA570D_8A76_848C_419D_845F80869E07",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Right"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -68.26,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.27,
   "pitch": -3.62
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E, this.camera_19B3B51D_0D84_B7B6_419F_08F77E6D968F); this.mainPlayList.set('selectedIndex', 52)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7723F3A_F75C_52D4_41D0_0C088FDCBAA9",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -25.67,
   "yaw": 25.13,
   "hfov": 9.9,
   "distance": 100
  }
 ],
 "id": "overlay_EBCFE583_F75C_31B5_41D2_FC15981DF128",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01c"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 25.13,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.9,
   "pitch": -25.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874, this.camera_19D71B5A_0D84_B3B2_41A5_10336B8BAE17); this.mainPlayList.set('selectedIndex', 54)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_DEAC6503_F734_F6B5_41E1_1F278EA1F79C",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -12.04,
   "yaw": 66.01,
   "hfov": 10.55,
   "distance": 100
  }
 ],
 "id": "overlay_E8A11030_F74C_4ED3_41E6_ED7A1199BEE8",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 66.01,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.55,
   "pitch": -12.04
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D568A391_F74C_51D4_41EB_EA36557FA15B, this.camera_19B0FB36_0D84_B3F3_4195_04BF9694DEF6); this.mainPlayList.set('selectedIndex', 56)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_DB82FFBC_F734_31CC_41EC_52819B32CDC3",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -10.55,
   "yaw": -113.93,
   "hfov": 12.89,
   "distance": 100
  }
 ],
 "id": "overlay_D7802BC8_F74C_31B3_41BC_DCA06B29E623",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -113.93,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 12.89,
   "pitch": -10.55
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D2503D71_F73C_7155_41CF_7ED250A076A7, this.camera_19A0CB47_0D84_B390_41A3_8C8B7C1E1F7F); this.mainPlayList.set('selectedIndex', 58)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_DB834FBC_F734_31CC_41A8_4B409DD85EC9",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -17.9,
   "yaw": -119.57,
   "hfov": 7.56,
   "distance": 50
  }
 ],
 "id": "overlay_D3E8C2F0_F73C_D354_41ED_D560529CC180",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02c Left"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -119.57,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.56,
   "pitch": -17.9
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95, this.camera_1F77B9B6_0D84_BEF2_419D_745E39F420B3); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_91E99E22_8A57_84B4_41AD_D712F05AAE59",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -48.65,
   "yaw": 113.42,
   "hfov": 6.8,
   "distance": 50
  }
 ],
 "id": "overlay_9C8882CF_8A5A_9D8C_41C8_C30CA2A0F909",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 113.42,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 6.8,
   "pitch": -48.65
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D, this.camera_1F67E9CE_0D84_BE92_4196_86AB24468DEF); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_96498106_8A6A_BC7C_41C6_8097F16D0653",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -31.97,
   "yaw": -138.8,
   "hfov": 9.7,
   "distance": 100
  }
 ],
 "id": "overlay_93CC75D5_8A6A_879C_41CA_194F9C585764",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -138.8,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.7,
   "pitch": -31.97
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_93F12805_8A6E_8C7C_41D9_78F983707124, this.camera_1E8519F9_0D84_BE7E_41A6_E0A041114F62); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_AAD5B620_8A56_84B4_41DF_B0EC432346CC",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -21.4,
   "yaw": -46.96,
   "hfov": 10.65,
   "distance": 100
  }
 ],
 "id": "overlay_932122C3_8A6E_9DF4_4199_47069396E3D6",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0_HS_2_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -46.96,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.65,
   "pitch": -21.4
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14, this.camera_1E9599E6_0D84_BE92_4185_0954E3FEECB6); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_95681603_8A5E_847B_41DF_C3CD357E765D",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -16.66,
   "yaw": 88.16,
   "hfov": 9.86,
   "distance": 50
  }
 ],
 "id": "overlay_96FECD3A_8A5D_8495_41BE_CF36D02B261C",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Right"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 88.16,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 9.86,
   "pitch": -16.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3, this.camera_19919B14_0D84_B3B6_41A8_4B47EA7EB599); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_A4BB953A_8BEA_8494_41C8_F2A5E00D05A9",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -5.04,
   "yaw": 73.45,
   "hfov": 4.18,
   "distance": 100
  }
 ],
 "id": "overlay_AF3591F7_8BDE_BF9C_4162_FE183C34C520",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 73.45,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 4.18,
   "pitch": -5.04
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D, this.camera_1E73EAF1_0D84_B271_4181_77D6D58151CA); this.mainPlayList.set('selectedIndex', 27)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_A4BA653A_8BEA_8494_41CA_BE20AE199CDB",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -6.5,
   "yaw": -121.57,
   "hfov": 3.67,
   "distance": 50
  }
 ],
 "id": "overlay_AFA1BFAE_8BDB_838C_41C2_43EC2A22C3F0",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Left"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -121.57,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 3.67,
   "pitch": -6.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21, this.camera_1E626B03_0D84_B392_41AA_09D7E4D7BBFE); this.mainPlayList.set('selectedIndex', 28)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_A4BAF53A_8BEA_8494_41D1_6DEC94950743",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -3.89,
   "yaw": 55.93,
   "hfov": 3.03,
   "distance": 50
  }
 ],
 "id": "overlay_AEA8A5CA_8BD6_87F4_41D6_256A6AB62849",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Left"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 55.93,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 3.03,
   "pitch": -3.89
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D, this.camera_1E430AE0_0D84_B28E_4183_0687311A4ED2); this.mainPlayList.set('selectedIndex', 45)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_E4849000_F66E_4C7F_41DE_3F1DF8D19630",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -16.78,
   "yaw": 169.08,
   "hfov": 5.13,
   "distance": 100
  }
 ],
 "id": "overlay_E40F125B_F66F_CC81_41E0_CF08C1003C27",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02a"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0_HS_3_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 169.08,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 5.13,
   "pitch": -16.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B, this.camera_1C9B4763_0D84_B392_419A_0042DD15B6DD); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_93A8876E_8A5A_848D_41E0_22094F5436CF",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -46.45,
   "yaw": 154.15,
   "hfov": 7.88,
   "distance": 100
  }
 ],
 "id": "overlay_9CA7EA66_8A5A_8CBD_41DA_55419E68C239",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 154.15,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.88,
   "pitch": -46.45
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0, this.camera_1C1837F7_0D84_B272_41A1_9EF9F93467E1); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_A4BD353A_8BEA_8494_41D2_0D32CF4EBD7A",
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -45.42,
   "yaw": -143.07,
   "hfov": 7.23,
   "distance": 50
  }
 ],
 "id": "overlay_AD14AE1B_8BD5_848B_41C2_AA339EA90EA3",
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -143.07,
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.23,
   "pitch": -45.42
  }
 ]
},
{
 "levels": [
  {
   "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41,
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_E3399BFA_F73C_6A09_41E2_A984E1935BE3",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_99126E55_8A7E_849C_41DD_12E624998647",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_99123E55_8A7E_849C_41B7_80CF2C076BC3",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_8451F0C5_8A5B_9DFC_41D1_E40F39B7ECD1",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_1_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_845130C5_8A5B_9DFC_41D2_FA8D91EE70DA",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_980BB0B4_8ADE_BD9C_41D2_6067A997AD7E",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0_HS_3_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_93A38A9F_8A5A_8D8C_41D6_C514AA7FA387",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_B3507E35_AB59_A239_41C6_3CE7CF61CD60",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41,
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_03E41E1A_0D83_B5B2_41A9_EAD3109E8ADE",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_921F20EE_8A6D_9D8C_41AC_189112708CCA",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_1_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_921EB0EE_8A6D_9D8C_41DF_D46CF2AD2D24",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_9F05ACEC_8AD7_858C_41DE_23B46E5C1912",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_1_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_9F056CEC_8AD7_858C_41CD_F2F064B6195C",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_9E277991_8ED5_0EFB_41DC_AAC886AE2ABF",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0_HS_3_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41,
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_C7C98613_D4ED_9F74_41E9_52DCD51C32FE",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_F87E7FCC_EE5A_5548_41C1_9DDCB598C27A",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41,
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_C4EB3CFC_F7D4_3753_41E8_C0C274BC9968",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_F76F6447_EE2B_CAB8_41E9_70CE3D33D33E",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_F4BD75C5_EE3B_D5B8_41D9_F4234C1AB51D",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_AAD0B620_8A56_84B4_41D0_E4F2A2B5010B",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_87987D71_9016_5B1C_41DA_590CF9B5E49A",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_B34CAE30_AB59_A237_41CE_71DF380AA36A",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_C2F447E7_D4F5_FCDC_4178_73DB747B1D60",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_E0325AE2_F26B_0956_41D9_A1B84A853CEA",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0_HS_2_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41,
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_E0FDB986_F754_F6F9_41E0_2FB327B3CE54",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_AB28C99E_8BBD_8F8D_41C1_9111F9EE43FC",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_85A95DEA_91C2_F7BD_41E0_811163682743",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0_HS_2_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41,
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_EA3CFC75_F74C_6E1B_41E8_92CE0AC0CCD9",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_C4EABCFC_F7D4_3753_419F_3C7C1E0A619E",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_91E96E22_8A57_84B4_41DF_01428A258E4C",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_D773FF3A_F75C_52D4_41E5_D328F604ED4C",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_AB293999_8BBD_8F94_41BE_DEC0ED489E28",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_AA266A4A_8BB6_8CF4_41DC_AEC41F186E44",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0_HS_2_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_EF7B2BFF_F774_2A07_41DA_8C9D454F87F5",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_9F7EF540_8AFD_84F4_41DB_E5BBEFF93254",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_932B2554_8A5D_849C_41DE_3FBD649B3CC4",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_85BBCCB9_900A_590C_41DE_E43A33CBD14F",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_1_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_85BB5CB9_900A_590C_41D8_2E3084509082",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_1_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_85BB6CB9_900A_590C_41D1_82AE9A539C7B",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_9912CE55_8A7E_849C_41E0_0BA495F5E4FE",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_992C825A_8A76_BC94_419B_437C349D2AE0",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_9850958A_8AB5_8474_41DE_E7401C1B01EE",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_D27CDC16_F754_D6DC_41DC_09FF65CDB8F6",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_DB810FBC_F734_31CC_41C8_7A4EA548AEF9",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0_HS_2_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41,
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_DB818FBC_F734_31CC_41E8_F7D109FFB6C5",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_A92EB4C5_8BAA_85FC_41C6_644C3BC9478D",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_9AF2187D_8EFD_0E2B_41E1_4B76B0C06B4E",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_F803EFC3_EE5A_55B8_41D4_6E710FA149C3",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_AAD36620_8A56_84B4_41CA_F5FDD7DA9EFE",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_1_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_AAD38620_8A56_84B4_41DA_7933CB071328",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_1_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_AAD01620_8A56_84B4_41D0_14F5FD121C53",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_87935D76_9016_5B04_41DA_4BB6A4937024",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_984E1BE3_8AEE_83B4_41B4_54B037B2C132",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_984EBBE3_8AEE_83B4_41D1_17554C282868",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_A4AE953A_8BEA_8494_4197_F6FA4DC345AE",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_9FD59991_8ED5_0EFB_41C8_A70BC03D72CF",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_1_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_9FD5F991_8ED5_0EFB_41B4_47DA93F47DA7",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_9AF8487D_8EFD_0E2B_41E1_7C72B547B22C",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_8A283BA7_9902_FEDF_41AA_D572B44C74D4",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_E3BCA2A2_F65A_4D83_41E9_025C081F0E8F",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_DEAE8504_F734_F6B3_41D7_BC18FC975411",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41,
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_D9C41685_F7CD_D3BC_41A7_24C12A4438F2",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_9FD4E991_8ED5_0EFB_41AF_D4203E464BEC",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_9850658A_8AB5_8474_4184_1E35EEAC68D3",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_A4BAB53A_8BEA_8494_41C6_F5C6D227E689",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_920075A2_8AFB_87B4_41DF_73F24B1E3859",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_AA265A4A_8BB6_8CF4_41D9_5D0BF88EB7FF",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_E00EDAE4_F26B_0952_41E1_91A95C80CF69",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41,
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_E3394BFA_F73C_6A09_41E5_65A8D4626E5D",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0_HS_2_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41,
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_E5C77A1E_F74C_2A09_41E3_B97356AA4154",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0_HS_3_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41,
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_EE8D9CC9_F754_2E0B_41BB_7D42B2ED5890",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_960813EE_8A56_838C_41DC_7BF066162034",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_E52A97A9_F66A_D381_41DA_5E0C193BAF44",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41,
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_E29F33BA_F75D_DA09_41A5_688298A2DA5F",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_F4BDC5C5_EE3B_D5B8_41E4_D6E192075412",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_A4BB553A_8BEA_8494_41DE_5D4211C9B7A2",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_1_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_A4BB153A_8BEA_8494_41CB_B2CA0B34D152",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0_HS_2_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_C4C50CDE_F7D4_374F_41E1_181E016511B5",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_1_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 570
  }
 ],
 "frameDuration": 41,
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_980E40B4_8ADE_BD9C_41D6_288FD71EEFB0",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_C7DEF625_D4ED_9F5C_41D5_A3FB355C927D",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_EFCC4465_F754_DE3B_41D4_2D98D4E404C6",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_E3B832A4_F65A_4D87_41DC_9FE28D289D9F",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_9A160EC9_8EFF_A34E_41C9_E69EA7CDC22C",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_1_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_9A17CEC9_8EFF_A34E_41DE_63ACC805833D",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_1_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_9A176EC9_8EFF_A34E_41D1_4936F0E62209",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0_HS_3_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_824F0192_9016_2B1F_41D8_51059B55CAA7",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_85A1FDF3_91C2_F793_4191_4C166E39CB00",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_D2682C10_F754_D6D4_41E0_B959E31B8252",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_93030EF3_8AF5_859B_4181_4D20C04261AF",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_9302FEF3_8AF5_859B_4196_4C753A3DD3B0",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_9F7F5540_8AFD_84F4_41C3_1CAD7A14F037",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_984DFBE3_8AEE_83B4_41DA_68B0766C486A",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_9D30BD47_8AF7_84FC_41DF_190BB9667E47",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_9D30CD47_8AF7_84FC_41CB_B4F7BAC37590",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0_HS_3_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_9D307D47_8AF7_84FC_41B0_0E9734180834",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_F87F4FCB_EE5A_5548_41D7_235FCE3762F5",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_1_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_F87FEFCC_EE5A_5548_41D5_2668F90CDF68",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_F76C7441_EE2B_CAB8_41DE_A167B9FA9788",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_8A35EBB0_9902_FE31_41B1_FA696522A3F6",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_99ED022D_8A6E_BC8C_41D9_2C0E2A9D6E02",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_9B7A982C_8A56_8C8C_41D0_991BC0FB8FD1",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_96D7EE66_8A77_84BD_41E0_089D1A206CA7",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_D7723F3A_F75C_52D4_41D0_0C088FDCBAA9",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_DEAC6503_F734_F6B5_41E1_1F278EA1F79C",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_DB82FFBC_F734_31CC_41EC_52819B32CDC3",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0_HS_2_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41,
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_DB834FBC_F734_31CC_41A8_4B409DD85EC9",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_91E99E22_8A57_84B4_41AD_D712F05AAE59",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_96498106_8A6A_BC7C_41C6_8097F16D0653",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_AAD5B620_8A56_84B4_41DF_B0EC432346CC",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0_HS_3_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_95681603_8A5E_847B_41DF_C3CD357E765D",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_A4BB953A_8BEA_8494_41C8_F2A5E00D05A9",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_1_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_A4BA653A_8BEA_8494_41CA_BE20AE199CDB",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_1_HS_2_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_A4BAF53A_8BEA_8494_41D1_6DEC94950743",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0_HS_3_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41,
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_E4849000_F66E_4C7F_41DE_3F1DF8D19630",
 "class": "AnimatedImageResource",
 "colCount": 4
},
{
 "levels": [
  {
   "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 270
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_93A8876E_8A5A_848D_41E0_22094F5436CF",
 "class": "AnimatedImageResource",
 "colCount": 3
},
{
 "levels": [
  {
   "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_1_HS_0_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "frameDuration": 62,
 "frameCount": 9,
 "rowCount": 3,
 "id": "AnimatedImageResource_A4BD353A_8BEA_8494_41D2_0D32CF4EBD7A",
 "class": "AnimatedImageResource",
 "colCount": 3
}]
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
