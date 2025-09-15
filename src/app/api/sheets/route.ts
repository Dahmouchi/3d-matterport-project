/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const SHEETDB_API_URL = "https://sheetdb.io/api/v1/ksz855rvftis3";

  try {
    // Parse the incoming request body
    const body = await req.json();

    // Validate the required fields
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Add current date
    const dataToSend = {
      email,
      date: new Date().toISOString(), // Add timestamp
    };

    // Send data to the SheetDB API
    const response = await fetch(SHEETDB_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [dataToSend], // SheetDB requires the data to be nested under "data"
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send data to SheetDB");
    }

    return NextResponse.json(
      { message: "Data successfully added to Google Sheets" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error:", error.message || error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
