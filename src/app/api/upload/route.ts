import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import formidable from 'formidable';

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public/uploads');

export async function POST(req: Request) {
  try {
    // Ensure upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      filename: (name, ext, part) => {
        return `${Date.now()}_${part.originalFilename}`;
      }
    });

    const file = await new Promise<formidable.File | null>((resolve, reject) => {
      form.parse(req as any, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }
        const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;
        resolve(uploadedFile || null);
      });
    });

    if (!file) {
      return new NextResponse('No file uploaded.', { status: 400 });
    }

    const url = `/uploads/${path.basename(file.filepath)}`;
    return NextResponse.json({ url });

  } catch (error) {
    console.error('[UPLOAD_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
