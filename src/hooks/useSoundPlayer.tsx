import { Howl } from "howler"
import { useRef, useState } from "react"

export default function useSoundPlayer() {
    const [playerId, setPlayerId] = useState<number>(-1)
    const player = useRef<Howl>(null)

    function play(sound: string) {
        if (!sound) {
            return false
        }
        player.current = new Howl({ src: [sound] })
        const handleId = player.current.play()
        setPlayerId(handleId)
        return true
    }

    function pause() {
        player.current.pause(playerId)
    }

    function stop() {
        player.current.stop(playerId)
    }

    return { play, pause, stop }

}