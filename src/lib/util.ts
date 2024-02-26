import { promises as fs} from "fs"
import path from "path"

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
