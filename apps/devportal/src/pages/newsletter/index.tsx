/* eslint-disable react/prop-types */
import newsletterPromo from '@/data/promos/newsletter';
import { TrackPageView } from '@/src/components/engagetracker/TrackPageView';
import { Heading } from '@chakra-ui/react';
import { PageInfo } from '@lib/interfaces/page-info';
import { getFirstXNewsletters } from '@lib/newsletter';
import { getPageInfo } from '@lib/page-info';
import Layout from '@src/layouts/Layout';
import { Hero } from '@scdp/ui/components';
import { CenteredContent, ContentSection } from 'ui/components/helpers';
import { CategoryTileList, CategoryTileProps } from 'ui/components/lists';
import { PromoCard } from 'ui/components/promos';

interface NewsletterPageProps {
  newsletters: CategoryTileProps[];
  pageInfo: PageInfo;
}

export async function getStaticProps() {
  const pageInfo = await getPageInfo('_newsletter');

  return {
    props: {
      newsletters: await getFirstXNewsletters(),
      pageInfo,
    },
  };
}

export default function NewsletterPage({ newsletters, pageInfo }: NewsletterPageProps) {
  return (
    <TrackPageView pageInfo={pageInfo}>
      <Layout title={pageInfo.title} description={pageInfo.description} openGraphImage={pageInfo.openGraphImage}>
        <Hero title={pageInfo.title} description={pageInfo.description} image={pageInfo.heroImage} productLogo={pageInfo.productLogo} />

        <ContentSection bg="neutral-subtle-bg">
          <CenteredContent>
            <PromoCard {...newsletterPromo} />

            <Heading size="lg">Previous newsletters</Heading>

            <CategoryTileList cards={newsletters} />
          </CenteredContent>
        </ContentSection>
      </Layout>
    </TrackPageView>
  );
}
