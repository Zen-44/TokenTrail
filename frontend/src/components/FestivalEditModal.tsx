import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Textarea } from "@/components/ui/textarea";
  import { Festival } from "@/lib/admin-api";
  import { useEffect, useState } from "react";
  
  interface FestivalEditModalProps {
    festival: Festival | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (festival: Festival) => void;
  }
  
  export const FestivalEditModal = ({
    festival,
    isOpen,
    onClose,
    onSave,
  }: FestivalEditModalProps) => {
    const [formData, setFormData] = useState<Festival | null>(null);
  
    useEffect(() => {
      setFormData(festival);
    }, [festival]);
  
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      if (!formData) return;
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSave = () => {
      if (formData) {
        onSave(formData);
      }
    };
  
    if (!festival) return null;
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] bg-gray-900 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Edit Festival: {formData?.festivalName}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="festivalName" className="text-right">
                Name
              </Label>
              <Input
                id="festivalName"
                name="festivalName"
                value={formData?.festivalName || ""}
                onChange={handleChange}
                className="col-span-3 bg-gray-800 border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="organizerName" className="text-right">
                Organizer
              </Label>
              <Input
                id="organizerName"
                name="organizerName"
                value={formData?.organizerName || ""}
                onChange={handleChange}
                className="col-span-3 bg-gray-800 border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={formData?.email || ""}
                onChange={handleChange}
                className="col-span-3 bg-gray-800 border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData?.phone || ""}
                onChange={handleChange}
                className="col-span-3 bg-gray-800 border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={formData?.location || ""}
                onChange={handleChange}
                className="col-span-3 bg-gray-800 border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                Start Date
              </Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData?.startDate?.split("T")[0] || ""}
                onChange={handleChange}
                className="col-span-3 bg-gray-800 border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">
                End Date
              </Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData?.endDate?.split("T")[0] || ""}
                onChange={handleChange}
                className="col-span-3 bg-gray-800 border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData?.description || ""}
                onChange={handleChange}
                className="col-span-3 bg-gray-800 border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tokenName" className="text-right">
                Token Name
              </Label>
              <Input
                id="tokenName"
                name="tokenName"
                value={formData?.tokenName || ""}
                onChange={handleChange}
                className="col-span-3 bg-gray-800 border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tokenSymbol" className="text-right">
                Token Symbol
              </Label>
              <Input
                id="tokenSymbol"
                name="tokenSymbol"
                value={formData?.tokenSymbol || ""}
                onChange={handleChange}
                className="col-span-3 bg-gray-800 border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tokenSupply" className="text-right">
                Token Supply
              </Label>
              <Input
                id="tokenSupply"
                name="tokenSupply"
                value={formData?.tokenSupply || ""}
                onChange={handleChange}
                className="col-span-3 bg-gray-800 border-gray-600"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleSave}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };