import Image from "next/image";

type ReportData = {
  name: string;
  age: number | string;
  location: string;
  goal_line: string;
  profile_image_url: string;
  creator_identity_title: string;
  identity_summary: string;
  why_fits_bullets: string[];
  why_fits_paragraph: string;
  strengths_bullets: string[];
  strengths_paragraph: string;
  blockers_bullets: string[];
  blockers_paragraph: string;
  next_move_bullets: string[];
  missing_paragraph: string;
};

export default function ReportTemplate({ report }: { report: ReportData }) {
  const accent = "#E8A33D";

  return (
    <div style={{ background: "#F4F0EF", padding: 32 }}>
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 16,
          padding: 40,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <h4 style={{ margin: 0, fontSize: 18 }}>
              Personalized Creator Blueprint
            </h4>
            <h1
              style={{
                margin: 0,
                color: accent,
                fontSize: 36,
                textTransform: "uppercase",
              }}
            >
              {report.name}
            </h1>
          </div>
          <button
            style={{
              background: accent,
              border: "none",
              borderRadius: 8,
              padding: "10px 20px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Download <div style={{ fontSize: 11, fontWeight: 400 }}>as pdf</div>
          </button>
        </div>

        <hr
          style={{
            margin: "20px 0",
            border: "none",
            borderTop: "1px solid #eee",
          }}
        />

        {/* Profile row */}
        <div style={{ display: "flex", gap: 24 }}>
          <Image
            src={report.profile_image_url}
            alt={report.name}
            width={200}
            height={200}
            className="rounded-xl object-cover"
            unoptimized={report.profile_image_url.startsWith("/avatars/")}
          />
          <div style={{ flex: 1 }}>
            <p>
              <strong>NAME:</strong> {report.name}
            </p>
            <p>
              <strong>AGE:</strong> {report.age} &nbsp;&nbsp;&nbsp;
              <strong>BASED:</strong> {report.location}
            </p>
            <p>
              <strong>GOAL:</strong> {report.goal_line}
            </p>

            <h2 style={{ marginBottom: 4 }}>Your Creator Identity:</h2>
            <h2 style={{ marginTop: 0, color: accent }}>
              {report.creator_identity_title}
            </h2>
          </div>
        </div>

        <p style={{ marginTop: 20, lineHeight: 1.6 }}>
          {report.identity_summary}
        </p>

        <hr
          style={{
            margin: "20px 0",
            border: "none",
            borderTop: "1px solid #eee",
          }}
        />

        {/* Why this fits */}
        <h3 style={{ color: accent }}>☆ Why This Direction Fits You</h3>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
        >
          {report.why_fits_bullets.map((b, i) => (
            <p key={i} style={{ margin: "4px 0" }}>
              ✓ {b}
            </p>
          ))}
        </div>
        <p style={{ lineHeight: 1.6 }}>{report.why_fits_paragraph}</p>

        {/* Strengths / Blockers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginTop: 20,
          }}
        >
          <div
            style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16 }}
          >
            <h4 style={{ color: accent }}>☆ Strengths You Already Have</h4>
            <ol>
              {report.strengths_bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ol>
            <p style={{ fontSize: 14 }}>{report.strengths_paragraph}</p>
          </div>
          <div
            style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16 }}
          >
            <h4 style={{ color: accent }}>☆ Things Holding You Back</h4>
            <ol>
              {report.blockers_bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ol>
            <p style={{ fontSize: 14 }}>{report.blockers_paragraph}</p>
          </div>
        </div>

        {/* Next move / missing */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginTop: 24,
          }}
        >
          <div>
            <h4 style={{ color: accent }}>☆ Your Next Move?</h4>
            <ul>
              {report.next_move_bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ color: accent }}>☆ What&apos;s still missing?</h4>
            <p style={{ lineHeight: 1.6 }}>{report.missing_paragraph}</p>
            <button
              style={{
                background: accent,
                border: "none",
                borderRadius: 8,
                padding: "12px 20px",
                fontWeight: 700,
                cursor: "pointer",
                marginTop: 8,
              }}
            >
              Build my Step-by-Step Gameplan →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
