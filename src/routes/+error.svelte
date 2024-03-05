<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex w-full absolute justify-center items-center -z-10 my-20">
    <div class="flex flex-col items-center gap-y-6">
        <div class="flex flex-col items-center gap-y-1">
            <h1 class="font-extrabold text-4xl">{$page.status}</h1>
            <p class="text-white/60">{$page.error.message}</p>
        </div>
    </div>
</div>