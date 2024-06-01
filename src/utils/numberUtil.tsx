
export const formatAmount = (amount: number | undefined) : string => {
    return amount ? 
        `$ ${amount?.toLocaleString('es-AR')}`  :
        '-';
}

export const formatNumber = (number: number | undefined) : string | undefined => number ? number.toLocaleString('es-AR') : '-';
