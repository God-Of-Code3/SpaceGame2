const c = {
    // Camera data
    SCROLL_SPEED: 1.2,
    CAM_SCROLL_SPEED: 1.07,
    CAM_MOVE_SPEED: 50,
    MIN_SCALE: 0.01,
    BG_STARS_DIFF: 6,

    // Colors
    BG_COLOR: "#00010f",
    ORBIT_COLOR: "rgba(255, 255, 255, 0.3)",
    HOVER_COLOR: "rgba(255, 255, 255, 0.7)",
    FOCUS_COLOR: "rgba(255, 255, 255, 0.2)",

    // Distances
    AU_TO_TKM: 1496,

    // Sizes and widths
    ORBIT_LINE_WIDTH: 1,
    HOVER_LINE_WIDTH: 5,
    FOCUS_LINE_WIDTH: 15,
    HOVER_OFFSET: 6,
    FOCUS_OFFSET: 40,

    MIN_STAR_RAD: 3,
    MIN_PLANET_RAD: 2,

    // Special
    SPACE_OBJECT_SCOPE_SIZE: 200,
    OBJECT_TYPES: {
        0: ["Object", "Объект"],
        1: ["Star", "Звезда"],
        2: ["Planet", "Планета"]
    },

    // Random
    RANDINT: (min, max) => Math.trunc((max - min + 1) * Math.random()) + min,
}

export default c;