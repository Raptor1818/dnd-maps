import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export type MapType = {
  id: number;
  name: string;
  description: string | null;
  image_url: string;
  image_generated_name: string;
  visible: boolean;
  createdAt: Date;
}

//process.env.SUPABASE_URL + "/storage/v1/object/public/dnd-maps/<filename>"

export const mapRouter = createTRPCRouter({
  uploadMap: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        image_url: z.string().url(),
        image_generated_name: z.string(),
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
          image_generated_name: input.image_generated_name,
          visible: input.visible,
          createdAt: input.createdAt,
        },
      });
    }),

  getAllMaps: publicProcedure
    .input(z.object({ includeInvisible: z.boolean() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.map.findMany({
        where: input.includeInvisible ? {} : { visible: true },
        select: {
          id: true,
          name: true,
          description: true,
          image_url: true,
          image_generated_name: true,
          visible: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      });
    }),

  getOneMap: publicProcedure
    .input(z.number())
    .query(({ ctx, input }) => {
      return ctx.db.map.findUnique({
        where: { id: input },
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
    })
});
