(function(){
    var script = {
 "downloadEnabled": false,
 "defaultVRPointer": "laser",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.MainViewer"
 ],
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "id": "rootPlayer",
 "paddingLeft": 0,
 "paddingRight": 0,
 "start": "this.init()",
 "scrollBarMargin": 2,
 "overflow": "visible",
 "width": "100%",
 "minHeight": 20,
 "scrollBarWidth": 10,
 "definitions": [{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -79.4,
  "pitch": 0
 },
 "id": "camera_C7353976_D4AD_B5BC_41E7_FA8E30B06764",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "duong-ra-hoi-truong",
 "hfovMin": "135%",
 "id": "panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162",
 "overlays": [
  "this.overlay_9A46FBB9_8A77_8394_41B5_F012A2BF94B0",
  "this.overlay_9AB240EE_8A7E_9D8C_419E_87B4B1B4BE45"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 160.74,
   "distance": 1,
   "panorama": "this.panorama_9A53D395_8A77_839C_41C8_70478C88A4B1",
   "backwardYaw": -21.36
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -18.96,
   "distance": 1,
   "panorama": "this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE",
   "backwardYaw": 159.54
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 62.58,
  "pitch": 0
 },
 "id": "camera_C3093C2E_D4AD_B3AC_41A6_54CACF99D1C3",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "phong-thi-nghiem",
 "hfovMin": "135%",
 "id": "panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21",
 "overlays": [
  "this.overlay_AD14AE1B_8BD5_848B_41C2_AA339EA90EA3"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -143.07,
   "distance": 1,
   "panorama": "this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0",
   "backwardYaw": 55.93
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_t.jpg",
 "hfovMax": 130
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "the-chat-ngoai-troi",
 "hfovMin": "135%",
 "id": "panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9",
 "overlays": [
  "this.overlay_A3B10469_8BEB_84B4_41D4_4334453C455A"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -101.04,
   "distance": 1,
   "panorama": "this.panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D",
   "backwardYaw": 78.7
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -119.47,
  "pitch": 0
 },
 "id": "camera_C2790B8F_D4AD_B56C_41E2_D19C0B10AF99",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "phong-canh-phong-may",
 "hfovMin": "135%",
 "id": "panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5",
 "overlays": [
  "this.overlay_93DA570D_8A76_848C_419D_845F80869E07"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -68.26,
   "distance": 1,
   "panorama": "this.panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D",
   "backwardYaw": 174.29
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_t.jpg",
 "hfovMax": 130
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "cuoi hanh lang - gd2(t1)",
 "hfovMin": "135%",
 "id": "panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49",
 "overlays": [
  "this.overlay_A9AE2D43_8BB7_84F4_41DF_81F8D65C7E95"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 65.69,
   "distance": 1,
   "panorama": "this.panorama_9436AF9F_8BBB_838C_41CF_8387E359C040",
   "backwardYaw": -47.78
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_9607D4FC_9906_6A31_41DB_47B84633749D_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -91.84,
  "pitch": 0
 },
 "id": "camera_C7EE299C_D4AD_B56C_41E8_D90685774984",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -170.56,
  "pitch": 0
 },
 "id": "camera_C25BEB7E_D4AD_B5AC_41B6_11ECE63AE8D3",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "giua-hanh-lang - gd2(t1)",
 "hfovMin": "135%",
 "id": "panorama_9436AF9F_8BBB_838C_41CF_8387E359C040",
 "overlays": [
  "this.overlay_AB08EBF9_8BBA_8394_41B3_158A0682FED9",
  "this.overlay_A97ACC22_8BB6_84B4_41D3_422E2943D630"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 135.23,
   "distance": 1,
   "panorama": "this.panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36",
   "backwardYaw": -112.44
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 135.23,
   "distance": 1,
   "panorama": "this.panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C",
   "backwardYaw": -127.02
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -47.78,
   "distance": 1,
   "panorama": "this.panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49",
   "backwardYaw": 65.69
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -47.63,
  "pitch": 0
 },
 "id": "camera_C1E17B1B_D4AD_B574_41DA_F05FCD5D743B",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "tap-hoa-truong-sinh",
 "hfovMin": "135%",
 "id": "panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498",
 "overlays": [
  "this.overlay_9DFE9795_8EFD_02FB_41B0_C13762D26A96",
  "this.overlay_96E6407B_9902_6A37_4197_4BF3FFE74B17"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 166.15,
   "distance": 1,
   "panorama": "this.panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F",
   "backwardYaw": -22.12
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -28.69,
   "distance": 1,
   "panorama": "this.panorama_9607D4FC_9906_6A31_41DB_47B84633749D",
   "backwardYaw": 166.49
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -19.26,
  "pitch": 0
 },
 "id": "camera_C0E1BA2E_D4AD_B7AC_41CC_CEE05EA0E982",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -144.25,
  "pitch": 0
 },
 "id": "camera_C77BC945_D4AD_B5DC_41CA_5D46E5EBD6D8",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 52.98,
  "pitch": 0
 },
 "id": "camera_C6E0DCE5_D4AD_ACDF_41EA_28723CFC148F",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 75.75,
  "pitch": 0
 },
 "id": "camera_C0C3BA1D_D4AD_B76C_418E_33F951074774",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "hanh lang -t2(gd2)",
 "hfovMin": "135%",
 "id": "panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2",
 "overlays": [
  "this.overlay_94A79AA9_8BBA_8DB4_41D6_EAE9397D24B5",
  "this.overlay_81866D9B_91C3_9793_4189_808E9F82BEA7"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -159.4,
   "distance": 1,
   "panorama": "this.panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007",
   "backwardYaw": -149.78
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -98.04,
   "distance": 1,
   "panorama": "this.panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36",
   "backwardYaw": 129.9
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "loi vao gd3",
 "hfovMin": "135%",
 "id": "panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE",
 "overlays": [
  "this.overlay_C44A83DA_D4EF_94F4_41E2_CA8F8F6EA37F",
  "this.overlay_C5D33580_D4F7_7D54_41A0_C8ABCFA5942E"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 93.68,
   "distance": 1,
   "panorama": "this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B",
   "backwardYaw": 15.72
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -1.16,
   "distance": 1,
   "panorama": "this.panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8",
   "backwardYaw": -23.03
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_t.jpg",
 "hfovMax": 130
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "hanh-lang-t3(gd2)",
 "hfovMin": "135%",
 "id": "panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007",
 "overlays": [
  "this.overlay_9F7DE400_91CE_B46D_41B5_E94971CE1E48"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -149.78,
   "distance": 1,
   "panorama": "this.panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2",
   "backwardYaw": -159.4
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 135.31,
  "pitch": 0
 },
 "id": "camera_C04B09D5_D4AD_B4FC_41C0_0F395386F718",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -114.31,
  "pitch": 0
 },
 "id": "camera_C6E7BCEE_D4AD_ACAC_41DE_D2515F41CCB1",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "sanh-truoc-cong",
 "hfovMin": "135%",
 "id": "panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE",
 "overlays": [
  "this.overlay_9E8F46DC_8EF2_6347_41D8_5B734F8F231E",
  "this.overlay_9D8C7789_8EF1_A1CE_41DB_9234ACC09764",
  "this.overlay_9D4E159B_8EFE_61C2_41CE_9CB1A99A8802",
  "this.overlay_9E8004C1_901A_297D_41B8_49C279D33A85"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -18.8,
   "distance": 1,
   "panorama": "this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B",
   "backwardYaw": -147.1
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -104.25,
   "distance": 1,
   "panorama": "this.panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F",
   "backwardYaw": 75.76
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 76.5,
   "distance": 1,
   "panorama": "this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B",
   "backwardYaw": -87.48
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 159.54,
   "distance": 1,
   "panorama": "this.panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162",
   "backwardYaw": -18.96
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 38.25,
  "pitch": 0
 },
 "id": "camera_C0AA3A58_D4AD_B7F4_41B2_732C0CC33BFD",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -106.55,
  "pitch": 0
 },
 "id": "camera_C29F4BF0_D4AD_B4B4_41E0_966A31EF092F",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 20.6,
  "pitch": 0
 },
 "id": "camera_C0EE2A36_D4AD_B7BC_41E3_FE73BB74CE1E",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -121.74,
  "pitch": 0
 },
 "id": "camera_C077E9F1_D4AD_B4B4_4194_4AD352428136",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 78.96,
  "pitch": 0
 },
 "id": "camera_C78C09AF_D4AD_B4AC_41C1_C7AFE8CA7210",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -83.6,
  "pitch": 0
 },
 "id": "camera_C7FE39A5_D4AD_B55C_41DE_72B1CEA37EEB",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 36.93,
  "pitch": 0
 },
 "id": "camera_C2F32BD6_D4AD_B4FC_41D1_E9D2A158D17E",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "tang-2-gd3",
 "hfovMin": "135%",
 "id": "panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3",
 "overlays": [
  "this.overlay_9E7ECB73_8AF6_8C94_41E0_45187CD5833D",
  "this.overlay_9D7214FB_8AF5_8594_41B8_462C87745F99",
  "this.overlay_9F40C392_8AFE_8394_4190_9E0D3C1056E4"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -118.75,
   "distance": 1,
   "panorama": "this.panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14",
   "backwardYaw": 70.62
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -44.69,
   "distance": 1,
   "panorama": "this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8",
   "backwardYaw": -35.43
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 170.91,
   "distance": 1,
   "panorama": "this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8",
   "backwardYaw": -35.43
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 133.04,
  "pitch": 0
 },
 "id": "camera_C0259A0C_D4AD_B76C_41E3_D1FBFFBB7198",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -79.36,
  "pitch": 0
 },
 "id": "camera_C0144A03_D4AD_B754_41C3_410C576F50BE",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -20.46,
  "pitch": 0
 },
 "id": "camera_C1C32AFA_D4AD_B4B4_41C9_EAD10DB6C082",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "sanh-nha-an",
 "hfovMin": "135%",
 "id": "panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8",
 "overlays": [
  "this.overlay_994472FB_8AEF_9D94_41C9_4C74606797A9",
  "this.overlay_9FC813FB_8AEB_8394_41C3_0CC4FD936293",
  "this.overlay_9EC727B2_8AF6_8395_41DE_1E4760939A10",
  "this.overlay_9E396B89_8AF6_8C74_41C2_5A7A8C489008"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 72.19,
   "distance": 1,
   "panorama": "this.panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24",
   "backwardYaw": -82.47
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -73.27,
   "distance": 1,
   "panorama": "this.panorama_992EFE19_8AEE_8497_41C5_7168906A82C4",
   "backwardYaw": 70.41
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -35.43,
   "distance": 1,
   "panorama": "this.panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3",
   "backwardYaw": -44.69
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 145.98,
   "distance": 1,
   "panorama": "this.panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3",
   "backwardYaw": -44.69
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 105.91,
  "pitch": 0
 },
 "id": "camera_C2BF3C02_D4AD_B354_41DF_2B9AC5256A79",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 121.49,
  "pitch": 0
 },
 "id": "camera_C2817BDE_D4AD_B4EC_41DD_6236618FCF0B",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 132.22,
  "pitch": 0
 },
 "id": "camera_C05919DE_D4AD_B4EC_41D8_A3AE6644A9AF",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -13.85,
  "pitch": 0
 },
 "id": "camera_C0327A14_D4AD_B77C_41D9_E844168E3A74",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -124.07,
  "pitch": 0
 },
 "id": "camera_C37BAC25_D4AD_B35C_41E6_D2F9A9298B8F",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 144.57,
  "pitch": 0
 },
 "id": "camera_C2350BB3_D4AD_B4B4_41DA_E0AFDD4996C5",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 41.2,
  "pitch": 0
 },
 "id": "camera_C6CE2CCD_D4AD_ACEC_41DB_0AA779D0AB26",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -101.53,
  "pitch": 0
 },
 "id": "camera_C2E35BCD_D4AD_B4EC_41DD_F2642CF5565B",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 61.25,
  "pitch": 0
 },
 "id": "camera_C7E04992_D4AD_B574_41D3_625C9E4FDA68",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 151.31,
  "pitch": 0
 },
 "id": "camera_C158CA81_D4AD_B754_41AA_B2F43E338279",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaPlayer",
 "displayPlaybackBar": true,
 "viewerArea": "this.MainViewer",
 "gyroscopeVerticalDraggingEnabled": true,
 "id": "MainViewerPanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "mouseControlMode": "drag_acceleration"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 81.96,
  "pitch": 0
 },
 "id": "camera_C09CDA50_D4AD_B7F4_41C9_102501D07408",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 157.88,
  "pitch": 0
 },
 "id": "camera_C638BCAC_D4AD_ACAC_41D2_323D3A689278",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 30.11,
  "pitch": 0
 },
 "id": "camera_C1F1CB29_D4AD_B554_41E9_219894B8E7C8",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 30.74,
  "pitch": 0
 },
 "id": "camera_C70E6958_D4AD_B5F4_41D0_784B3092C1E9",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "lab 3",
 "hfovMin": "135%",
 "id": "panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197",
 "overlays": [
  "this.overlay_BA16E433_AB5A_A63A_41E2_A8331651CF81"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 87.97,
   "distance": 1,
   "panorama": "this.panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF",
   "backwardYaw": -26.92
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_t.jpg",
 "hfovMax": 130
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "hanh-lang-t2(gd3)",
 "hfovMin": "135%",
 "id": "panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D",
 "overlays": [
  "this.overlay_9C02CD5B_8A6E_8494_4194_A73D90358E30",
  "this.overlay_9D9D5651_8A6E_8497_41E1_2CF958B9144C"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 174.29,
   "distance": 1,
   "panorama": "this.panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5",
   "backwardYaw": -68.26
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 174.29,
   "distance": 1,
   "panorama": "this.panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5",
   "backwardYaw": -68.26
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 9.44,
   "distance": 1,
   "panorama": "this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52",
   "backwardYaw": -138.8
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 9.44,
   "distance": 1,
   "panorama": "this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52",
   "backwardYaw": -138.8
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_t.jpg",
 "hfovMax": 130
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "duong-ra-gd2",
 "hfovMin": "135%",
 "id": "panorama_98AA559B_8A76_8794_41CA_9930712915C9",
 "overlays": [
  "this.overlay_9AFB2D4D_8A77_848C_41D2_347C1282F452",
  "this.overlay_9AE171BE_8A55_BF8C_41D0_5A83BCC834EA"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -28.84,
   "distance": 1,
   "panorama": "this.panorama_9A53D395_8A77_839C_41C8_70478C88A4B1",
   "backwardYaw": 170.28
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -141.75,
   "distance": 1,
   "panorama": "this.panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36",
   "backwardYaw": 58.26
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -103.5,
  "pitch": 0
 },
 "id": "camera_C2AF3BF9_D4AD_B4B4_41CF_0D6FEC53C4B0",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -86.32,
  "pitch": 0
 },
 "id": "camera_C18F0B50_D4AD_B5F4_41D8_0167177BEA9C",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 135.31,
  "pitch": 0
 },
 "id": "camera_C7BA89CB_D4AD_B4D4_41A5_EB1645757C52",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "sanh-t2-gd3",
 "hfovMin": "135%",
 "id": "panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14",
 "overlays": [
  "this.overlay_9FD72DA2_8AFD_87B4_41C1_4D812AA89815",
  "this.overlay_9CB8EB1E_8A5E_8C8C_41D8_C73EEC332F7A"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 70.62,
   "distance": 1,
   "panorama": "this.panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3",
   "backwardYaw": -118.75
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -117.45,
   "distance": 1,
   "panorama": "this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52",
   "backwardYaw": 88.16
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 161.2,
  "pitch": 0
 },
 "id": "camera_C1FF1B3D_D4AD_B5AC_41D6_8D646E1B4038",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "loi-vao-phong-y-te",
 "hfovMin": "135%",
 "id": "panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0",
 "overlays": [
  "this.overlay_AF3591F7_8BDE_BF9C_4162_FE183C34C520",
  "this.overlay_AFA1BFAE_8BDB_838C_41C2_43EC2A22C3F0",
  "this.overlay_AEA8A5CA_8BD6_87F4_41D6_256A6AB62849"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -121.57,
   "distance": 1,
   "panorama": "this.panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D",
   "backwardYaw": 78.47
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 55.93,
   "distance": 1,
   "panorama": "this.panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21",
   "backwardYaw": -143.07
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 73.45,
   "distance": 1,
   "panorama": "this.panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3",
   "backwardYaw": -58.51
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -107.81,
  "pitch": 0
 },
 "id": "camera_C704894E_D4AD_B5ED_41EA_3C569B420648",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -164.28,
  "pitch": 0
 },
 "id": "camera_C71D3962_D4AD_B5D5_41E8_BC87116F562A",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "cua len gd3(gan nha the chat)",
 "hfovMin": "135%",
 "id": "panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8",
 "overlays": [
  "this.overlay_C6D274E8_D4F6_BCD4_41D5_132B824F8903"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -23.03,
   "distance": 1,
   "panorama": "this.panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE",
   "backwardYaw": -1.16
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_t.jpg",
 "hfovMax": 130
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "san-bong",
 "hfovMin": "135%",
 "id": "panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D",
 "overlays": [
  "this.overlay_A1764E40_8BEB_84F5_41B3_6B2572A0655A",
  "this.overlay_A28EDA27_8BF7_8CBC_41DC_89389C917486"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -149.89,
   "distance": 1,
   "panorama": "this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B",
   "backwardYaw": 96.4
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 78.7,
   "distance": 1,
   "panorama": "this.panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9",
   "backwardYaw": -101.04
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_t.jpg",
 "hfovMax": 130
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "duong-ra-nha-the-chat",
 "hfovMin": "135%",
 "id": "panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B",
 "overlays": [
  "this.overlay_9849939E_8AD5_838C_41D5_9634A799D874",
  "this.overlay_98C54FFB_8AD6_8394_41CB_74D38D036313",
  "this.overlay_A3835255_8BF6_FC9C_41C7_83A288C30B73",
  "this.overlay_DBD298B8_D4EE_94B4_41E8_68D808BE8B0D"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 35.75,
   "distance": 1,
   "panorama": "this.panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24",
   "backwardYaw": 132.37
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 96.4,
   "distance": 1,
   "panorama": "this.panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D",
   "backwardYaw": -149.89
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -147.1,
   "distance": 1,
   "panorama": "this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE",
   "backwardYaw": -18.8
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 15.72,
   "distance": 1,
   "panorama": "this.panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE",
   "backwardYaw": 93.68
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.07,
  "pitch": 0
 },
 "id": "camera_C2913BE7_D4AD_B4DB_41E3_7A26C08D67BC",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -15.49,
  "pitch": 0
 },
 "id": "camera_C0FE0A3F_D4AD_B7AC_41E6_1C14D7B1E59C",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_98AA559B_8A76_8794_41CA_9930712915C9_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 111.74,
  "pitch": 0
 },
 "id": "camera_C6CB5CC5_D4AD_ACDC_41E6_AE8FA827BD26",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -92.03,
  "pitch": 0
 },
 "id": "camera_C329DC3F_D4AD_B3AC_41D6_12F6C276179F",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "thu-vien",
 "hfovMin": "135%",
 "id": "panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26",
 "overlays": [
  "this.overlay_963AAF11_8A57_8494_41C2_F2C627F303AC"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 100.64,
   "distance": 1,
   "panorama": "this.panorama_93F12805_8A6E_8C7C_41D9_78F983707124",
   "backwardYaw": 29.58
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_t.jpg",
 "hfovMax": 130
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "lab1",
 "hfovMin": "135%",
 "id": "panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF",
 "overlays": [
  "this.overlay_902DCA8F_8A6B_8D8C_41D4_2E56962AF3C4",
  "this.overlay_83BC2280_9016_29FC_41DB_826793121830",
  "this.overlay_BA3BD77E_AB5A_622B_41D8_B54E351F8354"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 29.9,
   "distance": 1,
   "panorama": "this.panorama_93F12805_8A6E_8C7C_41D9_78F983707124",
   "backwardYaw": -117.42
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 100.6,
   "distance": 1,
   "panorama": "this.panorama_82BAF319_901A_2F0D_41C4_309B78B0C979",
   "backwardYaw": 7.17
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -26.92,
   "distance": 1,
   "panorama": "this.panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197",
   "backwardYaw": 87.97
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_t.jpg",
 "hfovMax": 130
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "cong-truong",
 "hfovMin": "135%",
 "id": "panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011",
 "overlays": [
  "this.overlay_87941342_8A5E_BCF4_41C8_10EDDFF14FC4"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -74.09,
   "distance": 1,
   "panorama": "this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B",
   "backwardYaw": 28.45
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.84,
  "pitch": 0
 },
 "id": "camera_C217CBA1_D4AD_B554_41E6_F0AE25228A8A",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -13.51,
  "pitch": 0
 },
 "id": "camera_C63FCCB4_D4AD_ACBC_41C5_F8E94E123744",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "ATM",
 "hfovMin": "135%",
 "id": "panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A",
 "overlays": [
  "this.overlay_9CA7EA66_8A5A_8CBD_41DA_55419E68C239"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 154.15,
   "distance": 1,
   "panorama": "this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B",
   "backwardYaw": -33.85
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 62.55,
  "pitch": 0
 },
 "id": "camera_C269EB87_D4AD_B55C_41E2_340BC9BEC1E4",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "loi-vao-y-te",
 "hfovMin": "135%",
 "id": "panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D",
 "overlays": [
  "this.overlay_AEE8D29D_8BDA_9D8C_41BD_12D9A9D26C17"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 78.47,
   "distance": 1,
   "panorama": "this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0",
   "backwardYaw": -121.57
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -150.1,
  "pitch": 0
 },
 "id": "camera_C007D9FA_D4AD_B4B4_41D7_91C76E9E9F0B",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 144.57,
  "pitch": 0
 },
 "id": "camera_C2C5BBBB_D4AD_B4B4_41EA_1C969E9BED11",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "phong-may",
 "hfovMin": "135%",
 "id": "panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95",
 "overlays": [
  "this.overlay_92B042AA_8A55_BDB4_41BC_2684FB452D8D"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -155.18,
   "distance": 1,
   "panorama": "this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52",
   "backwardYaw": 113.42
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 30.22,
  "pitch": 0
 },
 "id": "camera_C19FEB5B_D4AD_B5F4_41CF_E7A61F21F1EA",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -44.77,
  "pitch": 0
 },
 "id": "camera_C3375C48_D4AD_B3D4_41D8_B8B0A98AE1CD",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "bot-bao-ve",
 "hfovMin": "135%",
 "id": "panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B",
 "overlays": [
  "this.overlay_9A591837_8A5E_8C9C_41E0_2DB4B0A05BA3",
  "this.overlay_847B3C85_8A5E_847F_41A0_619E529D0775",
  "this.overlay_985C2AD5_8ADD_8D9C_41E0_9973DE59674D",
  "this.overlay_9C141389_8A5A_9C74_41E0_DEE041939AF8"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -87.48,
   "distance": 1,
   "panorama": "this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE",
   "backwardYaw": 76.5
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 28.45,
   "distance": 1,
   "panorama": "this.panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011",
   "backwardYaw": -74.09
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -33.85,
   "distance": 1,
   "panorama": "this.panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A",
   "backwardYaw": 154.15
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 164.51,
   "distance": 1,
   "panorama": "this.panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21",
   "backwardYaw": -40.26
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -101.3,
  "pitch": 0
 },
 "id": "camera_C1D30B08_D4AD_B554_41E7_19CE109DB5FA",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "loi-vao-lab",
 "hfovMin": "135%",
 "id": "panorama_93F12805_8A6E_8C7C_41D9_78F983707124",
 "overlays": [
  "this.overlay_90C4B3BC_8A6F_838D_41D4_35D87BEAF76C",
  "this.overlay_90497676_8A6A_849C_41C9_773C5422DBE9",
  "this.overlay_9064CA68_8A55_8CB4_41D4_0075298C0116"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -117.42,
   "distance": 1,
   "panorama": "this.panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF",
   "backwardYaw": 29.9
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 29.58,
   "distance": 1,
   "panorama": "this.panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26",
   "backwardYaw": 100.64
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 60.53,
   "distance": 1,
   "panorama": "this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52",
   "backwardYaw": -46.96
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 146.15,
  "pitch": 0
 },
 "id": "camera_C36B5C1D_D4AD_B36C_41D3_4FD8849906BF",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "gd2(t1)-hanh-lang",
 "hfovMin": "135%",
 "id": "panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C",
 "overlays": [
  "this.overlay_957760EE_8BBB_FD8C_41D7_2981D49F5313",
  "this.overlay_94C04A93_8BBA_8D94_41E0_864608603980"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -127.02,
   "distance": 1,
   "panorama": "this.panorama_9436AF9F_8BBB_838C_41CF_8387E359C040",
   "backwardYaw": 135.23
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "nga 4 thang cong",
 "hfovMin": "135%",
 "id": "panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F",
 "overlays": [
  "this.overlay_965EC472_8BAA_8495_41DB_0E56FFA763DA",
  "this.overlay_9F18DD27_8EFB_0627_41D8_353810C63A0C"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -22.12,
   "distance": 1,
   "panorama": "this.panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498",
   "backwardYaw": 166.15
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 75.76,
   "distance": 1,
   "panorama": "this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE",
   "backwardYaw": -104.25
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -109.38,
  "pitch": 0
 },
 "id": "camera_C2271BAA_D4AD_B554_41E7_FC78DA4393FA",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "phong an",
 "hfovMin": "135%",
 "id": "panorama_992EFE19_8AEE_8497_41C5_7168906A82C4",
 "overlays": [
  "this.overlay_9FC74F80_8AFA_8475_41D3_C846F7AB24EC"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 70.41,
   "distance": 1,
   "panorama": "this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8",
   "backwardYaw": -73.27
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 153.08,
  "pitch": 0
 },
 "id": "camera_C7C59980_D4AD_B554_41BC_787505F5BC05",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "duong-ra-gd1",
 "hfovMin": "135%",
 "id": "panorama_9A53D395_8A77_839C_41C8_70478C88A4B1",
 "overlays": [
  "this.overlay_9A773555_8A7E_849C_41D0_CAEC999E252E",
  "this.overlay_9A030052_8A76_BC94_41B2_1C27958BDB43",
  "this.overlay_98B10DCE_8ABB_878C_41B9_B0DC6841817A"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 170.28,
   "distance": 1,
   "panorama": "this.panorama_98AA559B_8A76_8794_41CA_9930712915C9",
   "backwardYaw": -28.84
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -21.36,
   "distance": 1,
   "panorama": "this.panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162",
   "backwardYaw": 160.74
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 67.56,
  "pitch": 0
 },
 "id": "camera_C6DB2CDD_D4AD_ACEF_4194_2263A6458912",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -44.77,
  "pitch": 0
 },
 "id": "camera_C14A9A73_D4AD_B7B4_41D9_2305BDC9CE92",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "hanh-lang-gd3(t2)",
 "hfovMin": "135%",
 "id": "panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52",
 "overlays": [
  "this.overlay_9C8882CF_8A5A_9D8C_41C8_C30CA2A0F909",
  "this.overlay_93CC75D5_8A6A_879C_41CA_194F9C585764",
  "this.overlay_932122C3_8A6E_9DF4_4199_47069396E3D6",
  "this.overlay_96FECD3A_8A5D_8495_41BE_CF36D02B261C"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 113.42,
   "distance": 1,
   "panorama": "this.panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95",
   "backwardYaw": -155.18
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -138.8,
   "distance": 1,
   "panorama": "this.panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D",
   "backwardYaw": 9.44
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 88.16,
   "distance": 1,
   "panorama": "this.panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14",
   "backwardYaw": -117.45
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -46.96,
   "distance": 1,
   "panorama": "this.panorama_93F12805_8A6E_8C7C_41D9_78F983707124",
   "backwardYaw": 60.53
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_t.jpg",
 "hfovMax": 130
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "lab2",
 "hfovMin": "135%",
 "id": "panorama_82BAF319_901A_2F0D_41C4_309B78B0C979",
 "overlays": [
  "this.overlay_83EE6C1C_9016_7904_41BB_C3CF35196CB6"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 7.17,
   "distance": 1,
   "panorama": "this.panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF",
   "backwardYaw": 100.6
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_t.jpg",
 "hfovMax": 130
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "nha-de-xe",
 "hfovMin": "135%",
 "id": "panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21",
 "overlays": [
  "this.overlay_983ED8A9_8ADD_8DB4_41DB_0D3888138C17"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -40.26,
   "distance": 1,
   "panorama": "this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B",
   "backwardYaw": 164.51
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -44.77,
  "pitch": 0
 },
 "id": "camera_C0BADA60_D4AD_B7D5_4178_7E013C43E4D0",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 97.53,
  "pitch": 0
 },
 "id": "camera_C79CB9B9_D4AD_B4B4_41BD_140CF20FD4C4",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "san-chao-co",
 "hfovMin": "135%",
 "id": "panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E",
 "overlays": [
  "this.overlay_9884097B_8AB6_8C8B_41D4_DC45800586ED"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_98AA559B_8A76_8794_41CA_9930712915C9"
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_9A53D395_8A77_839C_41C8_70478C88A4B1",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_98AA559B_8A76_8794_41CA_9930712915C9",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_98AA559B_8A76_8794_41CA_9930712915C9_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_992EFE19_8AEE_8497_41C5_7168906A82C4",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_93F12805_8A6E_8C7C_41D9_78F983707124",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_93F12805_8A6E_8C7C_41D9_78F983707124_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_9436AF9F_8BBB_838C_41CF_8387E359C040",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 34, 35)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_82BAF319_901A_2F0D_41C4_309B78B0C979",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_9607D4FC_9906_6A31_41DB_47B84633749D",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_9607D4FC_9906_6A31_41DB_47B84633749D_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 38, 39)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 39, 40)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "end": "this.trigger('tourEnded')",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 40, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "media": "this.panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8",
   "camera": "this.panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_camera"
  }
 ],
 "id": "mainPlayList"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 161.04,
  "pitch": 0
 },
 "id": "camera_C1148AC8_D4AD_B4D4_41A6_4DCBD0FACE5C",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 106.73,
  "pitch": 0
 },
 "id": "camera_C7D3F989_D4AD_B554_41E7_EB655A93BBC8",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 58.43,
  "pitch": 0
 },
 "id": "camera_C08C4A47_D4AD_B7DC_419C_66253AC819DE",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -5.71,
  "pitch": 0
 },
 "id": "camera_C2D29BC4_D4AD_B4DC_41E2_2A76893D6932",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 32.9,
  "pitch": 0
 },
 "id": "camera_C1696A94_D4AD_B77C_41AB_3613DF8DE620",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -172.83,
  "pitch": 0
 },
 "id": "camera_C3191C37_D4AD_B3BC_41E6_49D6CBF454E2",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "nha-an",
 "hfovMin": "135%",
 "id": "panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24",
 "overlays": [
  "this.overlay_989BDC54_8AED_849C_41D1_7E0A1E9C1954",
  "this.overlay_99D7041B_8AED_8494_41D4_DAE3B054A46A",
  "this.overlay_A80968E8_8BAB_8DB4_41DC_8334EBC6B1B9"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 132.37,
   "distance": 1,
   "panorama": "this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B",
   "backwardYaw": 35.75
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -82.47,
   "distance": 1,
   "panorama": "this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8",
   "backwardYaw": 72.19
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -2.93,
   "distance": 1,
   "panorama": "this.panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3",
   "backwardYaw": -149.26
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -9.72,
  "pitch": 0
 },
 "id": "camera_C069F9E8_D4AD_B4D4_41CA_0DBD3EF8579D",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 158.64,
  "pitch": 0
 },
 "id": "camera_C135EAE8_D4AD_B4D5_41A6_3B6D4279EE70",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -104.24,
  "pitch": 0
 },
 "id": "camera_C1776AA7_D4AD_B75C_419D_0048AEFA6738",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "GD2(2)",
 "hfovMin": "135%",
 "id": "panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36",
 "overlays": [
  "this.overlay_823FAB5C_900A_FF04_41DD_2393E5CA09F0",
  "this.overlay_826DFCB6_900B_F904_41A1_1CAA12B5FD4E",
  "this.overlay_823C3D2F_900A_3B05_41DF_C3A3475B6D00"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 129.9,
   "distance": 1,
   "panorama": "this.panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2",
   "backwardYaw": -98.04
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 58.26,
   "distance": 1,
   "panorama": "this.panorama_98AA559B_8A76_8794_41CA_9930712915C9",
   "backwardYaw": -141.75
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -112.44,
   "distance": 1,
   "panorama": "this.panorama_9436AF9F_8BBB_838C_41CF_8387E359C040",
   "backwardYaw": 135.23
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -112.44,
   "distance": 1,
   "panorama": "this.panorama_9436AF9F_8BBB_838C_41CF_8387E359C040",
   "backwardYaw": 135.23
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -50.1,
  "pitch": 0
 },
 "id": "camera_C1AD0B64_D4AD_B5DD_41DE_6BC75B5CE269",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "loi-vao-ktx",
 "hfovMin": "135%",
 "id": "panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3",
 "overlays": [
  "this.overlay_A89372B7_8BAA_BD9C_41CE_8779ED58CBF0",
  "this.overlay_A8CC0E88_8BDF_8474_41C1_528F2DBF6255"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -149.26,
   "distance": 1,
   "panorama": "this.panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24",
   "backwardYaw": -2.93
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -58.51,
   "distance": 1,
   "panorama": "this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0",
   "backwardYaw": 73.45
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -150.42,
  "pitch": 0
 },
 "id": "camera_C2099B98_D4AD_B574_41E6_E42C0E6840B1",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -66.58,
  "pitch": 0
 },
 "id": "camera_C1BDFB6C_D4AD_B5AD_41CB_E15E770960C4",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 151.16,
  "pitch": 0
 },
 "id": "camera_C0D39A26_D4AD_B75C_41E2_1C484D102764",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 92.52,
  "pitch": 0
 },
 "id": "camera_C106BAB5_D4AD_B4BC_41E5_E4A960C6453E",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -25.85,
  "pitch": 0
 },
 "id": "camera_C34D0C0B_D4AD_B354_41E3_90DDE1E5E25D",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -109.59,
  "pitch": 0
 },
 "id": "camera_C7AD59C2_D4AD_B4D4_41D5_F3E5437F4E48",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_93F12805_8A6E_8C7C_41D9_78F983707124_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 139.74,
  "pitch": 0
 },
 "id": "camera_C35D3C14_D4AD_B37C_41E4_D8EE61B3A269",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "duong-vao-nha-clb",
 "hfovMin": "135%",
 "id": "panorama_9607D4FC_9906_6A31_41DB_47B84633749D",
 "overlays": [
  "this.overlay_899A65B3_9903_AA37_41C1_1651E45E3C67"
 ],
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 166.49,
   "distance": 1,
   "panorama": "this.panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498",
   "backwardYaw": -28.69
  }
 ],
 "hfov": 360,
 "pitch": 0,
 "class": "Panorama",
 "vfov": 180,
 "thumbnailUrl": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_t.jpg",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 156.97,
  "pitch": 0
 },
 "id": "camera_C726296C_D4AD_B5AC_41AD_EE29E9C6939D",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 111.74,
  "pitch": 0
 },
 "id": "camera_C6C5CCBD_D4AD_ACAC_41E9_6BE7A26C3876",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 24.82,
  "pitch": 0
 },
 "id": "camera_C24B2B75_D4AD_B5BC_41D1_91B795C18A6F",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -151.55,
  "pitch": 0
 },
 "id": "camera_C1255AD6_D4AD_B4FC_41E0_AAC0664780B2",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 41.2,
  "pitch": 0
 },
 "id": "camera_C6D47CD6_D4AD_ACFC_41D7_AE8BA871ABCF",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "toolTipFontColor": "#606060",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "paddingLeft": 0,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "progressBarBorderSize": 0,
 "progressBarBorderRadius": 0,
 "width": "100%",
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "toolTipShadowSpread": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarHeadBorderRadius": 0,
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipPaddingLeft": 6,
 "minWidth": 100,
 "toolTipDisplayTime": 600,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "toolTipShadowVerticalLength": 0,
 "playbackBarProgressOpacity": 1,
 "borderSize": 0,
 "height": "100%",
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "toolTipFontWeight": "normal",
 "playbackBarBackgroundOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "class": "ViewerArea",
 "shadow": false,
 "progressOpacity": 1,
 "toolTipBorderColor": "#767676",
 "progressRight": 0,
 "toolTipFontStyle": "normal",
 "toolTipTextShadowColor": "#000000",
 "firstTransitionDuration": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBottom": 0,
 "toolTipTextShadowOpacity": 0,
 "vrPointerSelectionTime": 2000,
 "progressBarBackgroundColorDirection": "vertical",
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "propagateClick": false,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "paddingRight": 0,
 "transitionMode": "blending",
 "displayTooltipInTouchScreens": true,
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipShadowColor": "#333333",
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "progressBorderRadius": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadHeight": 15,
 "borderRadius": 0,
 "toolTipFontFamily": "Arial",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "paddingBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipTextShadowBlurRadius": 3,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "paddingTop": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "data": {
  "name": "Main Viewer"
 },
 "playbackBarHeight": 10,
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipFontSize": "1.11vmin"
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9A53D395_8A77_839C_41C8_70478C88A4B1, this.camera_C135EAE8_D4AD_B4D5_41A6_3B6D4279EE70); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 160.74,
   "hfov": 10.94,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.07
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_99126E55_8A7E_849C_41DD_12E624998647",
   "pitch": -17.07,
   "yaw": 160.74,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.94,
   "distance": 100
  }
 ],
 "id": "overlay_9A46FBB9_8A77_8394_41B5_F012A2BF94B0",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE, this.camera_C1C32AFA_D4AD_B4B4_41C9_EAD10DB6C082); this.mainPlayList.set('selectedIndex', 33)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -18.96,
   "hfov": 11.14,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.09
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_99123E55_8A7E_849C_41B7_80CF2C076BC3",
   "pitch": -13.09,
   "yaw": -18.96,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.14,
   "distance": 100
  }
 ],
 "id": "overlay_9AB240EE_8A7E_9D8C_419E_87B4B1B4BE45",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0, this.camera_C37BAC25_D4AD_B35C_41E6_D2F9A9298B8F); this.mainPlayList.set('selectedIndex', 27)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -143.07,
   "hfov": 7.23,
   "image": {
    "levels": [
     {
      "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -45.42
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_A4BD353A_8BEA_8494_41D2_0D32CF4EBD7A",
   "pitch": -45.42,
   "yaw": -143.07,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.23,
   "distance": 50
  }
 ],
 "id": "overlay_AD14AE1B_8BD5_848B_41C2_AA339EA90EA3",
 "data": {
  "label": "Arrow 01 Left-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D, this.camera_C1D30B08_D4AD_B554_41E7_19CE109DB5FA); this.mainPlayList.set('selectedIndex', 31)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -101.04,
   "hfov": 5.62,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.63
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_9FD4E991_8ED5_0EFB_41AF_D4203E464BEC",
   "pitch": -12.63,
   "yaw": -101.04,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.62,
   "distance": 100
  }
 ],
 "id": "overlay_A3B10469_8BEB_84B4_41D4_4334453C455A",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D, this.camera_C2D29BC4_D4AD_B4DC_41E2_2A76893D6932); this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -68.26,
   "hfov": 10.27,
   "image": {
    "levels": [
     {
      "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.62
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_96D7EE66_8A77_84BD_41E0_089D1A206CA7",
   "pitch": -3.62,
   "yaw": -68.26,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.27,
   "distance": 50
  }
 ],
 "id": "overlay_93DA570D_8A76_848C_419D_845F80869E07",
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9436AF9F_8BBB_838C_41CF_8387E359C040, this.camera_C05919DE_D4AD_B4EC_41D8_A3AE6644A9AF); this.mainPlayList.set('selectedIndex', 25)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 65.69,
   "hfov": 6.84,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.27
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_AA265A4A_8BB6_8CF4_41D9_5D0BF88EB7FF",
   "pitch": -12.27,
   "yaw": 65.69,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.84,
   "distance": 100
  }
 ],
 "id": "overlay_A9AE2D43_8BB7_84F4_41DF_81F8D65C7E95",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C, this.camera_C6E0DCE5_D4AD_ACDF_41EA_28723CFC148F); this.mainPlayList.set('selectedIndex', 22); this.mainPlayList.set('selectedIndex', 34)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 135.23,
   "hfov": 7.29,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.26
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_AA263A4A_8BB6_8CF4_41E0_6103BFEBFF5E",
   "pitch": -16.26,
   "yaw": 135.23,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.29,
   "distance": 100
  }
 ],
 "id": "overlay_AB08EBF9_8BBA_8394_41B3_158A0682FED9",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49, this.camera_C6E7BCEE_D4AD_ACAC_41DE_D2515F41CCB1); this.mainPlayList.set('selectedIndex', 24)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -47.78,
   "hfov": 6.74,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.93
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_AA26EA4A_8BB6_8CF4_41B9_42356C556C97",
   "pitch": -15.93,
   "yaw": -47.78,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.74,
   "distance": 100
  }
 ],
 "id": "overlay_A97ACC22_8BB6_84B4_41D3_422E2943D630",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F, this.camera_C638BCAC_D4AD_ACAC_41D2_323D3A689278); this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 166.15,
   "hfov": 5.22,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.97
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_9AF8487D_8EFD_0E2B_41E1_7C72B547B22C",
   "pitch": -12.97,
   "yaw": 166.15,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.22,
   "distance": 100
  }
 ],
 "id": "overlay_9DFE9795_8EFD_02FB_41B0_C13762D26A96",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9607D4FC_9906_6A31_41DB_47B84633749D, this.camera_C63FCCB4_D4AD_ACBC_41C5_F8E94E123744); this.mainPlayList.set('selectedIndex', 37)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -28.69,
   "hfov": 6.5,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.34
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_8A283BA7_9902_FEDF_41AA_D572B44C74D4",
   "pitch": -8.34,
   "yaw": -28.69,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.5,
   "distance": 50
  }
 ],
 "id": "overlay_96E6407B_9902_6A37_4197_4BF3FFE74B17",
 "data": {
  "label": "Arrow 01 Right-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36, this.camera_C1AD0B64_D4AD_B5DD_41DE_6BC75B5CE269); this.mainPlayList.set('selectedIndex', 34)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -98.04,
   "hfov": 6.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.46
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_AB28C99E_8BBD_8F8D_41C1_9111F9EE43FC",
   "pitch": -23.46,
   "yaw": -98.04,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.66,
   "distance": 50
  }
 ],
 "id": "overlay_94A79AA9_8BBA_8DB4_41D6_EAE9397D24B5",
 "data": {
  "label": "Arrow 01 Left-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007, this.camera_C19FEB5B_D4AD_B5F4_41CF_E7A61F21F1EA); this.mainPlayList.set('selectedIndex', 36)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -159.4,
   "hfov": 4.34,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -26.19
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_85A95DEA_91C2_F7BD_41E0_811163682743",
   "pitch": -26.19,
   "yaw": -159.4,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.34,
   "distance": 100
  }
 ],
 "id": "overlay_81866D9B_91C3_9793_4189_808E9F82BEA7",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B, this.camera_C71D3962_D4AD_B5D5_41E8_BC87116F562A); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 93.68,
   "hfov": 3.24,
   "image": {
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.32
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C7DEF625_D4ED_9F5C_41D5_A3FB355C927D",
   "pitch": -4.32,
   "yaw": 93.68,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.24,
   "distance": 100
  }
 ],
 "id": "overlay_C44A83DA_D4EF_94F4_41E2_CA8F8F6EA37F",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8, this.camera_C726296C_D4AD_B5AC_41AD_EE29E9C6939D); this.mainPlayList.set('selectedIndex', 40)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.16,
   "hfov": 7.46,
   "image": {
    "levels": [
     {
      "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.63
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C2F4D7E7_D4F5_FCDC_41E9_5862F0F0D56B",
   "pitch": -16.63,
   "yaw": -1.16,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.46,
   "distance": 100
  }
 ],
 "id": "overlay_C5D33580_D4F7_7D54_41A0_C8ABCFA5942E",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2, this.camera_C0EE2A36_D4AD_B7BC_41E3_FE73BB74CE1E); this.mainPlayList.set('selectedIndex', 23)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -149.78,
   "hfov": 5.65,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.95
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_85A1FDF3_91C2_F793_4191_4C166E39CB00",
   "pitch": -24.95,
   "yaw": -149.78,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.65,
   "distance": 50
  }
 ],
 "id": "overlay_9F7DE400_91CE_B46D_41B5_E94971CE1E48",
 "data": {
  "label": "Arrow 01 Left-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B, this.camera_C106BAB5_D4AD_B4BC_41E5_E4A960C6453E); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 76.5,
   "hfov": 6.44,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.76
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_9A160EC9_8EFF_A34E_41C9_E69EA7CDC22C",
   "pitch": -10.76,
   "yaw": 76.5,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.44,
   "distance": 100
  }
 ],
 "id": "overlay_9E8F46DC_8EF2_6347_41D8_5B734F8F231E",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162, this.camera_C1148AC8_D4AD_B4D4_41A6_4DCBD0FACE5C); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 159.54,
   "hfov": 7.45,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.15
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_9A17CEC9_8EFF_A34E_41DE_63ACC805833D",
   "pitch": -15.15,
   "yaw": 159.54,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.45,
   "distance": 100
  }
 ],
 "id": "overlay_9D8C7789_8EF1_A1CE_41DB_9234ACC09764",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B, this.camera_C1696A94_D4AD_B77C_41AB_3613DF8DE620); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -18.8,
   "hfov": 4.4,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.66
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_9A176EC9_8EFF_A34E_41D1_4936F0E62209",
   "pitch": -8.66,
   "yaw": -18.8,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.4,
   "distance": 100
  }
 ],
 "id": "overlay_9D4E159B_8EFE_61C2_41CE_9CB1A99A8802",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F, this.camera_C1776AA7_D4AD_B75C_419D_0048AEFA6738); this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -104.25,
   "hfov": 7.17,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.87
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_824F0192_9016_2B1F_41D8_51059B55CAA7",
   "pitch": -7.87,
   "yaw": -104.25,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.17,
   "distance": 100
  }
 ],
 "id": "overlay_9E8004C1_901A_297D_41B8_49C279D33A85",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8, this.camera_C2350BB3_D4AD_B4B4_41DA_E0AFDD4996C5); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -44.69,
   "hfov": 6.95,
   "image": {
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.66
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_93030EF3_8AF5_859B_4181_4D20C04261AF",
   "pitch": -9.66,
   "yaw": -44.69,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.95,
   "distance": 100
  }
 ],
 "id": "overlay_9E7ECB73_8AF6_8C94_41E0_45187CD5833D",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8, this.camera_C2C5BBBB_D4AD_B4B4_41EA_1C969E9BED11); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 170.91,
   "hfov": 7.62,
   "image": {
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.51
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_9302FEF3_8AF5_859B_4196_4C753A3DD3B0",
   "pitch": -23.51,
   "yaw": 170.91,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.62,
   "distance": 100
  }
 ],
 "id": "overlay_9D7214FB_8AF5_8594_41B8_462C87745F99",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14, this.camera_C2271BAA_D4AD_B554_41E7_FC78DA4393FA); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -118.75,
   "hfov": 8.83,
   "image": {
    "levels": [
     {
      "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -33.75
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_9F7F5540_8AFD_84F4_41C3_1CAD7A14F037",
   "pitch": -33.75,
   "yaw": -118.75,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.83,
   "distance": 100
  }
 ],
 "id": "overlay_9F40C392_8AFE_8394_4190_9E0D3C1056E4",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_992EFE19_8AEE_8497_41C5_7168906A82C4, this.camera_C7AD59C2_D4AD_B4D4_41D5_F3E5437F4E48); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -73.27,
   "hfov": 8.28,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -36.5
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_984DFBE3_8AEE_83B4_41DA_68B0766C486A",
   "pitch": -36.5,
   "yaw": -73.27,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.28,
   "distance": 50
  }
 ],
 "id": "overlay_994472FB_8AEF_9D94_41C9_4C74606797A9",
 "data": {
  "label": "Arrow 01 Left-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24, this.camera_C79CB9B9_D4AD_B4B4_41BD_140CF20FD4C4); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 72.19,
   "hfov": 11.12,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.5
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_9D30BD47_8AF7_84FC_41DF_190BB9667E47",
   "pitch": -13.5,
   "yaw": 72.19,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.12,
   "distance": 100
  }
 ],
 "id": "overlay_9FC813FB_8AEB_8394_41C3_0CC4FD936293",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3, this.camera_C7BA89CB_D4AD_B4D4_41A5_EB1645757C52); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -35.43,
   "hfov": 8.78,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.24
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_9D30CD47_8AF7_84FC_41CB_B4F7BAC37590",
   "pitch": -18.24,
   "yaw": -35.43,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.78,
   "distance": 100
  }
 ],
 "id": "overlay_9EC727B2_8AF6_8395_41DE_1E4760939A10",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3, this.camera_C04B09D5_D4AD_B4FC_41C0_0F395386F718); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 145.98,
   "hfov": 7.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.22
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_9D307D47_8AF7_84FC_41B0_0E9734180834",
   "pitch": -15.22,
   "yaw": 145.98,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.86,
   "distance": 100
  }
 ],
 "id": "overlay_9E396B89_8AF6_8C74_41C2_5A7A8C489008",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF, this.camera_C7C59980_D4AD_B554_41BC_787505F5BC05); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 87.97,
   "hfov": 7.78,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -30.41
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_B3507E35_AB59_A239_41C6_3CE7CF61CD60",
   "pitch": -30.41,
   "yaw": 87.97,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.78,
   "distance": 50
  }
 ],
 "id": "overlay_BA16E433_AB5A_A63A_41E2_A8331651CF81",
 "data": {
  "label": "Arrow 01 Right-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5, this.camera_C6CB5CC5_D4AD_ACDC_41E6_AE8FA827BD26); this.mainPlayList.set('selectedIndex', 17); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 174.29,
   "hfov": 5.22,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.78
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_921F20EE_8A6D_9D8C_41AC_189112708CCA",
   "pitch": -12.78,
   "yaw": 174.29,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.22,
   "distance": 50
  }
 ],
 "id": "overlay_9C02CD5B_8A6E_8494_4194_A73D90358E30",
 "data": {
  "label": "Arrow 01 Left-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52, this.camera_C6D47CD6_D4AD_ACFC_41D7_AE8BA871ABCF); this.mainPlayList.set('selectedIndex', 14); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 9.44,
   "hfov": 5.19,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.53
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_921EB0EE_8A6D_9D8C_41DF_D46CF2AD2D24",
   "pitch": -14.53,
   "yaw": 9.44,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.19,
   "distance": 100
  }
 ],
 "id": "overlay_9D9D5651_8A6E_8497_41E1_2CF958B9144C",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9A53D395_8A77_839C_41C8_70478C88A4B1, this.camera_C069F9E8_D4AD_B4D4_41CA_0DBD3EF8579D); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -28.84,
   "hfov": 10.94,
   "image": {
    "levels": [
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_99ED022D_8A6E_BC8C_41D9_2C0E2A9D6E02",
   "pitch": -17,
   "yaw": -28.84,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.94,
   "distance": 100
  }
 ],
 "id": "overlay_9AFB2D4D_8A77_848C_41D2_347C1282F452",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36, this.camera_C077E9F1_D4AD_B4B4_4194_4AD352428136); this.mainPlayList.set('selectedIndex', 34)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -141.75,
   "hfov": 16.02,
   "image": {
    "levels": [
     {
      "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.06
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_9B7A982C_8A56_8C8C_41D0_991BC0FB8FD1",
   "pitch": -12.06,
   "yaw": -141.75,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.02,
   "distance": 100
  }
 ],
 "id": "overlay_9AE171BE_8A55_BF8C_41D0_5A83BCC834EA",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3, this.camera_C7E04992_D4AD_B574_41D3_625C9E4FDA68); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 70.62,
   "hfov": 10.92,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.28
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_9F7EF540_8AFD_84F4_41DB_E5BBEFF93254",
   "pitch": -17.28,
   "yaw": 70.62,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.92,
   "distance": 100
  }
 ],
 "id": "overlay_9FD72DA2_8AFD_87B4_41C1_4D812AA89815",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52, this.camera_C7EE299C_D4AD_B56C_41E8_D90685774984); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -117.45,
   "hfov": 11.22,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.31
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_932B2554_8A5D_849C_41DE_3FBD649B3CC4",
   "pitch": -11.31,
   "yaw": -117.45,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.22,
   "distance": 100
  }
 ],
 "id": "overlay_9CB8EB1E_8A5E_8C8C_41D8_C73EEC332F7A",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3, this.camera_C2817BDE_D4AD_B4EC_41DD_6236618FCF0B); this.mainPlayList.set('selectedIndex', 26)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 73.45,
   "hfov": 4.18,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.04
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_A4BB953A_8BEA_8494_41C8_F2A5E00D05A9",
   "pitch": -5.04,
   "yaw": 73.45,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.18,
   "distance": 100
  }
 ],
 "id": "overlay_AF3591F7_8BDE_BF9C_4162_FE183C34C520",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D, this.camera_C2E35BCD_D4AD_B4EC_41DD_F2642CF5565B); this.mainPlayList.set('selectedIndex', 28)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -121.57,
   "hfov": 3.67,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.5
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_A4BA653A_8BEA_8494_41CA_BE20AE199CDB",
   "pitch": -6.5,
   "yaw": -121.57,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.67,
   "distance": 50
  }
 ],
 "id": "overlay_AFA1BFAE_8BDB_838C_41C2_43EC2A22C3F0",
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21, this.camera_C2F32BD6_D4AD_B4FC_41D1_E9D2A158D17E); this.mainPlayList.set('selectedIndex', 29)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 55.93,
   "hfov": 3.03,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.89
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_A4BAF53A_8BEA_8494_41D1_6DEC94950743",
   "pitch": -3.89,
   "yaw": 55.93,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.03,
   "distance": 50
  }
 ],
 "id": "overlay_AEA8A5CA_8BD6_87F4_41D6_256A6AB62849",
 "data": {
  "label": "Arrow 01 Left"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE, this.camera_C217CBA1_D4AD_B554_41E6_F0AE25228A8A); this.mainPlayList.set('selectedIndex', 39)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -23.03,
   "hfov": 7.96,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -39.38
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C2F447E7_D4F5_FCDC_4178_73DB747B1D60",
   "pitch": -39.38,
   "yaw": -23.03,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.96,
   "distance": 50
  }
 ],
 "id": "overlay_C6D274E8_D4F6_BCD4_41D5_132B824F8903",
 "data": {
  "label": "Arrow 01 Left-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9, this.camera_C78C09AF_D4AD_B4AC_41C1_C7AFE8CA7210); this.mainPlayList.set('selectedIndex', 30)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 78.7,
   "hfov": 6.54,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.39
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_9FD59991_8ED5_0EFB_41C8_A70BC03D72CF",
   "pitch": -8.39,
   "yaw": 78.7,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.54,
   "distance": 100
  }
 ],
 "id": "overlay_A1764E40_8BEB_84F5_41B3_6B2572A0655A",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B, this.camera_C7FE39A5_D4AD_B55C_41DE_72B1CEA37EEB); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -149.89,
   "hfov": 7.79,
   "image": {
    "levels": [
     {
      "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.06
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_9FD5F991_8ED5_0EFB_41B4_47DA93F47DA7",
   "pitch": -15.06,
   "yaw": -149.89,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.79,
   "distance": 50
  }
 ],
 "id": "overlay_A28EDA27_8BF7_8CBC_41DC_89389C917486",
 "data": {
  "label": "Arrow 01 Right-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24, this.camera_C1E17B1B_D4AD_B574_41DA_F05FCD5D743B); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 35.75,
   "hfov": 11.03,
   "image": {
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.36
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_9F05ACEC_8AD7_858C_41DE_23B46E5C1912",
   "pitch": -15.36,
   "yaw": 35.75,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.03,
   "distance": 100
  }
 ],
 "id": "overlay_9849939E_8AD5_838C_41D5_9634A799D874",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE, this.camera_C1FF1B3D_D4AD_B5AC_41D6_8D646E1B4038); this.mainPlayList.set('selectedIndex', 33)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -147.1,
   "hfov": 10.94,
   "image": {
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_9F056CEC_8AD7_858C_41CD_F2F064B6195C",
   "pitch": -17,
   "yaw": -147.1,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.94,
   "distance": 100
  }
 ],
 "id": "overlay_98C54FFB_8AD6_8394_41CB_74D38D036313",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D, this.camera_C1F1CB29_D4AD_B554_41E9_219894B8E7C8); this.mainPlayList.set('selectedIndex', 31)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 96.4,
   "hfov": 9.94,
   "image": {
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.15
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_9E277991_8ED5_0EFB_41DC_AAC886AE2ABF",
   "pitch": -15.15,
   "yaw": 96.4,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.94,
   "distance": 50
  }
 ],
 "id": "overlay_A3835255_8BF6_FC9C_41C7_83A288C30B73",
 "data": {
  "label": "Arrow 01 Right-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE, this.camera_C18F0B50_D4AD_B5F4_41D8_0167177BEA9C); this.mainPlayList.set('selectedIndex', 39)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 15.72,
   "hfov": 4.72,
   "image": {
    "levels": [
     {
      "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.11
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C7C98613_D4ED_9F74_41E9_52DCD51C32FE",
   "pitch": -6.11,
   "yaw": 15.72,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.72,
   "distance": 50
  }
 ],
 "id": "overlay_DBD298B8_D4EE_94B4_41E8_68D808BE8B0D",
 "data": {
  "label": "Arrow 02a Left"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_93F12805_8A6E_8C7C_41D9_78F983707124, this.camera_C2099B98_D4AD_B574_41E6_E42C0E6840B1); this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 100.64,
   "hfov": 5.11,
   "image": {
    "levels": [
     {
      "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.34
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_960813EE_8A56_838C_41DC_7BF066162034",
   "pitch": -17.34,
   "yaw": 100.64,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.11,
   "distance": 50
  }
 ],
 "id": "overlay_963AAF11_8A57_8494_41C2_F2C627F303AC",
 "data": {
  "label": "Arrow 01 Right-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_93F12805_8A6E_8C7C_41D9_78F983707124, this.camera_C3093C2E_D4AD_B3AC_41A6_54CACF99D1C3); this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 29.9,
   "hfov": 5.88,
   "image": {
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -31.62
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_AAD0B620_8A56_84B4_41D0_E4F2A2B5010B",
   "pitch": -31.62,
   "yaw": 29.9,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.88,
   "distance": 100
  }
 ],
 "id": "overlay_902DCA8F_8A6B_8D8C_41D4_2E56962AF3C4",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_82BAF319_901A_2F0D_41C4_309B78B0C979, this.camera_C3191C37_D4AD_B3BC_41E6_49D6CBF454E2); this.mainPlayList.set('selectedIndex', 35)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 100.6,
   "hfov": 4.33,
   "image": {
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -28.8
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_87987D71_9016_5B1C_41DA_590CF9B5E49A",
   "pitch": -28.8,
   "yaw": 100.6,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.33,
   "distance": 50
  }
 ],
 "id": "overlay_83BC2280_9016_29FC_41DB_826793121830",
 "data": {
  "label": "Arrow 01 Right-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197, this.camera_C329DC3F_D4AD_B3AC_41D6_12F6C276179F); this.mainPlayList.set('selectedIndex', 38)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -26.92,
   "hfov": 4.19,
   "image": {
    "levels": [
     {
      "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.19
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_B34CAE30_AB59_A237_41CE_71DF380AA36A",
   "pitch": -17.19,
   "yaw": -26.92,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.19,
   "distance": 50
  }
 ],
 "id": "overlay_BA3BD77E_AB5A_622B_41D8_B54E351F8354",
 "data": {
  "label": "Arrow 01 Left-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B, this.camera_C1255AD6_D4AD_B4FC_41E0_AAC0664780B2); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -74.09,
   "hfov": 10.19,
   "image": {
    "levels": [
     {
      "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.01
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_845180C5_8A5B_9DFC_41DA_6AFBE07EEB10",
   "pitch": -8.01,
   "yaw": -74.09,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.19,
   "distance": 50
  }
 ],
 "id": "overlay_87941342_8A5E_BCF4_41C8_10EDDFF14FC4",
 "data": {
  "label": "Arrow 01 Left-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B, this.camera_C36B5C1D_D4AD_B36C_41D3_4FD8849906BF); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 154.15,
   "hfov": 7.88,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -46.45
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_93A8876E_8A5A_848D_41E0_22094F5436CF",
   "pitch": -46.45,
   "yaw": 154.15,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.88,
   "distance": 100
  }
 ],
 "id": "overlay_9CA7EA66_8A5A_8CBD_41DA_55419E68C239",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0, this.camera_C08C4A47_D4AD_B7DC_419C_66253AC819DE); this.mainPlayList.set('selectedIndex', 27)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 78.47,
   "hfov": 6.32,
   "image": {
    "levels": [
     {
      "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.65
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_A4BAB53A_8BEA_8494_41C6_F5C6D227E689",
   "pitch": -13.65,
   "yaw": 78.47,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.32,
   "distance": 50
  }
 ],
 "id": "overlay_AEE8D29D_8BDA_9D8C_41BD_12D9A9D26C17",
 "data": {
  "label": "Arrow 01 Right-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52, this.camera_C1BDFB6C_D4AD_B5AD_41CB_E15E770960C4); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -155.18,
   "hfov": 3.89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.12
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_91E96E22_8A57_84B4_41DF_01428A258E4C",
   "pitch": -16.12,
   "yaw": -155.18,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.89,
   "distance": 50
  }
 ],
 "id": "overlay_92B042AA_8A55_BDB4_41BC_2684FB452D8D",
 "data": {
  "label": "Arrow 01 Right-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011, this.camera_C2BF3C02_D4AD_B354_41DF_2B9AC5256A79); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 28.45,
   "hfov": 10.03,
   "image": {
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.38
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_8451F0C5_8A5B_9DFC_41D1_E40F39B7ECD1",
   "pitch": -18.38,
   "yaw": 28.45,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.03,
   "distance": 50
  }
 ],
 "id": "overlay_9A591837_8A5E_8C9C_41E0_2DB4B0A05BA3",
 "data": {
  "label": "Arrow 01 Right-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE, this.camera_C2AF3BF9_D4AD_B4B4_41CF_0D6FEC53C4B0); this.mainPlayList.set('selectedIndex', 33)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -87.48,
   "hfov": 10.04,
   "image": {
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.82
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_845130C5_8A5B_9DFC_41D2_FA8D91EE70DA",
   "pitch": -12.82,
   "yaw": -87.48,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.04,
   "distance": 50
  }
 ],
 "id": "overlay_847B3C85_8A5E_847F_41A0_619E529D0775",
 "data": {
  "label": "Arrow 01 Left-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21, this.camera_C35D3C14_D4AD_B37C_41E4_D8EE61B3A269); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 164.51,
   "hfov": 11.08,
   "image": {
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.4
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_980BB0B4_8ADE_BD9C_41D2_6067A997AD7E",
   "pitch": -14.4,
   "yaw": 164.51,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.08,
   "distance": 100
  }
 ],
 "id": "overlay_985C2AD5_8ADD_8D9C_41E0_9973DE59674D",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A, this.camera_C34D0C0B_D4AD_B354_41E3_90DDE1E5E25D); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -33.85,
   "hfov": 9.97,
   "image": {
    "levels": [
     {
      "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.15
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_93A38A9F_8A5A_8D8C_41D6_C514AA7FA387",
   "pitch": -8.15,
   "yaw": -33.85,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.97,
   "distance": 100
  }
 ],
 "id": "overlay_9C141389_8A5A_9C74_41E0_DEE041939AF8",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52, this.camera_C0259A0C_D4AD_B76C_41E3_D1FBFFBB7198); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 60.53,
   "hfov": 10.48,
   "image": {
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.59
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_AAD36620_8A56_84B4_41CA_F5FDD7DA9EFE",
   "pitch": -23.59,
   "yaw": 60.53,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.48,
   "distance": 100
  }
 ],
 "id": "overlay_90C4B3BC_8A6F_838D_41D4_35D87BEAF76C",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF, this.camera_C007D9FA_D4AD_B4B4_41D7_91C76E9E9F0B); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -117.42,
   "hfov": 5.13,
   "image": {
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.79
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_AAD38620_8A56_84B4_41DA_7933CB071328",
   "pitch": -18.79,
   "yaw": -117.42,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.13,
   "distance": 100
  }
 ],
 "id": "overlay_90497676_8A6A_849C_41C9_773C5422DBE9",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26, this.camera_C0144A03_D4AD_B754_41C3_410C576F50BE); this.mainPlayList.set('selectedIndex', 20)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 29.58,
   "hfov": 5.76,
   "image": {
    "levels": [
     {
      "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -56.57
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_AAD01620_8A56_84B4_41D0_14F5FD121C53",
   "pitch": -56.57,
   "yaw": 29.58,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.76,
   "distance": 50
  }
 ],
 "id": "overlay_9064CA68_8A55_8CB4_41D4_0075298C0116",
 "data": {
  "label": "Arrow 01 Left-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9A8FB739_8A6A_8497_41AB_D0C15E31E1E9, this.camera_81E543EC_903E_6F0B_41DE_094D48B9170A)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 60.6,
   "hfov": 4.11,
   "image": {
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.99
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_AB293999_8BBD_8F94_41BE_DEC0ED489E28",
   "pitch": -5.99,
   "yaw": 60.6,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.11,
   "distance": 100
  }
 ],
 "id": "overlay_957760EE_8BBB_FD8C_41D7_2981D49F5313",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9436AF9F_8BBB_838C_41CF_8387E359C040, this.camera_C3375C48_D4AD_B3D4_41D8_B8B0A98AE1CD); this.mainPlayList.set('selectedIndex', 25)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -127.02,
   "hfov": 4.21,
   "image": {
    "levels": [
     {
      "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.6
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_AA266A4A_8BB6_8CF4_41DC_AEC41F186E44",
   "pitch": -15.6,
   "yaw": -127.02,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.21,
   "distance": 100
  }
 ],
 "id": "overlay_94C04A93_8BBA_8D94_41E0_864608603980",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE, this.camera_C0C3BA1D_D4AD_B76C_418E_33F951074774); this.mainPlayList.set('selectedIndex', 33)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 75.76,
   "hfov": 10.87,
   "image": {
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.17
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_A92EB4C5_8BAA_85FC_41C6_644C3BC9478D",
   "pitch": -18.17,
   "yaw": 75.76,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.87,
   "distance": 100
  }
 ],
 "id": "overlay_965EC472_8BAA_8495_41DB_0E56FFA763DA",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498, this.camera_C0327A14_D4AD_B77C_41D9_E844168E3A74); this.mainPlayList.set('selectedIndex', 32)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -22.12,
   "hfov": 5.24,
   "image": {
    "levels": [
     {
      "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.84
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_9AF2187D_8EFD_0E2B_41E1_4B76B0C06B4E",
   "pitch": -7.84,
   "yaw": -22.12,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.24,
   "distance": 100
  }
 ],
 "id": "overlay_9F18DD27_8EFB_0627_41D8_353810C63A0C",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8, this.camera_C7D3F989_D4AD_B554_41E7_EB655A93BBC8); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 70.41,
   "hfov": 8.64,
   "image": {
    "levels": [
     {
      "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.56
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_920075A2_8AFB_87B4_41DF_73F24B1E3859",
   "pitch": -15.56,
   "yaw": 70.41,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.64,
   "distance": 100
  }
 ],
 "id": "overlay_9FC74F80_8AFA_8475_41D3_C846F7AB24EC",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162, this.camera_C0E1BA2E_D4AD_B7AC_41CC_CEE05EA0E982); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -21.36,
   "hfov": 11.38,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.89
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_9912CE55_8A7E_849C_41E0_0BA495F5E4FE",
   "pitch": -5.89,
   "yaw": -21.36,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.38,
   "distance": 100
  }
 ],
 "id": "overlay_9A773555_8A7E_849C_41D0_CAEC999E252E",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_98AA559B_8A76_8794_41CA_9930712915C9, this.camera_C0D39A26_D4AD_B75C_41E2_1C484D102764); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 170.28,
   "hfov": 10.67,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.12
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_992C825A_8A76_BC94_419B_437C349D2AE0",
   "pitch": -21.12,
   "yaw": 170.28,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.67,
   "distance": 100
  }
 ],
 "id": "overlay_9A030052_8A76_BC94_41B2_1C27958BDB43",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 75.83,
   "hfov": 9.58,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -33.13
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_9850958A_8AB5_8474_41DE_E7401C1B01EE",
   "pitch": -33.13,
   "yaw": 75.83,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.58,
   "distance": 100
  }
 ],
 "id": "overlay_98B10DCE_8ABB_878C_41B9_B0DC6841817A",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95, this.camera_C24B2B75_D4AD_B5BC_41D1_91B795C18A6F); this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 113.42,
   "hfov": 6.8,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -48.65
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_91E99E22_8A57_84B4_41AD_D712F05AAE59",
   "pitch": -48.65,
   "yaw": 113.42,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.8,
   "distance": 50
  }
 ],
 "id": "overlay_9C8882CF_8A5A_9D8C_41C8_C30CA2A0F909",
 "data": {
  "label": "Arrow 01 Right-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D, this.camera_C25BEB7E_D4AD_B5AC_41B6_11ECE63AE8D3); this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -138.8,
   "hfov": 9.7,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -31.97
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_96498106_8A6A_BC7C_41C6_8097F16D0653",
   "pitch": -31.97,
   "yaw": -138.8,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.7,
   "distance": 100
  }
 ],
 "id": "overlay_93CC75D5_8A6A_879C_41CA_194F9C585764",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_93F12805_8A6E_8C7C_41D9_78F983707124, this.camera_C2790B8F_D4AD_B56C_41E2_D19C0B10AF99); this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -46.96,
   "hfov": 10.65,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.4
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_AAD5B620_8A56_84B4_41DF_B0EC432346CC",
   "pitch": -21.4,
   "yaw": -46.96,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.65,
   "distance": 100
  }
 ],
 "id": "overlay_932122C3_8A6E_9DF4_4199_47069396E3D6",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14, this.camera_C269EB87_D4AD_B55C_41E2_340BC9BEC1E4); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 88.16,
   "hfov": 9.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.66
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_95681603_8A5E_847B_41DF_C3CD357E765D",
   "pitch": -16.66,
   "yaw": 88.16,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.86,
   "distance": 50
  }
 ],
 "id": "overlay_96FECD3A_8A5D_8495_41BE_CF36D02B261C",
 "data": {
  "label": "Arrow 01 Right"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF, this.camera_C7353976_D4AD_B5BC_41E7_FA8E30B06764); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 7.17,
   "hfov": 6.32,
   "image": {
    "levels": [
     {
      "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -52.15
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_87935D76_9016_5B04_41DA_4BB6A4937024",
   "pitch": -52.15,
   "yaw": 7.17,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.32,
   "distance": 50
  }
 ],
 "id": "overlay_83EE6C1C_9016_7904_41BB_C3CF35196CB6",
 "data": {
  "label": "Arrow 01 Left-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B, this.camera_C0FE0A3F_D4AD_B7AC_41E6_1C14D7B1E59C); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -40.26,
   "hfov": 10.02,
   "image": {
    "levels": [
     {
      "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.7
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_980E40B4_8ADE_BD9C_41D6_288FD71EEFB0",
   "pitch": -1.7,
   "yaw": -40.26,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.02,
   "distance": 50
  }
 ],
 "id": "overlay_983ED8A9_8ADD_8DB4_41DB_0D3888138C17",
 "data": {
  "label": "Arrow 02 Left"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -136.32,
   "hfov": 11.37,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.3
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_9850658A_8AB5_8474_4184_1E35EEAC68D3",
   "pitch": -6.3,
   "yaw": -136.32,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.37,
   "distance": 100
  }
 ],
 "id": "overlay_9884097B_8AB6_8C8B_41D4_DC45800586ED",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B, this.camera_C77BC945_D4AD_B5DC_41CA_5D46E5EBD6D8); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 132.37,
   "hfov": 9.71,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.48
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_984E1BE3_8AEE_83B4_41B4_54B037B2C132",
   "pitch": -19.48,
   "yaw": 132.37,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.71,
   "distance": 50
  }
 ],
 "id": "overlay_989BDC54_8AED_849C_41D1_7E0A1E9C1954",
 "data": {
  "label": "Arrow 01 Right-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8, this.camera_C704894E_D4AD_B5ED_41EA_3C569B420648); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -82.47,
   "hfov": 10.06,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.41
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_984EBBE3_8AEE_83B4_41D1_17554C282868",
   "pitch": -12.41,
   "yaw": -82.47,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.06,
   "distance": 50
  }
 ],
 "id": "overlay_99D7041B_8AED_8494_41D4_DAE3B054A46A",
 "data": {
  "label": "Arrow 01 Left-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3, this.camera_C70E6958_D4AD_B5F4_41D0_784B3092C1E9); this.mainPlayList.set('selectedIndex', 26)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.93,
   "hfov": 4.79,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.52
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_A4AE953A_8BEA_8494_4197_F6FA4DC345AE",
   "pitch": -8.52,
   "yaw": -2.93,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.79,
   "distance": 50
  }
 ],
 "id": "overlay_A80968E8_8BAB_8DB4_41DC_8334EBC6B1B9",
 "data": {
  "label": "Arrow 01 Left-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2, this.camera_C09CDA50_D4AD_B7F4_41C9_102501D07408); this.mainPlayList.set('selectedIndex', 23)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 129.9,
   "hfov": 7.75,
   "image": {
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -41.16
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_85BBCCB9_900A_590C_41DE_E43A33CBD14F",
   "pitch": -41.16,
   "yaw": 129.9,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.75,
   "distance": 50
  }
 ],
 "id": "overlay_823FAB5C_900A_FF04_41DD_2393E5CA09F0",
 "data": {
  "label": "Arrow 01 Right-Up"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_98AA559B_8A76_8794_41CA_9930712915C9, this.camera_C0AA3A58_D4AD_B7F4_41B2_732C0CC33BFD); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 58.26,
   "hfov": 7.73,
   "image": {
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -47.48
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_85BB5CB9_900A_590C_41D8_2E3084509082",
   "pitch": -47.48,
   "yaw": 58.26,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.73,
   "distance": 100
  }
 ],
 "id": "overlay_826DFCB6_900B_F904_41A1_1CAA12B5FD4E",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9436AF9F_8BBB_838C_41CF_8387E359C040, this.camera_C14A9A73_D4AD_B7B4_41D9_2305BDC9CE92); this.mainPlayList.set('selectedIndex', 25); this.mainPlayList.set('selectedIndex', 25)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -112.44,
   "hfov": 10.06,
   "image": {
    "levels": [
     {
      "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -28.4
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_85BB6CB9_900A_590C_41D1_82AE9A539C7B",
   "pitch": -28.4,
   "yaw": -112.44,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.06,
   "distance": 100
  }
 ],
 "id": "overlay_823C3D2F_900A_3B05_41DF_C3A3475B6D00",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24, this.camera_C2913BE7_D4AD_B4DB_41E3_7A26C08D67BC); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -149.26,
   "hfov": 3.88,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.94
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_A4BB553A_8BEA_8494_41DE_5D4211C9B7A2",
   "pitch": -11.94,
   "yaw": -149.26,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.88,
   "distance": 100
  }
 ],
 "id": "overlay_A89372B7_8BAA_BD9C_41CE_8779ED58CBF0",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0, this.camera_C29F4BF0_D4AD_B4B4_41E0_966A31EF092F); this.mainPlayList.set('selectedIndex', 27)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -58.51,
   "hfov": 1.8,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.44
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_A4BB153A_8BEA_8494_41CB_B2CA0B34D152",
   "pitch": -3.44,
   "yaw": -58.51,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 1.8,
   "distance": 100
  }
 ],
 "id": "overlay_A8CC0E88_8BDF_8474_41C1_528F2DBF6255",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498, this.camera_C158CA81_D4AD_B754_41AA_B2F43E338279); this.mainPlayList.set('selectedIndex', 32)",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 166.49,
   "hfov": 7.79,
   "image": {
    "levels": [
     {
      "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.53
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_8A35EBB0_9902_FE31_41B1_FA696522A3F6",
   "pitch": -19.53,
   "yaw": 166.49,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.79,
   "distance": 100
  }
 ],
 "id": "overlay_899A65B3_9903_AA37_41C1_1651E45E3C67",
 "data": {
  "label": "Arrow 01"
 }
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_99126E55_8A7E_849C_41DD_12E624998647",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9A2B0964_8A55_8CBD_41C7_170DACCDF162_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_99123E55_8A7E_849C_41B7_80CF2C076BC3",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_AE57308D_8BD5_9D8C_41D7_08D9A7E4DD21_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_A4BD353A_8BEA_8494_41D2_0D32CF4EBD7A",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_ACC53403_8BED_8474_41DF_82A610AFBFF9_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_9FD4E991_8ED5_0EFB_41AF_D4203E464BEC",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_92852B35_8A6F_8C9F_41DF_D0B22D98BFD5_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_96D7EE66_8A77_84BD_41E0_089D1A206CA7",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_ABF70036_8BBB_BC9C_41DC_7259CC5F4F49_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_AA265A4A_8BB6_8CF4_41D9_5D0BF88EB7FF",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_AA263A4A_8BB6_8CF4_41E0_6103BFEBFF5E",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9436AF9F_8BBB_838C_41CF_8387E359C040_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_AA26EA4A_8BB6_8CF4_41B9_42356C556C97",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_9AF8487D_8EFD_0E2B_41E1_7C72B547B22C",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9FCCE951_8EF5_0E78_41E1_C79853AD4498_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_8A283BA7_9902_FEDF_41AA_D572B44C74D4",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_AB28C99E_8BBD_8F8D_41C1_9111F9EE43FC",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9582B172_8BBA_BC94_41CE_E78D5C561DD2_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_85A95DEA_91C2_F7BD_41E0_811163682743",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_C7DEF625_D4ED_9F5C_41D5_A3FB355C927D",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_DAA5E4B8_D4EE_BCB4_41D0_60CF985106FE_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_C2F4D7E7_D4F5_FCDC_41E9_5862F0F0D56B",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9D11FF49_91CE_74FF_417C_EB6D5EAD1007_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_85A1FDF3_91C2_F793_4191_4C166E39CB00",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_9A160EC9_8EFF_A34E_41C9_E69EA7CDC22C",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_9A17CEC9_8EFF_A34E_41DE_63ACC805833D",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_9A176EC9_8EFF_A34E_41D1_4936F0E62209",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9EC3DC41_8EF6_66BE_41DF_1F025A9F8EBE_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_824F0192_9016_2B1F_41D8_51059B55CAA7",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_93030EF3_8AF5_859B_4181_4D20C04261AF",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_9302FEF3_8AF5_859B_4196_4C753A3DD3B0",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_99E4F7F9_8AF5_8394_41E1_1C12AA9CB9E3_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_9F7F5540_8AFD_84F4_41C3_1CAD7A14F037",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_984DFBE3_8AEE_83B4_41DA_68B0766C486A",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_9D30BD47_8AF7_84FC_41DF_190BB9667E47",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_9D30CD47_8AF7_84FC_41CB_B4F7BAC37590",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9EDD1EC7_8AEA_85FB_41D8_FA857AA44BD8_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_9D307D47_8AF7_84FC_41B0_0E9734180834",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_BB9E1D3B_AB5A_E62A_41E0_E26799BFA197_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_B3507E35_AB59_A239_41C6_3CE7CF61CD60",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_921F20EE_8A6D_9D8C_41AC_189112708CCA",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9DD50CB0_8A6A_8594_41E0_E487B21FBE7D_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_921EB0EE_8A6D_9D8C_41DF_D46CF2AD2D24",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_99ED022D_8A6E_BC8C_41D9_2C0E2A9D6E02",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_98AA559B_8A76_8794_41CA_9930712915C9_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_9B7A982C_8A56_8C8C_41D0_991BC0FB8FD1",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_9F7EF540_8AFD_84F4_41DB_E5BBEFF93254",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9FF0C7FC_8AFF_838C_41D2_D9B3DA3C7B14_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_932B2554_8A5D_849C_41DE_3FBD649B3CC4",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_A4BB953A_8BEA_8494_41C8_F2A5E00D05A9",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_A4BA653A_8BEA_8494_41CA_BE20AE199CDB",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_A867E7B2_8BDF_8394_41D2_7B83F6E868C0_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_A4BAF53A_8BEA_8494_41D1_6DEC94950743",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_C71C5510_D4F7_9D74_41CD_19783CBBAFB8_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_C2F447E7_D4F5_FCDC_4178_73DB747B1D60",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_9FD59991_8ED5_0EFB_41C8_A70BC03D72CF",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_ACE89391_8BEA_8397_41DF_6BB47747C24D_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_9FD5F991_8ED5_0EFB_41B4_47DA93F47DA7",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_9F05ACEC_8AD7_858C_41DE_23B46E5C1912",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_9F056CEC_8AD7_858C_41CD_F2F064B6195C",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_9E277991_8ED5_0EFB_41DC_AAC886AE2ABF",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_98EC33F5_8ADA_839C_41DC_1768E61B395B_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ],
 "id": "AnimatedImageResource_C7C98613_D4ED_9F74_41E9_52DCD51C32FE",
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_91E5FAC2_8A6A_8DF4_41B2_3BCA68059D26_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_960813EE_8A56_838C_41DC_7BF066162034",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_AAD0B620_8A56_84B4_41D0_E4F2A2B5010B",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_87987D71_9016_5B1C_41DA_590CF9B5E49A",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_90A7050B_8A6D_8474_41E0_075BEC4AEDEF_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_B34CAE30_AB59_A237_41CE_71DF380AA36A",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_86D3BA4D_8A55_8C8C_41E1_1AEBB88DE011_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_845180C5_8A5B_9DFC_41DA_6AFBE07EEB10",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9CBADFA8_8A56_83B4_41A6_414B39BB405A_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_93A8876E_8A5A_848D_41E0_22094F5436CF",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_AE17CDC7_8BDA_87FB_41C4_913A47E0F72D_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_A4BAB53A_8BEA_8494_41C6_F5C6D227E689",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9DD5B0AA_8A5A_BDB5_41DD_DF0D19514F95_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_91E96E22_8A57_84B4_41DF_01428A258E4C",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_8451F0C5_8A5B_9DFC_41D1_E40F39B7ECD1",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_845130C5_8A5B_9DFC_41D2_FA8D91EE70DA",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_980BB0B4_8ADE_BD9C_41D2_6067A997AD7E",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_862B0DA3_8A5E_87B4_41C1_18D6D173F15B_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_93A38A9F_8A5A_8D8C_41D6_C514AA7FA387",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_AAD36620_8A56_84B4_41CA_F5FDD7DA9EFE",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_AAD38620_8A56_84B4_41DA_7933CB071328",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_93F12805_8A6E_8C7C_41D9_78F983707124_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_AAD01620_8A56_84B4_41D0_14F5FD121C53",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_AB293999_8BBD_8F94_41BE_DEC0ED489E28",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_96D452DF_8BB6_9D8C_41C4_287AE0BD1A3C_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_AA266A4A_8BB6_8CF4_41DC_AEC41F186E44",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_A92EB4C5_8BAA_85FC_41C6_644C3BC9478D",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_963C4E36_8BAD_849D_41D3_27AAEAB69D0F_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_9AF2187D_8EFD_0E2B_41E1_4B76B0C06B4E",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_992EFE19_8AEE_8497_41C5_7168906A82C4_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_920075A2_8AFB_87B4_41DF_73F24B1E3859",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_9912CE55_8A7E_849C_41E0_0BA495F5E4FE",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_992C825A_8A76_BC94_419B_437C349D2AE0",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9A53D395_8A77_839C_41C8_70478C88A4B1_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_9850958A_8AB5_8474_41DE_E7401C1B01EE",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_91E99E22_8A57_84B4_41AD_D712F05AAE59",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_96498106_8A6A_BC7C_41C6_8097F16D0653",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_AAD5B620_8A56_84B4_41DF_B0EC432346CC",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9CF5B113_8A5F_FC94_41DD_D4F05E23CA52_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_95681603_8A5E_847B_41DF_C3CD357E765D",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_82BAF319_901A_2F0D_41C4_309B78B0C979_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_87935D76_9016_5B04_41DA_4BB6A4937024",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 4,
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_990074A9_8ADA_85B4_41D0_AF1AE3660D21_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 380,
   "height": 570
  }
 ],
 "id": "AnimatedImageResource_980E40B4_8ADE_BD9C_41D6_288FD71EEFB0",
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9AD96E74_8A6A_849D_41D6_6F3EE157C63E_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_9850658A_8AB5_8474_4184_1E35EEAC68D3",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_984E1BE3_8AEE_83B4_41B4_54B037B2C132",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_984EBBE3_8AEE_83B4_41D1_17554C282868",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9E95379C_8ADA_838C_41E0_CCE482E15D24_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_A4AE953A_8BEA_8494_4197_F6FA4DC345AE",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 300
  }
 ],
 "id": "AnimatedImageResource_85BBCCB9_900A_590C_41DE_E43A33CBD14F",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_85BB5CB9_900A_590C_41D8_2E3084509082",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_81E35FB0_9009_F71B_41D2_FF2B371E1B36_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_85BB6CB9_900A_590C_41D1_82AE9A539C7B",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_A4BB553A_8BEA_8494_41DE_5D4211C9B7A2",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_A9E97277_8BAB_9C9C_41AD_2DA84F3BBEA3_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_A4BB153A_8BEA_8494_41CB_B2CA0B34D152",
 "frameCount": 9
},
{
 "class": "AnimatedImageResource",
 "colCount": 3,
 "rowCount": 3,
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_9607D4FC_9906_6A31_41DB_47B84633749D_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 300,
   "height": 270
  }
 ],
 "id": "AnimatedImageResource_8A35EBB0_9902_FE31_41B1_FA696522A3F6",
 "frameCount": 9
}],
 "desktopMipmappingEnabled": false,
 "minWidth": 20,
 "verticalAlign": "top",
 "borderRadius": 0,
 "backgroundPreloadEnabled": true,
 "borderSize": 0,
 "height": "100%",
 "mobileMipmappingEnabled": false,
 "gap": 10,
 "layout": "absolute",
 "paddingBottom": 0,
 "vrPolyfillScale": 0.5,
 "paddingTop": 0,
 "class": "Player",
 "contentOpaque": false,
 "shadow": false,
 "scripts": {
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "registerKey": function(key, value){  window[key] = value; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getKey": function(key){  return window[key]; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "existsKey": function(key){  return key in window; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "unregisterKey": function(key){  delete window[key]; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; }
 },
 "data": {
  "name": "Player445"
 },
 "mouseWheelEnabled": true,
 "scrollBarColor": "#000000"
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
