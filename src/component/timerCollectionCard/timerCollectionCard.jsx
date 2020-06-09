import React from 'react'
import { useSelector } from 'react-redux'
import TimerList from '../timerList/timerList'
import { Button, Card } from 'react-bootstrap'
import { createTimer,playCard } from '../../slices/timerSlice'
import { useDispatch } from "react-redux";

function TimerCollectionCard(props) {
    const timerCollectionDetail = useSelector(state => state.timer.timerCards[props.id])
    const dispatch = useDispatch()
    return (

        <Card className='m-1' style={{ width: '25%', minWidth: '250px' }}>
            <Card.Body>
                <Card.Title>{timerCollectionDetail.message}</Card.Title>
                <Button className='w-100' style={{height:'2rem'}} onClick={() => { dispatch(playCard({ cardId: props.id,loop:false })) }}>Play card</Button>
                <TimerList id={props.id} />
                <Button size='sm' onClick={() => { dispatch(createTimer({ id: props.id })) }}>Add Timer</Button>
            </Card.Body>


        </Card>
    )
}

export default TimerCollectionCard
