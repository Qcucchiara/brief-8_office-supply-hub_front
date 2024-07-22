"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { handleRole, handleUser } from "@/services/ecommerce_api";
import { RoleResult, User } from "@/utils/types/response";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Status = {
  value: string;
  label: string;
};
export const PopoverRole = ({
  data,
  refresh,
}: {
  data: User;
  refresh: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [open, setOpen] = useState(false);
  const [listRoles, setListRoles] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState<RoleResult | null>(null);
  useEffect(() => {
    handleRole.all().then((res) => {
      console.log(res);
      setListRoles(res.data);
    });
  }, []);
  return (
    <div className="flex items-center space-x-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedStatus ? <>{selectedStatus.role}</> : <>+ Set role</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {listRoles.map((role: RoleResult) => (
                  <CommandItem
                    key={role.id}
                    value={role.role}
                    onSelect={(value) => {
                      handleUser
                        .changeRole(data.id, role.id)
                        .then((res) => {
                          toast.success("role changed");
                          refresh(true);
                        })
                        .catch((error) => {
                          toast.error("error");
                        });
                      setOpen(false);
                    }}
                  >
                    {role.role}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
