import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    console.log("Test auth called with:", { email, password: "***" });

    // First, test if the backend server is responding at all
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      // Last-resort default to avoid confusing "not configured" in prod
      "https://portfoliobackend-83lp.onrender.com";
    console.log("Testing base backend URL:", baseUrl);

    if (!baseUrl) {
      return NextResponse.json(
        { error: "NEXT_PUBLIC_API_BASE_URL not configured" },
        { status: 500 }
      );
    }

    const results = [];

    // Test basic connectivity
    try {
      const pingResponse = await fetch(baseUrl, { method: "GET" });
      const pingText = await pingResponse.text();
      results.push({
        url: baseUrl,
        method: "GET",
        status: pingResponse.status,
        success: pingResponse.ok,
        response: pingText.substring(0, 200),
      });
    } catch (error) {
      results.push({
        url: baseUrl,
        method: "GET",
        status: "ERROR",
        success: false,
        response: error instanceof Error ? error.message : String(error),
      });
    }

    // Try different possible endpoints
    const possibleEndpoints = [
      `${baseUrl}/api/auth/login`,
      `${baseUrl}/api/login`,
      `${baseUrl}/auth/login`,
      `${baseUrl}/login`,
      `${baseUrl}/api/users/login`,
      `${baseUrl}/api/admin/login`,
      `${baseUrl}/admin/login`,
      `${baseUrl}/api/auth/signin`,
      `${baseUrl}/api/signin`,
      `${baseUrl}/signin`,
    ];

    for (const endpoint of possibleEndpoints) {
      console.log("Testing endpoint:", endpoint);

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const responseText = await response.text();

        results.push({
          url: endpoint,
          method: "POST",
          status: response.status,
          success: response.ok,
          response: responseText.substring(0, 200),
        });

        // If we get a successful response, break
        if (response.ok) {
          break;
        }
      } catch (error) {
        results.push({
          url: endpoint,
          method: "POST",
          status: "ERROR",
          success: false,
          response: error instanceof Error ? error.message : String(error),
        });
      }
    }

    return NextResponse.json({
      baseUrl: baseUrl,
      totalEndpointsTested: results.length,
      results: results,
    });
  } catch (error) {
    console.error("Test auth error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
