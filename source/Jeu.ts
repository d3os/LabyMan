//==================================================================================================
// ANIMATION AVEC TYPESCRIPT                                                                 Jeu.ts
//==================================================================================================

// Classe  J e u //---------------------------------------------------------------------------------
class Jeu extends Scene {
 //----------------------------------------------------------------------------------------Attributs
 /* Declarer ici les attributs de la scene. */
public matrice_ : Array<Array<number>> ;
public matrPast_ : Array<Array<Sprite>>;
public pas_ : number;
public perso_ : Pacman;
private compteur_ : number;
private elemCompt_ : Sprite ;
 //-------------------------------------------------------------------------------------Constructeur
 public constructor(element : HTMLElement) {
  super(element,false);
  /* Ecrire ici le code qui initialise la scene. */
  this.matrPast_ =[];
  this.compteur_ =0 ;
  let compt = document.createElement("span");
  compt.id = "compteur";
  element.appendChild(compt);
  this.elemCompt_ = new Sprite(compt);
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
    this.matrPast_.push(Array());
    for (var j= 0; j < this.matrice_[i].length; j++) {
      if(this.matrice_[i][j]==1){
        let mur  = new Sprite(document.createElement("img"));
        mur.setImage("wall.png",this.pas_,this.pas_);
        mur.setXY(j*this.pas_, i*this.pas_);
        this.appendChild(mur);
      }
      if(this.matrice_[i][j]==2){
        let pastille = new Sprite(document.createElement("img"));
        pastille.setImage("tonneau.png",this.pas_,this.pas_);
        pastille.getElement().style.zIndex = "2";
        pastille.setXY(j*this.pas_, i*this.pas_);
        this.appendChild(pastille);
        this.matrPast_[i][j] = pastille;
        this.compteur_ += 1;
      } else this.matrPast_[i][j] = null;

      if(this.matrice_[i][j]==8){
        this.perso_ = new Pacman(document.createElement("img"),this,j, i);
        this.perso_.setImage("gragas.png",this.pas_,this.pas_);
        this.perso_.getElement().style.zIndex = "3";
        this.appendChild(this.perso_);
      }
    } 
  }
 }

public retirerPastille(x: number, y: number){
  this.removeChild(this.matrPast_[y][x]);
  this.matrPast_[y][x] = null;
  this.compteur_ -= 1;
  this.elemCompt_.getElement().textContent = this.compteur_.toString() ;
}


 //--------------------------------------------------------------------------------------------start
 public override start() {
  /* Ecrire ici le code qui demarre la scene. */
  this.initialiserCarte();
  this.pas_ = this.getWidth()/this.matrice_.length;
  this.dessinerLabyrinthe();
  this.perso_.animer();
  this.elemCompt_.getElement().textContent = this.compteur_.toString() ;
 }

 //--------------------------------------------------------------------------------------------pause
 public override pause() {
  /* Ecrire ici le code qui met la scene en pause. */
  this.perso_.figer();
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
