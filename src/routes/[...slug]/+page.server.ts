import { isLocalFile, readLocalFile, readRemoteFile } from '$lib/util'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
    const slug = url.pathname.substring(1)
    if (await isLocalFile(slug)) return { source: await readLocalFile(slug)}
    console.log(slug, "is not local")
    const fileRequest = await readRemoteFile(slug)
    if (fileRequest.status != 200) throw error(fileRequest.status, fileRequest.message)
    return { source: fileRequest.source }
}