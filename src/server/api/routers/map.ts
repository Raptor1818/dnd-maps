import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export type MapType = {
  id: number;
  name: string;
  description: string | null;
  image_url: string;
  visible: boolean;
  createdAt: Date;
}

//process.env.SUPABASE_URL + "/storage/v1/object/public/dnd-maps/<filename>"

// TODO upload to supabase
export const mapRouter = createTRPCRouter({
  uploadMap: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        image_url: z.string().url(),
        visible: z.boolean(),
        createdAt: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.map.create({
        data: {
          name: input.name,
          description: input.description,
          image_url: input.image_url,
          visible: input.visible,
          createdAt: input.createdAt,
        },
      });
    }),

  getAllMaps: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.map.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        image_url: true,
        visible: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }),

  deleteMap: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.map.delete({
        where: {
          id: input.id,
        },
      });
    }),

  editVisibilityMap: publicProcedure
    .input(
      z.object({
        id: z.number(),
        visible: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.map.update({
        where: {
          id: input.id,
        },
        data: {
          visible: input.visible,
        },
      });
    }),
});
