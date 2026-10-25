import { FC } from "react";
import Grid from "./Grid";
import EditorialList from "./EditorialList";
import type { ProjectListItem } from "@/src/server/api/schemas";

// Cards on touch screens, the hover list with a mouse (switched in CSS at
// 1024px). The /projects catalogue; the home page swaps the cards for
// ProjectStack.
const ProjectListing: FC<{ projects: ProjectListItem[] }> = ({ projects }) => (
  <>
    <Grid projects={projects} />
    <EditorialList projects={projects} />
  </>
);

export default ProjectListing;
