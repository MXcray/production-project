import { MutableRefObject, useCallback, useRef } from 'react';

/**
 * Хук, позволяющий отменять предидущий вызов функции пока не истечет delay
 * @param callback - функция обратного вызова
 * @param delay - задержка в мс
 */
export function useDebounce(callback: (...args: any[]) => void, delay: number) {
	const timerRef = useRef() as MutableRefObject<any>;

	return useCallback(
		(...args: any[]) => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}

			timerRef.current = setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay],
	);
}
