/***** CONFIG *****/
const ANSWER = 3           // correct number on the cheat sheet (1..4)
const LED_COUNT = 60       // set to your strip length
const LOCKOUT_MS = 1000    // pause after wrong guess
const UNLOCK_COOLDOWN = 3000 // pause after success before UI returns

/***** NEOPIXEL SETUP (P1) *****/
let strip = neopixel.create(DigitalPin.P1, LED_COUNT, NeoPixelMode.RGB)
strip.clear()
strip.show()

music.setTempo(120)

function playNote(note: number, duration: number, color: number) {
    music.playTone(note, duration)
    strip.showColor(color)
    basic.pause(duration) // Pause to allow the light to match the note
}
function playSong() {
    playNote(330, music.beat(BeatFraction.Half), neopixel.colors(NeoPixelColors.Red))
    playNote(330, music.beat(BeatFraction.Half), neopixel.colors(NeoPixelColors.Green))
    playNote(330, music.beat(BeatFraction.Whole), neopixel.colors(NeoPixelColors.Blue))
    playNote(330, music.beat(BeatFraction.Half), neopixel.colors(NeoPixelColors.Yellow))
    playNote(330, music.beat(BeatFraction.Half), neopixel.colors(NeoPixelColors.Orange))
    playNote(330, music.beat(BeatFraction.Whole), neopixel.colors(NeoPixelColors.Red))
    playNote(330, music.beat(BeatFraction.Half), neopixel.colors(NeoPixelColors.White))
    playNote(392, music.beat(BeatFraction.Half), neopixel.colors(NeoPixelColors.Yellow))
    playNote(262, music.beat(BeatFraction.Half), neopixel.colors(NeoPixelColors.Blue))
    playNote(294, music.beat(BeatFraction.Half), neopixel.colors(NeoPixelColors.Yellow))
    playNote(330, music.beat(BeatFraction.Whole), neopixel.colors(NeoPixelColors.Purple))
    playNote(349, music.beat(BeatFraction.Half), neopixel.colors(NeoPixelColors.Orange))
    playNote(349, music.beat(BeatFraction.Half), neopixel.colors(NeoPixelColors.Violet))
    playNote(349, music.beat(BeatFraction.Half), neopixel.colors(NeoPixelColors.White))
    playNote(349, music.beat(BeatFraction.Half), neopixel.colors(NeoPixelColors.Red))
    playNote(349, music.beat(BeatFraction.Half), neopixel.colors(NeoPixelColors.Orange))
    playNote(330, music.beat(BeatFraction.Half), neopixel.colors(NeoPixelColors.Blue))
    playNote(330, music.beat(BeatFraction.Half), neopixel.colors(NeoPixelColors.Yellow))
    playNote(330, music.beat(BeatFraction.Half), neopixel.colors(NeoPixelColors.Green))
    playNote(392, music.beat(BeatFraction.Half), neopixel.colors(NeoPixelColors.Purple))
    playNote(392, music.beat(BeatFraction.Half), neopixel.colors(NeoPixelColors.White))
    playNote(349, music.beat(BeatFraction.Half), neopixel.colors(NeoPixelColors.Orange))
    playNote(294, music.beat(BeatFraction.Half), neopixel.colors(NeoPixelColors.Yellow))
    playNote(262, music.beat(BeatFraction.Whole), neopixel.colors(NeoPixelColors.Blue))
    basic.pause(1000)
    strip.clear()
    strip.show()
}

/***** NUMBER-LOCK UI *****/
let n = 1
let busy = false          // prevents button presses during the song

function showN() { basic.showNumber(n) }
basic.showIcon(IconNames.SmallDiamond)
showN()

// A = cycle 1 through 4
input.onButtonPressed(Button.A, function () {
    if (busy) return
    n = n % 4 + 1
    showN()
})

// B = submit
input.onButtonPressed(Button.B, function () {
    if (busy) return
    if (n == ANSWER) {
        busy = true
        basic.showIcon(IconNames.Yes)
        playSong()                    // <-- runs light+music sequence once
        basic.pause(UNLOCK_COOLDOWN)
        busy = false
        showN()

    } else {
        basic.showIcon(IconNames.No)
        basic.pause(LOCKOUT_MS)
        showN()
    }
})

// A+B = teacher reset to 1
input.onButtonPressed(Button.AB, function () {
    if (busy) return
    n = 1
    showN()
})