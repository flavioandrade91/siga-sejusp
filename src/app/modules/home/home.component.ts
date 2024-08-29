import { Cookie } from './../../../../node_modules/@types/tough-cookie/index.d';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AuthRequest } from '../../models/interfaces/user/auth/AuthRequest';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
    loginCard = true;

    loginForm = this.formBuilder.group({
      cpf: ['', Validators.required],
      password: ['', Validators.required],
    });

    constructor(
      private formBuilder: FormBuilder,
      private userService: UserService,
      private cookieService: Cookie,
      private messageService: MessageService
    ) {}

    onSubmitLoginForm(): void {
      if (this.loginForm.value && this.loginForm.valid) {
        this.userService.authUser(this.loginForm.value as AuthRequest).subscribe({
          next: (response) => {
            if (response) {
              this.cookieService.set('USER_INFO', response?.token);
              this.loginForm.reset();

              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Bem vindo de volta ${response?.name}!`,
                life: 2000,
              });
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Erro ao fazer o login!`,
              life: 2000,
            });
            console.log(err);
          },
        });
      }
    }

    onSubmitSignupForm(): void {
      if (this.signupForm.value && this.signupForm.valid) {
        this.userService
          .signupUser(this.signupForm.value as SignupUserRequest)
          .subscribe({
            next: (response) => {
              if (response) {
                this.signupForm.reset();
                this.loginCard = true;
                this.messageService.add({
                  severity: 'success',
                  summary: 'Sucesso',
                  detail: 'Usuário criado com sucesso!',
                  life: 2000,
                });
              }
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: `Erro ao criar usuário!`,
                life: 2000,
              });
              console.log(err);
            },
          });
      }
    }
  }
