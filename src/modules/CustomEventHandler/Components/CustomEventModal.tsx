// src/modules/CustomEventHandler/Components/CustomEventModal.tsx
import React, { useState, useEffect } from 'react';
import { useInjector } from '../../../contexts/InjectorContext';
import { CustomEventHandlerModule } from '../CustomEventHandlerModule';
import { DataStore } from '../../DataStore';
import useDataStoreSelector from '../../../hooks/useDataStore';
import Modal from '../../../component/atoms/Modal';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomEvent {
  id: string;
  event: string;
  script: string;
}

const CustomEventModal = () => {
  const injector = useInjector();
  const customEventHandlerModule = injector.get(
    'customEventHandler'
  ) as CustomEventHandlerModule;
  const dataStore = injector.get('dataStore') as DataStore<any>;
  const openInfo = useDataStoreSelector(dataStore, 'customEventHandler/isOpen');
  const [customEvents, setCustomEvents] = useState<CustomEvent[]>([]);
  const [newEvent, setNewEvent] = useState('');
  const [newScript, setNewScript] = useState('');
  const [eventId, setEventId] = useState('');

  const { isOpen, context } = openInfo ?? {};
  console.log({ openInfo });

  useEffect(() => {
    const fetchCustomEvents = async () => {
      const customEventsData = await dataStore.getData('customEvents');
      setCustomEvents(customEventsData || []);
    };
    fetchCustomEvents();
  }, [dataStore]);

  const handleAddCustomEvent = async () => {
    const newCustomEvent: CustomEvent = {
      id: Math.random().toString(36).substr(2, 9),
      event: newEvent,
      script: newScript,
    };
    await dataStore.setData('customEvents', [...customEvents, newCustomEvent]);
    setCustomEvents([...customEvents, newCustomEvent]);
    setNewEvent('');
    setNewScript('');
  };

  const handleDeleteCustomEvent = async (id: string) => {
    const updatedCustomEvents = customEvents.filter((event) => event.id !== id);
    await dataStore.setData('customEvents', updatedCustomEvents);
    setCustomEvents(updatedCustomEvents);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => customEventHandlerModule.closeCustomEventHandlerModal()}
      className='h-5/6'
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='flex flex-col h-full p-4'
      >
        <h2 className='text-lg font-bold mb-4'>Custom Events</h2>
        <AnimatePresence>
          {customEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='flex justify-between items-center mb-4'
            >
              <div className='flex flex-col'>
                <span className='text-lg'>{event.event}</span>
                <span className='text-sm'>{event.script}</span>
              </div>
              <button
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                onClick={() => handleDeleteCustomEvent(event.id)}
              >
                Delete
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        <form className='flex flex-col' onSubmit={(e) => e.preventDefault()}>
          <label className='text-lg font-bold mb-2'>Add Custom Event</label>
          <select
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className='p-2 mb-4 border border-gray-400 rounded'
          >
            <option value=''>Select an event</option>
            {customEventHandlerModule.getAvailableEvents().map((event) => (
              <option key={event} value={event}>
                {event}
              </option>
            ))}
          </select>
          <textarea
            value={newScript}
            onChange={(e) => setNewScript(e.target.value)}
            placeholder='Script'
            className='p-2 mb-4 border border-gray-400 rounded'
          />
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleAddCustomEvent}
          >
            Add
          </button>
        </form>
      </motion.div>
    </Modal>
  );
};

export default CustomEventModal;
