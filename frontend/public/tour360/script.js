(function(){
    var script = {
 "start": "this.init()",
 "scrollBarWidth": 10,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "vrPolyfillScale": 0.7,
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "desktopMipmappingEnabled": false,
 "mouseWheelEnabled": true,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.MainViewer"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "backgroundPreloadEnabled": true,
 "paddingLeft": 0,
 "layout": "absolute",
 "scrollBarVisible": "rollOver",
 "minHeight": 20,
 "defaultVRPointer": "laser",
 "scripts": {
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "existsKey": function(key){  return key in window; },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "unregisterKey": function(key){  delete window[key]; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "registerKey": function(key, value){  window[key] = value; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "getKey": function(key){  return window[key]; }
 },
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "height": "100%",
 "gap": 10,
 "paddingTop": 0,
 "downloadEnabled": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "shadow": false,
 "class": "Player",
 "data": {
  "name": "Player445"
 },
 "overflow": "visible",
 "definitions": [{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -170.56,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B3E0AD6C_A047_34F6_41D3_91D2BB33CEA1"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 30.22,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AFB13E78_A047_34DD_41B9_A1C66FBD66CD"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -143.07,
   "backwardYaw": 55.93,
   "distance": 1,
   "panorama": "this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0"
  }
 ],
 "hfov": 360,
 "label": "phong-thi-nghiem",
 "id": "panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21",
 "thumbnailUrl": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_AD14AE1B_8BD5_848B_41C2_AA339EA90EA3"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -9.72,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B1FB0BED_A047_33F6_41BC_F96DE31180BC"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -40.26,
   "backwardYaw": 159.92,
   "distance": 1,
   "panorama": "this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21",
 "thumbnailUrl": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_t.jpg",
 "label": "nha-de-xe",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_983ED8A9_8ADD_8DB4_41DB_0D3888138C17"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -109.62,
   "backwardYaw": 66.01,
   "distance": 1,
   "panorama": "this.panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -117.61,
   "backwardYaw": 3.61,
   "distance": 1,
   "panorama": "this.panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 70.5,
   "backwardYaw": -101.86,
   "distance": 1,
   "panorama": "this.panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007"
  }
 ],
 "hfov": 360,
 "label": "gd2-tang3-dau",
 "id": "panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874",
 "thumbnailUrl": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_E9DF26FB_F754_5355_41E9_0F13ABAAFE39",
  "this.overlay_E83B24B1_F74D_D7D5_41EB_EAA8762DAC28",
  "this.overlay_D3F7AD13_F734_56D5_41E6_45E99A7165E2"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -91.84,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AFEA6AAF_A047_3C72_41D3_49574D0C1C27"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -35.25,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B03C3EE0_A047_35EE_41E0_2A1C78D4CE0E"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -82.93,
   "backwardYaw": 0.15,
   "distance": 1,
   "panorama": "this.panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 93.68,
   "backwardYaw": 15.72,
   "distance": 1,
   "panorama": "this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -43.38,
   "backwardYaw": -23.03,
   "distance": 1,
   "panorama": "this.panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8"
  }
 ],
 "hfov": 360,
 "label": "loi vao gd3",
 "id": "panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE",
 "thumbnailUrl": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_C44A83DA_D4EF_94F4_41E2_CA8F8F6EA37F",
  "this.overlay_C5D33580_D4F7_7D54_41A0_C8ABCFA5942E",
  "this.overlay_F89D9039_F65E_4C81_41EB_0D6F3ABA0159"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 32.9,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AFAC0E88_A047_343E_41D8_D349E4F26C30"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -107.24,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B1D9EBDC_A047_33D6_41E2_7F0EDBCAE0E3"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 157.88,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B18DAC06_A047_3432_41CC_B042DBFEF671"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -13.85,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AFA5DAD8_A047_3DDE_41B8_A609BDD69B89"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 20.6,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B30ECD36_A047_3452_41D3_08E38C7BA4BC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_9607D4FC_9906_6A31_41DB_47B84633749D_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 70.62,
   "backwardYaw": -118.75,
   "distance": 1,
   "panorama": "this.panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -117.45,
   "backwardYaw": 88.16,
   "distance": 1,
   "panorama": "this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14",
 "thumbnailUrl": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_t.jpg",
 "label": "sanh-t2-gd3",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_9FD72DA2_8AFD_87B4_41C1_4D812AA89815",
  "this.overlay_9CB8EB1E_8A5E_8C8C_41D8_C73EEC332F7A"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 36.93,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AF9D6E55_A047_34D6_41B8_E04FFE99B343"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -108.55,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B2971CE1_A047_35EE_41C8_49D611F20F6F"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 3.53,
   "backwardYaw": -112.99,
   "distance": 1,
   "panorama": "this.panorama_D568A391_F74C_51D4_41EB_EA36557FA15B"
  }
 ],
 "hfov": 360,
 "label": "2303",
 "id": "panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271",
 "thumbnailUrl": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_D273FA0C_F73C_F2CC_41ED_9D8D4B1E8D65"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 144.57,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B123FA19_A047_3C5E_41E1_BD6C7D6BC4C9"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 164.87,
   "backwardYaw": -84.11,
   "distance": 1,
   "panorama": "this.panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -127.02,
   "backwardYaw": 65.69,
   "distance": 1,
   "panorama": "this.panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C",
 "thumbnailUrl": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_t.jpg",
 "label": "gd2(t1)-hanh-lang",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_957760EE_8BBB_FD8C_41D7_2981D49F5313",
  "this.overlay_94C04A93_8BBA_8D94_41E0_864608603980",
  "this.overlay_E097B2DB_F74C_DA0F_41CF_72296D0FD4DF"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -103.8,
   "backwardYaw": 132.94,
   "distance": 1,
   "panorama": "this.panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7"
  }
 ],
 "hfov": 360,
 "label": "san bong ro",
 "id": "panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F",
 "thumbnailUrl": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_FDA62D05_EE5A_7AB8_41D0_01821B1EA0DA"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 142.14,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B3B38D88_A047_343E_41E2_D8D86ED03ACD"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -119.47,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B3823D7F_A047_34D2_41D7_98CB9F236275"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -70.08,
   "backwardYaw": 30.09,
   "distance": 1,
   "panorama": "this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B"
  }
 ],
 "hfov": 360,
 "label": "cong-truong",
 "id": "panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011",
 "thumbnailUrl": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_003ADEF7_0D84_9271_4166_F346A4B07D23"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -20.08,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B07F5B03_A047_3C32_41CB_3ED45E3A5562"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 119.43,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B0C15B4D_A047_3C36_41E1_48CA8E4BA94F"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 153.42,
   "backwardYaw": -66.39,
   "distance": 1,
   "panorama": "this.panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 11.43,
   "backwardYaw": 156.5,
   "distance": 1,
   "panorama": "this.panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -23.03,
   "backwardYaw": -43.38,
   "distance": 1,
   "panorama": "this.panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE"
  }
 ],
 "hfov": 360,
 "label": "cua len gd3(gan nha the chat)",
 "id": "panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8",
 "thumbnailUrl": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_C6D274E8_D4F6_BCD4_41D5_132B824F8903",
  "this.overlay_FC2BA2D5_F26D_1972_41BD_B50311D3B4E7",
  "this.overlay_E3502D29_F754_2E0B_41E4_E74DC402E0EB"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -84.11,
   "backwardYaw": 164.87,
   "distance": 1,
   "panorama": "this.panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC",
 "thumbnailUrl": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_t.jpg",
 "label": "2101",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_E09C8918_F774_7609_41E0_8341C81AD393"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -10.92,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B0868B6F_A047_3CF2_41CE_6B9251408799"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 24.82,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B3F0FD63_A047_34F2_41C4_09E8A375FB28"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 65.69,
   "backwardYaw": -127.02,
   "distance": 1,
   "panorama": "this.panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49",
 "thumbnailUrl": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_t.jpg",
 "label": "cuoi hanh lang - gd2(t1)",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_A9AE2D43_8BB7_84F4_41DF_81F8D65C7E95"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 46.45,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B2343C8D_A047_3437_41E0_FB469C33530D"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 30.11,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AFCD7E06_A047_3432_41DB_A8E3FAA8BABA"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -107.11,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B32FBD47_A047_3432_41E1_022CCBD84070"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 136.62,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B129CBD4_A047_33D6_41C3_99CF39B8599F"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -109.38,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B1305A10_A047_3C2E_41C9_DD0A33EA7558"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -101.53,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AF930E4D_A047_3436_41D6_BEBE29FC53BC"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -82.6,
   "backwardYaw": 76.5,
   "distance": 1,
   "panorama": "this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 30.09,
   "backwardYaw": -70.08,
   "distance": 1,
   "panorama": "this.panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -33.85,
   "backwardYaw": 154.15,
   "distance": 1,
   "panorama": "this.panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 159.92,
   "backwardYaw": -40.26,
   "distance": 1,
   "panorama": "this.panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21"
  }
 ],
 "hfov": 360,
 "label": "bot-bao-ve",
 "id": "panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B",
 "thumbnailUrl": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_9C141389_8A5A_9C74_41E0_DEE041939AF8",
  "this.overlay_344E1F13_3AA4_DE98_41C8_1BDB57B10DED",
  "this.overlay_35F7FC29_3AA4_C289_41C7_5948E020D0E1",
  "this.overlay_3509AC99_3AA7_C388_41C3_23B3FC25C175"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.07,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B2E73CD8_A047_35DE_41DB_F546123BE040"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 7.17,
   "backwardYaw": 100.6,
   "distance": 1,
   "panorama": "this.panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_82BAF319_901A_2F0D_41C4_309B78B0C979",
 "thumbnailUrl": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_t.jpg",
 "label": "lab2",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_83EE6C1C_9016_7904_41BB_C3CF35196CB6"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 62.55,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B3924D76_A047_34D2_41E4_0096116F5E7C"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.85,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B288DCF3_A047_35D2_41C5_296400B4FE8F"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -103.5,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B0703EA9_A047_347E_41DB_37EF01A7A693"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 0.65,
   "backwardYaw": -119.57,
   "distance": 1,
   "panorama": "this.panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32"
  }
 ],
 "hfov": 360,
 "label": "2302",
 "id": "panorama_D2503D71_F73C_7155_41CF_7ED250A076A7",
 "thumbnailUrl": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_D37510B0_F73C_4FD3_41E2_6CB48AD4AEE1"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 144.57,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B1D5CA22_A047_3C72_41E1_E4DF3A8E26EC"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -149.78,
   "backwardYaw": -159.4,
   "distance": 1,
   "panorama": "this.panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -101.86,
   "backwardYaw": 70.5,
   "distance": 1,
   "panorama": "this.panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874"
  }
 ],
 "hfov": 360,
 "label": "hanh-lang-t3(gd2)",
 "id": "panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007",
 "thumbnailUrl": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_9F7DE400_91CE_B46D_41B5_E94971CE1E48",
  "this.overlay_EAFF6493_F754_77D4_416D_48AF183C1168"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 121.49,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AF86EE5D_A047_34D6_41CD_040DC51BFB1A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 70.41,
   "backwardYaw": -73.27,
   "distance": 1,
   "panorama": "this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8"
  }
 ],
 "hfov": 360,
 "label": "phong an",
 "id": "panorama_992EFE19_8AEE_8497_41C5_7168906A82C4",
 "thumbnailUrl": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_9FC74F80_8AFA_8475_41D3_C846F7AB24EC"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -116.15,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AFA64E80_A047_342D_41D1_FA2409A051A5"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 153.08,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B1405B9A_A047_3C5D_4154_1EFC85AC6D32"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -98.04,
   "backwardYaw": 129.9,
   "distance": 1,
   "panorama": "this.panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -159.4,
   "backwardYaw": -149.78,
   "distance": 1,
   "panorama": "this.panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -18.5,
   "backwardYaw": 63.85,
   "distance": 1,
   "panorama": "this.panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2",
 "thumbnailUrl": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_t.jpg",
 "label": "hanh lang -t2(gd2)",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_94A79AA9_8BBA_8DB4_41D6_EAE9397D24B5",
  "this.overlay_81866D9B_91C3_9793_4189_808E9F82BEA7",
  "this.overlay_EDE6F085_F74C_56FB_419E_FE88E4D5F8F2"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 66.07,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AF26CA6B_A047_3CF3_41C5_13A0A7D437C8"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 129.9,
   "backwardYaw": -98.04,
   "distance": 1,
   "panorama": "this.panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 58.26,
   "backwardYaw": -141.75,
   "distance": 1,
   "panorama": "this.panorama_98AA559B_8A76_8794_41CA_9930712915C9"
  }
 ],
 "hfov": 360,
 "label": "GD2(2)",
 "id": "panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36",
 "thumbnailUrl": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_823FAB5C_900A_FF04_41DD_2393E5CA09F0",
  "this.overlay_826DFCB6_900B_F904_41A1_1CAA12B5FD4E",
  "this.overlay_823C3D2F_900A_3B05_41DF_C3A3475B6D00"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.33,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AFFECE22_A047_3472_41D6_5D62B45E0228"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 61.25,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AFE3EAA6_A047_3C72_41C3_D8011787D056"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 42.94,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B0046ECD_A047_3436_41C3_7B8A85550F55"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 60.43,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B106C9FF_A047_3FD3_41DE_EABF90C338EF"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -121.74,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B1EBABF6_A047_33D2_41DD_63C0518AC119"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -86.32,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B4449DA5_A047_3476_41A0_825FC0491374"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 161.5,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AFCA5E0F_A047_3432_41DD_1DE8D340D2DC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -109.5,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B33E3D3E_A047_3452_41D7_1AD8258C0822"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -117.42,
   "backwardYaw": 29.9,
   "distance": 1,
   "panorama": "this.panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 29.58,
   "backwardYaw": 100.64,
   "distance": 1,
   "panorama": "this.panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 60.53,
   "backwardYaw": -46.96,
   "distance": 1,
   "panorama": "this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52"
  }
 ],
 "hfov": 360,
 "label": "loi-vao-lab",
 "id": "panorama_93F12805_8A6E_8C7C_41D9_78F983707124",
 "thumbnailUrl": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_90C4B3BC_8A6F_838D_41D4_35D87BEAF76C",
  "this.overlay_90497676_8A6A_849C_41C9_773C5422DBE9",
  "this.overlay_9064CA68_8A55_8CB4_41D4_0075298C0116"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 72.19,
   "backwardYaw": -82.47,
   "distance": 1,
   "panorama": "this.panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -73.27,
   "backwardYaw": 70.41,
   "distance": 1,
   "panorama": "this.panorama_992EFE19_8AEE_8497_41C5_7168906A82C4"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -35.43,
   "backwardYaw": -44.69,
   "distance": 1,
   "panorama": "this.panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 145.98,
   "backwardYaw": -44.69,
   "distance": 1,
   "panorama": "this.panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3"
  }
 ],
 "hfov": 360,
 "label": "sanh-nha-an",
 "id": "panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8",
 "thumbnailUrl": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_994472FB_8AEF_9D94_41C9_4C74606797A9",
  "this.overlay_9FC813FB_8AEB_8394_41C3_0CC4FD936293",
  "this.overlay_9EC727B2_8AF6_8395_41DE_1E4760939A10",
  "this.overlay_9E396B89_8AF6_8C74_41C2_5A7A8C489008"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -101.04,
   "backwardYaw": 78.7,
   "distance": 1,
   "panorama": "this.panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9",
 "thumbnailUrl": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_t.jpg",
 "label": "the-chat-ngoai-troi",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_A3B10469_8BEB_84B4_41D4_4334453C455A"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 72.89,
   "backwardYaw": -113.93,
   "distance": 1,
   "panorama": "this.panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -112.99,
   "backwardYaw": 3.53,
   "distance": 1,
   "panorama": "this.panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271"
  }
 ],
 "hfov": 360,
 "label": "gd3-tang3-cuoi",
 "id": "panorama_D568A391_F74C_51D4_41EB_EA36557FA15B",
 "thumbnailUrl": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_D6907DD0_F74C_D153_41C5_713CB9725137",
  "this.overlay_D226D140_F73C_4EB4_41EB_5CDD1B44B0BF"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -142.6,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B0514AE9_A047_3DFE_41D0_240916335D0C"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 97.4,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B0461E98_A047_345E_41D0_DB55C6CF99EA"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 135.31,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AFC37A8D_A047_3C36_41D8_CCF05EF70550"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -66.58,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B0DDEB45_A047_3C36_4152_3DAEE28744BC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -26.58,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B0085ED7_A047_35D2_41B7_AC2F138AB919"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -154.87,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AFF4CE19_A047_345E_41D3_20EFFCB0CBB2"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 169.08,
   "backwardYaw": -10.78,
   "distance": 1,
   "panorama": "this.panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -121.57,
   "backwardYaw": 78.47,
   "distance": 1,
   "panorama": "this.panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 55.93,
   "backwardYaw": -143.07,
   "distance": 1,
   "panorama": "this.panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 73.45,
   "backwardYaw": -58.51,
   "distance": 1,
   "panorama": "this.panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3"
  }
 ],
 "hfov": 360,
 "label": "loi-vao-phong-y-te",
 "id": "panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0",
 "thumbnailUrl": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_AF3591F7_8BDE_BF9C_4162_FE183C34C520",
  "this.overlay_AFA1BFAE_8BDB_838C_41C2_43EC2A22C3F0",
  "this.overlay_AEA8A5CA_8BD6_87F4_41D6_256A6AB62849",
  "this.overlay_E40F125B_F66F_CC81_41E0_CF08C1003C27"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 23.28,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B0F2CB55_A047_3CD6_41E3_BAA214CBDA50"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -20.46,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AF3DDA63_A047_3CF3_41D3_7B1B39C45E9F"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -5.71,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B10B1A08_A047_3C3D_41D4_039FE127725A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -19.26,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B002AB23_A047_3C72_41E2_30792C99CFA4"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 109.92,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B0664EB2_A047_3452_41C6_48EC84D982AC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -107.81,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B1141BB2_A047_3C6D_41CE_AA272D341971"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 100.64,
   "backwardYaw": 29.58,
   "distance": 1,
   "panorama": "this.panorama_93F12805_8A6E_8C7C_41D9_78F983707124"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26",
 "thumbnailUrl": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_t.jpg",
 "label": "thu-vien",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_963AAF11_8A57_8494_41C2_F2C627F303AC"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 146.15,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B19D0BFE_A047_33D2_41DA_D30B1267DDF7"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 139.74,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B01F8EC5_A047_3436_41D2_B23C31BE5BE4"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -176.39,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B0ACBB88_A047_3C3E_41D2_4DE3DD1C1244"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 62.39,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B1C9ABE5_A047_33F6_41D6_00D9DBC431D2"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -104.24,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B0511E90_A047_342E_419E_0E053D1DE1E8"
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "2101",
 "id": "panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F",
 "thumbnailUrl": "media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_t.jpg",
 "partial": false,
 "hfovMin": "135%",
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -109.59,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AFDE7A85_A047_3C36_41E2_8EDBE9EF8766"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 106.73,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B089FB77_A047_3CD2_41CF_8B721990C63C"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 62.58,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B2F75CCA_A047_343D_41D6_BFF61DB8B69E"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 161.04,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B04C5EA1_A047_346E_4197_C13422D65012"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 58.43,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B0958B66_A047_3CF2_41E3_12C637F69195"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 161.2,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B4530D9C_A047_3456_41D6_D71705FF21EC"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 37.4,
   "backwardYaw": 155.43,
   "distance": 1,
   "panorama": "this.panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 132.94,
   "backwardYaw": -103.8,
   "distance": 1,
   "panorama": "this.panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -156.72,
   "backwardYaw": 37.12,
   "distance": 1,
   "panorama": "this.panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973"
  }
 ],
 "hfov": 360,
 "label": "san sau gd1",
 "id": "panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7",
 "thumbnailUrl": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_FF8A6E7A_EE6A_D748_41AC_D92622DF1FB6",
  "this.overlay_FCDA8F2A_EE5A_36C8_41C0_76C9A0A00C35",
  "this.overlay_FB8F676A_EE2A_3548_41E2_17E4D68C7D31"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 111.74,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B35BED0C_A047_3436_41B4_DD5FAA526B4F"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -142.88,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B202CC7A_A047_34DD_41E0_E290408E03F6"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -176.47,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AF201A74_A047_3CD5_41D0_A67B3A4A0DDA"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -68.26,
   "backwardYaw": 174.29,
   "distance": 1,
   "panorama": "this.panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D"
  }
 ],
 "hfov": 360,
 "label": "phong-canh-phong-may",
 "id": "panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5",
 "thumbnailUrl": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_93DA570D_8A76_848C_419D_845F80869E07"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -113.99,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B0BAFB80_A047_3C2E_41A0_B3FCEA8380E6"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 166.49,
   "backwardYaw": -28.69,
   "distance": 1,
   "panorama": "this.panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498"
  }
 ],
 "hfov": 360,
 "label": "duong-vao-nha-clb",
 "id": "panorama_9607D4FC_9906_6A31_41DB_47B84633749D",
 "thumbnailUrl": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_899A65B3_9903_AA37_41C1_1651E45E3C67"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -13.51,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B1BFEC0F_A047_3432_41D2_1C901868E133"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 154.15,
   "backwardYaw": -33.85,
   "distance": 1,
   "panorama": "this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B"
  }
 ],
 "hfov": 360,
 "label": "ATM",
 "id": "panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A",
 "thumbnailUrl": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_9CA7EA66_8A5A_8CBD_41DA_55419E68C239"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -107.44,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B0630B0B_A047_3C32_41A4_C43BAFCE386B"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 144.75,
   "backwardYaw": 0.67,
   "distance": 1,
   "panorama": "this.panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA"
  }
 ],
 "hfov": 360,
 "label": "3102",
 "id": "panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80",
 "thumbnailUrl": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_E6CA7F3F_F74C_2A07_41EA_B70C9B9769FF"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 100.6,
   "backwardYaw": 7.17,
   "distance": 1,
   "panorama": "this.panorama_82BAF319_901A_2F0D_41C4_309B78B0C979"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -26.92,
   "backwardYaw": 87.97,
   "distance": 1,
   "panorama": "this.panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 29.9,
   "backwardYaw": -117.42,
   "distance": 1,
   "panorama": "this.panorama_93F12805_8A6E_8C7C_41D9_78F983707124"
  }
 ],
 "hfov": 360,
 "label": "lab1",
 "id": "panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF",
 "thumbnailUrl": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_902DCA8F_8A6B_8D8C_41D4_2E56962AF3C4",
  "this.overlay_83BC2280_9016_29FC_41DB_826793121830",
  "this.overlay_BA3BD77E_AB5A_622B_41D8_B54E351F8354"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -50.1,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AF8A3E6F_A047_34F3_41C3_F5FEDDB5A0AD"
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "media": "this.panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "media": "this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "media": "this.panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "media": "this.panorama_9A53D395_8A77_839C_41C8_70478C88A4B1",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_98AA559B_8A76_8794_41CA_9930712915C9_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "media": "this.panorama_98AA559B_8A76_8794_41CA_9930712915C9",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "media": "this.panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "media": "this.panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "media": "this.panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "media": "this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "media": "this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "media": "this.panorama_992EFE19_8AEE_8497_41C5_7168906A82C4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "media": "this.panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "media": "this.panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "media": "this.panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "media": "this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "media": "this.panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "media": "this.panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "media": "this.panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_93F12805_8A6E_8C7C_41D9_78F983707124_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "media": "this.panorama_93F12805_8A6E_8C7C_41D9_78F983707124",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "media": "this.panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "media": "this.panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "media": "this.panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "media": "this.panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "media": "this.panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "media": "this.panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "media": "this.panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "media": "this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "media": "this.panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "media": "this.panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "media": "this.panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "media": "this.panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "media": "this.panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "media": "this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "media": "this.panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 34, 35)",
   "media": "this.panorama_82BAF319_901A_2F0D_41C4_309B78B0C979",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "media": "this.panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9607D4FC_9906_6A31_41DB_47B84633749D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "media": "this.panorama_9607D4FC_9906_6A31_41DB_47B84633749D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "media": "this.panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 38, 39)",
   "media": "this.panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 39, 40)",
   "media": "this.panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 40, 41)",
   "media": "this.panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 41, 42)",
   "media": "this.panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 42, 43)",
   "media": "this.panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 43, 44)",
   "media": "this.panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 44, 45)",
   "media": "this.panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 45, 46)",
   "media": "this.panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 46, 47)",
   "media": "this.panorama_F954B244_F73C_7A79_41E5_028FB682D8D8",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 47, 48)",
   "media": "this.panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 48, 49)",
   "media": "this.panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 49, 50)",
   "media": "this.panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 50, 51)",
   "media": "this.panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 51, 52)",
   "media": "this.panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 52, 53)",
   "media": "this.panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 53, 54)",
   "media": "this.panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 54, 55)",
   "media": "this.panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 55, 56)",
   "media": "this.panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 56, 57)",
   "media": "this.panorama_D568A391_F74C_51D4_41EB_EA36557FA15B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 57, 58)",
   "media": "this.panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 58, 59)",
   "media": "this.panorama_D2503D71_F73C_7155_41CF_7ED250A076A7",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 59, 60)",
   "media": "this.panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 60, 61)",
   "media": "this.panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 61, 0)",
   "media": "this.panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "mainPlayList"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -155.18,
   "backwardYaw": 113.42,
   "distance": 1,
   "panorama": "this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52"
  }
 ],
 "hfov": 360,
 "label": "phong-may",
 "id": "panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95",
 "thumbnailUrl": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_92B042AA_8A55_BDB4_41BC_2684FB452D8D"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -168.57,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B1712BA2_A047_3C6D_417C_C7EB18C7B52C"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -37.86,
   "backwardYaw": -133.55,
   "distance": 1,
   "panorama": "this.panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 71.45,
   "backwardYaw": 31.37,
   "distance": 1,
   "panorama": "this.panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3"
  }
 ],
 "hfov": 360,
 "label": "dom e",
 "id": "panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6",
 "thumbnailUrl": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_DEB60503_F7D4_56B5_41E2_F7383446515F",
  "this.overlay_DE233E50_F7D4_F353_41E8_8D6616EF9234"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -149.26,
   "backwardYaw": -2.93,
   "distance": 1,
   "panorama": "this.panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 31.37,
   "backwardYaw": 71.45,
   "distance": 1,
   "panorama": "this.panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -58.51,
   "backwardYaw": 73.45,
   "distance": 1,
   "panorama": "this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0"
  }
 ],
 "hfov": 360,
 "label": "loi-vao-ktx",
 "id": "panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3",
 "thumbnailUrl": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_A89372B7_8BAA_BD9C_41CE_8779ED58CBF0",
  "this.overlay_A8CC0E88_8BDF_8474_41C1_528F2DBF6255",
  "this.overlay_DF1939DD_F7DC_714D_41E5_5CA6EE340FBA"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 151.31,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B0E57B5E_A047_3CD2_41E1_7B76161828F7"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -150.42,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AF81EE66_A047_34F2_41D8_E6549786C33A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -149.89,
   "backwardYaw": 96.4,
   "distance": 1,
   "panorama": "this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 78.7,
   "backwardYaw": -101.04,
   "distance": 1,
   "panorama": "this.panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9"
  }
 ],
 "hfov": 360,
 "label": "san-bong",
 "id": "panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D",
 "thumbnailUrl": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_A1764E40_8BEB_84F5_41B3_6B2572A0655A",
  "this.overlay_A28EDA27_8BF7_8CBC_41DC_89389C917486"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 72.76,
   "backwardYaw": -137.06,
   "distance": 1,
   "panorama": "this.panorama_F954B244_F73C_7A79_41E5_028FB682D8D8"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -66.39,
   "backwardYaw": 153.42,
   "distance": 1,
   "panorama": "this.panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 0.67,
   "backwardYaw": 144.75,
   "distance": 1,
   "panorama": "this.panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80"
  }
 ],
 "hfov": 360,
 "label": "gd3(2)",
 "id": "panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA",
 "thumbnailUrl": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_FDF2FB87_F26B_0FDE_41E9_31B49E166047",
  "this.overlay_F8B11397_F73C_7A07_41E5_577BB1CFD9AF",
  "this.overlay_E79421D5_F735_F61B_41A9_DF332478B2C3",
  "this.overlay_E11200C8_F755_F609_41C7_A2B714B7246A"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -101.3,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AFFECA9E_A047_3C52_41DD_C82FBCF84A77"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -15.13,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B0455AF2_A047_3DD2_41C4_96C0D656686B"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -113.93,
   "backwardYaw": 72.89,
   "distance": 1,
   "panorama": "this.panorama_D568A391_F74C_51D4_41EB_EA36557FA15B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -119.57,
   "backwardYaw": 0.65,
   "distance": 1,
   "panorama": "this.panorama_D2503D71_F73C_7155_41CF_7ED250A076A7"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 66.01,
   "backwardYaw": -109.62,
   "distance": 1,
   "panorama": "this.panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874"
  }
 ],
 "hfov": 360,
 "label": "gd2-tang3-giua",
 "id": "panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32",
 "thumbnailUrl": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_E8A11030_F74C_4ED3_41E6_ED7A1199BEE8",
  "this.overlay_D7802BC8_F74C_31B3_41BC_DCA06B29E623",
  "this.overlay_D3E8C2F0_F73C_D354_41ED_D560529CC180"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 132.37,
   "backwardYaw": 35.75,
   "distance": 1,
   "panorama": "this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -82.47,
   "backwardYaw": 72.19,
   "distance": 1,
   "panorama": "this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -2.93,
   "backwardYaw": -149.26,
   "distance": 1,
   "panorama": "this.panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3"
  }
 ],
 "hfov": 360,
 "label": "nha-an",
 "id": "panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24",
 "thumbnailUrl": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_989BDC54_8AED_849C_41D1_7E0A1E9C1954",
  "this.overlay_99D7041B_8AED_8494_41D4_DAE3B054A46A",
  "this.overlay_A80968E8_8BAB_8DB4_41DC_8334EBC6B1B9"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 81.96,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B0694B13_A047_3C52_41E0_0ABE7E419FEC"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -28.84,
   "backwardYaw": 170.28,
   "distance": 1,
   "panorama": "this.panorama_9A53D395_8A77_839C_41C8_70478C88A4B1"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -141.75,
   "backwardYaw": 58.26,
   "distance": 1,
   "panorama": "this.panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_98AA559B_8A76_8794_41CA_9930712915C9",
 "thumbnailUrl": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_t.jpg",
 "label": "duong-ra-gd2",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_9AFB2D4D_8A77_848C_41D2_347C1282F452",
  "this.overlay_9AE171BE_8A55_BF8C_41D0_5A83BCC834EA"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 3.61,
   "backwardYaw": -117.61,
   "distance": 1,
   "panorama": "this.panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874"
  }
 ],
 "hfov": 360,
 "label": "2301",
 "id": "panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B",
 "thumbnailUrl": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_D44CEBBD_F73C_D1CD_41ED_05A6850C74BB"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 87.97,
   "backwardYaw": -26.92,
   "distance": 1,
   "panorama": "this.panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197",
 "thumbnailUrl": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_t.jpg",
 "label": "lab 3",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_BA16E433_AB5A_A63A_41E2_A8331651CF81"
 ]
},
{
 "class": "PanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "mouseControlMode": "drag_acceleration"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 75.75,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AFAAAAE1_A047_3DEE_41B9_350356F733EC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -50.01,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B2712C50_A047_342E_41E1_DFC596A3C702"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 95.89,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AFF99E2B_A047_3472_41E0_971DF7A00DD0"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 78.96,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B02BFB3D_A047_3C56_41DF_EA9AF11F2ACC"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 174.29,
   "backwardYaw": -68.26,
   "distance": 1,
   "panorama": "this.panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 174.29,
   "backwardYaw": -68.26,
   "distance": 1,
   "panorama": "this.panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 9.44,
   "backwardYaw": -138.8,
   "distance": 1,
   "panorama": "this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 9.44,
   "backwardYaw": -138.8,
   "distance": 1,
   "panorama": "this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D",
 "thumbnailUrl": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_t.jpg",
 "label": "hanh-lang-t2(gd3)",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_9C02CD5B_8A6E_8494_4194_A73D90358E30",
  "this.overlay_9D9D5651_8A6E_8497_41E1_2CF958B9144C"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 78.47,
   "backwardYaw": -121.57,
   "distance": 1,
   "panorama": "this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0"
  }
 ],
 "hfov": 360,
 "label": "loi-vao-y-te",
 "id": "panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D",
 "thumbnailUrl": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_AEE8D29D_8BDA_9D8C_41BD_12D9A9D26C17"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -60.57,
   "backwardYaw": 129.99,
   "distance": 1,
   "panorama": "this.panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973"
  }
 ],
 "hfov": 360,
 "label": "san-choi-gd2",
 "id": "panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3",
 "thumbnailUrl": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_F66BAD34_EE3A_5AD8_41D3_48C11B7BE167"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 166.15,
   "backwardYaw": -22.12,
   "distance": 1,
   "panorama": "this.panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -28.69,
   "backwardYaw": 166.49,
   "distance": 1,
   "panorama": "this.panorama_9607D4FC_9906_6A31_41DB_47B84633749D"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 0.15,
   "backwardYaw": -82.93,
   "distance": 1,
   "panorama": "this.panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE"
  }
 ],
 "hfov": 360,
 "label": "tap-hoa-truong-sinh",
 "id": "panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498",
 "thumbnailUrl": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_9DFE9795_8EFD_02FB_41B0_C13762D26A96",
  "this.overlay_96E6407B_9902_6A37_4197_4BF3FFE74B17",
  "this.overlay_F9B04FA7_F65A_D381_41B3_D2CCE64F27FC"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 30.74,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B1058BBA_A047_3C52_41DD_0C1A20771BB6"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -25.85,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B06A2EBC_A047_3456_41E2_2903CE405A8C"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 97.53,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AFD71A7D_A047_3CD6_41DD_12D4C6159918"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -79.4,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B25F2C30_A047_346E_41D8_93183C9D3A10"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -92.03,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B2C5FCBB_A047_3452_41C0_95B8547EEA4B"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 78.14,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B15DFB91_A047_3C2F_41D7_E6F572DCEC31"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 67.01,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AF9E9AB8_A047_3C5E_41BE_2AE11ABE4C2E"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -18.8,
   "backwardYaw": -147.1,
   "distance": 1,
   "panorama": "this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -104.25,
   "backwardYaw": 75.76,
   "distance": 1,
   "panorama": "this.panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 76.5,
   "backwardYaw": -82.6,
   "distance": 1,
   "panorama": "this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 159.54,
   "backwardYaw": -18.96,
   "distance": 1,
   "panorama": "this.panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE",
 "thumbnailUrl": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_t.jpg",
 "label": "sanh-truoc-cong",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_9E8F46DC_8EF2_6347_41D8_5B734F8F231E",
  "this.overlay_9D8C7789_8EF1_A1CE_41DB_9234ACC09764",
  "this.overlay_9D4E159B_8EFE_61C2_41CE_9CB1A99A8802",
  "this.overlay_9E8004C1_901A_297D_41B8_49C279D33A85"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 156.5,
   "backwardYaw": 11.43,
   "distance": 1,
   "panorama": "this.panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8"
  }
 ],
 "hfov": 360,
 "label": "3103",
 "id": "panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6",
 "thumbnailUrl": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_E4C547F2_F755_DA19_41ED_4DD67C07BF49"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 156.97,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B2AA7D04_A047_3436_41A0_1809B739DAD2"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -148.63,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B2243C9B_A047_3452_418A_E446196217DC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 38.25,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B01D7B1B_A047_3C52_41CB_68DA99E0DD5D"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 35.75,
   "backwardYaw": 132.37,
   "distance": 1,
   "panorama": "this.panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -147.1,
   "backwardYaw": -18.8,
   "distance": 1,
   "panorama": "this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 15.72,
   "backwardYaw": 93.68,
   "distance": 1,
   "panorama": "this.panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 96.4,
   "backwardYaw": -149.89,
   "distance": 1,
   "panorama": "this.panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B",
 "thumbnailUrl": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_t.jpg",
 "label": "duong-ra-nha-the-chat",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_9849939E_8AD5_838C_41D5_9634A799D874",
  "this.overlay_98C54FFB_8AD6_8394_41CB_74D38D036313",
  "this.overlay_A3835255_8BF6_FC9C_41C7_83A288C30B73",
  "this.overlay_DBD298B8_D4EE_94B4_41E8_68D808BE8B0D"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -10.78,
   "backwardYaw": 169.08,
   "distance": 1,
   "panorama": "this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0"
  }
 ],
 "hfov": 360,
 "label": "gd3(3)",
 "id": "panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D",
 "thumbnailUrl": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_E5726209_F66A_4C81_41C1_1FD16365470C",
  "this.overlay_E154815B_F75C_760F_41E2_D6D16B9EAC90"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 76.2,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B2128C6B_A047_34F2_41C1_45FFF298FBE3"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -150.1,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AF85CAC0_A047_3C2E_41D9_900BEA8760BF"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -133.55,
   "backwardYaw": -37.86,
   "distance": 1,
   "panorama": "this.panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6"
  }
 ],
 "hfov": 360,
 "label": "phong-giat",
 "id": "panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258",
 "thumbnailUrl": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_DE5FF7C7_F7D4_D1BC_41E6_7F9B947C4895"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 63.85,
   "backwardYaw": -18.5,
   "distance": 1,
   "panorama": "this.panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 72.56,
   "backwardYaw": 25.13,
   "distance": 1,
   "panorama": "this.panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8"
  }
 ],
 "hfov": 360,
 "label": "gd2-t2-dau-hanh-lang",
 "id": "panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E",
 "thumbnailUrl": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_EC119B1F_F74C_2A07_4176_B8500BFA043F",
  "this.overlay_EB09CA86_F75B_D3BC_41B1_16CDE58C480F"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -114.31,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AFE3EE33_A047_3452_4194_91115FBE377A"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.35,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B3DFED51_A047_342F_41BF_7E47DBEB7685"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -24.57,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B2628C5E_A047_34D2_41C4_D0585A514079"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 25.13,
   "backwardYaw": 72.56,
   "distance": 1,
   "panorama": "this.panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E"
  }
 ],
 "hfov": 360,
 "label": "phong-nghi-gv-gd2",
 "id": "panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8",
 "thumbnailUrl": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_EBCFE583_F75C_31B5_41D2_FC15981DF128"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_98AA559B_8A76_8794_41CA_9930712915C9"
  }
 ],
 "hfov": 360,
 "label": "san-chao-co",
 "id": "panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E",
 "thumbnailUrl": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_9884097B_8AB6_8C8B_41D4_DC45800586ED"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 70.38,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B3CF5D5A_A047_34D2_41D2_72163B9C7326"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 97.07,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B1AFEC21_A047_3471_41DA_2A0EF6097880"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 160.74,
   "backwardYaw": -21.36,
   "distance": 1,
   "panorama": "this.panorama_9A53D395_8A77_839C_41C8_70478C88A4B1"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -18.96,
   "backwardYaw": 159.54,
   "distance": 1,
   "panorama": "this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162",
 "thumbnailUrl": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_t.jpg",
 "label": "duong-ra-hoi-truong",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_9A46FBB9_8A77_8394_41B5_F012A2BF94B0",
  "this.overlay_9AB240EE_8A7E_9D8C_419E_87B4B1B4BE45"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 151.16,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B035CB2B_A047_3C72_41C8_0BB5F375FA02"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 41.2,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B37B2D1D_A047_3456_41E2_705F95947728"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 129.99,
   "backwardYaw": -60.57,
   "distance": 1,
   "panorama": "this.panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 37.12,
   "backwardYaw": -156.72,
   "distance": 1,
   "panorama": "this.panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7"
  }
 ],
 "hfov": 360,
 "label": "san sau gd2",
 "id": "panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973",
 "thumbnailUrl": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_FB25380F_EE2A_DAC8_41E7_3C219B78ADDF",
  "this.overlay_F60D5E1F_EE3A_76C8_41E8_1C7212E851F0"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 41.2,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B36C8D26_A047_3472_41B9_4E9AE2FD9D32"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -47.63,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B3A3FD92_A047_3452_41D0_DAB860615D9F"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -164.28,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B2B99CFB_A047_35D2_41B2_227EE436C3E7"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -124.07,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B2412C3D_A047_3456_41BE_0E27C3F140DC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -47.06,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AFEEFE3B_A047_3452_41D8_52D30505EE55"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -118.75,
   "backwardYaw": 70.62,
   "distance": 1,
   "panorama": "this.panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -44.69,
   "backwardYaw": -35.43,
   "distance": 1,
   "panorama": "this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 170.91,
   "backwardYaw": -35.43,
   "distance": 1,
   "panorama": "this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8"
  }
 ],
 "hfov": 360,
 "label": "tang-2-gd3",
 "id": "panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3",
 "thumbnailUrl": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_9E7ECB73_8AF6_8C94_41E0_45187CD5833D",
  "this.overlay_9D7214FB_8AF5_8594_41B8_462C87745F99",
  "this.overlay_9F40C392_8AFE_8394_4190_9E0D3C1056E4"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -144.25,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B1620BAA_A047_3C7D_41AA_0C3FF477BFF8"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -137.06,
   "backwardYaw": 72.76,
   "distance": 1,
   "panorama": "this.panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA"
  }
 ],
 "hfov": 360,
 "label": "3101",
 "id": "panorama_F954B244_F73C_7A79_41E5_028FB682D8D8",
 "thumbnailUrl": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_F84A4B05_F73C_6BFB_41DC_34507F8D7A18"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 113.42,
   "backwardYaw": -155.18,
   "distance": 1,
   "panorama": "this.panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -138.8,
   "backwardYaw": 9.44,
   "distance": 1,
   "panorama": "this.panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 88.16,
   "backwardYaw": -117.45,
   "distance": 1,
   "panorama": "this.panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -46.96,
   "backwardYaw": 60.53,
   "distance": 1,
   "panorama": "this.panorama_93F12805_8A6E_8C7C_41D9_78F983707124"
  }
 ],
 "hfov": 360,
 "label": "hanh-lang-gd3(t2)",
 "id": "panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52",
 "thumbnailUrl": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_9C8882CF_8A5A_9D8C_41C8_C30CA2A0F909",
  "this.overlay_93CC75D5_8A6A_879C_41CA_194F9C585764",
  "this.overlay_932122C3_8A6E_9DF4_4199_47069396E3D6",
  "this.overlay_96FECD3A_8A5D_8495_41BE_CF36D02B261C"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 111.74,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B34B1D14_A047_3456_41D8_37C85C471C6E"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 133.04,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AFBF0AD0_A047_3C2E_41CE_8B4426FBF86B"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA"
  }
 ],
 "hfov": 360,
 "label": "3104",
 "id": "panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA",
 "thumbnailUrl": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_E23B08CF_F75C_5607_41C6_7922C7579C77"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 52.98,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B04B6AFB_A047_3DD2_41DC_F2FF37AFAFA4"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 169.22,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AFE83E44_A047_3436_41CD_B11FC3822F8F"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -21.36,
   "backwardYaw": 160.74,
   "distance": 1,
   "panorama": "this.panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 170.28,
   "backwardYaw": -28.84,
   "distance": 1,
   "panorama": "this.panorama_98AA559B_8A76_8794_41CA_9930712915C9"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E"
  }
 ],
 "hfov": 360,
 "partial": false,
 "id": "panorama_9A53D395_8A77_839C_41C8_70478C88A4B1",
 "thumbnailUrl": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_t.jpg",
 "label": "duong-ra-gd1",
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_9A773555_8A7E_849C_41D0_CAEC999E252E",
  "this.overlay_9A030052_8A76_BC94_41B2_1C27958BDB43",
  "this.overlay_98B10DCE_8ABB_878C_41B9_B0DC6841817A"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -22.12,
   "backwardYaw": 166.15,
   "distance": 1,
   "panorama": "this.panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 75.76,
   "backwardYaw": -104.25,
   "distance": 1,
   "panorama": "this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 155.43,
   "backwardYaw": 37.4,
   "distance": 1,
   "panorama": "this.panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7"
  }
 ],
 "hfov": 360,
 "label": "nga 4 thang cong",
 "id": "panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F",
 "thumbnailUrl": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "height": 2560
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "height": 1536
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_t.jpg"
  }
 ],
 "vfov": 180,
 "hfovMin": "135%",
 "overlays": [
  "this.overlay_965EC472_8BAA_8495_41DB_0E56FFA763DA",
  "this.overlay_9F18DD27_8EFB_0627_41D8_353810C63A0C",
  "this.overlay_FF1277AA_EE6A_75C8_41BF_A2C9CDBE8A9E"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -172.83,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B2D5BCA8_A047_347E_41C4_F80138FD8DCB"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -106.55,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B298ACEA_A047_35F2_41D3_CDE90FA62EDC"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 158.64,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AF33EA59_A047_3CDE_41C4_0E89F4A93034"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -83.6,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B0392B34_A047_3C56_41D9_53203260E6CA"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 113.61,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B137BBC3_A047_3C32_41E0_88C10D0C264F"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -79.36,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AF8A1AC8_A047_3C3E_41C0_D35C98D41E04"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_98AA559B_8A76_8794_41CA_9930712915C9_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 135.31,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_AFC85A96_A047_3C52_41DC_62D9DF8C6869"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -23.5,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B1386BCB_A047_3C32_41CE_3E7E2D2F7EA7"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_93F12805_8A6E_8C7C_41D9_78F983707124_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -149.91,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_B31D6D2E_A047_3472_41E0_4EF8B8302C5C"
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "minHeight": 50,
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "minWidth": 100,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "height": "100%",
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "class": "ViewerArea",
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "shadow": false,
 "playbackBarBorderSize": 0,
 "toolTipShadowHorizontalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Arial",
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "paddingRight": 0,
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
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0, this.camera_B2412C3D_A047_3456_41BE_0E27C3F140DC); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.23,
   "pitch": -45.42,
   "yaw": -143.07,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A4BD353A_8BEA_8494_41D2_0D32CF4EBD7A",
   "distance": 50
  }
 ],
 "id": "overlay_AD14AE1B_8BD5_848B_41C2_AA339EA90EA3",
 "maps": [
  {
   "hfov": 7.23,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -143.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -45.42
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B, this.camera_B07F5B03_A047_3C32_41CB_3ED45E3A5562); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Arrow 02 Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.02,
   "pitch": -1.7,
   "yaw": -40.26,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_980E40B4_8ADE_BD9C_41D6_288FD71EEFB0",
   "distance": 50
  }
 ],
 "id": "overlay_983ED8A9_8ADD_8DB4_41DB_0D3888138C17",
 "maps": [
  {
   "hfov": 10.02,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -40.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.7
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007, this.camera_B15DFB91_A047_3C2F_41D7_E6F572DCEC31); this.mainPlayList.set('selectedIndex', 35)"
  }
 ],
 "data": {
  "label": "Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.35,
   "pitch": -19.23,
   "yaw": 70.5,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_D27CDC16_F754_D6DC_41DC_09FF65CDB8F6",
   "distance": 100
  }
 ],
 "id": "overlay_E9DF26FB_F754_5355_41E9_0F13ABAAFE39",
 "maps": [
  {
   "hfov": 7.35,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 70.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -19.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32, this.camera_B0BAFB80_A047_3C2E_41A0_B3FCEA8380E6); this.mainPlayList.set('selectedIndex', 55)"
  }
 ],
 "data": {
  "label": "Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.25,
   "pitch": -9.57,
   "yaw": -109.62,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DB810FBC_F734_31CC_41C8_7A4EA548AEF9",
   "distance": 100
  }
 ],
 "id": "overlay_E83B24B1_F74D_D7D5_41EB_EAA8762DAC28",
 "maps": [
  {
   "hfov": 11.25,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -109.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -9.57
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B, this.camera_B0ACBB88_A047_3C3E_41D2_4DE3DD1C1244); this.mainPlayList.set('selectedIndex', 57)"
  }
 ],
 "data": {
  "label": "Arrow 02c Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.96,
   "pitch": -22.62,
   "yaw": -117.61,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DB818FBC_F734_31CC_41E8_F7D109FFB6C5",
   "distance": 50
  }
 ],
 "id": "overlay_D3F7AD13_F734_56D5_41E6_45E99A7165E2",
 "maps": [
  {
   "hfov": 8.96,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -117.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -22.62
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B, this.camera_B2B99CFB_A047_35D2_41B2_227EE436C3E7); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.24,
   "pitch": -4.32,
   "yaw": 93.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C7DEF625_D4ED_9F5C_41D5_A3FB355C927D",
   "distance": 100
  }
 ],
 "id": "overlay_C44A83DA_D4EF_94F4_41E2_CA8F8F6EA37F",
 "maps": [
  {
   "hfov": 3.24,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 93.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -4.32
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8, this.camera_B2AA7D04_A047_3436_41A0_1809B739DAD2); this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.61,
   "pitch": -12.15,
   "yaw": -43.38,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EFCC4465_F754_DE3B_41D4_2D98D4E404C6",
   "distance": 100
  }
 ],
 "id": "overlay_C5D33580_D4F7_7D54_41A0_C8ABCFA5942E",
 "maps": [
  {
   "hfov": 7.61,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -43.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -12.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498, this.camera_B288DCF3_A047_35D2_41C5_296400B4FE8F); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.11,
   "pitch": -8.19,
   "yaw": -82.93,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E3B832A4_F65A_4D87_41DC_9FE28D289D9F",
   "distance": 100
  }
 ],
 "id": "overlay_F89D9039_F65E_4C81_41EB_0D6F3ABA0159",
 "maps": [
  {
   "hfov": 6.11,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -82.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -8.19
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3, this.camera_AFE3EAA6_A047_3C72_41C3_D8011787D056); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.92,
   "pitch": -17.28,
   "yaw": 70.62,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9F7EF540_8AFD_84F4_41DB_E5BBEFF93254",
   "distance": 100
  }
 ],
 "id": "overlay_9FD72DA2_8AFD_87B4_41C1_4D812AA89815",
 "maps": [
  {
   "hfov": 10.92,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 70.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -17.28
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52, this.camera_AFEA6AAF_A047_3C72_41D3_49574D0C1C27); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.22,
   "pitch": -11.31,
   "yaw": -117.45,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_932B2554_8A5D_849C_41DE_3FBD649B3CC4",
   "distance": 100
  }
 ],
 "id": "overlay_9CB8EB1E_8A5E_8C8C_41D8_C73EEC332F7A",
 "maps": [
  {
   "hfov": 11.22,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -117.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -11.31
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D568A391_F74C_51D4_41EB_EA36557FA15B, this.camera_AF9E9AB8_A047_3C5E_41BE_2AE11ABE4C2E); this.mainPlayList.set('selectedIndex', 56)"
  }
 ],
 "data": {
  "label": "Arrow Transparent Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.13,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 115,
      "height": 116
     }
    ]
   },
   "pitch": -5.82,
   "yaw": 3.53
  }
 ],
 "id": "overlay_D273FA0C_F73C_F2CC_41ED_9D8D4B1E8D65",
 "maps": [
  {
   "hfov": 6.13,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 3.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -5.82
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9A8FB739_8A6A_8497_41AB_D0C15E31E1E9, this.camera_81E543EC_903E_6F0B_41DE_094D48B9170A)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.11,
   "pitch": -5.99,
   "yaw": 60.6,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AB293999_8BBD_8F94_41BE_DEC0ED489E28",
   "distance": 100
  }
 ],
 "id": "overlay_957760EE_8BBB_FD8C_41D7_2981D49F5313",
 "maps": [
  {
   "hfov": 4.11,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 60.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -5.99
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49, this.camera_AFE3EE33_A047_3452_4194_91115FBE377A); this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.21,
   "pitch": -15.6,
   "yaw": -127.02,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AA266A4A_8BB6_8CF4_41DC_AEC41F186E44",
   "distance": 100
  }
 ],
 "id": "overlay_94C04A93_8BBA_8D94_41E0_864608603980",
 "maps": [
  {
   "hfov": 4.21,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -127.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -15.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC, this.camera_AFF99E2B_A047_3472_41E0_971DF7A00DD0); this.mainPlayList.set('selectedIndex', 51)"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.26,
   "pitch": -49.59,
   "yaw": 164.87,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EF7B2BFF_F774_2A07_41DA_8C9D454F87F5",
   "distance": 100
  }
 ],
 "id": "overlay_E097B2DB_F74C_DA0F_41CF_72296D0FD4DF",
 "maps": [
  {
   "hfov": 11.26,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 164.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -49.59
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7, this.camera_AFEEFE3B_A047_3452_41D8_52D30505EE55); this.mainPlayList.set('selectedIndex', 40)"
  }
 ],
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.05,
   "pitch": -6.66,
   "yaw": -103.8,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F87E7FCC_EE5A_5548_41C1_9DDCB598C27A",
   "distance": 50
  }
 ],
 "id": "overlay_FDA62D05_EE5A_7AB8_41D0_01821B1EA0DA",
 "maps": [
  {
   "hfov": 8.05,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -103.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -6.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B, this.camera_B31D6D2E_A047_3472_41E0_4EF8B8302C5C); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Arrow 02c Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.93,
   "pitch": -9.33,
   "yaw": -70.08,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_03E41E1A_0D83_B5B2_41A9_EAD3109E8ADE",
   "distance": 50
  }
 ],
 "id": "overlay_003ADEF7_0D84_9271_4166_F346A4B07D23",
 "maps": [
  {
   "hfov": 16.93,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -70.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -9.33
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE, this.camera_B129CBD4_A047_33D6_41C3_99CF39B8599F); this.mainPlayList.set('selectedIndex', 38)"
  }
 ],
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.96,
   "pitch": -39.38,
   "yaw": -23.03,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C2F447E7_D4F5_FCDC_4178_73DB747B1D60",
   "distance": 50
  }
 ],
 "id": "overlay_C6D274E8_D4F6_BCD4_41D5_132B824F8903",
 "maps": [
  {
   "hfov": 7.96,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -23.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -39.38
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA, this.camera_B137BBC3_A047_3C32_41E0_88C10D0C264F); this.mainPlayList.set('selectedIndex', 44)"
  }
 ],
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.57,
   "pitch": -33.63,
   "yaw": 153.42,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E0325AE2_F26B_0956_41D9_A1B84A853CEA",
   "distance": 50
  }
 ],
 "id": "overlay_FC2BA2D5_F26D_1972_41BD_B50311D3B4E7",
 "maps": [
  {
   "hfov": 8.57,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 153.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -33.63
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6, this.camera_B1386BCB_A047_3C32_41CE_3E7E2D2F7EA7); this.mainPlayList.set('selectedIndex', 48)"
  }
 ],
 "data": {
  "label": "Arrow 02c Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.85,
   "pitch": -42.67,
   "yaw": 11.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E0FDB986_F754_F6F9_41E0_2FB327B3CE54",
   "distance": 50
  }
 ],
 "id": "overlay_E3502D29_F754_2E0B_41E4_E74DC402E0EB",
 "maps": [
  {
   "hfov": 15.85,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 11.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -42.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C, this.camera_B0455AF2_A047_3DD2_41C4_96C0D656686B); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "data": {
  "label": "Arrow Transparent Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.15,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 115,
      "height": 115
     }
    ]
   },
   "pitch": -3.07,
   "yaw": -84.11
  }
 ],
 "id": "overlay_E09C8918_F774_7609_41E0_8341C81AD393",
 "maps": [
  {
   "hfov": 6.15,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -84.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C, this.camera_B04B6AFB_A047_3DD2_41DC_F2FF37AFAFA4); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.84,
   "pitch": -12.27,
   "yaw": 65.69,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AA265A4A_8BB6_8CF4_41D9_5D0BF88EB7FF",
   "distance": 100
  }
 ],
 "id": "overlay_A9AE2D43_8BB7_84F4_41DF_81F8D65C7E95",
 "maps": [
  {
   "hfov": 6.84,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 65.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -12.27
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A, this.camera_B06A2EBC_A047_3456_41E2_2903CE405A8C); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.97,
   "pitch": -8.15,
   "yaw": -33.85,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_93A38A9F_8A5A_8D8C_41D6_C514AA7FA387",
   "distance": 100
  }
 ],
 "id": "overlay_9C141389_8A5A_9C74_41E0_DEE041939AF8",
 "maps": [
  {
   "hfov": 9.97,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -33.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -8.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE, this.camera_B0703EA9_A047_347E_41DB_37EF01A7A693); this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "data": {
  "label": "Arrow 02b Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.58,
   "pitch": -14.88,
   "yaw": -82.6,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_37A08258_3AAA_549E_41B2_DC80153A25AA",
   "distance": 50
  }
 ],
 "id": "overlay_344E1F13_3AA4_DE98_41C8_1BDB57B10DED",
 "maps": [
  {
   "hfov": 16.58,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -82.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -14.88
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21, this.camera_B01F8EC5_A047_3436_41D2_B23C31BE5BE4); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.28,
   "pitch": -14.52,
   "yaw": 159.92,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_37A01258_3AAA_549E_4193_717ABEBE36D5",
   "distance": 100
  }
 ],
 "id": "overlay_35F7FC29_3AA4_C289_41C7_5948E020D0E1",
 "maps": [
  {
   "hfov": 16.28,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 159.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -14.52
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011, this.camera_B0664EB2_A047_3452_41C6_48EC84D982AC); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "data": {
  "label": "Arrow 02b Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.86,
   "pitch": -22.4,
   "yaw": 30.09,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_37BFA25A_3AAA_5492_41BD_71C7D7C4AA36",
   "distance": 50
  }
 ],
 "id": "overlay_3509AC99_3AA7_C388_41C3_23B3FC25C175",
 "maps": [
  {
   "hfov": 15.86,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 30.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0_HS_6_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -22.4
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF, this.camera_B25F2C30_A047_346E_41D8_93183C9D3A10); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.32,
   "pitch": -52.15,
   "yaw": 7.17,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_87935D76_9016_5B04_41DA_4BB6A4937024",
   "distance": 50
  }
 ],
 "id": "overlay_83EE6C1C_9016_7904_41BB_C3CF35196CB6",
 "maps": [
  {
   "hfov": 6.32,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 7.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -52.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32, this.camera_B106C9FF_A047_3FD3_41DE_EABF90C338EF); this.mainPlayList.set('selectedIndex', 55)"
  }
 ],
 "data": {
  "label": "Arrow Transparent Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.83,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 127,
      "height": 129
     }
    ]
   },
   "pitch": -4.61,
   "yaw": 0.65
  }
 ],
 "id": "overlay_D37510B0_F73C_4FD3_41E2_6CB48AD4AEE1",
 "maps": [
  {
   "hfov": 6.83,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -4.61
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2, this.camera_B30ECD36_A047_3452_41D3_08E38C7BA4BC); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.65,
   "pitch": -24.95,
   "yaw": -149.78,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_85A1FDF3_91C2_F793_4191_4C166E39CB00",
   "distance": 50
  }
 ],
 "id": "overlay_9F7DE400_91CE_B46D_41B5_E94971CE1E48",
 "maps": [
  {
   "hfov": 5.65,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -149.78,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -24.95
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874, this.camera_B33E3D3E_A047_3452_41D7_1AD8258C0822); this.mainPlayList.set('selectedIndex', 54)"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.57,
   "pitch": -30.18,
   "yaw": -101.86,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_D2682C10_F754_D6D4_41E0_B959E31B8252",
   "distance": 100
  }
 ],
 "id": "overlay_EAFF6493_F754_77D4_416D_48AF183C1168",
 "maps": [
  {
   "hfov": 11.57,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -101.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -30.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8, this.camera_B089FB77_A047_3CD2_41CF_8B721990C63C); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.64,
   "pitch": -15.56,
   "yaw": 70.41,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_920075A2_8AFB_87B4_41DF_73F24B1E3859",
   "distance": 100
  }
 ],
 "id": "overlay_9FC74F80_8AFA_8475_41D3_C846F7AB24EC",
 "maps": [
  {
   "hfov": 8.64,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 70.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -15.56
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36, this.camera_AF8A3E6F_A047_34F3_41C3_F5FEDDB5A0AD); this.mainPlayList.set('selectedIndex', 33)"
  }
 ],
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.66,
   "pitch": -23.46,
   "yaw": -98.04,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AB28C99E_8BBD_8F8D_41C1_9111F9EE43FC",
   "distance": 50
  }
 ],
 "id": "overlay_94A79AA9_8BBA_8DB4_41D6_EAE9397D24B5",
 "maps": [
  {
   "hfov": 6.66,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -98.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -23.46
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007, this.camera_AFB13E78_A047_34DD_41B9_A1C66FBD66CD); this.mainPlayList.set('selectedIndex', 35)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.34,
   "pitch": -26.19,
   "yaw": -159.4,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_85A95DEA_91C2_F7BD_41E0_811163682743",
   "distance": 100
  }
 ],
 "id": "overlay_81866D9B_91C3_9793_4189_808E9F82BEA7",
 "maps": [
  {
   "hfov": 4.34,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -159.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -26.19
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E, this.camera_AFA64E80_A047_342D_41D1_FA2409A051A5); this.mainPlayList.set('selectedIndex', 52)"
  }
 ],
 "data": {
  "label": "Arrow 02b Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.36,
   "pitch": -33.2,
   "yaw": -18.5,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EA3CFC75_F74C_6E1B_41E8_92CE0AC0CCD9",
   "distance": 50
  }
 ],
 "id": "overlay_EDE6F085_F74C_56FB_419E_FE88E4D5F8F2",
 "maps": [
  {
   "hfov": 14.36,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -18.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -33.2
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2, this.camera_B0694B13_A047_3C52_41E0_0ABE7E419FEC); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.75,
   "pitch": -41.16,
   "yaw": 129.9,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_85BBCCB9_900A_590C_41DE_E43A33CBD14F",
   "distance": 50
  }
 ],
 "id": "overlay_823FAB5C_900A_FF04_41DD_2393E5CA09F0",
 "maps": [
  {
   "hfov": 7.75,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 129.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -41.16
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_98AA559B_8A76_8794_41CA_9930712915C9, this.camera_B01D7B1B_A047_3C52_41CB_68DA99E0DD5D); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.73,
   "pitch": -47.48,
   "yaw": 58.26,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_85BB5CB9_900A_590C_41D8_2E3084509082",
   "distance": 100
  }
 ],
 "id": "overlay_826DFCB6_900B_F904_41A1_1CAA12B5FD4E",
 "maps": [
  {
   "hfov": 7.73,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 58.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -47.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.06,
   "pitch": -28.4,
   "yaw": -112.44,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_85BB6CB9_900A_590C_41D1_82AE9A539C7B",
   "distance": 100
  }
 ],
 "id": "overlay_823C3D2F_900A_3B05_41DF_C3A3475B6D00",
 "maps": [
  {
   "hfov": 10.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -112.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -28.4
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52, this.camera_AFBF0AD0_A047_3C2E_41CE_8B4426FBF86B); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.48,
   "pitch": -23.59,
   "yaw": 60.53,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AAD36620_8A56_84B4_41CA_F5FDD7DA9EFE",
   "distance": 100
  }
 ],
 "id": "overlay_90C4B3BC_8A6F_838D_41D4_35D87BEAF76C",
 "maps": [
  {
   "hfov": 10.48,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 60.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -23.59
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF, this.camera_AF85CAC0_A047_3C2E_41D9_900BEA8760BF); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.13,
   "pitch": -18.79,
   "yaw": -117.42,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AAD38620_8A56_84B4_41DA_7933CB071328",
   "distance": 100
  }
 ],
 "id": "overlay_90497676_8A6A_849C_41C9_773C5422DBE9",
 "maps": [
  {
   "hfov": 5.13,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -117.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -18.79
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26, this.camera_AF8A1AC8_A047_3C3E_41C0_D35C98D41E04); this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.76,
   "pitch": -56.57,
   "yaw": 29.58,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AAD01620_8A56_84B4_41D0_14F5FD121C53",
   "distance": 50
  }
 ],
 "id": "overlay_9064CA68_8A55_8CB4_41D4_0075298C0116",
 "maps": [
  {
   "hfov": 5.76,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 29.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -56.57
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_992EFE19_8AEE_8497_41C5_7168906A82C4, this.camera_AFDE7A85_A047_3C36_41E2_8EDBE9EF8766); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.28,
   "pitch": -36.5,
   "yaw": -73.27,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_984DFBE3_8AEE_83B4_41DA_68B0766C486A",
   "distance": 50
  }
 ],
 "id": "overlay_994472FB_8AEF_9D94_41C9_4C74606797A9",
 "maps": [
  {
   "hfov": 8.28,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -73.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -36.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24, this.camera_AFD71A7D_A047_3CD6_41DD_12D4C6159918); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.12,
   "pitch": -13.5,
   "yaw": 72.19,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9D30BD47_8AF7_84FC_41DF_190BB9667E47",
   "distance": 100
  }
 ],
 "id": "overlay_9FC813FB_8AEB_8394_41C3_0CC4FD936293",
 "maps": [
  {
   "hfov": 11.12,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 72.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -13.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3, this.camera_AFC37A8D_A047_3C36_41D8_CCF05EF70550); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.78,
   "pitch": -18.24,
   "yaw": -35.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9D30CD47_8AF7_84FC_41CB_B4F7BAC37590",
   "distance": 100
  }
 ],
 "id": "overlay_9EC727B2_8AF6_8395_41DE_1E4760939A10",
 "maps": [
  {
   "hfov": 8.78,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -35.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -18.24
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3, this.camera_AFC85A96_A047_3C52_41DC_62D9DF8C6869); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.86,
   "pitch": -15.22,
   "yaw": 145.98,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9D307D47_8AF7_84FC_41B0_0E9734180834",
   "distance": 100
  }
 ],
 "id": "overlay_9E396B89_8AF6_8C74_41C2_5A7A8C489008",
 "maps": [
  {
   "hfov": 7.86,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 145.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -15.22
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D, this.camera_AFFECA9E_A047_3C52_41DD_C82FBCF84A77); this.mainPlayList.set('selectedIndex', 30)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.62,
   "pitch": -12.63,
   "yaw": -101.04,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9FD4E991_8ED5_0EFB_41AF_D4203E464BEC",
   "distance": 100
  }
 ],
 "id": "overlay_A3B10469_8BEB_84B4_41D4_4334453C455A",
 "maps": [
  {
   "hfov": 5.62,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -101.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -12.63
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32, this.camera_AF26CA6B_A047_3CF3_41C5_13A0A7D437C8); this.mainPlayList.set('selectedIndex', 55)"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.72,
   "pitch": -17.49,
   "yaw": 72.89,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DEAE8504_F734_F6B3_41D7_BC18FC975411",
   "distance": 100
  }
 ],
 "id": "overlay_D6907DD0_F74C_D153_41C5_713CB9725137",
 "maps": [
  {
   "hfov": 11.72,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 72.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -17.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271, this.camera_AF201A74_A047_3CD5_41D0_A67B3A4A0DDA); this.mainPlayList.set('selectedIndex', 59)"
  }
 ],
 "data": {
  "label": "Arrow 02c Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.9,
   "pitch": -22.6,
   "yaw": -112.99,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_D9C41685_F7CD_D3BC_41A7_24C12A4438F2",
   "distance": 50
  }
 ],
 "id": "overlay_D226D140_F73C_4EB4_41EB_5CDD1B44B0BF",
 "maps": [
  {
   "hfov": 7.9,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -112.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -22.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3, this.camera_AF86EE5D_A047_34D6_41CD_040DC51BFB1A); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.18,
   "pitch": -5.04,
   "yaw": 73.45,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A4BB953A_8BEA_8494_41C8_F2A5E00D05A9",
   "distance": 100
  }
 ],
 "id": "overlay_AF3591F7_8BDE_BF9C_4162_FE183C34C520",
 "maps": [
  {
   "hfov": 4.18,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 73.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -5.04
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D, this.camera_AF930E4D_A047_3436_41D6_BEBE29FC53BC); this.mainPlayList.set('selectedIndex', 27)"
  }
 ],
 "data": {
  "label": "Arrow 01 Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.67,
   "pitch": -6.5,
   "yaw": -121.57,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A4BA653A_8BEA_8494_41CA_BE20AE199CDB",
   "distance": 50
  }
 ],
 "id": "overlay_AFA1BFAE_8BDB_838C_41C2_43EC2A22C3F0",
 "maps": [
  {
   "hfov": 3.67,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -121.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -6.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21, this.camera_AF9D6E55_A047_34D6_41B8_E04FFE99B343); this.mainPlayList.set('selectedIndex', 28)"
  }
 ],
 "data": {
  "label": "Arrow 01 Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.03,
   "pitch": -3.89,
   "yaw": 55.93,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A4BAF53A_8BEA_8494_41D1_6DEC94950743",
   "distance": 50
  }
 ],
 "id": "overlay_AEA8A5CA_8BD6_87F4_41D6_256A6AB62849",
 "maps": [
  {
   "hfov": 3.03,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 55.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.89
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D, this.camera_AFE83E44_A047_3436_41CD_B11FC3822F8F); this.mainPlayList.set('selectedIndex', 45)"
  }
 ],
 "data": {
  "label": "Arrow 02a"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.13,
   "pitch": -16.78,
   "yaw": 169.08,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E4849000_F66E_4C7F_41DE_3F1DF8D19630",
   "distance": 100
  }
 ],
 "id": "overlay_E40F125B_F66F_CC81_41E0_CF08C1003C27",
 "maps": [
  {
   "hfov": 5.13,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 169.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -16.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_93F12805_8A6E_8C7C_41D9_78F983707124, this.camera_AF81EE66_A047_34F2_41D8_E6549786C33A); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.11,
   "pitch": -17.34,
   "yaw": 100.64,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_960813EE_8A56_838C_41DC_7BF066162034",
   "distance": 50
  }
 ],
 "id": "overlay_963AAF11_8A57_8494_41C2_F2C627F303AC",
 "maps": [
  {
   "hfov": 5.11,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 100.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -17.34
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F, this.camera_B2628C5E_A047_34D2_41C4_D0585A514079); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.23,
   "pitch": -15.56,
   "yaw": 37.4,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F87F4FCB_EE5A_5548_41D7_235FCE3762F5",
   "distance": 100
  }
 ],
 "id": "overlay_FF8A6E7A_EE6A_D748_41AC_D92622DF1FB6",
 "maps": [
  {
   "hfov": 10.23,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 37.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -15.56
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F, this.camera_B2128C6B_A047_34F2_41C1_45FFF298FBE3); this.mainPlayList.set('selectedIndex', 41)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.8,
   "pitch": -19.2,
   "yaw": 132.94,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F87FEFCC_EE5A_5548_41D5_2668F90CDF68",
   "distance": 100
  }
 ],
 "id": "overlay_FCDA8F2A_EE5A_36C8_41C0_76C9A0A00C35",
 "maps": [
  {
   "hfov": 10.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 132.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -19.2
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973, this.camera_B202CC7A_A047_34DD_41E0_E290408E03F6); this.mainPlayList.set('selectedIndex', 42)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.4,
   "pitch": -9.67,
   "yaw": -156.72,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F76C7441_EE2B_CAB8_41DE_A167B9FA9788",
   "distance": 100
  }
 ],
 "id": "overlay_FB8F676A_EE2A_3548_41E2_17E4D68C7D31",
 "maps": [
  {
   "hfov": 6.4,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -156.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -9.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D, this.camera_B10B1A08_A047_3C3D_41D4_039FE127725A); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "data": {
  "label": "Arrow 01 Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.27,
   "pitch": -3.62,
   "yaw": -68.26,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_96D7EE66_8A77_84BD_41E0_089D1A206CA7",
   "distance": 50
  }
 ],
 "id": "overlay_93DA570D_8A76_848C_419D_845F80869E07",
 "maps": [
  {
   "hfov": 10.27,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -68.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.62
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498, this.camera_B0E57B5E_A047_3CD2_41E1_7B76161828F7); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.79,
   "pitch": -19.53,
   "yaw": 166.49,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_8A35EBB0_9902_FE31_41B1_FA696522A3F6",
   "distance": 100
  }
 ],
 "id": "overlay_899A65B3_9903_AA37_41C1_1651E45E3C67",
 "maps": [
  {
   "hfov": 7.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 166.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -19.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B, this.camera_B19D0BFE_A047_33D2_41DA_D30B1267DDF7); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.88,
   "pitch": -46.45,
   "yaw": 154.15,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_93A8876E_8A5A_848D_41E0_22094F5436CF",
   "distance": 100
  }
 ],
 "id": "overlay_9CA7EA66_8A5A_8CBD_41DA_55419E68C239",
 "maps": [
  {
   "hfov": 7.88,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 154.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -46.45
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA, this.camera_AFFECE22_A047_3472_41D6_5D62B45E0228); this.mainPlayList.set('selectedIndex', 44)"
  }
 ],
 "data": {
  "label": "Arrow Black Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.31,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 119,
      "height": 119
     }
    ]
   },
   "pitch": -8.07,
   "yaw": 144.75
  }
 ],
 "id": "overlay_E6CA7F3F_F74C_2A07_41EA_B70C9B9769FF",
 "maps": [
  {
   "hfov": 6.31,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 144.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -8.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_93F12805_8A6E_8C7C_41D9_78F983707124, this.camera_B2F75CCA_A047_343D_41D6_BFF61DB8B69E); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.88,
   "pitch": -31.62,
   "yaw": 29.9,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AAD0B620_8A56_84B4_41D0_E4F2A2B5010B",
   "distance": 100
  }
 ],
 "id": "overlay_902DCA8F_8A6B_8D8C_41D4_2E56962AF3C4",
 "maps": [
  {
   "hfov": 5.88,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 29.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -31.62
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_82BAF319_901A_2F0D_41C4_309B78B0C979, this.camera_B2D5BCA8_A047_347E_41C4_F80138FD8DCB); this.mainPlayList.set('selectedIndex', 34)"
  }
 ],
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.33,
   "pitch": -28.8,
   "yaw": 100.6,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_87987D71_9016_5B1C_41DA_590CF9B5E49A",
   "distance": 50
  }
 ],
 "id": "overlay_83BC2280_9016_29FC_41DB_826793121830",
 "maps": [
  {
   "hfov": 4.33,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 100.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -28.8
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197, this.camera_B2C5FCBB_A047_3452_41C0_95B8547EEA4B); this.mainPlayList.set('selectedIndex', 37)"
  }
 ],
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.19,
   "pitch": -17.19,
   "yaw": -26.92,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_B34CAE30_AB59_A237_41CE_71DF380AA36A",
   "distance": 50
  }
 ],
 "id": "overlay_BA3BD77E_AB5A_622B_41D8_B54E351F8354",
 "maps": [
  {
   "hfov": 4.19,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -26.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -17.19
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52, this.camera_B0DDEB45_A047_3C36_4152_3DAEE28744BC); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.89,
   "pitch": -16.12,
   "yaw": -155.18,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_91E96E22_8A57_84B4_41DF_01428A258E4C",
   "distance": 50
  }
 ],
 "id": "overlay_92B042AA_8A55_BDB4_41BC_2684FB452D8D",
 "maps": [
  {
   "hfov": 3.89,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -155.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -16.12
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258, this.camera_B2343C8D_A047_3437_41E0_FB469C33530D); this.mainPlayList.set('selectedIndex', 61)"
  }
 ],
 "data": {
  "label": "Arrow Transparent Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.87,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 72,
      "height": 95
     }
    ]
   },
   "pitch": 1.71,
   "yaw": -37.86
  }
 ],
 "id": "overlay_DEB60503_F7D4_56B5_41E2_F7383446515F",
 "maps": [
  {
   "hfov": 3.87,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -37.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 21
     }
    ]
   },
   "pitch": 1.71
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3, this.camera_B2243C9B_A047_3452_418A_E446196217DC); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "data": {
  "label": "Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.17,
   "pitch": -4.89,
   "yaw": 71.45,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C4EABCFC_F7D4_3753_419F_3C7C1E0A619E",
   "distance": 100
  }
 ],
 "id": "overlay_DE233E50_F7D4_F353_41E8_8D6616EF9234",
 "maps": [
  {
   "hfov": 6.17,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 71.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -4.89
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24, this.camera_B2E73CD8_A047_35DE_41DB_F546123BE040); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.88,
   "pitch": -11.94,
   "yaw": -149.26,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A4BB553A_8BEA_8494_41DE_5D4211C9B7A2",
   "distance": 100
  }
 ],
 "id": "overlay_A89372B7_8BAA_BD9C_41CE_8779ED58CBF0",
 "maps": [
  {
   "hfov": 3.88,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -149.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -11.94
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0, this.camera_B298ACEA_A047_35F2_41D3_CDE90FA62EDC); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.8,
   "pitch": -3.44,
   "yaw": -58.51,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A4BB153A_8BEA_8494_41CB_B2CA0B34D152",
   "distance": 100
  }
 ],
 "id": "overlay_A8CC0E88_8BDF_8474_41C1_528F2DBF6255",
 "maps": [
  {
   "hfov": 1.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -58.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -3.44
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6, this.camera_B2971CE1_A047_35EE_41C8_49D611F20F6F); this.mainPlayList.set('selectedIndex', 60)"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.9,
   "pitch": -13.97,
   "yaw": 31.37,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C4C50CDE_F7D4_374F_41E1_181E016511B5",
   "distance": 100
  }
 ],
 "id": "overlay_DF1939DD_F7DC_714D_41E5_5CA6EE340FBA",
 "maps": [
  {
   "hfov": 5.9,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 31.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -13.97
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9, this.camera_B02BFB3D_A047_3C56_41DF_EA9AF11F2ACC); this.mainPlayList.set('selectedIndex', 29)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.54,
   "pitch": -8.39,
   "yaw": 78.7,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9FD59991_8ED5_0EFB_41C8_A70BC03D72CF",
   "distance": 100
  }
 ],
 "id": "overlay_A1764E40_8BEB_84F5_41B3_6B2572A0655A",
 "maps": [
  {
   "hfov": 6.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 78.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -8.39
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B, this.camera_B0392B34_A047_3C56_41D9_53203260E6CA); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.79,
   "pitch": -15.06,
   "yaw": -149.89,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9FD5F991_8ED5_0EFB_41B4_47DA93F47DA7",
   "distance": 50
  }
 ],
 "id": "overlay_A28EDA27_8BF7_8CBC_41DC_89389C917486",
 "maps": [
  {
   "hfov": 7.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -149.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -15.06
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8, this.camera_B0085ED7_A047_35D2_41B7_AC2F138AB919); this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.65,
   "pitch": -18.44,
   "yaw": -66.39,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E00EDAE4_F26B_0952_41E1_91A95C80CF69",
   "distance": 100
  }
 ],
 "id": "overlay_FDF2FB87_F26B_0FDE_41E9_31B49E166047",
 "maps": [
  {
   "hfov": 8.65,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -66.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -18.44
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_F954B244_F73C_7A79_41E5_028FB682D8D8, this.camera_B0046ECD_A047_3436_41C3_7B8A85550F55); this.mainPlayList.set('selectedIndex', 46)"
  }
 ],
 "data": {
  "label": "Arrow 02b Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.16,
   "pitch": -34.42,
   "yaw": 72.76,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E3394BFA_F73C_6A09_41E5_65A8D4626E5D",
   "distance": 50
  }
 ],
 "id": "overlay_F8B11397_F73C_7A07_41E5_577BB1CFD9AF",
 "maps": [
  {
   "hfov": 14.16,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 72.76,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -34.42
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80, this.camera_B03C3EE0_A047_35EE_41E0_2A1C78D4CE0E); this.mainPlayList.set('selectedIndex', 47)"
  }
 ],
 "data": {
  "label": "Arrow 02c Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.32,
   "pitch": -37.09,
   "yaw": 0.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E5C77A1E_F74C_2A09_41E3_B97356AA4154",
   "distance": 50
  }
 ],
 "id": "overlay_E79421D5_F735_F61B_41A9_DF332478B2C3",
 "maps": [
  {
   "hfov": 9.32,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -37.09
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_E1AD0453_F754_3E1F_41E0_9CD69E0B42FA, this.camera_E198EF4A_F754_2A09_41E6_C6D7C7FF72F1)"
  }
 ],
 "data": {
  "label": "Arrow 02c Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.03,
   "pitch": -21.5,
   "yaw": -41.47,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EE8D9CC9_F754_2E0B_41BB_7D42B2ED5890",
   "distance": 50
  }
 ],
 "id": "overlay_E11200C8_F755_F609_41C7_A2B714B7246A",
 "maps": [
  {
   "hfov": 12.03,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -41.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -21.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874, this.camera_B3CF5D5A_A047_34D2_41D2_72163B9C7326); this.mainPlayList.set('selectedIndex', 54)"
  }
 ],
 "data": {
  "label": "Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.55,
   "pitch": -12.04,
   "yaw": 66.01,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DEAC6503_F734_F6B5_41E1_1F278EA1F79C",
   "distance": 100
  }
 ],
 "id": "overlay_E8A11030_F74C_4ED3_41E6_ED7A1199BEE8",
 "maps": [
  {
   "hfov": 10.55,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 66.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -12.04
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D568A391_F74C_51D4_41EB_EA36557FA15B, this.camera_B32FBD47_A047_3432_41E1_022CCBD84070); this.mainPlayList.set('selectedIndex', 56)"
  }
 ],
 "data": {
  "label": "Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.89,
   "pitch": -10.55,
   "yaw": -113.93,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DB82FFBC_F734_31CC_41EC_52819B32CDC3",
   "distance": 100
  }
 ],
 "id": "overlay_D7802BC8_F74C_31B3_41BC_DCA06B29E623",
 "maps": [
  {
   "hfov": 12.89,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -113.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -10.55
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D2503D71_F73C_7155_41CF_7ED250A076A7, this.camera_B3DFED51_A047_342F_41BF_7E47DBEB7685); this.mainPlayList.set('selectedIndex', 58)"
  }
 ],
 "data": {
  "label": "Arrow 02c Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.56,
   "pitch": -17.9,
   "yaw": -119.57,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_DB834FBC_F734_31CC_41A8_4B409DD85EC9",
   "distance": 50
  }
 ],
 "id": "overlay_D3E8C2F0_F73C_D354_41ED_D560529CC180",
 "maps": [
  {
   "hfov": 7.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -119.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -17.9
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B, this.camera_B1620BAA_A047_3C7D_41AA_0C3FF477BFF8); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.71,
   "pitch": -19.48,
   "yaw": 132.37,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_984E1BE3_8AEE_83B4_41B4_54B037B2C132",
   "distance": 50
  }
 ],
 "id": "overlay_989BDC54_8AED_849C_41D1_7E0A1E9C1954",
 "maps": [
  {
   "hfov": 9.71,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 132.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -19.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8, this.camera_B1141BB2_A047_3C6D_41CE_AA272D341971); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.06,
   "pitch": -12.41,
   "yaw": -82.47,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_984EBBE3_8AEE_83B4_41D1_17554C282868",
   "distance": 50
  }
 ],
 "id": "overlay_99D7041B_8AED_8494_41D4_DAE3B054A46A",
 "maps": [
  {
   "hfov": 10.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -82.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -12.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3, this.camera_B1058BBA_A047_3C52_41DD_0C1A20771BB6); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.79,
   "pitch": -8.52,
   "yaw": -2.93,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A4AE953A_8BEA_8494_4197_F6FA4DC345AE",
   "distance": 50
  }
 ],
 "id": "overlay_A80968E8_8BAB_8DB4_41DC_8334EBC6B1B9",
 "maps": [
  {
   "hfov": 4.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -8.52
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9A53D395_8A77_839C_41C8_70478C88A4B1, this.camera_B1FB0BED_A047_33F6_41BC_F96DE31180BC); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.94,
   "pitch": -17,
   "yaw": -28.84,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_99ED022D_8A6E_BC8C_41D9_2C0E2A9D6E02",
   "distance": 100
  }
 ],
 "id": "overlay_9AFB2D4D_8A77_848C_41D2_347C1282F452",
 "maps": [
  {
   "hfov": 10.94,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -28.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -17
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36, this.camera_B1EBABF6_A047_33D2_41DD_63C0518AC119); this.mainPlayList.set('selectedIndex', 33)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.02,
   "pitch": -12.06,
   "yaw": -141.75,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9B7A982C_8A56_8C8C_41D0_991BC0FB8FD1",
   "distance": 100
  }
 ],
 "id": "overlay_9AE171BE_8A55_BF8C_41D0_5A83BCC834EA",
 "maps": [
  {
   "hfov": 16.02,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -141.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -12.06
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874, this.camera_B1C9ABE5_A047_33F6_41D6_00D9DBC431D2); this.mainPlayList.set('selectedIndex', 54)"
  }
 ],
 "data": {
  "label": "Arrow Transparent Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.13,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 115,
      "height": 115
     }
    ]
   },
   "pitch": -5.79,
   "yaw": 3.61
  }
 ],
 "id": "overlay_D44CEBBD_F73C_D1CD_41ED_05A6850C74BB",
 "maps": [
  {
   "hfov": 6.13,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 3.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -5.79
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF, this.camera_B1405B9A_A047_3C5D_4154_1EFC85AC6D32); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.78,
   "pitch": -30.41,
   "yaw": 87.97,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_B3507E35_AB59_A239_41C6_3CE7CF61CD60",
   "distance": 50
  }
 ],
 "id": "overlay_BA16E433_AB5A_A63A_41E2_A8331651CF81",
 "maps": [
  {
   "hfov": 7.78,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 87.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -30.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5, this.camera_B34B1D14_A047_3456_41D8_37C85C471C6E); this.mainPlayList.set('selectedIndex', 17); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.22,
   "pitch": -12.78,
   "yaw": 174.29,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_921F20EE_8A6D_9D8C_41AC_189112708CCA",
   "distance": 50
  }
 ],
 "id": "overlay_9C02CD5B_8A6E_8494_4194_A73D90358E30",
 "maps": [
  {
   "hfov": 5.22,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 174.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -12.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52, this.camera_B36C8D26_A047_3472_41B9_4E9AE2FD9D32); this.mainPlayList.set('selectedIndex', 14); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.19,
   "pitch": -14.53,
   "yaw": 9.44,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_921EB0EE_8A6D_9D8C_41DF_D46CF2AD2D24",
   "distance": 100
  }
 ],
 "id": "overlay_9D9D5651_8A6E_8497_41E1_2CF958B9144C",
 "maps": [
  {
   "hfov": 5.19,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 9.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -14.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0, this.camera_B0958B66_A047_3CF2_41E3_12C637F69195); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.32,
   "pitch": -13.65,
   "yaw": 78.47,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A4BAB53A_8BEA_8494_41C6_F5C6D227E689",
   "distance": 50
  }
 ],
 "id": "overlay_AEE8D29D_8BDA_9D8C_41BD_12D9A9D26C17",
 "maps": [
  {
   "hfov": 6.32,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 78.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -13.65
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973, this.camera_B2712C50_A047_342E_41E1_DFC596A3C702); this.mainPlayList.set('selectedIndex', 42)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.92,
   "pitch": -8.54,
   "yaw": -60.57,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F4BDC5C5_EE3B_D5B8_41E4_D6E192075412",
   "distance": 100
  }
 ],
 "id": "overlay_F66BAD34_EE3A_5AD8_41D3_48C11B7BE167",
 "maps": [
  {
   "hfov": 3.92,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -60.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -8.54
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F, this.camera_B18DAC06_A047_3432_41CC_B042DBFEF671); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.22,
   "pitch": -12.97,
   "yaw": 166.15,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9AF8487D_8EFD_0E2B_41E1_7C72B547B22C",
   "distance": 100
  }
 ],
 "id": "overlay_9DFE9795_8EFD_02FB_41B0_C13762D26A96",
 "maps": [
  {
   "hfov": 5.22,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 166.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -12.97
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9607D4FC_9906_6A31_41DB_47B84633749D, this.camera_B1BFEC0F_A047_3432_41D2_1C901868E133); this.mainPlayList.set('selectedIndex', 36)"
  }
 ],
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.5,
   "pitch": -8.34,
   "yaw": -28.69,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_8A283BA7_9902_FEDF_41AA_D572B44C74D4",
   "distance": 50
  }
 ],
 "id": "overlay_96E6407B_9902_6A37_4197_4BF3FFE74B17",
 "maps": [
  {
   "hfov": 6.5,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -28.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -8.34
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE, this.camera_B1AFEC21_A047_3471_41DA_2A0EF6097880); this.mainPlayList.set('selectedIndex', 38)"
  }
 ],
 "data": {
  "label": "Arrow 01 Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.12,
   "pitch": -3.9,
   "yaw": 0.15,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E3BCA2A2_F65A_4D83_41E9_025C081F0E8F",
   "distance": 50
  }
 ],
 "id": "overlay_F9B04FA7_F65A_D381_41B3_D2CCE64F27FC",
 "maps": [
  {
   "hfov": 3.12,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.9
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B, this.camera_B0461E98_A047_345E_41D0_DB55C6CF99EA); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.44,
   "pitch": -10.76,
   "yaw": 76.5,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9A160EC9_8EFF_A34E_41C9_E69EA7CDC22C",
   "distance": 100
  }
 ],
 "id": "overlay_9E8F46DC_8EF2_6347_41D8_5B734F8F231E",
 "maps": [
  {
   "hfov": 6.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 76.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -10.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162, this.camera_B04C5EA1_A047_346E_4197_C13422D65012); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.45,
   "pitch": -15.15,
   "yaw": 159.54,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9A17CEC9_8EFF_A34E_41DE_63ACC805833D",
   "distance": 100
  }
 ],
 "id": "overlay_9D8C7789_8EF1_A1CE_41DB_9234ACC09764",
 "maps": [
  {
   "hfov": 7.45,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 159.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -15.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B, this.camera_AFAC0E88_A047_343E_41D8_D349E4F26C30); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.4,
   "pitch": -8.66,
   "yaw": -18.8,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9A176EC9_8EFF_A34E_41D1_4936F0E62209",
   "distance": 100
  }
 ],
 "id": "overlay_9D4E159B_8EFE_61C2_41CE_9CB1A99A8802",
 "maps": [
  {
   "hfov": 4.4,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -18.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -8.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F, this.camera_B0511E90_A047_342E_419E_0E053D1DE1E8); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.17,
   "pitch": -7.87,
   "yaw": -104.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_824F0192_9016_2B1F_41D8_51059B55CAA7",
   "distance": 100
  }
 ],
 "id": "overlay_9E8004C1_901A_297D_41B8_49C279D33A85",
 "maps": [
  {
   "hfov": 7.17,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -104.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -7.87
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8, this.camera_B1712BA2_A047_3C6D_417C_C7EB18C7B52C); this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "data": {
  "label": "Arrow Transparent Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.19,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 115,
      "height": 115
     }
    ]
   },
   "pitch": -5.18,
   "yaw": 156.5
  }
 ],
 "id": "overlay_E4C547F2_F755_DA19_41ED_4DD67C07BF49",
 "maps": [
  {
   "hfov": 6.19,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 156.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -5.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24, this.camera_B3A3FD92_A047_3452_41D0_DAB860615D9F); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.03,
   "pitch": -15.36,
   "yaw": 35.75,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9F05ACEC_8AD7_858C_41DE_23B46E5C1912",
   "distance": 100
  }
 ],
 "id": "overlay_9849939E_8AD5_838C_41D5_9634A799D874",
 "maps": [
  {
   "hfov": 11.03,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 35.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -15.36
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE, this.camera_B4530D9C_A047_3456_41D6_D71705FF21EC); this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.94,
   "pitch": -17,
   "yaw": -147.1,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9F056CEC_8AD7_858C_41CD_F2F064B6195C",
   "distance": 100
  }
 ],
 "id": "overlay_98C54FFB_8AD6_8394_41CB_74D38D036313",
 "maps": [
  {
   "hfov": 10.94,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -147.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -17
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D, this.camera_AFCD7E06_A047_3432_41DB_A8E3FAA8BABA); this.mainPlayList.set('selectedIndex', 30)"
  }
 ],
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.94,
   "pitch": -15.15,
   "yaw": 96.4,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E277991_8ED5_0EFB_41DC_AAC886AE2ABF",
   "distance": 50
  }
 ],
 "id": "overlay_A3835255_8BF6_FC9C_41C7_83A288C30B73",
 "maps": [
  {
   "hfov": 9.94,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 96.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -15.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE, this.camera_B4449DA5_A047_3476_41A0_825FC0491374); this.mainPlayList.set('selectedIndex', 38)"
  }
 ],
 "data": {
  "label": "Arrow 02a Left"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.72,
   "pitch": -6.11,
   "yaw": 15.72,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C7C98613_D4ED_9F74_41E9_52DCD51C32FE",
   "distance": 50
  }
 ],
 "id": "overlay_DBD298B8_D4EE_94B4_41E8_68D808BE8B0D",
 "maps": [
  {
   "hfov": 4.72,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 15.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -6.11
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0, this.camera_B0868B6F_A047_3CF2_41CE_6B9251408799); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.56,
   "pitch": -48.3,
   "yaw": -10.78,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E52A97A9_F66A_D381_41DA_5E0C193BAF44",
   "distance": 100
  }
 ],
 "id": "overlay_E5726209_F66A_4C81_41C1_1FD16365470C",
 "maps": [
  {
   "hfov": 12.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -10.78,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -48.3
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 49)"
  }
 ],
 "data": {
  "label": "Arrow 02b Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.64,
   "pitch": -25.18,
   "yaw": -112.07,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E29F33BA_F75D_DA09_41A5_688298A2DA5F",
   "distance": 50
  }
 ],
 "id": "overlay_E154815B_F75C_760F_41E2_D6D16B9EAC90",
 "maps": [
  {
   "hfov": 15.64,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -112.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -25.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6, this.camera_B3B38D88_A047_343E_41E2_D8D86ED03ACD); this.mainPlayList.set('selectedIndex', 60)"
  }
 ],
 "data": {
  "label": "Arrow 02c Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.16,
   "pitch": -34.22,
   "yaw": -133.55,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C4EB3CFC_F7D4_3753_41E8_C0C274BC9968",
   "distance": 50
  }
 ],
 "id": "overlay_DE5FF7C7_F7D4_D1BC_41E6_7F9B947C4895",
 "maps": [
  {
   "hfov": 19.16,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -133.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -34.22
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2, this.camera_AFCA5E0F_A047_3432_41DD_1DE8D340D2DC); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "data": {
  "label": "Arrow 01b"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.88,
   "pitch": -13.97,
   "yaw": 63.85,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_D773FF3A_F75C_52D4_41E5_D328F604ED4C",
   "distance": 100
  }
 ],
 "id": "overlay_EC119B1F_F74C_2A07_4176_B8500BFA043F",
 "maps": [
  {
   "hfov": 7.88,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 63.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -13.97
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8, this.camera_AFF4CE19_A047_345E_41D3_20EFFCB0CBB2); this.mainPlayList.set('selectedIndex', 53)"
  }
 ],
 "data": {
  "label": "Arrow Transparent Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.05,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 57,
      "height": 75
     }
    ]
   },
   "pitch": -2.43,
   "yaw": 72.56
  }
 ],
 "id": "overlay_EB09CA86_F75B_D3BC_41B1_16CDE58C480F",
 "maps": [
  {
   "hfov": 3.05,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 72.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 21
     }
    ]
   },
   "pitch": -2.43
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E, this.camera_B0630B0B_A047_3C32_41A4_C43BAFCE386B); this.mainPlayList.set('selectedIndex', 52)"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.9,
   "pitch": -25.67,
   "yaw": 25.13,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_D7723F3A_F75C_52D4_41D0_0C088FDCBAA9",
   "distance": 100
  }
 ],
 "id": "overlay_EBCFE583_F75C_31B5_41D2_FC15981DF128",
 "maps": [
  {
   "hfov": 9.9,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 25.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -25.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.37,
   "pitch": -6.3,
   "yaw": -136.32,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9850658A_8AB5_8474_4184_1E35EEAC68D3",
   "distance": 100
  }
 ],
 "id": "overlay_9884097B_8AB6_8C8B_41D4_DC45800586ED",
 "maps": [
  {
   "hfov": 11.37,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -136.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -6.3
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9A53D395_8A77_839C_41C8_70478C88A4B1, this.camera_AF33EA59_A047_3CDE_41C4_0E89F4A93034); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.94,
   "pitch": -17.07,
   "yaw": 160.74,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_99126E55_8A7E_849C_41DD_12E624998647",
   "distance": 100
  }
 ],
 "id": "overlay_9A46FBB9_8A77_8394_41B5_F012A2BF94B0",
 "maps": [
  {
   "hfov": 10.94,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 160.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -17.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE, this.camera_AF3DDA63_A047_3CF3_41D3_7B1B39C45E9F); this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.14,
   "pitch": -13.09,
   "yaw": -18.96,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_99123E55_8A7E_849C_41B7_80CF2C076BC3",
   "distance": 100
  }
 ],
 "id": "overlay_9AB240EE_8A7E_9D8C_419E_87B4B1B4BE45",
 "maps": [
  {
   "hfov": 11.14,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -18.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -13.09
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7, this.camera_B0F2CB55_A047_3CD6_41E3_BAA214CBDA50); this.mainPlayList.set('selectedIndex', 40)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.26,
   "pitch": -10.97,
   "yaw": 37.12,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F76F6447_EE2B_CAB8_41E9_70CE3D33D33E",
   "distance": 100
  }
 ],
 "id": "overlay_FB25380F_EE2A_DAC8_41E7_3C219B78ADDF",
 "maps": [
  {
   "hfov": 6.26,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 37.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -10.97
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3, this.camera_B0C15B4D_A047_3C36_41E1_48CA8E4BA94F); this.mainPlayList.set('selectedIndex', 43)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.17,
   "pitch": -9.87,
   "yaw": 129.99,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F4BD75C5_EE3B_D5B8_41D9_F4234C1AB51D",
   "distance": 100
  }
 ],
 "id": "overlay_F60D5E1F_EE3A_76C8_41E8_1C7212E851F0",
 "maps": [
  {
   "hfov": 5.17,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 129.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -9.87
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8, this.camera_B123FA19_A047_3C5E_41E1_BD6C7D6BC4C9); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.95,
   "pitch": -9.66,
   "yaw": -44.69,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_93030EF3_8AF5_859B_4181_4D20C04261AF",
   "distance": 100
  }
 ],
 "id": "overlay_9E7ECB73_8AF6_8C94_41E0_45187CD5833D",
 "maps": [
  {
   "hfov": 6.95,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -44.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -9.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8, this.camera_B1D5CA22_A047_3C72_41E1_E4DF3A8E26EC); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.62,
   "pitch": -23.51,
   "yaw": 170.91,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9302FEF3_8AF5_859B_4196_4C753A3DD3B0",
   "distance": 100
  }
 ],
 "id": "overlay_9D7214FB_8AF5_8594_41B8_462C87745F99",
 "maps": [
  {
   "hfov": 7.62,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 170.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -23.51
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14, this.camera_B1305A10_A047_3C2E_41C9_DD0A33EA7558); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.83,
   "pitch": -33.75,
   "yaw": -118.75,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9F7F5540_8AFD_84F4_41C3_1CAD7A14F037",
   "distance": 100
  }
 ],
 "id": "overlay_9F40C392_8AFE_8394_4190_9E0D3C1056E4",
 "maps": [
  {
   "hfov": 8.83,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -118.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -33.75
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA, this.camera_B1D9EBDC_A047_33D6_41E2_7F0EDBCAE0E3); this.mainPlayList.set('selectedIndex', 44)"
  }
 ],
 "data": {
  "label": "Arrow 02c Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.54,
   "pitch": -25.32,
   "yaw": -137.06,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E3399BFA_F73C_6A09_41E2_A984E1935BE3",
   "distance": 50
  }
 ],
 "id": "overlay_F84A4B05_F73C_6BFB_41DC_34507F8D7A18",
 "maps": [
  {
   "hfov": 16.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -137.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -25.32
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95, this.camera_B3F0FD63_A047_34F2_41C4_09E8A375FB28); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "data": {
  "label": "Arrow 01 Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.8,
   "pitch": -48.65,
   "yaw": 113.42,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_91E99E22_8A57_84B4_41AD_D712F05AAE59",
   "distance": 50
  }
 ],
 "id": "overlay_9C8882CF_8A5A_9D8C_41C8_C30CA2A0F909",
 "maps": [
  {
   "hfov": 6.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 113.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -48.65
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D, this.camera_B3E0AD6C_A047_34F6_41D3_91D2BB33CEA1); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.7,
   "pitch": -31.97,
   "yaw": -138.8,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_96498106_8A6A_BC7C_41C6_8097F16D0653",
   "distance": 100
  }
 ],
 "id": "overlay_93CC75D5_8A6A_879C_41CA_194F9C585764",
 "maps": [
  {
   "hfov": 9.7,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -138.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -31.97
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_93F12805_8A6E_8C7C_41D9_78F983707124, this.camera_B3823D7F_A047_34D2_41D7_98CB9F236275); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.65,
   "pitch": -21.4,
   "yaw": -46.96,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AAD5B620_8A56_84B4_41DF_B0EC432346CC",
   "distance": 100
  }
 ],
 "id": "overlay_932122C3_8A6E_9DF4_4199_47069396E3D6",
 "maps": [
  {
   "hfov": 10.65,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -46.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -21.4
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14, this.camera_B3924D76_A047_34D2_41E4_0096116F5E7C); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "data": {
  "label": "Arrow 01 Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.86,
   "pitch": -16.66,
   "yaw": 88.16,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_95681603_8A5E_847B_41DF_C3CD357E765D",
   "distance": 50
  }
 ],
 "id": "overlay_96FECD3A_8A5D_8495_41BE_CF36D02B261C",
 "maps": [
  {
   "hfov": 9.86,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 88.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -16.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 44)"
  }
 ],
 "data": {
  "label": "Arrow Transparent Right"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.1,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 76,
      "height": 91
     }
    ]
   },
   "pitch": -4.38,
   "yaw": 25.99
  }
 ],
 "id": "overlay_E23B08CF_F75C_5607_41C6_7922C7579C77",
 "maps": [
  {
   "hfov": 4.1,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 25.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 19
     }
    ]
   },
   "pitch": -4.38
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162, this.camera_B002AB23_A047_3C72_41E2_30792C99CFA4); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.38,
   "pitch": -5.89,
   "yaw": -21.36,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9912CE55_8A7E_849C_41E0_0BA495F5E4FE",
   "distance": 100
  }
 ],
 "id": "overlay_9A773555_8A7E_849C_41D0_CAEC999E252E",
 "maps": [
  {
   "hfov": 11.38,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -21.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -5.89
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_98AA559B_8A76_8794_41CA_9930712915C9, this.camera_B035CB2B_A047_3C72_41C8_0BB5F375FA02); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.67,
   "pitch": -21.12,
   "yaw": 170.28,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_992C825A_8A76_BC94_419B_437C349D2AE0",
   "distance": 100
  }
 ],
 "id": "overlay_9A030052_8A76_BC94_41B2_1C27958BDB43",
 "maps": [
  {
   "hfov": 10.67,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 170.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -21.12
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.58,
   "pitch": -33.13,
   "yaw": 75.83,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9850958A_8AB5_8474_41DE_E7401C1B01EE",
   "distance": 100
  }
 ],
 "id": "overlay_98B10DCE_8ABB_878C_41B9_B0DC6841817A",
 "maps": [
  {
   "hfov": 9.58,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 75.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -33.13
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE, this.camera_AFAAAAE1_A047_3DEE_41B9_350356F733EC); this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.87,
   "pitch": -18.17,
   "yaw": 75.76,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A92EB4C5_8BAA_85FC_41C6_644C3BC9478D",
   "distance": 100
  }
 ],
 "id": "overlay_965EC472_8BAA_8495_41DB_0E56FFA763DA",
 "maps": [
  {
   "hfov": 10.87,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 75.76,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -18.17
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498, this.camera_AFA5DAD8_A047_3DDE_41B8_A609BDD69B89); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.24,
   "pitch": -7.84,
   "yaw": -22.12,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9AF2187D_8EFD_0E2B_41E1_4B76B0C06B4E",
   "distance": 100
  }
 ],
 "id": "overlay_9F18DD27_8EFB_0627_41D8_353810C63A0C",
 "maps": [
  {
   "hfov": 5.24,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -22.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -7.84
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7, this.camera_B0514AE9_A047_3DFE_41D0_240916335D0C); this.mainPlayList.set('selectedIndex', 40)"
  }
 ],
 "data": {
  "label": "Arrow 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.23,
   "pitch": -8.46,
   "yaw": 155.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F803EFC3_EE5A_55B8_41D4_6E710FA149C3",
   "distance": 100
  }
 ],
 "id": "overlay_FF1277AA_EE6A_75C8_41BF_A2C9CDBE8A9E",
 "maps": [
  {
   "hfov": 5.23,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 155.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -8.46
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_A4BD353A_8BEA_8494_41D2_0D32CF4EBD7A",
 "levels": [
  {
   "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_980E40B4_8ADE_BD9C_41D6_288FD71EEFB0",
 "levels": [
  {
   "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 380,
   "height": 570
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_D27CDC16_F754_D6DC_41DC_09FF65CDB8F6",
 "levels": [
  {
   "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_DB810FBC_F734_31CC_41C8_7A4EA548AEF9",
 "levels": [
  {
   "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB818FBC_F734_31CC_41E8_F7D109FFB6C5",
 "levels": [
  {
   "url": "media/panorama_D7CD76C7_F754_33BC_41D7_D90FFF552874_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_C7DEF625_D4ED_9F5C_41D5_A3FB355C927D",
 "levels": [
  {
   "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_EFCC4465_F754_DE3B_41D4_2D98D4E404C6",
 "levels": [
  {
   "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_E3B832A4_F65A_4D87_41DC_9FE28D289D9F",
 "levels": [
  {
   "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_9F7EF540_8AFD_84F4_41DB_E5BBEFF93254",
 "levels": [
  {
   "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_932B2554_8A5D_849C_41DE_3FBD649B3CC4",
 "levels": [
  {
   "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_AB293999_8BBD_8F94_41BE_DEC0ED489E28",
 "levels": [
  {
   "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_AA266A4A_8BB6_8CF4_41DC_AEC41F186E44",
 "levels": [
  {
   "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_EF7B2BFF_F774_2A07_41DA_8C9D454F87F5",
 "levels": [
  {
   "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_F87E7FCC_EE5A_5548_41C1_9DDCB598C27A",
 "levels": [
  {
   "url": "media/panorama_FD4AEE1C_EE5A_56C8_41BE_EF2A9E74DE1F_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_03E41E1A_0D83_B5B2_41A9_EAD3109E8ADE",
 "levels": [
  {
   "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_C2F447E7_D4F5_FCDC_4178_73DB747B1D60",
 "levels": [
  {
   "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_E0325AE2_F26B_0956_41D9_A1B84A853CEA",
 "levels": [
  {
   "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_E0FDB986_F754_F6F9_41E0_2FB327B3CE54",
 "levels": [
  {
   "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_AA265A4A_8BB6_8CF4_41D9_5D0BF88EB7FF",
 "levels": [
  {
   "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_93A38A9F_8A5A_8D8C_41D6_C514AA7FA387",
 "levels": [
  {
   "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_37A08258_3AAA_549E_41B2_DC80153A25AA",
 "levels": [
  {
   "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_37A01258_3AAA_549E_4193_717ABEBE36D5",
 "levels": [
  {
   "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_37BFA25A_3AAA_5492_41BD_71C7D7C4AA36",
 "levels": [
  {
   "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0_HS_6_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_87935D76_9016_5B04_41DA_4BB6A4937024",
 "levels": [
  {
   "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_85A1FDF3_91C2_F793_4191_4C166E39CB00",
 "levels": [
  {
   "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_D2682C10_F754_D6D4_41E0_B959E31B8252",
 "levels": [
  {
   "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_920075A2_8AFB_87B4_41DF_73F24B1E3859",
 "levels": [
  {
   "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_AB28C99E_8BBD_8F8D_41C1_9111F9EE43FC",
 "levels": [
  {
   "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_85A95DEA_91C2_F7BD_41E0_811163682743",
 "levels": [
  {
   "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_EA3CFC75_F74C_6E1B_41E8_92CE0AC0CCD9",
 "levels": [
  {
   "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_85BBCCB9_900A_590C_41DE_E43A33CBD14F",
 "levels": [
  {
   "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_85BB5CB9_900A_590C_41D8_2E3084509082",
 "levels": [
  {
   "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_85BB6CB9_900A_590C_41D1_82AE9A539C7B",
 "levels": [
  {
   "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_AAD36620_8A56_84B4_41CA_F5FDD7DA9EFE",
 "levels": [
  {
   "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_AAD38620_8A56_84B4_41DA_7933CB071328",
 "levels": [
  {
   "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_AAD01620_8A56_84B4_41D0_14F5FD121C53",
 "levels": [
  {
   "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_984DFBE3_8AEE_83B4_41DA_68B0766C486A",
 "levels": [
  {
   "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_9D30BD47_8AF7_84FC_41DF_190BB9667E47",
 "levels": [
  {
   "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_9D30CD47_8AF7_84FC_41CB_B4F7BAC37590",
 "levels": [
  {
   "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_9D307D47_8AF7_84FC_41B0_0E9734180834",
 "levels": [
  {
   "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_9FD4E991_8ED5_0EFB_41AF_D4203E464BEC",
 "levels": [
  {
   "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_DEAE8504_F734_F6B3_41D7_BC18FC975411",
 "levels": [
  {
   "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_D9C41685_F7CD_D3BC_41A7_24C12A4438F2",
 "levels": [
  {
   "url": "media/panorama_D568A391_F74C_51D4_41EB_EA36557FA15B_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_A4BB953A_8BEA_8494_41C8_F2A5E00D05A9",
 "levels": [
  {
   "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_A4BA653A_8BEA_8494_41CA_BE20AE199CDB",
 "levels": [
  {
   "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_A4BAF53A_8BEA_8494_41D1_6DEC94950743",
 "levels": [
  {
   "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_E4849000_F66E_4C7F_41DE_3F1DF8D19630",
 "levels": [
  {
   "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_960813EE_8A56_838C_41DC_7BF066162034",
 "levels": [
  {
   "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_F87F4FCB_EE5A_5548_41D7_235FCE3762F5",
 "levels": [
  {
   "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_F87FEFCC_EE5A_5548_41D5_2668F90CDF68",
 "levels": [
  {
   "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_F76C7441_EE2B_CAB8_41DE_A167B9FA9788",
 "levels": [
  {
   "url": "media/panorama_E0C82182_EE6A_CDB8_41DC_E03FAC7217E7_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_96D7EE66_8A77_84BD_41E0_089D1A206CA7",
 "levels": [
  {
   "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_8A35EBB0_9902_FE31_41B1_FA696522A3F6",
 "levels": [
  {
   "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_93A8876E_8A5A_848D_41E0_22094F5436CF",
 "levels": [
  {
   "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_AAD0B620_8A56_84B4_41D0_E4F2A2B5010B",
 "levels": [
  {
   "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_87987D71_9016_5B1C_41DA_590CF9B5E49A",
 "levels": [
  {
   "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_B34CAE30_AB59_A237_41CE_71DF380AA36A",
 "levels": [
  {
   "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_91E96E22_8A57_84B4_41DF_01428A258E4C",
 "levels": [
  {
   "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_C4EABCFC_F7D4_3753_419F_3C7C1E0A619E",
 "levels": [
  {
   "url": "media/panorama_C790D65F_F7DC_F34D_41E7_A349B33082C6_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_A4BB553A_8BEA_8494_41DE_5D4211C9B7A2",
 "levels": [
  {
   "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_A4BB153A_8BEA_8494_41CB_B2CA0B34D152",
 "levels": [
  {
   "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_C4C50CDE_F7D4_374F_41E1_181E016511B5",
 "levels": [
  {
   "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_9FD59991_8ED5_0EFB_41C8_A70BC03D72CF",
 "levels": [
  {
   "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_9FD5F991_8ED5_0EFB_41B4_47DA93F47DA7",
 "levels": [
  {
   "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_E00EDAE4_F26B_0952_41E1_91A95C80CF69",
 "levels": [
  {
   "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_E3394BFA_F73C_6A09_41E5_65A8D4626E5D",
 "levels": [
  {
   "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_E5C77A1E_F74C_2A09_41E3_B97356AA4154",
 "levels": [
  {
   "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_EE8D9CC9_F754_2E0B_41BB_7D42B2ED5890",
 "levels": [
  {
   "url": "media/panorama_F6277703_EE2A_56B8_41EA_40795F08C8BA_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_DEAC6503_F734_F6B5_41E1_1F278EA1F79C",
 "levels": [
  {
   "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_DB82FFBC_F734_31CC_41EC_52819B32CDC3",
 "levels": [
  {
   "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_DB834FBC_F734_31CC_41A8_4B409DD85EC9",
 "levels": [
  {
   "url": "media/panorama_D7172BFC_F74C_7153_41EB_8BFED1C8EE32_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_984E1BE3_8AEE_83B4_41B4_54B037B2C132",
 "levels": [
  {
   "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_984EBBE3_8AEE_83B4_41D1_17554C282868",
 "levels": [
  {
   "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_A4AE953A_8BEA_8494_4197_F6FA4DC345AE",
 "levels": [
  {
   "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_99ED022D_8A6E_BC8C_41D9_2C0E2A9D6E02",
 "levels": [
  {
   "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_9B7A982C_8A56_8C8C_41D0_991BC0FB8FD1",
 "levels": [
  {
   "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_B3507E35_AB59_A239_41C6_3CE7CF61CD60",
 "levels": [
  {
   "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_921F20EE_8A6D_9D8C_41AC_189112708CCA",
 "levels": [
  {
   "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_921EB0EE_8A6D_9D8C_41DF_D46CF2AD2D24",
 "levels": [
  {
   "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_A4BAB53A_8BEA_8494_41C6_F5C6D227E689",
 "levels": [
  {
   "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_F4BDC5C5_EE3B_D5B8_41E4_D6E192075412",
 "levels": [
  {
   "url": "media/panorama_F620A231_EE39_CED8_41DA_F8307B9B71C3_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_9AF8487D_8EFD_0E2B_41E1_7C72B547B22C",
 "levels": [
  {
   "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_8A283BA7_9902_FEDF_41AA_D572B44C74D4",
 "levels": [
  {
   "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_E3BCA2A2_F65A_4D83_41E9_025C081F0E8F",
 "levels": [
  {
   "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_9A160EC9_8EFF_A34E_41C9_E69EA7CDC22C",
 "levels": [
  {
   "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_9A17CEC9_8EFF_A34E_41DE_63ACC805833D",
 "levels": [
  {
   "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_9A176EC9_8EFF_A34E_41D1_4936F0E62209",
 "levels": [
  {
   "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_824F0192_9016_2B1F_41D8_51059B55CAA7",
 "levels": [
  {
   "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_9F05ACEC_8AD7_858C_41DE_23B46E5C1912",
 "levels": [
  {
   "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_9F056CEC_8AD7_858C_41CD_F2F064B6195C",
 "levels": [
  {
   "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_9E277991_8ED5_0EFB_41DC_AAC886AE2ABF",
 "levels": [
  {
   "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_C7C98613_D4ED_9F74_41E9_52DCD51C32FE",
 "levels": [
  {
   "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_E52A97A9_F66A_D381_41DA_5E0C193BAF44",
 "levels": [
  {
   "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_E29F33BA_F75D_DA09_41A5_688298A2DA5F",
 "levels": [
  {
   "url": "media/panorama_E733397A_F66E_DC83_41EA_D8EB42A3647D_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_C4EB3CFC_F7D4_3753_41E8_C0C274BC9968",
 "levels": [
  {
   "url": "media/panorama_DE3489AF_F7D4_31CD_41C7_5202DBF66258_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_D773FF3A_F75C_52D4_41E5_D328F604ED4C",
 "levels": [
  {
   "url": "media/panorama_EC989FC8_F74C_EA09_41E7_84303D7D7C8E_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_D7723F3A_F75C_52D4_41D0_0C088FDCBAA9",
 "levels": [
  {
   "url": "media/panorama_EBB0155B_F75C_3155_41DD_D82BE1F1BDF8_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 330,
   "height": 180
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_9850658A_8AB5_8474_4184_1E35EEAC68D3",
 "levels": [
  {
   "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_99126E55_8A7E_849C_41DD_12E624998647",
 "levels": [
  {
   "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_99123E55_8A7E_849C_41B7_80CF2C076BC3",
 "levels": [
  {
   "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_F76F6447_EE2B_CAB8_41E9_70CE3D33D33E",
 "levels": [
  {
   "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_F4BD75C5_EE3B_D5B8_41D9_F4234C1AB51D",
 "levels": [
  {
   "url": "media/panorama_FAC432EE_EE56_4F48_41DF_5700ACB0E973_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_93030EF3_8AF5_859B_4181_4D20C04261AF",
 "levels": [
  {
   "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_9302FEF3_8AF5_859B_4196_4C753A3DD3B0",
 "levels": [
  {
   "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_9F7F5540_8AFD_84F4_41C3_1CAD7A14F037",
 "levels": [
  {
   "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_E3399BFA_F73C_6A09_41E2_A984E1935BE3",
 "levels": [
  {
   "url": "media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_91E99E22_8A57_84B4_41AD_D712F05AAE59",
 "levels": [
  {
   "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_96498106_8A6A_BC7C_41C6_8097F16D0653",
 "levels": [
  {
   "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_AAD5B620_8A56_84B4_41DF_B0EC432346CC",
 "levels": [
  {
   "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_95681603_8A5E_847B_41DF_C3CD357E765D",
 "levels": [
  {
   "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_9912CE55_8A7E_849C_41E0_0BA495F5E4FE",
 "levels": [
  {
   "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_992C825A_8A76_BC94_419B_437C349D2AE0",
 "levels": [
  {
   "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_9850958A_8AB5_8474_41DE_E7401C1B01EE",
 "levels": [
  {
   "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_A92EB4C5_8BAA_85FC_41C6_644C3BC9478D",
 "levels": [
  {
   "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_9AF2187D_8EFD_0E2B_41E1_4B76B0C06B4E",
 "levels": [
  {
   "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_F803EFC3_EE5A_55B8_41D4_6E710FA149C3",
 "levels": [
  {
   "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ]
}],
 "width": "100%"
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
