import { extendTheme } from '@chakra-ui/react';
export const theme = extendTheme({
    colors: {
        blue: {
            500: '#263994', // 기준(500) 컬러
            600: '#1b2869', // 기준(500) 컬러
        },
    },
    components: {
        Button: {
            baseStyle: {
                borderRadius: '100px',
            },
            // _focus: {
            //     boxShadow:
            //         '0 0 1px 2px rgba(255, 88, 213, 1), 0 1px 1px rgba(0, 0, 0, .15)',
            // },
            _hover: {
                backgroundColor: '#263994',
                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
            },
            _active: {
                bg: '#263994', // 버튼을 누른 상태의 배경색
                color: 'whiteAlpha.900', // 버튼을 누른 상태의 텍스트 색상
            },
        },
        Input: {
            variants: {
                outline: {
                    field: {
                        backgroundColor: 'white',
                        borderColor: '#E0E7F7',
                        borderRadius: '999px', // 완만하게 둥글게
                        borderWidth: '0.063rem',
                        color: '#263994', // 입력한 텍스트 색상
                        _hover: {
                            borderColor: '#263994',
                            borderWidth: '0.063rem',
                        },
                        _focus: {
                            borderColor: '#263994',
                            // boxShadow: '0 0 0 1px #263994',
                            borderWidth: '0.063rem',
                        },
                        _placeholder: {
                            color: '#9BA4C3', //  placeholder 색상
                        },
                    },
                },
            },
            defaultProps: {
                variant: 'outline',
            },
        },
        Checkbox: {
            baseStyle: {
                control: {
                    backgroundColor: 'white',
                    borderColor: '#E0E7F7',
                    borderRadius: '6px', // 둥글게
                    borderWidth: '0.063rem',
                    width: '20px',
                    height: '20px',
                    _hover: {
                        borderWidth: '0.063rem',
                        borderColor: '#263994',
                    },
                    _focus: {
                        borderWidth: '0.063rem',
                        borderColor: '#263994',
                        // boxShadow: '0 0 0 1px #263994',
                    },
                },
            },
        },
        Tooltip: {
            baseStyle: {
                borderRadius: '0.25rem !important',
                '& .tooltip-label': {
                    borderRadius: '0.25rem !important',
                },
            },
        },
    },
});
