import { redirect } from "next/navigation";

export async function GET() {
  redirect("https://hub.aide.sh/install");
}
