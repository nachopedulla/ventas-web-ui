import moment from "moment";

export const formatDate = (date: Date | undefined ) => moment(date).format('DD/MM/yyyy, hh:mm:ss a')