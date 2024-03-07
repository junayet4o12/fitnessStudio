export const ageInYearandDay = (time) => {
    if (!time) {
        return 'Not Updated'
    }
    const isPerfectAge = new Date() - new Date(time);
    const ageInYears = Math.floor(isPerfectAge / 31556952000);
    const day = Math.floor((isPerfectAge % (31556952000)) / 86400000);
    const showingAge = <span>{ageInYears} Years <br /> {day < 1 ? '' : `${day} days`}</span>
    return showingAge
}