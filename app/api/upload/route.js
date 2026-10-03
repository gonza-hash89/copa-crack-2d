import { put, list, del } from '@vercel/blob';

// GET /api/upload → lista pública de fotos de la galería.
// Requiere BLOB_READ_WRITE_TOKEN en el entorno (Vercel → Storage → Blob).
export async function GET() {
  try {
    const { blobs } = await list({ prefix: 'galeria/' });
    const photos = blobs.map((b) => ({ id: b.pathname, src: b.url, caption: '' }));
    return Response.json({ photos });
  } catch {
    // Sin token o sin servicio: el cliente usa su copia local.
    return Response.json({ photos: [], blobDisabled: true });
  }
}

// POST /api/upload → sube un archivo a Vercel Blob (público).
// Espera FormData con campo "file".
export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!file || typeof file === 'string' || file.size === 0) {
      return Response.json({ error: 'Sin archivo válido.' }, { status: 400 });
    }
    const safeName = String(file.name || 'foto.jpg').replace(/[^a-zA-Z0-9._-]/g, '_');
    const blob = await put(`galeria/${Date.now()}-${safeName}`, file, {
      access: 'public',
    });
    return Response.json({ id: blob.pathname, src: blob.url });
  } catch {
    return Response.json(
      { error: 'Subida fallida. Configura BLOB_READ_WRITE_TOKEN en Vercel.' },
      { status: 500 },
    );
  }
}

// DELETE /api/upload → elimina una foto (body JSON: { url }).
export async function DELETE(req) {
  try {
    const { url } = await req.json();
    if (!url) return Response.json({ error: 'Sin URL.' }, { status: 400 });
    await del(url);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'No se pudo eliminar.' }, { status: 500 });
  }
}
