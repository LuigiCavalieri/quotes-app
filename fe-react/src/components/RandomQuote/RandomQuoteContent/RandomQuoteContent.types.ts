import { QuoteWithoutServerGenFields } from "../../../types/quotes";

export interface RandomQuoteContentProps {
	quote: QuoteWithoutServerGenFields;
	saveButton?: {
		disabled?: boolean;
		text?: React.ReactNode;
	};
	disabled: boolean;
	onClickDismiss: () => void;
	onClickSave: () => void;
}
