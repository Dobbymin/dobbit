import { NextRequest, NextResponse } from "next/server";

import { newsPaginationHandler } from "@/entities/news/handler/news-pagination.handler";

export async function GET(request: NextRequest) {
  try {
    // URL에서 page 파라미터 추출
    const searchParams = request.nextUrl.searchParams;
    const pageParam = searchParams.get("page");
    const page = pageParam ? parseInt(pageParam, 10) : 0;

    // 페이지 번호 유효성 검사
    if (isNaN(page) || page < 0) {
      return NextResponse.json(
        {
          status: "error",
          data: null,
          error: "Invalid page parameter",
        },
        { status: 400 },
      );
    }

    // 핸들러 호출
    const data = await newsPaginationHandler(page);

    return NextResponse.json(
      {
        status: "success",
        data,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("News API error:", error);
    return NextResponse.json(
      {
        status: "error",
        data: null,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
