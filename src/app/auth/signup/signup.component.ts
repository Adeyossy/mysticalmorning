import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  processStarted = false;
  email = '';
  password = '';
  repeatPassword = '';
  passwordStrength: Array<string | boolean>[] = [
    ['The password should have at least 8 characters', false],
    ['At least one of those characters must be a number', false],
    ['At least one of those characters must be special e.g. !-$#', false],
    ['At least one of those characters must be in capital letter', false]
  ];
  specialCharacters = [' ', '!','"','#','$','%','&',"'","(",')','*','+',',','-',
    '.','/',':',';','<','=','>','?','@', '[', '\\', "]", '^', '_', ",", '{', '|', '}','~']

  constructor() { }

  ngOnInit(): void {
  }

  updatePassword(password: string) {
    if(this.password.length >= 8) this.passwordStrength[0][1] = true;
    if(/\d/.test(this.password)) this.passwordStrength[1][1] = true;
    if(this.specialCharacters.find(char => this.password.includes(char))) 
      this.passwordStrength[2][1] = true;
    if(/[A-Z]/.test(this.password)) this.passwordStrength[3][1] = true;
    this.password = password;
  }


}
