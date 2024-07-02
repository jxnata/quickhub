export const explode = (str: string) => {
    return str.split(',').map((s) => s.trim())
}