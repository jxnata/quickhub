export const repoToName = (repo: string) => {
    return repo.replace(/_|-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
}
