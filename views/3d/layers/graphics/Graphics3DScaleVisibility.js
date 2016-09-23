// COPYRIGHT © 2016 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.1/esri/copyright.txt for details.

define(["require","exports"],function(e,i){function a(e,i){return null!==e&&e>0&&8e7>e||i>1e3}var t="VISIBILITY_SCALERANGE",l="VISIBILITY_SCALERANGE_LABEL",n=function(){function e(){this._scaleRangeActive=!1,this.layerScaleRangeVisibility=!0,this.layerScaleRangeVisibilityDirty=!0,this.layerScaleRangeVisibilityQuery=!1,this.scaleChangeEventHandle=null,this.layerView=null,this.layer=null,this.spatialIndex=null,this.extent=null,this.graphicsCore=null,this.basemapTerrain=null}return e.prototype.initialize=function(e,i,t,l,n){this.layerView=e,this.layer=i,this.spatialIndex=t,this.graphicsCore=l,this._scaleRangeActive=a(i.minScale,i.maxScale),this.basemapTerrain=n,this.layerMinMaxScaleChangeHandler(!1)},e.prototype.destroy=function(){this.scaleChangeEventHandle&&(this.scaleChangeEventHandle.remove(),this.scaleChangeEventHandle=null),this.layerView=null,this.extent=null,this.spatialIndex=null,this.graphicsCore=null},e.prototype.needsIdleUpdate=function(){return this.layerView.view.basemapTerrain&&this.layerScaleRangeVisibilityDirty},e.prototype.canResume=function(){return this.layerScaleRangeVisibility},e.prototype.setExtent=function(e){this.extent=e,this.layerScaleRangeVisibilityDirty=!0},e.prototype.idleUpdate=function(e){this.layerView.view.basemapTerrain&&(e.done()||this.layerScaleRangeVisibilityDirty&&(this.updateSuspendScaleVisible(),this.layerScaleRangeVisibilityDirty=!1))},e.prototype.scaleRangeActive=function(){return this._scaleRangeActive},e.prototype.updateSuspendScaleVisibleFinish=function(e){this.layerScaleRangeVisibilityQuery=!1,this.layerScaleRangeVisibility!==e&&(this.layerScaleRangeVisibility=e,this.layerView._notifySuspendedChange())},e.prototype.updateSuspendScaleVisible=function(){var e=this,i=this.layerView.view.basemapTerrain;this.extent&&i&&this._scaleRangeActive?this.layerScaleRangeVisibilityQuery||(this.layerScaleRangeVisibilityQuery=!0,i.queryVisibleScaleRange(this.extent,this.layer.minScale,this.layer.maxScale,function(i){return e.updateSuspendScaleVisibleFinish(i)})):this.updateSuspendScaleVisibleFinish(!0)},e.prototype.visibleAtScale=function(e){var i=this.layer.minScale,a=this.layer.maxScale;return e>a&&(!i||i>e)},e.prototype.visibleAtScaleLabel=function(e,i){return e>i.maxScale&&(!i.minScale||e<i.minScale)},e.prototype.graphicVisible=function(e,i){var a;if(i.centroid?a=i.centroid:"point"===e.geometry.type&&(a=e.geometry),a){var t=this.layerView.view.basemapTerrain,l=t?this.layerView.view.basemapTerrain.getScale(a):1;return this.visibleAtScale(l)}return!0},e.prototype.updateGraphicScaleVisibility=function(e,i){if(this._scaleRangeActive&&i.addedToSpatialIndex){var a=this.graphicVisible(e,i);return i.setVisibilityFlag(t,a)}return!1},e.prototype.scaleUpdateHandler=function(e){var i=this;if(!this.layerView.suspended&&this.spatialIndex.hasGraphics()){var a=e.extent,n=e.scale;this.spatialIndex.intersects(a,e.spatialReference,function(e,s){for(var r=i.visibleAtScale(n),c=!1,h=0;s>h;h++){var y=e[h],p=i.graphicsCore.getGraphics3DGraphicById(y);if(p){var o=p.centroid;if(o&&(a[0]>o.x||a[1]>o.y||a[2]<o.x||a[3]<o.y))continue;for(var u=p.setVisibilityFlag(t,r),d=0;d<p._labelGraphics.length;d++){var g=p._labelGraphics[d];if(g._labelClass&&null!=g._labelClass.minScale&&null!=g._labelClass.maxScale){var S=i.visibleAtScaleLabel(n,g._labelClass);u=u||g.setVisibilityFlag(l,S)}}u&&i.layerView.view.labelManager.setDirty(),u&&p.isDraped()&&(c=!0)}}c&&i.layerView._notifyDrapedDataChange()})}this.layerScaleRangeVisibilityDirty=!0},e.prototype.layerMinMaxScaleChangeHandler=function(e){var i=this;void 0===e&&(e=!0);var t=this.layer;this._scaleRangeActive=a(t.minScale,t.maxScale),this._scaleRangeActive&&!this.scaleChangeEventHandle?(this.scaleChangeEventHandle=this.basemapTerrain.on("scale-change",function(e){return i.scaleUpdateHandler(e)}),this.layerView.suspended||this.spatialIndex.addGraphicsToSpatialIndex(this._scaleRangeActive)):!this._scaleRangeActive&&this.scaleChangeEventHandle&&(this.scaleChangeEventHandle.remove(),this.scaleChangeEventHandle=null),!this.layerView.suspended&&e&&this.graphicsCore.updateAllGraphicsVisibility(),this.layerScaleRangeVisibilityDirty=!0},e}();return n});