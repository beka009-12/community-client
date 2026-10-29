import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MemberProfile from "@/src/components/MemberProfile";
import { positionLabel } from "@/src/lib/api-labels";
import { fullName } from "@/src/lib/people";
import { parseId } from "@/src/lib/route-id";
import { getMember, getMembers } from "@/src/server/api/members";

// The header reads the pathname, which a shell for unknown params doesn't
// have, and an unknown id must answer 404 before anything streams: these
// pages block on navigation instead.
export const instant = false;
// Without it, Partial Prefetching streams the shell for an id the build
// didn't see, and notFound() can only answer 200 + noindex.
export const ensureStatic = "navigation";

// The route needs at least one id; an empty roster prerenders the 404.
export async function generateStaticParams(): Promise<{ id: string }[]> {
  const members = await getMembers();
  return members.length > 0 ? members.map((member) => ({ id: String(member.id) })) : [{ id: "0" }];
}

const load = async (rawId: string) => {
  const id = parseId(rawId);
  return id === null ? null : getMember(id);
};

export async function generateMetadata({
  params,
}: PageProps<"/team/[id]">): Promise<Metadata> {
  const member = await load((await params).id);
  if (!member) return {};
  return {
    title: `${fullName(member)} — Motion Community`,
    description: [positionLabel(member.position), member.bio].filter(Boolean).join(". "),
  };
}

const Page = async ({ params }: PageProps<"/team/[id]">) => {
  const member = await load((await params).id);
  if (!member) notFound();
  return <MemberProfile member={member} />;
};

export default Page;
