import { skillGroups } from "../content/site";

export function Skills() {
  return (
    <section id="stack" className="skills" aria-labelledby="stack-title">
      <p className="eyebrow">03 / TOOLKIT</p>
      <h2 id="stack-title">常用的工具箱。</h2>
      <dl className="skill-list">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <dt>{group.title}</dt>
            <dd>{group.items.join(" · ")}</dd>
          </div>
        ))}
      </dl>
      <p className="toolkit-note">工具服务于问题，技术栈随着项目生长。</p>
    </section>
  );
}
