import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FacebookLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnInit {
  loginForm: FormGroup;
  socialUser: SocialUser;
  isLoggedin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService
  ) {
    console.log(this.isLoggedin)
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
    });
  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }


}
