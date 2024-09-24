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

	login(credentials: Credentials): Observable<Object> {
		return this.http.post(endpointsUrl.login, credentials);
	}

	logout(): Observable<Object> {
		return this.http.post(endpointsUrl.logout, null);
	}

	me(): Observable<User> {
		return this.http.get<User>(endpointsUrl.me);
	}
}
