import { getLocalFiles, getRemoteFiles } from '$lib/util'
import type { LayoutServerLoad } from './$types'
import config from "../../docs-config.json"

export const load: LayoutServerLoad = async ({ url }) => {
    config.repositories.forEach((repository) => getRemoteFiles(repository.url))
    return { files: await getLocalFiles() }
}