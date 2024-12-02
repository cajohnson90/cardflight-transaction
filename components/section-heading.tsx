import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <section className="text-3xl font-medium capitalize mb-2">
      {children}
    </section>
  );
}
