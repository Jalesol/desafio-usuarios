import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Subject, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  takeUntil
} from 'rxjs/operators';
import { UsersService, User } from '../../../../core/services/users.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UsersListComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private usersService = inject(UsersService);

  users: User[] = [];
  filteredUsers: User[] = [];

  isLoading = false;
  hasError = false;
  errorMessage = 'Não foi possível carregar os usuários.';

  isModalOpen = false;
  editingUser: User | null = null;

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
    phoneType: ['Celular', [Validators.required]]
  });

  ngOnInit(): void {
    this.setupSearch();
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

 loadUsers(): void {
  const localUsers = JSON.parse(localStorage.getItem('users-storage') || '[]');

  if (localUsers.length > 0) {
    this.users = localUsers;
    this.filteredUsers = localUsers;
  }

  this.isLoading = true;
  this.hasError = false;

  this.usersService.getUsers().pipe(
    catchError((error) => {
      console.error(error);
      this.hasError = true;
      this.isLoading = false;
      return of([]);
    }),
    takeUntil(this.destroy$)
  ).subscribe((users) => {
    if (users.length > 0) {
      this.users = users;
      this.filteredUsers = users;
    }

    this.isLoading = false;
  });
}

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value ?? '';
    this.searchSubject.next(value);
  }

  private setupSearch(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe((term) => {
      const normalizedTerm = term.toLowerCase().trim();

      if (!normalizedTerm) {
        this.filteredUsers = this.users;
        return;
      }

      this.filteredUsers = this.users.filter((user) =>
        user.name.toLowerCase().includes(normalizedTerm)
      );
    });
  }

  openCreateModal(): void {
    this.editingUser = null;
    this.userForm.reset({
      name: '',
      email: '',
      cpf: '',
      phone: '',
      phoneType: 'Celular'
    });
    this.isModalOpen = true;
  }

  openEditModal(user: User): void {
    this.editingUser = user;

    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      phone: user.phone,
      phoneType: user.phoneType
    });

    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.editingUser = null;

    this.userForm.reset({
      name: '',
      email: '',
      cpf: '',
      phone: '',
      phoneType: 'Celular'
    });
  }

  saveUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formValue = this.userForm.getRawValue();

    const userData: User = {
      id: this.editingUser?.id ?? Date.now(),
      name: formValue.name ?? '',
      email: formValue.email ?? '',
      cpf: formValue.cpf ?? '',
      phone: formValue.phone ?? '',
      phoneType: formValue.phoneType ?? 'Celular'
    };

    if (this.editingUser) {
      this.usersService.updateUser(userData);
    } else {
      this.usersService.addUser(userData);
    }

    this.loadUsers();
    this.closeModal();
  }

  get nameControl() {
    return this.userForm.get('name');
  }

  get emailControl() {
    return this.userForm.get('email');
  }

  get cpfControl() {
    return this.userForm.get('cpf');
  }

  get phoneControl() {
    return this.userForm.get('phone');
  }

  get phoneTypeControl() {
    return this.userForm.get('phoneType');
  }
}