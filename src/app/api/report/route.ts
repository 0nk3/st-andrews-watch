import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Forward the request to your backend
    const backendUrl = process.env.BACKEND_API_URL || 'YOUR_BACKEND_URL';
    
    const response = await fetch(`${backendUrl}/standrews/report`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to submit report' }));
      return NextResponse.json(error, { status: response.status });
    }

    const result = await response.json();
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}