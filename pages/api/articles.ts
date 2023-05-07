import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
import { Article } from "@/interfaces/Article";

interface Response {
  data: Article[];
  lastKey: Date | null;
}

interface ErrorResponse {
  message: string;
}

const prisma = new PrismaClient();

const getArticles = async (
  req: NextApiRequest,
  res: NextApiResponse<Response | ErrorResponse>
) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET requests allowed!" });
  }

  if (!req.query?.curLastKey) {
    res.status(400).json({ message: "Missing curLastKey query parameter!" });
    return;
  }

  const limit = 10;

  const curLastKey =
    req.query.curLastKey !== "1"
      ? new Date(req.query.curLastKey as string)
      : null;

  let where: Prisma.articlesWhereInput = {
    NOT: {
      // remove articles that are not from opindia because their content is not relevant to the title and so incorrect summary is generated
      source: { equals: "opindia" },
    },
  };

  if (curLastKey) {
    where = {
      ...where,
      addedToTableAt: { lt: curLastKey },
    };
  }

  let articles = await prisma.articles.findMany({
    where,
    orderBy: { addedToTableAt: "desc" },
    take: limit,
    select: {
      id: true,
      title: true,
      link: true,
      description: true,
      pub_date: true,
      image_url: true,
      category: true,
      creator: true,
      source: true,
      country: true,
      keywords: true,
      addedToTableAt: true,
      summarized_text: true,
      predicted_sentiment: true,
      predicted_emotion: true,
    },
  });

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).json({
    data: articles,
    lastKey:
      articles.length > 0 ? articles[articles.length - 1].addedToTableAt : null,
  });
};

export default getArticles;
