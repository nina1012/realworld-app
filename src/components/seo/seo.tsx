import Head from 'next/head';
import React from 'react';

export type SeoProps = {
  title: string;
};

export default function Seo({ title }: SeoProps) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}
