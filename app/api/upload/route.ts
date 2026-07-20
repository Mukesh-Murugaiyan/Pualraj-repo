import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import R2Service from "@/services/R2Service";

export const POST = async (req: NextRequest) => {
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
            "Cloudflare R2 Access Denied (403): The R2_ACCESS_KEY or R2_SECRET_KEY in .env is invalid or lacks Object Write permissions. Please create a new R2 API Token in Cloudflare Dashboard -> R2 -> Manage R2 API Tokens with 'Object Read & Write' permission for 'pualraj-bucket', then update R2_ACCESS_KEY and R2_SECRET_KEY in .env.local",
        },
        { status: 403 }
      );
    }
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
};
