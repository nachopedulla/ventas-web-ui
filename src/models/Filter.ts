export interface Form {
    id: string,
    type: string,
    label: string,
    options?: Array<Option>,
    default?: string
}

export interface Option {
    value: any,
    label: string,
    color?: string
}