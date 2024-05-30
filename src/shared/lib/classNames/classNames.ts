type Mods = Record<string, boolean | string>

export function classNames(cls: string, mods?: Mods, additional?: string[]): string {
	return [
		cls,
		...additional.filter(Boolean), //что бы в additional не прилетали undefined, делаем фильти по boolan
		Object.entries(mods) // массив массивов по каждой строке объекта
			.filter(([className, value]) => Boolean(value)) //берем со значением true
			.map(([className, value]) => className) //берем ключи у элементов с true
			.join(' ')
	]
		.join(' ');
}
