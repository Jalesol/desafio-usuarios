import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  phoneType: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly storageKey = 'users-storage';

  private readonly initialUsers: User[] = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao.silva@gmail.com',
      cpf: '12345678901',
      phone: '34999999999',
      phoneType: 'Celular'
    },
    {
      id: 2,
      name: 'Maria Souza',
      email: 'maria.souza@gmail.com',
      cpf: '98765432100',
      phone: '34998888888',
      phoneType: 'Celular'
    },
    {
      id: 3,
      name: 'Carlos Oliveira',
      email: 'carlos.oliveira@gmail.com',
      cpf: '45678912300',
      phone: '34997777777',
      phoneType: 'Comercial'
    },
    {
      id: 4,
      name: 'Ana Paula',
      email: 'ana.paula@gmail.com',
      cpf: '74185296311',
      phone: '34996666666',
      phoneType: 'Residencial'
    }
  ];

  constructor() {
    this.initializeUsers();
  }

  getUsers(): Observable<User[]> {
    return of(this.getUsersFromStorage()).pipe(
      delay(3000),
      map((users) => [...users]),
      catchError((error) => {
        console.error('Erro ao buscar usuários:', error);
        return throwError(() => new Error('Falha ao carregar usuários.'));
      })
    );
  }

  addUser(user: User): void {
    const users = this.getUsersFromStorage();
    users.unshift(user);
    this.saveUsersToStorage(users);
  }

  updateUser(updatedUser: User): void {
    const users = this.getUsersFromStorage();
    const index = users.findIndex((user) => user.id === updatedUser.id);

    if (index !== -1) {
      users[index] = updatedUser;
      this.saveUsersToStorage(users);
    }
  }

  private initializeUsers(): void {
    const existingUsers = localStorage.getItem(this.storageKey);

    if (!existingUsers) {
      this.saveUsersToStorage(this.initialUsers);
    }
  }

  private getUsersFromStorage(): User[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveUsersToStorage(users: User[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }
}