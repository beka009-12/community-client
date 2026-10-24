import { FC } from "react";
import Grid from "./Grid";
import EditorialList from "./EditorialList";
import type { ProjectListItem } from "@/src/server/api/schemas";

// Cards on touch screens, the hover list with a mouse (switched in CSS at
// 1024px). Shared by the home page and /projects.
const ProjectListing: FC<{ projects: ProjectListItem[] }> = ({ projects }) => (
  <>
    <Grid projects={projects} />
    <EditorialList projects={projects} />
  </>
);

export default ProjectListing;
