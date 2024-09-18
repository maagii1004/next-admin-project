import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const DeleteWarningModal = ({ open, onCancel, onConfirm }) => {

    return (
    <Dialog open={open} onOpenChange={onCancel}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
            </DialogHeader>
            <DialogFooter>
                <Button variant="outline" onClick={onCancel}>Cancel</Button>
                <Button variant="destructive" onClick={onConfirm}>Delete</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    );
};