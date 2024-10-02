<script>
	import '../app.css';
	import '../typography.css';
	import Header from './header.svelte';
</script>

<div class="flex w-full flex-col">
	<Header />
	<slot></slot>
</div>
