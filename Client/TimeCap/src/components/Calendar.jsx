import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react'
import React from 'react'
import { createViewWeek, createViewMonthGrid } from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/calendar.css'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'

function Calendar() {
  const calendar = useCalendarApp({
    views: [
      createViewWeek(),
      createViewMonthGrid(),
    ],
    events: [
      {
        id: 1,
        title: 'My new event',
        start: '2025-01-01 00:00',
        end: '2025-01-01 02:00',
        description: 'My cool description',
      },
    ],
    selectedDate: '2025-01-01',
    plugins: [
      createEventModalPlugin(),
      createDragAndDropPlugin(),
    ],
    callbacks: {
      onEventUpdate: (updatedEvent) => {
        /*console.log('Event updated:', updatedEvent)
        // Example: Send updated event to your server
        fetch('/api/update-event', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedEvent),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Event updated on server:', data)
          })
          .catch((error) => {
            console.error('Error updating event:', error)
          })
          */
      },
    },
  })

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}

export default Calendar