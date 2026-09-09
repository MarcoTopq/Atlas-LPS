import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, document_id, user, options } = body;

    const backendPayload = {
      document_id: document_id ? document_id : null,
      question: question || "",
      user: user || {
        user_id: "demo",
        role: "admin",
        unit: "IT",
        access_level: "internal"
      },
      options: options || {
        include_trace: true,
        model: "",
        provider: ""
      }
    };

    const backendRes = await fetch("http://10.121.88.45:8222/api/v1/chat/stream", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(backendPayload),
    });

    if (!backendRes.ok || !backendRes.body) {
      return NextResponse.json(
        { error: `Backend API returned status ${backendRes.status}` },
        { status: backendRes.status }
      );
    }

    return new Response(backendRes.body, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
      },
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}
