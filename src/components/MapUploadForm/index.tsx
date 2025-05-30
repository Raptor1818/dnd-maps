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
import { uploadMapImage } from "@/utils/supabaseHandler";
import { useMapContext } from "@/context/MapContext";
import { convertToWebP } from "@/utils/convertToWebP";

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
  const { refetch } = useMapContext();

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

      const webpImage = await convertToWebP(values.image)
      const filePath = `${Date.now()}-${webpImage.name}`

      const publicUrl = await uploadMapImage(webpImage, filePath)


      await uploadMap.mutateAsync({
        name: values.name,
        description: values.description ?? "",
        image_url: publicUrl,
        image_generated_name: filePath,
        visible: false,
        createdAt: new Date(),
      });
      form.reset();
    } catch (e) {
      console.error(e);
      alert("Upload failed.");
    } finally {
      setUploading(false);
      refetch()
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome mappa</FormLabel>
              <FormControl>
                <Input
                  id="name"
                  placeholder="Dungeon of Doom"
                  {...field}
                />
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
              <FormLabel>Descrizione</FormLabel>
              <FormControl>
                <Input
                  id="description"
                  placeholder="Optional description..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, ..._field } }) => (
            <FormItem>
              <FormLabel>Immagine</FormLabel>
              <FormControl>
                <Input
                  id="image-file"
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
        <Button type="submit" disabled={uploading} className="w-full">
          {uploading ? "Uploading..." : "Upload Map"}
        </Button>
      </form>
    </Form>
  );
}
