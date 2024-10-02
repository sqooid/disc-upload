<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { uploadChunk } from '$lib/discord/browser-client';
	import { readFileChunks } from '$lib/discord/file-upload';

	const onFile = async (e: any) => {
		const file = e.target.files[0];
		await readFileChunks(file, 5, async (i, data) => {
			console.log(i, data);
		});
	};

	const onClick = async () => {
		// const handle = await window.showSaveFilePicker({
		// 	startsIn: 'downloads',
		// 	suggestedName: 'test.txt'
		// })as FileSystemFileHandle;
		// console.log(handle);

		const chunk = new TextEncoder().encode('hello world');
		await uploadChunk('1290873629743124534', chunk, '0');
	};
</script>

<div class="">
	hello
	<Input type="file" on:input={onFile} />
	<Button on:click={onClick}>BUtton</Button>
</div>
