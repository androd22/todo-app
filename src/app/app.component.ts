import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Storage} from "@ionic/storage-angular";

class Task{

  id: number = Date.now();
  title : String;
  status : Boolean;
}


/**
 * @Component est ce qu'on appelle un décorateur. Il permet d'apporter à Angular des infos complémentaires sur le composant,
 * sans changer son fonctionnement interne.
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],

})
/**
 * La classe contient les données de notre composant, mais aussi,
 * son comportement. Dans le contexte MVVM, notre classe correspond au Model
 */
export class AppComponent  implements  OnInit{
  constructor(private modalCtrl: ModalController, private storage: Storage) {

  }

  /**
   * Cette fonction s'execute au tout début du chargement
   * d'un composant, avant son affichage
   * c'est un bon moyen de préparer des données avant qu'elle
   * ne soit visible par l'utilisateur
   * Cette fonction est appelée par angular juste avant le constructeur
   */
 async  ngOnInit(): Promise<void> {

    await this.storage.create()
    await this.storage.get('tasks').then((tasks: Task[]) => {
      if(tasks !== null){
        this.tasks = tasks;
      }
    })

  }
  title = "Mes tâches"
  task: Task = new Task()
  tasks: Task[]=[]
  // tasks: Task[] = [
  //   {
  //     id : Date.now(),
  //     title : "Régler le MCD avec Hugo",
  //     status : false
  //   },
  //   {
  //     id: Date.now(),
  //     title : "Répondre à Adeline",
  //     status: false
  //   } ,
  //   {
  //     id: Date.now(),
  //     title : "Envoyer les identifiants",
  //     status: true
  //   } ,
  //   {
  //     id: Date.now(),
  //     title : "Prendre son petite déjeuner",
  //     status: true
  //   } ,
  //   {
  //     id: Date.now(),
  //     title : "Aller au sport",
  //     status: false
  //   }
  // ];

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

 async  saveTasks(){
    //TODO : permet de sauvegarder les tâches

   await this.storage.set('tasks', this.tasks)

  }

  keyDetection(code:String){
    if(code ==="enter"){
      this.addTask()
    }
  }
  addTask(){
    if(this.task && this.task.title.length >0){
      this.tasks.push(this.task)
      this.saveTasks()
      this.task = new Task();
    }
  }

  deleteTask(task: Task){
    this.tasks.splice(this.tasks.indexOf(task),1)
    this.saveTasks()
  }



}
