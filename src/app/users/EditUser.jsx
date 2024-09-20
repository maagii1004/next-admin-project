import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const EditUserDialog = ({ open, onClose, onSaveEdit, user}) => {
    const [changeData, setChangeData] = useState({ firstname: "", lastname: "", email: ""});

    useEffect(() => {
        if (user) {
            setChangeData({
                firstname: user.firstname || "",
                lastname: user.lastname || "",
                email: user.email || "",
            });
        }
    }, [user] );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChangeData((prev) => ({ ...prev, [name]: value}))
    };

    const handleSave = () => {
        onSaveEdit(changeData);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>
                <div>
                    <Label>Last Name:</Label>
                    <Input name="lastname" placeholder="Last Name" value={changeData.lastname} onChange={handleChange} />
                </div>
                <div>
                    <Label>First Name:</Label>
                    <Input name="firstname" placeholder="First Name" value={changeData.firstname} onChange={handleChange} />
                </div>
                <div>
                    <Label>E-Mail:</Label>
                    <Input name="email" placeholder="E-Mail" value={changeData.email} onChange={handleChange} />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button variant="destructive" onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};