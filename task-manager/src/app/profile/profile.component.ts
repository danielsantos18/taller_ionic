import { Component, OnInit } from '@angular/core';

type EditableFields = 'name' | 'lastName' | 'email' | 'password' | 'age' | 'phone' | 'image';

interface EditableField {
  field: EditableFields;
  editable: boolean;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // Datos del usuario
  userData = {
    name: 'Nombre del Usuario',
    lastName: 'Apellido del Usuario',
    email: 'usuario@example.com',
    password: 'contraseña123',
    age: 30,
    phone: '+123456789',
    image: 'https://example.com/imagen.jpg',
  };

  // Estado de editabilidad para cada campo
  editableFields: EditableField[] = [
    { field: 'name', editable: false },
    { field: 'lastName', editable: false },
    { field: 'email', editable: false },
    { field: 'password', editable: false },
    { field: 'age', editable: false },
    { field: 'phone', editable: false },
    { field: 'image', editable: false },
  ];

  constructor() { }

  ngOnInit() { }

  toggleEdit(field: EditableFields) {
    const item = this.editableFields.find(f => f.field === field);
    if (item) {
      item.editable = !item.editable;
    }
  }

  saveChanges() {
    // Aquí puedes implementar la lógica para guardar los cambios
    console.log('Cambios guardados', this.userData);

    // Deshabilitar todos los campos después de guardar
    this.editableFields.forEach(item => {
      item.editable = false;
    });
  }

  isFieldEditable(field: EditableFields): boolean {
    const item = this.editableFields.find(f => f.field === field);
    return item ? item.editable : false;
  }
}
