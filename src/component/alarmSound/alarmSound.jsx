import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Howl } from 'howler';
import alarmSound from './alarm.mp3'
import { stopSound } from '../../slices/timerSlice';

function AlarmSound(props) {
    const dispatch = useDispatch()
    useEffect(() => {
        if (true) {
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

    }, [])
    return (
        <>

        </>
    )
}

export default AlarmSound
