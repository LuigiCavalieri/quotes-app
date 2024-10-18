import { useCallback, useEffect, useRef } from "react";

export function useTimer() {
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const clearTimer = useCallback(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);

			timerRef.current = null;
		}
	}, []);

	const setTimer = useCallback(
		(callback: () => void, delay: number) => {
			clearTimer();

			timerRef.current = setTimeout(() => {
				timerRef.current = null;

				callback?.();
			}, Number(delay));
		},
		[clearTimer]
	);

	useEffect(() => {
		return clearTimer;
	}, [clearTimer]);

	return { setTimer, clearTimer };
}
