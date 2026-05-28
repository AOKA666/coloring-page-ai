import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

const SEEDREAM_API_KEY = process.env.SEEDREAM_API_KEY;
const SEEDREAM_MODEL_ID = process.env.SEEDREAM_MODEL_ID;
const SEEDREAM_API_URL = "https://ark.cn-beijing.volces.com/api/v3/images/generations";

export async function POST(req: NextRequest) {
  // Check if API is configured
  if (!SEEDREAM_API_KEY || !SEEDREAM_MODEL_ID) {
    return NextResponse.json(
      { error: "Seedream API not configured. Please set SEEDREAM_API_KEY and SEEDREAM_MODEL_ID environment variables." },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const { image } = body;

    if (!image || typeof image !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'image' field. Expected base64 data URL." },
        { status: 400 }
      );
    }

    // Validate base64 format
    if (!image.startsWith("data:image/")) {
      return NextResponse.json(
        { error: "Invalid image format. Expected data:image/... base64 string." },
        { status: 400 }
      );
    }

    const prompt =
      "Convert this photo into a clean black and white line art coloring page. " +
      "Extract only the outlines and contours. Remove all colors, shading, gradients, and textures. " +
      "The result must be simple bold black lines on a pure white background. " +
      "Make it look like a professional printable coloring book page with clear, easy-to-color outlines.";

    const seedreamBody = {
      model: SEEDREAM_MODEL_ID,
      prompt,
      image,
      size: "2K",
      response_format: "url",
      watermark: false,
      sequential_image_generation: "disabled",
    };

    const response = await fetch(SEEDREAM_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SEEDREAM_API_KEY}`,
      },
      body: JSON.stringify(seedreamBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Seedream API error:", response.status, errorText);
      return NextResponse.json(
        { error: `Seedream API error: ${response.status}`, details: errorText },
        { status: 502 }
      );
    }

    const data = await response.json();

    // Check for API-level errors
    if (data.error) {
      console.error("Seedream API returned error:", data.error);
      return NextResponse.json(
        { error: data.error.message || "Image generation failed", code: data.error.code },
        { status: 502 }
      );
    }

    // Extract the generated image URL
    const imageUrl = data.data?.[0]?.url;
    const imageBase64 = data.data?.[0]?.b64_json;
    const imageSize = data.data?.[0]?.size;

    if (!imageUrl && !imageBase64) {
      return NextResponse.json(
        { error: "No image was generated. The model may have rejected the request." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      imageUrl,
      imageBase64,
      size: imageSize,
      usage: data.usage,
    });
  } catch (err: any) {
    console.error("Colorize API error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
