import { isLocalFile, readLocalFile } from '$lib/util'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
    const slug = url.pathname.substring(1)
    if (await isLocalFile(slug)) return { source: await readLocalFile(slug)}
    console.log(slug, "is not local")
    return { source: "test" }
}