// <Адресс страницы, позиция скрола>
export type ScrollSchema = OptionalRecord<string, number>

export interface UISchema {
	scroll: ScrollSchema;
}