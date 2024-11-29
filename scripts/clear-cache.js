const fs = require('fs');
const path = require('path');
const os = require('os');

function deleteCacheFolder() {
	const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
	const cachePath = path.join(nodeModulesPath, '.cache');

	// проверяем наличие папки .cache
	if (fs.existsSync(cachePath)) {
		// рекурсивное удаление .cache
		fs.rm(cachePath, { recursive: true, force: true }, (err) => {
			if (err) {
				console.error('Ошибка удаления папки .cache :', err);
			} else {
				console.log('Папка .cache успешно удалена');
			}
		});
	} else {
		console.log('Папка .cache не существует');
	}
}

// Определение ОС
const platform = os.platform();
console.log(`Система: ${platform}`);

// Вызов функции удаления .cache
deleteCacheFolder();