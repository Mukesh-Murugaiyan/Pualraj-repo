import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import R2Service from "@/services/R2Service";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // Allow up to 60 seconds execution time

/**
 * GET /api/upload?filename=video.mp4&contentType=video/mp4&folder=products
 * Generates a presigned PUT URL so the browser can upload large files (videos up to 500MB+) directly to Cloudflare R2!
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get("filename");
    const contentType = searchParams.get("contentType") || "application/octet-stream";
    const folder = searchParams.get("folder") || "products";

    if (!filename) {
      return NextResponse.json({ error: "Filename parameter is required" }, { status: 400 });
    }

    const config = R2Service.getR2Config();
    const client = R2Service.getClientConfig();

    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileKey = `${folder}/${Date.now()}-${sanitizedFilename}`;

    const command = new PutObjectCommand({
      Bucket: config.bucket || "",
      Key: fileKey,
      ContentType: contentType,
    });

    // Generate signed URL valid for 1 hour (3600s)
    const presignedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });

    const baseUrl = config.publicUrl
      ? config.publicUrl.replace(/\/$/, "")
      : `${config.endpoint}/${config.bucket}`;

    const publicUrl = `${baseUrl}/${fileKey}`;

    return NextResponse.json({
      success: true,
      presignedUrl,
      publicUrl,
      fileKey,
      message: "Presigned URL generated successfully",
    });
  } catch (err: any) {
    console.error("Presigned URL Generation Error:", err);
    return NextResponse.json({ error: err.message || "Failed to generate upload URL" }, { status: 500 });
  }
}

/**
 * POST /api/upload
 * Fallback multipart upload handler for smaller/medium images & files
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const singleFile = formData.get("file") as File | null;
    const multipleFiles = formData.getAll("files") as File[];
    const folder = (formData.get("folder") as string) || "products";

    const filesToUpload: File[] = [];

    if (singleFile && singleFile instanceof File && singleFile.size > 0) {
      filesToUpload.push(singleFile);
    }
    if (multipleFiles && multipleFiles.length > 0) {
      filesToUpload.push(...multipleFiles.filter((f) => f instanceof File && f.size > 0));
    }

    if (filesToUpload.length === 0) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const config = R2Service.getR2Config();
    const client = R2Service.getClientConfig();
    const uploadedUrls: string[] = [];

    for (const file of filesToUpload) {
      const arrayBuffer = await file.arrayBuffer();
      const fileName = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

      await client.send(
        new PutObjectCommand({
          Bucket: config.bucket || "",
          Key: fileName,
          Body: Buffer.from(arrayBuffer),
          ContentType: file.type || "application/octet-stream",
        })
      );

      const baseUrl = config.publicUrl
        ? config.publicUrl.replace(/\/$/, "")
        : `${config.endpoint}/${config.bucket}`;

      const fileUrl = `${baseUrl}/${fileName}`;
      uploadedUrls.push(fileUrl);
    }

    return NextResponse.json({
      success: true,
      url: uploadedUrls[0],
      urls: uploadedUrls,
      fileName: uploadedUrls[0],
      message: "File uploaded successfully to R2",
    });
  } catch (err: any) {
    console.error("R2 Upload Error:", err);
    if (
      err.name === "AccessDenied" ||
      err.Code === "AccessDenied" ||
      (err.message && err.message.toLowerCase().includes("access denied"))
    ) {
      return NextResponse.json(
        {
          error:
            "Cloudflare R2 Access Denied (403): The R2_ACCESS_KEY or R2_SECRET_KEY in .env is invalid or lacks Object Write permissions.",
        },
        { status: 403 }
      );
    }
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
