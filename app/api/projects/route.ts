// app/api/products/route.ts
// import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // const url = new URL(request.url);
    // const page = url.searchParams.get("page") || "1";
    console.log("SERVER >>>");

    const response = await fetch(
      `${process.env.BASE_API_URL}/api/projects`,
      // `${process.env.BASE_API_URL}/api/projects/list?page=${page}`,
      // `/api/projects/list?page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    console.log("SERVER >>>", data);

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
