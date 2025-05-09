// ************************ 편집하기 페이지 - 이미지/동영상 (회원전용) ************************
import MemberPageHeaderComponent from '@/components/common/MemberPageHeaderComponent';
import FooterSimple from '@/components/common/FooterSimple';
import Image from 'next/image';
import Link from 'next/link';
import ThumbNail from '@/components/edit-img/ThumbNailComponent';
import QuickTaskPanelComponent from '@/components/common/QuickTaskPanelComponent';
const EditMemberImage = () => {
    /* 헤더로 전달하는 옵션 */
    const pageHeaderProps = {
        isPagePath: true,
        backPath: '/preview-member-img',
        headerTitle: 'Quick 작업',
        pagePathName: '마스카 영역 편집',
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
                            height: '43.75rem', // 700px
                        }}
                    >
                        <Image
                            id='screen_edit_img'
                            src='/img/screen_edit_normal.svg'
                            alt='edit image'
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
                            <Link href=''>
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
                            <p className='item_name'>마스카 영역 편집</p>
                            <p className='item_value'>19/20건 가능</p>
                        </div>
                        {/* 썸네일 이미지 */}
                        <div
                            className='flex_horizontal'
                            style={{
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                gap: '2rem',
                            }}
                        >
                            <ThumbNail src='/img/thumbnail_01.svg' count='1' />
                            <ThumbNail src='/img/thumbnail_02.svg' count='2' />
                            <ThumbNail src='/img/thumbnail_03.svg' count='3' />
                        </div>
                    </div>
                    <div
                        className='flex_vertical full_width'
                        style={{ gap: '1rem', marginTop: '6rem' }}
                    >
                        <Link
                            href='/main-member'
                            className='btn_round btn_lg full_width'
                        >
                            파일 다운로드하기
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
                            href='/main-member'
                            className='btn_round btn_lg btn_black full_width'
                        >
                            새로운 파일 업로드하기
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EditMemberImage;
