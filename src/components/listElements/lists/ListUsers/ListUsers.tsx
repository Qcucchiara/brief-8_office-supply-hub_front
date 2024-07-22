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
import { handleUser } from "@/services/ecommerce_api";
import { UserRowElement } from "./UserRowElement";

export const ListUsers = () => {
  const [accounts, setAccounts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    handleUser.findAll().then((res) => {
      setAccounts(res.data);
      console.log(res.data);
    });
    setRefresh(false);
  }, [refresh]);

  return (
    <Table>
      <TableCaption>All users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Pseudo</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>creation date</TableHead>
          <TableHead className="text-right">Last Update date</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts &&
          accounts.map((element: any) => {
            return (
              <UserRowElement
                key={element.id}
                refresh={setRefresh}
                data={element}
              />
            );
          })}
      </TableBody>
    </Table>
  );
};
