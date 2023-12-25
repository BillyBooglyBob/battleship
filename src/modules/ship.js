export default function ship(length) {
    let hits = 0;

    function hit() {
        hits++;
    }

    function isSunken() {
        return hits === length;
    }

    function getLength() {
        return length;
    }

    return {
        hit,
        getLength,
        isSunken
    };
}
