// ******************* 회원 계정 레이아웃 : 심플 푸터 포함  *******************
import '../globals.css';
import '/public/style/controlStyle.css';
import '/public/style/pageStyle.css';
import ChakraWrapper from '../ChakraWrapper';

import Header from '@/components/common/Header';
import ContactBtn from '@/components/common/ContactBtn';
import FooterSimple from '@/components/common/FooterSimple';

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    interactiveWidget: 'resizes-visual', // 모바일에서 화면 확대/축소시 크기 조정되게함
};

export const metadata = {
    title: 'Cloudbric Maska: 회원 계정',
    description: 'Cloudbric Maska의 편집 작업 페이지',
    icons: {
        icon: '/img/favicon.png',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body>
                <ContactBtn position='bottom' />
                <Header user='user' member='member' />
                <ChakraWrapper>{children}</ChakraWrapper>
                <FooterSimple align='right' />
            </body>
        </html>
    );
}
