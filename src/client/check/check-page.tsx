import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material"
import { css } from "@emotion/react"
import { CheckTable } from "./check-tabel-component";
export function CheckPage() {

    return(
        <div>
        <CheckTable year={2023} month={12} />
        </div>
    )
}

function checkPageStyles() {
    return css`
      
    `;
  }
  