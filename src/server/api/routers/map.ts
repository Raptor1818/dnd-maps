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

// TODO upload to supabase
export const mapRouter = createTRPCRouter({
  // uploadMap: publicProcedure
  //   .input(z.object({
  //     name: z.string(),
  //     description: z.string(),
  //     image_url: z.string(),
  //     visible: z.boolean(),
  //     createdAt: z.date(),
  //   }))
  //   .mutation(async ({ ctx, input }) => {

  //     return await ctx.db.map.create({
  //       data: {
  //         name: input.name,
  //         description: input.description,
  //         image: input.image,
  //         visible: input.visible,
  //         createdAt: new Date(),
  //       },
  //     });
  //   }),

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
});
