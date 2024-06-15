import styled from "@emotion/styled";
import { Paper, Table, TableBody, TableCell, TableCellProps, TableContainer, TableHead, TableRow } from "@mui/material"
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

export interface Action {
    id: string,
    handler: Function,
    icon: React.ReactElement
}


const ResultTable = (
    {
        headers,
        data,
        detailHandler,
        removeHanlder,
        actions
    }:
        {
            headers: Array<Header>,
            data: Array<any>,
            detailHandler?: Function | undefined,
            removeHanlder?: Function | undefined,
            actions?: Array<Action>
        }
) => {

    const withActions = (): boolean => detailHandler !== undefined || removeHanlder !== undefined;

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
                                {
                                    actions && actions?.length > 0 ?
                                        <TableHeaderCell
                                            key='actions'
                                            className='table-header'
                                            align="center"
                                        >
                                            Acciones
                                        </TableHeaderCell> : null
                                }
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
                                        {
                                            actions ? (
                                                <TableCell align="center">
                                                    {
                                                        actions.map(action =>
                                                            <TooltipIconButton
                                                                key={action.id}
                                                                title={action.id}
                                                                handler={() => action.handler(row['id'])}
                                                                icon={action.icon}
                                                            />
                                                        )
                                                    }
                                                </TableCell>
                                            ) : null
                                        }
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