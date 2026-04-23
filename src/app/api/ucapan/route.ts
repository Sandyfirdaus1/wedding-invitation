import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Ucapan from '@/models/Ucapan';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { name, message, confirmation } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      );
    }

    const ucapan = new Ucapan({
      name,
      message,
      confirmation: confirmation || 'Hadir',
    });

    await ucapan.save();

    return NextResponse.json(
      { success: true, message: 'Ucapan saved successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving ucapan:', error);
    return NextResponse.json(
      { error: 'Failed to save ucapan' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    
    const ucapanList = await Ucapan.find().sort({ createdAt: -1 });
    
    return NextResponse.json(
      { success: true, data: ucapanList },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching ucapan:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ucapan' },
      { status: 500 }
    );
  }
}
