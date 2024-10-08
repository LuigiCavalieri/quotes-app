import { useState, FormEvent, useRef } from "react";
import appConfig from "../../config/appConfig";
import { useSaveQuote } from "../../hooks/quotes";
import SubmitButton from "../SubmitButton/SubmitButton";
import TextField from "../TextField/TextField";
import Card from "../Card/Card";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { QuoteWithoutServerGenFields } from "../../types/quotes";
import { useTimer } from "../../hooks/timer";

export default function QuoteForm() {
	const { setTimer, clearTimer } = useTimer();
	const formRef = useRef<HTMLFormElement | null>(null);
	const [submitEnabled, setSubmitEnabled] = useState(false);
	const [showSaved, setShowSaved] = useState(false);

	const { isError, isLoading, error, mutate } = useSaveQuote({
		onSuccess: () => {
			formRef.current?.reset();
			setSubmitEnabled(false);
			setShowSaved(true);
			setTimer(() => {
				setShowSaved(false);
			}, appConfig.feedbackTimeout);
		},
	});

	const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = new FormData(event.target as HTMLFormElement);

		mutate(Object.fromEntries(data.entries()) as QuoteWithoutServerGenFields);
	};

	const handleOnChange = (value: string) => {
		setSubmitEnabled(Boolean(value.trim()));

		if (showSaved) {
			clearTimer();
			setShowSaved(false);
		}
	};

	return (
		<Card>
			{isError && <ErrorMessage canBeDismissed>{error.message}</ErrorMessage>}
			<form
				data-testid="quote-form"
				className="grid gap-5 py-2"
				ref={formRef}
				onSubmit={handleOnSubmit}
			>
				<textarea
					required
					className="leading-6 outline-none p-2 border rounded-sm border-slate-300 h-40 resize-none disabled:text-slate-400 focus:border-sky-500"
					name="content"
					placeholder="Type in the quote you want to save"
					disabled={isLoading}
					onChange={event => handleOnChange(event.target.value)}
				/>
				<TextField
					type="name"
					name="author"
					placeholder="by 'anonymous'"
					disabled={isLoading}
					maxLength={appConfig.authorNameMaxLength}
				/>
				<div className="flex items-center justify-end gap-2">
					{showSaved && <span className="font-medium text-green-700 text-sm">Saved!</span>}
					<SubmitButton disabled={!submitEnabled || isLoading} className="w-1/4">
						{isLoading ? "Saving..." : "Save"}
					</SubmitButton>
				</div>
			</form>
		</Card>
	);
}
