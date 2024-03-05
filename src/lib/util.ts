import { promises as fs} from "fs"
import path from "path"
import config from "../../docs-config.json"

export const nameToSlug = (name: string): string => name.toLowerCase().replaceAll(" ", "-")

export const slugToName = (slug: string): string => slug.split("-").map((bit) => bit.charAt(0).toUpperCase() + bit.substring(1)).join(" ")

type File = {
    name: string
    url: string
}

export const isLocalFile = async (slug: string): Promise<boolean> => (await getLocalFiles()).filter((file) => file.url === slug).length > 0

export const getLocalFiles = async (): Promise<File[]> => (await fs.readdir(path.join(process.cwd(), "docs")))
    .filter((file) => file.toLowerCase() !== "introduction.md")
    .map((file) => file.split(".")[0])
    .map((file) => { return { name: slugToName(file), url: file } })

export const readLocalFile = async (slug: string): Promise<string> => fs.readFile(`docs/${slug}.md`, { encoding: "utf8" })

export const getRemoteFiles = async (url: string) => {
    console.log(url)
    const bits = url.split("https://github.com/")[1].split("/")
    const owner = bits[0]
    const repo = bits[1]
    var path = ""
    for (var i = 2; i < bits.length; i++) path += `${bits[i]}/`

    console.log(owner, repo, path, `https://api.github.com/repos/${owner}/${repo}/contents/${path}`)

    const fileRequest = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`)
    const fileResponse = await fileRequest.json()

    console.log("fileResponse", fileResponse)

    // fileRequest

    const temp = fileResponse
        .map((file: any) => file.name.split(".")[0])
        .map((file: any) => { return { name: slugToName(file), url: file } })

    console.log(temp)
}

export const readRemoteFile = async (slug: string) => {
    const name = slugToName(slug)
    const repositories = config.repositories.filter((repository) => repository.name === name)

    if (repositories.length != 1) return { status: 404, message: `Unknown documentation ${name} (${slug})` }

    const repository = repositories[0]
    const bits = repository.url.split("https://github.com/")[1].split("/")
    const owner = bits[0]
    const repo = bits[1]
    var path = ""
    for (var i = 2; i < bits.length; i++) path += `${bits[i]}/`

    // Just looking for the Introduction file
    if (!slug.includes("/")) {
        const fileRequest = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/master/${path}introduction.md`)
        if (!fileRequest.ok) return { status: 404, message: `Unknown documentation file ${name} (${slug})` }
        return { status: 200, source: await fileRequest.text() }
    }

    const fileRequest = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`)
    const fileResponse = await fileRequest.json()

    const files = fileResponse.filter((file: any) => file.name === `${slug}.md`)

    // console.log(files)

    if (files.length != 1) return { status: 404, message: `Unknown documentation file ${name} (${slug})` }

    const file = files[0]
    // console.log(file)
    return { status: 200, source: "empty" }
}
