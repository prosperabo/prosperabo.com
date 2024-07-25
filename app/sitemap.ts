import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // TODO: Simple example, next use on Projects
  return [
    {
      url: "https://staging.prosperabo.com",
      lastModified: new Date(),
    },
  ];
  /* const users = await prisma.user.findMany({
    select: {
      id: true,
    },
    take: 1,
  });

  return [
    {
      url: "https://domain.example",
      lastModified: new Date(),
    },
    ...users.map((user) => ({
      url: `https://domain.example/${user.id}`,
      lastModified: new Date(),
    })),
  ]; */
}
