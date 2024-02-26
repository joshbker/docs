import { getLocalFiles } from '$lib/util'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async () => { return { files: await getLocalFiles() } }