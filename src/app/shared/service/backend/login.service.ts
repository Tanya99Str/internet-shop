import {Injectable} from '@angular/core';
import {AuthServerProvider} from './auth.server.provider';
import {Login} from '../models/login.model';
import {Observable} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {AccountService} from './account.service';
import {AccountModel} from '../models/account.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private accountService: AccountService, private authServerProvider: AuthServerProvider) {}

  login(credentials: Login): Observable<AccountModel | null> {
    return this.authServerProvider.login(credentials).pipe(flatMap(() => this.accountService.identity(true)));
  }

  logout(): void {
    this.authServerProvider.logout().subscribe(null, null, () => this.accountService.authenticate(null));
  }
}
