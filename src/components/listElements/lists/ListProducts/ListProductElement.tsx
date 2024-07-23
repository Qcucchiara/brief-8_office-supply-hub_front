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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { handleProduct } from "@/services/ecommerce_api";
import { Product } from "@/utils/types/response";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineClose, AiOutlineEllipsis } from "react-icons/ai";

export const ListProductElement = ({
  data,
  refresh,
}: {
  data: Product;
  refresh: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { push } = useRouter();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <TableRow>
      <TableCell className="font-medium">{data.name} </TableCell>
      <TableCell>{data.stock}</TableCell>
      <TableCell>{data.price}</TableCell>
      <TableCell className="text-right">
        {data._count.Order_has_Product}
      </TableCell>
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

            <DropdownMenuItem
              onClick={() => {
                push(`/back-office/inventory/${data.slug}`);
              }}
            >
              see more
            </DropdownMenuItem>
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
                  handleProduct
                    .remove(data.id)
                    .then((res) => {
                      toast.success("order sucessfully deleted");
                      // refresh(true);
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
