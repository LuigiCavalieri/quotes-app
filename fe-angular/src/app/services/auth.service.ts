import { Injectable } from "@angular/core";
import { endpointsUrl } from "../config/endpointsUrl";
import { Credentials } from "../types/auth";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	httpOptions = {
		credentials: "include",
		headers: new HttpHeaders({
			"Content-Type": "application/json",
		}),
	};

	constructor(private http: HttpClient) {}

	login(credentials: Credentials) {
		return this.http.post(endpointsUrl.login, credentials, this.httpOptions);
	}

	logout() {
		return this.http.post(endpointsUrl.logout, undefined, this.httpOptions);
	}
}
