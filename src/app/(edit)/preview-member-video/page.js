// ************************ 미리보기 페이지 - 동영상 (회원전용) ************************
'use client';
import { Divider, Text } from '@chakra-ui/react';
import MemberPageHeaderComponent from '@/components/common/MemberPageHeaderComponent';
import FooterSimple from '@/components/common/FooterSimple';
import ModalComponent from '@/components/common/ModalComponent';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import QuickTaskPanelComponent from '@/components/common/QuickTaskPanelComponent';

const PreviewMemberVideo = () => {
    const router = useRouter(); // 라우터 객체 생성
    const [isModalOpenXBtn, setIsModalOpenXBtn] = useState(false); // 다운로드하지 않고 나가기 (X 버튼) 모달 오픈 여부

    // 모달 창 열기 이벤트 핸들러
    const handleModalOpen = () => {
        setIsModalOpenXBtn(true);
    };

    // 모달 창 닫기 이벤트 핸들러 (모든 모달을 닫는다.)
    const handleModalClose = () => {
        setIsModalOpenXBtn(false);
    };

    // 새로운 파일 업로드하기 클릭 이벤트 핸들러
    const handleNewFileUpload = () => {
        router.push('/'); // 홈으로 이동
    };

    // 다운로드하지 않고 나가기 창 옵션 설정 (우측 패널 X 버튼)
    const modalOptionXBtn = {
        title: '다운로드 하지 않고 나가시겠습니까?',
        description: '지금 나가면 파일은 저장되지 않습니다.',
        btnLabelNagative: '나가기',
        btnLabelPositive: '다운로드하기',
    };

    /* 헤더로 전달하는 옵션 */
    const pageHeaderProps = {
        isPagePath: true,
        backPath: '/main-member',
        headerTitle: 'Quick 작업',
        pagePathName: '마스카 작업 정보',
    };

    return (
        <div className='member_layout'>
            {/* --------------- 좌측 패널 --------------- */}
            <div className='left'>
                <QuickTaskPanelComponent />
            </div>
            {/* --------------- 컨텐츠  --------------- */}
            <div className='center'>
                <MemberPageHeaderComponent {...pageHeaderProps} />
                <div
                    className='page_contents sec_main member'
                    style={{
                        maxWidth: '75rem',
                        margin: ' 3.125rem auto',
                    }}
                >
                    <div
                        style={{
                            position: 'relative',
                            width: '90%',
                            height: '40.625rem', // 650px
                        }}
                    >
                        <Image
                            src='/img/screen_video_member.svg'
                            alt='preview video screen'
                            fill={true}
                            style={{
                                objectFit: 'contain',
                                objectPosition: 'top center', // 좌측 상단을 기준으로 이미지를 정렬
                            }}
                        />
                    </div>
                </div>
                <FooterSimple />
            </div>
            {/* --------------- 우측 패널  --------------- */}
            <div className='right'>
                <div className='right-container '>
                    {/* ---------- 텍스트 정보 -------- */}
                    <div
                        className='flex_vertical'
                        style={{
                            width: '100%',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            gap: '1rem',
                        }}
                    >
                        {/* X 닫기 버튼 */}
                        <div className='btn_close_panel'>
                            <Link
                                href=''
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleModalOpen('XBtnModal');
                                }}
                            >
                                <Image
                                    className='icon_cancel_x'
                                    src='/img/icon_cancel_x.svg'
                                    alt='cancel x icon'
                                    width={24}
                                    height={24}
                                />
                            </Link>
                        </div>
                        {/* 다운로드 가능 건수 */}
                        <div
                            className='flex_vertical'
                            style={{
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                gap: '1rem',
                            }}
                        >
                            <p className='item_name'>다운로드 가능 건수</p>
                            <p className='item_value'>19/20건 가능</p>
                        </div>
                        {/* ----- 구분선 ------ */}
                        <Divider
                            borderStyle='solid'
                            borderColor='var(--clr-label-blue)'
                            my={2}
                        />
                        {/* 파일 정보 */}
                        <div
                            className='flex_vertical'
                            style={{
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                gap: '1rem',
                            }}
                        >
                            <p className='item_name'>파일 정보</p>
                            <p className='item_value'>
                                Video_name.mp4 {/* 마스카 진행 상태 뱃지  */}
                                <Text
                                    as='span'
                                    color='var(--clr-white)'
                                    bgColor='var(--clr-primary)'
                                    className='maska_status_badge'
                                    mx={2}
                                >
                                    마스카 완료
                                </Text>
                            </p>
                            <p className='file_info'>
                                2GB <br />
                                1920x1080
                            </p>
                        </div>
                        {/* 태그 뱃지 */}
                        <div className='tags' style={{ marginTop: '1rem' }}>
                            <span>#얼굴인식</span>
                        </div>
                    </div>
                    <div
                        className='flex_vertical full_width'
                        style={{ gap: '1rem', marginTop: '3.75rem' }}
                    >
                        <Link
                            href=''
                            className='btn_round btn_outline btn_lg full_width'
                            onClick={(e) => {
                                e.preventDefault();
                                router.push('/edit-member-img');
                            }}
                        >
                            마스카 영역 편집하기
                        </Link>
                        <Link
                            href=''
                            className='btn_round btn_lg full_width'
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            해당 파일 바로 다운로드하기
                        </Link>
                        <p
                            style={{
                                color: 'var(--clr-red)',
                                padding: '0rem 2rem 0.5rem 2rem',
                            }}
                        >
                            마스카는 보안을 위해 1회의 다운로드 기회만
                            제공하므로, 신중히 다운로드하시기 바랍니다.
                        </p>
                        <Link
                            href=''
                            className='btn_round btn_lg btn_black full_width'
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            새로운 파일 업로드하기
                        </Link>
                    </div>
                </div>
                {/* ------ 우측 패널 상단 X 버튼 모달: 다운로드하지 않고 나가기 ------- */}
                <ModalComponent
                    isModalOpen={isModalOpenXBtn} // 오픈 여부 상태 변수 전달
                    handleModalClose={handleModalClose} // 닫기 버튼용 함수 전달
                    handleModalNegative={handleNewFileUpload} // 부정 버튼용 함수 전달
                    handleConfirm={handleModalClose} // 예 또는 긍정 버튼용 함수 전달
                    modalOption={modalOptionXBtn} // 모달 UI 요소를 위한 옵션 전달
                />
            </div>
        </div>
    );
};
export default PreviewMemberVideo;
