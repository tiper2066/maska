import Image from 'next/image';
import Link from 'next/link';

const MemberPageHeaderComponent = ({
    isPagePath,
    backPath,
    headerTitle,
    pagePathName,
}) => {
    return (
        <div className='page_header'>
            <h3 className='page_header_title'>{headerTitle}</h3>
            <div className='inline_block'>
                <Link href={backPath} className='page_path'>
                    {isPagePath && (
                        <Image
                            src='/img/icon_arrow_right.svg'
                            alt='arrow right icon'
                            width={24}
                            height={24}
                            style={{ width: '0.375rem', height: '0.75rem' }}
                        />
                    )}
                    {pagePathName}
                </Link>
            </div>
        </div>
    );
};
export default MemberPageHeaderComponent;
