"use client";

import * as React from "react";
import axios from "axios";
import { toast } from "sonner";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export function ImageUpload({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false);

  const onUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onChange(response.data.url);
      toast.success("Image uploaded.");
    } catch (error) {
      toast.error("Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-48 h-48 rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <div>
        <input
          type="file"
          id="image-upload"
          className="hidden"
          onChange={onUpload}
          disabled={disabled || isUploading}
        />
        <label htmlFor="image-upload">
          <div className="w-48 h-48 rounded-md border-2 border-dashed border-muted-foreground/50 flex flex-col items-center justify-center cursor-pointer hover:border-primary">
            <ImagePlus className="h-10 w-10 text-muted-foreground" />
            <span className="mt-2 text-sm text-muted-foreground">
              {isUploading ? "Uploading..." : "Upload an Image"}
            </span>
          </div>
        </label>
      </div>
    </div>
  );
}
