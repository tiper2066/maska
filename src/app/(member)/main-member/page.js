'use client';
import FileUploadMemberComponent from '@/components/common/FileUploadMemberComponent';
import MemberPageHeaderComponent from '@/components/common/MemberPageHeaderComponent';

const MainMember = () => {
    const pageHeaderProps = {
        isPagePath: false,
        backPath: '',
        headerTitle: 'Quick 작업',
        pagePathName: '마스카 작업',
    };

    return (
        <div className='member_layout'>
            <div className='left'>
                <p className='menu'>Quick 작업</p>
            </div>
            <div className='center'>
                <MemberPageHeaderComponent {...pageHeaderProps} />
                <div
                    className='page_contents sec_main member'
                    style={{
                        maxWidth: '75rem',
                        margin: ' 3.125rem auto',
                    }}
                >
                    <FileUploadMemberComponent />
                </div>
            </div>
            {/* <div className='right'>우측 패널</div> */}
        </div>
    );
};
export default MainMember;
