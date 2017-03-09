/**
 * @name InfoBox
 * @version 1.1.13 [March 19, 2014]
 * @author Gary Little (inspired by proof-of-concept code from Pamela Fox of Google)
 * @copyright Copyright 2010 Gary Little [gary at luxcentral.com]
 * @fileoverview InfoBox extends the Google Maps JavaScript API V3 <tt>OverlayView</tt> class.
 *  <p>
 *  An InfoBox behaves like a <tt>google.maps.InfoWindow</tt>, but it supports several
 *  additional properties for advanced styling. An InfoBox can also be used as a map label.
 *  <p>
 *  An InfoBox also fires the same events as a <tt>google.maps.InfoWindow</tt>.
 */

/*!
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*jslint browser:true */
/*global google */

/**
 * @name InfoBoxOptions
 * @class This class represents the optional parameter passed to the {@link InfoBox} constructor.
 * @property {string|Node} content The content of the InfoBox (plain text or an HTML DOM node).
 * @property {boolean} [disableAutoPan=false] Disable auto-pan on <tt>open</tt>.
 * @property {number} maxWidth The maximum width (in pixels) of the InfoBox. Set to 0 if no maximum.
 * @property {Size} pixelOffset The offset (in pixels) from the top left corner of the InfoBox
 *  (or the bottom left corner if the <code>alignBottom</code> property is <code>true</code>)
 *  to the map pixel corresponding to <tt>position</tt>.
 * @property {LatLng} position The geographic location at which to display the InfoBox.
 * @property {number} zIndex The CSS z-index style value for the InfoBox.
 *  Note: This value overrides a zIndex setting specified in the <tt>boxStyle</tt> property.
 * @property {string} [boxClass="infoBox"] The name of the CSS class defining the styles for the InfoBox container.
 * @property {Object} [boxStyle] An object literal whose properties define specific CSS
 *  style values to be applied to the InfoBox. Style values defined here override those that may
 *  be defined in the <code>boxClass</code> style sheet. If this property is changed after the
 *  InfoBox has been created, all previously set styles (except those defined in the style sheet)
 *  are removed from the InfoBox before the new style values are applied.
 * @property {string} closeBoxMargin The CSS margin style value for the close box.
 *  The default is "2px" (a 2-pixel margin on all sides).
 * @property {string} closeBoxURL The URL of the image representing the close box.
 *  Note: The default is the URL for Google's standard close box.
 *  Set this property to "" if no close box is required.
 * @property {Size} infoBoxClearance Minimum offset (in pixels) from the InfoBox to the
 *  map edge after an auto-pan.
 * @property {boolean} [isHidden=false] Hide the InfoBox on <tt>open</tt>.
 *  [Deprecated in favor of the <tt>visible</tt> property.]
 * @property {boolean} [visible=true] Show the InfoBox on <tt>open</tt>.
 * @property {boolean} alignBottom Align the bottom left corner of the InfoBox to the <code>position</code>
 *  location (default is <tt>false</tt> which means that the top left corner of the InfoBox is aligned).
 * @property {string} pane The pane where the InfoBox is to appear (default is "floatPane").
 *  Set the pane to "mapPane" if the InfoBox is being used as a map label.
 *  Valid pane names are the property names for the <tt>google.maps.MapPanes</tt> object.
 * @property {boolean} enableEventPropagation Propagate mousedown, mousemove, mouseover, mouseout,
 *  mouseup, click, dblclick, touchstart, touchend, touchmove, and contextmenu events in the InfoBox
 *  (default is <tt>false</tt> to mimic the behavior of a <tt>google.maps.InfoWindow</tt>). Set
 *  this property to <tt>true</tt> if the InfoBox is being used as a map label.
 */

/**
 * Creates an InfoBox with the options specified in {@link InfoBoxOptions}.
 *  Call <tt>InfoBox.open</tt> to add the box to the map.
 * @constructor
 * @param {InfoBoxOptions} [opt_opts]
 */
function InfoBox(opt_opts) {

  opt_opts = opt_opts || {};

  google.maps.OverlayView.apply(this, arguments);

  // Standard options (in common with google.maps.InfoWindow):
  //
  this.content_ = opt_opts.content || "";
  this.disableAutoPan_ = opt_opts.disableAutoPan || false;
  this.maxWidth_ = opt_opts.maxWidth || 0;
  this.pixelOffset_ = opt_opts.pixelOffset || new google.maps.Size(0, 0);
  this.position_ = opt_opts.position || new google.maps.LatLng(0, 0);
  this.zIndex_ = opt_opts.zIndex || null;

  // Additional options (unique to InfoBox):
  //
  this.boxClass_ = opt_opts.boxClass || "infoBox";
  this.boxStyle_ = opt_opts.boxStyle || {};
  this.closeBoxMargin_ = opt_opts.closeBoxMargin || "2px";
  this.closeBoxURL_ = opt_opts.closeBoxURL || "http://www.google.com/intl/en_us/mapfiles/close.gif";
  if (opt_opts.closeBoxURL === "") {
    this.closeBoxURL_ = "";
  }
  this.infoBoxClearance_ = opt_opts.infoBoxClearance || new google.maps.Size(1, 1);

  if (typeof opt_opts.visible === "undefined") {
    if (typeof opt_opts.isHidden === "undefined") {
      opt_opts.visible = true;
    } else {
      opt_opts.visible = !opt_opts.isHidden;
    }
  }
  this.isHidden_ = !opt_opts.visible;

  this.alignBottom_ = opt_opts.alignBottom || false;
  this.pane_ = opt_opts.pane || "floatPane";
  this.enableEventPropagation_ = opt_opts.enableEventPropagation || false;

  this.div_ = null;
  this.closeListener_ = null;
  this.moveListener_ = null;
  this.contextListener_ = null;
  this.eventListeners_ = null;
  this.fixedWidthSet_ = null;
}

/* InfoBox extends OverlayView in the Google Maps API v3.
 */
InfoBox.prototype = new google.maps.OverlayView();

/**
 * Creates the DIV representing the InfoBox.
 * @private
 */
InfoBox.prototype.createInfoBoxDiv_ = function () {

  var i;
  var events;
  var bw;
  var me = this;

  // This handler prevents an event in the InfoBox from being passed on to the map.
  //
  var cancelHandler = function (e) {
    e.cancelBubble = true;
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };

  // This handler ignores the current event in the InfoBox and conditionally prevents
  // the event from being passed on to the map. It is used for the contextmenu event.
  //
  var ignoreHandler = function (e) {

    e.returnValue = false;

    if (e.preventDefault) {

      e.preventDefault();
    }

    if (!me.enableEventPropagation_) {

      cancelHandler(e);
    }
  };

  if (!this.div_) {

    this.div_ = document.createElement("div");

    this.setBoxStyle_();

    if (typeof this.content_.nodeType === "undefined") {
      this.div_.innerHTML = this.getCloseBoxImg_() + this.content_;
    } else {
      this.div_.innerHTML = this.getCloseBoxImg_();
      this.div_.appendChild(this.content_);
    }

    // Add the InfoBox DIV to the DOM
    this.getPanes()[this.pane_].appendChild(this.div_);

    this.addClickHandler_();

    if (this.div_.style.width) {

      this.fixedWidthSet_ = true;

    } else {

      if (this.maxWidth_ !== 0 && this.div_.offsetWidth > this.maxWidth_) {

        this.div_.style.width = this.maxWidth_;
        this.div_.style.overflow = "auto";
        this.fixedWidthSet_ = true;

      } else { // The following code is needed to overcome problems with MSIE

        bw = this.getBoxWidths_();

        this.div_.style.width = (this.div_.offsetWidth - bw.left - bw.right) + "px";
        this.fixedWidthSet_ = false;
      }
    }

    this.panBox_(this.disableAutoPan_);

    if (!this.enableEventPropagation_) {

      this.eventListeners_ = [];

      // Cancel event propagation.
      //
      // Note: mousemove not included (to resolve Issue 152)
      events = ["mousedown", "mouseover", "mouseout", "mouseup",
      "click", "dblclick", "touchstart", "touchend", "touchmove"];

      for (i = 0; i < events.length; i++) {

        this.eventListeners_.push(google.maps.event.addDomListener(this.div_, events[i], cancelHandler));
      }
      
      // Workaround for Google bug that causes the cursor to change to a pointer
      // when the mouse moves over a marker underneath InfoBox.
      this.eventListeners_.push(google.maps.event.addDomListener(this.div_, "mouseover", function (e) {
        this.style.cursor = "default";
      }));
    }

    this.contextListener_ = google.maps.event.addDomListener(this.div_, "contextmenu", ignoreHandler);

    /**
     * This event is fired when the DIV containing the InfoBox's content is attached to the DOM.
     * @name InfoBox#domready
     * @event
     */
    google.maps.event.trigger(this, "domready");
  }
};

/**
 * Returns the HTML <IMG> tag for the close box.
 * @private
 */
InfoBox.prototype.getCloseBoxImg_ = function () {

  var img = "";

  if (this.closeBoxURL_ !== "") {

    img  = "<img";
    img += " src='" + this.closeBoxURL_ + "'";
    img += " align=right"; // Do this because Opera chokes on style='float: right;'
    img += " style='";
    img += " position: relative;"; // Required by MSIE
    img += " cursor: pointer;";
    img += " margin: " + this.closeBoxMargin_ + ";";
    img += "'>";
  }

  return img;
};

/**
 * Adds the click handler to the InfoBox close box.
 * @private
 */
InfoBox.prototype.addClickHandler_ = function () {

  var closeBox;

  if (this.closeBoxURL_ !== "") {

    closeBox = this.div_.firstChild;
    this.closeListener_ = google.maps.event.addDomListener(closeBox, "click", this.getCloseClickHandler_());

  } else {

    this.closeListener_ = null;
  }
};

/**
 * Returns the function to call when the user clicks the close box of an InfoBox.
 * @private
 */
InfoBox.prototype.getCloseClickHandler_ = function () {

  var me = this;

  return function (e) {

    // 1.0.3 fix: Always prevent propagation of a close box click to the map:
    e.cancelBubble = true;

    if (e.stopPropagation) {

      e.stopPropagation();
    }

    /**
     * This event is fired when the InfoBox's close box is clicked.
     * @name InfoBox#closeclick
     * @event
     */
    google.maps.event.trigger(me, "closeclick");

    me.close();
  };
};

/**
 * Pans the map so that the InfoBox appears entirely within the map's visible area.
 * @private
 */
InfoBox.prototype.panBox_ = function (disablePan) {

  var map;
  var bounds;
  var xOffset = 0, yOffset = 0;

  if (!disablePan) {

    map = this.getMap();

    if (map instanceof google.maps.Map) { // Only pan if attached to map, not panorama

      if (!map.getBounds().contains(this.position_)) {
      // Marker not in visible area of map, so set center
      // of map to the marker position first.
        map.setCenter(this.position_);
      }

      bounds = map.getBounds();

      var mapDiv = map.getDiv();
      var mapWidth = mapDiv.offsetWidth;
      var mapHeight = mapDiv.offsetHeight;
      var iwOffsetX = this.pixelOffset_.width;
      var iwOffsetY = this.pixelOffset_.height;
      var iwWidth = this.div_.offsetWidth;
      var iwHeight = this.div_.offsetHeight;
      var padX = this.infoBoxClearance_.width;
      var padY = this.infoBoxClearance_.height;
      var pixPosition = this.getProjection().fromLatLngToContainerPixel(this.position_);

      if (pixPosition.x < (-iwOffsetX + padX)) {
        xOffset = pixPosition.x + iwOffsetX - padX;
      } else if ((pixPosition.x + iwWidth + iwOffsetX + padX) > mapWidth) {
        xOffset = pixPosition.x + iwWidth + iwOffsetX + padX - mapWidth;
      }
      if (this.alignBottom_) {
        if (pixPosition.y < (-iwOffsetY + padY + iwHeight)) {
          yOffset = pixPosition.y + iwOffsetY - padY - iwHeight;
        } else if ((pixPosition.y + iwOffsetY + padY) > mapHeight) {
          yOffset = pixPosition.y + iwOffsetY + padY - mapHeight;
        }
      } else {
        if (pixPosition.y < (-iwOffsetY + padY)) {
          yOffset = pixPosition.y + iwOffsetY - padY;
        } else if ((pixPosition.y + iwHeight + iwOffsetY + padY) > mapHeight) {
          yOffset = pixPosition.y + iwHeight + iwOffsetY + padY - mapHeight;
        }
      }

      if (!(xOffset === 0 && yOffset === 0)) {

        // Move the map to the shifted center.
        //
        var c = map.getCenter();
        map.panBy(xOffset, yOffset);
      }
    }
  }
};

/**
 * Sets the style of the InfoBox by setting the style sheet and applying
 * other specific styles requested.
 * @private
 */
InfoBox.prototype.setBoxStyle_ = function () {

  var i, boxStyle;

  if (this.div_) {

    // Apply style values from the style sheet defined in the boxClass parameter:
    this.div_.className = this.boxClass_;

    // Clear existing inline style values:
    this.div_.style.cssText = "";

    // Apply style values defined in the boxStyle parameter:
    boxStyle = this.boxStyle_;
    for (i in boxStyle) {

      if (boxStyle.hasOwnProperty(i)) {

        this.div_.style[i] = boxStyle[i];
      }
    }

    // Fix for iOS disappearing InfoBox problem.
    // See http://stackoverflow.com/questions/9229535/google-maps-markers-disappear-at-certain-zoom-level-only-on-iphone-ipad
    this.div_.style.WebkitTransform = "translateZ(0)";

    // Fix up opacity style for benefit of MSIE:
    //
    if (typeof this.div_.style.opacity !== "undefined" && this.div_.style.opacity !== "") {
      // See http://www.quirksmode.org/css/opacity.html
      this.div_.style.MsFilter = "\"progid:DXImageTransform.Microsoft.Alpha(Opacity=" + (this.div_.style.opacity * 100) + ")\"";
      this.div_.style.filter = "alpha(opacity=" + (this.div_.style.opacity * 100) + ")";
    }

    // Apply required styles:
    //
    this.div_.style.position = "absolute";
    this.div_.style.visibility = 'hidden';
    if (this.zIndex_ !== null) {

      this.div_.style.zIndex = this.zIndex_;
    }
  }
};

/**
 * Get the widths of the borders of the InfoBox.
 * @private
 * @return {Object} widths object (top, bottom left, right)
 */
InfoBox.prototype.getBoxWidths_ = function () {

  var computedStyle;
  var bw = {top: 0, bottom: 0, left: 0, right: 0};
  var box = this.div_;

  if (document.defaultView && document.defaultView.getComputedStyle) {

    computedStyle = box.ownerDocument.defaultView.getComputedStyle(box, "");

    if (computedStyle) {

      // The computed styles are always in pixel units (good!)
      bw.top = parseInt(computedStyle.borderTopWidth, 10) || 0;
      bw.bottom = parseInt(computedStyle.borderBottomWidth, 10) || 0;
      bw.left = parseInt(computedStyle.borderLeftWidth, 10) || 0;
      bw.right = parseInt(computedStyle.borderRightWidth, 10) || 0;
    }

  } else if (document.documentElement.currentStyle) { // MSIE

    if (box.currentStyle) {

      // The current styles may not be in pixel units, but assume they are (bad!)
      bw.top = parseInt(box.currentStyle.borderTopWidth, 10) || 0;
      bw.bottom = parseInt(box.currentStyle.borderBottomWidth, 10) || 0;
      bw.left = parseInt(box.currentStyle.borderLeftWidth, 10) || 0;
      bw.right = parseInt(box.currentStyle.borderRightWidth, 10) || 0;
    }
  }

  return bw;
};

/**
 * Invoked when <tt>close</tt> is called. Do not call it directly.
 */
InfoBox.prototype.onRemove = function () {

  if (this.div_) {

    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  }
};

/**
 * Draws the InfoBox based on the current map projection and zoom level.
 */
InfoBox.prototype.draw = function () {

  this.createInfoBoxDiv_();

  var pixPosition = this.getProjection().fromLatLngToDivPixel(this.position_);

  this.div_.style.left = (pixPosition.x + this.pixelOffset_.width) + "px";
  
  if (this.alignBottom_) {
    this.div_.style.bottom = -(pixPosition.y + this.pixelOffset_.height) + "px";
  } else {
    this.div_.style.top = (pixPosition.y + this.pixelOffset_.height) + "px";
  }

  if (this.isHidden_) {

    this.div_.style.visibility = "hidden";

  } else {

    this.div_.style.visibility = "visible";
  }
};

/**
 * Sets the options for the InfoBox. Note that changes to the <tt>maxWidth</tt>,
 *  <tt>closeBoxMargin</tt>, <tt>closeBoxURL</tt>, and <tt>enableEventPropagation</tt>
 *  properties have no affect until the current InfoBox is <tt>close</tt>d and a new one
 *  is <tt>open</tt>ed.
 * @param {InfoBoxOptions} opt_opts
 */
InfoBox.prototype.setOptions = function (opt_opts) {
  if (typeof opt_opts.boxClass !== "undefined") { // Must be first

    this.boxClass_ = opt_opts.boxClass;
    this.setBoxStyle_();
  }
  if (typeof opt_opts.boxStyle !== "undefined") { // Must be second

    this.boxStyle_ = opt_opts.boxStyle;
    this.setBoxStyle_();
  }
  if (typeof opt_opts.content !== "undefined") {

    this.setContent(opt_opts.content);
  }
  if (typeof opt_opts.disableAutoPan !== "undefined") {

    this.disableAutoPan_ = opt_opts.disableAutoPan;
  }
  if (typeof opt_opts.maxWidth !== "undefined") {

    this.maxWidth_ = opt_opts.maxWidth;
  }
  if (typeof opt_opts.pixelOffset !== "undefined") {

    this.pixelOffset_ = opt_opts.pixelOffset;
  }
  if (typeof opt_opts.alignBottom !== "undefined") {

    this.alignBottom_ = opt_opts.alignBottom;
  }
  if (typeof opt_opts.position !== "undefined") {

    this.setPosition(opt_opts.position);
  }
  if (typeof opt_opts.zIndex !== "undefined") {

    this.setZIndex(opt_opts.zIndex);
  }
  if (typeof opt_opts.closeBoxMargin !== "undefined") {

    this.closeBoxMargin_ = opt_opts.closeBoxMargin;
  }
  if (typeof opt_opts.closeBoxURL !== "undefined") {

    this.closeBoxURL_ = opt_opts.closeBoxURL;
  }
  if (typeof opt_opts.infoBoxClearance !== "undefined") {

    this.infoBoxClearance_ = opt_opts.infoBoxClearance;
  }
  if (typeof opt_opts.isHidden !== "undefined") {

    this.isHidden_ = opt_opts.isHidden;
  }
  if (typeof opt_opts.visible !== "undefined") {

    this.isHidden_ = !opt_opts.visible;
  }
  if (typeof opt_opts.enableEventPropagation !== "undefined") {

    this.enableEventPropagation_ = opt_opts.enableEventPropagation;
  }

  if (this.div_) {

    this.draw();
  }
};

/**
 * Sets the content of the InfoBox.
 *  The content can be plain text or an HTML DOM node.
 * @param {string|Node} content
 */
InfoBox.prototype.setContent = function (content) {
  this.content_ = content;

  if (this.div_) {

    if (this.closeListener_) {

      google.maps.event.removeListener(this.closeListener_);
      this.closeListener_ = null;
    }

    // Odd code required to make things work with MSIE.
    //
    if (!this.fixedWidthSet_) {

      this.div_.style.width = "";
    }

    if (typeof content.nodeType === "undefined") {
      this.div_.innerHTML = this.getCloseBoxImg_() + content;
    } else {
      this.div_.innerHTML = this.getCloseBoxImg_();
      this.div_.appendChild(content);
    }

    // Perverse code required to make things work with MSIE.
    // (Ensures the close box does, in fact, float to the right.)
    //
    if (!this.fixedWidthSet_) {
      this.div_.style.width = this.div_.offsetWidth + "px";
      if (typeof content.nodeType === "undefined") {
        this.div_.innerHTML = this.getCloseBoxImg_() + content;
      } else {
        this.div_.innerHTML = this.getCloseBoxImg_();
        this.div_.appendChild(content);
      }
    }

    this.addClickHandler_();
  }

  /**
   * This event is fired when the content of the InfoBox changes.
   * @name InfoBox#content_changed
   * @event
   */
  google.maps.event.trigger(this, "content_changed");
};

/**
 * Sets the geographic location of the InfoBox.
 * @param {LatLng} latlng
 */
InfoBox.prototype.setPosition = function (latlng) {

  this.position_ = latlng;

  if (this.div_) {

    this.draw();
  }

  /**
   * This event is fired when the position of the InfoBox changes.
   * @name InfoBox#position_changed
   * @event
   */
  google.maps.event.trigger(this, "position_changed");
};

/**
 * Sets the zIndex style for the InfoBox.
 * @param {number} index
 */
InfoBox.prototype.setZIndex = function (index) {

  this.zIndex_ = index;

  if (this.div_) {

    this.div_.style.zIndex = index;
  }

  /**
   * This event is fired when the zIndex of the InfoBox changes.
   * @name InfoBox#zindex_changed
   * @event
   */
  google.maps.event.trigger(this, "zindex_changed");
};

/**
 * Sets the visibility of the InfoBox.
 * @param {boolean} isVisible
 */
InfoBox.prototype.setVisible = function (isVisible) {

  this.isHidden_ = !isVisible;
  if (this.div_) {
    this.div_.style.visibility = (this.isHidden_ ? "hidden" : "visible");
  }
};

/**
 * Returns the content of the InfoBox.
 * @returns {string}
 */
InfoBox.prototype.getContent = function () {

  return this.content_;
};

/**
 * Returns the geographic location of the InfoBox.
 * @returns {LatLng}
 */
InfoBox.prototype.getPosition = function () {

  return this.position_;
};

/**
 * Returns the zIndex for the InfoBox.
 * @returns {number}
 */
InfoBox.prototype.getZIndex = function () {

  return this.zIndex_;
};

/**
 * Returns a flag indicating whether the InfoBox is visible.
 * @returns {boolean}
 */
InfoBox.prototype.getVisible = function () {

  var isVisible;

  if ((typeof this.getMap() === "undefined") || (this.getMap() === null)) {
    isVisible = false;
  } else {
    isVisible = !this.isHidden_;
  }
  return isVisible;
};

/**
 * Shows the InfoBox. [Deprecated; use <tt>setVisible</tt> instead.]
 */
InfoBox.prototype.show = function () {

  this.isHidden_ = false;
  if (this.div_) {
    this.div_.style.visibility = "visible";
  }
};

/**
 * Hides the InfoBox. [Deprecated; use <tt>setVisible</tt> instead.]
 */
InfoBox.prototype.hide = function () {

  this.isHidden_ = true;
  if (this.div_) {
    this.div_.style.visibility = "hidden";
  }
};

/**
 * Adds the InfoBox to the specified map or Street View panorama. If <tt>anchor</tt>
 *  (usually a <tt>google.maps.Marker</tt>) is specified, the position
 *  of the InfoBox is set to the position of the <tt>anchor</tt>. If the
 *  anchor is dragged to a new location, the InfoBox moves as well.
 * @param {Map|StreetViewPanorama} map
 * @param {MVCObject} [anchor]
 */
InfoBox.prototype.open = function (map, anchor) {

  var me = this;

  if (anchor) {

    this.position_ = anchor.getPosition();
    this.moveListener_ = google.maps.event.addListener(anchor, "position_changed", function () {
      me.setPosition(this.getPosition());
    });
  }

  this.setMap(map);

  if (this.div_) {

    this.panBox_();
  }
};

/**
 * Removes the InfoBox from the map.
 */
InfoBox.prototype.close = function () {

  var i;

  if (this.closeListener_) {

    google.maps.event.removeListener(this.closeListener_);
    this.closeListener_ = null;
  }

  if (this.eventListeners_) {
    
    for (i = 0; i < this.eventListeners_.length; i++) {

      google.maps.event.removeListener(this.eventListeners_[i]);
    }
    this.eventListeners_ = null;
  }

  if (this.moveListener_) {

    google.maps.event.removeListener(this.moveListener_);
    this.moveListener_ = null;
  }

  if (this.contextListener_) {

    google.maps.event.removeListener(this.contextListener_);
    this.contextListener_ = null;
  }

  this.setMap(null);
};
;/*

This file contains all of the code running in the background that makes resumeBuilder.js possible. We call these helper functions because they support your code in this course.

Don't worry, you'll learn what's going on in this file throughout the course. You won't need to make any changes to it until you start experimenting with inserting a Google Map in Problem Set 3.

Cameron Pittman
*/
/*
These are HTML strings. As part of the course, you'll be using JavaScript functions
replace the %data% placeholder text you see in them.
*/
var HTMLbioPic = '<div class="col-xs-12 col-sm-6 col-md-5 photo-title"><div class="photo-container"><img class="img-responsive img-circle biopic" src="%data%" alt="Profile photo"></div>';
var HTMLheaderName = '<div class="name-role"><h1 class="text-uppercase name-header">%data%</h1>';
var HTMLheaderRole = '<h2 class="role-header">%data%</h2></div></div>';
var HTMLheaderWelcomeMsg = '<div class="col-xs-12 col-sm-6 col-md-4 welcome-message text-left">%data%</div>';


var HTMLcontactGeneric = '<li class="flex-item"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>';
var HTMLemail = '<li class="flex-item text-uppercase"><a href="mailto:%data%">%data%</a><a class="anchor" id="contactSection"></a></li>';
var HTMLmobile = '<li class="flex-item text-uppercase"><a href="tel:%data%">%data%</a></li>';
var HTMLlocation = '<li class="flex-item text-uppercase">%data%</li>';
var HTMLgithub = '<li class="social-item"><a href="https://github.com/%data%" target="_blank"><i class="fa fa-github-alt social-icon" aria-hidden="true"></i></a></li>';
var HTMLtwitter = '<li class="social-item"><a href="https://twitter.com/%data%" target="_blank"><i class="fa fa-twitter social-icon" aria-hidden="true"></i></span></a></li>';
var HTMLlinkedin = '<li class="social-item"><a href="https://www.linkedin.com/in/jorgeasuaje" target="_blank"><i class="fa fa-linkedin social-icon" aria-hidden="true"></i></span></a></li>';
var HTMLblog = '<li class="flex-item"><span class="orange-text">blog</span><span class="white-text">%data%</span></li>';


var HTMLskillsStart = '<div class="col-xs-12 section-title"><h2>Skills at a Glance</h2></div><div class="col-xs-12"><ul id="skills" class="flex-box"></ul></div><div class="col-xs-12"><hr></div>';
var HTMLskills = '<li class="skill-item flex-box"><span class="rating-text text-capitalize">%data%</span>' +
    '<div class="rating-icons"><i class="fa fa-thumbs-up rating-icon" aria-hidden="true"></i></span><i class="fa fa-thumbs-up rating-icon" aria-hidden="true"></i></span>' +
    '<i class="fa fa-thumbs-up rating-icon" aria-hidden="true"></i></span><i class="fa fa-thumbs-up rating-icon" aria-hidden="true"></i></span>' +
    '<i class="fa fa-thumbs-up rating-icon" aria-hidden="true"></i></span></div></li>';


var HTMLworkStart = '<div class="work-entry col-xs-12 col-sm-9"></div><div class="hidden-xs col-sm-3 empty-space"></div>';
var HTMLworkEmployer = '<a class="entry-title" href="%data%" target="_blank">%data%';
var HTMLworkTitle = ' - %data%</a>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text flex-item"><i class="fa fa-map-marker location-icon" aria-hidden="true"></i></span>%data%</div>';
var HTMLworkDescription = '<p><br><br>%data%</p>';


var HTMLprojectStart = '<div class="project-entry col-xs-12 col-sm-9"></div><div class="hidden-xs col-sm-3 empty-space"></div>';
var HTMLprojectTitle = '<a class="flex-item entry-title" href="%data%" target="_blank">%data%</a>';
var HTMLprojectDates = '<div class="date-text flex-item">%data%</div>';
var HTMLprojectDescription = '<p class="project-text"><br>%data%</p>';
var HTMLprojectImage = '<img class="img-responsive project-photo center-block" src="%data%" alt="Project photo">';
var HTMLprojectImageWithCaption = '<div class="photo-with-caption effect center-block"><p class="caption-text">%data%</p>' +
    '<img class="photo-effect limit-image img-responsive" src="%data%" alt="Project Photo"/></div>';


var HTMLschoolStart = '<div class="education-entry col-xs-12 col-sm-9"></div><div class="hidden-xs col-sm-3 empty-space"></div>';
var HTMLschoolName = '<a class="flex-item entry-title" href="%data%" target="_blank">%data%';
var HTMLschoolDegree = ' - %data%</a>';
var HTMLschoolMajor = '<div class="flex-item"><em>Major: %data%</em></div>';
var HTMLschoolLocation = '<div class="location-text flex-item"><i class="fa fa-map-marker location-icon" aria-hidden="true"></i></span>%data%</div>';
var HTMLschoolDates = '<div class="date-text flex-item">%data%</div>';


var HTMLonlineSchoolStart = '<div class="col-xs-12 col-sm-9 online-title"><h3>Online Classes</h3></div><div class="hidden-xs col-sm-3"></div>';
var HTMLonlineClasses = '<div class="online-education-entry col-xs-12 col-sm-9"></div><div class="hidden-xs col-sm-3 empty-space"></div>';
var HTMLonlineTitle = '<a class="entry-title" href="%data%" target="_blank">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text flex-item">%data%</div>';
var HTMLonlineURL = '<br><a class="example-link" href="%data%">%data%</a>';


var HTMLfooterStart = '<div class="row"><div class="col-xs-4 col-sm-2 text-left footer-name">' +
    '<a href="#main"><h1 class="text-uppercase bottom-mark">%data%</h1></a></div><div class="col-xs-8 col-sm-3 pull-right">' +
    '<ul id="footerContacts" class="flex-box"></ul></div></div>';
var HTMLfooterEmail = '<li class="contact-item hidden-xs text-uppercase"><a href="mailto:%data%" class="text-muted">%data%</a></li>';
var HTMLfooterMobile = '<li class="contact-item hidden-xs"><a href="tel:%data%" class="text-muted">%data%</a></li>';
var HTMLfooterLocation = '<li class="contact-item hidden-xs text-uppercase text-muted">%data%</li>';
var HTMLfooterGithub = '<li class="social-contact-item"><a href="https://github.com/%data%" target="_blank"><i class="fa fa-github-alt social-icon text-muted" aria-hidden="true"></i></a></li>';
var HTMLfooterTwitter = '<li class="social-contact-item"><a href="https://twitter.com/%data%" target="_blank"><i class="fa fa-twitter social-icon text-muted" aria-hidden="true"></i></a></li>';
var HTMLfooterLinkedin = '<li class="social-contact-item"><a href="https://www.linkedin.com/in/%data%" target="_blank"><i class="fa fa-linkedin social-icon text-muted" aria-hidden="true"></i></a></li>';


var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map" class="col-sm-12"></div>';

/*
The International Name challenge in Lesson 2 where you'll create a function that will need this helper code to run. Don't delete! It hooks up your code to the button you'll be appending.
*/
$(document).ready(function() {
    $('button').click(function() {
        var iName = inName() || function() {};
        $('#name').html(iName);
    });
});

/*
The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.
*/
clickLocations = [];

function logClicks(x, y) {
    clickLocations.push({
        x: x,
        y: y
    });
    console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function(loc) {
    logClicks(loc.pageX, loc.pageY);
});

/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map; // declares a global map variable
var currentMarker; //declares a global marker to keep track of the selected marker
var currentInfobox; //declares a global infobox to keep track of the clicked infobox
var initialCenter; //for reset purposes

/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {
    'use strict';
    var locations = [];
    var locationsInfo = {};

    //Object describing map style.
    var styleMap = [{
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "administrative.country",
        "elementType": "geometry",
        "stylers": [{
            "visibility": "on"
        }]
    }, {
        "featureType": "administrative.province",
        "elementType": "geometry",
        "stylers": [{
            "visibility": "on"
        }]
    }, {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#736c68"
        }]
    }, {
        "featureType": "administrative.country",
        "elementType": "geometry",
        "stylers": [{
            "color": "#D1D1D1"
        }]
    }, {
        "featureType": "poi",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "transit",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "road",
        "stylers": [{
            "visibility": "on"
        }]
    }, {
        "featureType": "road.highway",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "landscape",
        "stylers": [{
            "color": "#F6EDED"
        }]
    }, {
        "featureType": "water",
        "stylers": [{
            "visibility": "on"
        }, {
            "color": "#b4e4e0"
        }]
    }];

    var styledMap = new google.maps.StyledMapType(styleMap, {
        name: 'Map Style'
    });

    //The degree to which the map is zoomed in. This can range from 0 (least zoomed) to 21 and above (most zoomed).
    var mapZoom = 2;
    //The max and min zoom levels that are allowed.
    var mapZoomMax = 12;
    var mapZoomMin = 2;


    var mapOptions = {
        //commented in case I decide to disable in the future
        // disableDefaultUI: true,
        zoom: mapZoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        maxZoom: mapZoomMax,
        minZoom: mapZoomMin,
        panControl: true,
        mapTypeControl: false
    };

    //Create logo panel which appears on the right-hand side.
    var logoPanelDiv = document.createElement('div');
    var mapLogoPanel = new createLogoPanel(logoPanelDiv, map);

    //Create the reset map button.
    var resetButtonDiv = document.createElement('div');
    var mapResetButton = new createResetButton(resetButtonDiv, map);

    // This next line makes `map` a new Google Map JavaScript Object and attaches it to
    // <div id="map">, which is appended as part of an exercise late in the course.
    map = new google.maps.Map(document.querySelector('#map'), mapOptions);

    //Assigning the style defined above to the map.
    map.mapTypes.set('map_styled', styledMap);
    //Setting the one of the styles to display as default as the map loads.
    map.setMapTypeId('map_styled');

    //Continuously listens out for when the zoom level changes and closes the active
    //infobox when the map is zoomed out and removes marker bouncing if active
    google.maps.event.addListener(map, "zoom_changed", function() {
        var newZoom = map.getZoom();
        if (newZoom < 11) {
            if (currentInfobox) {
                currentInfobox.close();
            }
            if (currentMarker && currentMarker.getAnimation() !== null) {
                currentMarker.setAnimation(null);
            }
        }
    });

    //Add the control panel and reset button (created previously) to the map.
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(logoPanelDiv);
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(resetButtonDiv);

    /*
    locationFinder() returns an array of every location string from the JSONs
    written for bio, education, and work.
    */
    function locationFinder() {

        // initializes an empty array
        var locations = [];
        var inArray; //to check if location was included

        // adds the location and its information from bio to the arrays
        var contacts = octopus.getContacts();
        locationsInfo[contacts.location.split(',')[0].trim()] = {
            text: contacts.locationText,
            url: contacts.locationURL,
            image: contacts.locationImage
        };
        locations.push(contacts.location);

        // iterates through school locations and appends each location and
        // its information to the arrays
        var schools = octopus.getSchools();
        var len = schools.length;
        for (var school = 0; school < len; school++) {
            inArray = $.inArray(schools[school].location, locations);
            if (inArray == -1) {
                locationsInfo[schools[school].location.split(',')[0].trim()] = {
                    text: schools[school].locationText,
                    url: schools[school].locationURL,
                    image: schools[school].locationImage
                };
                locations.push(schools[school].location);
            }
        }

        // iterates through work locations and appends each location and
        // its information to the arrays
        var jobs = octopus.getJobs();
        len = jobs.length;
        for (var job = 0; job < len; job++) {
            inArray = $.inArray(jobs[job].location, locations);
            if (inArray == -1) {
                locationsInfo[jobs[job].location.split(',')[0].trim()] = {
                    text: jobs[job].locationText,
                    url: jobs[job].locationURL,
                    image: jobs[job].locationImage
                };
                locations.push(jobs[job].location);
            }
        }
        return locations;
    }

    /*
    createMapMarkerAndInfoBox(placeData) reads Google Places search results to create map pins.
    placeData is the object returned from search results containing information
    about a single location.
    */
    function createMapMarkerAndInfoBox(placeData) {
        // The next lines save location data from the search result object to local variables
        var lat = placeData.geometry.location.lat(); // latitude from the place service
        var lon = placeData.geometry.location.lng(); // longitude from the place service
        var name = placeData.name; // name of the place from the place service
        var formattedName = placeData.formatted_address; // name of the place from the place service
        var bounds = window.mapBounds; // current boundaries of the map window
        var infoUrl = locationsInfo[name].url;
        var infoImage = placeData.photos ? placeData.photos[0].getUrl({ 'maxWidth': 200, 'maxHeight': 100 }) : locationsInfo[name].image;
        var infoText = locationsInfo[name].text;


        // marker is an object with additional data about the pin for a single location
        var markerIcon = {
            url: 'images/marker50_opt.png',
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(5.7, 50)
        };

        var marker = new google.maps.Marker({
            map: map,
            position: placeData.geometry.location,
            title: name,
            icon: markerIcon,
            zIndex: 102
        });

        // infoWindows are the little helper windows that open when you click
        // or hover over a pin on a map. They usually contain more information
        // about a location.

        //Creates the information to go in the pop-up info box.
        var boxText = document.createElement("div");
        boxText.className = 'pop-up';
        boxText.innerHTML = '<img class="center-block img-responsive marker-photo" src="' + infoImage +
            '"><h4 class="pop-up-header"><a href="' + infoUrl + '" target="_blank">' + formattedName +
            '</a></h4><p class="pop-up-text">' + infoText + '</p>';

        //Sets up the configuration options of the pop-up info box.
        var infoboxOptions = {
            content: boxText,
            maxWidth: 0,
            pixelOffset: new google.maps.Size(-241, 0),
            zIndex: null,
            boxStyle: {
                background: "url('images/pop_up_box_top_arrow.png') no-repeat",
                opacity: 1,
                width: "330px"
            },
            closeBoxMargin: "10px 2px 2px 2px",
            closeBoxURL: "images/button_close.png",
            infoBoxClearance: new google.maps.Size(1, 1),
            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: false,
            disableAutoPan: true
        };

        //Creates the pop-up infobox, adding the configuration options set above.
        var infobox = new InfoBox(infoboxOptions);

        // hmmmm, I wonder what this is about...
        //Add an 'event listener' to the map marker to listen out for when it is clicked.
        google.maps.event.addListener(marker, "click", function(e) {
            //adding bouncing animation
            if (currentMarker && currentMarker.getAnimation() !== null) {
                currentMarker.setAnimation(null);
            }
            currentMarker = this;
            if (this.getAnimation() === null || typeof this.getAnimation() === 'undefined') {
                this.setAnimation(google.maps.Animation.BOUNCE);
            }

            if (currentInfobox) {
                currentInfobox.close();
            }
            currentInfobox = infobox;
            //Open the info box.
            infobox.open(map, this);
            //Changes the z-index property of the marker to make the marker appear on top of other markers.
            this.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
            //Zooms the map.
            map.setZoom(11);
            //Sets the marker to be the center of the map with a bit of offset for infobox.
            var position = marker.getPosition();
            map.setCenter(new google.maps.LatLng(position.lat() - 0.035, position.lng()));
        });

        google.maps.event.addListener(infobox, "closeclick", function(e) {
            //removing bouncing animation
            if (currentMarker && currentMarker.getAnimation() !== null) {
                currentMarker.setAnimation(null);
            }
        });

        // this is where the pin actually gets added to the map.
        // bounds.extend() takes in a map location object
        bounds.extend(new google.maps.LatLng(lat, lon));
        // fit the map to the new marker
        map.fitBounds(bounds);
        // center the map
        map.setCenter(bounds.getCenter());
        initialCenter = map.getCenter();
    }

    /*
    callback(results, status) makes sure the search returned results for a location.
    If so, it creates a new map marker for that location.
    */
    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            createMapMarkerAndInfoBox(results[0]);
        }
    }

    function createLogoPanel(logoPanelDiv) {
        logoPanelDiv.style.padding = '0px';
        var controlUI = document.createElement('div');
        controlUI.style.margin = '10px';
        logoPanelDiv.appendChild(controlUI);

        //Map title
        var titleBar = document.createElement('div');
        titleBar.style.backgroundColor = '#fef7f7';
        titleBar.style.cssFloat = 'right';

        var bio = octopus.getBio();
        titleBar.innerHTML = '<div class="map-logo box-shadow"><h1 class="text-uppercase name-map">' +
            bio.name.replace(' ', '<br>') + '</h1><h2 class="role-map">' + bio.role + '</h2></div>';
        controlUI.appendChild(titleBar);

    }

    //Function that creates the 'Reser map' button.
    function createResetButton(resetButtonDiv) {
        resetButtonDiv.style.padding = '0px';
        var controlUI2 = document.createElement('div');
        controlUI2.innerHTML = '<div class="reset-container" onClick="javascript:map.setZoom(3); map.setCenter(initialCenter);" >' +
            '<img class="img-responsive reset-image" src="images/restart_opt.png"/></div>';
        resetButtonDiv.appendChild(controlUI2);
    }
    /*
    pinPoster(locations) takes in the array of locations created by locationFinder()
    and fires off Google place searches for each location
    */
    function pinPoster(locations) {

        // creates a Google place search service object. PlacesService does the work of
        // actually searching for location data.
        var service = new google.maps.places.PlacesService(map);

        // Iterates through the array of locations, creates a search object for each location
        var len = locations.length;
        for (var place = 0; place < len; place++) {

            // the search request object
            var request = {
                query: locations[place]
            };

            // Actually searches the Google Maps API for location data and runs the callback
            // function with the search results after each search.
            service.textSearch(request, callback);
        }
    }

    // Sets the boundaries of the map based on pin locations
    window.mapBounds = new google.maps.LatLngBounds();

    // locations is an array of location strings returned from locationFinder()
    locations = locationFinder();

    // pinPoster(locations) creates pins on the map for each location in
    // the locations array
    pinPoster(locations);
}

/*
Uncomment the code below when you're ready to implement a Google Map!
*/

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
    // Make sure the map bounds get updated on page resize
    map.fitBounds(mapBounds);
    initialCenter = map.getCenter();
});
;"use strict";

var model = {
    bio: {
        "name": "Jorge Asuaje",
        "role": "Web Developer",
        "contacts": {
            "mobile": "+1-347-964-4977",
            "email": "jorge.asuaje@gmail.com",
            "github": "bigapplemonkey",
            "twitter": "bigapplemonkey",
            "linkedin": "jorgeasuaje",
            "location": "Jersey City, NJ",
            "locationImage": "http://placehold.it/200x100/F6EDED",
            "locationURL": "https://en.wikipedia.org/wiki/Jersey_City,_New_Jersey",
            "locationText": "Shoulder ball tip cupim tongue beef meatball corned beef turkey."

        },
        "welcomeMessage": "Bacon ipsum dolor amet cupim shoulder enim, ea sed elit lorem pastrami excepteur ut voluptate pork jerky velit. Deserunt ullamco drumstick meatloaf.",
        "skills": [{
            "awesomeness": 5
        }, {
            "delivering things": 4
        }, {
            "cryogenic sleep": 3
        }, {
            "puppeteer master": 0
        }],
        "bioPic": "images/myPhoto_2x.jpg"
    },

    education: {
        "schools": [{
            "name": "NJIT",
            "location": "Newark, NJ",
            "degree": "Masters",
            "majors": ["Computer Science"],
            "dates": "2014",
            "url": "https://www.njit.edu",
            "locationImage": "http://placehold.it/200x100/F6EDED",
            "locationURL": "https://en.wikipedia.org/wiki/Newark,_New_Jersey",
            "locationText": "Shoulder ball tip cupim tongue beef meatball corned beef turkey."

        }, {
            "name": "Simon Bolivar University",
            "location": "Caracas, Venezuela",
            "degree": "BS",
            "majors": ["Electronics Engineering"],
            "dates": "2005",
            "url": "http://www.usb.ve",
            "locationImage": "http://placehold.it/200x100/F6EDED",
            "locationURL": "https://en.wikipedia.org/wiki/Caracas",
            "locationText": "Shoulder ball tip cupim tongue beef meatball corned beef turkey."

        }],
        "onlineCourses": [{
            "title": "JavaScript Syntax",
            "school": "Udacity",
            "schoolUrl": "http://www.udacity.com/courses/ud804",
            "dates": "May 2015",
            "url": "http://example.com"
        }, {
            "title": "JavaScript Syntax",
            "school": "Udacity",
            "schoolUrl": "http://www.udacity.com/courses/ud804",
            "dates": "May 2015",
            "url": "http://example.com"
        }]
    },

    work: {
        "jobs": [{
            "employer": "Brinqa",
            "title": "Software Engineer",
            "dates": "February 2014 - Present",
            "location": "New York, NY",
            "description": "Bacon ipsum dolor amet ham jerky landjaeger frankfurter filet mignon. Turkey kevin pancetta, chicken hamburger corned beef tongue. Pig ham tongue flank short ribs pancetta turducken biltong meatloaf kielbasa alcatra cow t-bone tail. Pig strip steak doner rump drumstick.",
            "url": "http://www.brinqa.com",
            "locationImage": "http://placehold.it/200x100/F6EDED",
            "locationURL": "https://en.wikipedia.org/wiki/New_York_City",
            "locationText": "Shoulder ball tip cupim tongue beef meatball corned beef turkey."
        }, {
            "employer": "PDVSA",
            "title": "Project Engineer",
            "dates": "2006 – 2008",
            "location": "Maracaibo, Venezuela",
            "description": "Ribeye picanha capicola, doner shankle meatball strip steak shank sirloin salami jowl sausage brisket pancetta turducken. Filet mignon turducken sausage drumstick alcatra ball tip. Picanha turkey turducken, beef t-bone ham hock short loin pork loin filet mignon corned beef. Boudin prosciutto spare ribs short ribs salami.",
            "url": "http://www.pdvsa.com",
            "locationImage": "http://placehold.it/200x100/F6EDED",
            "locationURL": "https://en.wikipedia.org/wiki/Maracaibo",
            "locationText": "Shoulder ball tip cupim tongue beef meatball corned beef turkey."
        }]
    },

    projects: {
        "projects": [{
            "title": "GALAXIAN",
            "dates": "2016",
            "description": "Recreation of the classic arcade game Galaxian using a game loop engine. This implementation uses Object-Oriented Javascript and HTML5 Canvas.",
            "images": ["images/project1-large.jpg", "images/project1b-large.jpg"],
            "captions": ["Tail short loin capicola leberkas meatball.", "Tail short loin capicola leberkas meatball."],
            "url": "https://github.com/bigapplemonkey/Classic-Arcade-Game-Clone"
        }, {
            "title": "CUPCAKE FINDER",
            "dates": "2016",
            "description": "This a single page application featuring locations of cupcake shops near you built using a Model-View-ViewModel pattern. It allows the user to add/remove shops from his/her Favorite list and retrieve details from a shop as contact information, reviews and photos. Knockout.js, Materialize, Google Map API, Foursquare API.",
            "images": ["images/project2-large.jpg", "images/project2b-large.jpg"],
            "captions": ["Tail short loin capicola leberkas meatball.", "Tail short loin capicola leberkas meatball."],
            "url": "https://github.com/bigapplemonkey/get-your-cupcakes"
        }, {
            "title": "MY FOOD JOURNAL",
            "dates": "2017",
            "description": "Single page app that tracks the user's calorie intake, and other health-related metrics. Users are able to search for food items from the database provided by the health API and add these items to one or several meals for macro-nutrient intake tracking. Backbone,js, Semantic-UI, Nutritionix API.",
            "images": ["images/project3-large.jpg", "images/project3b-large.jpg"],
            "captions": ["Tail short loin capicola leberkas meatball.", "Tail short loin capicola leberkas meatball."],
            "url": "https://github.com/bigapplemonkey/my-food-journal"
        }]
    }
};

var octopus = {
    init: function() {
        bioView.init();
        workView.init();
        projectView.init();
        educationView.init();
        layoutView.init();
    },
    getBio: function() {
        return model.bio;
    },
    getWork: function() {
        return model.work;
    },
    getProjects: function() {
        return model.projects;
    },
    getEducation: function() {
        return model.education;
    },
    getContacts: function() {
        return model.bio.contacts;
    },
    getSchools: function() {
        return model.education.schools;
    },
    getJobs: function() {
        return model.work.jobs;
    }
};

var bioView = {
    init: function() {
        var bio = octopus.getBio();
        var formattedBio = HTMLbioPic.replace('%data%', bio.bioPic);
        formattedBio = formattedBio + HTMLheaderName.replace('%data%', bio.name.replace(' ', '<br>'));
        formattedBio = formattedBio + HTMLheaderRole.replace('%data%', bio.role);
        formattedBio = formattedBio + HTMLheaderWelcomeMsg.replace('%data%', bio.welcomeMessage);
        $('#header').prepend(formattedBio);

        formattedBio = HTMLemail.replace('%data%', bio.contacts.email).replace('%data%', bio.contacts.email);
        formattedBio = formattedBio + HTMLmobile.replace('%data%', bio.contacts.mobile).replace('%data%', bio.contacts.mobile);
        formattedBio = formattedBio + HTMLlocation.replace('%data%', bio.contacts.location);
        formattedBio = formattedBio + HTMLgithub.replace('%data%', bio.contacts.github);
        formattedBio = formattedBio + HTMLtwitter.replace('%data%', bio.contacts.twitter);
        formattedBio = formattedBio + HTMLlinkedin.replace('%data%', bio.contacts.linkedin);

        $('#topContacts').append(formattedBio);
        $('#letsConnect').append(HTMLfooterStart.replace('%data%', bio.name.replace(' ', '<br>')));

        formattedBio = HTMLfooterEmail.replace('%data%', bio.contacts.email).replace('%data%', bio.contacts.email);
        formattedBio = formattedBio + HTMLfooterMobile.replace('%data%', bio.contacts.mobile).replace('%data%', bio.contacts.mobile);
        formattedBio = formattedBio + HTMLfooterLocation.replace('%data%', bio.contacts.location);
        formattedBio = formattedBio + HTMLfooterGithub.replace('%data%', bio.contacts.github);
        formattedBio = formattedBio + HTMLfooterTwitter.replace('%data%', bio.contacts.twitter);
        formattedBio = formattedBio + HTMLfooterLinkedin.replace('%data%', bio.contacts.linkedin);

        $('#footerContacts').append(formattedBio);

        $('#skillSet').append(HTMLskillsStart);


        var len = bio.skills.length;
        for (var i = 0; i < len; i++) {
            var skill = Object.keys(bio.skills[i])[0];
            var skillRating = bio.skills[i][skill] <= 5 ? bio.skills[i][skill] : 5;
            formattedBio = HTMLskills.replace('%data%', skill);
            //adding thumbs-up rating
            for (var j = 0; j < skillRating; j++) {
                formattedBio = formattedBio.replace('<i class="fa fa-thumbs-up rating-icon" aria-hidden="true"></i>', '<i class="fa fa-thumbs-up rating-icon rated" aria-hidden="true"></i>');
            }
            $('#skills').append(formattedBio);
        }
    }
};

var workView = {
    init: function() {
        var work = octopus.getWork();
        var len = work.jobs.length;
        for (var i = 0; i < len; i++) {
            $('#workExperience').append(HTMLworkStart);
            var formattedWork = HTMLworkEmployer.replace('%data%', work.jobs[i].url).replace('%data%', work.jobs[i].employer);
            formattedWork = formattedWork + HTMLworkTitle.replace('%data%', work.jobs[i].title);
            formattedWork = formattedWork + HTMLworkLocation.replace('%data%', work.jobs[i].location);
            formattedWork = formattedWork + HTMLworkDates.replace('%data%', work.jobs[i].dates);
            formattedWork = formattedWork + HTMLworkDescription.replace('%data%', work.jobs[i].description);
            $('.work-entry:last').append(formattedWork);
        }
        $('.empty-space:last').replaceWith('<div class="col-xs-12"><hr></div>');
    }
};

var projectView = {
    init: function() {
        var projects = octopus.getProjects();
        var len = projects.projects.length;
        for (var i = 0; i < len; i++) {
            $('#projects').append(HTMLprojectStart);
            var formattedProject = HTMLprojectTitle.replace('%data%', projects.projects[i].url).replace('%data%', projects.projects[i].title);
            formattedProject = formattedProject + HTMLprojectDates.replace('%data%', projects.projects[i].dates);
            formattedProject = formattedProject + HTMLprojectDescription.replace('%data%', projects.projects[i].description);
            var len2 = projects.projects[i].images.length;
            for (var j = 0; j < len2; j++) {
                // keeping this in case I want to go back to previous image format
                // formattedProject = formattedProject + HTMLprojectImage.replace('%data%', projects.projects[i].images[j]);
                formattedProject = formattedProject + HTMLprojectImageWithCaption.replace('%data%', projects.projects[i].captions[j]).replace('%data%', projects.projects[i].images[j]);
            }
            $('.project-entry:last').append(formattedProject);
        }
        $('.empty-space:last').replaceWith('<div class="col-xs-12"><hr></div>');
    }
};

var educationView = {
    init: function() {
        var education = octopus.getEducation();
        var formattedEdu;
        var len = education.schools.length;
        for (var i = 0; i < len; i++) {
            $('#education').append(HTMLschoolStart);
            formattedEdu = HTMLschoolName.replace('%data%', education.schools[i].url).replace('%data%', education.schools[i].name);
            formattedEdu = formattedEdu + HTMLschoolDegree.replace('%data%', education.schools[i].degree);
            formattedEdu = formattedEdu + HTMLschoolMajor.replace('%data%', education.schools[i].majors[0]);
            formattedEdu = formattedEdu + HTMLschoolLocation.replace('%data%', education.schools[i].location);
            formattedEdu = formattedEdu + HTMLschoolDates.replace('%data%', education.schools[i].dates);

            $('.education-entry:last').append(formattedEdu);
        }

        $('#education').append(HTMLonlineSchoolStart);
        len = education.onlineCourses.length;
        for (var k = 0; k < len; k++) {
            $('#education').append(HTMLonlineClasses);
            formattedEdu = HTMLonlineTitle.replace('%data%', education.onlineCourses[k].schoolUrl).replace('%data%', education.onlineCourses[k].title);
            formattedEdu = formattedEdu + HTMLonlineSchool.replace('%data%', education.onlineCourses[k].school);
            formattedEdu = formattedEdu + HTMLonlineDates.replace('%data%', education.onlineCourses[k].dates);
            formattedEdu = formattedEdu + HTMLonlineURL.replace('%data%', education.onlineCourses[k].url).replace('%data%', education.onlineCourses[k].url);
            $('.online-education-entry:last').append(formattedEdu);
        }
        $('.empty-space:last').replaceWith('<div class="col-xs-12 hidden-xs"><hr></div>');
    }
};

var layoutView = {
    init: function() {
        this.addTitleHighlight();
        this.addSmoothTransition();
        this.addModalClickEvent();
        $('#mapDiv').append(googleMap);
    },
    addTitleHighlight: function() {
        //highlighting in blue title of section been scrolled
        $(window).on('scroll', function() {

            requestAnimationFrame(function() {
                var scrollTop = $(window).scrollTop();
                $('.section-title').each(function() {
                    var topDistance = $(this).offset().top;
                    var distance = topDistance - scrollTop;
                    var offset = 300;
                    if (distance <= offset && distance >= -20) {
                        $(this).find('h2').addClass('hightlight');
                    } else {
                        $(this).find('h2').removeClass('hightlight');
                    }
                });
            });
        });

    },
    addSmoothTransition: function() {
        //smooth transition on page junps
        $(document).ready(function() {
            $('a[href^="#"]').on('click', function(e) {
                e.preventDefault();

                var target = this.hash;
                var $target = $(target);

                $('html, body').stop().animate({
                    'scrollTop': $target.offset().top
                }, 1000, 'swing', function() {
                    window.location.hash = target;
                });
            });
        });
    },
    addModalClickEvent: function() {
        //inserting image clicked into modal
        $(document).ready(function() {
            $('.photo-effect').on('click', function() {
                var src = $(this).attr('src');
                var theImage = new Image();
                theImage.src = src;
                var imageWidth = theImage.width;

                $('#myModal').modal();

                //hack to prevent content shifting when a modal opens
                var bodyRightPadding = parseInt($('body').css('padding-right'), 10);
                if (bodyRightPadding > 0) $('body').css('padding-right', '0');

                $('#myModal .modal-body').html(theImage);
                $('#myModal .modal-body img').attr('id', 'modalImage');
                $('#modalImage').addClass('img-responsive center-block');

                //safari doesn't seem to process image width on load, so in case browser is safari
                var isSafari = navigator.vendor.indexOf('Apple') === 0 && /\sSafari\//.test(navigator.userAgent); // true or false
                if (!isSafari) $('.modal-dialog').css('width', imageWidth);

                $('#myModal').on('hidden.bs.modal', function() {
                    $('#myModal .modal-body').html('');
                });
            });
        });
    }
};

//initiating rendering
octopus.init();
