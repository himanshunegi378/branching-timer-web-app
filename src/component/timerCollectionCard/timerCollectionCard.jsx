import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import TimerList from '../timerList/timerList'
import { Button, Card } from 'react-bootstrap'
import { createTimer, playCard, toggleCardLoop, stopTimer } from '../../slices/timerSlice'
import { useDispatch } from "react-redux";
import repeatIcon from './repeat.svg';


function TimerCollectionCard(props) {
    const timerCollectionDetail = useSelector(state => state.timer.timerCards[props.id])


    const dispatch = useDispatch()
    return (

        <Card className='m-1' style={{ width: '25%', minWidth: '250px' }}>
            <Card.Body>
                <div className='row'>
                    <div className='col-10 align-content-center'>
                        <Card.Title>{timerCollectionDetail.message}</Card.Title>
                    </div>
                    <div className='col-2 px-0 user-select-none' onClick={(e) => {
                        dispatch(toggleCardLoop({ id: props.id }))
                    }}>
                        {timerCollectionDetail.loop ? <svg className='w-100 h-auto' id="Layer" enable-background="new 0 0 64 64" height="512" viewBox="0 0 64 64" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m19 25h9c1.104 0 2-.896 2-2s-.896-2-2-2h-9c-6.065 0-11 4.935-11 11s4.935 11 11 11h4.172l-1.586 1.586c-.781.781-.781 2.047 0 2.828.391.391.902.586 1.414.586s1.023-.195 1.414-.586l5-5c.781-.781.781-2.047 0-2.828l-5-5c-.781-.781-2.047-.781-2.828 0s-.781 2.047 0 2.828l1.586 1.586h-4.172c-3.859 0-7-3.141-7-7 0-3.86 3.141-7 7-7z" /><path d="m45 21h-4.172l1.586-1.586c.781-.781.781-2.047 0-2.828s-2.047-.781-2.828 0l-5 5c-.781.781-.781 2.047 0 2.828l5 5c.391.391.902.586 1.414.586s1.023-.195 1.414-.586c.781-.781.781-2.047 0-2.828l-1.586-1.586h4.172c3.859 0 7 3.14 7 7 0 3.859-3.141 7-7 7h-9c-1.104 0-2 .896-2 2s.896 2 2 2h9c6.065 0 11-4.935 11-11s-4.935-11-11-11z" /></svg> : <svg className='w-100 h-auto' style={{ fill: ' #dadada' }} id="Layer" enable-background="new 0 0 64 64" height="512" viewBox="0 0 64 64" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m19 25h9c1.104 0 2-.896 2-2s-.896-2-2-2h-9c-6.065 0-11 4.935-11 11s4.935 11 11 11h4.172l-1.586 1.586c-.781.781-.781 2.047 0 2.828.391.391.902.586 1.414.586s1.023-.195 1.414-.586l5-5c.781-.781.781-2.047 0-2.828l-5-5c-.781-.781-2.047-.781-2.828 0s-.781 2.047 0 2.828l1.586 1.586h-4.172c-3.859 0-7-3.141-7-7 0-3.86 3.141-7 7-7z" /><path d="m45 21h-4.172l1.586-1.586c.781-.781.781-2.047 0-2.828s-2.047-.781-2.828 0l-5 5c-.781.781-.781 2.047 0 2.828l5 5c.391.391.902.586 1.414.586s1.023-.195 1.414-.586c.781-.781.781-2.047 0-2.828l-1.586-1.586h4.172c3.859 0 7 3.14 7 7 0 3.859-3.141 7-7 7h-9c-1.104 0-2 .896-2 2s.896 2 2 2h9c6.065 0 11-4.935 11-11s-4.935-11-11-11z" /></svg>}
                    </div>
                </div>
                <div className='row'>
                    <Button className='w-100 col-12' style={{ height: '2rem' }} onClick={() => { dispatch(playCard({ cardId: props.id, loop: true })) }}>Play card</Button>
                    <Button className='w-100 col-12' style={{ height: '2rem' }} onClick={() => { dispatch(stopTimer()) }}>Stop card</Button>
                </div>

                <TimerList id={props.id} />
                <Button size='sm' onClick={() => { dispatch(createTimer({ id: props.id })) }}>Add Timer</Button>
            </Card.Body>


        </Card>
    )
}

export default TimerCollectionCard
