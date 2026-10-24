import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import MemberProfile from "@/src/components/MemberProfile";
import { positionLabel } from "@/src/lib/api-labels";
import { fullName } from "@/src/lib/people";
import { parseId } from "@/src/lib/route-id";
import { getMember } from "@/src/server/api/members";

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

// cacheComponents: params are request data, so they are read inside the
// Suspense boundary and the route still gets a static shell.
const Member = async ({ params }: Pick<PageProps<"/team/[id]">, "params">) => {
  const member = await load((await params).id);
  if (!member) notFound();
  return <MemberProfile member={member} />;
};

const Page = ({ params }: PageProps<"/team/[id]">) => (
  <Suspense fallback={null}>
    <Member params={params} />
  </Suspense>
);

export default Page;
