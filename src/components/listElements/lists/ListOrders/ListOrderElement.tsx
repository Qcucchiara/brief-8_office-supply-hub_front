import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { handleOrder } from "@/services/ecommerce_api";
import { Order } from "@/utils/types/response";
import { AiOutlineClose, AiOutlineEllipsis } from "react-icons/ai";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { error } from "console";

export const ListOrderElement = ({
  element,
  date,
  setTotalAmount,
  amount,
  refresh,
}: {
  element: Order;
  date: string;
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
  amount: number;
  refresh: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <TableRow key={element.id}>
      <TableCell>
        {element.user.first_name + " #" + element.user.pseudo_id}
      </TableCell>
      <TableCell>{element.Order_has_Product.length}</TableCell>
      <TableCell className="font-medium">{element.status}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell className="text-right">{amount} $</TableCell>
      <TableCell className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <AiOutlineEllipsis
              size={25}
              className="rounded-full p-1 duration-100 hover:bg-gray-300"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Admin Actions:</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>see more</DropdownMenuItem>
            <DropdownMenuItem>see related user</DropdownMenuItem>
            <DropdownMenuItem>change status</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
          <AlertDialogTrigger>
            <AiOutlineClose
              size={25}
              className="rounded-full p-1 duration-100 hover:bg-gray-300 hover:text-red-900"
            />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                order and the history of the products ordered.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleOrder.order
                    .remove(element.id)
                    .then((res) => {
                      toast.success("order sucessfully deleted");
                      refresh(true);
                    })
                    .catch((error) => {
                      toast.error(error.response.data.message);
                    });
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};
