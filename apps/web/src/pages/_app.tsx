import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import sitecoreTheme, { toastOptions } from '@sitecore/blok-theme'
import { scdpTheme } from '@scdp/ui/theme';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider theme={extendTheme(sitecoreTheme, scdpTheme)} toastOptions={toastOptions}>

      <Box>
        <Component {...pageProps} />
      </Box>  

    </ChakraProvider>
  );
}

export default MyApp;
