import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "reports.json");

export async function POST(request: Request) {
  try {
    const report = await request.json();

    // Validate required fields
    if (!report.type || !report.location || !report.description || !report.date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate a unique ID
    const reportId = `report-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const reportData = {
      id: reportId,
      type: report.type,
      location: report.location,
      description: report.description,
      date: report.date,
      timestamp: report.timestamp || new Date().toISOString(),
      status: "pending",
    };

    // Read existing reports
    let reports = [];
    try {
      const fileContent = await fs.readFile(DATA_FILE, "utf-8");
      reports = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist yet, start with empty array
      reports = [];
    }

    // Add new report
    reports.push(reportData);

    // Ensure data directory exists
    try {
      await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });
    } catch (error) {
      // Directory already exists
    }

    // Write back to file
    await fs.writeFile(DATA_FILE, JSON.stringify(reports, null, 2));

    return NextResponse.json(
      { success: true, reportId: reportId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving report:", error);
    return NextResponse.json(
      { error: "Failed to save report" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Read reports from file
    const fileContent = await fs.readFile(DATA_FILE, "utf-8");
    const reports = JSON.parse(fileContent);

    return NextResponse.json({ reports }, { status: 200 });
  } catch (error) {
    // File doesn't exist or is empty
    return NextResponse.json({ reports: [] }, { status: 200 });
  }
}
