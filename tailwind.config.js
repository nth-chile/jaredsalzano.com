/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        lineHeight: '1.333',
                        color: 'var(--color-gray-950)',
                        a: {
                            color: 'var(--color-gray-950)',
                            // '&:hover': { color: ... },
                        },
                    },
                },
                lg: {
                    css: {
                        lineHeight: '1.333',
                    },
                },
                xl: {
                    css: {
                        lineHeight: '1.333',
                    },
                },
            },
        },
    },
}