import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service'; 
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  taskForm: FormGroup;
  tasks: any[] = [];
  today: string = new Date().toISOString().split('T')[0];
  currentTaskId: string | null = null; // Cambiado a string para Firestore ID

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Inyecta el servicio de autenticación
    private firestore: Firestore // Inyecta Firestore
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      done: [false],
    });
  }

  ngOnInit() {
    this.loadTasks(); // Cargar tareas al iniciar el componente
  }

  async loadTasks() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const tasksRef = collection(this.firestore, 'tasks');
      const q = query(tasksRef, where('uid', '==', currentUser.uid)); // Filtrar por el usuario autenticado
      const querySnapshot = await getDocs(q);
      this.tasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Cargar tareas
    }
  }

  async onSubmit() {
    if (this.taskForm.valid) {
      if (this.currentTaskId) {
        await this.updateTask(); // Actualiza la tarea si ya existe
      } else {
        await this.createTask(); // Crea una nueva tarea
      }
      this.taskForm.reset({ done: false });
    }
  }

  async createTask() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const newTask = {
        uid: currentUser.uid, // Relaciona la tarea con el usuario autenticado
        ...this.taskForm.value,
      };
      await addDoc(collection(this.firestore, 'tasks'), newTask); // Agrega la tarea a Firestore
      this.loadTasks(); // Recarga las tareas
      console.log('Task created: ', newTask);
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
      await updateDoc(taskRef, this.taskForm.value); // Actualiza la tarea en Firestore
      this.currentTaskId = null;
      this.loadTasks(); // Recarga las tareas
      console.log('Task updated');
    }
  }

  async deleteTask(id: string) {
    const taskRef = doc(this.firestore, `tasks/${id}`);
    await deleteDoc(taskRef); // Elimina la tarea de Firestore
    this.loadTasks(); // Recarga las tareas
    console.log('Task deleted, ID:', id);
  }
}
