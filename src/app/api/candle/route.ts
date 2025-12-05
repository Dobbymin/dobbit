import { NextRequest, NextResponse } from "next/server";

const UPBIT_API_URL = "https://api.upbit.com/v1";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const market = searchParams.get("market");
    const count = searchParams.get("count");
    const type = searchParams.get("type");
    const unit = searchParams.get("unit");
    const to = searchParams.get("to");

    if (!market || !count || !type) {
      return NextResponse.json({ error: "Missing required parameters: market, count, type" }, { status: 400 });
    }

    // 분봉일 경우 unit 필수
    if (type === "minutes" && !unit) {
      return NextResponse.json({ error: "Unit parameter is required for minute candles" }, { status: 400 });
    }

    // 엔드포인트 구성
    let endpoint = `${UPBIT_API_URL}/candles/${type}`;
    if (type === "minutes") {
      endpoint = `${UPBIT_API_URL}/candles/minutes/${unit}`;
    }

    // URL 파라미터 구성
    const upbitParams = new URLSearchParams({
      market,
      count,
    });

    if (to) {
      upbitParams.append("to", to);
    }

    const upbitUrl = `${endpoint}?${upbitParams.toString()}`;

    // Upbit API 호출 (서버 사이드)
    const response = await fetch(upbitUrl, {
      headers: {
        accept: "application/json",
      },
      // Next.js 서버에서는 캐시하지 않도록 설정
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Upbit API error: ${response.status} ${response.statusText}`, details: errorText },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Candle API route error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
