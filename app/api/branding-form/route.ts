import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const supabase = await createClient();

    // Insert form data into Supabase
    const { error } = await supabase
      .from("branding_forms")
      .insert({
        ...data,
        submitted_at: new Date().toISOString(),
      });

    if (error) {
      console.error("Error saving branding form:", error);
      return NextResponse.json(
        { error: "Failed to save form data" },
        { status: 500 }
      );
    }

    // TODO: Send confirmation email to client
    // TODO: Send notification email to admin

    return NextResponse.json(
      { success: true, message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing branding form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
