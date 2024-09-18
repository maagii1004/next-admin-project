import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

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
                    <Input name="lastname" placeholder="Last Name" value={changeData.lastname} onChange={handleChange} />
                    <Input name="firstname" placeholder="First Name" value={changeData.firstname} onChange={handleChange} />
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