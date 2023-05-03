//==================================================================================================
// ANIMATION AVEC TYPESCRIPT                                                                 Jeu.ts
//==================================================================================================

// Classe  J e u //---------------------------------------------------------------------------------
class Jeu extends Scene {
 //----------------------------------------------------------------------------------------Attributs
 /* Declarer ici les attributs de la scene. */
public matrice_ : Array<Array<number>> ;
public pas_ : number;
public perso_ : Pacman;
 //-------------------------------------------------------------------------------------Constructeur
 public constructor(element : HTMLElement) {
  super(element,false);
  /* Ecrire ici le code qui initialise la scene. */
  
  
 }

 private initialiserCarte(){
  this.matrice_ = 
  [[1,1,1,1,1,1,1,1,1,1],
  [1,10,2,2,2,1,10,2,2,1],
  [1,1,2,1,1,1,2,1,2,1],
  [1,2,2,2,1,1,2,1,1,1],
  [1,2,1,1,2,2,2,1,2,9],
  [1,2,2,2,2,1,2,1,2,1],
  [1,2,1,8,1,1,2,2,2,1],
  [1,2,1,2,1,1,2,1,1,1],
  [1,2,2,2,1,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1]];
 }
 private dessinerLabyrinthe(){
  
  for (var i= 0; i < this.matrice_.length; i++) {
    for (var j= 0; j < this.matrice_[i].length; j++) {
      if(this.matrice_[i][j]==1){
        let mur  = new Sprite(document.createElement("img"));
        mur.setImage("wall.png",this.pas_,this.pas_);
        mur.setXY(j*this.pas_, i*this.pas_);
        this.appendChild(mur);
      }
      if(this.matrice_[i][j]==8){
        this.perso_ = new Pacman(document.createElement("img"),j*this.pas_, i*this.pas_);
        this.perso_.setImage("gragas.png",this.pas_,this.pas_);
        this.appendChild(this.perso_);
      }   
    } 
  }
 }
 //--------------------------------------------------------------------------------------------start
 public override start() {
  /* Ecrire ici le code qui demarre la scene. */
  this.initialiserCarte();
  this.pas_ = this.getWidth()/this.matrice_.length;
  this.dessinerLabyrinthe();
 }

 //--------------------------------------------------------------------------------------------pause
 public override pause() {
  /* Ecrire ici le code qui met la scene en pause. */
 }

 //------------------------------------------------------------------------------------------unpause
 public override unpause() {
  /* Ecrire ici le code qui sort la scene de la pause. */
 }

 //--------------------------------------------------------------------------------------------clean
 public override clean() {
  /* Ecrire ici le code qui nettoie la scene en vue d'un redemarrage. */
 }
}

// Fin //-------------------------------------------------------------------------------------------
