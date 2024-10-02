export class ChunkReader {
	private file: File;
	private chunkSize: number;
	private size: number;
	private offset: number;

	constructor(file: File, chunkSize: number) {
		this.file = file;
		this.chunkSize = chunkSize;
		this.size = file.size;
		this.offset = 0;
	}

	async nextChunk(): Promise<ArrayBuffer> {
		const slice = this.file.slice(this.offset, this.offset + this.chunkSize);
		const reader = new FileReader();
		const promise = new Promise<ArrayBuffer>((resolve) => {
			reader.onload = () => {
				resolve(reader.result as ArrayBuffer);
			};
		});
		reader.readAsArrayBuffer(slice);
		this.offset += this.chunkSize;
		return promise;
	}

	get isDone(): boolean {
		return this.offset >= this.size;
	}

	get progress(): number {
		return this.offset / this.size;
	}
}
