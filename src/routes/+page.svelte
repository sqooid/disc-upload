<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { readFileChunks } from '$lib/discord/file-upload';

	const onFile = async (e: any) => {
		const file = e.target.files[0];
		await readFileChunks(file, 5, async (i, data) => {
			console.log(i, data);
		});
	};
</script>

<div class="">
	hello
	<Input type="file" on:input={onFile} />
</div>
