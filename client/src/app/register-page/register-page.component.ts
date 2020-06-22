import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {Subscription} from "rxjs"
import {AuthService} from "../shared/services/auth.service"
import {ActivatedRoute, Params, Router} from "@angular/router"
import {User} from "../shared/interfaces"
import {MaterialService} from "../shared/classes/material.service"

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

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
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterialService.toast('Вы зарегистрированы')
      } else if (params['accessDenied']) {
        MaterialService.toast('Доступ запрещен')
      }
    })
  }

  onSubmit() {
    this.form.disable()
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.aSub = this.auth.register(user).subscribe(
      () => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        })
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
