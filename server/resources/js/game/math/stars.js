/*

Spectral class by Hertzsprung-Russell diagram shows dependence of the stellar magnitude on color, also it shows dependence of the luminosity on temperature spectrum
*Temperature in 1000 K
    Temp.               Col.
O:  30.0    -   60.0    Gradus blue (#007dff)
B:  10.0    -   30.0    Light blue (#9ce9ff)
A:  7.5     -   10.0    White (#f0f0f0)
F:  6.0     -   7.5     Canary yellow (#ffff99)
G:  5.0     -   6.0     Yellow (#ffff00)
K:  3.5     -   5.0     Orange (#ffa500)
M:  2.0     -   3.5     Red (#ff2400)

*/

const classColours = {
    O: "#007dff",
    B: "#9ce9ff",
    A: "#f0f0f0",
    F: "#ffff99",
    G: "#ffff00",
    K: "#ffa500",
    M: "#ff2400",
}

// Temperature to spectrum class
const temperatureToClass = temp => {
    if (temp < 3.5)
        return "M";
    if (temp < 5)
        return "K";
    if (temp < 6)
        return "G";
    if (temp < 7.5)
        return "F";
    if (temp < 10)
        return "A";
    if (temp < 30)
        return "B";
    return "O";
}


// Class to color
const classToColor = cls => {
    return classColours[cls];
}


export {classToColor, temperatureToClass};