// @ts-ignore
export function getQueryParams(params: OptionalRecord<string, string>) {
	const searchParams = new URLSearchParams(window.location.search);
	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined) {
			// @ts-ignore
			searchParams.set(key, value);
		}
	});
	return `?${searchParams.toString()}`;
}

/**
 * Функция добавления параметров строки запроса в URL
 * @param params
 */
// @ts-ignore
export function addQueryParams(params: OptionalRecord<string, string>) {
	window.history.pushState(null, '', getQueryParams(params));
}