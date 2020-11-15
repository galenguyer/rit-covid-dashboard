module.exports = {
    purge: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
    theme: {
        extend: {
            screens: {
                xs: { max: "400px" },
            },
        },
    },
    variants: {
        textColor: ["responsive", "hover", "focus", "group-hover"],
    },
};
