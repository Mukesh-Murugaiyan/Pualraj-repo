import { S3Client } from "@aws-sdk/client-s3";

class R2Service {
  static getR2Config() {
    return {
      accessKeyId: process.env.R2_ACCESS_KEY || process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.R2_SECRET_KEY || process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "",
      endpoint: process.env.R2_ENDPOINT || process.env.CLOUDFLARE_R2_ENDPOINT || "https://958cf06e85f27fa865b64194296e41d0.r2.cloudflarestorage.com",
      bucket: process.env.R2_BUCKET || process.env.CLOUDFLARE_R2_BUCKET_NAME || "pualraj-bucket",
      publicUrl: process.env.R2_PUBLIC_URL || process.env.CLOUDFLARE_R2_PUBLIC_URL || "https://pub-444a1b4cc3e048e2a669b43e665bb941.r2.dev",
    };
  }

  static getClientConfig() {
    const r2Config = R2Service.getR2Config();

    const r2 = new S3Client({
      region: "auto",
      endpoint: r2Config.endpoint || "",
      credentials: {
        accessKeyId: r2Config.accessKeyId || "",
        secretAccessKey: r2Config.secretAccessKey || "",
      },
      forcePathStyle: true,
    });

    return r2;
  }
}

export default R2Service;
