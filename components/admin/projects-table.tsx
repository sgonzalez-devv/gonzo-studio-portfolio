"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Edit, Trash2, ExternalLink, Eye, EyeOff, Star, StarOff, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

interface Project {
  id: string;
  title_en: string;
  title_es: string;
  description_en: string;
  description_es: string;
  image_url: string | null;
  technologies: string[];
  project_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
}

interface ProjectsTableProps {
  projects: Project[];
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setLoading(id);
    const supabase = createClient();
    await supabase.from("projects").delete().eq("id", id);
    router.refresh();
    setLoading(null);
  };

  const toggleActive = async (id: string, currentValue: boolean) => {
    setLoading(id);
    const supabase = createClient();
    await supabase.from("projects").update({ is_active: !currentValue }).eq("id", id);
    router.refresh();
    setLoading(null);
  };

  const toggleFeatured = async (id: string, currentValue: boolean) => {
    setLoading(id);
    const supabase = createClient();
    await supabase.from("projects").update({ is_featured: !currentValue }).eq("id", id);
    router.refresh();
    setLoading(null);
  };

  if (projects.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Folder className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No projects yet</h3>
        <p className="text-muted-foreground mb-4">Get started by creating your first project.</p>
        <Button asChild>
          <Link href="/admin/projects/new">Add Your First Project</Link>
        </Button>
      </Card>
    );
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Technologies</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Featured</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>
                <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted">
                  {project.image_url ? (
                    <Image
                      src={project.image_url || "/placeholder.svg"}
                      alt={project.title_en}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <Folder className="h-5 w-5 text-muted-foreground/40" />
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium text-foreground">{project.title_en}</p>
                  <p className="text-sm text-muted-foreground">{project.title_es}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleActive(project.id, project.is_active)}
                  disabled={loading === project.id}
                  className={project.is_active ? "text-green-600" : "text-muted-foreground"}
                >
                  {project.is_active ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </Button>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFeatured(project.id, project.is_featured)}
                  disabled={loading === project.id}
                  className={project.is_featured ? "text-yellow-500" : "text-muted-foreground"}
                >
                  {project.is_featured ? (
                    <Star className="h-4 w-4 fill-current" />
                  ) : (
                    <StarOff className="h-4 w-4" />
                  )}
                </Button>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {project.project_url && (
                    <Button variant="ghost" size="icon" asChild>
                      <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/projects/${project.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Project</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete &quot;{project.title_en}&quot;? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(project.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
