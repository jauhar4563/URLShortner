import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, X } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { removeUrl } from "@/services/user/apiMethods";
import { toast } from "sonner";

export function Links({ link, setLinks }: any) {
  const [copied, setCopied] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `http://localhost:3000/api/url/${link?.shortUrl}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
  };

  const handleRemove = () => {
    setShowConfirmDialog(true);
  };

  const confirmRemove = () => {
    removeUrl(link?.shortUrl).then((response: any) => {
      toast(response.data.message);
      setLinks((prevLinks: any) =>
        prevLinks.filter((l: any) => l.shortUrl !== link.shortUrl)
      );
      setShowConfirmDialog(false);
    }).catch(() => {
      toast.error("Failed to remove the URL");
      setShowConfirmDialog(false);
    });
  };

  return (
    <Card className="w-[300px] animate-jump-in">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            {link?.shortUrl}
            <X className="cursor-pointer" size={20} onClick={handleRemove} />
          </div>
        </CardTitle>
        <CardDescription>
          <div className="flex overflow-hidden">{link?.fullUrl}</div>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Share</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share link</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input
                  id="link"
                  defaultValue={`http://shortenurl.shufle.online/api/url/${link?.shortUrl}`}
                  readOnly
                />
              </div>
              <Button
                type="button"
                size="sm"
                className="px-3"
                onClick={handleCopy}
              >
                <span className="sr-only">Copy</span>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            {copied && (
              <p className="text-green-500">Link copied to clipboard!</p>
            )}
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Removal</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this URL?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmRemove}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
