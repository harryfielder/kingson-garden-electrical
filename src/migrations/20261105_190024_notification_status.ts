import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_download_requests_notification_status" AS ENUM('pending', 'sent', 'delivered', 'failed', 'skipped');
  CREATE TYPE "public"."enum_form_submissions_notification_status" AS ENUM('pending', 'sent', 'delivered', 'failed', 'skipped');
  ALTER TABLE "download_requests" ADD COLUMN "notification_status" "enum_download_requests_notification_status" DEFAULT 'pending';
  ALTER TABLE "download_requests" ADD COLUMN "notification_attempts" numeric DEFAULT 0;
  ALTER TABLE "download_requests" ADD COLUMN "notification_last_attempt_at" timestamp(3) with time zone;
  ALTER TABLE "download_requests" ADD COLUMN "notification_recipients" varchar;
  ALTER TABLE "download_requests" ADD COLUMN "notification_message_id" varchar;
  ALTER TABLE "download_requests" ADD COLUMN "notification_error" varchar;
  ALTER TABLE "form_submissions" ADD COLUMN "notification_status" "enum_form_submissions_notification_status" DEFAULT 'pending';
  ALTER TABLE "form_submissions" ADD COLUMN "notification_attempts" numeric DEFAULT 0;
  ALTER TABLE "form_submissions" ADD COLUMN "notification_last_attempt_at" timestamp(3) with time zone;
  ALTER TABLE "form_submissions" ADD COLUMN "notification_recipients" varchar;
  ALTER TABLE "form_submissions" ADD COLUMN "notification_message_id" varchar;
  ALTER TABLE "form_submissions" ADD COLUMN "notification_error" varchar;
  CREATE INDEX "download_requests_notification_notification_status_idx" ON "download_requests" USING btree ("notification_status");
  CREATE INDEX "form_submissions_notification_notification_status_idx" ON "form_submissions" USING btree ("notification_status");`)

  // Rows from before notifications existed never emailed anyone. Mark them
  // honestly rather than leaving them "pending" for the cron to fire weeks late.
  await db.execute(sql`
   UPDATE "download_requests" SET "notification_status" = 'skipped', "notification_error" = 'Received before email notifications were set up.';
  UPDATE "form_submissions" SET "notification_status" = 'skipped', "notification_error" = 'Received before email notifications were set up.';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "download_requests_notification_notification_status_idx";
  DROP INDEX "form_submissions_notification_notification_status_idx";
  ALTER TABLE "download_requests" DROP COLUMN "notification_status";
  ALTER TABLE "download_requests" DROP COLUMN "notification_attempts";
  ALTER TABLE "download_requests" DROP COLUMN "notification_last_attempt_at";
  ALTER TABLE "download_requests" DROP COLUMN "notification_recipients";
  ALTER TABLE "download_requests" DROP COLUMN "notification_message_id";
  ALTER TABLE "download_requests" DROP COLUMN "notification_error";
  ALTER TABLE "form_submissions" DROP COLUMN "notification_status";
  ALTER TABLE "form_submissions" DROP COLUMN "notification_attempts";
  ALTER TABLE "form_submissions" DROP COLUMN "notification_last_attempt_at";
  ALTER TABLE "form_submissions" DROP COLUMN "notification_recipients";
  ALTER TABLE "form_submissions" DROP COLUMN "notification_message_id";
  ALTER TABLE "form_submissions" DROP COLUMN "notification_error";
  DROP TYPE "public"."enum_download_requests_notification_status";
  DROP TYPE "public"."enum_form_submissions_notification_status";`)
}
