import { NextPage } from 'next';
import { Hero } from '@scdp/ui/components/common';
import { ButtonLink } from '@scdp/ui';

export async function getStaticProps() {
  return {
    props: {
  
    },
    revalidate: 600, // 10 minutes
  };
}


const HomePage: NextPage = () => {
  return (
    <>
      <Hero title="Welcome to the SCDP" description="This is the SCDP" />
      <ButtonLink href="/clouds" text="Clouds" />
    </>
  );
};

export default HomePage;
