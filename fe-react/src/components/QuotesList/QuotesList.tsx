import { ChangeEvent, useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { useQuotes } from "../../hooks/quotes";
import Card from "../Card/Card";
import QuotesListItem from "../QuotesListItem/QuotesListItem";
import PaginationMenu from "../PaginationMenu/PaginationMenu";
import appConfig from "../../config/appConfig";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { CopyStatus, EMPTY_STRING } from "../../constants";
import { Quote } from "../../types/quotes";
import TextField from "../TextField/TextField";
import { useThrottle } from "../../hooks/throttle";
import { useTimer } from "../../hooks/timer";
import * as ClipboardService from "../../services/ClipboardService";

export default function QuotesList() {
	const { throttle } = useThrottle();
	const { quotes, mainQueryState, pagination, refreshQuotes } = useQuotes();

	const { setTimer: setCopiedTimer } = useTimer();
	const { setTimer: setSearchTimer } = useTimer();
	const [copyStatus, setCopyStatus] = useState(CopyStatus.waiting);
	const [copiedQuoteId, setCopiedQuoteId] = useState<string | null>(null);
	const [searchString, setSearchString] = useState(EMPTY_STRING);
	const [showSearchField, setShowSearchField] = useState(Boolean(quotes.length));
	const [isSearching, setIsSearching] = useState(false);

	const handleOnChangeSearchString = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const trimmedValue = value.trim();
			const triggerSearch = () => refreshQuotes(1, { keywords: trimmedValue });

			setSearchString(value);

			if (!trimmedValue) {
				triggerSearch();

				return;
			}

			setIsSearching(true);
			throttle(triggerSearch, 1000);

			setSearchTimer(() => {
				setIsSearching(false);
			}, 1000);
		},
		[refreshQuotes, throttle, setSearchTimer]
	);

	const copyToClipboard = useCallback(
		async (quote: Quote) => {
			setCopiedQuoteId(quote.id);

			try {
				await ClipboardService.copy(quote);

				setCopyStatus(CopyStatus.copied);
			} catch {
				setCopyStatus(CopyStatus.error);
			}

			setCopiedTimer(() => {
				setCopyStatus(CopyStatus.waiting);
			}, appConfig.feedbackTimeout);
		},
		[setCopiedTimer]
	);

	useEffect(() => {
		if (quotes.length && !showSearchField) {
			setShowSearchField(true);
		}
	}, [showSearchField, quotes.length]);

	useEffect(() => {
		if (!mainQueryState.searchFilters.keywords) {
			setSearchString(EMPTY_STRING);
		}
	}, [mainQueryState.searchFilters.keywords]);

	const onClickRefresh = () => {
		location.reload();
	};

	return (
		<Card title="Your saved quotes">
			{mainQueryState.isError && (
				<ErrorMessage>
					{"Something didn't work. Please try to "}
					<button type="button" className="underline" onClick={onClickRefresh}>
						refresh the page
					</button>
					{"."}
				</ErrorMessage>
			)}
			{showSearchField && (
				<TextField
					type="search"
					name="searchKeywords"
					outerClassName="mb-4"
					placeholder="Search by keywords"
					value={searchString}
					onChange={handleOnChangeSearchString}
				/>
			)}
			{mainQueryState.isLoading ? (
				<p className="text-gray-500 text-sm mt-6 mb-2">Quotes are loading...</p>
			) : !quotes.length && isSearching ? (
				<p className="text-gray-500 text-sm mt-6 mb-2">Searching...</p>
			) : !quotes.length ? (
				<p className="text-sm mt-6 mb-2">No quotes found.</p>
			) : (
				<>
					<ol
						data-testid="quotes-list"
						className={classNames({
							"opacity-50": isSearching || mainQueryState.isRefetching,
						})}
					>
						{quotes.map((quote, idx) => {
							const itemNum = idx + 1 + (pagination.currentPage - 1) * appConfig.quotesPerPage;

							return (
								<QuotesListItem
									key={`QuoteItem_${quote.id}`}
									quote={quote}
									itemIndex={itemNum}
									copyStatus={copiedQuoteId === quote.id ? copyStatus : CopyStatus.waiting}
									onClickCopy={() => copyToClipboard(quote)}
								/>
							);
						})}
					</ol>
					<PaginationMenu
						className="mt-6 mb-2"
						currentPage={pagination.currentPage}
						numOfQuotes={pagination.totalCount}
						onClick={page => refreshQuotes(page, { keywords: searchString.trim() })}
					/>
				</>
			)}
		</Card>
	);
}
