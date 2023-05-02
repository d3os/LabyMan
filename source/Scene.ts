//==================================================================================================
// ANIMATION WITH TYPESCRIPT                                                               Scene.ts
//                                                                                By Bruno Bachelet
//==================================================================================================
// Copyright (c) 2017-2023
// Bruno Bachelet - bruno@nawouak.net - http://www.nawouak.net
//
// This program is free software; you can redistribute it and/or modify it
// under the terms of the GNU General Public License as published by the Free
// Software Foundation; either version 2 of the license, or (at your option)
// any later version.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
// more details (http://www.gnu.org).

// S c e n e  Class //------------------------------------------------------------------------------
class Scene extends Sprite {
 //---------------------------------------------------------------------------------------Attributes
 private resize_ : boolean;
 private scale_ : number;

 //--------------------------------------------------------------------------------------Constructor
 public constructor(element : HTMLElement, resize : boolean) {
  super(element);

  this.resize_ = resize;
  this.scale_ = 1;

  let box : DOMRect =  this.getParentNode().getBoundingClientRect();

  this.setDimension(640,480);
  this.setX((box.width - this.getWidth()) / 2);
  this.setY((box.height - this.getHeight()) / 2);
 }

 //-------------------------------------------------------------------------------------isFullscreen
 public isFullscreen() : boolean { return (document.fullscreenElement != null); }

 //---------------------------------------------------------------------------------toggleFullscreen
 public toggleFullscreen(event : Event) {
  if (this.isFullscreen()) {
   this.getElement().className = "";
   document.exitFullscreen();
  }
  else {
   this.getElement().className = "fullscreen";
   document.body.requestFullscreen();
  }

  event.stopPropagation();
 }

 //-------------------------------------------------------------------------------------------resize
 public resize() {
  let space : number = (this.isFullscreen() ? 0 : 50);
  let box : DOMRect = this.getParentNode().getBoundingClientRect();
  let rx = this.getWidth() / (box.width - space);
  let ry = this.getHeight() / (box.height - space);
  let s = 1 / Math.max(rx,ry);

  if (this.resize_ || this.isFullscreen()) {
   this.getStyle().transform = "scale(" + s + ")";
   this.scale_ = s;
  }
  else {
   this.getStyle().transform = "";
   this.scale_ = 1;
  }

  this.setX((box.width - this.getWidth())/2);
  this.setY((box.height - this.getHeight())/2);
 }

 //-------------------------------------------------------------------------------------scaledMouseX
 public override scaledMouseX(x : number) : number {
  return (this.getCenterX() + (x - this.getCenterX())/this.scale_);
 }

 //-------------------------------------------------------------------------------------scaledMouseY
 public override scaledMouseY(y : number) : number {
  return (this.getCenterY() + (y - this.getCenterY())/this.scale_);
 }

 //--------------------------------------------------------------------------------------------start
 public start() {}

 //--------------------------------------------------------------------------------------------pause
 public pause() {}

 //------------------------------------------------------------------------------------------unpause
 public unpause() {}

 //--------------------------------------------------------------------------------------------clean
 public clean() {
  while (this.getChildren().length > 0) this.removeChild(this.getChildren()[0]);
 }

 //------------------------------------------------------------------------------------------restart
 public restart() {
  this.pause();
  this.clean();
  this.start();
 }
}

// End //-------------------------------------------------------------------------------------------
