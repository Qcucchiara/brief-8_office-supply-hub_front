import React from 'react'
import { TableCell, TableRow } from '../ui/table'

export const ProductTableRow = () => {
  return (
     <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  )
}
