export const heightInInch = (height) => {
    if(!height) {
        return 'Not Updated'
    }
    const feet = Math.floor(height / 12)
    const inch = height % 12
    const showingHeight = <span>
        {feet} Feet <br /> {inch <1 ? '' : `${inch} Inch`}
    </span>
    return showingHeight
}