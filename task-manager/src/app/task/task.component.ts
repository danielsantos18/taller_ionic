import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDocs } from '@angular/fire/firestore';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  taskForm: FormGroup;
  tasks: any[] = [];
  today: string = new Date().toISOString().split('T')[0];
  currentTaskId: string | null = null;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private firestore: Firestore,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      done: [false],
    });
  }

  ngOnInit() {
    this.loadTasks();
  }

  async loadTasks() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const tasksRef = collection(this.firestore, 'tasks');
      const q = query(tasksRef, where('uid', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      this.tasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
  }

  async onSubmit() {
    if (this.taskForm.valid) {
      this.loading = true;
      try {
        if (this.currentTaskId) {
          await this.updateTask();
          this.presentToast('Tarea actualizada exitosamente!');
        } else {
          await this.createTask();
          this.presentToast('Tarea creada exitosamente!');
        }
      } finally {
        this.loading = false;
      }
      this.taskForm.reset({ done: false });
    }
  }

  async createTask() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const newTask = {
        uid: currentUser.uid,
        ...this.taskForm.value,
      };
      await addDoc(collection(this.firestore, 'tasks'), newTask);
      this.loadTasks();
    }
  }

  editTask(task: any) {
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      date: task.date,
      done: task.done,
    });
    this.currentTaskId = task.id;
  }

  async updateTask() {
    if (this.currentTaskId) {
      const taskRef = doc(this.firestore, `tasks/${this.currentTaskId}`);
      await updateDoc(taskRef, this.taskForm.value);
      this.currentTaskId = null;
      this.loadTasks();
    }
  }

  async confirmDeleteTask(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteTask(id);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteTask(id: string) {
    await deleteDoc(doc(this.firestore, `tasks/${id}`));
    this.loadTasks();
    this.presentToast('Tarea eliminada exitosamente!');
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }
}
