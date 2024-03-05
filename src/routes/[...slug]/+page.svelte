<script lang="ts">
    import SvelteMarkdown from "svelte-markdown";
    import type { PageData } from "../$types"
    export let data: PageData
</script>

<div class="prose prose-invert">
    <SvelteMarkdown source={data.source} />
</div>