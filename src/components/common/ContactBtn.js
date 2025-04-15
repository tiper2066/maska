import { Tooltip } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

const ContactBtn = ({ position }) => {
    return (
        <Tooltip
            label='문의하기'
            bg='#263994'
            color='#fff'
            placement='top'
            hasArrow
            arrowSize={10}
            aria-label='문의하기'
            borderRadius='md'
            fontSize='0.75rem'
            fontWeight='medium'
            gutter={15} // 타겟과 툴팁의 간격 설정, 기본 8
            py={1} // 1은 4px, py: 위아래, px: 좌우
        >
            <Link
                href='/contact'
                className={
                    position === 'bottom' ? 'btn_contact_bottom' : 'btn_contact'
                }
            >
                <Image
                    src='/img/btn_contact.svg'
                    alt='contact icon'
                    width={24} // 이미지의 너비(px), 임의로 넣고 스타일에서 재조정해도됨
                    height={24} // 이미지의 높이(px)
                />
            </Link>
        </Tooltip>
    );
};
export default ContactBtn;
