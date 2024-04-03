/* eslint-disable react/prop-types */
import { TrackPageView } from '@/src/components/engagetracker/TrackPageView';
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import NewsletterNav from '@components/newsletter/NewsletterNav';
import NewsletterStory, { NewsletterStoryData } from '@components/newsletter/NewsletterStory';
import { PageInfo } from '@lib/interfaces/page-info';
import { getNewsletter, getNewsletterTitle } from '@lib/newsletter';
import { NewsletterPath, getNewsletterStaticPaths } from '@lib/staticPaths';
import Layout from '@src/layouts/Layout';
import { Hero } from '@scdp/ui/components';
import { CenteredContent, VerticalGroup } from '@scdp/ui/components';
import { translateDateAsYearMonth } from 'ui/lib/utils/dateUtil';

export interface NewsletterContentPageProps {
  content: NewsletterStoryData[];
  paths: NewsletterPath[];
  pageInfo: PageInfo;
  month: string;
  year: string;
}

export async function getStaticPaths() {
  const paths = getNewsletterStaticPaths();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const { year, month } = context.params || {};

  if (!year || !month) {
    return {
      notFound: true,
    };
  }

  const props = await getNewsletter(month.toString(), year.toString());

  props.month = month;
  props.year = year;
  props.paths = getNewsletterStaticPaths().slice(0, 12);

  // Set the dates as the 3rd of each month to avoid having to deal with timezones rolling it backwards
  const dateAsYearMonth = translateDateAsYearMonth(`${year}-${month}-03`);

  props.pageInfo = {
    title: getNewsletterTitle(dateAsYearMonth, props.title),
    description: props.description,
    pageTitle: `Newsletter - ${dateAsYearMonth}`,
    hasInPageNav: false,
    youtube: [],
    stackexchange: [],
    twitter: [],
    sitecoreCommunity: {},
    preview: context.preview ? context.preview : null,
  };

  return {
    props,
  };
}

export default function NewsletterContentPage({ pageInfo, content, paths, year, month }: NewsletterContentPageProps) {
  return (
    <TrackPageView pageInfo={pageInfo}>
      <Layout title={pageInfo.title} description={pageInfo.description} openGraphImage={pageInfo.openGraphImage}>
        <Hero title={pageInfo.title} description={pageInfo.description} image={pageInfo.heroImage} productLogo={pageInfo.productLogo} />

        <VerticalGroup>
          <CenteredContent>
            <Box>
              <Flex flexGrow={0} justify={'space-between'} width={'full'} gap={4} direction={{ base: 'column', md: 'row' }} flexFlow={'column'}>
                <Box w={{ base: 'full' }} as={'nav'}>
                  <NewsletterNav paths={paths} currentMonth={month} currentYear={year} />
                </Box>
                <Box gap={10}>
                  <SimpleGrid columns={{ base: 0, md: 3 }} gap={8}>
                    {content.map((story) => (
                      <NewsletterStory {...story} key={story.title} />
                    ))}
                  </SimpleGrid>
                </Box>
              </Flex>
            </Box>
          </CenteredContent>
        </VerticalGroup>
      </Layout>
    </TrackPageView>
  );
}
