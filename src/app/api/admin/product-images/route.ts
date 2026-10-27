import { randomUUID } from "crypto";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { ApiError, created, fail, withErrorHandling } from "@/lib/api-response";

export const runtime = "nodejs";

const BUCKET = "product-images";
const MAX_FILE_SIZE = 8 * 1024 * 1024;
const IMAGE_TYPES = {
  "image/jpeg": { extension: "jpg", signature: (bytes: Buffer) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff },
  "image/png": { extension: "png", signature: (bytes: Buffer) => bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) },
  "image/webp": { extension: "webp", signature: (bytes: Buffer) => bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP" },
} as const;

export const POST = withErrorHandling(async (req: NextRequest) => {
  await requireAdmin();

  const formData = await req.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) return fail("Choose an image file to upload.", 422);
  if (file.size === 0 || file.size > MAX_FILE_SIZE) {
    return fail("Image files must be smaller than 8 MB.", 422);
  }

  const imageType = IMAGE_TYPES[file.type as keyof typeof IMAGE_TYPES];
  if (!imageType) return fail("Choose a JPG, PNG, or WebP image.", 415);

  const body = Buffer.from(await file.arrayBuffer());
  if (!imageType.signature(body)) return fail("The selected file does not match its image format.", 415);

  const endpoint = process.env.AWS_ENDPOINT_URL_S3;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION;
  if (!endpoint || !accessKeyId || !secretAccessKey || !region) {
    throw new ApiError(
      "Product image storage is not configured. Add the Neon object storage credentials to the server environment.",
      503
    );
  }

  const endpointUrl = new URL(endpoint);
  if (endpointUrl.protocol !== "https:" && process.env.NODE_ENV === "production") {
    throw new ApiError("Product image storage must use a secure HTTPS endpoint.", 503);
  }

  const key = `products/${randomUUID()}.${imageType.extension}`;
  const storage = new S3Client({
    region,
    endpoint: endpointUrl.toString(),
    forcePathStyle: true,
    credentials: { accessKeyId, secretAccessKey },
  });

  await storage.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentLength: file.size,
      ContentType: file.type,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  return created({ url: `${endpointUrl.toString().replace(/\/+$/, "")}/${BUCKET}/${key}` });
});
