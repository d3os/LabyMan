//==================================================================================================
// ANIMATION WITH TYPESCRIPT                                                              Sprite.ts
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

// S p r i t e  Class //----------------------------------------------------------------------------
class Sprite {
 //---------------------------------------------------------------------------------------Attributes
 private static counter_ : number = 0;
 private static instances_ : Map<string,Sprite> = new Map<string,Sprite>();

 private element_ : HTMLElement;
 private parent_ : Sprite;
 private children_ : Array<Sprite>;
 private nativeParent_ : HTMLElement;

 private x_ : number;
 private y_ : number;
 private width_ : number;
 private height_ : number;

 private rotation_ : number;
 private opacity_ : number;

 //--------------------------------------------------------------------------------------Constructor
 public constructor(element : HTMLElement) {
  this.element_ = element;
  this.parent_ = null;
  this.children_ = new Array<Sprite>();
  this.nativeParent_ = (<HTMLElement>(element.parentNode));

  if (element.dataset.spriteId)
   console.error("HTML element #" + element.dataset.spriteId
                 + " '" + element.id + "' already associated with a sprite.");

  this.setId();

  if (this.nativeParent_ != null && this.nativeParent_.tagName.toLowerCase() != "body") {
   let parent = null;

   if (this.nativeParent_.dataset.spriteId)
    parent = Sprite.instances_.get(this.nativeParent_.dataset.spriteId);
   else
    parent = new Sprite(this.nativeParent_);

    parent.appendChild(this);
  }

  try {
   let box : DOMRect = element.getBoundingClientRect();

   this.x_ = box.left;
   this.y_ = box.top;
   this.width_ = box.width;
   this.height_ = box.height;

   if (this.parent_ != null) {
    box = this.parent_.element_.getBoundingClientRect();
    this.x_ -= box.left;
    this.y_ -= box.top;
   }
  }

  catch(e) {
   this.x_ = 0;
   this.y_ = 0;
   this.width_ = 0;
   this.height_ = 0;
  }

  this.setRotation(0);
  this.setOpacity(1);

  this.element_.style.position = "absolute";

  if (this.element_ instanceof HTMLImageElement)
   (<HTMLImageElement>(this.element_)).draggable = false;
 }

 //-----------------------------------------------------------------------------------------------ID
 public getId() : string { return this.element_.dataset.spriteId; }

 private setId() {
  if (!this.element_.dataset.spriteId) {
   this.element_.dataset.spriteId = String(++Sprite.counter_);
   Sprite.instances_.set(this.element_.dataset.spriteId,this);
  }
 }

 private removeId() {
  if (this.element_.dataset.spriteId) {
   Sprite.instances_.delete(this.element_.dataset.spriteId);
   this.element_.removeAttribute("data-sprite-id");
  }
 }

 //----------------------------------------------------------------------------------------------Log
 public static logInstances() { for (let sprite of Sprite.instances_) console.log(sprite); }

 public log() {
  let message : string;

  message  = `${this.getId()}`;
  message += `{${this.x_};${this.y_}`;
  message += ` ${this.width_}x${this.height_}`;
  message += ` ${this.rotation_}°`;
  message += ` [${this.children_.length}]`;
  message += " -> "+(this.parent_ == null ? "null" : `#${this.parent_.getId()}`);
  message += "}";

  console.log(message);
 }

 //------------------------------------------------------------------------------------------Element
 public getElement() : HTMLElement { return this.element_; }

 //----------------------------------------------------------------------------------------Shortcuts
 public getStyle() : CSSStyleDeclaration { return this.element_.style }
 public getBoundingClientRect() : DOMRect { return this.element_.getBoundingClientRect(); }
 public getParentNode() : HTMLElement { return <HTMLElement>(this.element_.parentNode); }

 //-------------------------------------------------------------------------------------------Parent
 public getParent() : Sprite { return this.parent_; }

 //-----------------------------------------------------------------------------------------Children
 public getChildren() : Array<Sprite> { return this.children_; }

 public appendChild(sprite : Sprite|HTMLElement) {
  if (sprite instanceof Sprite) {
   if (sprite.parent_ != null)
    console.error(`HTML element #${sprite.getId()} already has a parent.`);
   else {
    if (sprite.nativeParent_ == null) this.element_.appendChild(sprite.element_);
    sprite.parent_ = this;
    this.children_.push(sprite);
    sprite.setId();
   }
  }
  else if (sprite instanceof HTMLElement) this.element_.appendChild(sprite);
 }

 public removeChild(sprite : Sprite|HTMLElement) {
  if (sprite instanceof Sprite) {
   if (sprite.parent_ != this)
    console.error(`Attempt to remove HTML element #${sprite.getId()} from the wrong parent.`);
   else {
    if (sprite.nativeParent_ == null) this.element_.removeChild(sprite.element_);
    sprite.parent_ = null;
    sprite.removeId();

    for (let i : number = 0; i < this.children_.length; ++i) {
     if (this.children_[i] == sprite) {
      let last : Sprite = this.children_.pop();
      if (i < this.children_.length) this.children_[i] = last;
      i = this.children_.length;
     }
    }
   }
  }
  else if (sprite instanceof HTMLElement) this.element_.removeChild(sprite);
 }

 //-----------------------------------------------------------------------------------------Position
 public getX() : number { return this.x_; }
 public getY() : number { return this.y_; }

 public setX(x : number) {
  this.element_.style.left = x + "px";
  this.x_ = x;
 }

 public setY(y : number) {
  this.element_.style.top = y + "px";
  this.y_ = y;
 }

 public setXY(x : number, y : number) {
  this.element_.style.left = x + "px";
  this.element_.style.top = y + "px";
  this.x_ = x;
  this.y_ = y;
 }

 //----------------------------------------------------------------------------------------Dimension
 public getWidth() : number { return this.width_; }
 public getHeight() : number { return this.height_; }

 public setWidth(width : number) {
  this.element_.style.width = width + "px";
  this.width_ = width;

  if (this.element_ instanceof HTMLCanvasElement)
   (<HTMLCanvasElement>(this.element_)).width = width;
 }

 public setHeight(height : number) {
  this.element_.style.height = height + "px";
  this.height_ = height;

  if (this.element_ instanceof HTMLCanvasElement)
   (<HTMLCanvasElement>(this.element_)).height = height;
 }

 public setDimension(width : number, height : number) {
  this.element_.style.width = width + "px";
  this.element_.style.height = height + "px";
  this.width_ = width;
  this.height_ = height;

  if (this.element_ instanceof HTMLCanvasElement) {
   (<HTMLCanvasElement>(this.element_)).width = width;
   (<HTMLCanvasElement>(this.element_)).height = height;
  }
 }

 //-----------------------------------------------------------------------------------------Geometry
 public getCenterX() : number { return (this.x_ + this.width_/2); }
 public getCenterY() : number { return (this.y_ + this.height_/2); }
 public getLeft() : number { return this.x_; }
 public getRight() : number { return (this.x_ + this.width_); }
 public getTop() : number { return this.y_; }
 public getBottom() : number { return (this.y_ + this.height_); }

 public getPoint() : Sprite.Point {
  return new Sprite.Point(this.x_ + this.width_/2,
                          this.y_ + this.height_/2);
 }

 public getRectangle() : Sprite.Rectangle {
  return new Sprite.Rectangle(this.x_, this.y_,
                              this.width_, this.height_);
 }

 public getCircle(ratio : number = 1) : Sprite.Circle {
  return new Sprite.Circle(this.x_ + this.width_/2,
                           this.y_ + this.height_/2,
                           ratio*this.width_/2);
 }

 //--------------------------------------------------------------------------------------------Image
 public setImage(url : string, width : number, height : number) {
  if (this.element_ instanceof HTMLImageElement) {
   (<HTMLImageElement>(this.element_)).src = url;
   this.setWidth(width);
   this.setHeight(height);
  }
 }

 //------------------------------------------------------------------------------------------Context
 public getContext() : Sprite.Context2D {
  if (this.element_ instanceof HTMLCanvasElement)
   return (<HTMLCanvasElement>(this.element_)).getContext("2d");

  return null;
 }

 //---------------------------------------------------------------------------------------Visibility
 // public hide() { this.element_.style.display = "none"; }
 // public show() { this.element_.style.display = "block"; }
 // public isVisible() : boolean { return (this.element_.style.display != "none"); }

 public hide() { this.element_.style.visibility = "hidden"; }
 public show() { this.element_.style.visibility = "visible"; }
 public isVisible() : boolean { return (this.element_.style.visibility != "hidden"); }

 //-----------------------------------------------------------------------------------------Rotation
 public getRotation() : number { return this.rotation_; }

 public setRotation(angle : number) {
  this.rotation_ = angle;
  this.element_.style.transform = "rotate(" + angle + "deg)";
 }

 public setRotationPivot(x : number, y : number) {
  this.element_.style.transformOrigin = x + "px " + y + "px";
 }

 //------------------------------------------------------------------------------------------Opacity
 public getOpacity() : number { return this.opacity_; }

 public setOpacity(opacity : number) {
  this.opacity_ = opacity;
  this.element_.style.opacity = "" + this.opacity_;
 }

 //-------------------------------------------------------------------------------------------Events
 public addEventListener(type : string, action : any) {
  this.element_.addEventListener(type,action);
 }

 public removeEventListener(type : string, action : any) {
  this.element_.removeEventListener(type,action);
 }

 //--------------------------------------------------------------------------------------------Mouse
 public scaledMouseX(x : number) : number { return x; }
 public scaledMouseY(y : number) : number { return y; }

 //-----------------------------------------------------------------------------------------Follower
 public follow(target : Sprite, x : number, y: number, frequency : number) : number {
  return setInterval( () => { this.placeOnTarget(target,x,y); }, frequency);
 }

 private placeOnTarget(target : Sprite, x : number, y : number) {
  let distance : number = Math.sqrt(x*x + y*y);
  let angle1 : number = target.getRotation()/180 * Math.PI;
  let angle2 : number = (y < 0 ? -Math.acos(x/distance) : Math.acos(x/distance));

  x = distance * Math.cos(angle1+angle2);
  y = distance * Math.sin(angle1+angle2);

  this.setX(target.getCenterX() - this.getWidth()/2 + x);
  this.setY(target.getCenterY() - this.getHeight()/2 + y);
 }
}

// Type Aliases //----------------------------------------------------------------------------------
namespace Sprite {
 export type Context2D = CanvasRenderingContext2D;
}

// Collision Tests //-------------------------------------------------------------------------------
namespace Sprite {
 //----------------------------------------------------------------------------------------Collision
 export function collision(a : Shape, b : Shape) {
  if (a instanceof Circle) {
   if (b instanceof Circle)
    return collisionCircleCircle(<Circle>a,<Circle>b);
   else if (b instanceof Rectangle)
    return collisionCircleRectangle(<Circle>a,<Rectangle>b);
   else if (b instanceof Point)
    return collisionCirclePoint(<Circle>a,<Point>b);
  }
  else if (a instanceof Rectangle) {
   if (b instanceof Circle)
    return collisionCircleRectangle(<Circle>b,<Rectangle>a);
   else if (b instanceof Rectangle)
    return collisionRectangleRectangle(<Rectangle>a,<Rectangle>b);
   else if (b instanceof Point)
    return collisionRectanglePoint(<Rectangle>a,<Point>b);
  }
  else if (a instanceof Point) {
   if (b instanceof Circle)
    return collisionCirclePoint(<Circle>b,<Point>a);
   else if (b instanceof Rectangle)
    return collisionRectanglePoint(<Rectangle>b,<Point>a);
   else if (b instanceof Point)
    return collisionPointPoint(<Point>a,<Point>b);
  }
 }

 //--------------------------------------------------------------------------------------Shape Class
 export class Shape {}

 //--------------------------------------------------------------------------------------Point Class
 export class Point extends Shape {
  public x_;
  public y_;

  public constructor(x : number, y : number) {
   super();
   this.x_ = x;
   this.y_ = y;
  }
 }

 //-------------------------------------------------------------------------------------Circle Class
 export class Circle extends Shape {
  public cx_ : number;
  public cy_ : number;
  public radius_ : number;

  public constructor(centerX : number, centerY : number, radius : number) {
   super();
   this.cx_ = centerX;
   this.cy_ = centerY;
   this.radius_ = radius;
  }
 }

 //---------------------------------------------------------------------------------Classe Rectangle
 export class Rectangle extends Shape {
  public x_ : number;
  public y_ : number;
  public width_ : number;
  public height_ : number;

  public constructor(cornerX : number, cornerY : number, width : number, height : number) {
   super();
   this.x_ = cornerX;
   this.y_ = cornerY;
   this.width_ = width;
   this.height_ = height;
  }
 }

 //-----------------------------------------------------------------------Circle-Rectangle Collision
 function collisionCircleRectangle(circle : Circle, rectangle : Rectangle) : boolean {
  let px : number = Math.max(rectangle.x_,
                             Math.min(circle.cx_, rectangle.x_ + rectangle.width_));
  let py : number = Math.max(rectangle.y_,
                             Math.min(circle.cy_, rectangle.y_ + rectangle.height_));
  let dx : number = px - circle.cx_;
  let dy : number = py - circle.cy_;
  let distance : number = dx*dx + dy*dy;
  let radius : number = circle.radius_ * circle.radius_;

  return (distance < radius);
 }

 //--------------------------------------------------------------------------Circle-Circle Collision
 function collisionCircleCircle(circle1 : Circle, circle2 : Circle) : boolean {
  let dx : number = circle1.cx_ - circle2.cx_;
  let dy : number = circle1.cy_ - circle2.cy_;
  let distance : number = dx*dx + dy*dy;
  let radius : number = circle1.radius_ + circle2.radius_;

  return (distance < radius*radius);
 }

 //---------------------------------------------------------------------------Circle-Point Collision
 function collisionCirclePoint(circle : Circle, point : Point) : boolean {
  let dx : number = point.x_ - circle.cx_;
  let dy : number = point.y_ - circle.cy_;
  let distance : number = dx*dx + dy*dy;
  let radius : number = circle.radius_ * circle.radius_;

  return (distance < radius);
 }

 //--------------------------------------------------------------------Rectangle-Rectangle Collision
 function collisionRectangleRectangle(rectangle1 : Rectangle,
                                      rectangle2 : Rectangle) : boolean {
  return (rectangle1.x_ < rectangle2.x_+rectangle2.width_
          && rectangle1.x_+rectangle1.width_ > rectangle2.x_
          && rectangle1.y_ < rectangle2.y_+rectangle2.height_
          && rectangle1.y_+rectangle1.height_ > rectangle2.y_);
 }

 //------------------------------------------------------------------------Rectangle-Point Collision
 function collisionRectanglePoint(rectangle : Rectangle, point : Point) : boolean {
  return (point.x_ >= rectangle.x_ && point.x_ <= rectangle.x_+rectangle.width_
          && point.y_ >= rectangle.y_ && point.y_ <= rectangle.y_+rectangle.height_);
 }

 //----------------------------------------------------------------------------Point-Point Collision
 function collisionPointPoint(point1 : Point, point2 : Point) : boolean {
  let dx : number = point1.x_ - point2.x_;
  let dy : number = point1.y_ - point2.y_;
  let distance : number = dx*dx + dy*dy;

  return (distance < 1);
 }
}

// End //-------------------------------------------------------------------------------------------
