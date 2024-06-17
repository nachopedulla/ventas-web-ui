export const PAGE_SIZE = 1;

export const pages = (totalResults : number) => {
    return totalResults / PAGE_SIZE + (totalResults % PAGE_SIZE > 0 ? 1 : 0)
}