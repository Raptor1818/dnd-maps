
import { api } from "@/trpc/react";
import { useState } from "react";


export default function MapUploader() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(false);

  const [image, setImage] = useState<File | null>(null);
  const uploadMap = api.map.uploadMap.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;

    const base64 = await toBase64(image);
    uploadMap.mutate({ name, description, visible, createdAt: new Date(), imageBase64: base64 });
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Map name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] ?? null)}
        required
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
    </form>
  );
}
