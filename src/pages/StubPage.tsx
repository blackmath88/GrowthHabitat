import { Page } from "../components/Shell";
import { Card, Eyebrow, SectionHeader } from "../components/Primitives";

export function StubPage({
  num,
  title,
  subtitle,
}: {
  num: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Page crumbs={["Career discovery", title]}>
      <SectionHeader
        eyebrow={`${num} · ${title}`}
        title={subtitle}
        subtitle="This surface is next on the build list. The Command Center, type, and tokens are settled — once you sign off there, this section gets fleshed out."
      />
      <Card>
        <Eyebrow>Coming next</Eyebrow>
        <p
          style={{
            marginTop: 12,
            fontSize: 14,
            color: "var(--gh-muted)",
            lineHeight: 1.6,
          }}
        >
          The functional brief for this surface is in the handoff JSON.
          Building it after the look-and-feel review.
        </p>
      </Card>
    </Page>
  );
}
