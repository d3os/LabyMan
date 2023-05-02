//==================================================================================================
// ANIMATION AVEC TYPESCRIPT                                                                 Jeu.ts
//==================================================================================================

// Classe  J e u //---------------------------------------------------------------------------------
class Jeu extends Scene {
 //----------------------------------------------------------------------------------------Attributs
 /* Declarer ici les attributs de la scene. */

 //-------------------------------------------------------------------------------------Constructeur
 public constructor(element : HTMLElement) {
  super(element,false);
  /* Ecrire ici le code qui initialise la scene. */
 }

 //--------------------------------------------------------------------------------------------start
 public override start() {
  /* Ecrire ici le code qui demarre la scene. */
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
