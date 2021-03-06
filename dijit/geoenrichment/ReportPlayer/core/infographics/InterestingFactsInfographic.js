// COPYRIGHT © 2017 Esri
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
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/dom-construct","dojo/dom-style","dijit/_WidgetBase","dijit/_TemplatedMixin","esri/dijit/geoenrichment/_Invoke","./infographicUtils/InfographicThemeUtil","./infographicUtils/InfographicLayoutResizer","esri/dijit/geoenrichment/utils/DomUtil","dojo/text!../templates/InterestingFactsInfographic.html","dojo/i18n!../../../../../nls/jsapi"],function(t,e,i,n,o,h,s,r,l,a,u,d){return d=d.geoenrichment.dijit.ReportPlayer.ReportPlayer,t([o,h,s],{templateString:u,nls:d,viewModel:null,themeContext:null,theme:null,_currentInfographicJson:null,postCreate:function(){this.inherited(arguments)},updateInfographic:function(t){if(this.domNode){this._currentInfographicJson=this._applyThemeToJson(t);var e=this.viewModel.getStaticInfographicDefaultStyles(this.theme||this.themeContext);n.set(this.domNode,"backgroundColor",t.style.backgroundColor||e&&e.backgroundColor),this.invoke("_doUpdateContent",50)}},_resizeContent:function(){var t={w:this.width,h:this.height};l.resizeLayout(this._currentInfographicJson,t),n.set(this.domNode,{width:this.width+"px",height:this.height+"px"})},_doUpdateContent:function(){this._resizeContent()},_getAttributesStyle:function(){return this.__getContentStyle("attributesStyle")},_getNotesStyle:function(){return this.__getContentStyle("notesStyle")},__getContentStyle:function(t){var i=this.viewModel.getDocumentDefaultStyles(this.theme||this.themeContext);return e.mixin({},i,this.viewModel.getTableDefaultStyles(this.theme||this.themeContext,"Default"),this._currentInfographicJson[t])},width:null,height:null,resize:function(t,e){this.width=t,this.height=e,this.invoke("_doUpdateContent",50)},_applyThemeToJson:function(t){var e=this.viewModel.getStaticInfographicDefaultStyles(this.theme||this.themeContext);return r.applyThemeSettingsToJson(t,e)},_undoThemeFromJson:function(t){return t},toJson:function(){var t=e.clone(this._currentInfographicJson);return this._undoThemeFromJson(t)},destroy:function(){this.inherited(arguments)}})});