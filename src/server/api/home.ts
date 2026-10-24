import "server-only";
import { unstable_rethrow } from "next/navigation";
import { leadProfile, teamLeads, type LeadProfile } from "./joins";
import { getMember, getMembers } from "./members";
import { getProjectsWithMembers } from "./projects";

// A secondary homepage section: when it can't load, the page shows without
// it instead of falling into the error boundary. The bio and the lead's
// projects are on the member detail, so each lead costs one more (cached)
// request.
export async function getTeamLeads(): Promise<LeadProfile[]> {
  try {
    const [roster, projects] = await Promise.all([getMembers(), getProjectsWithMembers()]);
    const details = await Promise.all(teamLeads(projects, roster).map((lead) => getMember(lead.id)));
    return details.flatMap((detail) => (detail ? [leadProfile(detail)] : []));
  } catch (error) {
    // Next signals dynamic rendering, redirects etc. by throwing: not a failure.
    unstable_rethrow(error);
    console.error("Failed to load team leads for the homepage", error);
    return [];
  }
}
