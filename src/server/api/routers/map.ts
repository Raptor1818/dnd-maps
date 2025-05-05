import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const mapRouter = createTRPCRouter({
  uploadMap: publicProcedure
    .input(z.object({
      name: z.string(),
      description: z.string(),
      imageBase64: z.string(),
      visible: z.boolean(),
      createdAt: z.date(),
    }))
    .mutation(async ({ ctx, input }) => {
      const buffer = Buffer.from(input.imageBase64?.split(",")[1] ?? "", "base64");

      return await ctx.db.map.create({
        data: {
          name: input.name,
          description: input.description,
          image: buffer,
          visible: input.visible,
          createdAt: new Date(),
        },
      });
    }),

  getAllMaps: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.map.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        visible: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }),
});
