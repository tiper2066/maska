import { Box, Center } from '@chakra-ui/react';
import Link from 'next/link';
import MemberPageHeaderComponent from '@/components/common/MemberPageHeaderComponent';
import UnSubscribeForm from './UnSubscribeForm';
import QuickTaskPanelComponent from '@/components/common/QuickTaskPanelComponent';
const MemberInfo = () => {
    const pageHeaderProps = {
        isPagePath: true,
        backPath: '/member-info',
        headerTitle: '회원 정보',
        pagePathName: '회원 탈퇴하기',
    };
    return (
        <div className='member_layout'>
            <div className='left'>
                <QuickTaskPanelComponent />
            </div>
            <div className='center' position='relative'>
                {/* -------- 헤더 -------- */}
                <MemberPageHeaderComponent {...pageHeaderProps} />
                {/* -------- 회원 탈퇴하기 폼 -------- */}
                <Center
                    bg='var(--clr-light-blue)'
                    flexDirection='column'
                    justifyContent='flex-start'
                    alignItems='center'
                    height='calc(100vh - 12.5rem)'
                    overflowY='auto' // 세로 스크롤 활성화
                >
                    <Box w='100%' maxW='550px' p={8}>
                        <div
                            className='page_contents sec_main member'
                            style={{
                                maxWidth: '75rem',
                                margin: ' 3.125rem auto',
                            }}
                        >
                            <UnSubscribeForm />
                            {/* ---- 스크롤을 위한 강제 높이 100px 추가 ---- */}
                            <Box h='6.25rem'></Box>
                        </div>
                    </Box>
                </Center>
            </div>
            {/* <div className='right'>우측 패널</div> */}
        </div>
    );
};
export default MemberInfo;
