// src/app/pages/task/task.page.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
})
export class TaskPage {
  taskForm: FormGroup;
  tasks = [
    {
      id: 1,
      title: 'Beyoce',
      description: 'Milk',
      date: '2024-10-06',
      done: false,
    },
    
  ];
  today: string = new Date().toISOString().split('T')[0];
  currentTaskId: number | null = null;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      done: [false],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      if (this.currentTaskId) {
        this.updateTask();
      } else {
        this.createTask();
      }
    }
  }

  createTask() {
    const newTask = {
      id: this.tasks.length + 1,
      ...this.taskForm.value,
    };
    this.tasks.push(newTask);
    this.taskForm.reset({ done: false });
    console.log('Task created: ', newTask);
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

  updateTask() {
    const updatedTask = this.taskForm.value;
    const index = this.tasks.findIndex(task => task.id === this.currentTaskId);
    if (index > -1) {
      this.tasks[index] = { id: this.currentTaskId, ...updatedTask };
    }
    this.taskForm.reset({ done: false });
    this.currentTaskId = null;
    console.log('Task updated: ', updatedTask);
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    console.log('Task deleted, ID:', id);
  }
}
