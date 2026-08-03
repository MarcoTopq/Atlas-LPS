import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!id) {
      return NextResponse.json({ error: "Missing document id" }, { status: 400 });
    }

    const backendUrl = `http://10.121.88.45:8222/api/v1/documents/${id}/pdf`;
    
    const backendRes = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Accept": "application/pdf, application/json, */*",
      },
    });

    if (!backendRes.ok) {
      return NextResponse.json(
        { error: `Backend PDF endpoint returned status ${backendRes.status}` },
        { status: backendRes.status }
      );
    }

    const pdfArrayBuffer = await backendRes.arrayBuffer();

    return new Response(pdfArrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${id}.pdf"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch PDF";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
