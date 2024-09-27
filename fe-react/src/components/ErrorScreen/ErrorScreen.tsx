export default function ErrorScreen() {
	const handleOnClick = () => {
		location.reload();
	};

	return (
		<div data-testid="error-screen" className="h-full flex items-center justify-center">
			<p>
				{"Something went wrong. Try to "}
				<button type="button" className="text-sky-700 underline" onClick={handleOnClick}>
					reload the page
				</button>
				{"."}
			</p>
		</div>
	);
}
