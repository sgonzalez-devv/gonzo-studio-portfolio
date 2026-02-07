"use client";

import React from "react"

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

interface Project {
  id?: string;
  title_en: string;
  title_es: string;
  description_en: string;
  description_es: string;
  image_url: string;
  technologies: string[];
  project_url: string;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
}

interface ProjectFormProps {
  project?: Project;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(project?.image_url ?? "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Project>({
    title_en: project?.title_en ?? "",
    title_es: project?.title_es ?? "",
    description_en: project?.description_en ?? "",
    description_es: project?.description_es ?? "",
    image_url: project?.image_url ?? "",
    technologies: project?.technologies ?? [],
    project_url: project?.project_url ?? "",
    is_featured: project?.is_featured ?? false,
    is_active: project?.is_active ?? true,
    display_order: project?.display_order ?? 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const supabase = createClient();

    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error("User not authenticated");
        setIsSubmitting(false);
        return;
      }

      if (project?.id) {
        // Update existing project
        await supabase
          .from("projects")
          .update(formData)
          .eq("id", project.id);
      } else {
        // Create new project - include user_id
        await supabase.from("projects").insert({
          ...formData,
          user_id: user.id
        });
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      console.error("Error saving project:", error);
      setIsSubmitting(false);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      await handleImageFile(files[0]);
    }
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      await handleImageFile(files[0]);
    }
  };

  const handleImageFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Upload to Supabase Storage
    const supabase = createClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `project-images/${fileName}`;

    try {
      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('projects')
        .upload(filePath, file);

      if (error) {
        // If storage doesn't exist or fails, use local preview
        console.warn('Storage upload failed, using local preview:', error);
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setImagePreview(base64String);
          setFormData({ ...formData, image_url: base64String });
        };
        reader.readAsDataURL(file);
        return;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('projects')
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;
      setImagePreview(publicUrl);
      setFormData({ ...formData, image_url: publicUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
      // Fallback to local preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData({ ...formData, image_url: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview("");
    setFormData({ ...formData, image_url: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {/* English Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-sm font-normal text-muted-foreground">EN</span>
            English Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title_en">Title</Label>
            <Input
              id="title_en"
              value={formData.title_en}
              onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
              placeholder="Project title in English"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description_en">Description</Label>
            <Textarea
              id="description_en"
              value={formData.description_en}
              onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
              placeholder="Project description in English"
              className="min-h-32"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Spanish Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-sm font-normal text-muted-foreground">ES</span>
            Spanish Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title_es">Title</Label>
            <Input
              id="title_es"
              value={formData.title_es}
              onChange={(e) => setFormData({ ...formData, title_es: e.target.value })}
              placeholder="Project title in Spanish"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description_es">Description</Label>
            <Textarea
              id="description_es"
              value={formData.description_es}
              onChange={(e) => setFormData({ ...formData, description_es: e.target.value })}
              placeholder="Project description in Spanish"
              className="min-h-32"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Project Details */}
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Project Image</Label>
            <div
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                transition-colors duration-200
                ${isDragging 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50'
                }
              `}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
              
              {imagePreview ? (
                <div className="space-y-4">
                  <div className="relative w-full aspect-video max-w-md mx-auto overflow-hidden rounded-lg">
                    <Image
                      src={imagePreview}
                      alt="Project preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                    >
                      Change Image
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage();
                      }}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Upload className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Drop your image here</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      or click to browse
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Supports: JPG, PNG, GIF, WebP
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Project URL */}
          <div className="space-y-2">
            <Label htmlFor="project_url">Project URL</Label>
            <Input
              id="project_url"
              type="url"
              value={formData.project_url}
              onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
              placeholder="https://example.com"
              required
            />
            <p className="text-xs text-muted-foreground">
              When users click on the project image, they will be redirected to this URL
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="is_active">Active</Label>
              <p className="text-sm text-muted-foreground">Show this project on the website</p>
            </div>
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="is_featured">Featured</Label>
              <p className="text-sm text-muted-foreground">Highlight this project on the homepage</p>
            </div>
            <Switch
              id="is_featured"
              checked={formData.is_featured}
              onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isSubmitting} className="gap-2">
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              {project?.id ? "Update Project" : "Create Project"}
            </>
          )}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
