<script lang="ts">
    import SvelteMarkdown from "svelte-markdown";
    import introduction from "../../docs/introduction.md?raw"
</script>

<div class="prose prose-invert">
    <SvelteMarkdown source={introduction} />
</div>