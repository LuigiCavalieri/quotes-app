import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatIcon } from "@angular/material/icon";

@Component({
	standalone: true,
	selector: "app-error-message",
	templateUrl: "./error-message.component.html",
	styleUrl: "./error-message.component.scss",
	imports: [CommonModule, MatIcon],
})
export class ErrorMessageComponent {
	show = true;

	@Input() canBeDismissed = false;
}
