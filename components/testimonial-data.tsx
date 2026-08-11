import type { ReactNode } from "react";

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="bg-[#FFE566] px-0.5 text-black">{children}</span>
  );
}

export function Stars() {
  return (
    <div className="mb-4 flex gap-0.5 text-[#FFC940]" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-lg leading-none">
          ★
        </span>
      ))}
    </div>
  );
}

export function TestimonialCard({
  quote,
  author,
  company,
}: {
  quote: ReactNode;
  author: string;
  company: string;
}) {
  return (
    <article className="text-left">
      <Stars />
      <blockquote className="mb-4 text-sm leading-relaxed text-[#333] sm:text-[15px] sm:leading-relaxed">
        {quote}
      </blockquote>
      <p className="text-sm font-normal text-[#555] sm:text-base">
        —{author}, {company}
      </p>
    </article>
  );
}

export const testimonials: {
  quote: ReactNode;
  author: string;
  company: string;
}[] = [
  {
    quote: (
      <>
        &ldquo;Starting my journey, I know what it means to leave an honest
        review.{" "}
        <Highlight>
          I genuinely appreciate this blueprint because it gave me much more
          clarity than I expected.
        </Highlight>
        &rdquo;
      </>
    ),
    author: "Adam",
    company: "United Kingdom",
  },
  {
    quote: (
      <>
        &ldquo;
        <Highlight>
          GOAT! Honestly one of the most straightforward and helpful resources
        </Highlight>{" "}
        I&apos;ve come across.&rdquo;
      </>
    ),
    author: "Selimhan Ergören",
    company: "Turkiye",
  },
  {
    quote: (
      <>
        &ldquo;Loved it.{" "}
        <Highlight>
          Everything was easy to understand, and I&apos;m genuinely excited to
          start implementing
        </Highlight>{" "}
        what I&apos;ve learned. Looking forward to seeing where this journey
        takes me.&rdquo;
      </>
    ),
    author: "Kolawole Sylvester",
    company: "Germany",
  },
  {
    quote: (
      <>
        &ldquo;Easy to read, well structured, and filled with useful insights.{" "}
        <Highlight>
          It helped simplify a lot of things that previously felt confusing.
        </Highlight>
        &rdquo;
      </>
    ),
    author: "Sverre Slotfeldt",
    company: "United States",
  },
  {
    quote: (
      <>
        &ldquo;Nicely done.{" "}
        <Highlight>Clean, simple, and straight to the point.</Highlight> I
        enjoyed reading it and found it genuinely useful.&rdquo;
      </>
    ),
    author: "Tuan Rifky",
    company: "Turkiye",
  },
  {
    quote: (
      <>
        &ldquo;A well-written and comprehensive guide. Everything is explained
        clearly,{" "}
        <Highlight>
          making it much easier to understand what to focus on next.
        </Highlight>
        &rdquo;
      </>
    ),
    author: "Floyd Bagsby",
    company: "Philippines",
  },
  {
    quote: (
      <>
        &ldquo;The{" "}
        <Highlight>
          best part is how easy everything is to understand
        </Highlight>
        . Every concept is explained clearly, which makes it much easier to take
        action.&rdquo;
      </>
    ),
    author: "Ilsa Syeda",
    company: "Dubai",
  },
  {
    quote: (
      <>
        &ldquo;
        <Highlight>It&apos;s amazing and genuinely helpful.</Highlight> Thank
        you for putting together something that&apos;s both practical and easy
        to follow.&rdquo;
      </>
    ),
    author: "Yuvika Kundra",
    company: "India",
  },
  {
    quote: (
      <>
        &ldquo;
        <Highlight>
          Providing value through a personalized blueprint is such a great idea.
        </Highlight>{" "}
        It gave me practical insights that I can actually use from here.&rdquo;
      </>
    ),
    author: "itemelite",
    company: "United States",
  },
];

/** Extra reviews shown only on /reviews */
export const additionalTestimonials: {
  quote: ReactNode;
  author: string;
  company: string;
}[] = [
  {
    quote: (
      <>
        &ldquo;
        <Highlight>
          It&apos;s genuinely helpful, and I finally feel ready to give it a
          try.
        </Highlight>{" "}
        The blueprint gave me more confidence to start instead of
        overthinking.&rdquo;
      </>
    ),
    author: "Nourish Nook",
    company: "Singapore",
  },
  {
    quote: (
      <>
        &ldquo;
        <Highlight>This is beautifully put together.</Highlight> You can tell a
        lot of thought went into it, and I believe it will genuinely help me
        throughout my journey.&rdquo;
      </>
    ),
    author: "narund2",
    company: "Turkiye",
  },
  {
    quote: (
      <>
        &ldquo;
        <Highlight>It was incredibly helpful.</Highlight> Everything is
        explained step by step, and it gave me the confidence to finally stop
        waiting and start taking action.&rdquo;
      </>
    ),
    author: "Oddbunny",
    company: "(not shared)",
  },
  {
    quote: (
      <>
        &ldquo;
        <Highlight>
          Very helpful for someone like me who wants to learn this &amp; start
          building something online.
        </Highlight>{" "}
        It made the process feel much less overwhelming.&rdquo;
      </>
    ),
    author: "Haniefah Vorzelena",
    company: "Indonesia",
  },
  {
    quote: (
      <>
        &ldquo;Really informative.{" "}
        <Highlight>
          This blueprint helped clear up a lot of confusion and gave me a much
          better understanding
        </Highlight>{" "}
        now.&rdquo;
      </>
    ),
    author: "Anonymous",
    company: "(kept hidden)",
  },
  {
    quote: (
      <>
        &ldquo;
        <Highlight>
          A wonderfully put-together blueprint with a lot of value.
        </Highlight>{" "}
        It explains things in a simple way and gives you a much clearer
        direction on where to start.&rdquo;
      </>
    ),
    author: "Jehoyakim Jena",
    company: "India",
  },
];

export const allTestimonials = [...testimonials, ...additionalTestimonials];
