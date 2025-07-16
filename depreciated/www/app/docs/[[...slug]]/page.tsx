import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
  EditOnGitHub,
} from 'fumadocs-ui/page';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { ComponentPreview } from '@/components/docs/component-preview';
import { ComponentInstallation } from '@/components/docs/component-installation';
import { ExternalLink } from '@/components/docs/external-link';
import { Steps, Step } from 'fumadocs-ui/components/steps';
import { Footer } from '@workspace/ui/components/docs/footer';
import {
  CodeBlock,
  type CodeBlockProps,
  Pre,
} from '@/components/docs/codeblock';
import { DocsAuthor } from '@/components/docs/docs-author';
import { DocsBreadcrumb } from '@/components/docs/docs-breadcrumb';
import { Metadata } from 'next';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();
  const MDX = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      footer={{ component: <Footer /> }}
      tableOfContent={{ style: 'clerk' }}
    >
      <DocsBreadcrumb slug={params.slug} />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="-my-1.5">
        {page.data.description}
      </DocsDescription>

      {page.data.author && (
        <DocsAuthor name={page.data.author.name} url={page.data.author?.url} />
      )}

      <div className="flex flex-row gap-2 items-center">
        <EditOnGitHub
          className="border-0"
          href={`https://github.com/animate-ui/animate-ui/blob/main/apps/www/content/docs/${params.slug ? `${params.slug.join('/')}.mdx` : 'index.mdx'}`}
        />
      </div>

      <DocsBody>
        {MDX ? (
          <MDX
            components={{
              ...defaultMdxComponents,
              ComponentPreview,
              ComponentInstallation,
              TypeTable,
              ExternalLink,
              Steps,
              Step,
              pre: (props: CodeBlockProps) => (
                <CodeBlock {...props} className="">
                  <Pre>{props.children}</Pre>
                </CodeBlock>
              ),
            }}
          />
        ) : null}
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    authors: page.data?.author
      ? [
          {
            name: page.data.author.name,
            ...(page.data.author?.url && { url: page.data.author.url }),
          },
        ]
      : {
          name: 'imskyleen',
          url: 'https://github.com/imskyleen',
        },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: 'https://animate-ui.com',
      siteName: 'Animate UI',
      images: [
        {
          url: 'https://animate-ui.com/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Animate UI',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@animate_ui',
      title: page.data.title,
      description: page.data.description,
      images: [
        {
          url: 'https://animate-ui.com/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Animate UI',
        },
      ],
    },
  };
}
