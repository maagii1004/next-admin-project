"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/typography/h3";
import { UsersTable } from "./table";
import { UserCreateDialog } from "./user-create-dialog";
import { useEffect, useState } from "react";

const Users = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const loadMore = () => {
    setLimit((previousLimit) => previousLimit + 30); 
  };

  const handleSave = (newUser) => {
    fetch('/api/users',{
      method: "POST",
      body: JSON.stringify(newUser)
    })
    setData((prevData) => [...prevData, newUser]);
  };

  const handleDelete = (userId) => {
    fetch(`/api/users/${userId}`, {
      method: "DELETE"
    })
    setData((prevData) => prevData.filter(item => item.id !== userId));
  };

const handleEdit = (updatedUser) => {
  setData((prevData) =>
    prevData.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    )
  );
};

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <TypographyH3>Users</TypographyH3>
            <Button variant="outline" onClick={() => setCreateModalOpen(true)}>
              Add New User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <UsersTable data={data} limit={limit} onDelete={handleDelete} onEdit={handleEdit}/>
          
          {limit <= data.length && (
            <div className="flex justify-center p-8">
              <Button variant="outline" onClick={loadMore}>
                Load more...
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <UserCreateDialog open={createModalOpen} onClose={setCreateModalOpen} onSave={handleSave} />
    </div>
  );
};

export default Users;
