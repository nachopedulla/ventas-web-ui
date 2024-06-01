export interface Form {
    id: string,
    type: string,
    label: string,
    options?: Array<Option>
}

export interface Option {
    value: any,
    label: string
}