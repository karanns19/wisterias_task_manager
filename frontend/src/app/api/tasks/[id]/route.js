import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Task from '@/models/Task';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const task = await Task.findById(id);

    if (!task) {
      return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: task });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    const task = await Task.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!task) {
      return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: task });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
