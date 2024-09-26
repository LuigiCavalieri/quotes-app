import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

import { LoadingScreenComponent } from "../components/loading-screen/loading-screen.component";
import { ErrorMessageComponent } from "../components/error-message/error-message.component";

@NgModule({
	declarations: [LoadingScreenComponent, ErrorMessageComponent],
	exports: [
		LoadingScreenComponent,
		ErrorMessageComponent,
		RouterModule,
		MatIconModule,
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
	],
	imports: [
		RouterModule,
		MatIconModule,
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
	],
})
export class SharedModule {}
