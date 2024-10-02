import { Injectable } from "@angular/core";
import { endpointsUrl } from "../config/endpointsUrl";
import { Credentials } from "../types/auth";
import { HttpClient } from "@angular/common/http";
import { User } from "../types/user";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	constructor(private http: HttpClient) {}

	login(credentials: Credentials) {
		return this.http.post(endpointsUrl.login, credentials);
	}

	logout() {
		return this.http.post(endpointsUrl.logout, null);
	}

	signup(credentials: Credentials) {
		return this.http.post(endpointsUrl.signup, credentials);
	}

	activateAccount(payload: { email: string; activationToken: string }) {
		return this.http.patch(endpointsUrl.activateAccount, payload);
	}

	me(): Observable<User> {
		return this.http.get<User>(endpointsUrl.me);
	}
}
