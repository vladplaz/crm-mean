import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {AuthService} from "../shared/services/auth.service"
import {User} from "../shared/interfaces"
import {Subscription} from "rxjs"
import {ActivatedRoute, Params, Router} from "@angular/router"
import {MaterialService} from "../shared/classes/material.service"

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null,
        [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.minLength(6), Validators.required])
    })
    this.route.queryParams.subscribe((params: Params)=>{
      if(params['registered']){
        MaterialService.toast('Вы зарегистрированы')
      }else if(params['accessDenied']){
        MaterialService.toast('Доступ запрещен')
      }else if(params['sessionFailed']){
      MaterialService.toast('Войдите в систему заново')
    }
    })
  }

  onSubmit() {
    this.form.disable()
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.aSub = this.auth.login(user).subscribe(
      () => {
        this.router.navigate(['/overview'])
      },
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }

  ngOnDestroy() {
    if (this.aSub)
      this.aSub.unsubscribe()
  }

}
