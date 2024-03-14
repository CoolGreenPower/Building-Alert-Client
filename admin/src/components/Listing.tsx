import { DataGrid, GridColDef, GridToolbar, GridRowParams, MuiEvent, GridCallbackDetails, GridCellParams } from "@mui/x-data-grid"
import { useNavigate } from "react-router-dom"

/*
Listing is for showing a table of data, and allowing the user to click into it to view more.
*/

interface Props {
    type: string;
    rows: Array<object>;
    columns: Array<GridColDef>;
    loading?: boolean;
}

const Listing = ({ type, rows, columns, loading=false }: Props) => {

    const handleRowClick = (params: GridRowParams, event: MuiEvent<React.MouseEvent<HTMLElement>>, details: GridCallbackDetails) => {
        console.log(event, details)
        routeChange(params.id as string);
    }

    const handleCellClick = (params: GridCellParams, event: MuiEvent, details: GridCallbackDetails) => {
        console.log(event, details)
        navigator.clipboard.writeText(params.value as string)
    }

    const navigate = useNavigate();
    const routeChange = (id: string) => {
        let path = `/${type}?id=${id}`
        navigate(path);
    }

    // onRowClick
    // processRowUpdate for database changes on edit
    // or use onCellEditCommit

  return (
    // https://mui.com/x/api/data-grid/data-grid/#css
    <div className="w-100">
        <DataGrid
            sx={{
                overflowX: "scroll",
                color: "white",
                borderColor: "primary.light",
                "& .MuiDataGrid-cell:hover": {
                    color: 'primary.main'
                },
                border: 2,
                boxShadow: 2,
                ".MuiToolbar-root": {
                    color: "white",
                },
                ".MuiToolbar-root button": {
                    color: "white"
                },
                ".MuiSvgIcon-root": {
                    color: "white"
                },
                ".MuiFormControl-root input": {
                    color: "white"
                }
            }}
            onRowDoubleClick={handleRowClick}
            onCellClick={handleCellClick}
            rows={rows}
            columns={columns}
            initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 20 },
                }
            }}
            loading={loading}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
            toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
            },
            }}
            pageSizeOptions={[5, 10, 20, 50, 100]}
            //   checkboxSelection
            // checkboxSelection
        />
        <p className="text-lg text-primary">Note: Click a cell to copy the value. Double click to view more.</p>
    </div>
    

  )
}

export default Listing

