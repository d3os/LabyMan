class Pacman extends Sprite {

public scene_ : Scene ;
public py_ : number;
public px_ : number;

 public constructor(element : HTMLElement, px : number, py: number) {
  super(element);
  this.setXY(this.px_ =px,this.py_ =py);
 }
};
