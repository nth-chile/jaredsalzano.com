/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        color: 'color-mix(in srgb, var(--color-gray-950) 90%, transparent)',
                        a: {
                            color: 'var(--color-gray-950)',
                            // '&:hover': { color: ... },
                        },
                        h2: { fontSize: '1em', fontWeight: '700', marginTop: '1.5em', marginBottom: '0' },
                        h3: { fontSize: '1em', fontWeight: '700', marginTop: '1.25em', marginBottom: '0' },
                        h4: { fontSize: '1em', fontWeight: '700' },
                        h5: { fontSize: '1em', fontWeight: '700' },
                        h6: { fontSize: '1em', fontWeight: '700' },
                    },
                },
                lg: {
                    css: {
                        h2: { fontSize: '1em', fontWeight: '700', marginTop: '1.5em', marginBottom: '0' },
                        h3: { fontSize: '1em', fontWeight: '700', marginTop: '1.25em', marginBottom: '0' },
                        h4: { fontSize: '1em', fontWeight: '700' },
                    },
                },
                xl: {
                    css: {
                        h2: { fontSize: '1em', fontWeight: '700', marginTop: '1.5em', marginBottom: '0' },
                        h3: { fontSize: '1em', fontWeight: '700', marginTop: '1.25em', marginBottom: '0' },
                        h4: { fontSize: '1em', fontWeight: '700' },
                    },
                },
            },
        },
    },
}
