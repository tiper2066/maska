'use client';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { theme } from './theme'; // 커스텀 테마 파일

const emotionCache = createCache({ key: 'chakra-emotion-cache' }); // Emotion 캐시 생성
// const theme = extendTheme({}); // 기본 테마 사용

export default function ChakraWrapper({ children }) {
    return (
        <CacheProvider value={emotionCache}>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
    );
}
