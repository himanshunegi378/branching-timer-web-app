import React, { useState, useEffect } from 'react';
import Notification from 'react-web-notification';
import { useSelector, useDispatch } from 'react-redux';
import { setPermission } from '../../slices/notificationSlice';

export default function NotificationWrapper(props) {
    const notification = useSelector(state => state.timer.notification)



    return (
        <div>
            {notification ? <Notification title={notification.title} timeout={3000} /> : null}
            <Notification title={notification.title||'hello'} timeout={3000} />


        </div>
    )

};

