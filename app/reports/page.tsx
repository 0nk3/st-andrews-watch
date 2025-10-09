"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Report {
  id: string;
  type: string;
  location: string;
  description: string;
  date: string;
  timestamp: string;
  status: string;
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch("/api/reports");
      const data = await response.json();
      setReports(data.reports || []);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "crime":
        return "bg-red-100 text-red-800";
      case "theft":
        return "bg-orange-100 text-orange-800";
      case "corruption":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-blue-900 mb-2">
              Reports Dashboard
            </h1>
            <p className="text-lg text-blue-700">
              View all submitted anonymous reports
            </p>
          </div>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Submit Report
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-blue-600 text-xl">Loading reports...</div>
          </div>
        ) : reports.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              No Reports Yet
            </h2>
            <p className="text-gray-600">
              Reports submitted through the anonymous form will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getTypeColor(
                        report.type
                      )}`}
                    >
                      {report.type.charAt(0).toUpperCase() +
                        report.type.slice(1)}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
                      {report.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    ID: {report.id.split("-").pop()}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Location
                    </label>
                    <p className="text-gray-900">{report.location}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Date of Incident
                    </label>
                    <p className="text-gray-900">
                      {new Date(report.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-600">
                    Description
                  </label>
                  <p className="text-gray-900 mt-1 whitespace-pre-wrap">
                    {report.description}
                  </p>
                </div>

                <div className="text-sm text-gray-500">
                  Submitted on{" "}
                  {new Date(report.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
