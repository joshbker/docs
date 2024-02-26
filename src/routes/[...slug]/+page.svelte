<script lang="ts">
    import SvelteMarkdown from "svelte-markdown";
    import type { PageData } from "../$types"
    export let data: PageData
</script>

<SvelteMarkdown source={data.source} />