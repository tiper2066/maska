import { Box, Center } from '@chakra-ui/react';
import Link from 'next/link';
import MemberPageHeaderComponent from '@/components/common/MemberPageHeaderComponent';
import MemberInforForm from './MemberInfoForm';
import QuickTaskPanelComponent from '@/components/common/QuickTaskPanelComponent';
const MemberInfo = () => {
    const pageHeaderProps = {
        isPagePath: false,
        backPath: '',
        headerTitle: '회원 정보',
        pagePathName: '',
    };
    return (
        <div className='member_layout'>
            <div className='left'>
                <QuickTaskPanelComponent />
            </div>
            <div className='center' position='relative'>
                {/* -------- 헤더 -------- */}
                <MemberPageHeaderComponent {...pageHeaderProps} />
                {/* -------- 회원 정보 폼 -------- */}
                <Center
                    bg='var(--clr-light-blue)'
                    flexDirection='column'
                    justifyContent='flex-start'
                    alignItems='center'
                    height='calc(100vh - 12.5rem)'
                    overflowY='auto' // 세로 스크롤 활성화
                >
                    <Box w='100%' maxW='550px' pt={0}>
                        <div
                            className='page_contents sec_main member'
                            style={{
                                maxWidth: '75rem',
                                margin: ' 3.125rem auto',
                            }}
                        >
                            <MemberInforForm />
                            {/* ---- 스크롤을 위한 강제 높이 100px 추가 ---- */}
                            <Box h='6.25rem'></Box>
                        </div>
                    </Box>
                    {/* 회원 탈퇴하기 */}
                    <Link
                        href='/unsubscribe'
                        style={{
                            position: 'absolute',
                            left: '50%',
                            bottom: 'calc(1.875rem + var(--h-footer-simple))',
                            fontSize: 'var(--fs-14)',
                            fontWeight: 'var(--fw-400)',
                            color: 'var(--clr-gray)',
                            transform: 'translateX(-50%)',
                        }}
                    >
                        <p className='underline'>회원 탈퇴하기</p>
                    </Link>
                </Center>
            </div>
            {/* <div className='right'>우측 패널</div> */}
        </div>
    );
};
export default MemberInfo;
