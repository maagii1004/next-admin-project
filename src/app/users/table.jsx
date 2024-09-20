"use client";

import * as React from "react";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Settings } from "lucide-react";
import { useState } from "react";
import { DeleteWarningModal } from "./DeleteWarning";
import { EditUserDialog } from "./EditUser";


export function UsersTable({ data, limit, onDelete, onEdit}) {

  {/* State for search */}
  const [search, setSearch] = useState("");

  {/* State for delete */}
  const [deleteModal, setDeleteModal] = useState(false);
  const [userForDeleting, setUserForDeleting] = useState(null);

  {/* State for edit */}
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [userForEditing, setUserForEditing] = useState(null);

  const filteredData = data.filter(item => item.lastname.toLowerCase().includes(search) || item.firstname.toLowerCase().includes(search) || item.email.toLowerCase().includes(search));

  const handleDeleteClick = (userId) => {
    setUserForDeleting(userId);
    setDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(userForDeleting);
    setDeleteModal(false);
  };

  const handleEditClick = (user) => {
    setUserForEditing(user);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (updatedUser) => {
    onEdit(updatedUser);
    setEditModalOpen(false);
  };
  

  return (
    <div className="w-full">


      <div className="flex items-center py-4">
        <Input placeholder="Search..." className="max-w-sm" value={search} onChange={(e) => setSearch(e.target.value.toLowerCase())}/>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1">#</TableHead>
              <TableHead className="w-1">Logo</TableHead>
              <TableHead className="w-1">Last Name</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>E-Mail</TableHead>
              <TableHead className="w-1">
                <Settings />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData?.slice(0, limit).map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={item.imageUrl} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{item.lastname}</TableCell>
                <TableCell>{item.firstname}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableHead className="w-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-8 h-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() =>
                          navigator.clipboard.writeText("temkanibno@gmail.com")
                        }
                      >
                        Copy Email
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleEditClick(item)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteClick(item.id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>


        <DeleteWarningModal open={deleteModal} onCancel={() => setDeleteModal(false)} onConfirm={handleConfirmDelete} />
        <EditUserDialog open={editModalOpen} onClose={() => setEditModalOpen(false)} onSaveEdit={handleSaveEdit} user={userForEditing} />
      </div>
    </div>
  );
}
