import { FC } from "react";
import type { MemberListItem } from "@/src/server/api/schemas";
import MemberCard from "./MemberCard";
import cardScss from "./MemberCard.module.scss";
import scss from "./Admins.module.scss";

// The community's admins shown on the site, above «Участники», in the same
// grid. Left out while there are none.
const Admins: FC<{ admins: MemberListItem[] }> = ({ admins }) => {
  if (admins.length === 0) return null;
  return (
    <section className={`container ${scss.admins}`} aria-labelledby="admins-title">
      <h2 id="admins-title" className={scss.title}>
        Администраторы
      </h2>
      <ul className={cardScss.grid}>
        {admins.map((admin) => (
          <li key={admin.id}>
            <MemberCard member={admin} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Admins;
