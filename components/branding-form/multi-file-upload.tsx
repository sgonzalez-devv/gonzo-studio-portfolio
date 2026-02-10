"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Upload, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

interface MultiFileUploadProps {
  value?: string[];
  onChange: (urls: string[]) => void;
  accept?: string;
  maxSize?: number; // in MB
  maxFiles?: number;
  label?: string;
  bucket?: string;
  folder?: string;
}

export function MultiFileUpload({
  value = [],
  onChange,
  accept = "image/*",
  maxSize = 5,
  maxFiles = 10,
  label = "Subir archivos",
  bucket = "branding-files",
  folder = "inspiration",
}: MultiFileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState<string[]>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    await uploadFiles(droppedFiles);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      await uploadFiles(Array.from(selectedFiles));
    }
  };

  const uploadFiles = async (filesToUpload: File[]) => {
    if (files.length + filesToUpload.length > maxFiles) {
      alert(`Máximo ${maxFiles} archivos permitidos.`);
      return;
    }

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of filesToUpload) {
        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
          alert(`${file.name} es demasiado grande. Máximo ${maxSize}MB.`);
          continue;
        }

        // Create unique filename
        const fileExt = file.name.split(".").pop();
        const fileName = `${folder}/${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          console.error("Error uploading file:", error);
          continue;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(fileName);

        uploadedUrls.push(urlData.publicUrl);
      }

      const newFiles = [...files, ...uploadedUrls];
      setFiles(newFiles);
      onChange(newFiles);
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Error al subir algunos archivos.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeFile = async (url: string) => {
    // Extract file path from URL
    const urlParts = url.split("/");
    const bucketIndex = urlParts.indexOf(bucket);
    if (bucketIndex !== -1) {
      const filePath = urlParts.slice(bucketIndex + 1).join("/");
      await supabase.storage.from(bucket).remove([filePath]);
    }

    const newFiles = files.filter((f) => f !== url);
    setFiles(newFiles);
    onChange(newFiles);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">{label}</Label>
        <p className="text-xs text-muted-foreground">
          {files.length} de {maxFiles} archivos
        </p>
      </div>

      {/* Upload Area */}
      {files.length < maxFiles && (
        <Card
          className={`
            p-6 border-2 border-dashed cursor-pointer transition-all
            ${isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"}
            ${isUploading ? "opacity-50 cursor-not-allowed" : ""}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            {isUploading ? (
              <>
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                <p className="text-sm font-medium">Subiendo archivos...</p>
              </>
            ) : (
              <>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Arrastra archivos o haz clic para seleccionar
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Máximo {maxSize}MB por archivo
                  </p>
                </div>
              </>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />
        </Card>
      )}

      {/* Files Grid */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <Card key={index} className="group relative overflow-hidden">
              <div className="aspect-square relative bg-muted">
                <Image
                  src={file}
                  alt={`Upload ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
