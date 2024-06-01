import styled from "@emotion/styled";
import { IconButton, Paper, Table, TableBody, TableCell, TableCellProps, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material"
import { FaEye } from "@react-icons/all-files/fa/FaEye";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import './ResultTable.css';
import TooltipIconButton from "../TooltipIconButton/TooltipIconButton";

const TableHeaderCell = styled(TableCell)({
    fontWeight: 'bold'
});

export interface Header {
    id: string,
    label: string,
    formatter?: Function
    align: TableCellProps['align']
}


const ResultTable = (
    {
        headers,
        data,
        detailHandler,
        removeHanlder
    }:
        {
            headers: Array<Header>,
            data: Array<any>,
            detailHandler: Function,
            removeHanlder: Function
        }
) => {

    return (
        <div className='result-table'>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table size='small' stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {
                                    headers.map(header => (
                                        <TableHeaderCell
                                            key={header.id}
                                            className='table-header'
                                            align={header.align}
                                        >
                                            {header.label}
                                        </TableHeaderCell>
                                    ))
                                }
                                <TableHeaderCell key='actions' className='table-header'>Acciones</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.map(row => (
                                    <TableRow key={row['id']}>
                                        {
                                            headers.map(header => (
                                                <TableCell
                                                    align={header.align}
                                                >
                                                    {header.formatter === undefined ? row[header.id] : header.formatter(row[header.id])}
                                                </TableCell>
                                            ))
                                        }
                                        <TableCell>
                                            <div style={{ display: 'flex', columnGap: '15px' }}>
                                                <TooltipIconButton
                                                    title="Ver detalle"
                                                    handler={() => detailHandler(row['id'])}
                                                    icon={<FaEye size={14} />}
                                                />
                                                <TooltipIconButton
                                                    title="Eliminar"
                                                    handler={() => removeHanlder(row['id'])}
                                                    icon={<FaTrash size={14} color='#e30000' />}
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )
}

export default ResultTable;