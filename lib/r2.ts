import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import R2Service from '@/services/R2Service';
import { Product } from './products';

export const isR2Configured = Boolean(
  R2Service.getR2Config().accessKeyId &&
  R2Service.getR2Config().secretAccessKey &&
  R2Service.getR2Config().bucket
);

export interface UploadFileOptions {
  buffer: Buffer;
  filename: string;
  contentType: string;
  folder?: string;
}

export async function uploadFileToStorage({
  buffer,
  filename,
  contentType,
  folder = 'products',
}: UploadFileOptions): Promise<string> {
  const sanitizedFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const key = `${folder}/${sanitizedFilename}`;

  const config = R2Service.getR2Config();
  const client = R2Service.getClientConfig();

  try {
    const command = new PutObjectCommand({
      Bucket: config.bucket || '',
      Key: key,
      Body: buffer,
      ContentType: contentType,
    });

    await client.send(command);

    const baseUrl = config.publicUrl
      ? config.publicUrl.replace(/\/$/, '')
      : `${config.endpoint}/${config.bucket}`;

    return `${baseUrl}/${key}`;
  } catch (err: any) {
    console.error('Cloudflare R2 media upload error:', err);
    throw new Error(`Cloudflare R2 media upload failed: ${err.message || err}`);
  }
}

/**
 * Fetch product list JSON directly from Cloudflare R2 bucket (`data/products.json`).
 */
export async function fetchProductsFromR2(): Promise<Product[] | null> {
  const config = R2Service.getR2Config();
  const client = R2Service.getClientConfig();
  try {
    const command = new GetObjectCommand({
      Bucket: config.bucket || '',
      Key: 'data/products.json',
    });
    const response = await client.send(command);
    if (!response.Body) return null;
    const jsonString = await response.Body.transformToString();
    const data = JSON.parse(jsonString);
    if (Array.isArray(data) && data.length > 0) {
      return data as Product[];
    }
  } catch (err) {
    console.log('R2: data/products.json not yet in bucket or fetch error.');
  }
  return null;
}

/**
 * Save product list JSON directly to Cloudflare R2 bucket (`data/products.json`).
 */
export async function saveProductsToR2(products: Product[]): Promise<boolean> {
  const config = R2Service.getR2Config();
  const client = R2Service.getClientConfig();
  try {
    const command = new PutObjectCommand({
      Bucket: config.bucket || '',
      Key: 'data/products.json',
      Body: JSON.stringify(products, null, 2),
      ContentType: 'application/json',
    });
    await client.send(command);
    console.log('Successfully saved products.json to Cloudflare R2 bucket.');
    return true;
  } catch (err) {
    console.error('Error saving products.json to Cloudflare R2:', err);
    return false;
  }
}
