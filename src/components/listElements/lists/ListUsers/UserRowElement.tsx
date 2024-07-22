import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/utils/types/response";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AiOutlineClose, AiOutlineEllipsis } from "react-icons/ai";
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
import { handleUser } from "@/services/ecommerce_api";
import toast from "react-hot-toast";
import { PopoverRole } from "./PopoverRole";

export const UserRowElement = ({
  data,
  refresh,
}: {
  data: User;
  refresh: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [creationDate, setCreationDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [changeRole, setChangeRole] = useState(false);

  useEffect(() => {
    setCreationDate(new Date(data.createdAt).toLocaleString());
    setUpdateDate(new Date(data.updatedAt).toLocaleString());
  }, [data]);
  return (
    <TableRow>
      <TableCell className="font-medium">
        {data.pseudo + " #" + data.pseudo_id}
      </TableCell>
      <TableCell>
        {changeRole ? (
          <PopoverRole data={data} refresh={refresh} />
        ) : (
          data.role.role
        )}
      </TableCell>
      <TableCell>{creationDate}</TableCell>
      <TableCell className="text-right">{updateDate}</TableCell>
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
            <DropdownMenuItem>see details</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setChangeRole(true);
              }}
            >
              change role
            </DropdownMenuItem>
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
                user.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleUser
                    .remove(data.id)
                    .then((res) => {
                      toast.success("user sucessfully deleted");
                      refresh(true);
                    })
                    .catch((error) => {
                      console.log(error);
                      // toast.error(error.response.data.message);
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
