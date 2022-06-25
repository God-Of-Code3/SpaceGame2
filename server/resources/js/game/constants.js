const c = {
    // Camera data
    SCROLL_SPEED: 1.25,
    CAM_SCROLL_SPEED: 1.09,
    CAM_MOVE_SPEED: 50,
    MIN_SCALE: 0.001,
    BG_STARS_DIFF: 3,
    CAM_SCALE_MODES: {
        0.02: 0,

    },

    // Colors
    BG_COLOR: "#00010f",
    ORBIT_COLOR: "rgba(255, 255, 255, 0.3)",
    HOVER_COLOR: "rgba(255, 255, 255, 0.7)",
    FOCUS_COLOR: "rgba(255, 255, 255, 0.1)",

    // Distances
    AU_TO_TKM: 149600,
    SQUARE_SIZES: 40,

    // Sizes and widths
    ORBIT_LINE_WIDTH: 1,
    HOVER_LINE_WIDTH: 5,
    FOCUS_LINE_WIDTH: 5,
    HOVER_OFFSET: 6,
    FOCUS_OFFSET: 30,
    COLONY_ICON_OFFSET: 40,

    MIN_STAR_RAD: 4,
    MIN_PLANET_RAD: 3,

    MAX_ORBIT_RADIUS: 5000,

    // Special
    SPACE_OBJECT_SCOPE_SIZE: 200,
    OBJECT_TYPES: {
        0: ["Object", "Объект"],
        1: ["Star", "Звезда"],
        2: ["Planet", "Планета"]
    },

    // Random
    RANDINT: (min, max) => Math.trunc((max - min + 1) * Math.random()) + min,

    // Times
    UPDATE_TIME_PERIOD: 2000,
}

export default c;