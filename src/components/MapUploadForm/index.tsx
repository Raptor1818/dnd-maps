"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  image: z
    .custom<File>((f) => f instanceof File && f.size > 0, {
      message: "Image file is required",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export function MapUploadForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: undefined as unknown as File,
    },
  });

  const uploadMap = api.map.uploadMap.useMutation();
  const [uploading, setUploading] = useState(false);

  const onSubmit = async (values: FormValues) => {
    try {
      setUploading(true);

      const filePath = `${Date.now()}-${values.image.name}`;
      const { error } = await supabase.storage
        .from("dnd-maps")
        .upload(filePath, values.image, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      const publicUrl = supabase.storage
        .from("dnd-maps")
        .getPublicUrl(filePath).data.publicUrl;

      await uploadMap.mutateAsync({
        name: values.name,
        description: values.description ?? "",
        image_url: publicUrl,
        visible: false,
        createdAt: new Date(),
      });

      form.reset();
      alert("Map uploaded successfully!");
    } catch (e) {
      console.error(e);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-md mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Map Name</FormLabel>
              <FormControl>
                <Input placeholder="Dungeon of Doom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Optional description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Map Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    onChange(e.target.files?.[0] ?? new File([], ""))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Map"}
        </Button>
      </form>
    </Form>
  );
}
