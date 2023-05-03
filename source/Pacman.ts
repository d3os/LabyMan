class Pacman extends Sprite {

public scene_ : Jeu ;
public py_ : number; // position et pas coordonnées
public px_ : number; // position et pas coordonnées
private ecouteurDeplacer : any;

public constructor(element : HTMLElement,scene :Jeu, px : number, py: number) {
  super(element);
  this.scene_ = scene;
  this.setXY((this.px_ =px)*this.scene_.pas_,(this.py_ =py)*this.scene_.pas_);
  this.ecouteurDeplacer = (evt  : KeyboardEvent)=> {this.deplacer(evt)};
}
public haut(){
  if(this.scene_.matrice_[this.py_-1][this.px_]!=1){
    this.py_ -=1;
    this.setXY(this.px_*this.scene_.pas_,this.py_*this.scene_.pas_);
    
  }
}
public bas(){
  if(this.scene_.matrice_[this.py_+1][this.px_]!=1){
    this.py_ +=1;
    this.setXY(this.px_*this.scene_.pas_,this.py_*this.scene_.pas_);
  }
}
public gauche(){
  if(this.scene_.matrice_[this.py_][this.px_-1]!=1){
    this.px_-=1;
    this.setXY(this.px_*this.scene_.pas_,this.py_*this.scene_.pas_);
  }
}
public droite(){
  if(this.scene_.matrice_[this.py_][this.px_+1]!=1){
    this.px_+=1;
    this.setXY(this.px_*this.scene_.pas_,this.py_*this.scene_.pas_);
  }
}
public deplacer(evt : KeyboardEvent){
  if (this.estArrive()==false){
    if(evt.key=="ArrowUp") this.haut();
    else if(evt.key=="ArrowDown") this.bas();
    else if(evt.key=="ArrowLeft") this.gauche();
    else if(evt.key=="ArrowRight") this.droite();
  }
  
}
public animer(){
  window.addEventListener("keydown",this.ecouteurDeplacer);
}
public figer(){
  window.removeEventListener("keydown",this.ecouteurDeplacer);
}
private estArrive():boolean{
  if (this.scene_.matrice_[this.py_][this.px_]==9) return true;
  return false ;
}
};
