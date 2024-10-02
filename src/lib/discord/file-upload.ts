export const readFile = async (file: File) => {
	const reader = new FileReader();
	const promise = new Promise<Uint8Array>((resolve) => {
		reader.onload = () => {
			const arrayBuffer = reader.result as ArrayBuffer;
			const uint8Array = new Uint8Array(arrayBuffer);
			resolve(uint8Array);
		};
	});
	reader.readAsArrayBuffer(file);
	return promise;
};

export const readFileChunks = async (
	file: File,
	chunkSize: number,
	callback: (index: number, data: ArrayBuffer) => Promise<void>
) => {
	const size = file.size;
	let offset = 0;
	const maxIndex = Math.ceil(size / chunkSize);
	const promise = new Promise<void>((resolve) => {
		const readHandler = async (e: ProgressEvent<FileReader>, index: number) => {
			if (e.target?.result) {
				await callback(index, e.target.result as ArrayBuffer);
			}
			if (index === maxIndex - 1) {
				resolve();
			}
		};
		const chunkReader = (offset: number) => {
			const reader = new FileReader();
			reader.onload = (e: ProgressEvent<FileReader>) => {
				readHandler(e, Math.ceil(offset / chunkSize));
			};
			const slice = file.slice(offset, offset + chunkSize);
			reader.readAsArrayBuffer(slice);
		};
		while (offset < size) {
			chunkReader(offset);
			offset += chunkSize;
			console.log('chunkReader', offset);
		}
	});
	return promise;
};
