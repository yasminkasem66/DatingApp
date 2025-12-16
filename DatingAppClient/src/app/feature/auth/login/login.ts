import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  standalone:true,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  ngOnInit(): void {
     console.log('ïnit');
  }

}
