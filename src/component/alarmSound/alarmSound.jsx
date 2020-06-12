import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Howl } from 'howler';
import alarmSound from './alarm.mp3'
import { stopSound } from '../../slices/timerSlice';

function AlarmSound() {
    const playSound = useSelector(state => state.timer.playSound)
    const dispatch = useDispatch()
    useEffect(() => {
        if (playSound) {
            var sound = new Howl({
                src: [alarmSound]
            });
            let id = sound.play();
            setTimeout(() => {
                sound.stop(id)
                dispatch(stopSound())
            }, 3000);
        } else {

        }

    }, [playSound])
    return (
        <div>

        </div>
    )
}

export default AlarmSound
