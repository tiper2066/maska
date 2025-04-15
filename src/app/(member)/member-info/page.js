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
                >
                    <Box w='100%' maxW='550px' p={8}>
                        <div
                            className='page_contents sec_main member'
                            style={{
                                maxWidth: '75rem',
                                margin: ' 3.125rem auto',
                            }}
                        >
                            <MemberInforForm />
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
