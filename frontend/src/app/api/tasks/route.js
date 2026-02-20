import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Task from '@/models/Task';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');

    let filter = {};
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }
    if (status) {
      filter.completed = status === 'completed';
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: tasks });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    if (!body.title) {
      return NextResponse.json({ success: false, message: 'Title is required' }, { status: 400 });
    }

    const task = await Task.create({
      title: body.title.trim(),
      description: body.description || '',
    });

    return NextResponse.json({ success: true, data: task }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
